import axios from 'axios';
import queryString from 'query-string';
import { ExamInterface, ExamGetQueryInterface } from 'interfaces/exam';
import { GetQueryInterface } from '../../interfaces';

export const getExams = async (query?: ExamGetQueryInterface) => {
  const response = await axios.get(`/api/exams${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createExam = async (exam: ExamInterface) => {
  const response = await axios.post('/api/exams', exam);
  return response.data;
};

export const updateExamById = async (id: string, exam: ExamInterface) => {
  const response = await axios.put(`/api/exams/${id}`, exam);
  return response.data;
};

export const getExamById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/exams/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteExamById = async (id: string) => {
  const response = await axios.delete(`/api/exams/${id}`);
  return response.data;
};
