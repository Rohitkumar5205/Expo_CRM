import React from 'react';
import { FaRegCopyright } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className='w-full bg-[#4f5a67] text-white p-2 sm:p-3 flex items-center justify-center'>
      <div className='flex flex-col sm:flex-row items-center gap-2 text-sm font-medium text-gray-400'>
        <p className='text-gray-300'>2025</p>
        <span className='text-gray-300'>
          <FaRegCopyright />
        </span>
        <p className='text-gray-100 mt-1 sm:mt-0'>Namo Gange Wellness India Pvt. Ltd</p>
      </div>
    </footer>
  );
};

export default Footer;