import React from 'react';
import { FiPrinter } from "react-icons/fi";
import { Route, Routes } from 'react-router-dom';
import Page1 from '../Pages of Section One/Page1';
import Page2 from '../Pages of Section One/Page2';
import Page3 from '../Pages of Section One/Page3';
import Page4 from '../Pages of Section One/Page4';
import Page5 from '../Pages of Section One/Page5';
import Page6 from '../Pages of Section One/Page6';
import Page7 from '../Pages of Section One/Page7';
import Page8 from '../Pages of Section One/Page8';
import { Link } from 'react-router-dom';
import History from '../Pages of Section One/History';

const Dashboard = () => {
  return (
    <div className="w-full flex-1 overflow-auto bg-[#eef1f5]">
      {/* Header Section - Commented out as requested */}
      {/* 
      <div className="bg-white flex justify-between items-center h-10 px-4 sm:px-6 shadow-md">
        <Link to="/">
          <h1 className="font-medium text-xl text-[#4f5a67] hidden sm:block">DASHBOARD</h1>
          <h1 className="font-medium text-lg text-[#4f5a67] sm:hidden">DASH</h1>
        </Link>
        <div className="flex items-center gap-2">
          <button className="h-7 w-20 border-2 border-[#4f5a67] text-sm bg-white hover:bg-[#ccc] rounded-md text-center truncate sm:w-auto">
            Add Lead
          </button>
          <button className="h-7 w-20 border-2 border-[#4f5a67] text-sm bg-white hover:bg-[#ccc] rounded-md text-center truncate sm:w-auto">
            Activity Log
          </button>
          <button className="h-7 w-20 border-2 border-[#4f5a67] text-sm bg-white hover:bg-[#ccc] rounded-md flex items-center justify-center gap-1 sm:w-auto">
            <FiPrinter /> Print
          </button>
        </div>
      </div>
      */}

      {/* Routes Section */}
      
        <Routes>
          <Route path="/page1" element={<Page1 />} />
          <Route path="/page2" element={<Page2 />} />
          <Route path="/page3" element={<Page3 />} />
          <Route path="/page4" element={<Page4 />} />
          <Route path="/page5" element={<Page5 />} />
          <Route path="/page6" element={<Page6 />} />
          <Route path="/page7" element={<Page7 />} />
          <Route path="/page8" element={<Page8 />} />
          <Route path='/history' element={<History/>}/>
        </Routes>
      
    </div>
  );
};

export default Dashboard;