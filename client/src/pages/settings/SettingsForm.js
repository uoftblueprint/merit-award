import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import "../../styles/login.css";
import { Field, Form, ErrorMessage, Formik } from "formik";
import { Dropdown } from "../../components/questions/forms";
import * as yup from 'yup';
import { getSchools } from "../../api/application";

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
  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    school: '',
    currPassword: '',
    newPassword: '',
    confirmPassword: '',
  }
  const [initialValues, setInitialValues] = useState(defaultValues)
  const [schoolNames, setSchoolNames] = useState([]);

  
  const getSchoolData = async () => {
    const schoolNames = await getSchools();
    setSchoolNames(schoolNames);
  }
  
  useEffect(() => {
    if (schoolNames.length == 0) {
      try {
        getSchoolData();
      } catch (err) {
        console.log('err :>> ', err);
      }
    }
    console.log('props.user :>> ', props.user);
    const newValues = {...defaultValues, email: props.user.email};
    console.log('newValues :>> ', newValues);
    
    setInitialValues(newValues);
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
          
          <div size="lg">
            <label htmlFor="school" className="block">School</label>
            <Dropdown name="school" options={schoolNames} />
          </div>

          <h1>Change Password</h1>
          <div size="lg">
            <label htmlFor="currPassword" className="block">Current Password</label>
            <Field size="lg" type="currPassword" name="currPassword" placeholder="currPassword" />
            <ErrorMessage name={"currPassword"} />
          </div>
          <div size="lg">
            <label htmlFor="newPassword" className="block">New Password</label>
            <Field size="lg" type="newPassword" name="newPassword" placeholder="newPassword" />
            <ErrorMessage name={"newPassword"} />
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
