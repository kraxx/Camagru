import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Form } from '../common';
import { userActions, alertActions } from '../../actions';

class NewUserForm extends Component {

  handleSubmit = (event) => {
    event.preventDefault();

    const username = event.target.username.value;
    const password = event.target.password.value;
    const email = event.target.email.value;

    if (username === "" || password === "" || email === "") {
      this.props.dispatch(alertActions.error("Empty field(s)"));
    } else {
      const payload = {
          username: username,
          password: password,
          email: email,
          verified: false,
          role: 'user'
      };
      this.props.dispatch(userActions.addUser(payload));
      event.target.username.value = "";
      event.target.password.value = "";
      event.target.email.value = "";
    }
  }

  render() {
    return (
      <Form
        title='Add new user'
        handleSubmit={this.handleSubmit}
        fields={[
          {label: 'username', type: 'text', name: 'Username'},
          {label: 'password', type: 'password', name: 'Password'},
          {label: 'email', type: 'text', name: 'E-mail Address'}
        ]}
        submitBtn='Create'
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}
export default connect(mapStateToProps)(NewUserForm);