import { TTeam } from "../../types/Team/TTeam";
import instance from "../api";
import { message } from "antd";

export type TTeamPutParams = {
  name?: string;
  is_active?: boolean
}

export type TTeamPostParams = {
  name?: string;
  is_active?: boolean
}

export const teamController = {
  async read(name: string) {
    const { data } = await instance.get<TTeam[]>(
      `teams/?name=${name}`, 
    );
    return data;
  },

  async teamOne(Id: string | number | undefined) {
    const { data } = await instance.get<TTeam>(`team/${Id}`);
    return data;
  },

  async teamPatch(obj: TTeamPutParams, id: string) {
    const { data } = await instance.put<TTeam>(`team/${id}/`, obj).then((u) => {
      setTimeout(() => {
        message.success({ content: "Loaded!", duration: 2 });
      }, 1000);
      return u;
    });
    return data;
  },

  async addTeamController(obj: TTeamPostParams) {
    const { data } = await instance.post<TTeam>("team/", obj).then((u) => {
      setTimeout(() => {
        message.success({ content: "Loaded!", duration: 2 });
      }, 1000);
      return u;
    });
    return data;
  },

  async deleteTeamController(id: string) {
    let res;
    let error = "";
    try {
      const { data } = await instance.delete(`team/${id}`).then((u) => {
        setTimeout(() => {
          message.success({ content: "Deleted!", duration: 2 });
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
