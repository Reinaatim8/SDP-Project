import axios from 'axios';

//create an axios instance
const  apiClient = axios.create({
    baseURL: 'https://kennedymutebi7.pythonanywhere.com/',
    withCredentials: false,
   
});

//add the token to the header
apiClient.interceptors.request.use(
   (config) => {
        const token = localStorage.getItem('access');// to obtain token from local storage
        console.log('access_token:', token);
        console.log('Request being made with access_token:', token ? 'Present' : 'Missing');
        
        if (token) {
            config.headers.Authorization = `Token ${token}`;
        }
        return config;
    },
    error => {
        console.error('Request interceptor error:', error);
        return Promise.reject(error);
    }
);

export default apiClient;
