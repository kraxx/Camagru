import { combineReducers } from 'redux';

import users from './user.reducer.js';
import posts from './post.reducer.js';
import authentication from './authentication.reducer.js';
import alert from './alert.reducer.js';
import registration from './registration.reducer.js';

export default combineReducers({
  users,
  posts,
  authentication,
  alert,
  registration
});
