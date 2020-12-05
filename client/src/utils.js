import config from './config';
import { Cookies } from 'react-cookie';
import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';

const cookies = new Cookies();
const token = () => cookies.get('auth_token');
const refreshToken = () => cookies.get('refresh_token');

// Function that will be called to refresh authorization
const refreshAuthLogic = failedRequest => axios.post(`${config.BACKEND_HOST}/refresh`).then(tokenRefreshResponse => {
  let token = tokenRefreshResponse.data.jwtToken;
  let refresh = tokenRefreshResponse.data.refreshToken;

  failedRequest.response.config.headers['Authorization'] = 'Bearer ' + tokenRefreshResponse.data.token;
  return { jwtToken: token, refreshToken: refresh };
});

// Instantiate the interceptor (you can chain it as it returns the axios instance)
createAuthRefreshInterceptor(axios, refreshAuthLogic);

const get = (url, params = undefined) => {
  if (url[0] === "/") {
    url = `${config.BACKEND_HOST}${url}`;
  }

  let options = {
    method: 'get',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    json: true
  };

  if (token()){
    options.headers = {
      "Authorization": `Token ${token()}`
    };
  }

  return axios.get(url, options);
}

const post = (url, params = undefined) => {

  if (url[0] === "/") {
    url = `${config.BACKEND_HOST}${url}`;
  }

  let options = {
    method: 'post',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    data: JSON.stringify(params),
    mode: "cors"
  };

  if (token()){
    options.data.token = token();
  }

  return axios.post(url, options);
}

const refresh = (url) => {

  if (url[0] === "/") {
    url = `${config.BACKEND_HOST}${url}`;
  }

  let refresh_token = refreshToken()

  let options = {
    method: 'post',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    data: JSON.stringify({
      "refreshToken": refresh_token
    }),
    mode: "cors"
  };

  return axios.post(url, options);
}

export default {
  token,
  get,
  post,
  refresh
}
