import random
import pandas as pd
from django.db import transaction
from django.core.exceptions import ObjectDoesNotExist
import logging
from backend.aid.models import ACC, ADC, AidType
from backend.users.models import VolunteerCourier, EnterpriseCourier
from backend.logistics.models import VolunteerTask, EnterpriseTask

logger = logging.getLogger(__name__)


def load_data_from_excel(file_path):
    return pd.read_excel(file_path, sheet_name='x_ijk_results')


@transaction.atomic
def allocate_and_create_tasks(df):
    df['total_needed'] = df.groupby(['ACC_supply_center', 'ADC_demand_center', 'aid_type'])['shipment_quantity'].transform('sum')
    df = df.drop_duplicates(subset=['ACC_supply_center', 'ADC_demand_center', 'aid_type'])
    sorted_df = df.sort_values(by=['total_needed', 'shipment_quantity'], ascending=[False, False])

    for index, row in sorted_df.iterrows():
        try:
            source = ACC.objects.get(pk=row['ACC_supply_center'])
            target = ADC.objects.get(pk=row['ADC_demand_center'])
            aid_type = AidType.objects.get(pk=row['aid_type'])
            total_needed = row['total_needed']

            couriers = list(EnterpriseCourier.objects.filter(city=source.city)) + \
                       list(VolunteerCourier.objects.filter(city=source.city))
            couriers.sort(key=lambda x: get_total_capacity(x), reverse=True)

            while total_needed > 0:
                for courier in couriers:
                    courier_capacity = get_total_capacity(courier)
                    load_quantity = min(courier_capacity, total_needed)
                    if load_quantity > 0:
                        create_task(courier, source, target, aid_type.name, load_quantity)
                        total_needed -= load_quantity
                        if total_needed <= 0:
                            break

        except ObjectDoesNotExist as e:
            logger.error("Database entry not found: {}".format(e))


def get_total_capacity(courier):
    if isinstance(courier, EnterpriseCourier):
        return (
            courier.number_of_light_duty * 790 +
            courier.number_of_medium_duty * 15000 +
            courier.number_of_heavy_duty * 79000
        )
    elif isinstance(courier, VolunteerCourier):
        size_to_capacity = {
            'light_duty': 790,
            'medium_duty': 15000,
            'heavy_duty': 79000
        }
        return size_to_capacity.get(courier.vehicle_size, 0)  # Default to 0 if none matched


def create_task(courier, source, target, load_type, load_quantity):
    if isinstance(courier, EnterpriseCourier):
        task_class = EnterpriseTask
    else:
        task_class = VolunteerTask
    task = task_class(source=source, target=target, load_type=load_type, load_quantity=load_quantity, owner=courier, status="Pending")
    task.save()
