import React from "react";
import { Link } from "react-router-dom";
import "../styles/login.css";

function Home() {
  return (
    <div className="h-screen bg-gray-50 flex items-center justify-center">
      <div class="bg-white text-center max-w-md flex flex-col p-4 sm:w-1/2 lg:w-1/3 border-2 rounded border-black">
          <h2 class="text-gray-900 text-2xl font-bold leading-snug">
            Merit Award Bursary Program Application
          </h2>

          <div class="mt-24 mb-6">
            <a
              href="/login"
              class="w-1/3 m-0 m-auto my-6 px-3 py-3 text-white font-semibold bg-blue-700 rounded-md shadow-sm"
            >
              Login
            </a>
          </div>

          <div class="my-6">
            <a
              href="/signup"
              class="w-1/3 m-0 m-auto my-3 mt-6 px-3 py-3 text-white font-semibold bg-blue-700 rounded-md shadow-sm"
            >
              Sign Up
            </a>
          </div>
        </div>
    </div>
  );
}

export default Home;
