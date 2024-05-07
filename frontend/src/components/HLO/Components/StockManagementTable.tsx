import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useContext } from 'react'; // replace with the actual path to the AuthContext
import updateImg from "../../../images/HLO/update.svg"
import updateImgLight from "../../../images/HLO/update-light.svg"
import { AuthContext } from '../AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import closeImg from "../../../images/HLO/close-circle.svg";

interface TableData {
  id: number;
  type: {
    id: number;
    name: string;
  };
  quantity: number;
  center: number;
  urgency: string;
  status: string;
  standard_stock: number;
}

const StockManagementTable: React.FC = () => {
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

  const userType = user?.user_type;
  const centerType = userType === 'acc_admin' ? 'acc' : userType === 'adc_admin' ? 'adc' : 'acc';
  const [centerName, setCenterName] = useState('');
  const [data, setData] = useState<TableData[]>([]);
  const centerId = user?.center;

  const [message, setMessage] = useState('');

  const isDarkMode = useDarkMode();

  function useDarkMode() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach(({ target }) => {
          const { className } = target as HTMLBodyElement;
          setIsDarkMode(className.includes('dark'));
        });
      });

      observer.observe(document.body, { attributes: true });

      return () => {
        observer.disconnect();
      };
    }, []);

    return isDarkMode;
  }

  const fetchData = async () => {
    try {
      const response = await axios.get("http://24.133.52.46:8000/api/" + centerType + "aids/?center=" + centerId);
      const aidData = await Promise.all(response.data.map(async aid => {
        const typeResponse = await axios.get(`http://24.133.52.46:8000/api/aid_type/${aid.id}`);
        return {
          ...aid,
          type: {
            id: aid.type,
            name: typeResponse.data.name
          }
        };
      }));
      setData(aidData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }

    try {
      const response = await axios.get("http://24.133.52.46:8000/api/" + centerType + "/" + centerId + "/");
      setCenterName(response.data.name);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderButton = (status: string): JSX.Element => {
    switch (status) {
      case 'High':
        return (
          <button className="inline-flex disabled rounded bg-[#DC3545] py-1 px-2 text-sm font-medium text-white hover:cursor-default">
            {status}
          </button>
        );
      case 'Medium':
        return (
          <button className="inline-flex disabled rounded bg-[#F9C107] py-1 px-2 text-sm font-medium text-white hover:cursor-default">
            {status}
          </button>
        );
      case 'Low':
        return (
          <button className="inline-flex disabled rounded bg-[#3BA2B8] py-1 px-2 text-sm font-medium text-white hover:cursor-default">
            {status}
          </button>
        );
      default:
        return (
          <p className="text-[#637381] dark:text-bodydark w-min">
            {status}
          </p>
        );
    }
  };

  const handleQuantityChange = (index: number, newQuantity: string) => {
    const updatedData = data.map((item, i) => i === index ? { ...item, quantity: Number(newQuantity) } : item);
    setData(updatedData);
  };

  const handleUpdateClick = async (id: number) => {
    const item = data.find(item => item.id === id);
    if (item) {
      try {
        const endpoint = userType === 'acc_admin' ? 'accaids' : 'adcaids';
        const updatedItemData = {
          quantity: item.quantity,
          standard_stock: item.standard_stock,
          status: item.status,
          type: item.type.id,
          center: item.center,
        };
        const response = await axios.put(`http://24.133.52.46:8000/api/${endpoint}/${id}/`, updatedItemData);
        console.log('Quantity updated successfully:', response.data);
        setMessage('Quantity updated successfully');
        setTimeout(() => setMessage(''), 5000);
        fetchData();
      } catch (error) {
        console.error('Error updating quantity:', error);
      }
    }
  };

  return (
    <div className="w-full overflow-x-auto">
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
            onClick={() => setMessage('')}
          >
            <img src={closeImg} width={35} height={35} alt="" />
          </button>
        </div>
      )}
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold text-black dark:text-white">{centerName}</h2>
      </div>
      <div className="min-w-[900px]">
        {/* table header start */}
        <div className="grid grid-cols-12 rounded-t-[10px] bg-primary dark:bg-meta-4 px-5 py-4 lg:px-7.5 2xl:px-11">
          <div className="col-span-3 pl-3">
            <h5 className="font-medium text-white">Name</h5>
          </div>

          <div className="col-span-3">
            <h5 className="font-medium text-white">Quantity</h5>
          </div>

          <div className="col-span-3">
            <h5 className="font-medium text-white">Urgency</h5>
          </div>
        </div>
        {/* table header end */}

        {/* table body start */}
        <div className="rounded-b-[10px] bg-white dark:bg-boxdark">
          {data.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-12 border-t border-[#EEEEEE] px-5 py-4 dark:border-strokedark lg:px-7.5 2xl:px-11"
            >
              <div className="col-span-3 pl-3">
                <p className="text-[#637381] dark:text-bodydark">{item.type.name}</p>
              </div>

              <div className="col-span-3">
                <input
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(index, e.target.value)}
                  type="number"
                  className=" w-1/2 rounded-md border-[1.5px] border-stroke bg-transparent text-center py-2 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="col-span-3">
                {renderButton(item.status)}
              </div>
              <div className="relative col-span-1">
                <button
                  onClick={() => handleUpdateClick(item.id)}
                  className="inline-flex items-center justify-center gap-2.5 rounded-md border border-primary py-2 px-4 text-center font-medium text-boxdark dark:border-white dark:text-white hover:shadow-4 lg:px-8 xl:px-10"
                >
                  <img src={isDarkMode ? updateImgLight : updateImg} height={20} width={20} />
                  Update
                </button>
              </div>
            </div>
          ))}
          <div className="grid grid-cols-12 border-t border-[#EEEEEE] px-5 py-4 dark:border-strokedark lg:px-7.5 2xl:px-11">
            <div className="col-span-12">
              <Link to="/hlo/admin/addaidtype" className="text-primary">Add Aid</Link>
            </div>
          </div>
        </div>
        {/* table body end */}
      </div>
    </div>
  );
};

export default StockManagementTable;