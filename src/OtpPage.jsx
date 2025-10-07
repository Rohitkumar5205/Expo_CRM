import React, { useState } from 'react';
import img from './assets/images/login-bg.jpg';
import img2 from './assets/images/logo.png';

const OtpPage = () => {
  const [otp, setOtp] = useState('');

  const handleVerify = () => {
    console.log('Verifying OTP:', otp);
  };

  const handleResend = () => {
    console.log('Resending OTP');
  };

  return (
    <div style={{
      width: '100%', 
      minHeight: '100vh', 
      backgroundImage: `url(${img})`, 
      backgroundSize: 'cover', 
      backgroundPosition: 'center',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div className='flex justify-center flex-1 items-center px-4'>
        <div className='w-full sm:w-96 md:w-[500px] lg:w-[600px] mt-8 sm:mt-12 md:mt-16'>
          <div className='flex justify-center mb-4'>
            <img src={img2} alt="Logo" className='w-48 sm:w-56 md:w-64 lg:w-72 h-auto' />
          </div>
          
          <h3 className='flex justify-center mt-6 mb-4 text-2xl sm:text-3xl md:text-4xl font-sans text-gray-800'>
            ADMIN
          </h3>
          
          <p className='text-sm sm:text-base md:text-lg mb-6 md:mb-8 text-center text-gray-700 px-2'>
            An OTP has been sent to your registered mobile number. Please enter below for successful login.
          </p>
          
          <input 
            className='w-full pl-3 pr-3 py-3 md:py-4 mb-3 md:mb-4 border border-gray-300 focus:outline-none focus:border-blue-500' 
            type="number" 
            name="OTP" 
            placeholder='Enter your OTP number'
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            style={{ borderRadius: '4px' }}
          />
          
          <button 
            className='w-full mb-3 md:mb-4 py-3 md:py-4 text-white text-base md:text-lg font-medium' 
            type='button'
            onClick={handleVerify}
            style={{ 
              backgroundColor: '#4a90e2',
              borderRadius: '4px'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#3a7bc8'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#4a90e2'}
          >
            Verify
          </button>
          
          <button 
            className='w-full py-3 md:py-4 text-white text-base md:text-lg font-medium' 
            type='button'
            onClick={handleResend}
            style={{ 
              backgroundColor: '#4a90e2',
              borderRadius: '4px'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#3a7bc8'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#4a90e2'}
          >
            Resend
          </button>
        </div>
      </div>
       
      <footer className='py-6 md:py-8'>
        <ul className='flex justify-center gap-2 text-sm sm:text-base list-none'>
          <li>
            <a href="#" className='hover:text-zinc-700 text-blue-600'>
              Namo Gange Trust
            </a>
          </li>
          <li className='text-gray-700'>|</li>
          <li className='text-black'>2017</li>
        </ul>
      </footer>
    </div>
  );
};

export default OtpPage;