import instance from "../api";
import { message } from "antd";

export interface resetType {
  login: string;
}
export interface resetPassType {
  user_id: string;
  confirmation_token: string;
  new_password: string;
  password_confirm: string;
}

export const resetPass = async (value: resetType) => {
  try {
    const { data } = await instance("users/send-reset-password-link/", {
      method: "POST",
      data: value,
      headers: { "Content-Type": "application/json" },
    });
    return data;
  } catch (error) {
    setTimeout(() => {
      message.error({ content: "Something went wrong", duration: 2 });
    }, 1000);
  }
};
export const resetPassEmail = async (value: resetPassType) => {
  try {
    const { data } = await instance("users/reset-password/", {
      method: "POST",
      data: value,
      headers: { "Content-Type": "application/json" },
    });
    const succesMessage = data?.message;
    message.success({ content: succesMessage, duration: 2 });
    setTimeout(() => {
      document.location.replace('/auth/login')
    }, 2000);
  } catch (error) {
    setTimeout(() => {
      message.error({ content: "Something went wrong", duration: 2 });
    }, 1000);
  }
};
