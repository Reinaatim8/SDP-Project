import axios from 'axios';

//create an axios instance
const  apiClient = axios.create({
    baseURL: 'http://kennedymutebi7.pythonanywhere.com/',
    headers: {
        'Content-Type': 'application/json',
    }
});

//add the token to the header
apiClient.interceptors.request.use(
   (config) => {
        const token = localStorage.getItem('access');// to obtain token from local storage
        console.log('access_token:', token);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);


//response interceptor to handle token expiration
apiClient.interceptors.response.use(
  response =>  response,
  async error => {
    const originalRequest = error.config;

        // If token expired, attempt to refresh it
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refresh = localStorage.getItem('refresh'); // Get refresh token
                if (!refresh) {
                    console.error("No refresh token found. Redirecting to login...");
                    localStorage.clear();
                    window.location.href = "/login"; // Redirect to login
                    return Promise.reject(error);
                }

                 // Request new access token
                const response = await axios.post('http://kennedymutebi7.pythonanywhere.com/api/token/refresh/', { refresh });
                localStorage.setItem('access', response.data.access); // Store new access token

                // Retry the failed request with the new token
                originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
                return apiClient(originalRequest);
               } catch (err) {
                console.error("Token refresh failed. Logging out...");
                localStorage.clear();
                window.location.href = "/login"; // Redirect to login
                return Promise.reject(err);}
            }
            return Promise.reject(error);
        });
export default apiClient;