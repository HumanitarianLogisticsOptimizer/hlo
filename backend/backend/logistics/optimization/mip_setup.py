import pandas as pd
import numpy as np
import gurobipy as gp


def read_inputs(directory):
    xls = pd.ExcelFile(directory)
    return {sheet_name: xls.parse(sheet_name) for sheet_name in xls.sheet_names}


# Function to calculate Euclidean distance
def calculate_distance(x1, y1, x2, y2):
    return np.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)


# define input setup class
class InputsSetup:
    def __init__(self, inputs_dict):

        # read problem input

        # self.ADC_df = inputs_dict["ADC"]
        # self.ADC_aids_df = inputs_dict["ADCAid"]
        # self.ACC_df = inputs_dict["ACC"]
        # self.ACC_aids_df = inputs_dict["ACCAid"]
        #

        # problem parameters
        self.ACC_supply_type_list = list(inputs_dict["ACCAid"]["type"].unique())  # supplied aid types
        self.ACC_supply_type_n = len(self.ACC_supply_type_list)  # number of supplied aid types
        self.ACC_list = list(inputs_dict["ACCAid"]["center"].unique())  # number of demanded aid types

        self.ADC_demand_type_list = list(inputs_dict["ADCAid"]["type"].unique())  # demanded aid types
        self.ADC_demand_type_n = len(self.ADC_demand_type_list)  # number of demanded aid types
        self.ADC_list = list(inputs_dict["ADCAid"]["center"].unique())  # number of demanded aid types


        # define empty lists for classes, i.e. each element of the list will be an element of the corresponding class
        self.ACC_multidict_input = {}  # dictionary of elements of node attribute class
        self.ADC_multidict_input = {}  # dictionary of elements of node attribute class
        self.distance_dict = {}  # multi-dictionary input for the transportation cost information for each available arc in the network

        # Calculate distances between each supplier and each demand point
        for index1, supplier in inputs_dict["ACC"].iterrows():
            for index2, demand in inputs_dict["ADC"].iterrows():
                # Compute distance only once for the supplier-demand pair
                distance = calculate_distance(supplier['location_x'], supplier['location_y'], demand['location_x'],
                                              demand['location_y'])
                # Assign this distance to each aid type
                for aid_type in self.ADC_demand_type_list:
                    self.distance_dict[(supplier['id'], demand['id'], aid_type)] = distance

        # setup multi dictionaries --> if you are unfamiliar with multidict and want to learn about, go to below link
        # https://www.gurobi.com/documentation/8.1/refman/py_multidict.html
        self.links, self.link_distances = gp.multidict(self.distance_dict)

        # setup ACC and their attributes
        for i in range(len(inputs_dict["ACCAid"])):
            values = inputs_dict["ACCAid"].loc[i, :]
            self.ACC_multidict_input[values["center"], values["type"]] = [values["quantity"], values["id"]]

        self.ACC_aid_pairs, self.ACC_aid_supply_quantity, self.ACC_aid_pair_ids = gp.multidict(self.ACC_multidict_input)

        # setup ADC and their attributes
        for i in range(len(inputs_dict["ADCAid"])):
            values = inputs_dict["ADCAid"].loc[i, :]
            self.ADC_multidict_input[values["center"], values["type"]] = [values["demanded_stock"], values["standard_stock"], values["quantity"], values["id"]]

        self.ADC_aid_pairs, self.ADC_aid_demanded_stock, self.ADC_standard_stock, self.ADC_aid_quantity, self.ADC_aid_pair_ids = gp.multidict(self.ADC_multidict_input)
