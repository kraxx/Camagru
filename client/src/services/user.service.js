import { authHeader, constants } from '../helpers';

const apiUrl = constants.API_URL;

const handleResponse = (res) => {
  if (!res.ok && res.status === 504) {
    return Promise.reject(`${res.status}: ${res.statusText}`);
  }
  return res.json().then(data => {
    if (!res.ok) {
      if (res.status === 401) {
        logout();
        // location.reload(true); // Will refresh page
      }
      const error = (data && (data.error || (data.errors && data.errors[0].message))) || res.statusText;
      return Promise.reject(error);
    }
    return data;
  });
}

const login = (username, password) => {

  let requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  };

  return fetch(`${apiUrl}/login`, requestOptions)
    .then(handleResponse)
    .then(user => {
      if (user.ok) {
        if (user.token) {
          constants.STORAGE.setItem('user', JSON.stringify(user));
        }
        return user;
      } else {
        return {error: 'lol its an error'};
      }
    })
}

const logout = () => {
  constants.STORAGE.removeItem('user');
}

const getAll = () => {

  let requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(`${apiUrl}/users`, requestOptions)
    .then(handleResponse);
}

const getById = (id) => {

  let requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(`${apiUrl}/users/id`, requestOptions)
    .then(handleResponse);
}

const register = (user) => {

  let requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  };

  return fetch(`${apiUrl}/register`, requestOptions)
    .then(handleResponse);
}

const updateUser = (user) => {

  let requestOptions = {
    method: 'PUT',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  };

  return fetch(`${apiUrl}/users/${user.id}`, requestOptions)
    .then(handleResponse)
    .then(data => {
      let tmpData = JSON.parse(constants.STORAGE.getItem('user'));
      if (tmpData && tmpData.username === data.username) {
        tmpData.username = data.username;
        tmpData.email = data.email;
        constants.STORAGE.setItem('user', JSON.stringify(tmpData));
      }
      return data;
    });
}

const addUser = (user) => {

  let requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json'},
    body: JSON.stringify(user)
  };

  return fetch(`${apiUrl}/users`, requestOptions)
    .then(handleResponse);
}

const deleteUser = (id) => {

  let requestOptions = {
    method: 'DELETE',
    headers: authHeader()
  };

  return fetch(`${apiUrl}/users/${id}`, requestOptions)
    .then(handleResponse);
}

export default {
  login,
  logout,
  register,
  getAll,
  getById,
  updateUser,
  addUser,
  deleteUser
};
