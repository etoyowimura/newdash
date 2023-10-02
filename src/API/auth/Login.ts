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
        localStorage.setItem("token", data.token);
        localStorage.setItem("isSuperUser", data.is_superuser);
        localStorage.setItem("user", data.user);
        localStorage.setItem("expires", data.ttl);
        localStorage.setItem("admin_id", data.id);
        document.location.replace("/");
    } catch (err) {
        setTimeout(() => {
            message.error({ content: 'Something went wrong! ',  duration: 2 });
        }, 1000);
        throw new Error("Something went wrong");
    }
};





