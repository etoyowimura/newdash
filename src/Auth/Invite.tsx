import { useLocation } from "react-router-dom";
import { inviteVerify } from "../API/auth/activate";
import { message } from "antd";

const Invite = () => {
  const location = useLocation();
  const queryParameters = new URLSearchParams(location.search);
  const userId = queryParameters.get("user_id");
  const confirmationToken = queryParameters.get("confirmation_token");
  const business_id = queryParameters.get("business_id");
  const role_id = queryParameters.get("role_id");
  if (userId && confirmationToken) {
    inviteVerify({
      user_id: userId,
      confirmation_token: confirmationToken,
      role_id: role_id,
      business_id: business_id,
    }).then((status) => {
      if (status === 200) {
        document.location.replace("/#/tasks/");
      }
    });
  } else {
    message.warning({ content: "Your Activision is expired" });
  }

  return <div>hello</div>;
};

export default Invite;
