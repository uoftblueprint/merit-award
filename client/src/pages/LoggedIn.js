import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import "../styles/login.css";
import { useDispatch } from 'react-redux';
import { useEffect, useState } from "react";

import {getEmail} from '../api/auth';

function Login(props) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
   useEffect(() => {
    const getData = async () => {
      const data = await getEmail();
      console.log(data);
      setEmail(data.user.email);
     }
     try {
      getData();
     } catch (e) {
      dispatch({ type: 'LOGOUT' });
     }
  }, []);
  return (
    <div className="loggedInTest">
      <h1>Ay you're loggged IN</h1>
      <h1>welcome 2 the club</h1>
      <h2>{email}</h2>
      <Link to="/" onClick={() => props.logout()}>LOGOUT</Link>
    </div>
  );
}

export default Login;
