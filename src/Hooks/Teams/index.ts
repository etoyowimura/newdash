import { useQuery } from "react-query";
import { teamController } from "../../API/LayoutApi/teams";

export const useTeamData = (name: string) => {
  return useQuery(
    [`teams/?name=${name}/`, name],
    () => teamController.read(name),
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