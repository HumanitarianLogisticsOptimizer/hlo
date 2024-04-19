import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import ResetPassword from './pages/Authentication/ResetPassword';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import ComingSoon from './pages/Authentication/ComingSoon';
import HLODashboard from './components/HLO/HLODashboard';
import StockManagement from './components/HLO/CenterAdminPages/StockManagement';
import HLO_EditProfile_VC from './components/HLO/HLO_EditProfile_VC';
import HLO_EditProfile_EC from './components/HLO/HLO_EditProfile_EC';
import ConfirmDeny_Page from './components/HLO/EmaPages/ConfirmDeny_Page';
import { AuthProvider } from './components/HLO/AuthProvider';
import MapDashboard from './components/HLO/MapDashboard';
import ConfirmPassword from './components/HLO/ConfirmPassword';
import CreateCenter from './components/HLO/EmaPages/CreateCenter';
import CreateAdmin from './components/HLO/EmaPages/CreateAdmin';
import CreateAidRequest from './components/HLO/CenterAdminPages/CreateAidRequest';
import ManageCenters from './components/HLO/EmaPages/ManageCenters';
import UpdateCenter from './components/HLO/EmaPages/UpdateCenter';
import ManageAidRequests from './components/HLO/EmaPages/ManageAidRequests';
import CreateAidType from './components/HLO/EmaPages/CreateAidType';
import UpdateAidType from './components/HLO/EmaPages/UpdateAidType';

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
            path="/hlo/admin/createAidRequest"
            element={
              <>
                <PageTitle title="Create New Aid Request" />
                <CreateAidRequest />
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
                <ManageAidRequests />
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
