import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "../styles/login.css";
import { useCookies } from 'react-cookie';

import utils from '../utils';

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validate, setValidate] = useState("");
  const [signupState, setSignUpState] = useState(false);
  const [cookies, setCookie] = useCookies(['auth_token']);

  function validateForm() {
    return email.length > 0 && password.length > 0 && username.length > 0 && validatePassword();
  }

  function validatePassword() {
    return password === validate;
  }

  function handleSubmit(event) {
    event.preventDefault();

    let params = {
      username: username,
      email: email,
      password: password
    }

    utils.post('/users', params)
      .then((response) => {
        if (response.jwtToken) {
          // this is the jwt
          let token = response.jwtToken;

          setCookie('auth_token', token, { path: '/' });
          setSignUpState(true);
        }
      }).catch(err => {
        console.log(err);
      });
  }

  return (
    <div className="login">
      <h1> MERIT AWARD </h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            autoFocus
            type="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
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
        <Form.Group size="lg" controlId="validate">
          <Form.Label>Validate Password</Form.Label>
          <Form.Control
            type="password"
            value={validate}
            onChange={(e) => setValidate(e.target.value)}
          />
        </Form.Group>

        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Sign Up
        </Button>
      </Form>
      <Link to="/">Login</Link>
      <p>{signupState ? "Successfully signed up" : ""}</p>
      <p>Current cookies: {cookies.auth_token}</p>
    </div>
  );
}

export default Signup;
