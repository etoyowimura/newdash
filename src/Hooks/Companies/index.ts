import { useQuery } from "react-query";
import { companyController } from "../../API/LayoutApi/companies";

export const useCompanyData = (id: string): object => {
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
    [`admin/categoriesOne/${companyId || "all"}`, companyId],
    () => companyController.companyOne(companyId),
    { refetchOnWindowFocus: false }
  );
};

export const useFindCompany = async (query: any) => {
  return await companyController.companyFinderId(query);
};
