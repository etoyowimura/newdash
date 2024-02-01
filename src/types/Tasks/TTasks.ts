export type TTask = {
  id?: number;
  company?: string;
  customer?: string;
  service?: {id: number; title: string};
  provider?: string;
  assigned_to: {id: number, name: string};
  in_charge: {id: number, username: string};
  note?: string;
  status?: string;
  is_active?: boolean;
  pti?: boolean;
  created_at?: string | Date;
  updated_at?: string | Date;
  attachment_set?: AttachmentSet[];
  attachment_count?: number;
};

export type AttachmentSet = {
  id?: number;
  uploaded_by?: number | null;
  created_at?: string | Date;
  updated_at?: string | Date;
  file_path?: string;
  file_name?: string;
};

export type TTaskHistory = {
  id?:          number;
  task?:        number;
  user?:        string;
  action?:      string;
  description?: string;
  timestamp?:   Date;
}