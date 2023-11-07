export type TTask = {
  id: number;
  company_id: number | null;
  customer_id: number | null;
  service_id: number | null;
  provider_id: number;
  assigned_to_id: number | null;
  in_charge_id: number;
  note: string;
  status: string;
  is_active: boolean;
  pti: boolean;
  created_at: string | Date;
  updated_at: string | Date;
  attachment_set: AttachmentSet[];
  attachment_count: number;
};

export type AttachmentSet = {
  id: number;
  uploaded_by: number | null;
  created_at: string | Date;
  updated_at: string | Date;
  file_path: string;
  file_name: string;
};
