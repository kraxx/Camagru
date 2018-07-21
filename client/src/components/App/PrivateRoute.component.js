import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { alertActions } from '../../actions';
import { constants } from '../../helpers';
 
const PrivateRouteUser = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    constants.STORAGE.getItem('user')
      ? <Component {...props} />
      : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
  )} />
)

const PrivateRouteAdmin = ({ component: Component, ...props }) => {	
	let user = JSON.parse(constants.STORAGE.getItem('user'));
	if (user && user.role === 'admin') {
		return <Route component={Component} />
	} else {
		return <Redirect to='/' />
	}
}

const mapStateToProps = (state) => {
	return {};
}

const connectedPrivateRouteUser = connect(mapStateToProps)(PrivateRouteUser);
const connectedPrivateRouteAdmin = connect(mapStateToProps)(PrivateRouteAdmin);

export {
	connectedPrivateRouteUser as PrivateRouteUser,
	connectedPrivateRouteAdmin as PrivateRouteAdmin
};