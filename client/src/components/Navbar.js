import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div id="navbar" className="fixed flex p-8 w-screen bg-ma top-0">
        <div>MERIT AWARD LOGO</div>
        <div className="flex-grow"/>
        <div>
            <Link to="/dashboard" className="px-8">Dashboard</Link>
            <Link to="/settings" className="px-8">Settings</Link>
        </div>
    </div>
  );
}

export default Navbar;
