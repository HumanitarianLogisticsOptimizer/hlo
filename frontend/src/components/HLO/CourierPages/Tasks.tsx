import React, { useState, useEffect, useMemo, useContext } from 'react';
import DefaultLayout from '../../../layout/DefaultLayout';
import Breadcrumb from '../../Breadcrumbs/Breadcrumb';
import closeImg from "../../../images/HLO/close-circle.svg";
import { useTable, useSortBy, useGlobalFilter, useFilters, usePagination } from 'react-table';
import axios from 'axios';
import { AuthContext } from '../AuthProvider';
import { useNavigate } from 'react-router-dom';
import ModalCode from '../Components/ModalCode';
import ModalTaskCompletion from '../Components/ModalTaskCompletion';

const Tasks: React.FC = () => {
  const { auth, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [tasks, setTasks] = useState([]);
  const allowedUserTypes = ['volunteer_courier', 'enterprise_courier', 'acc_admin', 'adc_admin'];
  const [code, setCode] = useState('');
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [isTaskCompletionModalOpen, setIsTaskCompletionModalOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  useEffect(() => {
    if (auth) {
      if (!allowedUserTypes.includes(user?.user_type)) {
        navigate('/');
      }
    } else {
      navigate('/auth/signin');
    }
  }, [user, navigate, auth]);

  const fetchTasks = async () => {
    try {
      const [accResponse, adcResponse] = await Promise.all([
        axios.get('http://24.133.52.46:8000/api/acc/'),
        axios.get('http://24.133.52.46:8000/api/adc/'),
      ]);

      const accs = accResponse.data;
      const adcs = adcResponse.data;

      let response;
      switch (user?.user_type) {
        case 'volunteer_courier':
          response = await axios.get(`http://24.133.52.46:8000/api/volunteer_tasks?owner=${user?.id}`);
          break;
        case 'enterprise_courier':
          response = await axios.get(`http://24.133.52.46:8000/api/enterprise_tasks?owner=${user?.id}`);
          break;
        case 'acc_admin':
          const volunteerResponseAcc = await axios.get(`http://24.133.52.46:8000/api/volunteer_tasks?source=${user?.center}`);
          const enterpriseResponseAcc = await axios.get(`http://24.133.52.46:8000/api/enterprise_tasks?source=${user?.center}`);
          response = { data: [...volunteerResponseAcc.data, ...enterpriseResponseAcc.data] };
          break;
        case 'adc_admin':
          const volunteerResponseAdc = await axios.get(`http://24.133.52.46:8000/api/volunteer_tasks?target=${user?.center}`);
          const enterpriseResponseAdc = await axios.get(`http://24.133.52.46:8000/api/enterprise_tasks?target=${user?.center}`);
          response = { data: [...volunteerResponseAdc.data, ...enterpriseResponseAdc.data] };
          break;
        default:
          break;
      }

      let tasks = response?.data.map(task => ({
        ...task,
        source: accs.find(acc => acc.id === task.source)?.name,
        target: adcs.find(adc => adc.id === task.target)?.name,
      })) || [];

      setTasks(tasks);
    } catch (error) {
      console.error('Error fetching tasks: ', error);
    }
  };

  useEffect(() => {

    fetchTasks();
  }, [user]);

  const data = useMemo(() => tasks, [tasks]);

  const handleRowClick = (row, user) => {
    if (user?.user_type === 'volunteer_courier') {
      setIsCodeModalOpen(true);
      if (row.original.status === 'Pending') {
        setCode(row.original.source_code);
      } else if (row.original.status === 'On the road') {
        setCode(row.original.target_code);
      }
    } else if (user?.user_type === 'enterprise_courier' && ['Pending', 'On the road'].includes(row.original.status)) {
      setSelectedTaskId(row.original.id);
      setIsTaskCompletionModalOpen(true);
    }
  };


  const columns = useMemo(
    () => [
      {
        Header: 'Task ID',
        accessor: 'id',
      },
      {
        Header: 'Source',
        accessor: 'source',
      },
      {
        Header: 'Target',
        accessor: 'target',
      },
      {
        Header: 'Load Type',
        accessor: 'load_type',
      },
      {
        Header: 'Load Quantity',
        accessor: 'load_quantity',
      },
      {
        Header: 'Status',
        accessor: 'status',
      },
    ],
    []
  );

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    setGlobalFilter,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    setPageSize,
    gotoPage,
  } = tableInstance;

  const { globalFilter, pageIndex, pageSize } = state;

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Tasks" />
      {message && (
        <div className={`mb-4 flex w-full border-l-6 ${message.startsWith('Error') ? 'border-[#F87171] bg-[#F87171]' : 'border-[#34D399] bg-[#34D399]'} bg-opacity-[15%] px-7 py-8 shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-9`}>
          <div className={`mr-5 flex h-9 w-full max-w-[36px] items-center justify-center rounded-lg ${message.startsWith('Error') ? 'bg-[#F87171]' : 'bg-[#34D399]'}`}>
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
            <h3 className={`text-lg font-semibold ${message.startsWith('Error') ? 'text-[#B45454]' : 'text-black dark:text-[#34D399]'}`}>
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
      {user?.user_type === 'enterprise_courier' && (
        <p className=' text-rose-500 text-lg'>Click on a row to change its status.</p>
      )}
      <section className="data-table-common data-table-two p-5 rounded-lg-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex justify-between border-b border-stroke pb-4 dark:border-strokedark">
          <div className="w-100">
            <input
              type="text"
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="w-full rounded-md border border-stroke px-5 py-2.5 outline-none focus:border-primary dark:border-strokedark dark:bg-meta-4 dark:focus:border-primary"
              placeholder="Search..."
            />
          </div>

          <div className="flex items-center font-medium">
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="bg-transparent pl-2"
            >
              {[5, 10, 20, 50].map((page) => (
                <option key={page} value={page}>
                  {page}
                </option>
              ))}
            </select>
            <p className="pl-2 text-black dark:text-white">Entries Per Page</p>
          </div>
        </div>
        <table
          {...getTableProps()}
          className="datatable-table w-full table-auto border-collapse overflow-hidden break-words px-4 md:table-fixed md:overflow-auto md:px-8"
        >
          <thead>
            {headerGroups.map((headerGroup, key) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={key}>
                {headerGroup.headers.map((column, key) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    key={key}
                  >
                    <div className="flex items-center">
                      <span> {column.render('Header')}</span>
                      <div className="ml-2 inline-flex flex-col space-y-[2px]">
                        <span className="inline-block">
                          <svg
                            className="fill-current"
                            width="10"
                            height="5"
                            viewBox="0 0 10 5"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M5 0L0 5H10L5 0Z" fill="" />
                          </svg>
                        </span>
                        <span className="inline-block">
                          <svg
                            className="fill-current"
                            width="10"
                            height="5"
                            viewBox="0 0 10 5"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5 5L10 0L-4.37114e-07 8.74228e-07L5 5Z"
                              fill=""
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, key) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  key={key}
                  onClick={() => row.original.status !== 'Done' && handleRowClick(row, user)}
                  className={
                    ['volunteer_courier', 'enterprise_courier'].includes(user?.user_type) && row.original.status !== 'Done' ? 'cursor-pointer' : ''
                  }
                >
                  <td className='text-lg' {...row.cells[0].getCellProps()}>
                    {row.cells[0].render('Cell')}
                  </td>
                  <td {...row.cells[1].getCellProps()}>
                    {row.cells[1].render('Cell')}
                  </td>
                  <td {...row.cells[2].getCellProps()}>
                    {row.cells[2].render('Cell')}
                  </td>
                  <td {...row.cells[3].getCellProps()}>
                    {row.cells[3].render('Cell')}
                  </td>
                  <td {...row.cells[4].getCellProps()}>
                    {row.cells[4].render('Cell')}
                  </td>
                  <td className={`${row.original.status === 'Pending' ? 'text-yellow-500' :
                    row.original.status === 'On the road' ? 'text-blue-500' : 'text-green-500'}`}
                    {...row.cells[5].getCellProps()}>
                    {row.cells[5].render('Cell')}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="flex justify-between border-t border-stroke px-8 pt-5 dark:border-strokedark">
          <p className="font-medium">
            Showing {pageIndex + 1} 0f {pageOptions.length} pages
          </p>
          <div className="flex">
            <button
              className="flex cursor-pointer items-center justify-center rounded-md p-1 px-2 hover:bg-primary hover:text-white"
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >
              <svg
                className="fill-current"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.1777 16.1156C12.009 16.1156 11.8402 16.0593 11.7277 15.9187L5.37148 9.44995C5.11836 9.19683 5.11836 8.80308 5.37148 8.54995L11.7277 2.0812C11.9809 1.82808 12.3746 1.82808 12.6277 2.0812C12.8809 2.33433 12.8809 2.72808 12.6277 2.9812L6.72148 8.99995L12.6559 15.0187C12.909 15.2718 12.909 15.6656 12.6559 15.9187C12.4871 16.0312 12.3465 16.1156 12.1777 16.1156Z"
                  fill=""
                />
              </svg>
            </button>

            {pageOptions.map((_page, index) => (
              <button
                key={index}
                onClick={() => {
                  gotoPage(index);
                }}
                className={`${pageIndex === index && 'bg-primary text-white'
                  } mx-1 flex cursor-pointer items-center justify-center rounded-md p-1 px-3 hover:bg-primary hover:text-white`}
              >
                {index + 1}
              </button>
            ))}

            <button
              className="flex cursor-pointer items-center justify-center rounded-md p-1 px-2 hover:bg-primary hover:text-white"
              onClick={() => nextPage()}
              disabled={!canNextPage}
            >
              <svg
                className="fill-current"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.82148 16.1156C5.65273 16.1156 5.51211 16.0593 5.37148 15.9468C5.11836 15.6937 5.11836 15.3 5.37148 15.0468L11.2777 8.99995L5.37148 2.9812C5.11836 2.72808 5.11836 2.33433 5.37148 2.0812C5.62461 1.82808 6.01836 1.82808 6.27148 2.0812L12.6277 8.54995C12.8809 8.80308 12.8809 9.19683 12.6277 9.44995L6.27148 15.9187C6.15898 16.0312 5.99023 16.1156 5.82148 16.1156Z"
                  fill=""
                />
              </svg>
            </button>
          </div>
        </div>
      </section>
      {/* Table component goes here */}
      <ModalCode isOpen={isCodeModalOpen} setIsOpen={setIsCodeModalOpen} code={code} />
      <ModalTaskCompletion
        isOpen={isTaskCompletionModalOpen}
        setIsOpen={setIsTaskCompletionModalOpen}
        taskId={selectedTaskId}
        onTaskCompletion={fetchTasks} // pass reloadData as a prop
      />
    </DefaultLayout>
  );
};

export default Tasks;