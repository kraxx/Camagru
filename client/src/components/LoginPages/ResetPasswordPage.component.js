import React, { Component } from 'react';
import { connect } from 'react-redux';

import { alertActions } from '../../actions';
import { Form } from '../common';
import { constants, history } from '../../helpers';

const apiUrl = constants.API_URL;

class ResetPasswordPage extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.queryString = this.props.location.search.slice(3);
  }

  handleResetPassword = (e) => {
    e.preventDefault();
    let password = e.target.password.value;
    if (e !== '') {
      fetch(`${apiUrl}/reset_password/${this.queryString}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: password })
      })
      .then(res => res.json())
      .then(res => {
        if (res.ok) {
          this.props.dispatch(alertActions.success(`Successfully changed password!`));
          setTimeout(() => history.push('/login'), 3000);
        } else if (res.error) {
          this.props.dispatch(alertActions.error(res.error));
        }
      })
      .catch(err => {
        this.props.dispatch(alertActions.error(err));
      });
    }
  }

  render() {
    return(
      <Form
        title='Enter new password'
        handleSubmit={this.handleResetPassword}
        fields={[
          {label: 'password', type: 'password', name: 'Password'}
        ]}
        submitBtn='Reset password!'
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {}
};
const connected = connect(mapStateToProps)(ResetPasswordPage);
export { connected as ResetPasswordPage };