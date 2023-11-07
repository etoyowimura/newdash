import React, { useEffect, useState } from "react";
import "./App.css";
import {
  Layout,
  Menu,
  ConfigProvider,
  Dropdown,
  Space,
} from "antd";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { allMenu, items } from "./Utils/sidebar";
import Login from "./Auth/Login";
import Notfound from "./Utils/Notfound";
import { LogoutApi } from "./API/auth/Logout";
import { Switch } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Header, Sider, Content } = Layout;
const userJSON : any= localStorage.getItem("user");
const userObject = JSON.parse(userJSON);

const App: React.FC = () => {
  const isAuthenticated = localStorage.getItem("token") as string;
  const [authorized, setAuthorized] = useState<string | null>(isAuthenticated);
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

  let location: any = useLocation();
  const clickLogout = () => {
    LogoutApi();
  };
  const dark = {
    components: {
      Table: {
        colorBgContainer: "#141414",
        colorText: "#d9d9d9",
        headerColor: "#d9d9d9",
        borderColor: "#595959",
        headerSplitColor: "#595959",
        rowHoverBg: "#8c8c8c",
        colorBorder: '#434343',
      },
      Layout: {
        bodyBg: "#1f1f1f",
      },
      Input: {
        colorBgContainer: "#595959",
        colorText: "#d9d9d9",
        colorTextPlaceholder: "#d9d9d9",
        colorBorder: "#595959",
        colorPrimaryHover: "#1f1f1f",
        colorIconHover: "#1f1f1f",
        activeBorderColor: "none",
        colorPrimaryActive: "none",
        activeShadow: "none",
      },
      Select: {
        colorBgContainer: "#595959",
        colorText: "#d9d9d9",
        colorTextPlaceholder: "#d9d9d9",
        colorBorder: "#595959",
        colorPrimaryHover: "#1f1f1f",
        colorIconHover:  "#d9d9d9",
        optionSelectedBg: "#1f1f1f",
        colorBgElevated: "#000000",
        controlOutline: 'none',
        optionActiveBg: "#595959",
        colorTextQuaternary: "#d9d9d9",
      },
      Button: {
        colorBgBase: "#1f1f1f",
        colorBgContainer: "#d9d9d9",
        colorBorderSecondary: "#595959",
        colorPrimary: "#595959",
        colorPrimaryHover: "#595959",
        colorIcon: "#d9d9d9",
        primaryShadow: "none,",
        dangerShadow: "none",
        colorTextDisabled: "#d9d9d9",
        borderColorDisabled: "#d9d9d9",
      },
      Form: {
        labelColor: "#d9d9d9",
      },
      Tabs: {
        itemColor: "#d9d9d9",
        itemHoverColor: "#f5f5f5",
        itemSelectedColor: "#f5f5f5",
        colorPrimaryActive: "#1f1f1f",
      },
      Upload: {
        colorText: "#f5f5f5",
        colorInfoBgHover: "#1f1f1f",
      },
      Pagination: {
        colorText: "#d9d9d9",
        colorPrimary: "#f5f5f5",
        colorBgContainer: "#000",
        colorBorderSecondary: "#f5f5f5",
      },
      Modal: {
        contentBg: "#1f1f1f ",
        headerBg: "#1f1f1f ",
        titleColor: '#fff'
      },
      Menu: {
        darkItemSelectedBg: "#1f1f1f",
        colorBgContainer: "",
      },
      Switch: {
        colorPrimary: "#8c8c8c",
        colorPrimaryHover: "#8c8c8c",
      },
      Radio: {
        colorText:"#d9d9d9",
        colorBorder: '#8c8c8c',
        colorPrimaryActive: '#d9d9d9',
        buttonCheckedBg: "#fafafa",
        colorPrimaryHover: "#bfbfbf",
        colorPrimary: "#8c8c8c",
      },
      Dropdown: {
        colorBgContainer: "#bfbfbf",
        colorText: "#d9d9d9",
        colorPrimaryHover: "#bfbfbf",
        colorPrimary: "#8c8c8c",
      },
      DatePicker: {
        colorBgContainer: "#bfbfbf",
        colorBgElevated: "#bfbfbf",
      }
    },
    token: {
      fontFamily: 'Noto Sans, sans-serif',
      colorBgLayout: "#000",
      colorBgBase: "#000",
      colorIcon: "#bfbfbf",
    },
  }
  const light = {
    components: {
      Table: {
        rowHoverBg: "#bae0ff",
      },
      Menu: {
        darkItemSelectedBg: "#2e5884",
      },
    },
    token: {
      fontFamily: 'Noto Sans, sans-serif',
      color: '#000'
    },
  } 
  const rep = () => {
    document.location.replace("/");
  };
  const menu:any = (
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
          {!authorized && location.pathname !== "/login" && (
            <Navigate
              to={{
                pathname: "/login",
              }}
            />
          )}
          {authorized && location.pathname === "/login" && (
            <Navigate
              to={{
                pathname: "/",
              }}
            />
          )}
          {authorized ? (
            <Layout>
              <Sider
                theme={"dark"}
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
                style={{ height: "100vh", background: theme === true ? '#000' : '#3b6ea5'}}
              >
                <p
                  onClick={rep}
                  style={{ cursor: "pointer"}}
                  className={collapsed ? "logo-collapsed" : "logo"}
                >
                  TT ELD
                </p>
                <Menu
                  theme={"dark"}
                  mode="inline"
                  items={allMenu}
                  defaultSelectedKeys={[location.pathname]}
                  style={{ background: theme === true ? "#000" : '#3b6ea5' }}
                ></Menu>
              </Sider>
              <Layout className="site-layout">
                <Header
                  className="site-layout-background"
                  style={{
                    padding: 0,
                    background: theme === true ? "#000" : '#fff',
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
                      className="swww"
                      checkedChildren={"Light"}
                      defaultChecked={theme === true}
                      onChange={(e: any) => setTheme(e)}
                    />
                    <Dropdown overlay={menu} trigger={["click"]}>
                      <a onClick={(e) => e.preventDefault()}>
                        <Space>
                          <p style={{color: theme === true ? '#f0f0f0' : '#000', paddingLeft: 20}}>{userObject.username} </p>
                          <DownOutlined />
                        </Space>
                      </a>
                    </Dropdown>
                  </div>
                </Header>
                <Content
                  id="element"
                  className="site-layout-background"
                  style={{
                    padding: 24,
                    minHeight: '92vh',
                    maxHeight: "calc(90vh - 10px)",
                    overflowY: "scroll",
                    background: theme === true ? "#141414" : "#fff",
                  }}
                >
                  <Routes>
                    {items.map((u: any) => (
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
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </ConfigProvider>
  )
};

export default App;
