import React, { Component } from 'react';
import { connect } from 'react-redux';

import { alertActions } from '../../actions';
import { Title } from '../common';
import { constants, history } from '../../helpers';

const apiUrl = constants.API_URL;

class VerifyUserPage extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let token = this.props.location.search.slice(3);
    fetch(`${apiUrl}/verify/${token}`, {
      method: 'GET'
    })
    .then(res => res.json())
    .then(res => {
      if (res.error) {
        this.props.dispatch(alertActions.error(res.error));
      } else {
        this.props.dispatch(alertActions.success('Successfully verified account!'));
        setTimeout(() => history.push('/login'), 3000);
      }
    })
    .catch(err => {
      this.props.dispatch(alertActions.error(err));
    });
  }

  render() {
    return(
      <Title>Verfying User...</Title>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
};
const connected = connect(mapStateToProps)(VerifyUserPage);
export { connected as VerifyUserPage };