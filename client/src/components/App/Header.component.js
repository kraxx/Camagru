import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { userActions } from '../../actions';
import '../../../public/css/header.css';

const Header = ({ authentication, user, dispatch }) => (
  <header>
    <nav className='navbar'>
      <ul className='navbarUl'>
        <li className='navbarLi'><Link className='navbarLiLink' to='/'>Home</Link></li>
        {authentication && authentication.loggedIn
          ? <span>
              <li className='navbarLi'><Link className='navbarLiLink' to='/camera'>Camera</Link></li>
              <li className='navbarLi'><Link className='navbarLiLink' to='/settings'>Settings</Link></li>
              <li className='navbarLi'><a className='navbarLiLink' href="/login" onClick={() => dispatch(userActions.logout())}>Logout</a></li>
            </span>
          : <span>
              <li className='navbarLi'><Link className='navbarLiLink' to='/login'>Login</Link></li>
            </span>
        }
        {user && user.role === 'admin' && 
          <li className='navbarLi'><Link className='navbarLiLink' to='/admin'>Admin Panel</Link></li>
        }
      </ul>
      {authentication && authentication.loggedIn
        ? <div className='statusBar'>Hello {user.username}!</div>
        : <div className='statusBar'>Not logged in</div>
      }
      <li className='navbarLi'><Link className='navbarLiLink' to='/about'>About</Link></li>
    </nav>
  </header>
)

const mapStateToProps = (state) => {
  const { authentication } = state;
  const { user } = authentication;
  return {
    authentication,
    user
  };
}
export default connect(mapStateToProps)(Header);