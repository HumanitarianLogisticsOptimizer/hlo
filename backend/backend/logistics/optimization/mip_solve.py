import gurobipy as gp
import re
from gurobipy import GRB
import pandas as pd


# organize results
def model_organize_results(var_values, var_df):
    counter = 0
    for v in var_values:
        # if(v.X>0):
        current_var = re.split("\[|,|]", v.varName)[:-1]
        current_var.append(round(v.X, 2))
        var_df.loc[counter] = current_var
        counter = counter + 1
        # with open("./math_model_outputs/" + 'mip-results.txt',
        #           "w") as f:  # a: open for writing, appending to the end of the file if it exists
        #     f.write(','.join(map(str, current_var)) + '\n')
        # print(','.join(map(str,current_var )))
    return var_df



def mathematical_model_solve(mip_inputs):

    penalty_coef = 10000
    model = gp.Model("hlo")

    # add link variables - the flow of aid type 'k' from ACC i to ADC j
    x_ijk = model.addVars(
        mip_inputs.links,
        lb=0,
        vtype=GRB.INTEGER,
        name="x_ijk",
    )

    # add penalty variables - the unmet demand of aid type 'k' at ADC j
    u_jk = model.addVars(
        mip_inputs.ADC_aid_pairs,
        lb=0,
        vtype=GRB.INTEGER,
        name="u_jk",
    )

    eps_k = model.addVars(
        mip_inputs.ADC_demand_type_list,
        lb=0,
        vtype=GRB.INTEGER,
        name="eps_k",
    )

    # set objective (1)
    penalty_unmet_demand = {key: penalty_coef for key in u_jk.keys()}
    penalty_unequality = {key: penalty_coef for key in eps_k.keys()}
    obj_min = x_ijk.prod(mip_inputs.link_distances) + u_jk.prod(penalty_unmet_demand) + eps_k.prod(penalty_unequality)
    model.setObjective(obj_min)

    # constraint 2 - satisfy demand (unmet demand is allowed but penalized)
    # k = mip_inputs.ADC_demand_type_list[0]
    # j = mip_inputs.ADC_list[0]
    for k in mip_inputs.ADC_demand_type_list:
        for j in mip_inputs.ADC_list:
            model.addConstr(x_ijk.sum('*', j, k) >= mip_inputs.ADC_aid_demanded_stock[j, k] - u_jk.sum(j, k))

    # constraint 3 - supply capacity cannot be exceeded
    # k = mip_inputs.ADC_demand_type_list[0]
    # i = mip_inputs.ACC_list[0]
    for k in mip_inputs.ADC_demand_type_list:
        for i in mip_inputs.ACC_list:
            model.addConstr(x_ijk.sum(i, '*', k) <= mip_inputs.ACC_aid_supply_quantity[i, k])

    # constraint 4 - consider equal distribution among the demanded products
    for k in mip_inputs.ADC_demand_type_list:
        for j in mip_inputs.ADC_list:
            model.addConstr(u_jk.sum(j, k) <= eps_k.sum(k))


    model.update()
    # model.write("model_hand.lp")
    # model.printStats()
    model.optimize()

    if model.Status == GRB.Status.INFEASIBLE:
        model.computeIIS()
        model.write("infeasible_model.ilp")
        print("There is no feasible solution for the given inputs. Go check infeasible_model.ilp file for more details.")

    else:
        x_ijk_results_df = pd.DataFrame(columns=['var_name', 'ACC_supply_center', 'ADC_demand_center', 'aid_type', 'shipment_quantity'])
        x_ijk_results_df = model_organize_results([v for v in x_ijk.values() if v.X > 0], x_ijk_results_df)

        u_jk_results_df = pd.DataFrame(columns=['var_name', 'ADC_demand_center', 'aid_type', 'unmet_demand_quantity'])
        u_jk_results_df = model_organize_results([v for v in u_jk.values() if v.X > 0], u_jk_results_df)

        eps_k_results_df = pd.DataFrame(columns=['var_name', 'aid_type', 'maximum_unmet_demand_quantity'])
        eps_k_results_df = model_organize_results([v for v in eps_k.values() if v.X > 0], eps_k_results_df)

        # Calculate the transportation cost
        # Calculate the penalty contributions
        penalty_unmet_demand_share = sum(u_jk[j, k].X * penalty_unmet_demand[j, k] for j, k in u_jk.keys())
        penalty_unequality_share = sum(eps_k[k].X * penalty_unequality[k] for k in eps_k.keys())

        # Calculate the transportation cost component by subtracting penalties
        transportation_cost = model.objval - penalty_unmet_demand_share - penalty_unequality_share
        # or alternatively --> sum(x_ijk[i, j, k].X * mip_inputs.link_distances[i, j, k] for i, j, k in x_ijk.keys())

        global_results_df = pd.DataFrame(columns=['transportation_cost', 'penalty_unmet_demand', 'total_unmet_demand_quanitity', 'penalty_unequality', 'run_time'])
        global_results_df.loc[len(global_results_df.index)] = [transportation_cost, penalty_unmet_demand_share, penalty_unmet_demand_share/penalty_coef, penalty_unequality_share, model.runtime]

        writer = pd.ExcelWriter('/app/backend/media/outputs/results.xlsx', engine='openpyxl')
        global_results_df.to_excel(writer, sheet_name='global_results')
        x_ijk_results_df.to_excel(writer, sheet_name='x_ijk_results')
        u_jk_results_df.to_excel(writer, sheet_name='u_jk_results')
        eps_k_results_df.to_excel(writer, sheet_name='eps_k_results')

        writer.close()
