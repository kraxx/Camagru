import { authHeader, constants } from '../helpers';

const apiUrl = constants.API_URL;

const handleResponse = (res) => {
  if (!res.ok && res.status === 504) {
    return Promise.reject(`${res.status}: ${res.statusText}`);
  }
  return res.json().then(data => {
    if (!res.ok) {
      let error = (data && (data.error || (data.errors && data.errors[0].message))) || res.statusText;
      // console.log("What's my flippin error eh")
      // console.log("it's: ", error)
      return Promise.reject(error);
    }
    return data;
  });
}

const postImage = (postData) => {

  let requestOptions = {
    method: 'POST',
    headers: { 
      ...authHeader(),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(postData)
  };

  return fetch(`${apiUrl}/posts`, requestOptions)
    .then(handleResponse)
    .then(post => {
      if (post.ok) {
        return post;
      } else {
        return {error: 'lol its an error'};
      }
    });
}

const getAll = () => {

  let requestOptions = {
    method: 'GET'
  };

  return fetch(`${apiUrl}/posts`, requestOptions)
    .then(handleResponse);
}

const deletePost = (id) => {

  let requestOptions = {
    method: 'DELETE',
    headers: {
      ...authHeader(),
      'Content-Type': 'application/json'
    }
  };

  return fetch(`${apiUrl}/posts/${id}`, requestOptions)
    .then(handleResponse);
}

export default {
  postImage,
  getAll,
  deletePost
};
