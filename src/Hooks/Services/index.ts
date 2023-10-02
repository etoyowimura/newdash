import { useQuery } from "react-query";
import { serviceController } from "../../API/LayoutApi/services";

export const useServiceData = (id: string): any => {
  return useQuery(
    [`services/${id}`, id],
    () => serviceController.read(id),
    { refetchOnWindowFocus: false }
  );
};

export const useServiceOne = (
  serviceId: number | string | undefined
): any => {
  return useQuery(
    [`service/${serviceId || "all"}`, serviceId],
    () => serviceController.serviceOne(serviceId),
    { refetchOnWindowFocus: false }
  );
};

export const useFindService = async (query: any) => {
  return await serviceController.serviceFinderId(query);
};
