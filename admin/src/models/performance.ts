import { Employee } from './employee';

export interface Performance {
  id: number;
  content: string;
  rating: number;
  employee: Employee;
}
