export type TProfile = {
    id:         number;
    username:   string;
    team:       null;
    first_name: string;
    last_name:  string;
    is_staff:   boolean;
}

export type TMystats = {
    todays_points:        number;
    yesterdays_points:    number;
    last_month_points:    number;
    current_month_points: number;
}
