import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useHistory } from "react-router-dom";
import "../styles/login.css";
import { useDispatch } from 'react-redux';
import { apiLogin } from "../api/auth";

function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await apiLogin(email, password);
      dispatch({ type: 'LOGIN' });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="login">
      <h1 className="bg-gray-500 text-orange"> MERIT AWARD </h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="text"
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
        <button
          block size="lg"
          className="indigo-button my-3"
          onClick={!validateForm()}>
          Login
        </button>
      </Form>
      <Link className="outline-button m-auto" to="/signup">Signup</Link>
    </div>
  );
}

export default Login;
