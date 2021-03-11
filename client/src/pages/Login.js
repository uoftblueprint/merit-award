import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/login.css";
import { useDispatch } from 'react-redux';
import { apiLogin } from "../api/auth";
import { Field, Form, ErrorMessage, Formik } from "formik";
import * as yup from 'yup';

function Login() {
  const dispatch = useDispatch()
  const [errorMessage, setErrorMessage] = useState("");

  const loginValidation = yup.object().shape({
    email: yup
      .string()
      .email()
      .required(),
    password: yup
      .string()
      .required(),
  })

  const initialValues = {
    email: '',
    password: '',
  }

  const handleSubmit = async (values) => {
    const error = await apiLogin(values.email, values.password);
    if (error) {
      setErrorMessage(error.err);
    } else {
      dispatch({ type: 'LOGIN'});
    }
  }

  return (
    <div className="login">
      <h1 className="bg-gray-500 text-orange"> MERIT AWARD </h1>
      <Formik validationSchema={loginValidation} onSubmit={handleSubmit} initialValues={initialValues}>
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
          <div className="text-red">
            {errorMessage}
          </div>
          <button type="submit" className="indigo-button my-3">Login</button>
        </Form>
      </Formik>
      
      <Link className="outline-button m-auto" to="/signup">Signup</Link>
    </div>
  );
}

export default Login;
