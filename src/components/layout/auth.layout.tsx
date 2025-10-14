import authBgImg from "@/assets/auth-bg.png";
import Logo from "@/assets/logo.svg?react";
import { Outlet } from "react-router";

export function AuthLayout() {
  return (
    <div className="grid w-full lg:grid-cols-2">
      <Outlet />

      <div className="relative hidden lg:block">
        <img
          src={authBgImg}
          alt="Restaurant interior"
          className="h-full max-h-screen w-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center justify-center gap-4">
            {/* <img src={logo} alt="Logo" /> */}
            <Logo />
            <span className="text-5xl font-light text-white">Lignaflow</span>
          </div>
        </div>
      </div>
    </div>
  );
}
