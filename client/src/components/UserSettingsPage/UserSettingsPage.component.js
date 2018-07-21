import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Form, Title } from '../common';
import { userActions, alertActions } from '../../actions';

class UserSettingsPage extends Component {

  constructor(props) {
    super(props);
  }

  handleSubmit = (e) => {
    e.preventDefault();

    let username = e.target.username.value;
    let password = e.target.password.value;
    let email = e.target.email.value;
    let payload = {};

    if (username !== "" && username !== this.props.user.username)
      payload.username = username;
    if (password !== "")
      payload.password = password;
    if (email !== "" && email !== this.props.user.email)
      payload.email = email;

    if (payload.username || payload.password || payload.email) {
      payload.id = this.props.user.id;
      this.props.dispatch(userActions.updateUser(payload));
    } else {
      this.props.dispatch(alertActions.error('Empty field(s)'));
    }
    
    e.target.username.value = '';
    e.target.password.value = '';
    e.target.email.value = '';
  }

  render() {
    const { user } = this.props;
    return (
      <section>
        <Title>ayy sup {user.username}</Title>
        <Form
          title='Update your credentials'
          handleSubmit={this.handleSubmit}
          fields={[
            {label: 'username', type: 'text', name: 'Username'},
            {label: 'password', type: 'password', name: 'Password'},
            {label: 'email', type: 'text', name: 'E-mail Address'}
          ]}
          submitBtn='Update creds!'
        />
      </section>
    )
  }
}

const mapStateToProps = (state) => {
  const { authentication} = state;
  const { user } = authentication;
  return {
    user
  };
}
const connected = connect(mapStateToProps)(UserSettingsPage)
export { connected as UserSettingsPage };