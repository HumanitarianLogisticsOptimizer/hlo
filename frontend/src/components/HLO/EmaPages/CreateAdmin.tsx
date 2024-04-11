import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import DefaultLayout from '../../../layout/DefaultLayout';
import Breadcrumb from '../../Breadcrumbs/Breadcrumb';
import closeImg from "../../../images/HLO/close-circle.svg";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthProvider';

const CreateAdmin: React.FC = () => {
  const { auth, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [openTab, setOpenTab] = useState(1);

  const activeClasses = 'text-primary border-primary';
  const inactiveClasses = 'border-transparent';

  const [message, setMessage] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accCenterId, setAccCenterId] = useState('');
  const [adcCenterId, setAdcCenterId] = useState('');
  const [accList, setAccList] = useState([]);
  const [adcList, setAdcList] = useState([]);

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [accCenterIdError, setAccCenterIdError] = useState('');
  const [adcCenterIdError, setAdcCenterIdError] = useState('');

  const [formSubmitted, setFormSubmitted] = useState(false);

  const [isAccOptionSelected, setIsAccOptionSelected] = useState<boolean>(false);
  const [isAdcOptionSelected, setIsAdcOptionSelected] = useState<boolean>(false);

  const changeAccTextColor = () => {
    setIsAccOptionSelected(true);
  };

  const changeAdcTextColor = () => {
    setIsAdcOptionSelected(true);
  };

  useEffect(() => {
    if (auth) {
      if (user?.user_type && ['acc_admin', 'adc_admin', 'volunteer_courier', 'enterprise_courier'].includes(user?.user_type)) {
        navigate('/');
      }
    } else {
      navigate('/auth/signin');
    }
  }, [user, navigate, auth]);

  useEffect(() => {
    const fetchCenters = async () => {
      try {
        const accResponse = await axios.get('http://localhost:8000/api/acc');
        const adcResponse = await axios.get('http://localhost:8000/api/adc');
        setAccList(accResponse.data);
        setAdcList(adcResponse.data);
      } catch (error) {
        console.error('Error fetching centers: ', error);
      }
    };

    fetchCenters();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate form data
    let hasError = false;
    if (!email) {
      setEmailError('Email is required');
      hasError = true;
    } if (!password) {
      setPasswordError('Password is required');
      hasError = true;
    } if (openTab === 1 && !accCenterId) {
      setAccCenterIdError('ACC ID is required');
      hasError = true;
    } if (openTab === 2 && !adcCenterId) {
      setAdcCenterIdError('ADC ID is required');
      hasError = true;
    }

    if (hasError) {
      return;
    }

    setFormSubmitted(true);

    let url;
    let centerId;
    if (openTab === 1) {
      url = 'http://localhost:8000/api/acc-admin-register/';
      centerId = accCenterId;
    } else if (openTab === 2) {
      url = 'http://localhost:8000/api/adc-admin-register/';
      centerId = adcCenterId;
    } else {
      console.error('Invalid button type');
      return;
    }

    const adminData = {
      email,
      password,
      center_id: centerId,
    };

    try {
      const response = await axios.post(url, adminData);
      console.log(response);
      setMessage('Admin successfully created');
      setEmail('');
      setPassword('');
      setAccCenterId('');
      setAdcCenterId('');

      // Activate the admin
      try {
        const activateResponse = await axios.post('http://localhost:8000/api/activate-user/', { email });
        console.log(activateResponse);
      } catch (activateError) {
        console.error('Error activating admin: ', activateError);
      }
    } catch (error) {
      console.error('Error creating admin: ', error);
    } finally {
      setFormSubmitted(false);
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Create New Admin" />
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
      <div className="rounded-sm bg-white shadow-default dark:bg-boxdark">
        <div className="w-full xl:w-1/2">
          <div className='w-full p-4 sm:p-12.5 xl:p-17.5'>
            <h2 className="mb-4 text-title-lg font-bold text-black dark:text-white">
              Create New Aid Center Admin
            </h2>
            <div className="mb-4 flex flex-wrap gap-5 border-b border-stroke dark:border-strokedark sm:gap-10">
              <Link
                to="#"
                className={`border-b-2 py-4 px-3 text-sm font-medium hover:text-primary md:text-base ${openTab === 1 ? activeClasses : inactiveClasses
                  }`}
                onClick={() => setOpenTab(1)}
              >
                ACC Admin
              </Link>
              <Link
                to="#"
                className={`border-b-2 py-4 px-3 text-sm font-medium hover:text-primary md:text-base ${openTab === 2 ? activeClasses : inactiveClasses
                  }`}
                onClick={() => setOpenTab(2)}
              >
                ADC Admin
              </Link>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="mb-3 block text-md font-medium text-black dark:text-white">
                  Admin's Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError(!e.target.value ? 'Email is required' : '');
                  }}
                  placeholder="Email"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                <span className="text-danger">{emailError}</span>
              </div>

              <div className="mb-4">
                <label className="mb-3 block text-md font-medium text-black dark:text-white">
                  Admin's Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError(!e.target.value ? 'Password is required' : '');
                  }}
                  placeholder="Password"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                <span className="text-danger">{passwordError}</span>
              </div>

              <div className={`leading-relaxed ${openTab === 1 ? 'block' : 'hidden'}`} >
                <div className="mb-4 relative">
                  <label className="mb-3 block text-md font-medium text-black dark:text-white">
                    Admin's Aid Collection Center
                  </label>
                  <select
                    value={accCenterId}
                    onChange={(e) => {
                      setAccCenterId(e.target.value);
                      setAccCenterIdError(!e.target.value ? 'ACC ID is required' : '');
                      changeAccTextColor();
                    }}
                    className={`w-full appearance-none rounded border border-stroke py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary 
                    ${isAccOptionSelected ? 'text-black dark:text-white' : ''}`}
                  >
                    <option value="" disabled>Select ACC</option>
                    {accList.map((center, index) => (
                      <option key={index} value={center.id}>
                        {center.name}
                      </option>
                    ))}
                  </select>
                  <span className="text-danger">{accCenterIdError}</span>
                  <span className="absolute top-1/2 right-4 z-30 translate-y-2">
                    <svg
                      className="fill-current"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.8">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                          fill=""
                        ></path>
                      </g>
                    </svg>
                  </span>
                </div>
                <button type="submit" disabled={formSubmitted} className="cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90">
                  Create ACC Admin
                </button>
              </div>

              <div className={`leading-relaxed ${openTab === 2 ? 'block' : 'hidden'}`} >
                <div className="mb-4 relative">
                  <label className="mb-3 block text-md font-medium text-black dark:text-white">
                    Admin's Aid Distribution Center
                  </label>
                  <select
                    value={adcCenterId}
                    onChange={(e) => {
                      setAdcCenterId(e.target.value);
                      setAdcCenterIdError(!e.target.value ? 'ADC ID is required' : '');
                      changeAdcTextColor();
                    }}
                    className={`w-full appearance-none rounded border border-stroke py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary 
                    ${isAdcOptionSelected ? 'text-black dark:text-white' : ''}`}
                  >
                    <option value="" disabled>Select ADC</option>
                    {adcList.map((center, index) => (
                      <option key={index} value={center.id}>
                        {center.name}
                      </option>
                    ))}
                  </select>
                  <span className="text-danger">{adcCenterIdError}</span>
                  <span className="absolute top-1/2 right-4 z-30 translate-y-2">
                    <svg
                      className="fill-current"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.8">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                          fill=""
                        ></path>
                      </g>
                    </svg>
                  </span>

                </div>
                <button type="submit" disabled={formSubmitted} className="cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90">
                  Create ADC Admin
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default CreateAdmin;