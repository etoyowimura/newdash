import { useQuery } from "react-query";
import { customerController } from "../../API/LayoutApi/customers";

export const useCustomerData = (id: string): object => {
  return useQuery(
    [`companies/${id}`, id],
    () => customerController.read(id),
    { refetchOnWindowFocus: false }
  );
};

export const useCustomerOne = (
  Id: number | string | undefined
): any => {
  return useQuery(
    [`admin/categoriesOne/${Id || "all"}`, Id],
    () => customerController.customerOne(Id),
    { refetchOnWindowFocus: false }
  );
};

export const useFindCustomer = async (query: any) => {
  return await customerController.customerFinderId(query);
};
