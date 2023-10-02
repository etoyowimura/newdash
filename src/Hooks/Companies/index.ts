import { useQuery } from "react-query";
import { companyController } from "../../API/LayoutApi/companies";

export const useCompanyData = (id: any): any => {
  return useQuery(
    [`companies/${id}`, id],
    () => companyController.read(id),
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

export const useFindCompany = async (query: string) => {
  return await companyController.companyFinderId(query);
};
