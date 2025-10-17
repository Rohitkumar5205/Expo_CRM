import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import img from "../assets/images/login-bg.jpg";
import img2 from "../assets/images/logo.png";
import { FaRegCopyright } from "react-icons/fa6";
import { showSuccess, showError } from "../utils/toastMessage";
import { verifyOTP, resendOTP } from "../features/auth/authSlice";
import { useLocation } from "react-router-dom";

const OtpPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const username = location.state?.username;
  const { loading } = useSelector((state) => state.auth);
  const [otp, setOtp] = useState("");

  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 4);
    setOtp(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(verifyOTP({ otp })).unwrap();

      showSuccess("OTP verified successfully!");
      navigate("/dashboard");
    } catch (err) {
      showError(err || "OTP verification failed");
    }
  };

  // const handleResend = () => {
  //   showInfo("OTP resent to your registered mobile number.");
  //   console.log("Resend OTP logic here");
  // };
  // Inside your component
  const handleResend = async () => {
    const username = localStorage.getItem("user_name"); // get from localStorage
    if (!username) {
      showError("Username not found. Please login again.");
      return navigate("/login"); // redirect to login if missing
    }

    try {
      const result = await dispatch(
        resendOTP({ user_name: username })
      ).unwrap();
      showSuccess("OTP resent successfully!");
      console.log("New OTP:", result.otp); // for testing only
    } catch (err) {
      showError(err || "Failed to resend OTP");
    }
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className="flex justify-center flex-1 items-center px-4">
        <div className="w-full sm:w-96 md:w-[302px] mt-8 sm:mt-12">
          <div className="flex justify-center mb-4">
            <img
              src={img2}
              alt="Logo"
              className="w-38 sm:w-48 md:w-56 lg:w-70 h-auto"
            />
          </div>

          <h3 className="flex justify-center mt-6 mb-4 text-xl font-normal text-gray-800">
            ADMIN
          </h3>
          <p className="text-center text-gray-700 mb-4">
            An OTP has been sent to your registered mobile number. Enter it
            below.
          </p>

          <form onSubmit={handleSubmit}>
            <input
              className="w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none pl-3 pr-3 py-1 mb-3 bg-[#E8F0FE] border border-gray-300 focus:outline-none focus:border-blue-500"
              type="number"
              name="otp"
              placeholder="Enter OTP"
              value={otp}
              onChange={handleChange}
              required
            />

            <button
              type="submit"
              className="w-full mb-1 py-2 bg-[#337ab7] text-white text-sm font-medium hover:bg-[#164771]"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify"}
            </button>

            <button
              type="button"
              className="w-full py-2 bg-[#337ab7] text-white text-sm font-medium hover:bg-[#164771]"
              onClick={handleResend}
            >
              Resend
            </button>
          </form>
        </div>
      </div>

      <footer className="py-2">
        <ul className="flex justify-center gap-2 text-sm list-none">
          <li>
            <a
              href="https://namogange.org/"
              className="text-blue-600 hover:underline hover:text-zinc-700"
            >
              Namo Gange Trust
            </a>
          </li>
          <li className="text-gray-700">|</li>
          <li className="text-black flex">
            <FaRegCopyright className="pt-1" /> 2017
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default OtpPage;
