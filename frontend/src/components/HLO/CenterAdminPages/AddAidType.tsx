import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import DefaultLayout from '../../../layout/DefaultLayout';
import Breadcrumb from '../../Breadcrumbs/Breadcrumb';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthProvider';
import closeImg from "../../../images/HLO/close-circle.svg";

const AddAidType: React.FC = () => {
  const { auth, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) {
      navigate('/auth/signin');
    }
    if (user?.user_type !== 'acc_admin' && user?.user_type !== 'adc_admin') {
      navigate('/');
    }
  }, [user, navigate]);

  const [message, setMessage] = useState('');

  const [type, setType] = useState('');
  const [typeError, setTypeError] = useState('');
  const [quantity, setQuantity] = useState('');
  const [quantityError, setQuantityError] = useState('');
  const [standardStock, setStandardStock] = useState('');
  const [standardStockError, setStandardStockError] = useState('');

  const [formSubmitted, setFormSubmitted] = useState(false);

  const [aidTypes, setAidTypes] = useState([]);

  useEffect(() => {
    const fetchAidTypes = async () => {
      try {
        const response = await axios.get('http://24.133.52.46:8000/api/aid_type');
        setAidTypes(response.data);
      } catch (error) {
        console.error('Error fetching aid types:', error);
      }
    };

    fetchAidTypes();
  }, []);


  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate form data
    let hasError = false;
    if (!type) {
      setTypeError('Aid type is required');
      hasError = true;
    }
    if (!quantity) {
      setQuantityError('Quantity is required');
      hasError = true;
    }
    if (!standardStock) {
      setStandardStockError('Standard stock is required');
      hasError = true;
    }

    if (hasError) {
      return;
    }

    setFormSubmitted(true);

    const aidRequestData = {
      quantity: parseInt(quantity),
      standard_stock: parseInt(standardStock),
      type: parseInt(type),
      center: user?.center,
      status: "LOW",
    };

    try {
      const url = `http://24.133.52.46:8000/api/${user?.user_type === 'adc_admin' ? 'adcaids' : 'accaids'}/`;

      const response = await axios.post(url, aidRequestData);
      console.log(response);
      setType('');
      setQuantity('');
      setStandardStock('');
      setMessage('Aid added successfully');
    } catch (error) {
      console.error('Error adding aid: ', error);
    } finally {
      setFormSubmitted(false);
    }
  }

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Add New Aid" />
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
      <div className="rounded-sm bg-white shadow-default dark:bg-boxdark">
        <div className="w-full xl:w-1/2">
          <div className='w-full p-4 sm:p-12.5 xl:p-17.5'>
            <form onSubmit={handleSubmit}>
              <div className="mb-4 relative">
                <label className="mb-3 block text-md font-medium text-black dark:text-white">
                  Aid Type
                </label>
                <select
                  value={type}
                  onChange={(e) => {
                    setType(e.target.value);
                    setTypeError(!e.target.value ? 'Aid type is required' : '');
                  }}
                  className={`w-full appearance-none rounded border border-stroke py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary 
                    ${type ? 'text-black dark:text-white' : ''}`}
                >
                  <option value="" disabled>Select Aid Type</option>
                  {aidTypes.map((aidType, index) => (
                    <option key={index} value={aidType.id}>
                      {aidType.name}
                    </option>
                  ))}
                </select>
                <span className="text-danger">{typeError}</span>
                <span className="absolute top-1/2 right-4 z-30 translate-y-2">
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

              <div className="mb-4">
                <label className="mb-3 block text-md font-medium text-black dark:text-white">
                  Standard Stock
                </label>
                <input
                  type="number"
                  value={standardStock}
                  onChange={(e) => {
                    setStandardStock(e.target.value);
                    setStandardStockError(!e.target.value ? 'Standard stock is required' : '');
                  }}
                  placeholder="Standard Stock"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                <span className="text-danger">{standardStockError}</span>
              </div>

              <div className="mb-4">
                <label className="mb-3 block text-md font-medium text-black dark:text-white">
                  Quantity
                </label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => {
                    setQuantity(e.target.value);
                    setQuantityError(!e.target.value ? 'Quantity is required' : '');
                  }}
                  placeholder="Quantity"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                <span className="text-danger">{quantityError}</span>
              </div>

              <button type="submit" disabled={formSubmitted} className="cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90">
                Add New Aid
              </button>
            </form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default AddAidType;