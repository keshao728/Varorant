
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PlayNow from './PlayNowModal';
import LogoutButton from '../auth/LogoutButton';
import logo from './NavImages/logo.png';
import './NavBar.css';

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className="nav-profile">
        <div>
          {sessionUser.username}
        </div>
        <div className="profile-dropdown">
          <div className='drop-profile-name'>
            {sessionUser.username}
          </div>
          <div className='drop-profile-button'>
            <LogoutButton> Logout </LogoutButton>
          </div>
        </div>
      </div>
    )
  } else {
    sessionLinks = (
      <>
        <PlayNow />
      </>
    );
  }

  return (
    <nav className='nav-mother'>
      <div className='nav-wrapper'>
        <div className='nav-left'>
          <div className='nav-home-wrapper'>
            <NavLink to='/' exact={true} activeClassName='active'>
              <div className='nav-home'>
                <div className="nav-home-logo" >
                  <img className='nav-home-individual-logo' src={logo} />
                </div>
                <div className='nav-home-name'>MEOWIT GAMES</div>
              </div>
            </NavLink>
          </div>
          <div className='nav-action'>
            <NavLink to='/media' exact={true} className="individual-action" activeClassName='active'>
              Media
            </NavLink>
            <NavLink to='/support' exact={true} className="individual-action" activeClassName='active'>
              Support
            </NavLink>

          </div>
        </div>
        <div className='nav-right'>
          {sessionLinks}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
