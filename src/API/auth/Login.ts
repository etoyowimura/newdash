import instance from "../api";
import {message} from "antd";

interface loginInterface {
    username: string;
    password: string | number;
}

export const LoginApi = async ({ username, password }: loginInterface) => {
    try {
        const { data  } = await instance("auth/login/", {
            method: "POST",
            data: { username, password },
            headers: { "Content-Type": "application/json" },
        });
        localStorage.setItem("token", data?.data.token);
        sessionStorage.setItem("isSuperUser", data?.data.is_superuser);
        localStorage.setItem("user", data?.data.user);
        localStorage.setItem("admin_id", data?.data.id);
        document.location.replace("/");
    } catch (err) {
        setTimeout(() => {
            message.error({ content: 'Username or password incorrect!',  duration: 2 });
        }, 1000);
        throw new Error("Something went wrong");
    }
};





