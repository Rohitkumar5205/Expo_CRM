import React from "react";
import { useNavigate } from "react-router-dom";

const UploadVisitorList = () => {
  const navigate = useNavigate();

  // Define the path to your Excel template file
  const excelTemplateUrl = "/assets/excel-format-template.xlsx"; // Replace with your file path

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-2 flex justify-between items-center">
        <h1 className="text-xl text-gray-600">VISITOR SECTION</h1>
        <button
          className="bg-[#3598dc] hover:bg-[#3690ea] text-white px-4 py-2 text-sm cursor-pointer"
          onClick={() => navigate("/contractor-list")}
        >
          Visitor List
        </button>
      </div>

      {/* Main */}
      <div className="p-6">
        <div className="bg-white p-6">
          <h2 className="text-lg text-gray-700 mb-6">Upload Visitor Excel</h2>

          <label className="block text-sm text-gray-800">Upload Excel</label>

          <div className="flex items-center gap-3">
            {/* File Input */}
            <input
              type="file"
              id="file-upload"
              className="block w-full max-w-2xl text-sm text-gray-600 border border-gray-300 rounded
                file:mr-4 file:py-2 file:px-4
                file:border-0
                file:text-sm file:font-medium
                file:bg-gray-100 file:text-gray-700
                hover:file:bg-gray-200"
            />

            {/* Import Button */}
            <button className="bg-[#3598dc] hover:bg-[#015a96] text-white px-6 py-2 text-sm whitespace-nowrap cursor-pointer">
              Import
            </button>

            {/* Excel Format Box - Now a downloadable link */}
            <a
              href={excelTemplateUrl}
              download="visitor_excel_format.xlsx"
              className="bg-[#E6D8C3] bg-opacity-20 flex items-center justify-center gap-3 px-8 py-6 ml-auto no-underline cursor-pointer"
            >
              <div className="relative">
                <svg
                  className="w-16 h-16 text-[#3598dc]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
                  <path
                    d="M14 2v6h6"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                  />
                </svg>
                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-2xl font-bold">
                  X
                </span>
              </div>
              <span className="text-blue-500 text-sm">Excel Format</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadVisitorList;
