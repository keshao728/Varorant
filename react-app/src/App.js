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
import Layout from './components/Layout/Layout';

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

        <Route element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='/support' element={<Support />} />
          <Route path='/tickets' element={<AllTicket />} />
          <Route path='/tickets/new' element={<TicketForm />} />
          <Route path='/tickets/my-tickets' element={<UserTickets />} />
          <Route path='/tickets/:ticketId' element={<SingleTicket />} />
          <Route path='/media' element={<AllMedia />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
