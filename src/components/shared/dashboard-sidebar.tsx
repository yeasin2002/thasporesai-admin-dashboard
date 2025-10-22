"use client";

import { MenuItemsType } from "@/data";
import { logout } from "@/redux/features/auth/authslice";
import { useAppDispatch } from "@/redux/hooks";
import { cn } from "@/utils";
import { Link, useLocation } from "react-router";
import logo from "../../assets/logo.png";
import { toast } from "sonner";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: MenuItemsType[];
}

export function Sidebar({ isOpen, onClose, navItems }: SidebarProps) {
  const navigate = useNavigate();
  const pathname = useLocation();
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    toast.error("Logout Successfully");
  };
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 z-40 flex h-screen w-[250px] flex-col bg-[#F8F8F8] transition-transform duration-300 ease-in-out",
          "lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="ml-4 flex h-20 items-center justify-center">
          <img src={logo} alt="logo" className="h-15 w-15" />
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-8">
          <div className="space-y-1 px-4">
            {navItems.map((item) => {
              const isActive = pathname.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => onClose()}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-3 py-4 transition-all duration-200",
                    isActive
                      ? "bg-gradient-to-r from-[#6B9BC2] via-[#A3C4E0] to-[#6B9BC2] text-white shadow-sm"
                      : "text-[#6B9BC2] hover:bg-gradient-to-r hover:from-[#A3C4E0] hover:via-[#6B9BC2] hover:to-[#A3C4E0] hover:text-white",
                  )}
                >
                  <Icon icon={item.icon} width={20} height={20} color="" />
                  <span className="capitalize">{item.title}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Logout */}

        <button className="text-muted-foreground flex items-center gap-3 rounded-lg px-4 py-2.5 pt-4 pb-6">
          <Icon icon={"tdesign:poweroff"} width={24} height={24} />
          <span className="text-sm font-medium transition-colors" onClick={handleLogout}>
            Log Out
          </span>
        </button>
      </aside>
    </>
  );
}
