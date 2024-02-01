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

export type TCard = { 
    all_tasks: number;
    active_tasks: number;
    active_tasks_percentage: number;
    inactive_tasks: number;
    inactive_tasks_percentage: number;
}