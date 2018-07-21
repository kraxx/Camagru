import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../../helpers';
import { alertActions } from '../../actions';
import Header from './Header.component.js';
import AlertBar from './AlertBar.component.js';
import Main from './Main.component.js';

class App extends Component {

  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    history.listen((location, action) => {
      dispatch(alertActions.clear());
    });
  }

  render() {
    const { alert } = this.props;
    return (
      <Router history={history}>
        <div>
          <Header />
          <AlertBar alert={alert} />
          <Main />
        </div>
      </Router>
    )
  }
}

const mapStateToProps = (state) => {
  const { alert } = state;
  return {
    alert
  };
}
const connected = connect(mapStateToProps)(App);
export { connected as App };