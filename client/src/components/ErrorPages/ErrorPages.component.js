import React from 'react';
import { Title } from '../common';
import { history } from '../../helpers';

export const BadToken = () => (
	<div>
		<Title>ur token is bad</Title>
	</div>
)

export const ServerIssue = () => (
	<div>
		<Title>five oh OH</Title>
		<h3>sry our servers are bad</h3>
	</div>
)

export const UnknownUrl = () => (
	<div>
		<Title>four oh four</Title>
    	<h3>u got lost</h3>
	</div>
)

export const VerifiedUser = () => {
	setTimeout(() => history.push('/login'), 5000);
	return (
		<div>
			<Title>Verified!</Title>
			<h3>ur all gud to go :)</h3>
		</div>
	)
}