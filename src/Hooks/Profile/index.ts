import { useQuery } from "react-query";
import { TMyTaskHistoryGetParams, prof } from "../../API/LayoutApi/profile";

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


export const useMyHistoryData = ({start_date, end_date}: TMyTaskHistoryGetParams) => {
  return useQuery(
      [`my-task-history/`, start_date, end_date],
      () => prof.myTaskHistory({start_date, end_date}),
      { refetchOnWindowFocus: false }
  );
};
