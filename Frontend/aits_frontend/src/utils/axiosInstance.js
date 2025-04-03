import axios from 'axios';

//create an axios instance
const  apiClient = axios.create({
    baseURL: 'http://kennedymutebi7.pythonanywhere.com/',
});

//add the token to the header
apiClient.interceptors.request.use(
   (config) => {
        const access= localStorage.getItem('access');// to obtain token from local storage
        console.log('access_token:', access);
        if (access) {
            config.headers.Authorization = `Bearer ${access}`;
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