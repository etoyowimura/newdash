import { useQuery } from "react-query";
import { customerController } from "../../API/LayoutApi/customers";

export const useCustomerData = (id: string): any => {
  return useQuery(
    [`custoemrs/${id}`, id],
    () => customerController.read(id),
    { refetchOnWindowFocus: false }
  );
};

// export const useCustomerByCompanyData = (id: string): any => {
//   return useQuery(
//     [`custoemrs/${id}`, id],
//     () => customerController.customerByCompany(id),
//     { refetchOnWindowFocus: false }
//   );
// };

export const useCustomerOne = (Id: string): any => {
  return useQuery(
    [`customer/${Id || "all"}`, Id],
    () => customerController.customerOne(Id),
    { refetchOnWindowFocus: false }
  );
};

export const useCustomerByCompanyData = (Id: string): any => {
  return useQuery(
    [`customer/${Id || "all"}`, Id],
    () => customerController.customerByCompany(Id),
    { refetchOnWindowFocus: false }
  );
};

export const useFindCustomer = async (query: any) => {
  return await customerController.customerFinderId(query);
};
