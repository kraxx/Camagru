// Custom history object instead of React-Router to allow redirection of users from outside React components
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();