import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import "../styles/login.css";

function Login(props) {
  return (
    <div className="loggedInTest">
      <h1>Ay you're loggged IN</h1>
      <h1>welcome 2 the club</h1>
      <h2>{props.cookies}</h2>
      <Link to="/" onClick={() => props.logout()}>LOGOUT</Link>
    </div>
  );
}

export default Login;
