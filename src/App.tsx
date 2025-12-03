import { BrowserRouter, Route, Routes } from "react-router";
import { NotFound, RootErrorBoundary } from "./page/common";

import { AuthLayout, CommonDashboardLayout } from "./components/layout";
import { dashboardMenuItems } from "./data";

import { ForgotPassword, LoginPage, ResetPassword } from "./page/auth";
import {
  AdminProfileForm,
  DashboardOverview,
  Job,
  Location,
  Payments,
  Settings,
  User,
} from "./page/dashboard";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLayout />} errorElement={<RootErrorBoundary />}>
          <Route index element={<LoginPage />} />
          {/* <Route path="register" element={<Register />} /> */}
          {/* <Route path="otp" element={<OtpPage />} /> */}

          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
        </Route>

        <Route
          path="/dashboard"
          element={<CommonDashboardLayout navItems={dashboardMenuItems} />}
          errorElement={<RootErrorBoundary />}
        >
          <Route index element={<DashboardOverview />} />
          <Route path="user" element={<User />} />
          <Route path="job" element={<Job />} />
          <Route path="payments" element={<Payments />} />
          <Route path="settings" element={<Settings />} />
          <Route path="locations" element={<Location />} />
          <Route path="edit-profile" element={<AdminProfileForm />} />
        </Route>

        {/* <Route path="/" element={<Home />} errorElement={<RootErrorBoundary />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
