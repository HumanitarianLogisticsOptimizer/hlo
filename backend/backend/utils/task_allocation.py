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
    for index, row in df.iterrows():
        try:
            destination = ACC.objects.get(pk=row['ACC_supply_center'])
            target = ADC.objects.get(pk=row['ADC_demand_center'])
            aid_type = AidType.objects.get(pk=row['aid_type'])
            load_quantity = row['shipment_quantity']

            courier = select_courier(load_quantity)
            if courier:
                create_task(courier, destination, target, aid_type.name, load_quantity)
            else:
                logger.error("No suitable courier found for load quantity: {}".format(load_quantity))
        except ObjectDoesNotExist as e:
            logger.error("Database entry not found: {}".format(e))


def select_courier(load_quantity):
    couriers = list(EnterpriseCourier.objects.all()) + list(VolunteerCourier.objects.all())
    for courier in couriers:
        capacity = get_vehicle_capacity(courier.vehicle_size) if hasattr(courier, 'vehicle_size') else get_enterprise_capacity(courier, load_quantity)
        if capacity and capacity >= load_quantity:
            return courier
    return None


def create_task(courier, destination, target, load_type, load_quantity):
    if isinstance(courier, EnterpriseCourier):
        task_class = EnterpriseTask
    else:
        task_class = VolunteerTask
    task = task_class(destination=destination, target=target, load_type=load_type, load_quantity=load_quantity, owner=courier)
    task.save()


def get_vehicle_capacity(vehicle_size):
    sizes = {'light': 790, 'medium': 15000, 'heavy': 79000}
    return sizes.get(vehicle_size, None)


def get_enterprise_capacity(courier, load_quantity):
    # Example to fetch capacity based on the vehicle types and their numbers
    if load_quantity <= 790:
        return courier.number_of_light_duty * 790
    elif load_quantity <= 15000:
        return courier.number_of_medium_duty * 15000
    else:
        return courier.number_of_heavy_duty * 79000
