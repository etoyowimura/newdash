import React, { ComponentType, FC } from "react";
import { Navigate } from "react-router-dom";

const WithAuthentication =
  <P extends any>(Component: ComponentType<P>): FC<P> =>
  (props: any) => {
    const isAuthenticated = localStorage.getItem("token") as string;
    if (isAuthenticated) {
      return <Component {...props} />;
    }
    return (
      <Navigate
        to={{
          pathname: "/login",
        }}
      />
    );
  };

export default WithAuthentication;
