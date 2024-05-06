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
    sorted_df = df.sort_values(by='shipment_quantity', ascending=False)
    for index, row in sorted_df.iterrows():
        source = ACC.objects.get(pk=row['ACC_supply_center'])
        target = ADC.objects.get(pk=row['ADC_demand_center'])
        aid_type = AidType.objects.get(pk=row['aid_type'])
        load_quantity = row['shipment_quantity']

        couriers = list(EnterpriseCourier.objects.filter(city=source.city)) + \
                   list(VolunteerCourier.objects.filter(city=source.city))
        random.shuffle(couriers)

        task_created = False
        for courier in couriers:
            if isinstance(courier, EnterpriseCourier):
                if get_enterprise_total_capacity(courier) >= load_quantity:
                    create_task(courier, source, target, aid_type.name, load_quantity)
                    task_created = True
                    break  # Stop after assigning a task to an enterprise courier
            elif isinstance(courier, VolunteerCourier):
                if get_volunteer_capacity(courier) >= load_quantity:
                    create_task(courier, source, target, aid_type.name, load_quantity)
                    task_created = True
                    break  # Stop after assigning a task to a volunteer courier

        if not task_created:
            logger.error(f"No suitable courier found for task {index} with load {load_quantity}")

def get_enterprise_total_capacity(courier):
    return (
        courier.number_of_light_duty * 790 +
        courier.number_of_medium_duty * 15000 +
        courier.number_of_heavy_duty * 79000
    )

def get_volunteer_capacity(courier):
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
