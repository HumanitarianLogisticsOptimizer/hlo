import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useContext } from 'react'; // replace with the actual path to the AuthContext
import updateImg from "../../../images/HLO/update.svg"
import updateImgLight from "../../../images/HLO/update-light.svg"
import { AuthContext } from '../AuthProvider';
import { Link, useNavigate } from 'react-router-dom';

interface TableData {
  id: number;
  type: string;
  quantity: number;
  center: number;
  urgency: string;
}

const StockManagementTable: React.FC = () => {
  const { auth, user } = useContext(AuthContext);
  console.log(user);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/" + centerType + "aids/?center=" + centerId);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }

      try {
        const response = await axios.get("http://localhost:8000/api/" + centerType + "/" + centerId + "/");
        setCenterName(response.data.name);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  const setUrgency = (quantity: number): string => {
    if (quantity <= 50) {
      return 'HIGH';
    } else if (quantity <= 150) {
      return 'MEDIUM';
    } else {
      return 'LOW';
    }
  };

  const updateUrgency = (id: number) => {
    const item = data.find((item) => item.id === id);
    if (item) {
      const urgency = setUrgency(item.quantity);
      item.urgency = urgency;
    }
  };

  data.forEach((item) => {
    updateUrgency(item.id);
  });

  const renderButton = (urgency: string): JSX.Element => {
    switch (urgency) {
      case 'HIGH':
        return (
          <button className="inline-flex disabled rounded bg-[#DC3545] py-1 px-2 text-sm font-medium text-white hover:cursor-default">
            {urgency}
          </button>
        );
      case 'MEDIUM':
        return (
          <button className="inline-flex disabled rounded bg-[#F9C107] py-1 px-2 text-sm font-medium text-white hover:cursor-default">
            {urgency}
          </button>
        );
      case 'LOW':
        return (
          <button className="inline-flex disabled rounded bg-[#3BA2B8] py-1 px-2 text-sm font-medium text-white hover:cursor-default">
            {urgency}
          </button>
        );
      default:
        return (
          <p className="text-[#637381] dark:text-bodydark w-min">
            {urgency}
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
        const response = await axios.put(`http://localhost:8000/api/${endpoint}/${id}/`, item);
        console.log('Quantity updated successfully:', response.data);
      } catch (error) {
        console.error('Error updating quantity:', error);
      }
    }
  };

  return (
    <div className="w-full overflow-x-auto">
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
                <p className="text-[#637381] dark:text-bodydark">{item.type}</p>
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
                {renderButton(item.urgency)}
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
              <Link to="/hlo/admin/createaidrequest" className="text-primary">Go to Aid Request Page</Link>
            </div>
          </div>
        </div>
        {/* table body end */}
      </div>
    </div>
  );
};

export default StockManagementTable;