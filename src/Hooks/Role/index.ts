import { useQuery } from "react-query";
import { roleController } from "../../API/LayoutApi/role";

export const useRoleData = () => {
  return useQuery(
    [`users/roles/`],
    () => roleController.read(),
    { refetchOnWindowFocus: false }
  );
};

export const useRoleOne = (id: string) => {
  return useQuery(
    [`users/role/${id}`, id],
    () => roleController.roleOne(id),
    { refetchOnWindowFocus: false }
  );
};

