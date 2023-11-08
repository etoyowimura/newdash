import { TTask, TTaskHistory } from "../../types/Tasks/TTasks";
import { TPagination } from "../../types/common/TPagination";
import instance from "../api";
import { message } from "antd";

export type TTasksGetParams = {
  company?: string;
  customer?: string;
  user?: string;
  status?: string;
  team?: string;
  page?: string;
};

export type TTasksPutParams = {
  company_id?: number;
  customer_id?: number;
  service_id?: number;
  assigned_to_id?: number;
  note?: string;
  status?: string;
  pti?: boolean;
};

export type TTasksPostParams = {
  company_id?: number;
  customer_id?: number;
  service_id?: number;
  provider_id?: number;
  assigned_to_id?: number;
  in_charge_id?: number;
  note?: string;
  status?: string;
  is_active?: boolean;
  pti?: boolean;
  attachment_ids?: number[];
};

export const taskController = {
  async read(filterObject: TTasksGetParams) {
    const params = { ...filterObject };

    if (!!filterObject.page && filterObject.page !== "0")
      params.page = filterObject.page;
    if (!!filterObject.company) params.company = filterObject.company;
    if (!!filterObject.customer) params.customer = filterObject.customer;
    if (!!filterObject.user) params.user = filterObject.user;
    if (Array.isArray(filterObject.status)) {
      params.status = filterObject.status.join(",");
    }
    if (Array.isArray(filterObject.team)) {
      params.team = filterObject.team.join(", ");
    }

    const { data } = await instance.get<TPagination<TTask[]>>(`tasks/`, {
      params,
    });
    return data;
  },

  async getHistory(id: number) {
    const { data } = await instance.get<TTaskHistory[]>(`task-history/${id}/`);
    return data;
  },

  async taskOne(Id: number) {
    const { data } = await instance.get<TTask>(`task/${Id}/`);
    return data;
  },

  async taskPatch(obj: TTasksPutParams, task_id: number) {
    const { data } = await instance
      .put<TTask>(`task/${task_id}/`, obj)
      .then((u) => {
        return u;
      });
    return data;
  },

  async addTaskController(obj: TTasksPostParams) {
    const { data } = await instance.post<TTask>("task/", obj).then((u) => {
      return u;
    });
    return data;
  },

  async addTaskFile(formData: any) {
    const { data } = await instance.post("attachment/", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Установите правильный Content-Type
      },
    });
    return data;
  },
  async deleteTaskController(id: number) {
    let res;
    let error = "";
    try {
      const { data } = await instance.delete(`task/${id}/`).then((u) => {
        return u;
      });
      res = data;
    } catch (err) {
      error = "Oops something went wrong!";
    }
    return { data: res, error };
  },
  async deleteAttachmentController(id: number) {
    let res;
    let error = "";
    try {
      const { data } = await instance.delete(`attachment/${id}/`).then((u) => {
        return u;
      });
      res = data;
    } catch (err) {
      error = "Oops something went wrong!";
    }
    return { data: res, error };
  },
};
