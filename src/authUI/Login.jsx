import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import mainImage from "../assets/images/login-bg.jpg";
import midImage from "../assets/images/logo.png";
import { loginUser } from "../features/auth/authSlice";
import { showSuccess, showError } from "../utils/toastMessage";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(
        loginUser({
          user_name: formData.username,
          user_password: formData.password,
        }),
      ).unwrap();

      // OTP will be generated and sent via backend (or console/log)
      showSuccess("Login successful! OTP sent to your registered number.");
      navigate("/login/otp", { state: { username: formData.username } });
    } catch (err) {
      showError(err || "Login failed");
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-center bg-cover relative pt-14"
      style={{ backgroundImage: `url(${mainImage})` }}
    >
      <img
        src={midImage}
        alt="Logo"
        className="w-70 mb-6 object-contain mt-[-50px]"
      />
      <h3 className="text-2xl font-thin text-black mb-3 tracking-wide">
        USER LOGIN
      </h3>

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
            placeholder="Enter username"
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
            placeholder="Enter Password"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#337ab7] text-white py-1 text-sm hover:bg-[#2a5f91] transition"
          disabled={loading}
        >
          {loading ? "Logging in..." : "LOGIN"}
        </button>
      </form>
    </div>
  );
};

export default Login;
