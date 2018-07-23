import { alertActions } from './alert.action.js';
import { history } from '../helpers';
import postService from '../services/post.service.js';

const postImage = (postData) => {

  const request = post => {
    return {
      type: 'POST_ADD_REQUEST',
      post
    };
  }
  const success = (post) => {
    return {
      type: 'POST_ADD_SUCCESS',
      post
    };
  }
  const failure = (error) => {
    return {
      type: 'POST_ADD_FAILURE',
      error
    };
  }

  return (dispatch) => {
    dispatch(request({ postData }));
    postService.postImage(postData)
    .then(post => {
      if (post) {
        dispatch(success(post));
        dispatch(alertActions.success(`Image successfully posted!`));        
      } else {
        dispatch(failure('Error posting image'));
        dispatch(alertActions.error('Error posting image'));
      }
    }, error => {
      dispatch(failure(error));
      dispatch(alertActions.error(error));
    })
  };
}

const getAll = () => {

  const request = () => {
    return {
      type: 'POST_GETALL_REQUEST'
    };
  }
  const success = (posts) => {
    return {
      type: 'POST_GETALL_SUCCESS',
      posts
    };
  }
  const failure = (error) => {
    return {
      type: 'POST_GETALL_FAILURE',
      error
    };
  }

  return (dispatch) => {
    dispatch(request());
    postService.getAll()
    .then(posts => {
      dispatch(success(posts));
    }, error => {
      dispatch(failure(error));
      dispatch(alertActions.error(error));
    });
  };
}

const deletePost = (id) => {

  const request = (id) => {
    return {
      type: 'POST_DELETE_REQUEST',
      id
    };
  }
  const success = (id) => {
    return {
      type: 'POST_DELETE_SUCCESS',
      id
    };
  }
  const failure = (id, error) => {
    return {
      type: 'POST_DELETE_FAILURE',
      id,
      error
    };
  }

  return (dispatch) => {
    dispatch(request());
    postService.deletePost(id)
    .then(post => {
      dispatch(success(id));
      dispatch(alertActions.success(`Post with ID {${id}} scrapped and trashed!`));
    }, error => {
      dispatch(failure(id, error));
      dispatch(alertActions.error(error));
    });
  }; 
}

export const postActions = {
  postImage,
  getAll,
  deletePost
};