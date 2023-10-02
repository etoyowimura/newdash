import { useQuery } from "react-query";
import { teamController } from "../../API/LayoutApi/teams";

export const useTeamData = (id: string): any => {
  return useQuery(
    [`teams/${id}`, id],
    () => teamController.read(id),
    { refetchOnWindowFocus: false }
  );
};

export const useTeamOne = (
  teamId: number | string | undefined
): any => {
  return useQuery(
    [`team/${teamId || "all"}`, teamId],
    () => teamController.teamOne(teamId),
    { refetchOnWindowFocus: false }
  );
};

export const useFindTeam = async (query: any) => {
  return await teamController.teamFinderId(query);
};
