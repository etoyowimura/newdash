import { TCompany } from "../../types/Company/TCompany";
import instance from "../api";
import { message } from "antd";

export type TCompanyGetParams = {
  name?: string;
  page?: string | number;
  is_active?: boolean;
};
export type TCompanyPutParams = {
  name?: string;
  owner?: string;
  is_active?: boolean;
};
export type TCompanyPostParams = {
  name?: string;
  team_id?: number;
  owner?: string;
  is_active?: boolean;
  usdot?: string;
  api_key?: string;
};

export const companyController = {
  async read(filterObject: TCompanyGetParams) {
    const params = { ...filterObject };

    if (!!filterObject.name) params.name = filterObject.name;
    if (!!filterObject.is_active) params.is_active = filterObject.is_active;
    if (!!filterObject.page) params.page = filterObject.page;

    const { data } = await instance.get<TCompany[]>(`companies/`, { params });

    return data;
  },

  async companyOne(Id: number | undefined) {
    if(Id){
      const { data } = await instance.get<TCompany>(`company/${Id}/`);
      return data;
    }
  },

  async companyPatch(obj: TCompanyPutParams, id: string) {
    const { data }: { data: any } = await instance.put<TCompany>(`company/${id}/`, obj).then((u) => {
      return u;
    });
    return data;
  },

  async addCompanyController(obj: TCompanyPostParams) {
    const { data } = await instance.post<TCompany>("company/", obj).then((u) => {
      return u;
    });
    return data;
  },

  async SyncCompany(id: number) {
    let res;
    let error = "";
    try {
      const { data } = await instance.post(`company-sync/${id}/`).then((u) => {
        return u;
      });
      res = data;
    } catch (err: any) {
    }
    return { data: res, error };
  },

  async deleteCompanyController(id: string) {
    message.loading({ content: "Loading..." });
    let res;
    let error;
    try {
      const { data } = await instance.delete(`company/${id}/`).then((u) => {
        setTimeout(() => {
          message.success({
            content: "Deleted!",
            key: id,
            duration: 2,
          });
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
