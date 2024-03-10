#This script is written to convert the JSON files used within the system to an .xlsx file to be sent to third parties.
#Place the JSON files within the same directory with the script itself
#Run the script.
#Output excel file will be placed within the same directory.
import os
import pandas as pd

def json_to_excel(directory):
    excel_file = os.path.join(directory, 'output.xlsx')

    # Check the JSON files.
    json_files = [f for f in os.listdir(directory) if f.endswith('.json')]
    if not json_files:
        print("No JSON files found in the directory.")
        return

    # Create a Pandas Excel writer using openpyxl as the engine
    writer = pd.ExcelWriter(excel_file, engine='openpyxl')

    # Go over the .json files
    for filename in json_files:
        file_path = os.path.join(directory, filename)
        df = pd.read_json(file_path)

        # Check the data frames emptyness
        if not df.empty:
            sheet_name = os.path.splitext(filename)[0]
            df.to_excel(writer, sheet_name=sheet_name, index=False)
        else:
            print(f"File {filename} is empty and will be skipped.")

    writer.close()
    print("Excel file has been created.")

# Get the directory of the current script
script_directory = os.path.dirname(os.path.abspath(__file__))

# Run the function with the current wd.
json_to_excel(script_directory)
