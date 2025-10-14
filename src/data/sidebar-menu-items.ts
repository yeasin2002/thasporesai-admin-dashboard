export type MenuItemsType = {
  title: string;
  href: string;
  icon: string;
};

export const dashboardMenuItems: MenuItemsType[] = [
  {
    title: "overview",
    href: "/dashboard/employee",
    icon: "fluent:home-24-filled",
  },
  {
    title: "tasks",
    href: "/dashboard/employee/tasks",
    icon: "teenyicons:box-solid",
  },
  {
    title: "projects",
    href: "/dashboard/employee/projects",
    icon: "iconoir:wallet",
  },
  {
    title: "timesheet",
    href: "/dashboard/employee/timesheet",
    icon: "grommet-icons:line-chart",
  },
];
