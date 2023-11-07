import { TUpdate } from "../../types/Update/TUpdate";
import instance from "../api";
import { message } from "antd";


export const updateController = {
  async read(status: string) {
    const { data } = await instance.get<TUpdate[]>(
      `shift-updates/?status=${status}`, 
    );
    return data;
  },

  async updateOne(Id: string | number | undefined) {
    const { data }: { data: any } = await instance(`shift-update/${Id}`);
    return data;
  },
  async addTaskFile(formData: any) {
    const { data } = await instance.post("attachment/", formData, {
      headers: {
        'Content-Type': 'multipart/form-data', 
      },
    });
    return data;
  },

  

  async updatePut(updateData: TUpdate, update_id: string) {
    const key = "updatable";
    message.loading({ content: "Loading...", key });
    const { data }: { data: any } = await instance(`shift-update/${update_id}/`, {
      method: "PUT",
      data: updateData,
    }).then((u) => {
      setTimeout(() => {
        message.success({ content: "Loaded!", key, duration: 2 });
      }, 1000);
      return u;
    });
    return data;
  },
  async updatePatch(updateData: any, update_id: string | number) {
    const key = "updatable";
    message.loading({ content: "Loading...", key });
    const { data }: { data: any } = await instance(`shift-update/${update_id}/`, {
      method: "PUT",
      data: updateData,
    }).then((u) => {
      setTimeout(() => {
        message.success({ content: "Loaded!", key, duration: 2 });
      }, 1000);
      return u;
    });
    return data;
  },

  async addUpdateController(updateId: any) {
    message.loading({ content: "Loading...", key: updateId });
    const { data } = await instance("shift-update/", {
      method: "POST",
      data: {
        ...updateId,
      },
    }).then((u) => {
      setTimeout(() => {
        message.success({ content: "Loaded!", key: updateId, duration: 2 });
      }, 1000);
      return u;
    });
    return data;
  },

  async deleteUpdateController(update_id: string) {
    message.loading({ content: "Loading...", key: update_id });
    let res;
    let error = "";
    try {
      const { data } = await instance(`shift-update/${update_id}`, {
        method: "DELETE",
      }).then((u) => {
        setTimeout(() => {
          message.success({ content: "Deleted!", key: update_id, duration: 2 });
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
