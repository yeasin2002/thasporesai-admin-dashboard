export type MenuItemsType = {
  title: string;
  href: string;
  icon: string;
};

export const employeeMenuItems: MenuItemsType[] = [
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

export const projectManagerMenuItems: MenuItemsType[] = [
  {
    title: "overview",
    href: "/dashboard/project-manager",
    icon: "fluent:home-24-filled",
  },
  {
    title: "Estimates",
    href: "/dashboard/project-manager/Estimates",
    icon: "teenyicons:box-solid",
  },
  {
    title: "Projects",
    href: "/dashboard/project-manager/projects",
    icon: "iconoir:wallet",
  },
  {
    title: "Employee List",
    href: "/dashboard/project-manager/employee-list",
    icon: "material-symbols-light:list-alt-outline-sharp",
  },
  {
    title: "Employee Timesheet",
    href: "/dashboard/project-manager/employee-timesheet",
    icon: "grommet-icons:line-chart",
  },
  {
    title: "Crisis Management",
    href: "/dashboard/project-manager/crisis-management",
    icon: "hugeicons:file-management",
  },
];
export const estimatorMenuItems: MenuItemsType[] = [
  {
    title: "Overview",
    href: "/dashboard/estimator",
    icon: "fluent:home-24-filled",
  },
  {
    title: "Create Estimate",
    href: "/dashboard/estimator/create-estimate",
    icon: "teenyicons:box-solid",
  },
  {
    title: "All Estimate",
    href: "/dashboard/estimator/all-estimate",
    icon: "teenyicons:box-solid",
  },
];

export const companyMenuItems: MenuItemsType[] = [
  {
    title: "Overview",
    href: "/dashboard/company",
    icon: "fluent:home-24-filled",
  },
  {
    title: "User Management",
    href: "/dashboard/company/user-manage",
    icon: "fa:users",
  },
  {
    title: "Estimate management",
    href: "/dashboard/company/estimate-management",
    icon: "fluent-mdl2:document-management",
  },
  {
    title: "Project Management",
    href: "/dashboard/company/project-management",
    icon: "octicon:project-symlink-16",
  },
  {
    title: "Component Metarial",
    href: "/dashboard/company/component-metarial",
    icon: "ix:project-simulation",
  },
];

export const adminMenuItems: MenuItemsType[] = [
  {
    title: "Overview",
    href: "/dashboard/admin",
    icon: "fluent:home-24-filled",
  },
  {
    title: "User Management",
    href: "/dashboard/admin/user-management",
    icon: "fa:users",
  },
  {
    title: "Subscription Management",
    href: "/dashboard/admin/subscription-management",
    icon: "fluent-mdl2:document-management",
  },
  {
    title: "Settings",
    href: "/dashboard/admin/settings",
    icon: "octicon:project-symlink-16",
  },
];
