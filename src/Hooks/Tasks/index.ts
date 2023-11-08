import { useQuery } from "react-query";
import { TTasksGetParams, taskController } from "../../API/LayoutApi/tasks";

export const useTasks = ({
  company,
  customer,
  user,
  status,
  team,
  page,
}: TTasksGetParams) => {
  return useQuery(
    [`tasks/`, company, customer, user, status, team, page],
    () => taskController.read({ company, customer, user, status, team, page }),
    { refetchOnWindowFocus: false }
  );
};

export const useTaskOne = (taskId: number) => {
  return useQuery(
    [`task/${taskId}/`, taskId],
    () => taskController.taskOne(taskId),
    { refetchOnWindowFocus: false }
  );
};

export const useTaskHistory = (Id: number) => {
  return useQuery(
    [`customer/${Id}/`, Id],
    () => taskController.getHistory(Id),
    { refetchOnWindowFocus: false }
  );
};