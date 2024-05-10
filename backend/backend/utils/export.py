import pandas as pd
from django.apps import apps


def export_models_to_excel(app_name, model_names, excel_file_path):
    with pd.ExcelWriter(excel_file_path, engine='openpyxl') as writer:
        for model_name in model_names:
            model = apps.get_model(app_name, model_name)
            instances = model.objects.all()

            # Convert the QuerySet to DataFrame
            fields = [field.name for field in model._meta.fields]
            data = list(instances.values_list(*fields))
            df = pd.DataFrame(data, columns=fields)

            # Check if 'location' field exists and split it
            if 'location' in df.columns and not df.empty:
                # Fill missing locations with a default placeholder
                df['location'] = df['location'].fillna('0,0')
                # Split location into two separate columns
                df[['location_x', 'location_y']] = df['location'].str.split(',', expand=True)
                # Drop the original 'location' column
                df.drop('location', axis=1, inplace=True)

            # Write each model's data to a separate sheet in the same Excel file
            df.to_excel(writer, sheet_name=model_name, index=False)
            print(f"Data exported to Excel sheet: {model_name}")
