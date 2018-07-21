import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Form } from '../common';
import { alertActions } from '../../actions';
import commentService from '../../services/comment.service.js';
import '../../../public/css/homepage.css';

const KEY_ENTER = 13;
const BLOCKEDFORNOW = false

const ListItem = ({ comment, dispatch, handleDelete }) => (
  <div className='commentEntry'>
    <p><span className='commentUsername'>{comment.username}</span>: {comment.text}</p>
    {BLOCKEDFORNOW &&
      <button onClick={ () => handleDelete(comment.id) }>Delete Comment</button>
    }
  </div>
)

const AddCommentBox = ({ handleSubmit, allowMod }) => (
  <form className='commentBoxContainer' onSubmit={(e) => handleSubmit(e)}>
    <textarea className='commentBox' name='text' placeholder='Comment...' rows={3} />
    <input className='camagruButton' type='submit' value='Comment' /> 
    {allowMod && 
      <button className='camagruButton postDeleteButton' onClick={ () => props.dispatch(postActions.deletePost(props.post.id)) }>Delete</button>
    }
  </form>
)

class CommentContainer extends Component {

	constructor(props) {
    super(props);
    this.state = {
      comments: []
    };
  }

  componentDidMount() {

    // This could be hella expensive...
    let commentBoxes = document.getElementsByClassName('commentBox');
    Array.from(commentBoxes).forEach(element =>
      element.addEventListener('keyup', this.handleKeyEnter)
    );

    commentService.getAllCommentsByPostId(this.props.post.id)
    .then(res => {
      if (res.ok) {
        this.setState({ comments: res.data });
      } else {
        this.props.dispatch(alertActions.error(res));
      }
    });
  }

  handleKeyEnter = (e) => {
    if (e.which === KEY_ENTER) {
      e.preventDefault();
      e.target.form.dispatchEvent(new Event("submit", {cancelable: true}));
    }
  }

  handleDeleteComment = (id) => {

    commentService.deleteComment(id)
    .then(res => {
      if (res.ok) {
        this.setState({
          comments: this.state.comments.filter(comment => comment.id !== id)
        });
      } else {
        this.props.dispatch(alertActions.error('Error deleting comment'));
      }
    });
  }

  handleAddComment = (e) => {
  	e.preventDefault();

  	const text = e.target.text.value;
  	e.target.text.value = "";

		if (text !== "") {
			const payload = {
				postId: this.props.post.id,
				text: text
			};

      commentService.addComment(payload)
      .then(res => {
        if (res.ok) {
          this.setState({ comments: [ ...this.state.comments, res.data ]})
        } else {
          this.props.dispatch(alertActions.error('Error posting comment'));
        }
      });
		} 
  }

  render() {
	  const { authentication, post, allowMod, dispatch } = this.props;
	  return (
	  	<div>
	  		{this.state.comments.length > 0 ? (
          <div className='commentList'>
          {this.state.comments.map(comment =>
            <ListItem key={comment.id} comment={comment} dispatch={dispatch} handleDelete={this.handleDeleteComment}/>
          )}
          </div>
        ) : (
          <div className='commentList'>
            <p>No comments, yet</p>
          </div>
        )}
        {authentication.loggedIn ? (
          <AddCommentBox handleSubmit={this.handleAddComment} allowMod={allowMod} />
        ) : (
          <p>Sign in to comment!</p>
        )}
	  	</div>
	  )  	
  }
}

const mapStateToProps = (state) => {
  return {};
}
const connected = connect(mapStateToProps)(CommentContainer);

export { connected as CommentContainer };