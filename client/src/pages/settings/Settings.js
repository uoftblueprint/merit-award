import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import "../../styles/login.css";
import { useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
import { Field, Form, ErrorMessage, Formik } from "formik";

import { updateUser, updateUserPassword, getUserInfo } from '../../api/user'
import * as yup from 'yup';
import ProfileForm from "./ProfileForm";
import NotificationsForm from "./NotificationsForm";

  
const defaultValues = {
  firstName: '',
  lastName: '',
  email: '',
  school: '',
  currPassword: '',
  newPassword: '',
  confirmPassword: '',
  passwordButton: false
}

const loginValidation = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  school: yup.string().required(),
  currPassword: yup.string().min(2, 'Password too short.').default('').notRequired(),
  newPassword: yup.string().when('currPassword', {
    is: (currPassword) => currPassword.length > 0,
    then: yup.string().required("New password is required.")
  }),
  confirmPassword: yup.string().when('currPassword', {
    is: (currPassword) => currPassword.length > 0,
    then: yup.string().oneOf([yup.ref('newPassword'), null], "Passwords don't match")
             .required('Confirm password is required.')
  }),
});

function Settings(props) {
  const dispatch = useDispatch();

  const [profileSettings, setProfileSettings] = useState(true);
  const [isLoading, setLoading] = useState(true);
  const [formData, setFormData] = useState(defaultValues);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      setFormData({});
      const data = await getUserInfo();
      const user = data.user;
      setFormData({
        ...formData,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        school: data.student.school
      });
      setLoading(false);
     }
     try {
      getData();
     } catch (e) {
      dispatch({ type: 'LOGOUT' });
     }
  }, []);

  const handleSubmit = async (values) => {
    if (values.passwordButton) {
      updateUserPassword({ currPassword: values.currPassword, newPassword: values.newPassword });
    } else {
      updateUser({ 
        firstName: values.firstName, 
        lastName: values.lastName, 
        email: values.email, 
        school: values.school
      });
    }
  }

  const getSettingsPage = (setFieldValue, handleSubmit) => {
    return profileSettings ? <ProfileForm setFieldValue={setFieldValue} handleSubmit={handleSubmit} /> : <NotificationsForm />;
  }

  return (
    <div className="mt-32 min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 bg-superlightgray">
      <div>
        <button onClick={() => setProfileSettings(true)}>
          Profile Settings
        </button>
        <button onClick={() => setProfileSettings(false)}>
          Notification Settings
        </button>
      </div>
      <div className="max-w-6xl w-full space-y-8 flex items-center flex-column">
        <Formik initialValues={formData} enableReinitialize validationSchema={loginValidation} onSubmit={(values) => {handleSubmit(values)}}>
        { ({setFieldValue, handleSubmit}) => {
          return (
            <Form onSubmit={handleSubmit}>
              {!isLoading && getSettingsPage(setFieldValue, handleSubmit)}
            </Form>
          )
        }}
        </Formik>
        <div className="pt-6">
          <button onClick={() => props.logout()} className="indigo-button my-3">
            LOGOUT
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
