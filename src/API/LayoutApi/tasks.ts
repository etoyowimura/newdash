import { TTask } from "../../types/Tasks/TTasks";
import { TPagination } from "../../types/common/TPagination";
import instance from "../api";
import { message } from "antd";


export type TTasksGetParams = {
  company?: string,
  customer?: string;
  user?: string;
  status?: string;
  team?: string;
  page?: string;
}

export const taskController = {
  async read(filterObject: TTasksGetParams) {
    const params = {...filterObject};

    if (!!filterObject.page && filterObject.page !== '0') params.page = filterObject.page;
    if (!!filterObject.company) params.company = filterObject.company;
    if (!!filterObject.customer) params.customer = filterObject.customer;
    if (!!filterObject.user) params.user = filterObject.user;
    if (!!filterObject.status) params.status = filterObject.status;
    if (!!filterObject.team) params.team = filterObject.team;
    
    
    const { data } = await instance.get<TPagination<TTask[]>>(
      `tasks`, {params}
    );
    return data;
  },

  async getHistory(task_id:number) {
    const { data }: { data: object } = await instance(`task-history/${task_id}/`);
    return data
  },


  async taskOne(Id: string | number | undefined) {
    const { data }: { data: any } = await instance(`task/${Id}/`);
    return data;
  },

  async taskPatch(taskData: any, task_id: number) {
    const key = "updatable";
    message.loading({ content: "Loading...", key });
    const { data }: { data: any } = await instance(`task/${task_id}/`, {
      method: "PUT",
      data: taskData,
    }).then((u) => {
      setTimeout(() => {
        message.success({ content: "Saved!", key, duration: 2 });
      }, 500);
      return u;
    });
    return data;
  },

  async addTaskController(taskId: any) {
    message.loading({ content: "Loading...", key: taskId });
    const { data } = await instance("task/", {
      method: "POST",
      data: {
        ...taskId,
      },
    }).then((u) => {
      setTimeout(() => {
        message.success({ content: "Loaded!", key: taskId, duration: 2 });
      }, 1000);
      return u;
    });
    return data;
  },
  
  async addTaskFile(formData: any) {
    const { data } = await instance.post("attachment/", formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Установите правильный Content-Type
      },
    });
    return data;
  },
  async deleteTaskController(task_id: string) {
    message.loading({ content: "Loading...", key: task_id });
    let res;
    let error = "";
    try {
      const { data } = await instance(`task/${task_id}/`, {
        method: "DELETE",
      }).then((u) => {
        setTimeout(() => {
          message.success({ content: "Deleted!", key: task_id, duration: 2 });
        }, 1000);
        return u;
      });
      res = data;
    } catch (err) {
      error = "Oops something went wrong!";
    }
    return { data: res, error };
  },
  async deleteAttachmentController(id: number) {
    message.loading({ content: "Loading...", key: id });
    let res;
    let error = "";
    try {
      const { data } = await instance(`attachment/${id}/`, {
        method: "DELETE",
      }).then((u) => {
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
  }
};
