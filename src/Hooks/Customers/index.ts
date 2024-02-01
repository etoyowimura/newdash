import { useQuery } from "react-query";
import { TCustomerByCompanyGetParams, TCustomerGetParams, customerController } from "../../API/LayoutApi/customers";

export const useCustomerData = ({name, page, is_active} : TCustomerGetParams) => {
  return useQuery(
    [`customers/`, name, page, is_active],
    () => customerController.read({name: name, page: page, is_active: is_active}),
    { refetchOnWindowFocus: false }
  );
};

export const useCustomerByComanyData = ({name, id, is_active} : TCustomerByCompanyGetParams) => {
  return useQuery(
    [`customers-by-company/${id}`, name, is_active],
    () => customerController.customerByCompany(id, name, is_active),
    { refetchOnWindowFocus: false }
  );
};

export const useCustomerOne = (Id: number | undefined) => {
  return useQuery(
    [`customer/${Id}/`, Id],
    () => customerController.customerOne(Id),
    { refetchOnWindowFocus: false }
  );
};