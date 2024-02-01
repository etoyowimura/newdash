import React, { useEffect, useState } from "react";
import "./App.css";
import { Layout, Menu, ConfigProvider, Dropdown, Space, Avatar } from "antd";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { allMenu, mainItems, superItems } from "./Utils/sidebar";
import Login from "./Auth/Login";
import Notfound from "./Utils/Notfound";
import { LogoutApi } from "./API/auth/logout";
import { Switch } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import Register from "./Auth/Register";
import Activate from "./Auth/Activate";
import Invite from "./Auth/Invite";
import ResetPassword from "./Auth/ResetPassword";
import ResetByEmail from "./Auth/ResetByEmail";


interface userType {
  first_name:string | null;
  last_name: string | null
  id: number | null;
  role: string | null;
  timezone: string | null;
  username: string | null;
}
export const isMobile = window.innerWidth <= 768;
const { Header, Sider, Content } = Layout;
const userJSON : any = localStorage.getItem("user");
const userObject : userType = JSON.parse(userJSON);
export const timeZone = userObject?.timezone;
export const role = userObject?.role;
export const admin_id = userObject?.id;

const App: React.FC = () => {
  const isAuthenticated = localStorage.getItem("access_token") as string;
  const authorized = isAuthenticated;
  const [collapsed, setCollapsed] = useState<any>(
    localStorage.getItem("collapsed") === "true" ? true : false
  );
  const [theme, setTheme] = useState<any>(
    localStorage.getItem("theme") === "true" ? true : false
  );

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);
  useEffect(() => {
    localStorage.setItem("collapsed", collapsed);
  }, [collapsed]);

  let location = useLocation();
  const clickLogout = () => {
    LogoutApi();
  };
  const dark = {
    components: {
      Table: {
        colorBgContainer: "#202020",
        colorText: "#E0E0E0",
        headerColor: "#E0E0E0",
        borderColor: "#3A3A3A",
        headerSplitColor: "#3A3A3A",
        rowHoverBg: "#333333",
        colorBorder: "#3A3A3A",
      },
      Layout: {
        bodyBg: "#181818",
      },
      Input: {
        colorBgContainer: "#2A2A2A",
        colorText: "#E0E0E0",
        colorTextPlaceholder: "#BBBBBB",
        colorBorder: "#3A3A3A",
        colorPrimaryHover: "#1E1E1E",
        colorIconHover: "#1E1E1E",
        activeBorderColor: "#565656",
        colorPrimaryActive: "#1E1E1E",
        activeShadow: "none",
        borderRadius: 2 ,
      },
      Select: {
        colorBgContainer: "#2A2A2A",
        colorText: "#BBBBBB",
        colorTextPlaceholder: "#BBBBBB",
        colorBorder: "#3A3A3A",
        colorPrimaryHover: "#1E1E1E",
        colorIconHover: "#1E1E1E",
        optionSelectedBg: "#1E1E1E",
        colorBgElevated: "#1A1A1A",
        controlOutline: "none",
        optionActiveBg: "#333333",
        colorTextQuaternary: "#1E1E1E",
        borderRadius: 2 ,
      },
      Button: {
        colorBorderSecondary: "#ffb94a",
        colorPrimary: "#ffb94a",
        colorPrimaryHover: "#ffb94a",
        colorIcon: "#E0E0E0",
        primaryShadow: "none",
        dangerShadow: "none",
        colorTextDisabled: "#AAAAAA",
        borderColorDisabled: "#3A3A3A",
        borderRadius: 2 ,
      },
      Form: {
        labelColor: "#E0E0E0",
      },
      Tabs: {
        itemColor: "#E0E0E0",
        itemHoverColor: "#FFFFFF",
        itemSelectedColor: "#FFFFFF",
        colorPrimaryActive: "#1E1E1E",
      },
      Upload: {
        colorText: "#FFFFFF",
        colorInfoBgHover: "#1E1E1E",
      },
      Pagination: {
        colorText: "#E0E0E0",
        colorPrimary: "#FFFFFF",
        colorBgContainer: "#1A1A1A",
        colorBorderSecondary: "#FFFFFF",
      },
      Modal: {
        contentBg: "#1E1E1E",
        headerBg: "#1E1E1E",
        titleColor: "#FFFFFF",
      },
      Menu: {
        darkItemSelectedBg: "#1E1E1E",
        colorBgContainer: "#202020",
        darkItemColor:  "#E0E0E0",
      },
      Switch: {
        colorPrimary: "#565656",
        colorPrimaryHover: "#737373",
      },
      Radio: {
        colorText: "#737373",
        colorBorder: "#565656",
        colorPrimaryActive: "#E0E0E0",
        buttonCheckedBg: "#ffb94a",
        colorPrimaryHover: "#737373",
        colorPrimary: "#565656",
      },
      Dropdown: {
        colorBgContainer: "#3A3A3A",
        colorText: "#E0E0E0",
        colorPrimaryHover: "#565656",
        colorPrimary: "#333333",
      },
      DatePicker: {
        colorBgContainer: "#3A3A3A",
        colorBgElevated: "#3A3A3A",
      },
      Empty:{
        colorText: "#ffb94a",
        colorTextDisabled: "#ffb94a",
      }
    },
    token: {
      fontFamily: "Noto Sans, sans-serif",
      colorBgLayout: "#181818",
      colorBgBase: "#E0E0E0",
      colorIcon: "#E0E0E0",
    },

  };
  const light = {
    components: {
      Table: {
        rowHoverBg: "#bae0ff",
      },
      Menu: {
        darkItemSelectedBg: "#2e5884",
      },
      Button: {
        colorPrimary: "#ffb94a",
        colorPrimaryHover: "#ffb94a",
        colorIcon: "#ffb94a",
        primaryShadow: "#ffb94a",
        dangerShadow: "#ffb94a",
        colorTextDisabled: "#ffb94a",
        borderColorDisabled: "#ffb94a",
        colorBgContainerDisabled: '#fff',
        borderRadius: 2 ,
      },
      Select: {
        colorPrimaryHover: "#ffb94a",
        borderRadius: 2 ,
      },
      Input:{
        hoverBorderColor: "#ffb94a",
        activeBorderColor: "#ffb94a",
        borderRadius: 2 ,
      },
      Radio: {
        colorPrimary: "#ffb94a",
      },
    },
    token: {
      fontFamily: "Noto Sans, sans-serif",
      color: "#1c1c1e",
    },
  };
  const rep = () => {
    document.location.replace("/");
  };
  const menu: any = (
    <Menu>
      <Menu.Item key="profile">
        <Link to="profile/">Profile</Link>
      </Menu.Item>
      <Menu.Item key="logout" danger onClick={clickLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <ConfigProvider theme={theme === true ? dark : light}>
      <div>
        {!authorized &&
          !(
            location.pathname.startsWith("/auth/register") ||
            location.pathname.startsWith("/auth/activate") ||
            location.pathname.startsWith("/auth/reset_password") ||
            location.pathname.startsWith("/auth/reset-password") ||
            location.pathname.startsWith("/auth/login")
          ) && (
            <Navigate
              to={{
                pathname: "/auth/login",
              }}
            />
          )}
        {authorized && (location.pathname === "/auth/login" || location.pathname === "/")  && (
          <Navigate
            to={{
              pathname: "/tasks",
            }}
          />
        )}
        {authorized ? (
          <Layout>
            {isMobile ? (
              <div className=""></div>
            ) : (
              <Sider
                theme={"dark"}
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
                style={{
                  height: "100vh",
                  background: theme === true ? "#1c1c1e" : "#293649",
                }}
              >
                <p
                  onClick={rep}
                  style={{ cursor: "pointer" }}
                  className={collapsed ? "logo-collapsed" : "logo"}
                >
                  TT ELD
                </p>
                <Menu
                  theme={"dark"}
                  mode="inline"
                  items={allMenu}
                  defaultSelectedKeys={[location.pathname]}
                  style={{ background: theme === true ? "#1c1c1e" : "#293649" }}
                ></Menu>
              </Sider>
            )}
            <Layout className="site-layout">
              {isMobile ? (
                <Header style={{ padding: 0 }}>
                  <div className="demo-logo" />
                  <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={["2"]}
                    items={allMenu}
                  />
                </Header>
              ) : (
                <Header
                  className="site-layout-background"
                  style={{
                    padding: 0,
                    background: theme === true ? "#1c1c1e" : "#fff",
                    display: "flex",
                    justifyContent: "end",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      float: "right",
                      marginRight: "35px",
                      display: "flex",
                      alignItems: "center",
                      alignSelf: "center",
                      minWidth: 150,
                      maxWidth: 500,
                      justifyContent: "space-between",
                    }}
                  >
                    <Switch
                      unCheckedChildren={"Dark"}
                      checkedChildren={"Light"}
                      defaultChecked={theme === true}
                      onChange={(e: any) => setTheme(e)}
                    />
                    <Dropdown overlay={menu} trigger={["click"]}>
                      <div
                        style={{ cursor: "pointer" }}
                        onClick={(e) => e.preventDefault()}
                      >
                        <Space>
                          <p
                            style={{
                              color: theme === true ? "#f0f0f0" : "#1c1c1e",
                              paddingLeft: 20,
                            }}
                          >
                            {userObject?.username}{" "}
                          </p>
                          <Avatar
                            style={{ backgroundColor: "#87d068" }}
                            size="small"
                            icon={<UserOutlined />}
                          />
                        </Space>
                      </div>
                    </Dropdown>
                  </div>
                </Header>
              )}
              <Content
                id="element"
                className="site-layout-background"
                style={{
                  padding: 24,
                  minHeight: "92vh",
                  maxHeight: "calc(90vh - 10px)",
                  overflowY: "scroll",
                  background: theme === true ? "#1c1c1e" : "#fff",
                }}
              >
                <Routes>
                  {mainItems &&
                    mainItems.map((u) => (
                      <Route key={u.key} path={u.path} element={u.component} />
                    ))}
                  {superItems &&
                    superItems.map((u) => (
                      <Route key={u.key} path={u.path} element={u.component} />
                    ))}
                  <Route path="*" element={<Notfound />} />
                </Routes>
              </Content>
            </Layout>
          </Layout>
        ) : (
          <></>
        )}
        <Routes>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/activate" element={<Activate />} />
          <Route path="/auth/invite" element={<Invite />}/>
          <Route path="/auth/reset_password" element={<ResetPassword />}/>
          <Route path="/auth/reset-password" element={<ResetByEmail />}/>
        </Routes>
      </div>
    </ConfigProvider>
  );
};

export default App;
