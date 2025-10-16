export type MenuItemsType = {
  title: string;
  href: string;
  icon: string;
};

export const dashboardMenuItems: MenuItemsType[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "fluent:home-24-filled",
  },
  {
    title: "User",
    href: "/dashboard/user",
    icon: "teenyicons:box-solid",
  },
  {
    title: "Job",
    href: "/dashboard/job",
    icon: "iconoir:wallet",
  },
  {
    title: "Payments",
    href: "/dashboard/payments",
    icon: "grommet-icons:line-chart",
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: "uil:setting",
  },
];
