import React from 'react';
import { Toaster } from 'react-hot-toast'; 
import { Routes, Route } from 'react-router-dom'; 

// 👇️ यह लाइन बदलें
// import Login from './Login'; // <--- OLD (गलत)

// 👇️ नया, सही import path:
import Login from './Components/Login.jsx'; // ✅ NEW (सही)

import Layout from './Layout';
import Header from './Components/Header';
import Footer from './Components/Footer';

const App = () => {
  return (
    <div >
        <Toaster position="top-right" reverseOrder={false} />

        {/* Main Routes Container */}
        <Routes>
            {/* 1. Login Route */}
            <Route path="/login" element={<Login />} /> 
            
            {/* 2. Main App Routes: * ko Dashboard route se replace kar dein,
               taki jab koi '/' par jaye to MainComponent load ho. 
               Ya fir 'Layout' component ke andar default path set karein.
               Aapke pichle code ke hisaab se: 
            */}
            <Route path="*" element={
                <>
                    <Header/>
                    <Layout/>
                    <Footer/> 
                </>
            } />
        </Routes>
    </div>
  )
}

export default App;