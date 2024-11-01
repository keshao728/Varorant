import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../Navigation/NavBar';
import Footer from '../Navigation/Footer';

function Layout() {
  return (
    <>
      <NavBar />
      <Outlet />
<Footer />
    </>
  );
}

export default Layout;
