import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from "react-router-dom";
import "../styles/login.css";
import {useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { apiSignup } from "../api/auth";
import { Field, Form, withFormik, ErrorMessage } from "formik";
import * as Yup from 'yup';


function Signup() {
  // const dispatch = useDispatch();
  const [signupState, setSignUpState] = useState(false);
  const history = useHistory();

  return (
    <div className="login">
      <h1 className="bg-gray-500 text-orange"> MERIT AWARD </h1>
      <Form>
        <div size="lg">
          <label htmlFor="email" className="block">Email</label>
          <Field type="text" name="email" placeholder="Email" />
          <ErrorMessage name={"email"} />
        </div>
        <div size="lg">
          <label htmlFor="password" className="block">Password</label>
          <Field size="lg" type="password" name="password" placeholder="Password" />
          <ErrorMessage name={"password"} />
        </div>
        <div size="lg">
          <label htmlFor="password" className="block">Password</label>
          <Field size="lg" type="password" name="password" placeholder="Password" />
          <ErrorMessage name={"password"} />
        </div>
        <button type="submit" className="indigo-button my-3">Login</button>
      </Form>

      {/* <h1> MERIT AWARD </h1>
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
      </Form> */}

      <Link to="/">Login</Link>
    </div>
  );
}

const signupValidation = Yup.object().shape({
  email: Yup.string().label('Email').email().required(),
  password: Yup
    .string()
    .label('Password')
    .required()
    .min(2, 'Password too short.')
});

const SignupFormik = withFormik({
  handleSubmit: async (values) => {
    try {
      await apiSignup(values.email, values.password);
      // dispatch({ type: 'LOGIN' });
      dispatchEvent({ type: 'LOGIN '});
    } catch (err) {
      console.log('err :>> ', err);
    }
  }, validationSchema: signupValidation
})(Signup)

export default SignupFormik;