import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "../styles/login.css";
import {useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { apiSignup } from "../api/auth";

function Signup() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validate, setValidate] = useState("");
  const [signupState, setSignUpState] = useState(false);
  const history = useHistory();

  function validateForm() {
    return email.length > 0 && password.length > 0 && validatePassword();
  }

  function validatePassword() {
    return password === validate;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
        await apiSignup(email, password);
        dispatch({ type: 'LOGIN' });
    } catch (err) {
        console.log(err);
    } 
  }

  return (
    <div className="login">
      <h1> MERIT AWARD </h1>
      <Form onSubmit={handleSubmit}>
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
    </div>
  );
}

export default Signup;