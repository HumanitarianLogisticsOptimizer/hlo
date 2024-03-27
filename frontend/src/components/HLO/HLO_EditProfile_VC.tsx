import PhoneInput from "react-phone-number-input/input";
import HLO_VehicleOption from "./HLO_VehicleOption";
import PasswordWithPopover from "./PasswordWithPopover";
import { useContext, useEffect, useRef, useState } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import { AuthContext } from "./AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import closeImg from "../../images/HLO/close-circle.svg";
import {
  validateEmail, validatePassword, validatePhoneNumber,
  validateVehicleType, validateCarPlate, validateNationalId,
  validateCity, validateFullName
} from "./DataAndFunctions/validationFunctions";

const HLO_EditProfile_VC = () => {
  const { auth, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!user) {
      navigate('/auth/signin');
    }
  }, [user, navigate]);

  const [nationalId, setNationalId] = useState(user.national_id_number);
  const [vehicleType, setVehicleType] = useState(user.vehicle_size);
  const [city, setCity] = useState(user.city);
  const [country, setCountry] = useState(user.country);
  const [carPlate, setCarPlate] = useState(user.car_plate_number);
  const [phoneNumber, setPhoneNumber] = useState(user.phone_number);
  const [email, setEmail] = useState(user.email);
  const [fullName, setFullName] = useState(user.full_name);
  const [password, setPassword] = useState(user.password);

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

    if (fullNameError || emailError || passwordError || phoneNumberError || vehicleTypeError
      || carPlateError || nationalIdError || cityError || countryError) {
      return;
    }

    setFormSubmitted(true);
  };

  useEffect(() => {
    if (formSubmitted) {
      axios.put('http://localhost:8000/api/profile/volunteer/', {
        email,
        full_name: fullName,
        password,
        phone_number: phoneNumber,
        car_plate_number: carPlate,
        national_id_number: nationalId,
        city: city,
        country: country,
        vehicle_size: vehicleType
      }, {
        headers: {
          'Authorization': `Token ${auth}`
        }
      })
        .then(response => {
          console.log(response.data);
          setMessage('Profile updated successfully'); // Set the success message

          axios.get('http://localhost:8000/api/me/', {
            headers: {
              'Authorization': `Token ${auth}`
            }
          })
            .then(response => {
              const data = response.data;
              setNationalId(data.national_id_number);
              setVehicleType(data.vehicle_size);
              setCity(data.city);
              setCountry(data.country);
              setCarPlate(data.car_plate_number);
              setPhoneNumber(data.phone_number);
              setEmail(data.email);
              setFullName(data.full_name);
              setPassword(data.password);
            })
            .catch(error => {
              console.error('Error:', error);
            });
        })
        .catch(error => {
          console.error('Error:', error);
        })
        .finally(() => {
          // Reset the formSubmitted state
          formSubmitRef.current(false);
        });
    }
  }, [formSubmitted]);

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
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  National ID Number
                </label>
                <input
                  value={nationalId}
                  type="number"
                  onChange={(e) => {
                    const limit = 11;
                    setNationalId(e.target.value.slice(0, limit));
                    validateNationalId(e.target.value.slice(0, limit));
                  }}
                  minLength={11}
                  placeholder="National ID"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                <span className="text-danger font-bold">{nationalIdError}</span>
              </div>

              <div className="mb-5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="block text-black dark:text-white">
                    City
                  </label>
                  <input
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) => {
                      setCity(e.target.value);
                      setCityError(validateCity(e.target.value));
                    }}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  <span className="text-danger font-bold">{cityError}</span>
                </div>

                <div className="w-full xl:w-1/2">
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
                </div>
              </div>
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

export default HLO_EditProfile_VC;
