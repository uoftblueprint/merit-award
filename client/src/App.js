import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Settings from "./pages/settings/Settings";
import Dashboard from "./pages/Dashboard";
import Student from './pages/application/Student';
import References from "./pages/References";
import './styles/App.css';
import Cookies from 'js-cookie'
import { useSelector, useDispatch } from 'react-redux';
import StudentLogin from './pages/StudentSignup';

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
            <Route path="/reviewers" component={WithNav}/>
            <Route path="/recommenders" component={WithNav}/>
            <Route path="/users" component={WithNav}/>
            <Route path="/dashboard" render={() => <WithNav logout={logout} cookies={access}/>}/>
            <Route path="/application" component={WithNav}/>
            <Route path="/references" component={WithNav}/>
            <Route path="/settings" render={() => <WithNav logout={logout} cookies={access}/>}/>
            <Route exact path="/" render={() => <WithNav logout={logout} cookies={access}/>}/>
          </Switch>
          :
          <Switch>
            <Route path="/signup" component={StudentLogin} />
            <Route path="/" component={Login}/>
          </Switch>
        }
    </div>
  </Router>
  );
}

function WithNav(props) {
  return (
    <div className="pt-18">
      <Navbar/>
      <Switch>
        <Route path="/reviewers" component={Reviewers}/>
        <Route path="/recommenders" component={Recommenders}/>
        <Route path="/users" component={Users}/>
        <Route path="/dashboard" render={() => <Dashboard logout={props.logout} cookies={props.access}/>}/>
        <Route path="/application" component={Student}/>
        <Route path="/references" component={References}/>
        <Route path="/settings" render={() => <Settings logout={props.logout} cookies={props.access}/>}/>
        <Route exact path="/" render={() => <Dashboard logout={props.logout} cookies={props.access}/>}/>
      </Switch>
    </div>
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
    </div>);
}

export default App;
