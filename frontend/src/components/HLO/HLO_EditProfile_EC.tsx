import DefaultLayout from "../../layout/DefaultLayout";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import PhoneInput from "react-phone-number-input/input";
import DatePickerOne from "../Forms/DatePicker/DatePickerOne";
import PasswordWithPopover from "./PasswordWithPopover";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "./AuthProvider";
import { useNavigate } from "react-router-dom";
import closeImg from "../../images/HLO/close-circle.svg";
import axios from "axios";
import {
  validateEmail, validateCompanyName, validatePassword,
  validatePhoneNumber, validateCompanyAddress, validateTradeRegistrationNumber,
  validateNumberOfLightDuty, validateNumberOfMediumDuty, validateNumberOfHeavyDuty
} from './DataAndFunctions/validationFunctions';

const HLO_EditProfile_EC = () => {
  const { auth, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!user) {
      navigate('/auth/signin');
    }
  }, [user, navigate]);


  const [email, setEmail] = useState(user.email);
  const [companyName, setCompanyName] = useState(user.company_name);
  const [password, setPassword] = useState(user.password);
  const [phoneNumber, setPhoneNumber] = useState(user.phone_number);
  const [companyAddress, setCompanyAddress] = useState(user.company_address);
  const [dateOfEstablishment, setDateOfEstablishment] = useState(new Date(user.date_of_establishment));
  const [numberOfLightDuty, setNumberOfLightDuty] = useState(user.number_of_light_duty);
  const [numberOfMediumDuty, setNumberOfMediumDuty] = useState(user.number_of_medium_duty);
  const [numberOfHeavyDuty, setNumberOfHeavyDuty] = useState(user.number_of_heavy_duty);
  const [tradeRegistrationNumber, setTradeRegistrationNumber] = useState(user.trade_registration_number);

  const [emailError, setEmailError] = useState("");
  const [companyNameError, setCompanyNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [companyAddressError, setCompanyAddressError] = useState("");
  const [dateOfEstablishmentError, setDateOfEstablishmentError] = useState("");
  const [numberOfLightDutyError, setNumberOfLightDutyError] = useState("");
  const [numberOfMediumDutyError, setNumberOfMediumDutyError] = useState("");
  const [numberOfHeavyDutyError, setNumberOfHeavyDutyError] = useState("");
  const [tradeRegistrationNumberError, setTradeRegistrationNumberError] = useState("");

  const [formSubmitted, setFormSubmitted] = useState(false);
  const formSubmitRef = useRef(setFormSubmitted);


  useEffect(() => {
    formSubmitRef.current = setFormSubmitted;
  }, [setFormSubmitted]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    setEmailError("");
    setCompanyNameError("");
    setPasswordError("");
    setPhoneNumberError("");
    setCompanyAddressError("");
    setDateOfEstablishmentError("");
    setNumberOfLightDutyError("");
    setNumberOfMediumDutyError("");
    setNumberOfHeavyDutyError("");
    setTradeRegistrationNumberError("");

    // Validate the input fields
    if (!email) {
      setEmailError('Email must not be empty');
    } if (!companyName) {
      setCompanyNameError('Company name must not be empty');
    } if (!password) {
      setPasswordError('Password must not be empty');
    } if (!phoneNumber) {
      setPhoneNumberError('Phone number must not be empty');
    } if (!companyAddress) {
      setCompanyAddressError('Company address must not be empty');
    } if (!dateOfEstablishment) {
      setDateOfEstablishmentError('Date of establishment must not be empty');
    } if (!numberOfLightDuty) {
      setNumberOfLightDutyError('Number of light-duty vehicles must not be empty');
    } if (!numberOfMediumDuty) {
      setNumberOfMediumDutyError('Number of medium-duty vehicles must not be empty');
    } if (!numberOfHeavyDuty) {
      setNumberOfHeavyDutyError('Number of heavy-duty vehicles must not be empty');
    } if (!tradeRegistrationNumber) {
      setTradeRegistrationNumberError('Trade registration number must not be empty');
    }

    setFormSubmitted(true);
  };

  useEffect(() => {
    if (formSubmitted) {
      if (!emailError && !companyNameError && !passwordError && !phoneNumberError && !companyAddressError && !dateOfEstablishmentError && !numberOfLightDutyError && !numberOfMediumDutyError && !numberOfHeavyDutyError && !tradeRegistrationNumberError) {
        const dateOfEstablishmentString = `${dateOfEstablishment.getFullYear()}-${dateOfEstablishment.getMonth() + 1}-${dateOfEstablishment.getDate()}`;

        axios.put('http://localhost:8000/api/profile/enterprise/', {
          email,
          company_name: companyName,
          phone_number: phoneNumber,
          company_address: companyAddress,
          date_of_establishment: dateOfEstablishmentString,
          number_of_light_duty: numberOfLightDuty,
          number_of_medium_duty: numberOfMediumDuty,
          number_of_heavy_duty: numberOfHeavyDuty,
          trade_registration_number: tradeRegistrationNumber,
        }, {
          headers: {
            'Authorization': `Token ${auth}`
          }
        })
          .then(response => {
            console.log(response.data);
            setMessage('Profile updated successfully'); // Set the success message

            // Make a GET request to refill the input fields
            axios.get('http://localhost:8000/api/me/', {
              headers: {
                'Authorization': `Token ${auth}`
              }
            })
              .then(response => {
                setEmail(response.data.email);
                setCompanyName(response.data.company_name);
                setPassword(response.data.password);
                setPhoneNumber(response.data.phone_number);
                setCompanyAddress(response.data.company_address);
                setDateOfEstablishment(new Date(response.data.date_of_establishment));
                setNumberOfLightDuty(response.data.number_of_light_duty);
                setNumberOfMediumDuty(response.data.number_of_medium_duty);
                setNumberOfHeavyDuty(response.data.number_of_heavy_duty);
                setTradeRegistrationNumber(response.data.trade_registration_number);
              })
              .catch(error => {
                console.error('There was an error!', error);
              });
          })
          .catch(error => {
            console.error('There was an error!', error);
          });

        setFormSubmitted(false);
      }
    }
  }, [formSubmitted, emailError, companyNameError, passwordError, phoneNumberError, companyAddressError, dateOfEstablishmentError, numberOfLightDutyError, numberOfMediumDutyError, numberOfHeavyDutyError, tradeRegistrationNumberError]);

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
      <Breadcrumb pageName="Edit your profile" />
      <div className="px-5 py-3 rounded-lg-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <form action="#"
          onSubmit={handleFormSubmit} >
          <div className="p-6.5">
            <div className="mb-5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Company Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your full company name"
                  value={companyName}
                  onChange={(e) => {
                    setCompanyName(e.target.value);
                    setCompanyNameError(validateCompanyName(e.target.value));
                  }}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                <span className="text-danger font-bold">{companyNameError}</span>
              </div>

              <div className="w-full xl:w-1/2">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="yourmail@gmail.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError(validateEmail(e.target.value));
                  }}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                <span className="text-danger font-bold">{emailError}</span>
              </div>
            </div>

            <div className="mb-5.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2 flex flex-col">
                <PasswordWithPopover password={password} onPasswordChange={(password) => {
                  setPassword(password);
                  setPasswordError(validatePassword(password));
                }} />
                <span className="text-danger font-bold">{passwordError}</span>
              </div>

              <div className="w-full xl:w-1/2">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Phone Number
                </label>
                <PhoneInput
                  country="TR"
                  placeholder="512 345 6789"
                  value={phoneNumber}
                  onChange={(value) => {
                    setPhoneNumber(value);
                    setPhoneNumberError(validatePhoneNumber(value));
                  }}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                <span className="text-danger font-bold">{phoneNumberError}</span>
              </div>
            </div>

            <div className="mb-5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Company Address
                </label>
                <textarea
                  rows={2}
                  placeholder="(Country, city, state, street, apartment number, postal code)"
                  value={companyAddress}
                  onChange={(e) => {
                    setCompanyAddress(e.target.value);
                    setCompanyAddressError(validateCompanyAddress(e.target.value));
                  }}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                <span className="text-danger font-bold">{companyAddressError}</span>
              </div>
            </div>

            <div className="mb-5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Trade registry number
                </label>
                <input
                  value={tradeRegistrationNumber}
                  type="number"
                  placeholder="16 digits"
                  onChange={(e) => {
                    const limit = 16;
                    setTradeRegistrationNumber(e.target.value.slice(0, limit));
                    setTradeRegistrationNumberError(validateTradeRegistrationNumber(e.target.value));
                  }}
                  minLength={16}
                  min={1000000000000000}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                <span className="text-danger font-bold">{tradeRegistrationNumberError}</span>
              </div>

              <DatePickerOne selected={dateOfEstablishment} onChange={(date: Date) => setDateOfEstablishment(date)} />
              <span className="text-danger font-bold">{dateOfEstablishmentError}</span>
            </div>

            <div className="mb-5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Number of light-duty (2,700 kg - 6350 kg) vehicles in your fleet
                </label>
                <input
                  type="number"
                  placeholder="Light-duty: 2,700 kg - 6350 kg"
                  min={0}
                  value={numberOfLightDuty}
                  onChange={(e) => {
                    setNumberOfLightDuty(e.target.value);
                    setNumberOfLightDutyError(validateNumberOfLightDuty(e.target.value));
                  }}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                <span className="text-danger font-bold">{numberOfLightDutyError}</span>
              </div>

              <div className="w-full xl:w-1/2">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Number of medium-duty (6,350 kg - 12,000 kg) vehicles in your fleet
                </label>
                <input
                  type="number"
                  placeholder="Medium-duty: 6,350 kg - 12,000 kg"
                  min={0}
                  value={numberOfMediumDuty}
                  onChange={(e) => {
                    setNumberOfMediumDuty(e.target.value);
                    setNumberOfMediumDutyError(validateNumberOfMediumDuty(e.target.value));
                  }}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                <span className="text-danger font-bold">{numberOfMediumDutyError}</span>
              </div>
            </div>

            <div className="mb-5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Number of heavy-duty (12,000+ kg) vehicles in your fleet
                </label>
                <input
                  type="number"
                  placeholder="Heavy-duty: 12,000+ kg"
                  min={0}
                  value={numberOfHeavyDuty}
                  onChange={(e) => {
                    setNumberOfHeavyDuty(e.target.value);
                    setNumberOfHeavyDutyError(validateNumberOfHeavyDuty(e.target.value));
                  }}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                <span className="text-danger font-bold">{numberOfHeavyDutyError}</span>
              </div>
              <div className="lg:w-1/2 xl:w-1/2"></div>
            </div>

            <div className="mb-5">
              <input
                type="submit"
                disabled={formSubmitted}
                value="Save profile"
                className="flex w-full justify-center rounded-lg bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
              />
            </div>
          </div>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default HLO_EditProfile_EC;