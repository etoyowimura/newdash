import { TUpdate } from "../../types/Update/TUpdate";
import instance from "../api";
import { message } from "antd";

export type TUpdatePutParams = {
  company_id?: number;
  customer_id?: number;
  status?: string;
  note?: string;
  is_pinned?: boolean;
};

export type TUpdatePostParams = {
  company_id?: number;
  customer_id?: number;
  provider_id?: number;
  executor_id?: number;
  status?: string;
  note?: string;
  solution?: string;
  is_active?: boolean;
  is_pinned?: boolean;
  attachment_ids?: number[];
};

export const updateController = {
  async read(status: string) {
    const { data } = await instance.get<TUpdate[]>(
      `shift-updates/?status=${status}`
    );
    return data;
  },

  async updateOne(Id: string | number | undefined) {
    const { data }: { data: any } = await instance(`shift-update/${Id}`);
    return data;
  },
  async addTaskFile(formData: FormData) {
    const { data } = await instance.post("attachment/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  },

  async updatePut(updateData: TUpdate, update_id: string) {
    const { data } = await instance(`shift-update/${update_id}/`, {
      method: "PUT",
      data: updateData,
    }).then((u) => {
      return u;
    });
    return data;
  },
  async updatePatch(obj: TUpdatePutParams, id: string | number) {
    const { data } = await instance(`shift-update/${id}/`, {
      method: "PUT",
      data: obj,
    }).then((u) => {
      return u;
    });
    return data;
  },

  async addUpdateController(obj: TUpdatePostParams) {
    message.loading({ content: "Loading..." });
    const { data } = await instance
      .post<TUpdate>("shift-update/", obj)
      .then((u) => {
        setTimeout(() => {
          message.success({ content: "Loaded!", duration: 2 });
        }, 1000);
        return u;
      });
    return data;
  },

  async deleteUpdateController(id: string) {
    let res;
    let error = "";
    try {
      const { data } = await instance.delete(`shift-update/${id}`).then((u) => {
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
