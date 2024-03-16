import React from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import StockManagementTable from "./StockManagementTable";

const StockManagement: React.FC = () => {

  return (
    <DefaultLayout>
      <Breadcrumb pageName={"Stock Management"} />
      <StockManagementTable />
    </DefaultLayout>
  );
};

export default StockManagement;