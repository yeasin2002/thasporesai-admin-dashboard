import { BrowserRouter, Route, Routes } from "react-router";
import { NotFound, RootErrorBoundary } from "./page";

import { AuthLayout, CommonDashboardLayout } from "./components/layout";
import { dashboardMenuItems } from "./data";
import { ForgotPassword, LoginPage, ResetPassword } from "./page/auth";
import { DashboardOverview } from "./page/dashboard/dashboard-overview";
import { Job } from "./page/dashboard/job";
import { Payments } from "./page/dashboard/payments";
import AdminProfileForm from "./page/dashboard/profile";
import { Settings } from "./page/dashboard/settings";
import { User } from "./page/dashboard/user";

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
          <Route path="edit-profile" element={<AdminProfileForm />} />
        </Route>

        {/* <Route path="/" element={<Home />} errorElement={<RootErrorBoundary />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
