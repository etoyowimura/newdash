import React, { useState } from "react";
import "./App.css";
import { Layout, Menu, ConfigProvider, Button } from "antd";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { clear_local_storage } from "./Utils/data";
import { allMenu, items } from "./Utils/sidebar";
import Login from "./Auth/Login";
import Notfound from "./Utils/Notfound";

const { Header, Sider, Content } = Layout;

const App: React.FC = () => {
  // const isAuthenticated = localStorage.getItem("token") as string;
  // const [authorized, setAuthorized] = useState<string | null>(isAuthenticated);
  const [collapsed, setCollapsed] = useState<boolean>(false);
  let location: any = useLocation();
  // const [theme, setTheme] = useState<any>(
  //   localStorage.getItem("theme") || "dark"
  // );
  // const changeTheme = (value: boolean) => {
  //   setTheme(value ? "dark" : "light");
  //   localStorage.setItem("theme", value ? "dark" : "light");
  // };

  return (
    <ConfigProvider>
      <div>
        {/* {!authorized && location.pathname !== "/login" && (
          <Navigate
            to={{
              pathname: "/login",
            }}
          />
        )}
        {authorized && location.pathname === "/login" && ( */}
          {/* <Navigate
            to={{
              pathname: "/",
            }}
          /> */}
        {/* )} */}
        {/* {authorized ? ( */}
          <Layout>
            <Sider
              theme="light"
              collapsible
              collapsed={collapsed}
              onCollapse={(value) => setCollapsed(value)}
              style={{ height: "100vh", overflow: "scroll" }}
            >
              <div className="logo">TT ELD</div> 
              <Menu
                theme="light"
                mode="inline"
                items={allMenu}
                defaultSelectedKeys={[location.pathname]}
              ></Menu>
            </Sider>
            <Layout className="site-layout">
              <Header className="site-layout-background" style={{ padding: 0 }}>
                <div style={{ float: "right", marginRight: "35px" }}>
                  <Button
                    style={{ marginRight: "35px" }}
                    size="large"
                    type="primary"
                    danger
                    onClick={clear_local_storage}
                  >
                    Logout
                  </Button>
                </div>
              </Header>
              <Content
                className="site-layout-background"
                style={{
                  margin: "16px 16px",
                  padding: 24,
                  minHeight: 280,
                  maxHeight: "calc(90vh - 10px)",
                  overflow: "scroll",
                }}
              >
                <Routes>
                  {items.map((u: any, index: any) => (
                    <Route key={u.key} path={u.path} element={u.component} />
                  ))}
                  <Route path="*" element={<Notfound />} />
                </Routes>
              </Content>
            </Layout>
          </Layout>
        ) : (
          <></>
        {/* )} */}
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </ConfigProvider>
  );
};

export default App;
