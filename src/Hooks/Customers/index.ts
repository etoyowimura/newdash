import { useQuery } from "react-query";
import { customerController } from "../../API/LayoutApi/customers";

export const useCustomerData = (id: string): any => {
  return useQuery(
    [`custoemrs/${id}`, id],
    () => customerController.read({name:  id}),
    { refetchOnWindowFocus: false }
  );
};

export const useCustomerOne = (Id: string): any => {
  return useQuery(
    [`customer/${Id || "all"}`, Id],
    () => customerController.customerOne(Id),
    { refetchOnWindowFocus: false }
  );
};