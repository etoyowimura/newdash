import { TService } from "../../types/Service/TService";
import instance from "../api";
import { message } from "antd";

export type TServicePutParams = {
  title?: string;
  points?: number;
};
export type TServicePostParams = {
  title?: string;
  points?: number;
};

export const serviceController = {
  async read() {
    const { data } = await instance.get<TService[]>(`services/`);
    return data;
  },

  async serviceOne(Id: number | undefined ) {
    if(Id){
      const { data } = await instance.get<TService>(`service/${Id}/`);
      return data;
    }
  },

  async servicePatch(obj: TServicePutParams, id: string) {
    const { data } = await instance
      .put<TService>(`service/${id}/`, obj)
      .then((u) => {
        setTimeout(() => {
          message.success({ content: "Loaded!", duration: 2 });
        }, 1000);
        return u;
      });
    return data;
  },

  async addServiceController(obj: TServicePostParams) {
    const { data } = await instance.post<TService>("service/", obj).then((u) => {
      setTimeout(() => {
        message.success({ content: "Loaded!", duration: 2 });
      }, 1000);
      return u;
    });
    return data;
  },

  async deleteServiceController(id: string) {
    let res;
    let error = "";
    try {
      const { data } = await instance.delete(`service/${id}/`).then((u) => {
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
