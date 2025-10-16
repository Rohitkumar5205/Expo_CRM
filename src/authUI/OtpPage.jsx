import React, { useState } from 'react';
import img from '../assets/images/login-bg.jpg';
import img2 from '../assets/images/logo.png';
import { FaRegCopyright } from "react-icons/fa6";
import { showInfo, showSuccess } from '../utils/toastMessage';
import { useNavigate } from 'react-router-dom';
import React, { useState } from "react";
import img from "../assets/images/login-bg.jpg";
import img2 from "../assets/images/logo.png";

const OtpPage = () => {
  const [otp, setOtp] = useState('');
  // page navigation on success of otp 
const navigate=useNavigate()

  // 🔹 Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
     showSuccess("OTP is verified successfully")
    navigate('/dashboard')
    console.log('Verifying OTP:', otp);
  };

  // input value logic 
const handleChange = (e) => {
  const value = e.target.value.replace(/\D/g, '').slice(0, 4);
  setOtp(value);
};



  // 🔹 Handle resend
  const handleResend = () => {
    console.log('Resending OTP');
    showInfo("Your four-digit OTP has been sent to your WhatsApp")
  };

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        backgroundImage: `url(${img})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div className="flex justify-center flex-1 items-center px-4">
        <div className="w-full sm:w-96 md:w-[202px] lg:w-[302px] mt-8 sm:mt-12 md:mt-10">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <img
              src={img2}
              alt="Logo"
              className="w-38 sm:w-48 md:w-56 lg:w-70 h-auto"
            />
          </div>

          {/* Title */}
          <h3 className="flex justify-center mt-6 mb-4 text-sm sm:text-xl md:text-2xl font-normal text-gray-800">
            ADMIN
          </h3>

          {/* Description */}
          <p className="text-sm sm:text-base md:text-xs mb-4 md:mb-6 text-center text-gray-700 font-medium">
            An OTP has been sent to your registered mobile number. Please enter
            below for successful login.
          </p>

          {/* ✅ Converted into Form */}
          <form onSubmit={handleSubmit}>
            <input
              className="w-full pl-3 pr-3 py-1 md:py-1.5 mb-3 md:mb-4 text-sm bg-white border border-gray-300 focus:outline-none focus:border-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              type="number"
              name="otp"
              placeholder="Enter your OTP number" 
              value={otp}
              onChange={handleChange}
              required
            />

            <button
              className="w-full mb-1 md:mb-1 py-2 md:py-1.5 bg-[#337ab7] text-white text-sm md:text-sm font-medium"
              type="submit"
              onMouseOver={(e) =>
                (e.target.style.backgroundColor = '#164771')
              }
              onMouseOut={(e) =>
                (e.target.style.backgroundColor = '#337ab7')
              }
            >
              Verify
            </button>

            <button
              className="w-full py-2 md:py-1.5 bg-[#337ab7] text-white text-sm md:text-sm font-medium"
              type="button"
              onClick={handleResend}
              onMouseOver={(e) =>
                (e.target.style.backgroundColor = '#164771')
              }
              onMouseOut={(e) =>
                (e.target.style.backgroundColor = '#337ab7')
              }
            >
              Resend
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-2 md:py-2">
        <ul className="flex justify-center gap-2 text-sm sm:text-sm list-none">
          <li>
            <a href="https://namogange.org/" className="hover:text-zinc-700 text-blue-600 hover:underline ">
              Namo Gange Trust 
            </a>
          </li>
          <li className="text-gray-700">|</li>
          <li className="text-black flex">
            <FaRegCopyright className="pt-1" />2017
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default OtpPage;
