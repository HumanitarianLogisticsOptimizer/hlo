# import required packages
import os
import mip_setup as mip_setup
import mip_solve as mip_solve


# read user inputs
inputs_directory = '/app/backend/media/inputs/inputs_to_load.xlsx'
inputs_dict = mip_setup.read_inputs(inputs_directory)

# prepare
mip_inputs = mip_setup.InputsSetup(inputs_dict)
mip_solve.mathematical_model_solve(mip_inputs)
