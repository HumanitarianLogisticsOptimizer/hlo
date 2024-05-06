import random
import pandas as pd
from django.db import transaction
from django.core.exceptions import ObjectDoesNotExist
import logging
from backend.aid.models import ACC, ADC, AidType
from backend.users.models import VolunteerCourier, EnterpriseCourier
from backend.logistics.models import VolunteerTask, EnterpriseTask

# Configure logging
logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

def load_data_from_excel(file_path):
    """ Load task data from an Excel file. """
    return pd.read_excel(file_path, sheet_name='x_ijk_results')

@transaction.atomic
def allocate_and_create_tasks(df):
    """ Allocate tasks to couriers based on capacity and write results. """
    sorted_df = df.sort_values(by='shipment_quantity', ascending=False)
    results = []  # List to store results for Excel output

    for index, row in sorted_df.iterrows():
        source = ACC.objects.get(pk=row['ACC_supply_center'])
        target = ADC.objects.get(pk=row['ADC_demand_center'])
        aid_type = AidType.objects.get(pk=row['aid_type'])
        load_quantity = row['shipment_quantity']

        couriers = list(EnterpriseCourier.objects.filter(city=source.city)) + \
                   list(VolunteerCourier.objects.filter(city=source.city))
        random.shuffle(couriers)

        task_allocated = False
        for courier in couriers:
            if can_handle_task(courier, load_quantity):
                task = create_task(courier, source, target, aid_type.name, load_quantity)
                results.append({
                    "Task ID": task.id,
                    "Courier ID": courier.id,
                    "Source": source.city,
                    "Target": target.city,
                    "Status": task.status
                })
                task_allocated = True
                break

        if not task_allocated:
            results.append({
                "Task ID": None,
                "Courier ID": None,
                "Source": source.city,
                "Target": target.city,
                "Status": "Not Allocated"
            })
            logger.error(f"No suitable courier found for task {index} with load {load_quantity}")

    return results

def can_handle_task(courier, load_quantity):
    """ Determine if the courier can handle the task based on capacity. """
    if isinstance(courier, EnterpriseCourier):
        return get_enterprise_total_capacity(courier) >= load_quantity
    elif isinstance(courier, VolunteerCourier):
        return get_volunteer_capacity(courier) >= load_quantity
    return False

def get_enterprise_total_capacity(courier):
    """ Calculate total capacity for an enterprise courier. """
    capacity = (
        courier.number_of_light_duty * 790 +
        courier.number_of_medium_duty * 15000 +
        courier.number_of_heavy_duty * 79000
    )
    return capacity

def get_volunteer_capacity(courier):
    """ Calculate capacity for a volunteer courier based on vehicle size. """
    size_to_capacity = {
        'light_duty': 790,
        'medium_duty': 15000,
        'heavy_duty': 79000
    }
    return size_to_capacity.get(courier.vehicle_size, 0)

def create_task(courier, source, target, load_type, load_quantity):
    """ Create a task and assign it to a courier. """
    task_class = EnterpriseTask if isinstance(courier, EnterpriseCourier) else VolunteerTask
    task = task_class(source=source, target=target, load_type=load_type, load_quantity=load_quantity, owner=courier, status="Pending")
    task.save()
    return task

def write_results_to_excel(results, output_file_path):
    """ Write the task allocation results to an Excel file. """
    df = pd.DataFrame(results)
    df.to_excel(output_file_path, index=False)
    logger.info(f"Results written to {output_file_path}")

def process_tasks_and_output_to_excel(input_file_path, output_file_path):
    """ Process tasks from an Excel file and output results to another Excel file. """
    task_data = load_data_from_excel(input_file_path)
    allocation_results = allocate_and_create_tasks(task_data)
    write_results_to_excel(allocation_results, output_file_path)

# Example usage
if __name__ == "__main__":
    process_tasks_and_output_to_excel('path/to/input.xlsx', 'path/to/output.xlsx')
