import apiInstance from '../axiosInstance'; // Import the configured Axios instance
import { EssayDto } from '../../dtos/EssayDto';

const API_URL = '/essay'; // Your auth API endpoint

export const getEssayDrafts = async (): Promise<EssayDto[]> => {
    try {
      const response = await apiInstance.get<{ data: EssayDto[] }>(`${API_URL}/drafts`);
      return response.data.data;
    } catch (error: any) {
    //   console.error('Failed to fetch drafts:', error.response?.data || error.message);
      throw error;
    }
  };
  

export const getEssayHistory = async (): Promise<EssayDto[]> => {
try {
    const response = await apiInstance.get<{ data: EssayDto[] }>(`${API_URL}/history`);
    return response.data.data;
} catch (error: any) {
//   console.error('Failed to fetch history:', error.response?.data || error.message);
    throw error;
}
};

export const saveEssayDraft = async (payload: {
    content: string;
    id: string;
    timeTaken: number;
  }): Promise<string> => {
    try {
      const response = await apiInstance.put<{ message: string }>(`${API_URL}/draft`, payload);
      return response.data.message;
    } catch (error: any) {
    //   console.error('Failed to save draft:', error.response?.data || error.message);
      throw error;
    }
  };

export const submitEssay = async (payload: {
    content: string;
    promptId: string;
    timeTaken: number;
    status: string;
  }): Promise<string> => {
    try {
      const response = await apiInstance.post<{ message: string }>(`${API_URL}/submit`, payload);
      return response.data.message;
    } catch (error: any) {
    //   console.error('Failed to submit essay:', error.response?.data || error.message);
      throw error;
    }
  };
