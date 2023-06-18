import * as yup from 'yup';

export const performanceValidationSchema = yup.object().shape({
  score: yup.number().integer().required(),
  student_id: yup.string().nullable().required(),
});
