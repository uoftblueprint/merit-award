import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from "react-router-dom";
import "../styles/login.css";
import { useDispatch } from 'react-redux';
import { apiSignup } from "../api/auth";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as yup from 'yup';


function Signup() {
  const dispatch = useDispatch();

  const initialValues = {
    email: '',
    password: '',
    confirmPassword: ''
  }

  const handleSubmit = async (values) => {
    try {
      await apiSignup(values.email, values.password);
      dispatch({ type: 'LOGIN' });
    } catch (err) {
      console.log('err :>> ', err);
    }
  }

  const signupValidation = yup.object().shape({
    email: yup.string().label('Email').email().required(),
    password: yup
      .string()
      .label('Password')
      .required()
      .min(2, 'Password too short.'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], "Passwords don't match").required('Confirm Password is required')
  });

  return (
    <div className="login">
      <h1 className="bg-gray-500 text-orange"> MERIT AWARD </h1>
      <Formik validationSchema={signupValidation} onSubmit={handleSubmit} initialValues={initialValues}>
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
            <label htmlFor="confirmPassword" className="block">Confirm Password</label>
            <Field size="lg" type="password" name="confirmPassword" placeholder="Password" />
            <ErrorMessage name={"confirmPassword"} />
          </div>
          <button type="submit" className="indigo-button my-3">Sign Up</button>
        </Form>
      </Formik>
      <Link to="/">Login</Link>
    </div>
  );
}


export default Signup;