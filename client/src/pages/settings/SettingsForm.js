import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import "../../styles/login.css";
import { Field, Form, ErrorMessage, Formik } from "formik";
import * as yup from 'yup';

const loginValidation = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(2, 'Password too short.'),
  school: yup.string().required(),
  confirm: yup.boolean().oneOf([true], 'This checkbox must be checked.').required(),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], "Passwords don't match").required('Confirm Password is required')
})


const handleSubmit = async (values) => {
  try {
    console.log('values :>> ', values);
  } catch (err) {
    console.log('err :>> ', err);
  }
}

function SettingsForm(props) {
  const [initialValues, setInitialValues] = useState({})
  
  useEffect(() => {
    console.log('props :>> ', props);
    const values = {
      email: props.user.email || 'asdf',
      password: '',
      confirmPassword: '',
    }
    setInitialValues(values);
  }, [props.user]);

  

  return (
    <div>
      <Formik validationSchema={loginValidation} onSubmit={handleSubmit} initialValues={initialValues}>
        <Form>
          <h1>Personal Profile</h1>
          <div size="lg">
            <label htmlFor="firstName" className="block">First Name</label>
            <Field type="text" name="firstName"  />
            <ErrorMessage name={"firstName"} />
          </div>
          <div size="lg">
            <label htmlFor="lastName" className="block">Last Name</label>
            <Field type="text" name="lastName" />
            <ErrorMessage name={"lastName"} />
          </div>
          <div size="lg">
            <label htmlFor="email" className="block">Email</label>
            <Field type="text" name="email" placeholder="Email" />
            <ErrorMessage name={"email"} />
          </div>

          <h1>Change Password</h1>
          <div size="lg">
            <label htmlFor="password" className="block">Current Password</label>
            <Field size="lg" type="password" name="password" placeholder="Password" />
            <ErrorMessage name={"password"} />
          </div>
          <div size="lg">
            <label htmlFor="password" className="block">New Password</label>
            <Field size="lg" type="password" name="password" placeholder="Password" />
            <ErrorMessage name={"password"} />
          </div>
          <div size="lg">
            <label htmlFor="confirmPassword" className="block">Confirm New Password</label>
            <Field size="lg" type="password" name="confirmPassword" placeholder="Password" />
            <ErrorMessage name={"confirmPassword"} />
          </div>
          <button type="submit" className="indigo-button my-3">Sign Up</button>
        </Form>
      </Formik>
    </div>
  );
}

export default SettingsForm;
