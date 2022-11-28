import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUp/SignUpForm';
import NavBar from './components/Navigation/NavBar';
// import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/User/UsersList';
import User from './components/User/User';
import Home from './components/Home/Home';
import UserTickets from './components/UserTickets/UserTickets';
import Support from './components/Support/Support';
import AllTicket from './components/TicketPage/AllTicket';
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
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <Route path='/users/:userId' exact={true} >
          <User />
        </Route>
        <Route path='/' exact={true} >
          <NavBar />
          <Home />
        </Route>
        <Route path='/support'>
          <NavBar />
          <Support />
        </Route>
        <Route exact path='/tickets'>
          <NavBar />
          <AllTicket />
        </Route>
        <Route path='/tickets/new'>
          <NavBar />
          <TicketForm />
        </Route>
        <Route path='/tickets/my-tickets'>
          <NavBar />
          <UserTickets />
        </Route>
      </Switch>

    </BrowserRouter>
  );
}

export default App;
