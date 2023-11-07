import { TCompany } from "../../types/Company/TCompany";
import instance from "../api";
import { message } from "antd";

export type TCompanyGetParams = {
  name?: string,
  is_active?: boolean;
}

export const companyController = {
  async read(filterObject: TCompanyGetParams) {
    const params = {...filterObject};

    if (!!filterObject.name) params.name = filterObject.name;
    if (!!filterObject.is_active) params.is_active = filterObject.is_active;

    const { data } = await instance.get<TCompany[]>(
      `companies`, {params}
    );
    const getCount = async () => {
      return 0;
    };
    const count = await getCount();

    return { data, count: count };
  },

  async companyOne(Id: string | number | undefined) {
    const { data }: { data: any } = await instance(`company/${Id}/`);
    return data;
  },

  async companyPatch(companyData: any, company_id: string) {
    const key = "updatable";
    message.loading({ content: "Loading...", key });
    const { data }: { data: any } = await instance(`company/${company_id}/`, {
      method: "PUT",
      data: companyData,
    }).then((u) => {
      setTimeout(() => {
        message.success({ content: "Loaded!", key, duration: 2 });
      }, 1000);
      return u;
    });
    return data;
  },

  async addCompanyController(companyId: any) {
    message.loading({ content: "Loading...", key: companyId });
    const { data } = await instance("company/", {
      method: "POST",
      data: {
        ...companyId,
      },
    }).then((u) => {
      setTimeout(() => {
        message.success({ content: "Loaded!", key: companyId, duration: 2 });
      }, 1000);
      return u;
    });
    return data;
  },

  async SyncCompany(companyId: any, api: any) {
    message.loading({ content: "Loading...", key: companyId });
    let res;
    let error = "";
    try {
      const { data } = await instance(`company-sync/${companyId}/`, {
        method: "POST",
        data: {
          ...companyId,
        },
      }).then((u) => {
        setTimeout(() => {
          message.success({content: u?.data.message, key: companyId, duration: 2});
        }, 1000);
        return u;
      });
      res = data;
    } catch (err:any) {
      error = "Oops something went wrong!";
      message.error({content: err.response.data.message, key: companyId, duration: 2});
    }
    return { data: res, error };
  },

  async deleteCompanyController(company_id: string) {
    message.loading({ content: "Loading...", key: company_id });
    let res;
    let error;
    try {
      const { data } = await instance(`company/${company_id}/`, {
        method: "DELETE",
      }).then((u) => {
        setTimeout(() => {
          message.success({ content: "Deleted!", key: company_id, duration: 2 });
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
