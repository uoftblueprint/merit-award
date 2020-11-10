import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import './App.css';

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

function Login() {
  return (
    <div>
        <h1>Login</h1>
        <form>
            <div>
                <p>Username:</p>
                <input type="text" name="username" />
            </div>
            <div>
                <p>Password:</p>
                <input type="password" name="password" />
            </div>
            <Link to="/users"><button>User</button></Link>
            <Link to="/recommenders"><button>Recommender</button></Link>
            <Link to="/reviewers"><button>Reviewer</button></Link>
        </form>
    </div>
  );
}
export default App;
