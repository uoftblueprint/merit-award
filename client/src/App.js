import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from "./pages/Login";
import LoggedIn from "./pages/LoggedIn";
import Signup from "./pages/Signup";
import './App.css';
import utils from './utils';
import jwt_decode from "jwt-decode";
import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';

function App() {
  const loggedIn = useSelector(state => state.userStatus);
  const dispatch = useDispatch();
  const [cookies, setCookie, removeCookie] = useCookies(['auth_token']);

  useEffect(() => {
    authenticate();
  });

  function authenticate() {
    if (cookies.auth_token && cookies.auth_token !== undefined) {
      let decoded = jwt_decode(cookies.auth_token);

      if (Date.now() >= decoded.exp * 1000) {
        refresh(); // get refresh token if current time is greater than JWT expiry time
      } else {
        dispatch({ type: 'LOGIN' }); // sets global user state to logged in with Redux
      }
    } else {
      logout();
    }
  }

  function refresh() {
    utils.refresh('/refresh')
      .then(response => {
        if (typeof response !== "undefined") {
          let result = response.data;
          let token = result.jwtToken;
          let refresh = result.refreshToken;

          setCookie('auth_token', token, { path: '/' });
          setCookie('refresh_token', refresh, { path: '/' });
          dispatch({ type: 'LOGIN' });
        }
      }).catch(err => {
        console.log(err);
      });
  }

  function logout() {
    removeCookie('auth_token');
    removeCookie('refresh_token');
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
              <LoggedIn refresh={refresh} logout={logout} cookies={cookies.auth_token}/>
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
  return <h2>User Dashboard</h2>;
}

export default App;
