import { TUser } from "../../types/User/TUser";
import instance from "../api";
import { message } from "antd";

export type TUsersGetParams = {
  name?: string,
  team?: string;
}

export type TUsersPutParams = {
  first_name?: string;
  last_name?:  string;
  username?:   string;
  team_id?:    number;
}

export type TUsersPostParams = {
  username?: string;
  password?: string;
  team_id?:  number;
  groups?:   number[];
}

export const userController = {
  async read(filterObject: TUsersGetParams) {
    const params = {...filterObject};

    if (!!filterObject.name) params.name = filterObject.name;
    if (!!filterObject.team) params.team = filterObject.team;

    const { data } = await instance.get<TUser[]>(
      `users/admins/`, {params}
    );
    return data;
  },

  async userOne(Id: string | number | undefined) {
    const { data }: { data: any } = await instance(`users/admin/${Id}/`);
    return data;
  },

  async userPatch(obj: TUsersPutParams, id: string) {
    const { data } = await instance.put<TUser>(`users/admin/${id}/`, obj).then((u) => {
      setTimeout(() => {
        message.success({ content: "Loaded!", duration: 2 });
      }, 1000);
      return u;
    });
    return data;
  },

  async addUserController(obj:TUsersPostParams) {
    message.loading({ content: "Loading..." });
    let responseData = null;
    try {
      const response = await instance.post<TUser>("users/admin/", obj);
      responseData = response;
      message.success({ content: "Loaded!",  duration: 2 });
    } catch (err: any) {
      responseData = err?.response?.data
    }
    return { data: responseData };
  },


  async deleteUserController(id: string) {
    let res;
    let error = "";
    try {
      const { data } = await instance.delete(`users/admin/${id}/`).then((u) => {
        setTimeout(() => {
          message.success({ content: "Deleted!", key: id, duration: 2 });
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
