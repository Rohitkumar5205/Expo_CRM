import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SidebarMenu from "./sidebar/SidebarMenu";
import Header from "./header/Header";
import Footer from "./footer/Footer";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="h-screen flex flex-col bg-[#eef1f5]">
      {/* Fixed Header at top */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <Header onMenuToggle={toggleSidebar} />
      </div>

      {/* Main container with sidebar and content */}
      <div className="flex flex-1 pt-10 pb-10 overflow-hidden">
        {/* Fixed Sidebar on the left */}
        <aside
          className={`fixed left-0 top-24 bottom-16 w-59 overflow-y-auto z-40 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:static transition-transform duration-300 ease-in-out`}
        >
          <SidebarMenu onClose={closeSidebar} />
        </aside>

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
            onClick={closeSidebar}
          />
        )}

        {/* Main scrollable content area */}
        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto w-full">
            <Outlet /> {/* Page content */}
          </div>
        </main>
      </div>

      {/* Fixed Footer at bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white shadow-lg">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
