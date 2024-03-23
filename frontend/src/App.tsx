import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import ResetPassword from './pages/Authentication/ResetPassword';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import ComingSoon from './pages/Authentication/ComingSoon';
import HLODashboard from './components/HLO/HLODashboard';
import StockManagement from './components/HLO/StockManagement';
import HLO_EditProfile_VC from './components/HLO/HLO_EditProfile_VC';
import HLO_EditProfile_EC from './components/HLO/HLO_EditProfile_EC';
import ConfirmDeny_Page from './components/HLO/ConfirmDeny_Page';
import { AuthProvider } from './components/HLO/AuthProvider';
import MapDashboard from './components/HLO/MapDashboard';
import ConfirmPassword from './components/HLO/ConfirmPassword';

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
