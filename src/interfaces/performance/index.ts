import { StudentInterface } from 'interfaces/student';
import { GetQueryInterface } from 'interfaces';

export interface PerformanceInterface {
  id?: string;
  score: number;
  student_id: string;
  created_at?: any;
  updated_at?: any;

  student?: StudentInterface;
  _count?: {};
}

export interface PerformanceGetQueryInterface extends GetQueryInterface {
  id?: string;
  student_id?: string;
}
