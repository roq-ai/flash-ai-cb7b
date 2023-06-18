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
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createStudyGroupMember } from 'apiSdk/study-group-members';
import { Error } from 'components/error';
import { studyGroupMemberValidationSchema } from 'validationSchema/study-group-members';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { StudentInterface } from 'interfaces/student';
import { StudyGroupInterface } from 'interfaces/study-group';
import { getStudents } from 'apiSdk/students';
import { getStudyGroups } from 'apiSdk/study-groups';
import { StudyGroupMemberInterface } from 'interfaces/study-group-member';

function StudyGroupMemberCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: StudyGroupMemberInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createStudyGroupMember(values);
      resetForm();
      router.push('/study-group-members');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<StudyGroupMemberInterface>({
    initialValues: {
      student_id: (router.query.student_id as string) ?? null,
      study_group_id: (router.query.study_group_id as string) ?? null,
    },
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
            Create Study Group Member
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
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
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'study_group_member',
  operation: AccessOperationEnum.CREATE,
})(StudyGroupMemberCreatePage);
