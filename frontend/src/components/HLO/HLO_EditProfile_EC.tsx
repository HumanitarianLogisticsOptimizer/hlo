import DefaultLayout from "../../layout/DefaultLayout";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import PhoneInput from "react-phone-number-input/input";
import DatePickerOne from "../Forms/DatePicker/DatePickerOne";
import PasswordWithPopover from "./PasswordWithPopover";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "./AuthProvider";

const HLO_EditProfile_EC = () => {
  const { user } = useContext(AuthContext);
  const { auth } = useContext(AuthContext);
  const [tradeRegistrationNumber, setTradeRegistrationNumber] = useState(0);
  const [dateOfEstablishment, setDateOfEstablishment] = useState(new Date());
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [numberOfLightDuty, setNumberOfLightDuty] = useState(0);
  const [numberOfMediumDuty, setNumberOfMediumDuty] = useState(0);
  const [numberOfHeavyDuty, setNumberOfHeavyDuty] = useState(0);

  // Uncomment the following lines when api is ready
  {
    // const [email, setEmail] = useState(user.email);
    // const [companyName, setCompanyName] = useState(user.company_name);
    // const [password, setPassword] = useState(user.password);
    // const [phoneNumber, setPhoneNumber] = useState(user.phone_number);
    // const [companyAddress, setCompanyAddress] = useState(user.company_address);
    // const [dateOfEstablishment, setDateOfEstablishment] = useState(new Date(user.date_of_establishment));
    // const [numberOfLightDuty, setNumberOfLightDuty] = useState(user.number_of_light_duty);
    // const [numberOfMediumDuty, setNumberOfMediumDuty] = useState(user.number_of_medium_duty);
    // const [numberOfHeavyDuty, setNumberOfHeavyDuty] = useState(user.number_of_heavy_duty);
    // const [tradeRegistrationNumber, setTradeRegistrationNumber] = useState(user.trade_registration_number);
  }

  const [formSubmitted, setFormSubmitted] = useState(false);
  const formSubmitRef = useRef(setFormSubmitted);

  useEffect(() => {
    formSubmitRef.current = setFormSubmitted;
  }, [setFormSubmitted]);

  const handleTradeRegistrationNumberChange = event => {
    const limit = 16;
    setTradeRegistrationNumber(event.target.value.slice(0, limit));
  };

  useEffect(() => {
    if (formSubmitted) {
      fetch('http://localhost:8000/api/enterprise-courier-register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Token ${auth}`,
        },
        body: JSON.stringify({
          email,
          company_name: companyName,
          password,
          phone_number: phoneNumber,
          company_address: companyAddress,
          date_of_establishment: dateOfEstablishment,
          number_of_light_duty: numberOfLightDuty,
          number_of_medium_duty: numberOfMediumDuty,
          number_of_heavy_duty: numberOfHeavyDuty,
          trade_registration_number: tradeRegistrationNumber,
        }),
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
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
      <Breadcrumb pageName="Edit your profile" />
      <div className="px-5 py-3 rounded-lg-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <form action="#"
          onSubmit={(e) => {
            e.preventDefault();
            setFormSubmitted(true);
          }} >
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
                  rows={2}
                  placeholder="(Country, city, state, street, apartment number, postal code)"
                  value={companyAddress}
                  onChange={(e) => setCompanyAddress(e.target.value)}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
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
                  min={0}
                  value={numberOfLightDuty}
                  onChange={(e) => setNumberOfLightDuty(Number(e.target.value))}
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
                  min={0}
                  value={numberOfMediumDuty}
                  onChange={(e) => setNumberOfMediumDuty(Number(e.target.value))}
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
                  min={0}
                  value={numberOfHeavyDuty}
                  onChange={(e) => setNumberOfHeavyDuty(Number(e.target.value))}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="lg:w-1/2 xl:w-1/2"></div>
            </div>

            <div className="mb-5">
              <input
                type="submit"
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