import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleWare from 'redux-thunk';
// import { createLogger } from 'redux-logger';

import rootReducer from './reducers';
import { App } from './components';
import '../public/css/index.css';


const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleWare,
    // createLogger() //redux debugger
  )
);

console.log("this is v0.2");

ReactDOM.render((
  <Provider store={store}>
      <App/>
  </Provider>
  ),
  document.getElementById('root')
);
