import { alertActions } from './alert.action.js';
import userService from '../services/user.service.js';
import history from '../helpers/history.js';

const login = (username, password) => {

  const request = user => {
    return {
      type: 'USER_LOGIN_REQUEST',
      user
    };
  }
  const success = (user) => {
    return {
      type: 'USER_LOGIN_SUCCESS',
      user
    };
  }
  const failure = (error) => {
    return {
      type: 'USER_LOGIN_FAILURE',
      error
    };
  }

  return (dispatch) => {
    dispatch(request({ username }));
    userService.login(username, password)
    .then(user => {
      if (user) {
        dispatch(success(user));
        history.push('/'); // redirect to HomePage after success
        dispatch(alertActions.success(`Welcome ${user.username}!`));        
      } else {
        dispatch(failure('No actual user was returned'));
        dispatch(alertActions.error('No actual user was returned'));
      }
    }, error => {
      dispatch(failure(error));
      dispatch(alertActions.error(error));
    })
  };
}

const logout = () => {
  userService.logout();
  return {
    type: 'USER_LOGOUT'
  };
}

const getAll = () => {

  const request = () => {
    return {
      type: 'USER_GETALL_REQUEST'
    };
  }
  const success = (users) => {
    return {
      type: 'USER_GETALL_SUCCESS',
      users
    };
  }
  const failure = (error) => {
    return {
      type: 'USER_GETALL_FAILURE',
      error
    };
  }

  return (dispatch) => {
    dispatch(request());
    userService.getAll()
    .then(users => {
      dispatch(success(users));
    }, error => {
      dispatch(failure(error));
      dispatch(alertActions.error(error));
    });
  };
}

const addUser = (user) => {

  const request = (user) => {
    return {
      type: 'USER_ADD_REQUEST',
      user
    };
  }
  const success = (user) => {
    return {
      type: 'USER_ADD_SUCCESS',
      user
    };
  }
  const failure = (error) => {
    return {
      type: 'USER_ADD_FAILURE',
      error
    };
  }

  return (dispatch) => {
    dispatch(request());
    userService.addUser(user)
    .then(user => {
      dispatch(success(user));
      dispatch(alertActions.success(`User "${user.username}" added successfully!`));
    }, error => {
      dispatch(failure(error));
      dispatch(alertActions.error(error));
    });
  };
}

const register = (user) => {

  const request = (user) => {
    return {
      type: 'USER_REGISTER_REQUEST',
      user
    };
  }
  const success = (user) => {
    return {
      type: 'USER_REGISTER_SUCCESS',
      user
    };
  }
  const failure = (error) => {
    return {
      type: 'USER_REGISTER_FAILURE',
      error
    };
  }

  return (dispatch) => {
    dispatch(request(user));
    userService.register(user)
    .then(user => {
      dispatch(success());
      history.push('/login');
      dispatch({
        type: 'USER_ADD_SUCCESS',
        user
      });
      dispatch(alertActions.success('Registration successful! Please check your e-mail'));
    }, error => {
      dispatch(failure(error));
      dispatch(alertActions.error(error));
    });
  };
}

const updateUser = (user) => {

  const request = (user) => {
    return {
      type: 'USER_UPDATE_REQUEST',
      user
    };
  }
  const success = (user) => {
    return {
      type: 'USER_UPDATE_SUCCESS',
      user
    };
  }
  const failure = (error) => {
    return {
      type: 'USER_UPDATE_FAILURE',
      error
    };
  }

  return (dispatch) => {
    dispatch(request());
    userService.updateUser(user)
    .then(user => {
      dispatch(success(user));
      dispatch({
        type: 'USER_LOGIN_SUCCESS',
        user
      });
      dispatch(alertActions.success(`User "${user.username}" successfully updated!`));
    }, error => {
      dispatch(failure(error));
      dispatch(alertActions.error(error));
    });
  };
}

const deleteUser = (id) => {

  const request = (id) => {
    return {
      type: 'USER_DELETE_REQUEST',
      id
    };
  }
  const success = (id) => {
    return {
      type: 'USER_DELETE_SUCCESS',
      id
    };
  }
  const failure = (id, error) => {
    return {
      type: 'USER_DELETE_FAILURE',
      id,
      error
    };
  }

  return (dispatch) => {
    dispatch(request());
    userService.deleteUser(id)
    .then(user => {
      dispatch(success(id));
      dispatch(alertActions.success(`User with ID {${id}} successfully thrown into the void!`));
    }, error => {
      dispatch(failure(id, error));
    });
  }; 
}

export const userActions = {
  login,
  logout,
  register,
  getAll,
  addUser,
  updateUser,
  deleteUser
};