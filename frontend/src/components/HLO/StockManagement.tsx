import React from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import ACC_StockManagementTable from "./ACC_StockManagementTable";

const StockManagement: React.FC = () => {

  return (
    <DefaultLayout>
      <Breadcrumb pageName={"Stock Management"} />
      <ACC_StockManagementTable />
    </DefaultLayout>
  );
};

export default StockManagement;