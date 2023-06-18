import { StudentInterface } from 'interfaces/student';
import { StudyGroupInterface } from 'interfaces/study-group';
import { GetQueryInterface } from 'interfaces';

export interface StudyGroupMemberInterface {
  id?: string;
  student_id: string;
  study_group_id: string;
  created_at?: any;
  updated_at?: any;

  student?: StudentInterface;
  study_group?: StudyGroupInterface;
  _count?: {};
}

export interface StudyGroupMemberGetQueryInterface extends GetQueryInterface {
  id?: string;
  student_id?: string;
  study_group_id?: string;
}
