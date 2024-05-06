import pandas as pd
from django.db import transaction
from django.core.exceptions import ObjectDoesNotExist
import logging
from backend.aid.models import ACC, ADC, AidType
from backend.users.models import VolunteerCourier, EnterpriseCourier
from backend.logistics.models import VolunteerTask, EnterpriseTask

# Setting up logging
logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)


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

        # First try to allocate to enterprise couriers
        enterprise_couriers = EnterpriseCourier.objects.filter(city=source.city)
        task_allocated = allocate_to_couriers(enterprise_couriers, source, target, aid_type.name, load_quantity)

        # If no enterprise courier could take the task, allocate to volunteer couriers
        if not task_allocated:
            volunteer_couriers = VolunteerCourier.objects.filter(city=source.city)
            task_allocated = allocate_to_couriers(volunteer_couriers, source, target, aid_type.name, load_quantity)

        if not task_allocated:
            logger.error(f"No suitable courier found for task {index} with load {load_quantity} from {source.city} to {target.city}")


def allocate_to_couriers(couriers, source, target, load_type, load_quantity):
    for courier in couriers:
        if (isinstance(courier, EnterpriseCourier) and get_enterprise_total_capacity(courier) >= load_quantity) or \
           (isinstance(courier, VolunteerCourier) and get_volunteer_capacity(courier) >= load_quantity):
            create_task(courier, source, target, load_type, load_quantity)
            return True
    return False


def get_enterprise_total_capacity(courier):
    capacity = (
        courier.number_of_light_duty * 790 +
        courier.number_of_medium_duty * 15000 +
        courier.number_of_heavy_duty * 79000
    )
    logger.debug(f"Enterprise courier {courier.id} total capacity: {capacity}")
    return capacity


def get_volunteer_capacity(courier):
    size_to_capacity = {
        'light_duty': 790,
        'medium_duty': 15000,
        'heavy_duty': 79000
    }
    capacity = size_to_capacity.get(courier.vehicle_size, 0)  # Default to 0 if none matched
    logger.debug(f"Volunteer courier {courier.id} capacity for {courier.vehicle_size}: {capacity}")
    return capacity


def create_task(courier, source, target, load_type, load_quantity):
    task_class = EnterpriseTask if isinstance(courier, EnterpriseCourier) else VolunteerTask
    task = task_class(source=source, target=target, load_type=load_type, load_quantity=load_quantity, owner=courier, status="Pending")
    task.save()
    logger.info(f"Task {task.id} created for courier {courier.id} from {source.city} to {target.city} - Status: {task.status}")
