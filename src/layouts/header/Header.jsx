import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GrGroup } from "react-icons/gr";
import { MdGroups } from "react-icons/md";
// import { CiSearch } from "react-icons/ci";
import { FaPaypal } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
// import profileImage from "../../assets/images/login-bg.jpg";
import { IoPersonOutline } from "react-icons/io5";
import { IoMailOpenOutline } from "react-icons/io5";
import { SlKey } from "react-icons/sl";
import { IoChevronDown } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);

  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
    setIsSearchOpen(false); // Close search when dropdown opens
  };

  const toggleSearch = () => {
    setIsSearchOpen((prev) => !prev);
    setIsOpen(false);
  };

  const handleLogout = () => {
    setIsOpen(false);
    toast.success("Successfully Logged Out!", {
      duration: 1500,
      style: {
        background: "#202A35",
        color: "#fff",
        borderRadius: "12px",
        padding: "14px 22px",
        fontSize: "16px",
        fontWeight: "600",
        boxShadow: "0 8px 18px rgba(0, 0, 0, 0.5)",
      },
      iconTheme: {
        primary: "#48BB78",
        secondary: "#fff",
      },
    });
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <nav className="h-10 w-full bg-[#4f5a67] flex justify-between items-center px-3 md:px-5 shadow-md z-50">
      {/* Left Section: Logo and Search Input */}
      <div className="flex items-center gap-2 md:gap-x-8">
        <h1 className="font-bold text-2xl md:text-3xl text-[#337AB7] font-sans tracking-wide">
          EXPO CRM
        </h1>

        {/* Search Toggle */}
        {/* <div
            ref={searchRef}
            className="relative flex items-center bg-[#46505C] hover:bg-[#2d3748] rounded-full px-2 py-1 transition-all duration-300 ease-in-out "
            >
            <input
                type="text"
                placeholder="Search..."
                className="flex-1 bg-white text-gray-700 placeholder-gray-400 text-sm px-3 py-1 rounded-l-full focus:outline-none focus:ring-0 focus:ring-blue-500 transition-all duration-200"
            />

            <button
                type="button"
                onClick={toggleSearch}
                className="flex items-center justify-center   rounded-full ml-2 transition-colors duration-200"
            >
                <CiSearch className="text-white text-lg" />
            </button>
            </div> */}
      </div>

      {/* Right Section: Icons and Profile Dropdown */}
      <ul className="flex items-center gap-2 md:gap-3">
        <li className="relative p-1 rounded-full hover:bg-gray-700 transition-colors duration-200">
          <GrGroup size={20} className=" text-gray-300 cursor-pointer" />
        </li>
        <li className="relative p-1 rounded-full hover:bg-gray-700 transition-colors duration-200">
          <FaPaypal size={20} className=" text-gray-300 cursor-pointer" />
        </li>
        {/* <li className="p-1 rounded-full hover:bg-gray-700 transition-colors duration-200">
          <IoNotifications size={20} className=" text-gray-300 cursor-pointer" />
        </li> */}
        <li className="relative p-1 rounded-full hover:bg-gray-700 transition-colors duration-200 cursor-pointer">
          <IoNotifications size={22} className="text-gray-300" />

          {/* Notification Count Badge */}
          <span className="absolute -top-1 -right-1 bg-[#37C6D3] text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-full shadow-sm">
           3
          </span>
        </li>

        {/* Entire dropdown area wrapped in ref */}
        <div ref={dropdownRef} className="relative">
          <div
            className="flex items-center gap-2 cursor-pointer px-1 rounded-md hover:bg-gray-700 transition-colors duration-200"
            onClick={toggleDropdown}
          >
            {/* <img
              className="h-7 w-7 rounded-full border-2 border-gray-500"
              src={profileImage}
              alt="Profile"
            /> */}
            <li className="relative p-1">
              <FaUserCircle className="h-7 w-7 text-gray-300 border-2 border-gray-500 rounded-full hover:text-white transition-colors duration-200 cursor-pointer" />
            </li>
            <span className="text-gray-300 text-sm font-medium hidden md:flex items-center gap-1">
              ADMIN
              <IoChevronDown
                size={14}
                className={`transform transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </span>
          </div>

          {/* Dropdown Menu */}
          {isOpen && (
            <ul
              className="absolute right-0 top-full mt-2 w-48 bg-white shadow-xl rounded-md overflow-hidden 
                            transform origin-top-right animate-dropdown-open
                        "
            >
              <li className="flex items-center gap-2 cursor-pointer px-3 py-2 text-gray-800 text-sm font-medium hover:bg-gray-100 transition-colors duration-200">
                <IoPersonOutline /> My Profile
              </li>
              <li className="flex items-center gap-2 cursor-pointer px-3 py-2 text-gray-800 text-sm font-medium hover:bg-gray-100 transition-colors duration-200">
                <IoMailOpenOutline /> My Inbox
              </li>
              <hr className="border-gray-200" />
              <li
                className="flex items-center gap-2 cursor-pointer px-3 py-2 text-gray-800 text-sm font-medium hover:bg-gray-100 transition-colors duration-200"
                onClick={handleLogout} // ✅ Log Out handler attached here
              >
                <SlKey /> Log Out
              </li>
            </ul>
          )}
        </div>
      </ul>
      <style>
        {/* CSS for dropdown animation */}
        {`
                    @keyframes dropdown-open {
                        0% {
                            opacity: 0;
                            transform: scale(0.95);
                        }
                        100% {
                            opacity: 1;
                            transform: scale(1);
                        }
                    }
                    .animate-dropdown-open {
                        animation: dropdown-open 0.2s ease-out forwards;
                    }
                `}
      </style>
    </nav>
  );
};

export default Header;
