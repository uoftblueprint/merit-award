import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import "../../styles/login.css";
import { useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
import { Field, Form, ErrorMessage, Formik } from "formik";

import * as yup from 'yup';
import {getUserInfo} from '../../api/auth';
import SettingsForm from "./SettingsForm";

  
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

// const loginValidation = yup.object().shape({
//   email: yup.string().email().required(),
//   school: yup.string().required(),
//   password: yup.string().required().min(2, 'Password too short.'),
//   confirm: yup.boolean().oneOf([true], 'This checkbox must be checked.').required(),
//   confirmPassword: yup.string().oneOf([yup.ref('password'), null], "Passwords don't match").required('Confirm Password is required')
// });

const loginValidation = yup.object().shape({})

function Settings(props) {
  const dispatch = useDispatch();

  const [isLoading, setLoading] = useState(true);
  const [formData, setFormData] = useState(defaultValues);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      setFormData({});
      const data = await getUserInfo();;
      setFormData({...formData, email: data.user.email});
      setLoading(false);
     }
     try {
      getData();
     } catch (e) {
      dispatch({ type: 'LOGOUT' });
     }
  }, []);

  async function handleSubmit(values) {
    if (values.passwordButton) {
      console.log("PASSWORD");
    } else{
      console.log("NOT PASWORD");
    }
    console.log('values :>> ', values);
  }

  const updatePassword = (e) => {
    setFormData({...formData, passwordButton: true});

    handleSubmit(e);
  }


  return (
    <div className="mt-32 min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 bg-superlightgray">
      <div>

      </div>
      <div className="max-w-6xl w-full space-y-8 flex items-center flex-column">
        <Formik initialValues={formData} enableReinitialize validationSchema={loginValidation} onSubmit={(values) => {handleSubmit(values)}}>
        { ({setFieldValue, handleSubmit}) => {
          return (
            <Form onSubmit={handleSubmit}>
              {!isLoading && <SettingsForm setFieldValue={setFieldValue} handleSubmit={handleSubmit} />}
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
