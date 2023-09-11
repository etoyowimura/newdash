import instance from "../api";
import {message} from "antd";

interface loginInterface {
    userName: string;
    password: string | number;
}

export const LoginApi = async ({ userName, password }: loginInterface) => {
    try {
        const { data  } = await instance("admin/signin", {
            method: "POST",
            data: { email: userName, password },
            headers: { "Content-Type": "application/json" },
        });
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", data.user);
        localStorage.setItem("expires", data.ttl);
        document.location.replace("/");
    } catch (err) {
        setTimeout(() => {
            message.error({ content: 'Something went wrong! ',  duration: 2 });
        }, 1000);
        throw new Error("Something went wrong");
    }
};





