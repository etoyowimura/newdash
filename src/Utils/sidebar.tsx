import { MenuProps } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BankOutlined, UserOutlined, CustomerServiceOutlined, FileDoneOutlined, TeamOutlined } from '@ant-design/icons';
import Company from "../Components/Companies/Companies";
import CompanyEdit from '../Components/Companies/CompaniesEdit';
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
const isSuperUser = localStorage.getItem('isSuperUser');

export const allMenu: MenuItem[] = [
  getItem(<Link to="/">Companies</Link>, "/", <BankOutlined />),
  getItem(<Link to="customers/">Customers</Link>, "customers/", <UserOutlined />),
  getItem(<Link to="services/">Services</Link>, "services/", <CustomerServiceOutlined />),
  getItem(<Link to="tasks/">Tasks</Link>, "tasks/", <FileDoneOutlined />),  
];

if (isSuperUser !== 'false') {
  allMenu.push(getItem(<Link to="teams/">Teams</Link>, "teams/", <TeamOutlined />),
  getItem(<Link to="users/">Admins</Link>, "users/", <TeamOutlined />),
  getItem(<Link to="stats/">Statistics</Link>, "stats/", <TeamOutlined />))
}


allMenu.push(
  getItem(<Link to="profile/">Profile</Link>, "profile/", <UserOutlined />), 
)

export const items: Array<any> = [
  {
    path: "/",
    component: <Company />,
    key: "/",
  },
  {
    path: "/:id",
    component: <CompanyEdit />,
    key: "/:id",
  },
  {
    path: "/customers/",
    component: <Customer />,
    key: "/customers/",
  },
  {
    path: "/customers/:id/",
    component: <CustomerEdit />,
    key: "/cusotmers/:id/",
  },
  {
    path: "/services/",
    component: <Service />,
    key: "/services/",
  },
  {
    path: "/services/:id/",
    component: <ServiceEdit />,
    key: "/services/:id/",
  },
  {
    path: "/tasks/",
    component: <Task />,
    key: "/tasks/",
  },
  {
    path: "/tasks/:id/",
    component: <TaskEdit />,
    key: "/tasks/:id/",
  },
  
  isSuperUser !== 'false' && {
    path: "/teams/",
    component: <Team />,
    key: "/teams/",
  },
  {
    path: "/teams/:id/",
    component: <TeamEdit />,
    key: "/teams/:id/",
  },
  isSuperUser !== 'false' && {
    path: "/users/",
    component: <User />,
    key: "/users/",
  },
  {
    path: "/users/:id/",
    component: <UserEdit />,
    key: "/users/:id/",
  },
  isSuperUser !== 'false' && {
    path: "/stats/",
    component: <Stat />,
    key: "/stats/",
  },
  {
    path: "/profile/",
    component: <Profile />,
    key: "/profile/",
  },
];
