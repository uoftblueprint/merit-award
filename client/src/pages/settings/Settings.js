import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import "../../styles/login.css";
import { useDispatch } from 'react-redux';
import { useEffect, useState } from "react";

import {getUserInfo} from '../../api/auth';
import SettingsForm from "./SettingsForm";

function Settings(props) {
  const dispatch = useDispatch();
  const [user, setUser] = useState({});

  useEffect(() => {
    const getData = async () => {
      const data = await getUserInfo();
      console.log('data :>> ', data);
      setUser(data.user);
     }
     try {
      getData();
     } catch (e) {
      dispatch({ type: 'LOGOUT' });
     }
  }, []);


  return (
    <div className="mt-32 min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 bg-superlightgray">
      <div className="max-w-6xl w-full space-y-8 flex items-center flex-column">
        <SettingsForm user={user} />
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
