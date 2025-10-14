import { Navbar, Sidebar } from "@/components/shared";
import { MenuItemsType } from "@/data";
import { Suspense, useState } from "react";
import { Outlet } from "react-router";

type CommonDashboardLayoutProps = {
  navItems: MenuItemsType[];
};

export function CommonDashboardLayout({ navItems }: CommonDashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <Suspense fallback={<div className="bg-background min-h-screen" />}>
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} navItems={navItems} />
      <Navbar onMenuClick={toggleSidebar} />
      <main className="mt-16 min-h-screen px-10 pt-10 lg:ml-[250px]">
        <Outlet />
      </main>
    </Suspense>
  );
}
