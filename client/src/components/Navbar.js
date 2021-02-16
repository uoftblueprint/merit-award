import React, { useState } from "react";
import { Link } from "react-router-dom";

import logo from "../images/logo.png";

function Navbar() {
  let url = window.location.href.split("/");
  let page = url[url.length - 1];

  return (
    <div id="navbar" className="fixed flex px-8 py-2 items-center w-screen bg-white top-0 shadow-md">
        <Link className="flex items-center hover:no-underline hover:text-black" to="/dashboard">
          <img src={logo} className="w-20 h-12 mr-3"/>
          <div className="font-semibold text-lg">Application Portal</div>
        </Link>
        <div className="flex-grow"/>
        {page !== "application" ?
        <div className={`h-0.5 w-24 bg-ma absolute bottom-0 transition-all duration-200 ${page === "dashboard" ? "right-56" : "right-16"}`}/>
        : ""}
        <div>
            <Link to="/dashboard" className={`px-8 font-semibold hover:text-ma hover:no-underline transition-all ${page === "dashboard" ? "text-ma" : "text-gray"}`}>Dashboard</Link>
            <Link to="/settings" className={`px-8 font-semibold hover:text-ma hover:no-underline transition-all ${page === "settings" ? "text-ma" : "text-gray"}`}>User Settings</Link>
        </div>
    </div>
  );
}

export default Navbar;
