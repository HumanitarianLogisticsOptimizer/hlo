import React from 'react'
import DefaultLayout from '../../layout/DefaultLayout';
import EMAModal from './EMAModal';
// import { Link } from 'react-router-dom';

interface User {
  name: string;
  title: string;
  email: string;
  role: string;
}

const users: User[] = [
  {
    name: 'Ogul Ayvaci',
    title: '34 SN 2288',
    email: 'musharof@example.com',
    role: 'Light-Duty',
  },
  {
    name: 'Nihat Ozdemir',
    title: '06 ABC 012',
    email: 'naimurrahman@example.com',
    role: 'Medium-Duty',
  },
  {
    name: 'Mustafa Asim Altinsik ',
    title: '06 ABC 020',
    email: 'shafiq.hd@example.com',
    role: 'Light-Duty',
  },
  {
    name: 'Suphi Erkin Karacay',
    title: '06 LBZ 091',
    email: 'alex.semuel@example.com',
    role: 'Medium-Duty',
  },
  {
    name: 'Serkan Genc',
    title: '45 CBA 123',
    email: 'suliym.info@example.com',
    role: 'Heavy-Duty',
  },
];

const TableFive: React.FC = () => {
  return (
    <DefaultLayout>
      <div className="overflow-hidden rounded-[10px]">
        <div className="max-w-full overflow-x-auto">
          <div className="min-w-[1170px]">
            {/* table header start */}
            <div className="grid grid-cols-12 bg-[#F9FAFB] px-5 py-4 dark:bg-meta-4 lg:px-7.5 2xl:px-11">
              <div className="col-span-3">
                <h5 className="font-medium text-[#637381] dark:text-bodydark">
                  COMPANY NAME
                </h5>
              </div>

              <div className="col-span-3">
                <h5 className="font-medium text-[#637381] dark:text-bodydark">
                  Vehicle Plate No
                </h5>
              </div>

              <div className="col-span-3">
                <h5 className="font-medium text-[#637381] dark:text-bodydark">
                  EMAIL
                </h5>
              </div>

              <div className="col-span-2">
                <h5 className="font-medium text-[#637381] dark:text-bodydark">
                  CAR TYPE
                </h5>
              </div>
            </div>
            {/* table header end */}

            {/* table body start */}
            <div className="bg-white dark:bg-boxdark">
              {users.map((user, index) => (
                <div
                  key={index}
                  className="grid grid-cols-12 border-t border-[#EEEEEE] px-5 py-4 dark:border-strokedark lg:px-7.5 2xl:px-11"
                >
                  <div className="col-span-3">
                    <p className="text-[#637381] dark:text-bodydark">
                      {user.name}
                    </p>
                  </div>

                  <div className="col-span-3">
                    <p className="text-[#637381] dark:text-bodydark">
                      {user.title}
                    </p>
                  </div>

                  <div className="col-span-3">
                    <p className="text-[#637381] dark:text-bodydark">
                      {user.email}
                    </p>
                  </div>

                  <div className="col-span-2">
                    <p className="text-[#637381] dark:text-bodydark">
                      {user.role}
                    </p>
                  </div>

                  <div className="col-span-1">
                    {/* <button className="float-right text-primary">View</button> */}
                    <EMAModal />
                  </div>
                </div>
              ))}
            </div>
            {/* table body end */}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default TableFive