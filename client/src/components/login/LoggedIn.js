import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import "../../styles/login.css";
import { useCookies } from 'react-cookie';
import utils from '../../utils';

function Login() {
  const [cookies, removeCookie] = useCookies(['auth_token']);

  function logOut() {
    removeCookie('auth_token');
  }

  return (
    <div className="loggedInTest">
      <h1>Ay you're loggged IN</h1>
      <h1>welcome 2 the club</h1>
      <h2>hola</h2>
    </div>
  );
}

export default Login;
