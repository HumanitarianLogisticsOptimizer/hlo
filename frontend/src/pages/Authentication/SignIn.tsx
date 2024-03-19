import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import PasswordWithPopover_Bigger from '../../components/HLO/PasswordWithPopover_Bigger';
import axios from 'axios';
import { AuthContext } from '../../components/HLO/AuthProvider';
import { useNavigate } from 'react-router-dom';

const SignIn: React.FC = () => {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Reset the error messages
    setEmailError('');
    setPasswordError('');

    // Validate the email and password
    if (!email) {
      setEmailError('Email must not be empty');
      return;
    }
    if (!password) {
      setPasswordError('Password must not be empty');
      return;
    }

    // Add your password format validation here
    // if (!passwordMatchesFormat(password)) {
    //   setPasswordError('Password must match the requested format');
    //   return;
    // }

    try {
      const response = await axios.post('http://localhost:8000/api/login/', {
        email,
        password
      });

      console.log(response.data);
      // Store the token
      setAuth(response.data.token);
      navigate('/');
    } catch (error) {
      console.error('Error:', error);
      setEmailError('Email or password does not match');
      setPasswordError('Email or password does not match');
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Sign In" />
      <div className="rounded-sm bg-white shadow-default dark:bg-boxdark">
        <div className="w-full xl:w-1/2 m-auto">
          <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
            <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
              Sign In to HLO
            </h2>

            <form>
              <div className="mb-4">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    onChange={(event) => setEmail(event.target.value)}
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />

                  <span className="absolute right-4 top-4">
                    <svg
                      className="fill-current"
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.5">
                        <path
                          d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
                          fill=""
                        />
                      </g>
                    </svg>
                  </span>
                  <span className="text-danger underline">{emailError}</span>
                </div>
              </div>

              <div className="mb-6">
                <PasswordWithPopover_Bigger onChange={handlePasswordChange} />
                <span className="text-danger underline">{passwordError}</span>
              </div>
              <div className="mb-5">
                <input
                  type="submit"
                  value="Sign In"
                  onClick={handleSubmit}
                  className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                />
              </div>

              <div className="mt-6 text-center">
                <p>
                  Don't have an account?{' '}
                  <Link to="/auth/signup" className="text-primary">
                    Register
                  </Link>
                </p>
                <p className='mt-1'>
                  Are you an HLO Admin?{' '}
                  <Link to="http://0.0.0.0:8000/admin/login/" target="_blank" className="text-primary">
                    HLO Admin Log in
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default SignIn;
