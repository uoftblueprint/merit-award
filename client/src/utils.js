import config from './config';
import {Cookies} from 'react-cookie';

const cookies = new Cookies();
const token = () => cookies.get('auth_token');
const refreshToken = () => cookies.get('refresh_token');

const get = (url, params = undefined) => {
  if (url[0] === "/") {
    url = `${config.BACKEND_HOST}${url}`;
  }

  let options = {
    method: 'GET',
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

  return fetch(url, options);
}

const post = (url, params = undefined) => {

  if (url[0] === "/") {
    url = `${config.BACKEND_HOST}${url}`;
  }

  let options = {
    method: 'POST',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(params),
    mode: "cors"
  };

  if (token()){
    options.body.token = token();
  }

  return fetch(url, options);
}

const refresh = (url) => {

  if (url[0] === "/") {
    url = `${config.BACKEND_HOST}${url}`;
  }

  let refresh_token = refreshToken()

  let options = {
    method: 'POST',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "refreshToken": refresh_token
    }),
    mode: "cors"
  };

  return fetch(url, options);
}

export default {
  token,
  get,
  post,
  refresh
}
