import instance from "../api";
import { message } from "antd";

export const teamController = {
  async read(id:string) {
    const { data }: { data: object } = await instance(
      `teams/`
    );
    const getCount = async () => {
      return 0;
    };
    const count = await getCount();

    return { data, count: count };
  },

  async teamOne(Id: string | number | undefined) {
    const { data }: { data: any } = await instance(`team/${Id}`);
    return data;
  },

  async teamPatch(teamData: any, team_id: string) {
    const key = "updatable";
    message.loading({ content: "Loading...", key });
    const { data }: { data: any } = await instance(`team/${team_id}/`, {
      method: "PUT",
      data: teamData,
    }).then((u) => {
      setTimeout(() => {
        message.success({ content: "Loaded!", key, duration: 2 });
      }, 1000);
      return u;
    });
    return data;
  },

  async addTeamController(teamId: any) {
    message.loading({ content: "Loading...", key: teamId });
    const { data } = await instance("team/", {
      method: "POST",
      data: {
        ...teamId,
      },
    }).then((u) => {
      setTimeout(() => {
        message.success({ content: "Loaded!", key: teamId, duration: 2 });
      }, 1000);
      return u;
    });
    return data;
  },

  async deleteTeamController(team_id: string) {
    message.loading({ content: "Loading...", key: team_id });
    let res;
    let error = "";
    try {
      const { data } = await instance(`team/${team_id}`, {
        method: "DELETE",
      }).then((u) => {
        setTimeout(() => {
          message.success({ content: "Deleted!", key: team_id, duration: 2 });
        }, 1000);
        return u;
      });
      res = data;
    } catch (err) {
      error = "Oops something went wrong!";
    }
    return { data: res, error };
  },
  async teamFinderId(team_id: string) {
    const { data }: { data: Array<any> } = await instance(
      `team/${team_id}`
    );
    return data;
  },

};
