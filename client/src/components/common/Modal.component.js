import React, { Component } from 'react';
import '../../../public/css/modal.css';

const KEY_ESC = 27

export class Modal extends Component {

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		document.addEventListener('mousedown', this.handleClickOutside);
		document.addEventListener('keyup', this.handleKeyEsc);
	}

	componentWillUnmount() {
		document.removeEventListener('mousedown', this.handleClickOutside);
		document.removeEventListener('keyup', this.handleKeyEsc);
	}

	setWrapperRef = (node) => {
		this.wrapperRef = node;
	}

	handleClickOutside = (e) => {
		if (this.wrapperRef && !this.wrapperRef.contains(e.target)) {
			this.props.handleClose();
		}
	}

	handleKeyEsc = (e) => {
		if (e.keyCode === KEY_ESC) {
			this.props.handleClose();
		}
	}
	
	render() {
		const { handleClose, show, children } = this.props;
		const showHideClassName = show ? 'modal display-block' : 'modal display-none';
		return (
			<div className={showHideClassName}>
				<section className='modal-main' ref={this.setWrapperRef}>
					{children}
				</section>
			</div>
		);
	}
}