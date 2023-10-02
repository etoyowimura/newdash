import { useQuery } from "react-query";
import { statController } from "../../API/LayoutApi/statistic";

export const useStatsData = (id: string): object => {
    return useQuery(
        [`stats/${id}`, id],
        () => statController.read(id),
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

export const useFindByTeam = async (query: any) => {
    return await statController.statFinderId(query);
};