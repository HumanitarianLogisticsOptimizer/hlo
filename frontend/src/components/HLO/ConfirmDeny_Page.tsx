import React, { useEffect, useState } from 'react'
import DefaultLayout from '../../layout/DefaultLayout';
import axios from 'axios';
import closeImg from "../../images/HLO/close-circle.svg"
interface User {
  email: string;
}

const ConfirmDeny_Page: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  const fetchUsers = () => {
    axios.get('http://localhost:8000/api/activate-user/')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const activateUser = (email: string) => {
    axios.post('http://localhost:8000/api/activate-user/', { email: email })
      .then(response => {
        console.log(response.data);
        setMessage('User activated successfully');
        fetchUsers();
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <DefaultLayout>
      {message && (
        <div className="mb-4 flex w-full border-l-6 border-[#34D399] bg-[#34D399] bg-opacity-[15%] px-7 py-8 shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-9">
          <div className="mr-5 flex h-9 w-full max-w-[36px] items-center justify-center rounded-lg bg-[#34D399]">
            <svg
              width="16"
              height="12"
              viewBox="0 0 16 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.2984 0.826822L15.2868 0.811827L15.2741 0.797751C14.9173 0.401867 14.3238 0.400754 13.9657 0.794406L5.91888 9.45376L2.05667 5.2868C1.69856 4.89287 1.10487 4.89389 0.747996 5.28987C0.417335 5.65675 0.417335 6.22337 0.747996 6.59026L0.747959 6.59029L0.752701 6.59541L4.86742 11.0348C5.14445 11.3405 5.52858 11.5 5.89581 11.5C6.29242 11.5 6.65178 11.3355 6.92401 11.035L15.2162 2.11161C15.5833 1.74452 15.576 1.18615 15.2984 0.826822Z"
                fill="white"
                stroke="white"
              ></path>
            </svg>
          </div>
          <div className="w-full">
            <h3 className="text-lg font-semibold text-black dark:text-[#34D399] ">
              {message}
            </h3>
          </div>
          <button
            className="ml-auto"
            onClick={() => setMessage(null)}
          >
            <img src={closeImg} width={35} height={35} alt="" />
          </button>
        </div>
      )}
      <div className="overflow-hidden rounded-[10px]">
        <div className="max-w-full overflow-x-auto">
          <div className="min-w-[1170px]">
            {/* table header start */}
            <div className="grid grid-cols-4 px-5 py-4 dark:bg-meta-4 lg:px-7.5 2xl:px-11 bg-primary">
              <div className="col-span-3">
                <h5 className=" text-white font-bold">
                  EMAIL
                </h5>
              </div>
            </div>
            {/* table header end */}

            {/* table body start */}
            <div className="bg-white dark:bg-boxdark">
              {users.map((user, index) => (
                <div
                  key={index}
                  className="grid grid-cols-4 border-t border-[#EEEEEE] px-5 py-4 dark:border-strokedark lg:px-7.5 2xl:px-11"
                >
                  <div className="col-span-3">
                    <p className="text-[#637381] dark:text-bodydark">
                      {user.email}
                    </p>
                  </div>

                  <div className="col-span-1 flex justify-end">
                    <button
                      className="inline-flex items-center justify-center gap-2.5 rounded-md border border-primary py-2 px-4 text-center font-medium text-primary dark:border-white dark:text-white hover:shadow-4 lg:px-8 xl:px-10"
                      onClick={() => activateUser(user.email)}
                    >
                      Activate
                    </button>
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

export default ConfirmDeny_Page;