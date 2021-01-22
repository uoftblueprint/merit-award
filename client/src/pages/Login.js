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
    <div className="h-screen bg-blue-50 flex items-center justify-center">
      <div class="max-w-md flex flex-col p-4 sm:w-1/2 lg:w-1/3 border-2 rounded border-black">

        <div class="flex-1">
          <h2 class="text-gray-900 text-2xl font-bold leading-snug">
            Merit Award Bursary Program Application
          </h2>
        </div>
     
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
          <div class="flex-1">
            <Link to="/">Forgot Password?</Link>
          </div>
          <Button block size="lg" type="submit" disabled={!validateForm()}>
            Sign In
          </Button>
        </Form>

      </div>
    </div>
  );
}

export default Login;

