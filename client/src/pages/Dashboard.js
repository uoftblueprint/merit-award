import React, { useState } from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="dashboard flex justify-center items-center h-screen">
      <div className="status w-4/5">
        <div className="flex">
          <span className="flex-grow"/>
          <span className="px-4">Application Status</span>
          <span className="px-4">Deadline</span>
          <span className="px-4">Last Edited</span>
        </div>
        <div className="p-8 flex border border-blue-900">
          <Link to="/application" className="flex-auto px-4">Firstname Lastname Merit Award Application</Link>
          <div className="flex-auto">
            <span className="px-4 flex-1">0 of 3 required tasks complete</span>
            <span className="px-4 flex-1">INSERT DEADLINE HERE</span>
            <span className="px-4 flex-1">INSERT LAST EDITED</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
