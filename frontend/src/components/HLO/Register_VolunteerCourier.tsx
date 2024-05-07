import axios from "axios";
import PhoneInput from "react-phone-number-input/input";
import { Link } from "react-router-dom";
import HLO_VehicleOption from "./Components/HLO_VehicleOption";
import PasswordWithPopover from "./Components/PasswordWithPopover";
import { useEffect, useRef, useState } from "react";
import closeImg from "../../images/HLO/close-circle.svg";
import {
  validateEmail, validatePassword, validatePhoneNumber,
  validateVehicleType, validateCarPlate, validateNationalId,
  validateCity, validateFullName
} from "./DataAndFunctions/validationFunctions";
import { cities } from './DataAndFunctions/cities';

const Register_VolunteerCourier: React.FC = () => {
  const [message, setMessage] = useState(null);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [carPlate, setCarPlate] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const [fullNameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [vehicleTypeError, setVehicleTypeError] = useState("");
  const [carPlateError, setCarPlateError] = useState("");
  const [nationalIdError, setNationalIdError] = useState("");
  const [cityError, setCityError] = useState("");
  const [countryError, setCountryError] = useState("");

  const [formSubmitted, setFormSubmitted] = useState(false);
  const formSubmitRef = useRef(setFormSubmitted);

  const [selectedOption, setSelectedOption] = useState<string>('');
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

  useEffect(() => {
    formSubmitRef.current = setFormSubmitted;
  }, [setFormSubmitted]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Reset the error messages
    setFullNameError("");
    setEmailError("");
    setPasswordError("");
    setPhoneNumberError("");
    setVehicleTypeError("");
    setCarPlateError("");
    setNationalIdError("");
    setCityError("");
    setCountryError("");

    // Validate the input fields
    if (!fullName) {
      setFullNameError('Full name must not be empty');
    } if (!email) {
      setEmailError('Email must not be empty');
    } if (!password) {
      setPasswordError('Password must not be empty');
    } if (!phoneNumber) {
      setPhoneNumberError('Phone number must not be empty');
    } if (!vehicleType) {
      setVehicleTypeError('Vehicle type must not be empty');
    } if (!carPlate) {
      setCarPlateError('Car plate number must not be empty');
    } if (!nationalId) {
      setNationalIdError('National ID number must not be empty');
    } if (!city) {
      setCityError('City must not be empty');
    } if (!country) {
      setCountryError('Country must not be empty');
    }

    // Check if any errors were found
    if (fullNameError || emailError || passwordError || phoneNumberError || vehicleTypeError || carPlateError || nationalIdError || cityError || countryError) {
      return;
    }

    setFormSubmitted(true);

    axios.post('http://24.133.52.46:8000/api/volunteer-courier-register/', {
      email,
      full_name: fullName,
      password,
      phone_number: phoneNumber,
      car_plate_number: carPlate,
      national_id_number: nationalId,
      city,
      country,
      vehicle_size: vehicleType,
    })
      .then(response => {
        console.log(response.data);
        setMessage('Registration request sent! Please wait for the admin to approve your request.');

        setFullName("");
        setEmail("");
        setPassword("");
        setPhoneNumber("");
        setVehicleType("");
        setCarPlate("");
        setNationalId("");
        setCity("");
        setCountry("");
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
          Register as a Volunteer Courier
        </h2>
      </div>
      <form action="#" onSubmit={handleFormSubmit}>
        <div className="p-6.5">
          <div className="mb-5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Full Name
              </label>
              <input
                type="text"
                minLength={1}
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  setFullNameError(validateFullName(e.target.value));
                }}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              <span className="text-danger font-bold">{fullNameError}</span>
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
            <div className="w-full xl:w-1/2 flex flex-col">
              <HLO_VehicleOption vehicleType={vehicleType} onOptionSelected={(selectedOptionId) => {
                setVehicleType(selectedOptionId);
                setVehicleTypeError(validateVehicleType(selectedOptionId));
              }} />
              <span className="text-danger font-bold">{vehicleTypeError}</span>
            </div>
            <div className="w-full xl:w-1/2">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Car Plate Number
              </label>
              <input
                type="text"
                maxLength={8}
                minLength={6}
                placeholder="Without spaces or dashes"
                value={carPlate}
                onChange={(e) => {
                  setCarPlate(e.target.value);
                  setCarPlateError(validateCarPlate(e.target.value));
                }}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              <span className="text-danger font-bold">{carPlateError}</span>
            </div>
          </div>

          <div className="mb-5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <div className="mb-5.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  {' '}
                  Select your city{' '}
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
                      <option value={city} className="text-body dark:text-bodydark">
                        {city}
                      </option>
                    ))}
                  </select>
                  <span className="absolute right-4 top-1/2 z-30 -translate-y-1/2">
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
            </div>

            {/* <div className="w-full xl:w-1/2">
              <label className="block text-black dark:text-white">
                Country
              </label>
              <input
                type="text"
                placeholder="Country"
                value={country}
                onChange={(e) => {
                  setCountry(e.target.value);
                  setCountryError(validateCity(e.target.value));
                }}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              <span className="text-danger font-bold">{countryError}</span>
            </div> */}
          </div>

          <div className="mb-5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                National ID Number
              </label>
              <input
                value={nationalId}
                type="number"
                onChange={(e) => {
                  const limit = 11;
                  setNationalId(e.target.value.slice(0, limit));
                  setNationalIdError(validateNationalId(e.target.value.slice(0, limit)));
                }}
                minLength={11}
                placeholder="National ID"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              <span className="text-danger font-bold">{nationalIdError}</span>
            </div>
          </div>

          <div className="mb-5">
            <input
              type="submit"
              value="Send Registration Request"
              disabled={formSubmitted}
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

export default Register_VolunteerCourier;