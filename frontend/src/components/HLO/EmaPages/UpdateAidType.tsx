import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import DefaultLayout from '../../../layout/DefaultLayout';
import Breadcrumb from '../../Breadcrumbs/Breadcrumb';
import { AuthContext } from '../AuthProvider';
import closeImg from "../../../images/HLO/close-circle.svg";
import { useNavigate, useParams } from 'react-router-dom';

const UpdateAidType: React.FC = () => {
  const { auth, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [nameError, setNameError] = useState('');

  useEffect(() => {
    if (auth) {
      if (user?.user_type !== 'ema_admin') {
        navigate('/');
      }
    } else {
      navigate('/auth/signin');
    }

    const fetchAidType = async () => {
      try {
        const response = await axios.get(`http://24.133.52.46:8000/api/aid_type/${id}`);
        setName(response.data.name);
      } catch (error) {
        console.error('Failed to fetch aid type:', error);
      }
    };

    fetchAidType();
  }, [user, navigate, auth, id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    const url = `http://24.133.52.46:8000/api/aid_type/${id}/`;

    const aidRequestData = {
      name
    };

    try {
      const response = await axios.put(url, aidRequestData);
      console.log(response);
      setName('');
      setMessage('Aid type updated successfully.');
    } catch (error) {
      console.error('Error updating aid type: ', error);
      setMessage('Error updating aid type.');
    } finally {
      setFormSubmitted(false);
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Update Aid Type" />
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
            onClick={() => setMessage('')}
          >
            <img src={closeImg} width={35} height={35} alt="" />
          </button>
        </div>
      )}
      <div className="rounded-sm bg-white shadow-default dark:bg-boxdark">
        <div className="w-full xl:w-1/2">
          <div className='w-full p-4 sm:p-12.5'>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="mb-3 block text-md font-medium text-black dark:text-white">
                  Aid Type Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setNameError(!e.target.value ? 'Aid type name is required' : '');
                  }}
                  placeholder="Name"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                <span className="text-danger">{nameError}</span>
              </div>
              <button
                type="submit"
                disabled={formSubmitted}
                className="inline-flex items-center justify-center px-5 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default UpdateAidType;