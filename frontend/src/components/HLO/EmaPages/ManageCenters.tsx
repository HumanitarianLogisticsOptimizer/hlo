import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import DefaultLayout from '../../../layout/DefaultLayout';
import Breadcrumb from '../../Breadcrumbs/Breadcrumb';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthProvider';
import closeImg from "../../../images/HLO/close-circle.svg";

const ManageCenters: React.FC = () => {
  const { auth, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [accs, setAccs] = useState([]);
  const [adcs, setAdcs] = useState([]);
  const [message, setMessage] = useState('');

  const [openTab, setOpenTab] = useState(1);
  const activeClasses = 'text-primary border-primary';
  const inactiveClasses = 'border-transparent';

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
    const fetchAccs = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/acc');
        setAccs(response.data);
      } catch (error) {
        console.error('Error fetching ACCs: ', error);
      }
    };

    const fetchAdcs = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/adc');
        setAdcs(response.data);
      } catch (error) {
        console.error('Error fetching ADCs: ', error);
      }
    };

    fetchAccs();
    fetchAdcs();
  }, []);

  const handleDelete = async (id, type) => {
    let url;
    if (type === 'acc') {
      url = `http://localhost:8000/api/acc/${id}`;
    } else if (type === 'adc') {
      url = `http://localhost:8000/api/adc/${id}`;
    } else {
      console.error('Invalid center type');
      return;
    }

    try {
      const response = await axios.delete(url);
      console.log(response);
      // Refresh the data
      if (type === 'acc') {
        const updatedAccs = accs.filter(acc => acc.id !== id);
        setAccs(updatedAccs);
      } else if (type === 'adc') {
        const updatedAdcs = adcs.filter(adc => adc.id !== id);
        setAdcs(updatedAdcs);
      }
      setMessage('Center deleted successfully.');
    } catch (error) {
      console.error('Error deleting center: ', error);
      setMessage('Error deleting center.');
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Manage Centers" />
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
            onClick={() => setMessage(null)}
          >
            <img src={closeImg} width={35} height={35} alt="" />
          </button>
        </div>
      )}
      <div className='w-full'>
        <div className="mb-4 flex flex-wrap gap-5 border-b border-stroke dark:border-strokedark sm:gap-10">
          <Link
            to="#"
            className={`border-b-2 py-4 px-3 text-lg font-medium hover:text-primary ${openTab === 1 ? activeClasses : inactiveClasses
              }`}
            onClick={() => setOpenTab(1)}
          >
            ACCs
          </Link>
          <Link
            to="#"
            className={`border-b-2 py-4 px-3 text-lg font-medium hover:text-primary ${openTab === 2 ? activeClasses : inactiveClasses
              }`}
            onClick={() => setOpenTab(2)}
          >
            ADCs
          </Link>
        </div>
        <div className="overflow-hidden rounded-[10px]">
          <div className="max-w-full overflow-x-auto">
            <div className="min-w-[1170px]">
              {/* table header start */}
              <div className="grid grid-cols-4 px-5 py-4 dark:bg-meta-4 lg:px-7.5 2xl:px-11 bg-primary">
                <div>
                  <h5 className="text-white font-bold">
                    Name
                  </h5>
                </div>
                <div>
                  <h5 className="text-white font-bold">
                    Address
                  </h5>
                </div>
                <div></div>
                <div>
                  <h5 className="text-white font-bold">
                    Actions
                  </h5>
                </div>
              </div>
              {/* table header end */}

              {/* table body start */}
              <div className="bg-white dark:bg-boxdark">
                {(openTab === 1 ? accs : adcs).map((center, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-4 border-t border-[#EEEEEE] px-5 py-4 dark:border-strokedark lg:px-7.5 2xl:px-11"
                  >
                    <div>
                      <p className="text-[#637381] dark:text-bodydark">
                        {center.name}
                      </p>
                    </div>
                    <div>
                      <textarea readOnly rows={2} cols={50} className="text-[#637381] dark:text-bodydark border-none bg-transparent resize-none"
                        style={{ overflow: 'hidden', padding: '0' }}
                      >
                        {center.address}
                      </textarea>
                    </div>
                    <div className="col-span-2 gap-7 flex justify-end">
                      <button
                        className="inline-flex items-center justify-center rounded-md border border-primary px-4 text-center font-medium text-primary dark:border-white dark:text-white hover:shadow-4 lg:px-8 xl:px-10"
                        onClick={() => navigate(`/hlo/admin/update-${openTab === 1 ? 'acc' : 'adc'}/${center.id}`)}
                      >
                        Update
                      </button>
                      <button
                        className="inline-flex items-center justify-center rounded-md border border-primary px-4 text-center font-medium text-primary dark:border-white dark:text-white hover:shadow-4 lg:px-8 xl:px-10"
                        onClick={() => handleDelete(center.id, openTab === 1 ? 'acc' : 'adc')}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {/* table body end */}
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ManageCenters;