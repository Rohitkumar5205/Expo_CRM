import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

import { MdGroups } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { FaPaypal } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import profileImage from '../../assets/images/login-bg.jpg';
import { IoPersonOutline } from "react-icons/io5";
import { IoMailOpenOutline } from "react-icons/io5";
import { SlKey } from "react-icons/sl";
import { IoChevronDown } from "react-icons/io5";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const dropdownRef = useRef(null);
    const searchRef = useRef(null);

    const navigate = useNavigate();

    const toggleDropdown = () => {
        setIsOpen(prev => !prev);
        setIsSearchOpen(false); // Close search when dropdown opens
    };

    const toggleSearch = () => {
        setIsSearchOpen(prev => !prev);
        setIsOpen(false); // Close dropdown when search opens
    };

    const handleLogout = () => {
        // 1. Close the dropdown
        setIsOpen(false); 

        // --- Add your actual logout logic here (e.g., clear tokens) ---
        // localStorage.removeItem('userToken');
        // localStorage.removeItem('userData');
        // ------------------------------------------------------------
        
        // 2. Display the success toast message with PREMIUM styling
        toast.success('Successfully Logged Out!', {
            duration: 1500, 
            
            // 👇️ Premium Toast Styling
            style: {
                // Background is a soft, dark gray/blue to match your header
                background: '#202A35', 
                color: '#fff',      
                borderRadius: '12px', // Softer, more modern corners
                padding: '14px 22px', 
                fontSize: '16px', 
                fontWeight: '600',
                // Deep, soft shadow for a lifted effect
                boxShadow: '0 8px 18px rgba(0, 0, 0, 0.5)', 
            },
            // Customizing the icon color
            iconTheme: {
                primary: '#48BB78', // Success Green
                secondary: '#fff',
            },
        });

        // 3. Navigate the user to the Login page after a small delay
        // This delay ensures the user sees the beautiful toast message.
        setTimeout(() => {
            navigate('/login'); 
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

        document.addEventListener('click', handleClickOutside);

        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    return (
        <nav className='h-12 w-full bg-[#4f5a67] flex justify-between items-center px-3 md:px-5 shadow-md z-50'>
            
            {/* Left Section: Logo and Search Input */}
            <div className='flex items-center gap-2 md:gap-x-8'>
                <h1 className='font-bold text-2xl md:text-3xl text-blue-500 font-sans tracking-wide'>EXPO CRM</h1>
                
                {/* Search Toggle */}
                <div 
                    className='relative flex items-center transition-all duration-300'
                    ref={searchRef}
                >
                    {isSearchOpen ? (
                        <input
                            type='text'
                            placeholder='Search...'
                            className='h-9 w-40 md:w-56 pl-3 pr-8 rounded-full bg-gray-700 text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out'
                        />
                    ) : null}
                    <CiSearch
                        className={`text-lg md:text-xl text-gray-400 cursor-pointer hover:text-white transition-colors duration-200 ${isSearchOpen ? 'absolute right-2 top-1/2 -translate-y-1/2' : ''}`}
                        onClick={toggleSearch}
                    />
                </div>
            </div>

            {/* Right Section: Icons and Profile Dropdown */}
            <ul className='flex items-center gap-2 md:gap-3'>
                <li className='p-1 rounded-full hover:bg-gray-700 transition-colors duration-200'>
                    <MdGroups className='text-lg text-gray-300 cursor-pointer' />
                </li>
                <li className='p-1 rounded-full hover:bg-gray-700 transition-colors duration-200'>
                    <FaPaypal className='text-lg text-gray-300 cursor-pointer' />
                </li>
                <li className='p-1 rounded-full hover:bg-gray-700 transition-colors duration-200'>
                    <IoNotifications className='text-lg text-gray-300 cursor-pointer' />
                </li>

                {/* Entire dropdown area wrapped in ref */}
                <div ref={dropdownRef} className='relative'>
                    <div 
                        className='flex items-center gap-2 cursor-pointer p-1 rounded-md hover:bg-gray-700 transition-colors duration-200'
                        onClick={toggleDropdown}
                    >
                        <img className='h-7 w-7 rounded-full border-2 border-gray-500' src={profileImage} alt="Profile" />
                        <span className='text-gray-300 text-sm font-medium hidden md:flex items-center gap-1'>
                            ADMIN
                            <IoChevronDown 
                                size={14} 
                                className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
                            />
                        </span>
                    </div>

                    {/* Dropdown Menu */}
                    {isOpen && (
                        <ul className='absolute right-0 top-full mt-2 w-48 bg-white shadow-xl rounded-md overflow-hidden 
                            transform origin-top-right animate-dropdown-open
                        '>
                            <li className='flex items-center gap-2 cursor-pointer px-3 py-2 text-gray-800 text-sm font-medium hover:bg-gray-100 transition-colors duration-200'>
                                <IoPersonOutline /> My Profile
                            </li>
                            <li className='flex items-center gap-2 cursor-pointer px-3 py-2 text-gray-800 text-sm font-medium hover:bg-gray-100 transition-colors duration-200'>
                                <IoMailOpenOutline /> My Inbox
                            </li>
                            <hr className='border-gray-200'/>
                            <li 
                                className='flex items-center gap-2 cursor-pointer px-3 py-2 text-gray-800 text-sm font-medium hover:bg-gray-100 transition-colors duration-200'
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