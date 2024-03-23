import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validatePassword } from './DataAndFunctions/validationFunctions';
import { AuthContext } from './AuthProvider';
import DefaultLayout from '../../layout/DefaultLayout';
import PasswordWithPopover_Bigger from './PasswordWithPopover_Bigger';

const ConfirmPassword: React.FC = () => {
  const { auth, user } = useContext(AuthContext);
  const userType = user?.user_type;
  const userTypeRoutes = {
    'enterprise_courier': '/hlo/profile_ec',
    'volunteer_courier': '/hlo/profile_vc',
    'acc_admin': '/hlo/profile_accAdmin',
    'adc_admin': '/hlo/profile_adcAdmin',
  };
  const toAttribute = userTypeRoutes[userType];
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  // Redirect to login page if not authenticated
  useEffect(() => {
    if (!auth) {
      navigate('/auth/signin');
    }
  }, [auth, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();

    setPasswordError('');
    if (!password) {
      setPasswordError(validatePassword(password));
    }

    if (password === user?.password) { // This will not work, should change
      navigate(toAttribute);
    } else {
      console.log('Incorrect password');
    }
  };

  return (
    <DefaultLayout>
      <div className="rounded-sm bg-white shadow-default dark:bg-boxdark">
        <div className="w-full xl:w-1/2 m-auto">
          <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
            <h2 className="mb-9 text-2xl text-center font-bold text-black dark:text-white sm:text-title-xl2">
              Confirm Your Password to Proceed
            </h2>

            <form>
              <div className="mb-6">
                <PasswordWithPopover_Bigger
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setPasswordError(validatePassword(event.target.value));
                  }}
                />
                <span className="text-danger underline">{passwordError}</span>
              </div>
              <div className="mb-5">
                <input
                  type="submit"
                  value="Confirm Password"
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

export default ConfirmPassword;