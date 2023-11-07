import { TService } from "../../types/Service/TService";
import instance from "../api";
import { message } from "antd";

export const serviceController = {
  // async read(id:string) {
  //   const { data }: { data: object } = await instance(
  //     `services/`
  //   );
  //   const getCount = async () => {
  //     return 0;
  //   };
  //   const count = await getCount();

  //   return { data, count: count };
  // },
  async read() {
    const { data } = await instance.get<TService[]>(`services/`);
    return data;
  },

  async serviceOne(Id: string | number | undefined) {
    const { data }: { data: any } = await instance(`service/${Id}/`);
    return data;
  },

  async servicePatch(serviceData: any, service_id: string) {
    const key = "updatable";
    message.loading({ content: "Loading...", key });
    const { data }: { data: any } = await instance(`service/${service_id}/`, {
      method: "PUT",
      data: serviceData,
    }).then((u) => {
      setTimeout(() => {
        message.success({ content: "Loaded!", key, duration: 2 });
      }, 1000);
      return u;
    });
    return data;
  },

  async addServiceController(serviceId: any) {
    message.loading({ content: "Loading...", key: serviceId });
    const { data } = await instance("service/", {
      method: "POST",
      data: {
        ...serviceId,
      },
    }).then((u) => {
      setTimeout(() => {
        message.success({ content: "Loaded!", key: serviceId, duration: 2 });
      }, 1000);
      return u;
    });
    return data;
  },

  async deleteServiceController(service_id: string) {
    message.loading({ content: "Loading...", key: service_id });
    let res;
    let error = "";
    try {
      const { data } = await instance(`service/${service_id}/`, {
        method: "DELETE",
      }).then((u) => {
        setTimeout(() => {
          message.success({ content: "Deleted!", key: service_id, duration: 2 });
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
