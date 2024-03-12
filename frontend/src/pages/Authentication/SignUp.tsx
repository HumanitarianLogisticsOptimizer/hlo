import React, { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import Register_VolunteerCourier from '../../components/HLO/Register_VolunteerCourier';
import { Link } from 'react-router-dom';
import Register_EnterpriseCourier from '../../components/HLO/Register_EnterpriseCourier';

const SignUp: React.FC = () => {
  const [openTab, setOpenTab] = useState(1);

  const activeClasses = 'text-primary border-primary';
  const inactiveClasses = 'border-transparent';

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Register to HLO" />
      <div className="px-5 py-3 rounded-lg-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">

        <div className="flex flex-col gap-9">
          <div className="flex flex-wrap gap-5 border-b border-stroke dark:border-strokedark sm:gap-10">
            <Link
              to="#"
              className={`border-b-2 py-4 text-sm font-medium hover:text-primary md:text-base ${openTab === 1 ? activeClasses : inactiveClasses
                }`}
              onClick={() => setOpenTab(1)}
            >
              Volunteer Courier
            </Link>
            <Link
              to="#"
              className={`border-b-2 py-4 text-sm font-medium hover:text-primary md:text-base ${openTab === 2 ? activeClasses : inactiveClasses
                }`}
              onClick={() => setOpenTab(2)}
            >
              Enterprise Courier
            </Link>
          </div>

          <div>
            <div
              className={`leading-relaxed ${openTab === 1 ? 'block' : 'hidden'}`}
            >
              <Register_VolunteerCourier />
            </div>
            <div
              className={`leading-relaxed ${openTab === 2 ? 'block' : 'hidden'}`}
            >
              <Register_EnterpriseCourier />
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default SignUp;
