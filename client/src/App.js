import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from "./pages/Login";
import LoggedIn from "./pages/LoggedIn";
import Signup from "./pages/Signup";
import './styles/App.css';
import Cookies from 'js-cookie'
import { useSelector, useDispatch } from 'react-redux';

import Form from './components/questions/forms';

function App() {
  const loggedIn = useSelector(state => state.userStatus);
  const [access, setAccess] = useState(undefined);
  const dispatch = useDispatch();
  useEffect(() => {
    authenticate();
  });

  const authenticate = () => {
    let access = Cookies.get('access');
    if (access && access !== undefined) {

      setAccess(access);
      dispatch({ type: 'LOGIN' });
    } else {
      logout();
    }
  }

  function logout() {
    Cookies.remove('access');
    dispatch({ type: 'logOut' }); // sets global user state to logged out with Redux
  }

  return (
    <Router>

    <div>
      {/* Only make internal pages available if global state is Logged In -> true */}
        {loggedIn ?
          <Switch>
            <Route path="/reviewers">
              <Reviewers />
            </Route>
            <Route path="/recommenders">
              <Recommenders />
            </Route>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/">
              <LoggedIn logout={logout} cookies={access}/>
            </Route>
          </Switch>
          :
          <Switch>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/">
              <Login />
            </Route>
          </Switch>
        }
    </div>
  </Router>
  );
}

function Reviewers() {
  return <h2>Reviewer Dashboard</h2>;
}

function Recommenders() {
  return <h2>Recommender Dashboard</h2>;
}

function Users() {
  return (<div>
      <h2>
        User Dashboard
      </h2>
      <Form />
    </div>);
}

export default App;
