import React from "react";
import { useNavigate } from "react-router-dom";
import { FiPrinter } from "react-icons/fi";
const MainComponent = () => {

  const navigate = useNavigate();
  return (
    <>
      <div className="w-full  flex-1 overflow-auto bg-[#c6b3b3]">
        <div className="bg-white flex justify-between items-center h-10 px-4 sm:px-6 shadow-md w-full ">
          <h1 className="font-medium text-xl text-[#4f5a67] hidden sm:block">
            DASHBOARD
          </h1>
          <h1 className="font-medium text-lg text-[#4f5a67] sm:hidden">DASH</h1>

          <div className="flex items-center gap-2">
            <button onClick={()=>navigate("/ihweClientData2026/addNewClients")} className="h-auto w-auto border border-[#ccc] text-sm bg-white hover:bg-[#ccc] px-2 py-1 text-center truncate sm:w-auto cursor-pointer">
              Add Lead
            </button>
            <button  className="h-auto w-auto border border-[#ccc] text-sm bg-white hover:bg-[#ccc] px-2 py-1  text-center truncate sm:w-auto cursor-pointer">
              Activity Log
            </button>
            <button  className="h-auto w-auto border border-[#ccc] text-sm bg-white hover:bg-[#ccc] px-2 py-1  flex items-center justify-center gap-1 sm:w-auto cursor-pointer">
              <FiPrinter /> Print
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default MainComponent;
