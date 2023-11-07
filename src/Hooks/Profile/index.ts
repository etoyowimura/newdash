import { useQuery } from "react-query";
import { prof } from "../../API/LayoutApi/profile";

export const useMystatsData = () => {
  return useQuery([`stats/my-stats/`], () => prof.read(), {
    refetchOnWindowFocus: false,
  });
};

export const useProfData = () => {
  return useQuery([`users/my-profile/`], () => prof.self(), {
    refetchOnWindowFocus: false,
  });
};
