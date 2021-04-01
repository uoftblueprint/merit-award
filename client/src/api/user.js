import client from './axios';

export const getUserInfo = async () => {
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

export const updateUser = async (body) => {
  try {
    let cleanedData = {};
    Object.keys(body).forEach(function (prop) {
      if (body[prop]) {
        cleanedData[prop] = body[prop];
      }
    });
    const result = await client.put('/api/user/update', { data: cleanedData });
    return result.data.msg;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const updateUserPassword = async (body) => {
  const result = await client.put('/api/user/update-password', body).then(result => {
    return result.data.msg;
  }).catch(err => {
    return err.response.data;
  });
  return result
};
