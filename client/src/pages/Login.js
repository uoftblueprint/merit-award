import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useHistory } from "react-router-dom";
import "../styles/login.css";
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';

import utils from '../utils';

function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(['auth_token']);

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    // don't bother with login if we already have a valid token
    if (cookies.auth_token) {
      dispatch({ type: 'LOGIN' });
      return true;
    }

    let params = {
      email: email,
      password: password
    }

    utils.post('/login', params)
      .then((response) => response.data)
      .then(result => {
        if (result.error) {
          console.log(result.error)
        } else if (typeof result !== "undefined") {
          // this is the jwt
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

  function getUsers() {
    removeCookie('auth_token', {path: "/"})
    removeCookie('refresh_token', {path: "/"})
    utils.get('/users').then((response) => {
      console.log('response :>> ', response);
    });
  }

  return (
    <div className="login">
      <h1> MERIT AWARD </h1>
      <Button onClick={() => getUsers()}>
        GET USERS & Reset Cookies
      </Button>
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Login
        </Button>
      </Form>
      <Link to="/signup">Signup</Link>
      <p>Current auth token in cookies: "{cookies.auth_token}"</p>
    </div>
  );
}

export default Login;