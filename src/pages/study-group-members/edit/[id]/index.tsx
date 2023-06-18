import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getStudyGroupMemberById, updateStudyGroupMemberById } from 'apiSdk/study-group-members';
import { Error } from 'components/error';
import { studyGroupMemberValidationSchema } from 'validationSchema/study-group-members';
import { StudyGroupMemberInterface } from 'interfaces/study-group-member';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { StudentInterface } from 'interfaces/student';
import { StudyGroupInterface } from 'interfaces/study-group';
import { getStudents } from 'apiSdk/students';
import { getStudyGroups } from 'apiSdk/study-groups';

function StudyGroupMemberEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<StudyGroupMemberInterface>(
    () => (id ? `/study-group-members/${id}` : null),
    () => getStudyGroupMemberById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: StudyGroupMemberInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateStudyGroupMemberById(id, values);
      mutate(updated);
      resetForm();
      router.push('/study-group-members');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<StudyGroupMemberInterface>({
    initialValues: data,
    validationSchema: studyGroupMemberValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Edit Study Group Member
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <AsyncSelect<StudentInterface>
              formik={formik}
              name={'student_id'}
              label={'Select Student'}
              placeholder={'Select Student'}
              fetcher={getStudents}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.name}
                </option>
              )}
            />
            <AsyncSelect<StudyGroupInterface>
              formik={formik}
              name={'study_group_id'}
              label={'Select Study Group'}
              placeholder={'Select Study Group'}
              fetcher={getStudyGroups}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.name}
                </option>
              )}
            />
            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'study_group_member',
  operation: AccessOperationEnum.UPDATE,
})(StudyGroupMemberEditPage);
