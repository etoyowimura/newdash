import { TCustomer } from "../../types/Customer/TCustomer";
import instance from "../api";
import { message } from "antd";

export type TCustomerGetParams = {
  name?: string;
  page?: string | number;
  is_active?: boolean;
};
export type TCustomerByCompanyGetParams = {
  name?: string;
  id?: string;
};
export type TCustomerPutParams = {
  name?: string;
  profession?: string;
  company_id?: number;
};
export type TCustomerPostParams = {
  name?:       string;
  profession?: string;
  company_id?: number;
  is_active?:  boolean;
};

export const customerController = {
  async read(filterObject: TCustomerGetParams) {
    const params = { ...filterObject };

    if (!!filterObject.name) params.name = filterObject.name;
    if (!!filterObject.is_active) params.is_active = filterObject.is_active;
    if (!!filterObject.page) params.page = filterObject.page;

    const { data } = await instance.get<TCustomer[]>(`customers/`, { params });
    return data;
  },

  async customerOne(Id: number | undefined) {
    if(Id){
      const { data } = await instance.get<TCustomer>(`customer/${Id}/`);
      return data;
    }
  },

  async customerByCompany(id: string | undefined, name: string | undefined) {
    const params = { name };
    if (!!name) params.name = name;
    if (id) {
      const { data } = await instance.get<TCustomer[]>(
        `customers-by-company/${id}/`,
        { params }
      );
      return data;
    }
  },

  async customerPatch(obj: TCustomerPutParams, id: string) {
    const { data }: { data: any } = await instance.put<TCustomer>(`customer/${id}/`, obj).then((u) => {
      setTimeout(() => {
        message.success({ content: "Loaded!", duration: 2 });
      }, 1000);
      return u;
    });
    return data;
  },

  async addCustomerController(obj: TCustomerPostParams) {
    message.loading({ content: "Loading..." });
    const { data } = await instance.post<TCustomer>("customer/", obj).then((u) => {
      setTimeout(() => {
        message.success({ content: "Loaded!", duration: 2 });
      }, 1000);
      return u;
    });
    return data;
  },

  async deleteCustomerController(id: string) {
    message.loading({ content: "Loading..." });
    let res;
    let error = "";
    try {
      const { data } = await instance.delete(`customer/${id}/`).then((u) => {
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
