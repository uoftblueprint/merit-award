import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { Link, useHistory } from "react-router-dom";
import "../styles/login.css";
import { useDispatch } from 'react-redux';
import { apiLogin } from "../api/auth";
import { Field, Form, withFormik, ErrorMessage } from "formik";
import * as Yup from 'yup';

function Login() {
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
        <button type="submit" className="indigo-button my-3">Login</button>
      </Form>
      <Link className="outline-button m-auto" to="/signup">Signup</Link>
    </div>
  );
}

const LoginValidation = Yup.object().shape({
  email: Yup
    .string()
    .email()
    .required(),
  password: Yup
    .string()
    .required(),
})

const LoginFormik = withFormik({
  handleSubmit: async (values) => {
    try {
      await apiLogin(values.email, values.password);
      dispatchEvent({ type: 'LOGIN '});
    } catch (err) {
      console.log('err :>> ', err);
    }
  }, validationSchema: LoginValidation
})(Login)

export default LoginFormik;
