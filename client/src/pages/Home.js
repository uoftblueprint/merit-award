import React from "react";
import { Link } from "react-router-dom";
import "../styles/login.css";

function Home() {
  return (
    <div className="h-screen bg-blue-50 flex items-center justify-center">
      <div class="max-w-md flex flex-col p-4 sm:w-1/2 lg:w-1/3 border-2 rounded border-black">
          <div class="flex-1">
            <h2 class="text-gray-900 text-2xl font-bold leading-snug">
              Merit Award Bursary Program Application
            </h2>
          </div>
          <a
            href="/login"
            class="w-1/3 my-3 mt-6 inline-flex items-center px-3 py-3 text-white font-semibold bg-blue-700 rounded-md shadow-sm"
          >
            Login
          </a>
          <a
            href="/signup"
            class="w-1/3 my-3 mt-6 inline-flex items-center px-6 py-3 text-white font-semibold bg-blue-700 rounded-md shadow-sm"
          >
            Sign Up
          </a>
        </div>
    </div>
  );
}

export default Home;
