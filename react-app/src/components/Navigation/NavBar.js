
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PlayNow from './PlayNowModal';
import LogoutButton from '../auth/LogoutButton';

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user);
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);



  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div>
        <div
          onClick={openMenu}>
          {/* USERNAME */}
          HERE
        </div>
        {showMenu && (
          <div className="profile-dropdown">
            <LogoutButton> Logout </LogoutButton>
          </div>
        )
        }
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
    <nav>
      <div>
        <div>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </div>
        <div>
          <NavLink to='/support' exact={true} activeClassName='active'>
            Support
          </NavLink>
        </div>
        <div>
          {sessionLinks}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
