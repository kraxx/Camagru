import React, { Component } from 'react';
import { connect } from 'react-redux';

import { postActions } from '../../actions';
import { PostDetails } from './PostDetails.component.js';
import { Modal, Title } from '../common';
import '../../../public/css/homepage.css';
import '../../../public/css/common.css';

class ListItem extends Component {

  constructor(props) {
    super(props);
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

  render() {
    const { post } = this.props;
    return (
      <div className='thumbnailContainer'>
        <img className='camagruThumb' src={post.sourceUrl} onClick={() => this.showModal()} />
        <p>{post.description ? post.description : 'untitled'} by {post.username}</p>
        <Modal show={this.state.show} handleClose={this.hideModal} >
          <PostDetails {...this.props} />
        </Modal>
      </div>
    )    
  }
}

class HomePage extends React.Component {

  componentDidMount() {
    if (!this.props.posts.items)
      this.props.dispatch(postActions.getAll());
  }

  render() {
    const { dispatch, posts, authentication, user } = this.props;
    return (
      <section>
        <Title>Camagru ~</Title>
        <div className='homeContainer'>
        {posts && posts.items && posts.items.length > 0 ? (
          posts.items.map(post => {
            let allowMod = (user && (user.id === post.userId || user.role === 'admin')) ? true : false
            return <ListItem key={post.id} post={post} dispatch={dispatch} authentication={authentication} allowMod={allowMod} />
          }
        )) : (
          <h1>Loading posts...</h1>
        )}
        </div>
      </section>
    )
  }
}

const mapStateToProps = (state) => {
  const { authentication, posts } = state;
  const { user } = authentication;
  return {
    authentication,
    posts,
    user
  };
}
const connected = connect(mapStateToProps)(HomePage);
export { connected as HomePage };