"use client";

import { MenuItemsType } from "@/data";
import { cn } from "@/utils";
import { Link, useLocation } from "react-router";
import { Logo } from "../logo";
import { Icon } from "lucide-react";

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
          "bg-input fixed top-0 left-0 z-40 flex h-screen w-[250px] flex-col transition-transform duration-300 ease-in-out",
          "lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="ml-4 flex items-start justify-start">
          <Logo />
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-8">
          <div className="mb-3 px-4">
            <p className="text-sidebar-foreground px-3 text-xs font-semibold">Quick Access</p>
          </div>
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
                      ? "text-sidebar-accent-foreground bg-[#303751]"
                      : "text-sidebar-foreground/60 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
                  )}
                >
                  <Icon icon={item.icon} width={20} height={20} />
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
