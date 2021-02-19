import axios from 'axios';
import client from './axios';

export const getAppStatus = async () => {

  try {
      const appStatus = await client.get('/api/app-status');

      if (!appStatus || appStatus.status != 200 || typeof(appStatus.data) == "string") {
          throw 'Could not get app status';
      }
      return appStatus.data;
  } catch (err) {
      console.log(err);
      throw err;
  }
};
