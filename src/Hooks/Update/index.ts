import { useQuery } from "react-query";
import { updateController } from "../../API/LayoutApi/update";

// export const useUpdateData = (status: string): any => {
//   return useQuery(
//     [`updates/${status}`, status],
//     () => updateController.read(status),
//     { refetchOnWindowFocus: false }
//   );
// };

export const useUpdateData = (status: string) => {
  return useQuery(
    [`shift-updates`, status],
    () => updateController.read(status),
    { refetchOnWindowFocus: false }
  );
};

export const useUpdateOne = (updateId: number | string | undefined): any => {
  return useQuery(
    [`update/${updateId || "all"}`, updateId],
    () => updateController.updateOne(updateId),
    { refetchOnWindowFocus: false }
  );
};
