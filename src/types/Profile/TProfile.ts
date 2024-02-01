export type TProfile = {
    id:         number;
    username:   string;
    team:       null;
    first_name: string;
    last_name:  string;
    is_staff:   boolean;
}

export type TMystats = {
    daily_stats: Array<object>;
    total_for_period: number;
    avg_stats_for_period: number
    period: number;
    contribution: number;
}

export type TMyTaskHistory = {
    id:          number;
    task:        number;
    user:        string;
    action:      string;
    description: string;
    timestamp:   Date;
}