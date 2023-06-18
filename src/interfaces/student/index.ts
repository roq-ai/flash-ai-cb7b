import { ExamInterface } from 'interfaces/exam';
import { FlashcardInterface } from 'interfaces/flashcard';
import { PerformanceInterface } from 'interfaces/performance';
import { StudyGroupInterface } from 'interfaces/study-group';
import { StudyGroupMemberInterface } from 'interfaces/study-group-member';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface StudentInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  exam?: ExamInterface[];
  flashcard?: FlashcardInterface[];
  performance?: PerformanceInterface[];
  study_group?: StudyGroupInterface[];
  study_group_member?: StudyGroupMemberInterface[];
  user?: UserInterface;
  _count?: {
    exam?: number;
    flashcard?: number;
    performance?: number;
    study_group?: number;
    study_group_member?: number;
  };
}

export interface StudentGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
