import * as yup from 'yup';

export const examValidationSchema = yup.object().shape({
  date: yup.date().required(),
  student_id: yup.string().nullable().required(),
});
