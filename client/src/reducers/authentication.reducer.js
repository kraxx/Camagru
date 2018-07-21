import { constants } from '../helpers/constants.js';

let user = JSON.parse(constants.STORAGE.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

export default (state = initialState, action) => {
  switch(action.type) {

    case 'USER_LOGIN_REQUEST':
      return {
        loggingIn: true,
        user: action.user
      };

    case 'USER_LOGIN_SUCCESS':
      return {
        loggedIn: true,
        user: action.user
      };

    case 'USER_LOGIN_FAILURE':
      return {
        error: action.error
      };

    case 'USER_LOGOUT':
      return {};

    default:
      return state;
  }
}