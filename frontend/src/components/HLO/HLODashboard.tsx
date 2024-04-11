import React, { useState } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import DataTableACCs from "./Components/DataTableACCs";
import DataTablesADCs from "./Components/DataTableADCs";
import { Link } from "react-router-dom";

const HLODashboard: React.FC = () => {
  const [openTab, setOpenTab] = useState(1);

  const activeClasses = 'text-primary border-primary';
  const inactiveClasses = 'border-transparent';

  return (
    <DefaultLayout>
      <div className="px-5 pt-3 rounded-lg-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-col gap-9">
          <div className="flex flex-wrap gap-5 border-b border-stroke dark:border-strokedark sm:gap-10">
            <Link
              to="#"
              className={`border-b-2 py-4 text-sm font-medium hover:text-primary md:text-base ${openTab === 1 ? activeClasses : inactiveClasses
                }`}
              onClick={() => setOpenTab(1)}
            >
              Aid Collection Centers
            </Link>
            <Link
              to="#"
              className={`border-b-2 py-4 text-sm font-medium hover:text-primary md:text-base ${openTab === 2 ? activeClasses : inactiveClasses
                }`}
              onClick={() => setOpenTab(2)}
            >
              Aid Distribution Centers
            </Link>
          </div>

          <div>
            <div className={`leading-relaxed ${openTab === 1 ? 'block' : 'hidden'}`} >
              <DataTableACCs />
            </div>
            <div className={`leading-relaxed ${openTab === 2 ? 'block' : 'hidden'}`} >
              <DataTablesADCs />
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default HLODashboard;