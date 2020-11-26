import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import Login from "./components/login/Login"
import Signup from "./components/login/Signup"
import './App.css';
import utils from './utils';

function App() {

  function authenticate() {
    const params = { token: utils.token() };

    utils.post('/validateToken', params).then(({status, data}) => {
      if (!status) {
        console.log("Not a Valid Token");
        this.logout()
      }
    }).catch(console.log("oops"));
  }

  useEffect(() => {
    // authenticate()
  });

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
