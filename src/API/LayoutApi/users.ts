import instance from "../api";
import { message } from "antd";
export const userController = {
  async read(id:string) {
    const { data }: { data: object } = await instance(
      `users/admins/`
    );
    const getCount = async () => {
      return 0;
    };
    const count = await getCount();

    return { data, count: count };
  },

  async userOne(Id: string | number | undefined) {
    const { data }: { data: any } = await instance(`users/admin/${Id}/`);
    return data;
  },

  async userPatch(userData: any, user_id: string) {
    const key = "updatable";
    message.loading({ content: "Loading...", key });
    const { data }: { data: any } = await instance(`users/admin/${user_id}/`, {
      method: "PUT",
      data: userData,
    }).then((u) => {
      setTimeout(() => {
        message.success({ content: "Loaded!", key, duration: 2 });
      }, 1000);
      return u;
    });
    return data;
  },

  async addUserController(userId:any) {
    message.loading({ content: "Loading...", key: userId });
    let error = '';
    let responseData = null;
    try {
      const response = await instance.post("users/admin/", userId);
      responseData = response;
      message.success({ content: "Loaded!", key: userId, duration: 2 });
    } catch (err: any) {
      responseData = err?.response?.data
    }
    return { data: responseData };
  },


  async deleteUserController(user_id: string) {
    message.loading({ content: "Loading...", key: user_id });
    let res;
    let error = "";
    try {
      const { data } = await instance(`users/admin/${user_id}/`, {
        method: "DELETE",
      }).then((u) => {
        setTimeout(() => {
          message.success({ content: "Deleted!", key: user_id, duration: 2 });
        }, 1000);
        return u;
      });
      res = data;
    } catch (err) {
      error = "Oops something went wrong!";
    }
    return { data: res, error };
  },
};
