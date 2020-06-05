import { Employee } from './employee';

export interface Performance {
  id: number;
  content: string;
  rating: number;
  employee_id: number;
  employee: Employee;
  created_at: Date;
  updated_at: Date;
}
