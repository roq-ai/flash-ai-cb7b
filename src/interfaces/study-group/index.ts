import { StudyGroupMemberInterface } from 'interfaces/study-group-member';
import { StudentInterface } from 'interfaces/student';
import { GetQueryInterface } from 'interfaces';

export interface StudyGroupInterface {
  id?: string;
  name: string;
  admin_id: string;
  created_at?: any;
  updated_at?: any;
  study_group_member?: StudyGroupMemberInterface[];
  student?: StudentInterface;
  _count?: {
    study_group_member?: number;
  };
}

export interface StudyGroupGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  admin_id?: string;
}
