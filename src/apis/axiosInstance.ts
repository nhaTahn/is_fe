import axios from 'axios';

// Create an Axios instance with default configuration
const apiInstance = axios.create({
  baseURL: 'http://localhost:8080/api', // Replace with your base API URL
  headers: {
    'Content-Type': 'application/json', // Default header for JSON content
  },
});

// Interceptor to add authorization token to headers before every request (if needed)
apiInstance.interceptors.request.use(
  (config) => {
    // Check if there's a token in localStorage/sessionStorage or your state management
    const token = localStorage.getItem('auth_token'); // Example: using localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Add token to the headers
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // Handle errors
  }
);

// Interceptor to handle responses (e.g., error handling globally)
apiInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized error (e.g., redirect to login)
      // For example: window.location.href = '/login';
      window.location.href = '/signin';
    }
    return Promise.reject(error);
  }
);

export default apiInstance;
