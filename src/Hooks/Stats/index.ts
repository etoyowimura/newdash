import { useQuery } from "react-query";
import { TStatGetParams, statController } from "../../API/LayoutApi/statistic";

export const useStatsData = ({name, team, start_date, end_date}: TStatGetParams) => {
    return useQuery(
        [`stats/all-users/`, name, team, start_date, end_date],
        () => statController.read({name, team, start_date, end_date}),
        { refetchOnWindowFocus: false }
    );
};
export const useStatTeamData = ({name, start_date, end_date}: TStatGetParams) => {
    return useQuery(
        [`stats/all-teams/`, name, start_date, end_date],
        () => statController.team({name, start_date, end_date}),
        { refetchOnWindowFocus: false }
    );
};


export const useStatOne = (
    statId: number | string | undefined
): any => {
    return useQuery(
        [`stat/${statId || "all"}`, statId],
        () => statController.statOne(statId),
        { refetchOnWindowFocus: false }
    );
};