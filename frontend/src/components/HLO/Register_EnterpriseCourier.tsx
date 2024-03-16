import PhoneInput from "react-phone-number-input/input";
import { Link } from "react-router-dom";
import DatePickerOne from "../Forms/DatePicker/DatePickerOne";
import PasswordWithPopover from "./PasswordWithPopover";
import { useEffect, useRef, useState } from "react";

const Register_EnterpriseCourier: React.FC = () => {
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [dateOfEstablishment, setDateOfEstablishment] = useState(new Date());
  const [numberOfLightDuty, setNumberOfLightDuty] = useState("");
  const [numberOfMediumDuty, setNumberOfMediumDuty] = useState("");
  const [numberOfHeavyDuty, setNumberOfHeavyDuty] = useState("");
  const [tradeRegistrationNumber, setTradeRegistrationNumber] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const formSubmitRef = useRef(setFormSubmitted);

  useEffect(() => {
    formSubmitRef.current = setFormSubmitted;
  }, [setFormSubmitted]);

  const handleTradeRegistrationNumberChange = event => {
    const limit = 16;
    setTradeRegistrationNumber(event.target.value.slice(0, limit));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  useEffect(() => {
    if (formSubmitted) {
      fetch('http://localhost:8000/api/enterprise-courier-register/', {
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
          date_of_establishment: dateOfEstablishment.toISOString().split('T')[0],
          number_of_light_duty: numberOfLightDuty,
          number_of_medium_duty: numberOfMediumDuty,
          number_of_heavy_duty: numberOfHeavyDuty,
          trade_registration_number: tradeRegistrationNumber,
        }),
      })
        .then(response => {
          if (response.headers.get('content-type')?.includes('application/json')) {
            return response.json();
          } else {
            throw new Error('Received unexpected content-type');
          }
        })
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.error('Error:', error);
        })
        .finally(() => {
          formSubmitRef.current(false);
        });
    }
  }, [formSubmitted]);

  return (
    <div>
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
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
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
            </div>
          </div>

          <div className="mb-5.5 flex flex-col gap-6 xl:flex-row">
            <PasswordWithPopover password={password} onPasswordChange={(password) => {
              setPassword(password);
            }} />
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
                onChange={(e) => setCompanyAddress(e.target.value)}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              ></textarea>
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
                onChange={handleTradeRegistrationNumberChange}
                minLength={16}
                min={1000000000000000}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
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
                onChange={(e) => setNumberOfLightDuty(e.target.value)}
                min={0}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>

            <div className="w-full xl:w-1/2">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Number of medium-duty (6,350 kg - 12,000 kg) vehicles in your fleet
              </label>
              <input
                type="number"
                placeholder="Medium-duty: 6,350 kg - 12,000 kg"
                value={numberOfMediumDuty}
                onChange={(e) => setNumberOfMediumDuty(e.target.value)}
                min={0}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
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
                onChange={(e) => setNumberOfHeavyDuty(e.target.value)}
                min={0}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="lg:w-1/2 xl:w-1/2"></div>
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

export default Register_EnterpriseCourier;