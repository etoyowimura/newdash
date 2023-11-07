import { useQuery } from "react-query";
import { TUsersGetParams, userController } from "../../API/LayoutApi/users";

export const useUserData = ({name, team}: TUsersGetParams) => {
  return useQuery(
    [`users/admins`, {name, team}],
    () => userController.read({name, team}),
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