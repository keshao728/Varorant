import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUp/SignUpForm';
import NavBar from './components/Navigation/NavBar';
// import ProtectedRoute from './components/auth/ProtectedRoute';
import User from './components/User/User';
import Home from './components/Home/Home';
import UserTickets from './components/UserTickets/UserTickets';
import Support from './components/Support/Support';
import AllTicket from './components/AllTickets/AllTicket';
import SingleTicket from './components/SingleTicket/SingleTicket';
import AllMedia from './components/AllMedia/AllMedia';
import TicketForm from './components/TicketForm/TicketForm';
import { authenticate } from './store/session';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginForm />} />
        <Route path='/sign-up' element={<SignUpForm />} />
        <Route path='/users/:userId' element={<User />} />

        <Route path='/' element={
          <>
            <NavBar />
            <Home />
          </>
        } />

        <Route path='/support' element={
          <>
            <NavBar />
            <Support />
          </>
        } />

        <Route path='/tickets' element={
          <>
            <NavBar />
            <AllTicket />
          </>
        } />

        <Route path='/tickets/new' element={
          <>
            <NavBar />
            <TicketForm />
          </>
        } />

        <Route path='/tickets/my-tickets' element={
          <>
            <NavBar />
            <UserTickets />
          </>
        } />

        <Route path='/tickets/:ticketId' element={
          <>
            <NavBar />
            <SingleTicket />
          </>
        } />

        <Route path='/media' element={
          <>
            <NavBar />
            <AllMedia />
          </>
        } />

        <Route path="*" element={
          <>
            <NavBar />
            <Home />
          </>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
