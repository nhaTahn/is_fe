import apiInstance from '../axiosInstance';

const API_URL = '/prompts';

export const createPrompt = async (promptData: { text: string }) => {
  try {
    const response = await apiInstance.post(`${API_URL}`, promptData);
    return response.data;
  } catch (error) {
    // throw new Error(error.response?.data?.message || 'Failed to create prompt');
    throw error;
  }
};

// 2. Get a random prompt
export const getRandomPrompt = async () => {
  try {
    const response = await apiInstance.get(`${API_URL}/random`);
    return response.data;
  } catch (error) {
    // throw new Error(error.response?.data?.message || 'Failed to fetch random prompt');
    throw error;
  }
};
