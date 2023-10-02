import React, { useState } from "react";
import "./App.css";
import { Layout, Menu, ConfigProvider, Button } from "antd";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { allMenu, items } from "./Utils/sidebar";
import Login from "./Auth/Login";
import Notfound from "./Utils/Notfound";
import { LogoutApi } from "./API/auth/Logout";


const { Header, Sider, Content } = Layout;

const App: React.FC = () => {
  const isAuthenticated = localStorage.getItem("token") as string;
  const [authorized, setAuthorized] = useState<string | null>(isAuthenticated);
  const [collapsed, setCollapsed] = useState<boolean>(false);
  let location: any = useLocation();
  const clickLogout = () => {
    LogoutApi();
  }

  return (
    <ConfigProvider>
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
              style={{ height: "100vh", overflow: "scroll", borderRight: '2px solid #000' }}
            >
              <div className={collapsed ? 'logo-collapsed':'logo'}>TT ELD</div>
              <Menu
                theme={"dark"}
                mode="inline"
                items={allMenu}
                defaultSelectedKeys={[location.pathname]}
              ></Menu>
            </Sider>
            <Layout className="site-layout">
              <Header className="site-layout-background" style={{ padding: 0, background: "#071e35", display: "flex", justifyContent: "end", alignItems: "center" }}>
                <div style={{ float: "right", marginRight: "35px" }}>
                  <Button
                    style={{ display: "flex", alignItems: "center", justifyContent: "end" }}
                    size="large"
                    type="primary"
                    danger
                    onClick={clickLogout}
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
        )}
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </ConfigProvider>
  );
};

export default App;
