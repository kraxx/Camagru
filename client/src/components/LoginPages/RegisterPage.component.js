import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Form, Title } from '../common';
import { userActions, alertActions } from '../../actions';

class RegisterPage extends Component {

	constructor(props) {
    super(props);
    // logout user if logged in
    this.props.dispatch(userActions.logout());
  }

  handleSubmit =(e) => {
    e.preventDefault();

    const username = e.target.username.value;
    const password = e.target.password.value;
    const email = e.target.email.value;

    const payload = {
      username: username,
      password: password,
      email: email
    };

    if (username && password && email) {
      this.props.dispatch(userActions.register(payload));
      e.target.username.value = "";
      e.target.password.value = "";
      e.target.email.value = "";
    } else {
      this.props.dispatch(alertActions.error('Empty field(s)'));
    }
  }

  render() {
    return (
      <section>
        <Title>Sign up!</Title>
        <Form
          handleSubmit={this.handleSubmit}
          fields={[
            {label: 'username', type: 'text', name: 'Username'},
            {label: 'password', type: 'password', name: 'Password'},
            {label: 'email', type: 'text', name: 'E-mail Address'}
          ]}
          submitBtn='Register'
        />
      </section>
    )
  }
}

const mapStateToProps = (props) => {
  return {};
}
const connected = connect(mapStateToProps)(RegisterPage);
export { connected as RegisterPage };
