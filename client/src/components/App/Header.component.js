import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { history } from '../../helpers';
import { userActions } from '../../actions';
import '../../../public/css/header.css';

const menuIcon = require('../../../public/icons/menu.png');

const HeaderListItem = ({ title, dest, responsive, active, callback }) => {
  let className = 'navbarLi';
  if (responsive) {
    className += ' responsive';
  }
  if (active) {
    className += ' active';
  }
  return (
    <li className={className} onClick={ () => callback() }>
      <Link className='navbarLiLink' to={dest}>{title}</Link>
    </li>
  )
}

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      responsive: false,
      currentTab: history.location.pathname
    }
  }

  updateCurrentTab = () => {
    this.setState({
      responsive: false,
      currentTab: history.location.pathname
    });
  }

  render() {
    const { authentication, user, dispatch } = this.props;
    const responsive = this.state.responsive;
    return (
      <header>
        <nav className='navbar'>

          <li className='navbarLi expander' onClick={ () => this.setState({ responsive: !this.state.responsive }) } >
            <div className='navbarLiLink'>
              <img src={menuIcon} alt='menu' />
            </div>
          </li>

          <ul className='navbarUl'>
            <HeaderListItem title='Home' dest='/' responsive={this.state.responsive} active={this.state.currentTab === '/'} callback={ () => this.updateCurrentTab() } />
            {authentication && authentication.loggedIn
              ? <span>
                  <HeaderListItem title='Camera' dest='/camera' responsive={this.state.responsive} active={this.state.currentTab === '/camera'} callback={ () => this.updateCurrentTab() } />
                  <HeaderListItem title='User Settings' dest='/settings' responsive={this.state.responsive} active={this.state.currentTab === '/settings'} callback={ () => this.updateCurrentTab() } />
                  <li className='navbarLi'>
                    <a className='navbarLiLink' href="/login" onClick={() => dispatch(userActions.logout())}>Logout</a>
                  </li>
                </span>
              : <HeaderListItem title='Login' dest='/login' responsive={this.state.responsive} active={this.state.currentTab === '/login'} callback={ () => this.updateCurrentTab() } />
            }
            {user && user.role === 'admin' && 
              <HeaderListItem title='Admin Panel' dest='/admin' responsive={this.state.responsive} active={this.state.currentTab === '/admin'} callback={ () => this.updateCurrentTab() } />
            }
          </ul>

          <HeaderListItem title='About' dest='/about' responsive={this.state.responsive} active={this.state.currentTab === '/about'} callback={ () => this.updateCurrentTab() } />

          {authentication && authentication.loggedIn
            ? <div className='statusBar'>Hello {user.username}!</div>
            : <div className='statusBar'>Not logged in</div>
          }

        </nav>
      </header>
    )
  }
}

const mapStateToProps = (state) => {
  const { authentication } = state;
  const { user } = authentication;
  return {
    authentication,
    user
  };
}
export default connect(mapStateToProps)(Header);