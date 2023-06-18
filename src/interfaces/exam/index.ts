import { StudentInterface } from 'interfaces/student';
import { GetQueryInterface } from 'interfaces';

export interface ExamInterface {
  id?: string;
  date: any;
  student_id: string;
  created_at?: any;
  updated_at?: any;

  student?: StudentInterface;
  _count?: {};
}

export interface ExamGetQueryInterface extends GetQueryInterface {
  id?: string;
  student_id?: string;
}
