import { useQuery } from "react-query";
import { serviceController } from "../../API/LayoutApi/services";

export const useServiceData = () => {
  return useQuery(
    [`services/`],
    () => serviceController.read(),
    { refetchOnWindowFocus: false }
  );
};

export const useServiceOne = (serviceId: number | undefined) => {
  return useQuery(
    [`service/${serviceId || "all"}`, serviceId],
    () => serviceController.serviceOne(serviceId),
    { refetchOnWindowFocus: false }
  );
};

