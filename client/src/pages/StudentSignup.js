import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/login.css";
import { useDispatch } from 'react-redux';
import { apiSignup } from "../api/auth";
import { Field, Form, ErrorMessage, Formik } from "formik";
import { Dropdown } from "../components/questions/forms";
import * as yup from 'yup';
import { getSchools } from "../api/application";

function StudentLogin() {
  const [schoolNames, setSchoolNames] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      const schoolNames = await getSchools();
      setSchoolNames(schoolNames);
    }
    try {
      getData();
    } catch (err) {
      console.log('err :>> ', err);
    }
  })

  const loginValidation = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required().min(2, 'Password too short.'),
    school: yup.string().required(),
    confirm: yup.boolean().oneOf([true], 'This checkbox must be checked.').required(),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], "Passwords don't match").required('Confirm Password is required')
  })

  const initialValues = {
    email: '',
    password: '',
    confirmPassword: '',
    school: '',
    confirm: ''
  }

  const handleSubmit = async (values) => {
    try {
      await apiSignup(values.email, values.password, values.school);
      dispatch({ type: 'LOGIN' });
    } catch (err) {
      console.log('err :>> ', err);
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
          <div size="lg">
            <label htmlFor="confirmPassword" className="block">Confirm Password</label>
            <Field size="lg" type="password" name="confirmPassword" placeholder="Password" />
            <ErrorMessage name={"confirmPassword"} />
          </div>
          <div size="lg">
            <Dropdown name="school" options={schoolNames} />
          </div>
          <div size="lg">
            <label htmlFor="confirm" className="block">By checking this box, you are confirming that you are a student at this school.</label>
            <Field type="checkbox" name="confirm" />
            <ErrorMessage name="confirm" />
          </div>
          <button type="submit" className="indigo-button my-3">Sign Up</button>
        </Form>
      </Formik>
      
      <Link className="outline-button m-auto" to="/">Login</Link>
    </div>
  );
}

export default StudentLogin;
