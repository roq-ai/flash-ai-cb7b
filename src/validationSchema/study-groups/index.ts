import * as yup from 'yup';

export const studyGroupValidationSchema = yup.object().shape({
  name: yup.string().required(),
  admin_id: yup.string().nullable().required(),
});
