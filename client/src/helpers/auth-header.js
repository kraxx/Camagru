import { constants } from '../helpers/constants.js';

// Make authenticated HTTP requests to server API using JWT authentication
export const authHeader = () => {
  let user = JSON.parse(constants.STORAGE.getItem('user'));

  if (user && user.token) {
    return { 'Authorization': user.token };
  } else {
     return {};
  }
}