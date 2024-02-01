import { message } from "antd";
import {
  TMyTaskHistory,
  TMystats,
  TProfile,
} from "../../types/Profile/TProfile";
import instance from "../api";

export type TProfilePutParams = {
  first_name?: string;
  last_name?: string;
  username?: string;
};
export type TMyTaskHistoryGetParams = {
  start_date?: string;
  end_date?: string;
};
export type TChangePostParams = {
  old_password?: string;
  new_password?: string;
  password_confirm?: string;
};
export const prof = {
  async read(filterObject: TMyTaskHistoryGetParams) {
    const params = { ...filterObject };
    if (!!filterObject.start_date) params.start_date = filterObject.start_date;
    if (!!filterObject.end_date) params.end_date = filterObject.end_date;
    const { data } = await instance.get<TMystats>(`stats/my-stats/`, {
      params,
    });
    return data;
  },

  async self() {
    const { data } = await instance.get<TProfile>(`users/my-profile/`);
    return data;
  },

  async myTaskHistory(filterObject: TMyTaskHistoryGetParams) {
    const params = { ...filterObject };

    if (!!filterObject.start_date) params.start_date = filterObject.start_date;
    if (!!filterObject.end_date) params.end_date = filterObject.end_date;
    const { data } = await instance.get<TMyTaskHistory[]>(`my-task-history/`, {
      params,
    });
    return data;
  },

  async profPatch(filterObject: TProfilePutParams) {
    const params = { ...filterObject };

    params.first_name = filterObject.first_name || params.first_name;
    params.last_name = filterObject.last_name || params.last_name;
    params.username = filterObject.username || params.username;

    const { data } = await instance.put<TProfilePutParams>(
      "users/my-profile/",
      { ...params }
    );
    return data;
  },

  async changePass(obj: TChangePostParams) {
    try {
      const { data } = await instance.post<any>(
        "users/my-profile/change-password/",
        obj
      );
      message.success(data.message);
      return data;
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        const errorMessage =
          error?.response?.data?.old_password ||
          error?.response?.data?.new_password[0] ||
          "Bad Request";
        message.error(errorMessage);
      } else {
        message.error("An error occurred");
      }
      throw error;
    }
  },
};
