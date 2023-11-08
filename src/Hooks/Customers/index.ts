import { useQuery } from "react-query";
import { TCustomerByCompanyGetParams, TCustomerGetParams, customerController } from "../../API/LayoutApi/customers";

export const useCustomerData = ({name, page, is_active} : TCustomerGetParams) => {
  return useQuery(
    [`customers/`, name, page, is_active],
    () => customerController.read({name: name, page: page, is_active: is_active}),
    { refetchOnWindowFocus: false }
  );
};

export const useCustomerByComanyData = ({name, id} : TCustomerByCompanyGetParams) => {
  return useQuery(
    [`customers-by-company/${id}`, name],
    () => customerController.customerByCompany(id, name),
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