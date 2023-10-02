import { useQuery } from "react-query";
import { taskController } from "../../API/LayoutApi/tasks";

export const useTaskData = (id: string): object => {
  return useQuery(
    [`tasks/${id}`, id],
    () => taskController.read(id),
    { refetchOnWindowFocus: false }
  );
};

export const useTaskOne = (
  taskId: number | string | undefined
): any => {
  return useQuery(
    [`task/${taskId || "all"}`, taskId],
    () => taskController.taskOne(taskId),
    { refetchOnWindowFocus: false }
  );
};

// export const useFindTaskCompany = async (query: any) => {
//   return await taskController.taskFinderByCompany(query);
// };

export const useFindTaskCustomer = async (query: any) => {
  return await taskController.taskFinderByCustomer(query);
};