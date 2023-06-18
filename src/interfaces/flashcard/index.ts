import { StudentInterface } from 'interfaces/student';
import { GetQueryInterface } from 'interfaces';

export interface FlashcardInterface {
  id?: string;
  content: string;
  student_id: string;
  created_at?: any;
  updated_at?: any;

  student?: StudentInterface;
  _count?: {};
}

export interface FlashcardGetQueryInterface extends GetQueryInterface {
  id?: string;
  content?: string;
  student_id?: string;
}
