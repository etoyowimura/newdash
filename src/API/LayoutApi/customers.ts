import { TCustomer } from "../../types/Customer/TCustomer";
import instance from "../api";
import { message } from "antd";

export type TCustomerGetParams = {
  name?: string,
  is_active?: boolean;
}
export type TCustomerByCompanyGetParams = {
  name?: string,
  id?: string;
}

export const customerController = {
  async read(filterObject: TCustomerGetParams) {
    const params = {...filterObject};

    if (!!filterObject.name) params.name = filterObject.name;
    if (!!filterObject.is_active) params.is_active = filterObject.is_active;

    const { data } = await instance.get<TCustomer[]>(
      `customers`, {params}
    );
    return data;
  },


  async customerOne(Id: string) {
    const { data }: { data: any } = await instance(`customer/${Id}/`);
    return data;
  },

  async customerByCompany(id: string, name: string) {
    const params = {name};
    if (!!name) params.name = name;

    const { data } = await instance.get<TCustomer[]>(
      `customers-by-company/${id}/`, {params}
    );
    return data
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
};
