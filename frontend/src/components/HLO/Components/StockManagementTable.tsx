import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import DefaultLayout from '../../../layout/DefaultLayout';
import Breadcrumb from '../../Breadcrumbs/Breadcrumb';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthProvider';
import closeImg from "../../../images/HLO/close-circle.svg";

const ManageAidTypes: React.FC = () => {
  const { auth, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [aidTypes, setAidTypes] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (auth) {
      if (user?.user_type !== 'ema_admin') {
        navigate('/');
      }
    } else {
      navigate('/auth/signin');
    }
  }, [user, navigate, auth]);

  useEffect(() => {
    const fetchAidTypes = async () => {
      try {
        const response = await axios.get('http://24.133.52.46:8000/api/aid_type');
        setAidTypes(response.data);
      } catch (error) {
        console.error('Error fetching aid types: ', error);
      }
    };

    fetchAidTypes();
  }, []);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Manage Aid Types" />
      {message && (
        <div className={`mb-4 flex w-full border-l-6 ${message.startsWith('Error') ? 'border-[#F87171] bg-[#F87171]' : 'border-[#34D399] bg-[#34D399]'} bg-opacity-[15%] px-7 py-8 shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-9`}>
          <div className={`mr-5 flex h-9 w-full max-w-[36px] items-center justify-center rounded-lg ${message.startsWith('Error') ? 'bg-[#F87171]' : 'bg-[#34D399]'}`}>
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
            <h3 className={`text-lg font-semibold ${message.startsWith('Error') ? 'text-[#B45454]' : 'text-black dark:text-[#34D399]'}`}>
              {message}
            </h3>
          </div>
          <button
            className="ml-auto"
            onClick={() => setMessage('')}
          >
            <img src={closeImg} width={35} height={35} alt="" />
          </button>
        </div>
      )}
      <div className="min-w-[900px]">
        {/* table header start */}
        <div className="grid grid-cols-12 rounded-t-[10px] bg-primary dark:bg-meta-4 px-5 py-4 lg:px-7.5 2xl:px-11">
          <div className="col-span-3 pl-3">
            <h5 className="font-medium text-white">Aid Type Name</h5>
          </div>
          <div className="col-span-3">
            <h5 className="font-medium text-white">Actions</h5>
          </div>
        </div>
        {/* table header end */}

        {/* table body start */}
        <div className="rounded-b-[10px] bg-white dark:bg-boxdark">
          {aidTypes.map((aidType, index) => (
            <div
              key={index}
              className="grid grid-cols-12 border-t border-[#EEEEEE] px-5 py-4 dark:border-strokedark lg:px-7.5 2xl:px-11"
            >
              <div className="col-span-3 pl-3">
                <p className="text-[#637381] dark:text-bodydark">{aidType.name}</p>
              </div>

              <div className="col-span-3">
                <button
                  className="inline-flex items-center justify-center gap-2.5 rounded-md border border-primary py-2 px-4 text-center font-medium text-boxdark dark:border-white dark:text-white hover:shadow-4 lg:px-8 xl:px-10"
                >
                  Edit
                </button>
                <button
                  className="inline-flex items-center justify-center gap-2.5 rounded-md border border-primary py-2 px-4 text-center font-medium text-boxdark dark:border-white dark:text-white hover:shadow-4 lg:px-8 xl:px-10"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* table body end */}
      </div>
    </DefaultLayout>
  );
};

export default ManageAidTypes;