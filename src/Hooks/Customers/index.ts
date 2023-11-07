import { useQuery } from "react-query";
import { TCustomerGetParams, customerController } from "../../API/LayoutApi/customers";

export const useCustomerData = ({name, page, is_active} : TCustomerGetParams) => {
  return useQuery(
    // queryKey: ['customers/', name, page, is_active],
    // queryFn: () => customerController.read({
    //   name: name,
    //   page: page,
    //   is_active: is_active
    // })
    [`customers/`, name, page, is_active],
    () => customerController.read({name: name, page: page, is_active: is_active}),
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