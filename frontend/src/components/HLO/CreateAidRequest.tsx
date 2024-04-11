import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthProvider';

const CreateAidRequest: React.FC = () => {
  const { auth, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) {
      navigate('/auth/signin');
    }
    if (user?.user_type !== 'acc_admin' && user?.user_type !== 'adc_admin') {
      navigate('/');
    }
  }, [user, navigate]);

  const [openTab, setOpenTab] = useState(1);

  const activeClasses = 'text-primary border-primary';
  const inactiveClasses = 'border-transparent';

  const [type, setType] = useState('');

  const [typeError, setTypeError] = useState('');

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate form data
    let hasError = false;
    if (!type) {
      setTypeError('Name is required');
      hasError = true;
    }

    if (hasError) {
      return;
    }

    setFormSubmitted(true);

    let url;
    if (openTab === 1) {
      url = '#'; // replace with the actual URL
    } else if (openTab === 2) {
      url = '#'; // replace with the actual URL
    } else {
      console.error('Invalid button type');
      return;
    }

    const aidRequestData = {
      type,
      center: user.center_id,
    };

    try {
      const response = await axios.post(url, aidRequestData);
      console.log(response);
      setType('');
    } catch (error) {
      console.error('Error creating aid request: ', error);
    } finally {
      setFormSubmitted(false);
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Create New Aid Request" />
      <div className="rounded-sm bg-white shadow-default dark:bg-boxdark">
        <div className="w-full xl:w-1/2">
          <div className='w-full p-4 sm:p-12.5 xl:p-17.5'>
            <h2 className="mb-4 text-title-lg font-bold text-black dark:text-white">
              Create New Aid Request
            </h2>
            <div className="mb-4 flex flex-wrap gap-5 border-b border-stroke dark:border-strokedark sm:gap-10">
              <Link
                to="#"
                className={`border-b-2 py-4 px-3 text-sm font-medium hover:text-primary md:text-base ${openTab === 1 ? activeClasses : inactiveClasses
                  }`}
                onClick={() => setOpenTab(1)}
              >
                ACC Aid
              </Link>
              <Link
                to="#"
                className={`border-b-2 py-4 px-3 text-sm font-medium hover:text-primary md:text-base ${openTab === 2 ? activeClasses : inactiveClasses
                  }`}
                onClick={() => setOpenTab(2)}
              >
                ADC Aid
              </Link>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="mb-3 block text-md font-medium text-black dark:text-white">
                  Name
                </label>
                <input
                  type="text"
                  value={type}
                  onChange={(e) => {
                    setType(e.target.value);
                    setTypeError(!e.target.value ? 'Name is required' : '');
                  }}
                  placeholder="Name"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                <span className="text-danger">{typeError}</span>
              </div>

              <button type="submit" disabled={formSubmitted} className="cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90">
                Create Aid Request
              </button>
            </form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default CreateAidRequest;