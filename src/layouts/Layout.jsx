import React from "react";
import { Outlet } from "react-router-dom";
import Sidebarmanu from "../Components/sidebar/Sidebarmanu";
import Header from "../Components/header/Header";
import Footer from "../Components/footer/Footer";

const Layout = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      <Sidebarmanu />
      <div className="flex-1 overflow-auto bg-[#eef1f5]">
        <Header />
        <div className="p-4 min-h-screen">
          <Outlet /> {/* Dynamically renders child routes */}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
