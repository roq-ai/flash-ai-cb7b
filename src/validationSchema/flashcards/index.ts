import * as yup from 'yup';

export const flashcardValidationSchema = yup.object().shape({
  content: yup.string().required(),
  student_id: yup.string().nullable().required(),
});
