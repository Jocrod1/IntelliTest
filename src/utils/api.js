import {Alert} from 'react-native';

const get = async (endPoint, data) => {
  const getParams = data => {
    if (!data) return '';
    return (
      '?' +
      Object.entries(data)
        .map(([key, value]) => key + '=' + value)
        .join('&')
    );
  };
  console.log(endPoint + getParams(data));
  const input = endPoint + getParams(data);
  return await fetch(input);
};

const post = async (endPoint, data) => {
  const init = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  // console.log(endPoint);
  return await fetch(endPoint, init);
};

const getP = (token, endPoint, data) => {
  const getParams = data => {
    if (!data) return '';
    return (
      '?' +
      Object.entries(data)
        .map(([key, value]) => key + '=' + value)
        .join('&')
    );
  };
  const input = endPoint + getParams(data);

  // console.log(input);
  return fetch(input, {
    headers: {Accept: 'application/json', Authorization: 'Bearer ' + token},
  });
};

const postP = (token, endPoint, data) => {
  const init = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  };
  return fetch(endPoint, init);
};

const putP = (token, endPoint, data) => {
  const init = {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  };
  return fetch(endPoint, init);
};

const login = async data => {
  try {
    const response = await post('https://api.dev.myintelli.net/v1/login', data);
    const user = await response.json();
    // console.log(user);
    if (user.error) {
      Alert.alert('Alerta', user.error);
      throw user.error;
    }
    return user;
  } catch (e) {
    console.log('>>: Login > submit > error: ', e);
    throw e;
  }
};

const getDevices = async (data, token) => {
  try {
    const response = await getP(
      token,
      'https://api.dev.myintelli.net/v1/devices',
      data,
    );
    const devices = await response.json();
    return devices;
  } catch (e) {
    console.log('>>: Devices > search > error', e);
    throw e;
  }
};

const getHeroes = async () => {
  try {
    const response = await get(
      'https://akabab.github.io/superhero-api/api/all.json',
    );
    const heroes = await response.json();
    return heroes;
  } catch (e) {
    console.log('>>: Heroes > Get > error', e);
    throw e;
  }
};

export default {
  login,
  get,
  post,
  getP,
  postP,
  putP,
  getDevices,
  getHeroes,
};
