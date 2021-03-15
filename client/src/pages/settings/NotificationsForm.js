import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import "../../styles/login.css";
import { Checkbox, Dropdown } from "../../components/questions/forms";


function NotificationsForm(props) {
  
  useEffect(() => {
  }, []);

  const options = ["Direct messages from the site administrator",
                  "Updates on activity regarding my application",
                  "Deadline reminders for application",
                  "Unsubscribe me of all emails"]

  
  return (
    <div>
      <h1>Notification Preferences</h1>
      <div>
        <Checkbox name="notifications" options={options} label="Notify me of: "/>
      </div>
    </div>
  );
}

export default NotificationsForm;
