import React, { Component } from 'react';
import { alertActions, postActions } from '../../actions';
import { CommentContainer } from './CommentContainer.component.js';

const PostDetails = (props) => (
  <div className='deetsContainer'>
  	<div className='deetsPhotoContainer'>
    	<img className='deetsPhoto' src={props.post.sourceUrl} />
    </div>
    <div className='deetsInfoContainer'>
    	<div className='deetsTitle'>
	    	<h1>{props.post.description ? props.post.description : 'untitled'} posted by {props.post.username}</h1>
	    	<hr />
	    </div>
	    <CommentContainer {...props} />
    </div>
  </div>
)   

export { PostDetails };