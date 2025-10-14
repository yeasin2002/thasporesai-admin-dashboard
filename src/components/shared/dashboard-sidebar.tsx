"use client";

import { MenuItemsType } from "@/data";
import { cn } from "@/utils";
import logo from "../../assets/logo.png";
import { Link, useLocation } from "react-router";
import { LogoIcon } from "./logo";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: MenuItemsType[];
}

export function Sidebar({ isOpen, onClose, navItems }: SidebarProps) {
  const pathname = useLocation();

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
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "text-sidebar-accent-foreground bg-[#6B9BC2]"
                      : "text-sidebar-foreground/60 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
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
          <span className="text-sm font-medium transition-colors">Log Out</span>
        </button>
      </aside>
    </>
  );
}
