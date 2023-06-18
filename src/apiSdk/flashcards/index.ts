import axios from 'axios';
import queryString from 'query-string';
import { FlashcardInterface, FlashcardGetQueryInterface } from 'interfaces/flashcard';
import { GetQueryInterface } from '../../interfaces';

export const getFlashcards = async (query?: FlashcardGetQueryInterface) => {
  const response = await axios.get(`/api/flashcards${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createFlashcard = async (flashcard: FlashcardInterface) => {
  const response = await axios.post('/api/flashcards', flashcard);
  return response.data;
};

export const updateFlashcardById = async (id: string, flashcard: FlashcardInterface) => {
  const response = await axios.put(`/api/flashcards/${id}`, flashcard);
  return response.data;
};

export const getFlashcardById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/flashcards/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteFlashcardById = async (id: string) => {
  const response = await axios.delete(`/api/flashcards/${id}`);
  return response.data;
};
