import { BrowserRouter, Route, Routes } from "react-router";
import { NotFound, RootErrorBoundary } from "./page";

import { AuthLayout, CommonDashboardLayout } from "./components/layout";
import { dashboardMenuItems } from "./data";
import { ForgotPassword, LoginPage, OtpPage, Register, ResetPassword } from "./page/auth";
import { DashboardOverview } from "./page/dashboard/dashboard-overview";

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
        </Route>

        {/* <Route path="/" element={<Home />} errorElement={<RootErrorBoundary />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
