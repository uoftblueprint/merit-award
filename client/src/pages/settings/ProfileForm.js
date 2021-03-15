import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import "../../styles/login.css";
import { Field, Form, ErrorMessage, Formik } from "formik";
import { Dropdown } from "../../components/questions/forms";
import { getSchools } from "../../api/application";


function ProfileForm(props) {
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
  }, []);

  
  return (
    <div>
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

      <div>
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
        <button 
          type="submit"
          className="indigo-button my-3"
          onClick={() => {
            props.setFieldValue('passwordButton', true, false);
            props.handleSubmit();
          }}>
            Save Password
          </button>
      </div>
      <button 
        type="submit"
        className="indigo-button my-3"
        onClick={() => {
          props.setFieldValue('passwordButton', false, false);
          props.handleSubmit();
        }}>
          Save
        </button>
    </div>
  );
}

export default ProfileForm;
