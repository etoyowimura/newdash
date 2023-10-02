import { useQuery } from "react-query";
import { userController } from "../../API/LayoutApi/users";

export const useUserData = (id: string): any => {
  return useQuery(
    [`users/${id}`, id],
    () => userController.read(id),
    { refetchOnWindowFocus: false }
  );
};

export const useUserOne = (
  userId: number | string | undefined
): any => {
  return useQuery(
    [`user/${userId || "all"}`, userId],
    () => userController.userOne(userId),
    { refetchOnWindowFocus: false }
  );
};

export const useFindUser = async (query: any) => {
  return await userController.userFinderId(query);
};
