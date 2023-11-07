export type TUpdate = {
    id:          number;
    company_id:  number;
    customer_id: number;
    provider_id: number;
    executor_id: number | null;
    status:      string;
    note:        string;
    solution:    string;
    is_active:   boolean;
    is_pinned:   boolean;
    updated_at:  Date;
    created_at:  Date;
}