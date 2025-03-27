import axios from 'axios';

const API_BASE_URL = 'https://kennedymutebi7.pythonanywhere.com/api';

// Store tokens in localStorage or a secure storage mechanism
let accessToken = localStorage.getItem('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQzMzM0NzEzLCJpYXQiOjE3NDMwNzU1MTMsImp0aSI6ImE2MjA4MjFjZjExYjRmMGZhMzg5OGIzNmZlZTU3NWIwIiwidXNlcl9pZCI6MX0.YaPvm7MPtekwlKdJ6mfQPJFAl3neXi7D9NaDqgCLZFk');
let refreshToken = localStorage.getItem('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0MzMzNDcxMywiaWF0IjoxNzQzMDc1NTEzLCJqdGkiOiI4NDgyNjZhYWZlZWQ0ZTQ2OWQ3YmMwNTcyZTAxMTk3ZiIsInVzZXJfaWQiOjF9.7IQd5HIQzoHoR2Gz5v3abuCLGl3iA8OduBV75NfUqsw');

// Create an Axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

// Interceptor to handle token expiration
apiClient.interceptors.response.use(
  (response) => response, // Pass through successful responses
  async (error) => {
    const originalRequest = error.config;

    // If the error is due to an expired access token
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Prevent infinite retry loops

      try {
        // Refresh the access token
        const response = await axios.post(`${API_BASE_URL}/token/refresh/`, {
          refresh: refreshToken,
        });

        // Update tokens
        accessToken = response.data.access;
        localStorage.setItem('access_token', accessToken);

        // Update the Authorization header
        apiClient.defaults.headers.Authorization = `Bearer ${accessToken}`;
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        // Retry the original request
        return apiClient(originalRequest);
      } catch (refreshError) {
        console.error('Error refreshing token:', refreshError);
        // Handle refresh token failure (e.g., redirect to login)
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '../LoginPage.js'; // Redirect to login page
      }
    }

    return Promise.reject(error);
  }
);

// Fetch all courses
export const getCourses = async () => {
  const response = await apiClient.get('/courses');
  return response.data;
};

// Create a new course
export const createCourse = async (courseData) => {
  console.log('Sending course data:', courseData); // Debugging
  const response = await apiClient.post('/courses', courseData);
  return response.data;
};

// Update a course
export const updateCourse = async (id, courseData) => {
  const response = await apiClient.put(`/courses/${id}`, courseData);
  return response.data;
};

// Delete a course
export const deleteCourse = async (id) => {
  const response = await apiClient.delete(`/courses/${id}`);
  return response.data;
};