import { Navigate, useLocation } from "react-router-dom";
import { registryVerify } from "../API/auth/activate";
import { message } from "antd";

const Activate = () => {
  const location = useLocation();
  const queryParameters = new URLSearchParams(location.search);
  const userId = queryParameters.get("user_id");
  const confirmationToken = queryParameters.get("confirmation_token");

  if (userId && confirmationToken) {
    registryVerify({
      user_id: userId,
      confirmation_token: confirmationToken,
    })
  }

  return <div></div>;
};

export default Activate;
