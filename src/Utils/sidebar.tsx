import { MenuProps } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { DesktopOutlined, UserOutlined } from '@ant-design/icons';
import Company from "../Components/Companies/Companies";
import CompanyEdit from '../Components/Companies/CompaniesEdit';
import Customer from "../Components/Customers/Customers";
import CustomerEdit from "../Components/Customers/CustomersEdit";


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

export const allMenu: MenuItem[] = [
  getItem(<Link to="/">Companies</Link>, "/", <DesktopOutlined />),
  getItem(<Link to="customers/">Customers</Link>, "customers/", <UserOutlined />),
];

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
    path: "customers/",
    component: <Customer />,
    key: "customers/",
  },
  {
    path: "customer/:id",
    component: <CustomerEdit />,
    key: "cusotmer/:id",
  },
];
