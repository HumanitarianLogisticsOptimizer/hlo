import PhoneInput from "react-phone-number-input/input";
import HLO_VehicleOption from "./HLO_VehicleOption";
import PasswordWithPopover from "./PasswordWithPopover";
import { useContext, useEffect, useRef, useState } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import { AuthContext } from "./AuthProvider";

const HLO_EditProfile_VC = () => {
  const { user } = useContext(AuthContext);
  const { auth } = useContext(AuthContext);
  const [nationalId, setNationalId] = useState(0);
  const [vehicleType, setVehicleType] = useState('');
  const [address, setAddress] = useState('');
  const [carPlate, setCarPlate] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');

  // Uncomment the following lines when api is ready
  {
    // const [nationalId, setNationalId] = useState(user.national_id_number);
    // const [vehicleType, setVehicleType] = useState(user.vehicle_size);
    // const [address, setAddress] = useState(`${user.city}, ${user.country}`);
    // const [carPlate, setCarPlate] = useState(user.car_plate_number);
    // const [phoneNumber, setPhoneNumber] = useState(user.phone_number);
    // const [email, setEmail] = useState(user.email);
    // const [fullName, setFullName] = useState(user.full_name);
    // const [password, setPassword] = useState(user.password);
  }

  const [formSubmitted, setFormSubmitted] = useState(false);
  const formSubmitRef = useRef(setFormSubmitted);

  useEffect(() => {
    formSubmitRef.current = setFormSubmitted;
  }, [setFormSubmitted]);

  const handleNationalIdChange = event => {
    const limit = 11;
    setNationalId(event.target.value.slice(0, limit));
  };

useEffect(() => {
  if (formSubmitted) {
    fetch('http://localhost:8000/api/volunteer-courier-register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Token ${auth}`,
      },
      body: JSON.stringify({
        email,
        full_name: fullName,
        password,
        phone_number: phoneNumber,
        car_plate_number: carPlate,
        national_id_number: nationalId,
        city: address.split(', ')[0],
        country: address.split(', ')[1],
        vehicle_size: vehicleType,
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
                  Full Name
                </label>
                <input
                  type="text"
                  minLength={1}
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
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
                  onChange={e => setEmail(e.target.value)}
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
              <HLO_VehicleOption vehicleType={vehicleType} onOptionSelected={(selectedOptionId) => {
                setVehicleType(selectedOptionId);
              }} />
              <div className="w-full xl:w-1/2">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Car Plate Number
                </label>
                <input
                  type="text"
                  maxLength={8}
                  minLength={6}
                  placeholder="Car Plate Number"
                  value={carPlate}
                  onChange={e => setCarPlate(e.target.value)}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
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
              </div>

              <div className="w-full xl:w-1/2">
                <label className="block text-black dark:text-white">
                  Address
                </label>
                <textarea
                  rows={2}
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  placeholder="(Country, city, state, street, apartment number, postal code)"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                ></textarea>
              </div>
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

export default HLO_EditProfile_VC;
