import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import LoggedIn from "./pages/LoggedIn";
import Signup from "./pages/Signup";
import SignupCounselor from "./pages/SignupCounselor";
import Dashboard from "./pages/Dashboard";
import Application from "./pages/Application";
import './styles/App.css';
import Cookies from 'js-cookie'
import { useSelector, useDispatch } from 'react-redux';

import Form from './components/questions/forms';

function App() {
  const loggedIn = useSelector(state => state.userStatus);
  const userType = useSelector(state => state.userType);

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
    dispatch({ type: 'LOGOUT' }); // sets global user state to logged out with Redux
  }

  return (
    <Router>

    <div>
      {/* Only make internal pages available if global state is Logged In -> true */}
        {loggedIn ?
            getPages(loggedIn, userType, logout, access)
          :
          <Switch>
            <Route path="/signup/counselor/:referral" component={SignupCounselor}/>
            <Route path="/signup" component={Signup}/>
            <Route path="/" component={Login}/>
          </Switch>
        }
    </div>
  </Router>
  );
}

function getPages(loggedIn, userType, logout, access) {
  console.log('loggedIn :>> ', loggedIn);
  console.log("getting pages");
  console.log('userType :>> ', userType);
  switch (userType) {
    case "USER":
      return (
        <Switch>
          <Route path="/users" component={WithNav}/>
          <Route path="/dashboard" component={WithNav}/>
          <Route path="/application" component={WithNav}/>
          <Route path="/" render={() => <WithNav logout={logout} cookies={access}/>}/>
        </Switch>
      )
      case "COUNSELOR":
        return (
          <Switch>
            <Route path="/users" component={WithNav}/>
            <Route path="/dashboard" component={WithNav}/>
            <Route path="/application" component={WithNav}/>
            <Route path="/" component={Counselors}/>
          </Switch>
      )
    default:
      return (
        <Switch>
          <Route path="/users" component={WithNav}/>
          <Route path="/dashboard" component={WithNav}/>
          <Route path="/application" component={WithNav}/>
          <Route path="/" render={() => <WithNav logout={logout} cookies={access}/>}/>
      </Switch>
      )
  }
}

function WithNav(props) {
  return (
    <div>
      <Navbar/>
      <Switch>
        <Route path="/reviewers" component={Reviewers}/>
        <Route path="/recommenders" component={Recommenders}/>
        <Route path="/users" component={Users}/>
        <Route path="/dashboard" component={Dashboard}/>
        <Route path="/application" component={Application}/>
        <Route path="/" render={() => <LoggedIn logout={props.logout} cookies={props.access}/>}/>
      </Switch>
    </div>
  );
}

function Counselors() {
  return <h3>Counselor Dashboard</h3>
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
