import axios from 'axios';
import queryString from 'query-string';
import { StudyGroupMemberInterface, StudyGroupMemberGetQueryInterface } from 'interfaces/study-group-member';
import { GetQueryInterface } from '../../interfaces';

export const getStudyGroupMembers = async (query?: StudyGroupMemberGetQueryInterface) => {
  const response = await axios.get(`/api/study-group-members${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createStudyGroupMember = async (studyGroupMember: StudyGroupMemberInterface) => {
  const response = await axios.post('/api/study-group-members', studyGroupMember);
  return response.data;
};

export const updateStudyGroupMemberById = async (id: string, studyGroupMember: StudyGroupMemberInterface) => {
  const response = await axios.put(`/api/study-group-members/${id}`, studyGroupMember);
  return response.data;
};

export const getStudyGroupMemberById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/study-group-members/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteStudyGroupMemberById = async (id: string) => {
  const response = await axios.delete(`/api/study-group-members/${id}`);
  return response.data;
};
