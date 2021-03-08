import axios from 'axios';
import Cookies from 'js-cookie'
import client from './axios';

export const apiLogin = async (email, password) => {
  try {
    const user = await axios.post('/api/user/login', {
      email,
      password,
    });

    if (!user || user.status != 200) {
      throw 'Unable to login';
    }

    console.log('user :>> ', user);

    Cookies.set('access', user.data.access);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const apiSignup = async (email, password, school) => {

    console.log("attempting to sign up w/ email: " + email + " , password: " + password + "")
    try {
        const user = await axios.post('/api/user/signup', {
            email,
            password,
            school
        });

        if (!user || user.status != 200 || typeof(user.data) == "string") {
            throw 'Could not create new user.';
        }

        Cookies.set('access', user.data.access);
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export const getEmail = async () => {

  try {
      const user = await client.get('/api/user/profile');

      if (!user || user.status != 200 || typeof(user.data) == "string") {
          throw 'Could not get email';
      }
      return user.data;
  } catch (err) {
      console.log(err);
      throw err;
  }
};
