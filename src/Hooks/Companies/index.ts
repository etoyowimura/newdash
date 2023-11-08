import { useQuery } from "react-query";
import { TCompanyGetParams, companyController } from "../../API/LayoutApi/companies";

export const useCompanyData = ({name, page, is_active} : TCompanyGetParams) => {
  return useQuery(
    [`companies/`, name, page, is_active],
    () => companyController.read({name: name, page: page, is_active: is_active}),
    { refetchOnWindowFocus: false }
  );
};

export const useCompanyOne = (id: number | undefined) => {
  return useQuery(
    [`company/${id}/`, id],
    () => companyController.companyOne(id),
    { refetchOnWindowFocus: false }
  );
};
