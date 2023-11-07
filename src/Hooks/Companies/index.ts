import { useQuery } from "react-query";
import { TCompanyGetParams, companyController } from "../../API/LayoutApi/companies";

export const useCompanyData = ({name, page, is_active} : TCompanyGetParams) => {
  return useQuery(
    [`companies/`, name, page, is_active],
    () => companyController.read({name: name, page: page, is_active: is_active}),
    { refetchOnWindowFocus: false }
  );
};

export const useCompanyOne = (
  companyId: number | string | undefined
): any => {
  return useQuery(
    [`company/${companyId || "all"}`, companyId],
    () => companyController.companyOne(companyId),
    { refetchOnWindowFocus: false }
  );
};
