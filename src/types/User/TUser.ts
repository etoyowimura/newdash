export type TUser = {
    id:           number;
    username:     string;
    team_id:      number | null;
    role_id:      number[];
    first_name:   string | '';
    last_name:    string | '';
    is_active:    boolean;
    is_superuser: boolean;
}