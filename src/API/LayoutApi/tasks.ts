import instance from "../api";
import { message } from "antd";

export const taskController = {
  async read(id:string) {
    const { data }: { data: object } = await instance(
      `tasks/?customer=${id}`
    );
    const getCount = async () => {
      return 0;
    };
    const count = await getCount();

    return { data, count: count };
  },

  async getHistory(task_id:number) {
    const { data }: { data: object } = await instance(`task-history/${task_id}`);
    return data
  },


  async taskOne(Id: string | number | undefined) {
    const { data }: { data: any } = await instance(`task/${Id}`);
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
        message.success({ content: "Loaded!", key, duration: 2 });
      }, 1000);
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
      const { data } = await instance(`task/${task_id}`, {
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
      const { data } = await instance(`attachment/${id}`, {
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
  },
  // async taskFinderByCompany(task_id: string) {
  //   const { data }: { data: Array<any> } = await instance(
  //     `tasks/?company=${task_id}`
  //   );
  //   return data;
  // },
  async taskFinderByCustomer(task_id: string) {
    const { data }: { data: Array<any> } = await instance(
      `tasks/?customer=${task_id}`
    );
    return data;
  },

};
