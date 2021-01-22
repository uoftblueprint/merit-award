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
  const [school, setSchool] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
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
    <div className="h-screen bg-blue-50 flex items-center justify-center">
      <div class="max-w-md flex flex-col p-4 sm:w-1/2 lg:w-1/3 border-2 rounded border-black">
        <div class="flex-1">
          <h2 class="text-gray-900 text-2xl font-bold leading-snug">
            Merit Award Bursary Program Application
          </h2>
        </div>
        <Form onSubmit={handleSubmit}>
          <Form.Group size="lg" controlId="school">
            <Form.Label>School</Form.Label>
            <Form.Control
              type="text"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="firstname">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="lastname">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
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
        <Link to="/login">Have an account? Sign in.</Link>
        <p>{signupState ? "Successfully signed up" : ""}</p>
      </div>
    </div>
  );
}

export default Signup;
