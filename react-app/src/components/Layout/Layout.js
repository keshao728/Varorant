import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../Navigation/NavBar';

function Layout() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}

export default Layout;
