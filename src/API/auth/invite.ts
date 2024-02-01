import instance from "../api";
import { message } from "antd";

export interface inviteType {
  role_id: number;
  email: string;
}

export const inviteVerify = async (value: inviteType) => {
  try {
    const {data} = await instance("users/invite/", {
      method: "POST",
      data: value,
      headers: { "Content-Type": "application/json" },
    });
    const succesMessage = data?.message;
    setTimeout(() => {
        message.success({ content: succesMessage, duration: 2 });
      }, 1000);
  } catch (error) {
    setTimeout(() => {
      message.error({ content: "Something went wrong", duration: 2 });
    }, 1000);
  }
};
