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
        
        const userObject = {
            first_name: data?.data.first_name,
            last_name: data?.data.last_name,
            username: data?.data.username,
            admin_id: data?.data.id,
            isSuperUser: data?.data.id_superuser,
            role: data?.data.role,
            timezone: data?.data.timezone,
          };
          
        const userJSON = JSON.stringify(userObject);
        localStorage.setItem("user", userJSON);
        localStorage.setItem("token", data?.data.token);
        localStorage.setItem("isSuperUser", data?.data.is_superuser);
        localStorage.setItem("admin_id", data?.data.id);
        document.location.replace("/");
    } catch (err) {
        setTimeout(() => {
            message.error({ content: 'Username or password incorrect!',  duration: 2 });
        }, 1000);
        throw new Error("Something went wrong");
    }
};





