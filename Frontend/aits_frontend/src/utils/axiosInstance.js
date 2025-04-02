import axios from 'axios';

//create an axios instance
const  apiClient = axios.create({
    baseURL: 'http://kennedymutebi7.pythonanywhere.com//issues/api/',
});

//add the token to the header
apiClient.interceptors.request.use(
    config => {
        const token = localStorage.getItem('authtoken');// to obtain token from local storage
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);


//repsonse interceptor to handle errors globally
apiClient.interceptors.response.use(
  response =>  response,
  error => {
    return Promise.reject(error);
  }
)
export default apiClient;