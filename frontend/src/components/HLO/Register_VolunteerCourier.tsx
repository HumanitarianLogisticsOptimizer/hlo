import PhoneInput from "react-phone-number-input/input";
import { Link } from "react-router-dom";
import HLO_VehicleOption from "./HLO_VehicleOption";
import PasswordWithPopover from "./PasswordWithPopover";
import { useEffect, useRef, useState } from "react";
import closeImg from "../../images/HLO/close-circle.svg";

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

    fetch('http://localhost:8000/api/volunteer-courier-register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        full_name: fullName,
        password,
        phone_number: phoneNumber,
        car_plate_number: carPlate,
        national_id_number: nationalId,
        city,
        country,
        vehicle_size: vehicleType,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // Only parse the response as JSON if there's a response body
        return response.text().then(text => text ? JSON.parse(text) : {});
      })
      .then(data => {
        console.log(data);
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

  const handleNationalIdChange = event => {
    const limit = 11;
    setNationalId(event.target.value.slice(0, limit));
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
                onChange={(e) => setFullName(e.target.value)}
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
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              <span className="text-danger font-bold">{emailError}</span>
            </div>
          </div>

          <div className="mb-5.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2 flex flex-col">
              <PasswordWithPopover password={password} onPasswordChange={(password) => {
                setPassword(password);
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
                onChange={setPhoneNumber}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              <span className="text-danger font-bold">{phoneNumberError}</span>
            </div>
          </div>

          <div className="mb-5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2 flex flex-col">
              <HLO_VehicleOption vehicleType={vehicleType} onOptionSelected={(selectedOptionId) => {
                setVehicleType(selectedOptionId);
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
                onChange={(e) => setCarPlate(e.target.value)}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              <span className="text-danger font-bold">{carPlateError}</span>
            </div>
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
                onChange={(e) => setCity(e.target.value)}
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
                onChange={(e) => setCountry(e.target.value)}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              <span className="text-danger font-bold">{countryError}</span>
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
                onChange={handleNationalIdChange}
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