import React, { Component, useState } from 'react';
import { Link } from "react-router-dom";

import '../styles/css/Recommenders.css';

function RenderDashboardMain(){

  let requests = [
    {
      name: "Trudie Cheung",
      email: "trudie.cheung@mail.utoronto.ca",
      requestType: "Academic",
      status: "Pending Response",
      requestDate: "03/03/21 6:00 AM EST"
    },
    {
      name: "Sean Chew",
      email: "sean.chew@mail.utoronto.ca",
      requestType: "Extracurricular",
      status: "Denied",
      requestDate: "03/03/21 6:00 AM EST"
    }
  ]

  return (
      <div id="rec-table">
        <div className="table-headings">
          <h3>Student</h3>
          <h3>Request Type</h3>
          <h3>Status</h3>
          <h3>Request Date</h3>
        </div>

        <div className="table-entries">
          {requests.map(request =>
            <div className="table-entry">

              <div className="student">
                <div className="profile-photo">
                  <img src=""/>
                </div>
                <div className="name">
                  <h3>{request.name}</h3>
                  <p>{request.email}</p>
                </div>
              </div>

              <div className="request-type">
                <p>{request.requestType}</p>
              </div>
              <div className="status">
                <p>{request.status}</p>
              </div>
              <div className="request-date">
                <p>{request.requestDate}</p>
              </div>
              <div className="btn btn-secondary">
                <Link>View</Link>
              </div>

            </div>
          )}
        </div>
      </div>
  );
}

function RecRequest() {
  return (
    <div id="rec-request">
      <b className="request">You have been asked to provide a recommendation on behalf of:</b>

      <div className="student">
        <div className="profile-photo">
          <img src=""/>
        </div>
        <div className="name">
          <h3>Trudie</h3>
          <p>email</p>
        </div>
      </div>

      <div className="deadline">
        <b>Recommendation Deadline:</b> March 20, 2020 10:00PM EST
      </div>

      <div className="rec-accept">
        <p>Would you like to provide a recommendation for Trudie Cheung? </p>
        <div className="buttons">
          <div className="btn btn-secondary">
            No
          </div>
          <div className="btn btn-primary">
            Yes
          </div>
        </div>
        <p className="notified">The applicant will be notified by your response</p>
      </div>

    </div>
  );
}

function Dashboard() {

  const [stageIndex, setStageByIndex] = useState(0);

  return (
    <div id="rec-dash">
      <h1>Your Recommendations</h1>
      {
        true ?
        <RecRequest/>
        :
        <RenderDashboardMain />
      }
    </div>
  );
}

export default Dashboard;
