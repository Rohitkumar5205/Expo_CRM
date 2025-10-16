import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import mainImage from "../assets/images/login-bg.jpg";
import midImage from "../assets/images/logo.png";
import { showSuccess } from "../utils/toastMessage";

const Login = () => {
  const navigate = useNavigate();

  // 🧠 Form state
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  // Handle input change
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Print the data in console
    console.log("Submitted Data:", formData);
    showSuccess("Login Successfuly")

    // Optional: Navigate to next page
    navigate("/login/otp");
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-center bg-cover relative pt-14"
      style={{ backgroundImage: `url(${mainImage})` }}
    >
      {/* Logo */}
      <img
        src={midImage}
        alt="Logo"
        className="w-70 mb-6 object-contain mt-[-50px]"
      />

      {/* User Login Text */}
      <h3 className="text-2xl font-thin text-black mb-3 tracking-wide">
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
            value={formData.username}
            onChange={handleChange}
            className="w-full border border-black px-3 py-0.5 outline-none bg-white"
           
            required
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
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-black px-3 py-0.5 outline-none bg-white"
            
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#337ab7] text-white py-1 cursor-pointer text-sm hover:bg-[#2a5f91] transition"
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
