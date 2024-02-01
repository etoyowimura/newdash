import instance from "../api";
import { message } from "antd";

export interface registerInterface {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  password_confirm: string;
}

export const RegisterApi = async (value: registerInterface) => {
  try {
    const { status, data } = await instance("users/register/", {
      method: "POST",
      data: value,
      headers: { "Content-Type": "application/json" },
    });
    const userObject = {
      first_name: data?.data.first_name,
      last_name: data?.data.last_name,
      username: data?.data.username,
      id: data?.data.id,
      timezone: data?.data.timezone, 
      role: data?.data.role,
    };

    const userJSON = JSON.stringify(userObject);
    localStorage.setItem("user", userJSON);
    localStorage.setItem("access_token", data?.data.access_token);
    localStorage.setItem("refresh_token", data?.data.refresh_token);
    document.location.replace("/");
    return status;
  } catch (error:any) {
    console.log(error);
    setTimeout(() => {
      message.error({ content: ' ', duration: 2 });
    }, 1000);
  } 
};

export const validateUsername = async (value: any) => {
  const {status} = await instance.get(`users/check/${value}/`);
  return status
};
