import instance from "../api";
import { message } from "antd";

export const customerController = {
  async read(id:string) {
    const { data }: { data: object } = await instance(
      `customers/`
    );
    const getCount = async () => {
      return 0;
    };
    const count = await getCount();

    return { data, count: count };
  },

  async customerOne(Id: string | number | undefined) {
    const { data }: { data: any } = await instance(`customer/${Id}/`);
    return data;
  },

  async customerPatch(customerData: any, id: string) {
    const key = "updatable";
    message.loading({ content: "Loading...", key });
    const { data }: { data: any } = await instance(`customer/${id}/`, {
      method: "PUT",
      data: customerData,
    }).then((u) => {
      setTimeout(() => {
        message.success({ content: "Loaded!", key, duration: 2 });
      }, 1000);
      return u;
    });
    return data;
  },

  async addCustomerController(customer: any) {
    message.loading({ content: "Loading...", key: customer });
    const { data } = await instance("customer/", {
      method: "POST",
      data: {
        ...customer,
      },
    }).then((u) => {
      setTimeout(() => {
        message.success({ content: "Loaded!", key: customer, duration: 2 });
      }, 1000);
      return u;
    });
    return data;
  },

  async deleteCustomerController(id: string) {
    message.loading({ content: "Loading...", key: id });
    let res;
    let error = "";
    try {
      const { data } = await instance(`customer/${id}/`, {
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
  async customerFinderId(id: string) {
    const { data }: { data: Array<any> } = await instance(
      `customer/${id}/`
    );
    return data;
  },

};