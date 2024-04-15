import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import DefaultLayout from '../../../layout/DefaultLayout';
import Breadcrumb from '../../Breadcrumbs/Breadcrumb';
import { AuthContext } from '../AuthProvider';
import closeImg from "../../../images/HLO/close-circle.svg";

const UpdateCenter: React.FC = () => {
  const { id } = useParams();
  const routeLocation = useLocation();

  const { auth, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [location, setLocation] = useState('');
  const [ema, setEma] = useState('');
  const [emaList, setEmaList] = useState([]);

  const [nameError, setNameError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [locationError, setLocationError] = useState('');
  const [emaError, setEmaError] = useState('');

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
    // Determine the base URL for the API call based on the current location
    const baseUrl = routeLocation.pathname.includes('acc') ? 'api/acc' : 'api/adc';

    // Fetch the data of the center when the component mounts
    axios.get(`http://localhost:8000/${baseUrl}/${id}/`)
      .then((response) => {
        const center = response.data;
        setName(center.name);
        setAddress(center.address);
        setLocation(center.location);
        setEma(center.ema);
      })
      .catch((error) => console.error('Error fetching center: ', error));

    // Fetch the list of EMAs when the component mounts
    axios.get('http://localhost:8000/api/ema/')
      .then((response) => setEmaList(response.data))
      .catch((error) => console.error('Error fetching EMAs: ', error));
  }, [id, routeLocation.pathname]);


  const handleSubmit = async (event) => {
    event.preventDefault();
    const baseUrl = routeLocation.pathname.includes('acc') ? 'api/acc' : 'api/adc';

    // Validate form data
    let hasError = false;
    if (!name) {
      setNameError('Name is required');
      hasError = true;
    } if (!address) {
      setAddressError('Address is required');
      hasError = true;
    } if (!location) {
      setLocationError('Location is required');
      hasError = true;
    } if (!ema) {
      setEmaError('EMA is required');
      hasError = true;
    }

    // If any errors were found, stop the form submission
    if (hasError) {
      return;
    }

    const centerData = {
      name,
      address,
      location,
      ema,
    };

    console.log(centerData);

    axios.put(`http://localhost:8000/${baseUrl}/${id}/`, centerData)
      .then((response) => {
        console.log(response);
        setMessage('Center updated successfully');
      })
      .catch((error) => {
        console.error('Error updating center: ', error);
      });
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Update Center" />
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
            <h2 className="mb-9 text-title-lg font-bold text-black dark:text-white">
              Update Center
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="mb-3 block text-md font-medium text-black dark:text-white">
                  Center Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setNameError(!e.target.value ? 'Name is required' : '');
                  }}
                  placeholder="Center Name"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                <span className="text-danger">{nameError}</span>
              </div>
              <div className="mb-4">
                <label className="mb-3 block text-md font-medium text-black dark:text-white">
                  Center Address
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    setAddressError(!e.target.value ? 'Address is required' : '');
                  }}
                  placeholder="Address"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                <span className="text-danger">{addressError}</span>
              </div>
              <div className="mb-4">
                <label className="mb-3 block text-md font-medium text-black dark:text-white">
                  Center Location
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                    setLocationError(!e.target.value ? 'Location is required' : '');
                  }}
                  placeholder="Latitude,Longitude"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                <span className="text-danger">{locationError}</span>
              </div>
              <div className="mb-6 relative z-20 bg-transparent dark:bg-form-input">
                <label className="mb-3 block text-md font-medium text-black dark:text-white">
                  Affiliated EMA
                </label>
                <select
                  value={ema}
                  onChange={(e) => {
                    setEma(e.target.value);
                    setEmaError(!e.target.value ? 'EMA is required' : '');
                  }}
                  className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                >
                  <option value="" disabled>Choose EMA</option>
                  {emaList.map((ema, index) => (
                    <option key={index} value={ema.id}>
                      {ema.name}
                    </option>
                  ))}
                </select>
                <span className="text-danger">{emaError}</span>
              </div>
              <div className="flex gap-6">
                <input
                  type="submit"
                  value="Update Center"
                  className="cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                />
                <Link to="/hlo/admin/manageCenters" className="flex items-center gap-2 underline hover:underline">
                  Back to All Centers
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default UpdateCenter;