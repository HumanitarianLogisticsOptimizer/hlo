import React from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import DataTableACCs from "./DataTableACCs";
import DataTablesADCs from "./DataTableADCs";

const HLODashboard: React.FC = () => {
  return (
    <DefaultLayout>
      <DataTableACCs />
      <DataTablesADCs />
    </DefaultLayout>
  );
};

export default HLODashboard;