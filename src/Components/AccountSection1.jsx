import React from "react";
import EstimateTable from "./EstimateTable";
import { useNavigate } from "react-router-dom";

const AccountSection1 = ({ client }) => {
  const navigate = useNavigate();
  const companyName = client?.company?.name || "Loading Company...";

  return (
    <div className="w-full h-auto bg-[#eef1f5] min-h-screen">
      {/* Header Section */}
      <div className="w-full bg-white shadow-md flex flex-col sm:flex-row justify-between items-center px-4 py-1">
        <h1 className="text-xl font-semibold text-gray-700 mb-2 sm:mb-0">
          ACCOUNT SECTION | ESTIMATE
        </h1>

        <div className="flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => navigate("/ihweClientData2026/addNewClients")}
            className="bg-white text-black border border-gray-400 hover:bg-gray-200 px-3 py-1.5 rounded-sm text-xs font-medium"
          >
            Add Client
          </button>

          <button
            onClick={() => navigate("/ihweClientData2026/masterData")}
            className="bg-white text-black border border-gray-400 hover:bg-gray-200 px-3 py-1.5 rounded-sm text-xs font-medium"
          >
            Master List
          </button>
        </div>
      </div>

      {/* Company Info & Action Buttons */}
      <div className="bg-white shadow-md rounded-md  m-4 ">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-1 p-2">
          <h2 className="text-lg text-gray-700 mb-2 sm:mb-0">
            {companyName} Information
          </h2>
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => navigate("/ihweClientData2026/createEstimate1")}
              className="bg-white text-black border border-gray-400 hover:bg-gray-200 px-3 py-1.5 rounded-sm text-xs font-medium"
            >
              Create Estimate
            </button>
            <button
              onClick={() => navigate("/ihweClientData2026/payments")}
              className="bg-white text-black border border-gray-400 hover:bg-gray-200 px-3 py-1.5 rounded-sm text-xs font-medium"
            >
              Payments
            </button>
            <button
              onClick={() => navigate("/ihweClientData2026/creditNote")}
              className="bg-white text-black border border-gray-400 hover:bg-gray-200 px-3 py-1.5 rounded-sm text-xs font-medium"
            >
              Credit Note
            </button>
          </div>
        </div>
        <hr />

        {/* Estimate Table */}
        <EstimateTable />
      </div>
    </div>
  );
};

export default AccountSection1;
