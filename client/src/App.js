import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import './App.css';

import Login from './pages/Login';

function App() {

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
