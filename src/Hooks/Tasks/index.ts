import { useQuery } from "react-query";
import { TTasksGetParams, taskController } from "../../API/LayoutApi/tasks";


export const useTasks = ({company, customer, user, status, team, page}:TTasksGetParams) => {
  return useQuery({
    queryKey: ["tasks", company, customer, user, status, team, page],
    queryFn: () =>
      taskController.read({
        company,
        customer,
        user,
        status,
        team,
        page,
      }),
  });
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