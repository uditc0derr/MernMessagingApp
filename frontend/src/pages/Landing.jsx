import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <h1 className="text-5xl font-bold mb-4">Welcome to ChatApp</h1>
      <p className="text-lg mb-6">Chat in real-time with your friends securely!</p>
      <div className="flex space-x-4">
        <Link
          to="/register"
          className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-gray-200 transition duration-300"
        >
          Get Started
        </Link>
        <Link
          to="/login"
          className="bg-transparent border-2 border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition duration-300"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Landing;
