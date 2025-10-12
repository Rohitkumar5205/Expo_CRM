// import React from "react";
// import { Outlet } from "react-router-dom";
// import SidebarMenu from "../Components/sidebar/SidebarMenu";
// import Header from "../Components/header/Header";
// import Footer from "../Components/footer/Footer";

// const Layout = () => {
//   return (
//     <div className="flex flex-col md:flex-row h-screen">
//       <SidebarMenu />
//       <div className="flex-1 overflow-auto bg-[#eef1f5]">
//         <Header />
//         <div className="min-h-screen">
//           <Outlet />
//         </div>
//         <Footer />
//       </div>
//     </div>
//   );
// };

// export default Layout;
import React from "react";
import { Outlet } from "react-router-dom";
import SidebarMenu from "../Components/sidebar/SidebarMenu";
import Header from "../Components/header/Header";
import Footer from "../Components/footer/Footer";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#eef1f5]">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar fixed on the left */}
        <aside className="bg-white border-r overflow-y-auto">
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
