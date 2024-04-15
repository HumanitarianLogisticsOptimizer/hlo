import React, { useContext, useEffect, useRef, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import SidebarLinkGroup from './SidebarLinkGroup';
import { AuthContext } from '../HLO/AuthProvider';
import HLODashLogo from '../../images/HLO/hlo-dash.svg';
import HLOStockLogo from '../../images/HLO/hlo-stock.svg';
import UserCheck from '../../images/HLO/user-check.svg';
import UserPlus from '../../images/HLO/user-plus.svg'
import CenterLogo from '../../images/HLO/center.svg';
import mapImg from '../../images/HLO/map.svg';
import reqeustImg from '../../images/HLO/request.svg';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const { auth, setAuth } = useContext(AuthContext)
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
  );

  const handleLogout = () => {
    fetch('http://localhost:8000/api/logout/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${auth}`,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Logout failed');
        }
        setAuth(null);
        localStorage.removeItem('auth');
      })
      .catch(error => {
        console.error('Error:', error);
      });

    navigate('/auth/signin');
  };

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-center gap-2 px-6 py-5.5 lg:py-6.5">
        <NavLink className="flex ml-4" to="/">
          {/* <img src={HLOLogo} alt="Logo" width={55} height={55} /> */}
          <div className="text-white text-2xl font-bold">Humanitarian Logistics Optimizer</div>
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="mb-2 ml-4 text-sm font-semibold text-bodydark2">
              MENU
            </h3>

            <ul className="mb-2 flex flex-col gap-1.5">
              <li>
                <NavLink
                  to="/"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('hlodashboard') && 'bg-graydark dark:bg-meta-4'
                    }`}
                >
                  <img src={HLODashLogo} height={30} width={30} />
                  Centers List View
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/hlo/mapdashboard"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('mapdashboard') && 'bg-graydark dark:bg-meta-4'
                    }`}
                >
                  <img src={mapImg} height={25} width={25} />
                  Centers Map View
                </NavLink>
              </li>
            </ul>
          </div>

          {(user?.user_type === 'acc_admin' || user?.user_type === 'adc_admin' || user?.user_type === 'ema_admin') && (
            <>
              <ul className="mb-6 flex flex-col">
                {/* <!-- Menu Item Auth Pages --> */}
                <SidebarLinkGroup
                  activeCondition={
                    pathname === '/hlo/admin' || pathname.includes('hlo/admin')
                  }
                >
                  {(handleClick, open) => {
                    return (
                      <React.Fragment>
                        <NavLink
                          to="#"
                          className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-3 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(pathname === '/auth' || pathname.includes('auth')) &&
                            'bg-graydark dark:bg-meta-4'
                            }`}
                          onClick={(e) => {
                            e.preventDefault();
                            sidebarExpanded
                              ? handleClick()
                              : setSidebarExpanded(true);
                          }}
                        >
                          {/* SVG here */}
                          Admin Pages
                          <svg
                            className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${open && 'rotate-180'}`}
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                              fill=""
                            />
                          </svg>
                        </NavLink>
                        {/* <!-- Dropdown Menu Start --> */}
                        <div
                          className={`translate transform overflow-hidden ${!open && 'hidden'}`}
                        >
                          <ul className='ml-4'>
                            {(user?.user_type === 'acc_admin' || user?.user_type === 'adc_admin') && (
                              <>
                                <li>
                                  <NavLink
                                    to="/hlo/admin/stockmanagement/"
                                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('stock') && 'bg-graydark dark:bg-meta-4'
                                      }`}
                                  >
                                    <img src={HLOStockLogo} height={20} width={20} />
                                    Stock Management
                                  </NavLink>
                                </li>
                                <li>
                                  <NavLink
                                    to="/hlo/admin/createaidrequest/"
                                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('aidrequests') && 'bg-graydark dark:bg-meta-4'
                                      }`}
                                  >
                                    <img src={reqeustImg} height={20} width={20} />
                                    Aid Requests
                                  </NavLink>
                                </li>
                              </>
                            )}
                            {(auth && user?.user_type === 'ema_admin') && (
                              <>
                                <li>
                                  <NavLink
                                    to="/hlo/admin/confirmdeny_page"
                                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('confirmdeny_page') && 'bg-graydark dark:bg-meta-4'
                                      }`}
                                  >
                                    <img src={UserCheck} height={25} width={25} />
                                    Account Activation
                                  </NavLink>
                                </li>
                                <li>
                                  <NavLink
                                    to="/hlo/admin/createadmin"
                                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('createadmin') && 'bg-graydark dark:bg-meta-4'
                                      }`}
                                  >
                                    <img src={UserPlus} height={25} width={25} />
                                    Create Admin
                                  </NavLink>
                                </li>
                                <li>
                                  <NavLink
                                    to="/hlo/admin/createcenter"
                                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('createcenter') && 'bg-graydark dark:bg-meta-4'
                                      }`}
                                  >
                                    <img src={CenterLogo} height={25} width={25} />
                                    Create Center
                                  </NavLink>
                                </li>
                                <li>
                                  <NavLink
                                    to="/hlo/admin/managecenters"
                                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('managecenters') && 'bg-graydark dark:bg-meta-4'
                                      }`}
                                  >
                                    <img src={CenterLogo} height={25} width={25} />
                                    Manage Centers
                                  </NavLink>
                                </li>
                              </>
                            )}
                          </ul>
                        </div>
                        {/* <!-- Dropdown Menu End --> */}
                      </React.Fragment>
                    );
                  }}
                </SidebarLinkGroup>
                {/* <!-- Menu Item Auth Pages --> */}
              </ul>
            </>
          )}

          {/* <ul>
            <li>
              <NavLink
                to="/pages/terms-conditions"
                className={({ isActive }) =>
                  'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                  (isActive && '!text-white')
                }
              >
                <svg
                  viewBox="0 0 24 24"
                  width={25}
                  height={25}
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                  <g id="SVGRepo_iconCarrier">
                    <path d="M12 17V11" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round"></path>
                    <circle cx="1" cy="1" r="1" transform="matrix(1 0 0 -1 11 9)" fill="#FFFFFF"></circle>
                    <path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round"></path>
                  </g>
                </svg>
                Terms & Conditions
              </NavLink>
            </li>
          </ul> */}
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
