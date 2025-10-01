import React from 'react';
import Sidebarmanu from './Components/Sidebarmanu';
import Dashboard from './Components/Dashboard';

const Layout = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      <Sidebarmanu />
      <div className="flex-1 overflow-auto">
        <Dashboard />
      </div>
    </div>
  );
};

export default Layout;