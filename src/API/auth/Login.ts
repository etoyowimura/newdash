import instance from "../api";
import { message } from "antd";

interface loginInterface {
  login: string;
  password: string | number;
}

export const LoginApi = async ({ login, password }: loginInterface) => {
  try {
    const { data } = await instance("auth/login/", {
      method: "POST",
      data: { login, password },
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
  } catch (error: any) {
    const status = error.response.status;
    const message426 = "You haven't activated your email yet.";

    if (status === 426) {
      message.error({ content: message426 });
    } else {
      setTimeout(() => {
        message.error({ content: "Login or password incorrect!", duration: 2 });
      }, 1000);
      throw new Error("Something went wrong");
    }
  }
};

export const RefreshApi = async (refreshToken: string | null) => {
  try {
    const { data } = await instance("token/refresh/", {
      method: "POST",
      data: { refresh: refreshToken },
      headers: { "Content-Type": "application/json" },
    });
    console.log();
    localStorage.removeItem("access_token");
    localStorage.setItem("access_token", data?.access);
  } catch (err) {
    setTimeout(() => {
      throw new Error("Something went wrong");
    }, 1000);
  }
};
