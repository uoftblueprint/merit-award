import axios from 'axios';
import client from './axios';

export const getAppStatus = async () => {

  try {
      const appStatus = await client.get('/api/app-status');

      // what to submit as user id to get the proper info?
      // if (!user || user.status != 200 || typeof(user.data) == "string") {
      //     throw 'Could not get app status';
      // }
      return appStatus.data;
  } catch (err) {
      console.log(err);
      throw err;
  }
};
