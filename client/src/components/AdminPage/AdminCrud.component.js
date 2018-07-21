import React, { Component } from 'react';
import { connect } from 'react-redux';

import { userActions, alertActions } from '../../actions';
import { Form, Modal, Title } from '../common';
import EditableItem from './EditableItem.component.js';
import NewUserForm from './NewUserForm.component.js';
import '../../../public/css/common.css';
import '../../../public/css/admin.css';


class ListItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false
    }
  }

  hideModal = () => {
    this.setState({ show: false })
  }

  showModal = () => {
    this.setState({ show: true })
  }

  render() {
    const { user, alt } = this.props;
    const background = alt ? '#ddd' : '#fff';
    return (
      <div>
        <div className='adminUserListItem' style={{backgroundColor: background}}>
          <div>{user.username}</div>
          <div>{user.email}</div>
          <div>{user.role}</div>
          <div>{user.verified ? "verified" : "not verified"}</div>
          <div><button className='camagruButton adminListButton' onClick={() => this.showModal()}>Edit</button></div>
        </div>
        <Modal show={this.state.show} handleClose={this.hideModal}>
          <EditableItem handleClose={this.hideModal} {...this.props} />
        </Modal>
      </div>
    )
  }
};

const UserListContainer = ({users, dispatch}) => {
  let alt = 0;
  return (
    <div className='adminUserListContainer'>
      <div className='adminUserListTitle'>
        <div>Username</div>
        <div>E-mail Address</div>
        <div>Role</div>
        <div>Verified</div>
        <div/>
      </div>
      {users.map(user => {
        alt = alt ? 0 : 1;
        return <ListItem key={user.id} user={user} dispatch={dispatch} alt={alt} />;
      }
      )}
    </div>
  )
};

class AdminCrud extends Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }

  componentDidMount() {
    if (!this.props.users.items)
      this.props.dispatch(userActions.getAll());
  }

  hideModal = () => {
    this.setState({ show: false })
  }

  showModal = () => {
    this.setState({ show: true })
  }

  handleRefresh = () => {
    this.props.dispatch(userActions.getAll());
  }

  render() {
    const { users, dispatch } = this.props;
    return (
      <section>
        <Title>Hey Big Boss</Title>
        <div>
          <button className='camagruButton' onClick={() => this.showModal()}>Add New User</button>
          <button className='camagruButton' onClick={() => this.handleRefresh()}>Refresh</button>
        </div>
        <Modal show={this.state.show} handleClose={this.hideModal}>
          <NewUserForm />
        </Modal>
        {users.items ? (
          <UserListContainer users={users.items} dispatch={dispatch} />
        ) : (
          <h1>Loading...</h1>
        )}
      </section>
    )
  }
}

const mapStateToProps = (state) => {
  const { users } = state;
  return {
    users
  };
}
const connected = connect(mapStateToProps)(AdminCrud)
export { connected as AdminPage };