export type TStat = {
    id:           number;
    full_name:    string;
    username:     string;
    team_id:      number | null;
    total_points: number;
}
export type TStatTeam = {
    id:           number;
    name:         string;
    is_active:    boolean;
    total_points: number;
}
