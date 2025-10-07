import React from "react";
import { useNavigate } from "react-router-dom";
import mainImage from "../assets/images/login-bg.jpg";
import midImage from "../assets/images/logo.png";

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // ✅ Here you can also add validation logic if needed
    navigate("/otp"); // redirects to OTP page
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-center bg-cover relative"
      style={{ backgroundImage: `url(${mainImage})` }}
    >
      {/* Logo */}
      <img
        src={midImage}
        alt="Logo"
        className="w-60 mb-3 object-contain mt-[-50px]"
      />

      {/* User Login Text */}
      <h3 className="text-2xl font-sans text-black mb-4 tracking-wide">
        USER LOGIN
      </h3>

      {/* Form Box */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-start w-[300px] space-y-4"
      >
        <div className="w-full">
          <label
            htmlFor="username"
            className="block text-sm font-normal text-black mb-1"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            className="w-full border border-gray-300 px-3 py-2 outline-none"
          />
        </div>

        <div className="w-full">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-black mb-1"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full border border-gray-300 px-3 py-2 outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#337ab7] text-white py-2 font-semibold cursor-pointer"
        >
          LOGIN
        </button>
      </form>

      {/* Footer fixed to bottom */}
      <p className="absolute bottom-4 text-xs">
        <span className="text-[#2b77c0] font-medium">DC Infinity</span>{" "}
        <span className="text-gray-600">| © 2025</span>
      </p>
    </div>
  );
};

export default Login;
