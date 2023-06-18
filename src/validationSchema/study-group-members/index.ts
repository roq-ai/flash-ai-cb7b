import * as yup from 'yup';

export const studyGroupMemberValidationSchema = yup.object().shape({
  student_id: yup.string().nullable().required(),
  study_group_id: yup.string().nullable().required(),
});
