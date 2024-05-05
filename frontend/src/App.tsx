import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import ResetPassword from './pages/Authentication/ResetPassword';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import ComingSoon from './pages/Authentication/ComingSoon';
import HLODashboard from './components/HLO/GenericPages/HLODashboard';
import StockManagement from './components/HLO/CenterAdminPages/StockManagement';
import HLO_EditProfile_VC from './components/HLO/GenericPages/HLO_EditProfile_VC';
import HLO_EditProfile_EC from './components/HLO/GenericPages/HLO_EditProfile_EC';
import ConfirmDeny_Page from './components/HLO/EmaPages/ConfirmDeny_Page';
import { AuthProvider } from './components/HLO/AuthProvider';
import MapDashboard from './components/HLO/GenericPages/MapDashboard';
import ConfirmPassword from './components/HLO/GenericPages/ConfirmPassword';
import CreateCenter from './components/HLO/EmaPages/CreateCenter';
import CreateAdmin from './components/HLO/EmaPages/CreateAdmin';
import ManageCenters from './components/HLO/EmaPages/ManageCenters';
import UpdateCenter from './components/HLO/EmaPages/UpdateCenter';
import ManageAidTypes from './components/HLO/EmaPages/ManageAidTypes';
import CreateAidType from './components/HLO/EmaPages/CreateAidType';
import UpdateAidType from './components/HLO/EmaPages/UpdateAidType';
import AddAidType from './components/HLO/CenterAdminPages/AddAidType';
import ManageROM from './components/HLO/EmaPages/ManageROM';
import Tasks from './components/HLO/CourierPages/Tasks';
import ConfirmCode from './components/HLO/CenterAdminPages/ConfirmCode';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <AuthProvider>
        <Routes>
          {/* HLO ROUTES*/}
          <Route
            index
            element={
              <>
                <PageTitle title="HLO Dashboard" />
                <HLODashboard />
              </>
            }
          />
          <Route
            path="/hlo/admin/stockmanagement"
            element={
              <>
                <PageTitle title="Stock Management" />
                <StockManagement />
              </>
            }
          />
          <Route
            path="/hlo/profile_vc"
            element={
              <>
                <PageTitle title="Edit Profile" />
                <HLO_EditProfile_VC />
              </>
            }
          />
          <Route
            path="/hlo/profile_ec"
            element={
              <>
                <PageTitle title="Edit Profile" />
                <HLO_EditProfile_EC />
              </>
            }
          />
          <Route
            path="/hlo/admin/confirmdeny_page"
            element={
              <>
                <PageTitle title="Confirm Deny" />
                <ConfirmDeny_Page />
              </>
            }
          />
          <Route
            path="/hlo/mapDashboard"
            element={
              <>
                <PageTitle title="Map Dashboard" />
                <MapDashboard />
              </>
            }
          />
          <Route
            path="/auth/confirm-password"
            element={
              <>
                <PageTitle title="Confirm Password" />
                <ConfirmPassword />
              </>
            }
          />
          <Route
            path="/auth/confirm-code"
            element={
              <>
                <PageTitle title="Confirm Code" />
                <ConfirmCode />
              </>
            }
          />
          <Route
            path="/hlo/admin/createCenter"
            element={
              <>
                <PageTitle title="Create New Center" />
                <CreateCenter />
              </>
            }
          />
          <Route
            path="/hlo/admin/createAdmin"
            element={
              <>
                <PageTitle title="Create New Admin" />
                <CreateAdmin />
              </>
            }
          />
          <Route
            path="/hlo/admin/addAidType"
            element={
              <>
                <PageTitle title="Add New Aid Type" />
                <AddAidType />
              </>
            }
          />
          <Route
            path="/hlo/admin/manageCenters"
            element={
              <>
                <PageTitle title="Manage Aid Centers" />
                <ManageCenters />
              </>
            }
          />
          <Route
            path="/hlo/admin/update-acc/:id"
            element={
              <>
                <PageTitle title="Update ACC" />
                <UpdateCenter />
              </>
            }
          />
          <Route
            path="/hlo/admin/update-adc/:id"
            element={
              <>
                <PageTitle title="Update ADC" />
                <UpdateCenter />
              </>
            }
          />
          <Route
            path="/hlo/admin/aidmanagement"
            element={
              <>
                <PageTitle title="Aid Management" />
                <ManageAidTypes />
              </>
            }
          />
          <Route
            path="/hlo/admin/createaidtype"
            element={
              <>
                <PageTitle title="Create Aid Type" />
                <CreateAidType />
              </>
            }
          />
          <Route
            path="/hlo/admin/updateaidtype/:id"
            element={
              <>
                <PageTitle title="Update Aid Type" />
                <UpdateAidType />
              </>
            }
          />
          <Route
            path="/hlo/admin/rommanagement"
            element={
              <>
                <PageTitle title="Manage ROM Activities" />
                <ManageROM />
              </>
            }
          />
          <Route
            path="/hlo/tasks"
            element={
              <>
                <PageTitle title="Courier Tasks" />
                <Tasks />
              </>
            }
          />
          {/* HLO ROUTES END */}
          <Route
            path="/auth/signin"
            element={
              <>
                <PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <SignIn />
              </>
            }
          />
          <Route
            path="/auth/signup"
            element={
              <>
                <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <SignUp />
              </>
            }
          />
          <Route
            path="/auth/reset-password"
            element={
              <>
                <PageTitle title="Reset Password | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <ResetPassword />
              </>
            }
          />
          <Route
            path="/auth/coming-soon"
            element={
              <>
                <PageTitle title="Coming Soon | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <ComingSoon />
              </>
            }
          />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
