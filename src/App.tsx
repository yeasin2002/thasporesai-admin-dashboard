import { BrowserRouter, Route, Routes } from "react-router";
import { NotFound, RootErrorBoundary } from "./page";

import { AuthLayout, CommonDashboardLayout } from "./components/layout";
import { dashboardMenuItems } from "./data";
import { ForgotPassword, LoginPage, OtpPage, Register, ResetPassword } from "./page/auth";
import { DashboardOverview } from "./page/dashboard/dashboard-overview";
import { User } from "./page/dashboard/user";
import { Job } from "./page/dashboard/job";
import { Payments } from "./page/dashboard/payments";
import { Settings } from "./page/dashboard/settings";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLayout />} errorElement={<RootErrorBoundary />}>
          <Route index element={<LoginPage />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="register" element={<Register />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="otp" element={<OtpPage />} />
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
        </Route>

        {/* <Route path="/" element={<Home />} errorElement={<RootErrorBoundary />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
