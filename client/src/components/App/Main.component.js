import React, { Component, PropTypes } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import {
  AdminPage,
  HomePage,
  LoginPage,
  RegisterPage,
  VerifyUserPage,
  ResetPasswordPage,
  CamPage,
  UserSettingsPage
} from '../index.js';

import { UnknownUrl, ServerIssue, BadToken, VerifiedUser } from '../ErrorPages';
import { PrivateRouteUser, PrivateRouteAdmin } from './PrivateRoute.component.js';
import AboutPage from './AboutPage.component.js';

import '../../../public/css/main.css';

const Main = () => (
  <main className='mainContainer'>
    <Switch>
      <Route exact path='/' component={HomePage} />
      <Route path='/login' component={LoginPage} />
      <Route path='/register' component={RegisterPage} />
      <Route path='/register' component={RegisterPage} />
      <Route path='/about' component={AboutPage} />
      <PrivateRouteUser path='/camera' component={CamPage} />
      <PrivateRouteUser path='/settings' component={UserSettingsPage} />
      <PrivateRouteAdmin path='/admin' component={AdminPage} />
      <Route path='/invalid_token' component={BadToken} />
      <Route path='/server_issue' component={ServerIssue} />
      <Route path='/verified_user' component={VerifiedUser} />
      <Route path='/verify' component={VerifyUserPage} />
      <Route path='/reset_password' component={ResetPasswordPage} />
      <Route component={UnknownUrl} />
    </Switch>
  </main>
);

export default Main;