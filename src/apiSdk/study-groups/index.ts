import axios from 'axios';
import queryString from 'query-string';
import { StudyGroupInterface, StudyGroupGetQueryInterface } from 'interfaces/study-group';
import { GetQueryInterface } from '../../interfaces';

export const getStudyGroups = async (query?: StudyGroupGetQueryInterface) => {
  const response = await axios.get(`/api/study-groups${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createStudyGroup = async (studyGroup: StudyGroupInterface) => {
  const response = await axios.post('/api/study-groups', studyGroup);
  return response.data;
};

export const updateStudyGroupById = async (id: string, studyGroup: StudyGroupInterface) => {
  const response = await axios.put(`/api/study-groups/${id}`, studyGroup);
  return response.data;
};

export const getStudyGroupById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/study-groups/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteStudyGroupById = async (id: string) => {
  const response = await axios.delete(`/api/study-groups/${id}`);
  return response.data;
};
