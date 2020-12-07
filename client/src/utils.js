import config from './config';
import { Cookies } from 'react-cookie';
import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';

const cookies = new Cookies();
const token = () => cookies.get('auth_token');
const refreshToken = () => cookies.get('refresh_token');

// Function that will be called to refresh authorization
const refreshAuthLogic = failedRequest => {
  axios.post(`${config.BACKEND_HOST}/refresh`).then(tokenRefreshResponse => {
    let token = tokenRefreshResponse.data.jwtToken;
    let refresh = tokenRefreshResponse.data.refreshToken;
  
    failedRequest.response.config.headers['Authorization'] = 'Bearer ' + tokenRefreshResponse.data.token;
    return { jwtToken: token, refreshToken: refresh };
  });
}

// Instantiate the interceptor (you can chain it as it returns the axios instance)
createAuthRefreshInterceptor(axios, refreshAuthLogic);

const get = (url, params = undefined) => {
  if (url[0] === "/") {
    url = `${config.BACKEND_HOST}${url}`;
  }

  let headers = {}
  if (token()){
    headers = {
      "Authorization": `Token ${token()}`
    };
  }

  return axios.get(url, {}, headers);
}

const post = (url, params = undefined) => {

  if (url[0] === "/") {
    url = `${config.BACKEND_HOST}${url}`;
  }

  let body = JSON.stringify(params)

  if (token()){
    body.token = token();
  }

  return axios.post(url, body);
}

const refresh = (url) => {

  if (url[0] === "/") {
    url = `${config.BACKEND_HOST}${url}`;
  }

  let refresh_token = refreshToken()

  return axios.post(url, {"refreshToken": refresh_token});
}

export default {
  token,
  get,
  post,
  refresh
}
