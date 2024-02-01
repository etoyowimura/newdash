import { useQuery } from "react-query";
import { TUsersGetParams, userController } from "../../API/LayoutApi/users";

export const useUserData = ({name, team, role}: TUsersGetParams) => {
  return useQuery(
    [`users/admins/`, {name, team, role}],
    () => userController.read({name, team, role}),
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

export const useCheckUser = (
  username: string 
): any => {
  return useQuery(
    [`user/${username}/`],
    () => userController.CheckUsername(username),
    { refetchOnWindowFocus: false }
  );
};