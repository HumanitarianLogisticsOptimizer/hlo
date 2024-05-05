import PhoneInput from "react-phone-number-input/input";
import { Link } from "react-router-dom";
import DatePickerOne from "../Forms/DatePicker/DatePickerOne";
import PasswordWithPopover from "./Components/PasswordWithPopover";
import { useEffect, useRef, useState } from "react";
import closeImg from "../../images/HLO/close-circle.svg";
import {
  validateEmail, validateCompanyName, validatePassword,
  validatePhoneNumber, validateCompanyAddress, validateTradeRegistrationNumber,
  validateNumberOfLightDuty, validateNumberOfMediumDuty, validateNumberOfHeavyDuty,
  validateCity
} from './DataAndFunctions/validationFunctions';
import { cities } from './DataAndFunctions/cities';

const Register_EnterpriseCourier: React.FC = () => {
  const [message, setMessage] = useState(null);

  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [city, setCity] = useState("");
  const [dateOfEstablishment, setDateOfEstablishment] = useState(new Date());
  const [numberOfLightDuty, setNumberOfLightDuty] = useState("");
  const [numberOfMediumDuty, setNumberOfMediumDuty] = useState("");
  const [numberOfHeavyDuty, setNumberOfHeavyDuty] = useState("");
  const [tradeRegistrationNumber, setTradeRegistrationNumber] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const formSubmitRef = useRef(setFormSubmitted);

  const [emailError, setEmailError] = useState("");
  const [companyNameError, setCompanyNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [companyAddressError, setCompanyAddressError] = useState("");
  const [cityError, setCityError] = useState("");
  const [tradeRegistrationNumberError, setTradeRegistrationNumberError] = useState("");
  const [numberOfLightDutyError, setNumberOfLightDutyError] = useState("");
  const [numberOfMediumDutyError, setNumberOfMediumDutyError] = useState("");
  const [numberOfHeavyDutyError, setNumberOfHeavyDutyError] = useState("");

  const [selectedOption, setSelectedOption] = useState<string>('');
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);



  useEffect(() => {
    formSubmitRef.current = setFormSubmitted;
  }, [setFormSubmitted]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Reset the error messages
    setEmailError("");
    setCompanyNameError("");
    setPasswordError("");
    setPhoneNumberError("");
    setCompanyAddressError("");
    setCityError("");
    setTradeRegistrationNumberError("");
    setNumberOfLightDutyError("");
    setNumberOfMediumDutyError("");
    setNumberOfHeavyDutyError("");

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
    } if (!city) {
      setCityError('City must not be empty');
    } if (!tradeRegistrationNumber) {
      setTradeRegistrationNumberError('Trade registration number must not be empty');
    } if (!numberOfLightDuty) {
      setNumberOfLightDutyError('Number of light-duty vehicles must not be empty');
    } if (!numberOfMediumDuty) {
      setNumberOfMediumDutyError('Number of medium-duty vehicles must not be empty');
    } if (!numberOfHeavyDuty) {
      setNumberOfHeavyDutyError('Number of heavy-duty vehicles must not be empty');
    }

    // Check if any errors were found
    if (emailError || companyNameError || passwordError || phoneNumberError || companyAddressError || cityError
      || tradeRegistrationNumberError || numberOfLightDutyError || numberOfMediumDutyError || numberOfHeavyDutyError) {
      return;
    }

    setFormSubmitted(true);

    fetch('http://24.133.52.46:8000/api/enterprise-courier-register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        company_name: companyName,
        password,
        phone_number: phoneNumber,
        company_address: companyAddress,
        city: city,
        date_of_establishment: dateOfEstablishment.toISOString().split('T')[0],
        number_of_light_duty: numberOfLightDuty,
        number_of_medium_duty: numberOfMediumDuty,
        number_of_heavy_duty: numberOfHeavyDuty,
        trade_registration_number: tradeRegistrationNumber,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text().then(text => text ? JSON.parse(text) : {});
      })
      .then(data => {
        console.log(data);
        setMessage('Registration request sent! Please wait for the admin to approve your request.');

        setEmail("");
        setCompanyName("");
        setPassword("");
        setPhoneNumber("");
        setCompanyAddress("");
        setDateOfEstablishment(new Date());
        setNumberOfLightDuty("");
        setNumberOfMediumDuty("");
        setNumberOfHeavyDuty("");
        setTradeRegistrationNumber("");
      })
      .catch(error => {
        console.error('Error:', error);
      })
      .finally(() => {
        setFormSubmitted(false);
      });
  };

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  return (
    <div>
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
      <div className="dark:border-strokedark">
        <h2 className="text-lg font-bold text-black dark:text-white sm:text-title-lg">
          Register as an Enterprise Courier
        </h2>
      </div>
      <form action="#" onSubmit={handleFormSubmit}>
        <div className="p-6.5">
          <div className="mb-5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Company Name
              </label>
              <input
                type="text"
                placeholder="Enter your company name"
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

          <div className="mb-5.5">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              {' '}
              City {' '}
            </label>

            <div className="relative z-20 bg-transparent dark:bg-form-input">
              <select
                value={selectedOption}
                onChange={(e) => {
                  setSelectedOption(e.target.value);
                  setCity(e.target.value);
                  setCityError(validateCity(e.target.value));
                }}
                className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${isOptionSelected ? 'text-black dark:text-white' : ''
                  }`}
              >
                <option value="" disabled className="text-body dark:text-bodydark">
                  Select your city
                </option>
                {Object.keys(cities).map((city) => (
                  <option value={city} className="text-black dark:text-bodydark">
                    {city}
                  </option>
                ))}
              </select>
              <span className="absolute right-6 top-1/2 z-30 -translate-y-1/2">
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
          </div>

          <div className="mb-5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Company Address
              </label>
              <textarea
                minLength={1}
                rows={2}
                placeholder="(Country, city, state, street, apartment number, postal code)"
                value={companyAddress}
                onChange={(e) => {
                  setCompanyAddress(e.target.value);
                  setCompanyAddressError(validateCompanyAddress(e.target.value));
                }}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              ></textarea>
              <span className="text-danger font-bold">{companyAddressError}</span>
            </div>
          </div>

          <div className="mb-5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Trade registry number
              </label>
              <input
                type="number"
                placeholder="16 digits"
                value={tradeRegistrationNumber}
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
          </div>

          <div className="mb-5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Number of light-duty (2,700 kg - 6350 kg) vehicles in your fleet
              </label>
              <input
                type="number"
                placeholder="Light-duty: 2,700 kg - 6350 kg"
                value={numberOfLightDuty}
                onChange={(e) => {
                  setNumberOfLightDuty(e.target.value);
                  setNumberOfLightDutyError(validateNumberOfLightDuty(e.target.value));
                }}
                min={0}
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
                value={numberOfMediumDuty}
                onChange={(e) => {
                  setNumberOfMediumDuty(e.target.value);
                  setNumberOfMediumDutyError(validateNumberOfMediumDuty(e.target.value));
                }}
                min={0}
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
                value={numberOfHeavyDuty}
                onChange={(e) => {
                  setNumberOfHeavyDuty(e.target.value);
                  setNumberOfHeavyDutyError(validateNumberOfHeavyDuty(e.target.value));
                }}
                min={0}
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
              value="Send Registration Request"
              className="flex w-full justify-center rounded-lg bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
            />

          </div>

          <div className="mt-5 text-center">
            <p>
              Already have an account?{' '}
              <Link to="/auth/signin" className="text-primary">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register_EnterpriseCourier;