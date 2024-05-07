import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validatePassword } from '../DataAndFunctions/validationFunctions';
import { AuthContext } from '../AuthProvider';
import DefaultLayout from '../../../layout/DefaultLayout';
import axios from 'axios';
import closeImg from "../../../images/HLO/close-circle.svg";
import CodeWithPopover_Bigger from '../Components/CodeWithPopover_Bigger';

const ConfirmCode: React.FC = () => {
  const { auth, user } = useContext(AuthContext);
  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) {
      navigate('/auth/signin');
    }
    if (user?.user_type !== 'acc_admin' && user?.user_type !== 'adc_admin') {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const volunteerTasksResponse = await axios.get('http://24.133.52.46:8000/api/volunteer_tasks/');
      const enterpriseTasksResponse = await axios.get('http://24.133.52.46:8000/api/enterprise_tasks/');

      const tasks = [
        ...volunteerTasksResponse.data.map(task => ({ ...task, type: 'volunteer' })),
        ...enterpriseTasksResponse.data.map(task => ({ ...task, type: 'enterprise' })),
      ];

      for (let task of tasks) {
        if (task.source_code === code && task.status !== 'done') {
          if (user?.user_type === 'acc_admin' && user?.center === task.source) {
            await axios.put(`http://24.133.52.46:8000/api/${task.type}_tasks/${task.id}/`, { ...task, status: 'On the road' });
            setSuccessMessage('Task status updated to on the road');
            return;
          } else {
            setErrorMessage('ACC Admins can only input a source code if the source of the task matches the center');
            return;
          }
        } else if (task.target_code === code) {
          if (user?.user_type === 'adc_admin' && user?.center === task.target) {
            await axios.put(`http://24.133.52.46:8000/api/${task.type}_tasks/${task.id}/`, { ...task, status: 'Done' });
            setSuccessMessage('Task status updated to done');
            return;
          } else {
            setErrorMessage('ADC Admins can only input a target code if the source of the task matches the center');
            return;
          }
        }
      }

      setErrorMessage('Incorrect code');
    } catch (error) {
      console.error('Error checking code:', error);
    }
  };

  return (
    <DefaultLayout>
      {errorMessage && (
        <div className="mb-4 flex w-full border-l-6 border-[#F87171] bg-[#F87171] bg-opacity-[15%] px-7 py-8 shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-9">
          <div className="mr-5 flex h-9 w-full max-w-[36px] items-center justify-center rounded-lg bg-[#F87171]">
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
            <h3 className="text-lg font-semibold text-black dark:text-[#F87171]">
              {errorMessage}
            </h3>
          </div>
          <button
            className="ml-auto"
            onClick={() => setErrorMessage('')}
          >
            <img src={closeImg} width={35} height={35} alt="" />
          </button>
        </div>
      )}
      {successMessage && (
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
              {successMessage}
            </h3>
          </div>
          <button
            className="ml-auto"
            onClick={() => setSuccessMessage('')}
          >
            <img src={closeImg} width={35} height={35} alt="" />
          </button>
        </div>
      )}
      <div className="rounded-sm bg-white shadow-default dark:bg-boxdark">
        <div className="w-full xl:w-1/2 m-auto">
          <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
            <h2 className="mb-9 text-2xl text-center font-bold text-black dark:text-white sm:text-title-xl2">
              Confirm Your 6-Digit Code to Proceed
            </h2>

            <form>
              <div className="mb-6">
                <CodeWithPopover_Bigger
                  onChange={(event) => {
                    setCode(event.target.value);
                    setCodeError(validatePassword(event.target.value));
                  }}
                />
                <span className="text-danger underline">{codeError}</span>
              </div>
              <div className="mb-5">
                <input
                  type="submit"
                  value="Confirm Code"
                  onClick={handleSubmit}
                  className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                />
              </div>
            </form>
          </div>
        </div>
      </div>

    </DefaultLayout>
  );
};

export default ConfirmCode;