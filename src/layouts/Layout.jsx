import React from "react";
import { Outlet } from "react-router-dom";
import SidebarMenu from "./sidebar/SidebarMenu";
import Header from "./header/Header";
import Footer from "./footer/Footer";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#eef1f5]">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar fixed on the left */}
        <aside className="bg-white border-r overflow-y-auto w-59">
          <SidebarMenu />
        </aside>

        {/* Main content area */}
        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto">
            <Outlet /> {/* Page content */}
          </div>

          {/* Footer stays at bottom */}
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default Layout;
