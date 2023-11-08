import { TRole } from "../../types/Role/TRole";
import instance from "../api";


export const roleController = {
  async read() {
    const { data } = await instance.get<TRole[]>(`users/roles/`);
    return data;
  },

  async roleOne(id: string) {
    const { data }: { data: any } = await instance.get<TRole>(
      `users/role/${id}/`
    );
    return data;
  },
};
