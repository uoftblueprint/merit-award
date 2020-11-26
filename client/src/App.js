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
import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';

function App() {
  const loggedIn = useSelector(state => state.userStatus);
  const dispatch = useDispatch();
  const [cookies, removeCookie] = useCookies(['auth_token']);

  useEffect(() => {
    authenticate();
  });

  function authenticate() {
    if (cookies.auth_token) {
      dispatch({ type: 'logIn' }); // sets global user state to logged in with Redux
      // redirect to loggedIn page
    }

    // FINISH IMPLEMENTING THIS
    // try {
    //   const { exp } = decode(refreshToken);
    //
    //   if (Date.now() >= exp * 1000) {
    //     logout();
    //   } else {
    //     // authenticate with JWT refresh token after expiry
    //     const params = { token: cookies.auth_token };
    //
    //     utils.post('/validateToken', params).then(({status, data}) => {
    //         if (!status) {
    //         console.log("Not a Valid Token");
    //         logout();
    //       } else {
    //         history.push("/loggedIn");
    //       }
    //     });
    //
    //   }
    // } catch (err) {
    //   logout();
    // };
  }

  function logout() {
    removeCookie('auth_token');
    dispatch({ type: 'logOut' }); // sets global user state to logged out with Redux
  }

  return (
    <Router>

    <div>
      {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
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
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/loggedin">
          <LoggedIn  logout={logout} cookies={cookies.auth_token}/>
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
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
