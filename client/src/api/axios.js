import axios from 'axios';
import Cookies from 'js-cookie'

const client = axios.create();
// Interceptors take 2 parameters:
// Axios calls the first function if the request succeeds
// Axios calls the second function if the request fails
client.interceptors.response.use(
  res => res,
  err => {
    if (err.response && err.response.status === 401) {
        Cookies.remove("access");
        throw new Error("auth invalid")
    } else {
        throw err;
    }
});

client.interceptors.request.use(
  config => {
    const token = Cookies.get("access");
    if (token) {
        config.headers['Authorization'] = 'Bearer ' + token;
    }
    // config.headers['Content-Type'] = 'application/json';
    return config;
  },
  error => {
    Promise.reject(error)
});

export default client;