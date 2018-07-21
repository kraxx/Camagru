import React, { Component } from 'react';
import { connect } from 'react-redux';

import { constants, history } from '../../helpers';
import { userActions, alertActions } from '../../actions';
import { Form, Modal, Title } from '../common';
import '../../../public/css/login.css';

const apiUrl = constants.API_URL

class LoginPage extends Component {

	constructor(props) {
    super(props);
    // logout user if logged in
    this.props.dispatch(userActions.logout());
    this.state = {
      show: false
    };
  }

  showModal = () => {
    this.setState({ show: true });
  }

  hideModal = () => {
    this.setState({ show: false });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    let username = e.target.username.value;
    let password = e.target.password.value;

    if (username && password) {
      this.props.dispatch(userActions.login(username, password));
    } else {
      this.props.dispatch(alertActions.error('Empty field(s)'));
    }
  }

  handleResetPassword = (e) => {
    e.preventDefault();

    let email = e.target.email.value;
    if (email !== "") {
      fetch(`${apiUrl}/forgot_password/${email}`)
      .then(res => {
        return res.json()
      })
      .then(res => {
        if (res.ok) {
          this.props.dispatch(alertActions.success('Password reset link sent!'));
          this.setState({ show: false });
        } else {
          this.props.dispatch(alertActions.error(`Error: something's wrong`));
        }
      })
      .catch(err => {
        this.props.dispatch(alertActions.error(`Error: ${err}`));
      })
    }
  }

  render() {
    return (
      <section>
        <Title>Login</Title>
        <Form
          handleSubmit={this.handleSubmit}
          fields={[
            {label: 'username', type: 'text', name: 'Username'},
            {label: 'password', type: 'password', name: 'Password'}
          ]}
          submitBtn='Login'
          otherBtns={[
            {name: 'Register', handler: (() => history.push('/register'))}
          ]}
        />
        <div className='loginForgotPassword'>
          <a onClick={() => this.showModal()}>Forgot password?</a>
        </div>
        <Modal show={this.state.show} handleClose={this.hideModal}>
          <Form
            title='Reset password'
            handleSubmit={this.handleResetPassword}
            fields={[
              {label: 'email', type: 'text', name: 'E-mail address'}
            ]}
            submitBtn='Send reset link'
          />
        </Modal>
      </section>
    )
  }
}

const mapStateToProps = (props) => {
  return {};
}
const connected = connect(mapStateToProps)(LoginPage);
export { connected as LoginPage };
