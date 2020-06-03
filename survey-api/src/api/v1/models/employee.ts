export interface Employee {
  id: number;
  full_name: string;
  gender: boolean;
  active: boolean;
  position: string;
  is_admin: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface InputEmployee {
  fullName: string;
  gender: boolean;
  position: string;
}
