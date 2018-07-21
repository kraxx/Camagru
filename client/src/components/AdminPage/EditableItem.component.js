import React, { Component } from 'react';

import { Form } from '../common';
import { alertActions, userActions } from '../../actions';

export default class EditableItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: props.user.username,
      email: props.user.email,
      role: props.user.role,
      verified: props.user.verified,
      roleSelected: props.user.role,
      verifiedChecked: props.user.verified
    };
  }

  handleDelete(id) {
    this.props.dispatch(userActions.deleteUser(id));
  }

  handleSubmit = (event, callback) => {
    event.preventDefault();

    let username = event.target.username.value;
    let email = event.target.email.value;
    let role = event.target.role.value;
    let verified = event.target.verified.checked;

    let payload = {};

    if (username !== "" && username != this.state.username)
      payload.username = username;
    if (email !== "" && email != this.state.email)
      payload.email = email;
    if (role != this.state.role)
      payload.role = role;
    if (verified != this.state.verified)
      payload.verified = verified;

    if (('username' in payload) || ('email' in payload) || ('role' in payload) || ('verified' in payload)) {
      payload.id = this.props.user.id;
      this.props.dispatch(userActions.updateUser(payload));
    } else {
      this.props.dispatch(alertActions.error('No changes made'));
    }
  }

  render() {
    return (
      <Form
        title={`Edit ${this.state.username}`}
        handleSubmit={this.handleSubmit}
        fields={[
          {label: 'username', type: 'text', name: 'Username', placeholder: this.state.username},
          {label: 'email', type: 'text', name: 'E-mail Address', placeholder: this.state.email},
          {label: 'role', type: 'select', name: 'Role', selected: this.state.role, options: [
            {value: 'user', name: 'User'},
            {value: 'admin', name: 'Admin'},
            {value: 'disabled', name: 'Disabled'}
          ]},
          {label: 'verified', type: 'checkbox', name: 'Verified', checked: this.state.verified}
        ]}
        submitBtn='Update user'
        otherBtns={[
          {name: 'Delete User', handler: (() => this.handleDelete(this.props.user.id)) },
          {name: 'Cancel Changes', handler: (() => this.props.handleClose()) }
        ]}
      />
    )
  }
};