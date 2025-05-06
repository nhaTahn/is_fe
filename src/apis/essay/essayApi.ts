import apiInstance from '../axiosInstance'; // Import the configured Axios instance

const API_URL = '/auth'; // Your auth API endpoint

// Login API call
export const signin = async (email: string, password: string) => {
  try {
    const response = await apiInstance.post(`${API_URL}/signin`, { email, password });
    return response.data;
  } catch (error) {
    // throw new Error(error.response?.data?.message || 'Something went wrong');
    throw error;
  }
};

// Signup API call
export const signup = async (name: string, email: string, password: string) => {
  try {
    const username = 'is242';
    const response = await apiInstance.post(`${API_URL}/signup`, { name, email, password, username });
    return response.data;
  } catch (error) {
    // throw new Error(error.response?.data?.message || 'Something went wrong');
    throw error;
  }
};
