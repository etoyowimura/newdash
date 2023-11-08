import { MenuProps } from "antd";
import { Link } from "react-router-dom";
import {
  BankOutlined,
  DownSquareOutlined,
  CustomerServiceOutlined,
  FileDoneOutlined,
  TeamOutlined,
  BarChartOutlined,
  AuditOutlined,
  MehOutlined,
} from "@ant-design/icons";
import Company from "../Components/Companies/Companies";
import CompanyEdit from "../Components/Companies/CompaniesEdit";
import Customer from "../Components/Customers/Customers";
import CustomerEdit from "../Components/Customers/CustomersEdit";
import Service from "../Components/Services/Services";
import ServiceEdit from "../Components/Services/ServiceEdit";
import Task from "../Components/Tasks/Tasks";
import TaskEdit from "../Components/Tasks/TaskEdit";
import TeamEdit from "../Components/Teams/TeamEdit";
import Team from "../Components/Teams/Teams";
import User from "../Components/Users/Users";
import UserEdit from "../Components/Users/UserEdit";
import MenuItem from "antd/es/menu/MenuItem";
import Stat from "../Components/Statistics/Statistic";
import Profile from "../Components/Profile/Profile";
import Update from "../Components/Updates/Update";
import UpdateEdit from "../Components/Updates/UpdateEdit";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}
const isSuperUser = localStorage.getItem("isSuperUser");

export const allMenu: MenuItem[] = [
  getItem(<Link to="/">Tasks</Link>, "/", <FileDoneOutlined />),
  getItem(
    <Link to="companies/">Companies</Link>,
    "companies/",
    <BankOutlined />
  ),
  getItem(
    <Link to="customers/">Customers</Link>,
    "customers/",
    <AuditOutlined />
  ),
  getItem(
    <Link to="services/">Services</Link>,
    "services/",
    <CustomerServiceOutlined />
  ),
];

if (isSuperUser !== "false") {
  allMenu.push(
    getItem(<Link to="teams/">Teams</Link>, "teams/", <TeamOutlined />),
    getItem(
      <Link to="stats/">Statistics</Link>,
      "stats/",
      <BarChartOutlined />
    ),
    getItem(<Link to="users/">Admins</Link>, "users/", <MehOutlined />),
    getItem(
      <Link to="updates/">Updates</Link>,
      "updates/",
      <DownSquareOutlined />
    )
  );
}

type TItems = {
  path: string;
  component: JSX.Element;
  key: string;
};

export const mainItems: TItems[] = [
  {
    path: "/companies/",
    component: <Company />,
    key: "/companies/",
  },
  {
    path: "/companies/:id",
    component: <CompanyEdit />,
    key: "/company/:id",
  },
  {
    path: "/customers/",
    component: <Customer />,
    key: "/customers/",
  },
  {
    path: "/customers/:id/",
    component: <CustomerEdit />,
    key: "/cusotmer/:id/",
  },
  {
    path: "/services/",
    component: <Service />,
    key: "/services/",
  },
  {
    path: "/services/:id/",
    component: <ServiceEdit />,
    key: "/service/:id/",
  },
  {
    path: "/",
    component: <Task />,
    key: "tasks",
  },
  {
    path: "/:id/",
    component: <TaskEdit />,
    key: "task/:id/",
  },
];

export const superItems: TItems[] = [
  {
    path: "/teams/",
    component: <Team />,
    key: "/teams/",
  },
  {
    path: "/teams/:id/",
    component: <TeamEdit />,
    key: "/team/:id/",
  },
  {
    path: "/users/",
    component: <User />,
    key: "/users/",
  },
  {
    path: "/users/:id/",
    component: <UserEdit />,
    key: "/user/:id/",
  },
  {
    path: "/stats/",
    component: <Stat />,
    key: "/stats/",
  },
  {
    path: "/profile/",
    component: <Profile />,
    key: "/profile/",
  },
  {
    path: "/updates/",
    component: <Update />,
    key: "/updates/",
  },
  {
    path: "/updates/:id/",
    component: <UpdateEdit />,
    key: "/update/:id/",
  },
];
