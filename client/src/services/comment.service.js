// As comments are loaded upon viewing posts, it's not necessary to update the global store with this info
import { authHeader, constants } from '../helpers';

const apiUrl = constants.API_URL;

const handleResponse = (res) => {
  if (!res.ok && res.status === 504) {
    return Promise.reject(`${res.status}: ${res.statusText}`);
  }
  return res.json().then(data => {
    if (!res.ok) {
      const error = (data && (data.error || (data.errors && data.errors[0].message))) || res.statusText;
      return Promise.reject(error);
    }
    return {
      ok: true,
      data: data
    };
  });
}

const getAllCommentsByPostId = (id) => {

  let requestOptions = {
    method: 'GET',
  };

  return fetch(`${apiUrl}/comments/${id}`, requestOptions)
    .then(handleResponse)
    .then(res => {
      return res;
    });
}

const addComment = (comment) => {

  let requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json'},
    body: JSON.stringify(comment)
  };

  return fetch(`${apiUrl}/comments`, requestOptions)
    .then(handleResponse)
    .then(res => {
      return res;
    });
}

const deleteComment = (id) => {

  let requestOptions = {
    method: 'DELETE',
    headers: authHeader()
  };

  return fetch(`${apiUrl}/comments/${id}`, requestOptions)
    .then(handleResponse)
    .then(res => {
      if (res.ok) {
        return {
          ok: true,
          data: res
        }
      } else {
        return { ok: false }
      }
    });
}

export default {
  getAllCommentsByPostId,
  addComment,
  deleteComment
};
