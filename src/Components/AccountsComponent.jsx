import React, { useState } from "react";
import CreateEstimate from "./CreateEstimate";
// import AddCreditNote from "./AddCreditNote";
import { useNavigate } from "react-router-dom";
import EstimateTable from "./EstimateTable";
import Payment from "./payments/Payment";

const stylebutton =
  "text-[#3598dc] cursor-pointer border border-[#3598dc] hover:bg-[#3598dc] hover:text-white font-medium flex items-center gap-1 px-1";

// Main AccountsComponent
const AccountsComponent = ({ onBackToOverview, client }) => {
  const navigate = useNavigate();

  const companyName = client?.company?.name || "Loading Company..."; // State to toggle between the different views

  const [currentView, setCurrentView] = useState("estimates"); // 'estimates', 'payments', 'createEstimate', or 'creditNote'

  // const handleCreateEstimate = () => {
  //   setCurrentView("createEstimate");
  // };

  const handleViewPayments = () => {
    setCurrentView("payments");
  }; // New handler for Credit Note
  // const handleViewCreditNote = () => {
  //   setCurrentView("addCreditNote");
  // };
  const handleViewCreditNote = () => {
    navigate("/addCreditNote");
  };

  const handleCancel = () => {
    setCurrentView("estimates");
  };

  const renderContent = () => {
    if (currentView === "createEstimate") {
      return <CreateEstimate onCancel={handleCancel} />;
    } else if (currentView === "payments") {
      return (
        <Payment
          onBackToOverview={onBackToOverview}
          client={client}
          onBackToAccounts={handleCancel}
        />
      );
    } else if (currentView === "creditNote") {
      return <AddCreditNote onCancel={handleCancel} />; // <-- RENDER THE NEW COMPONENT
    } else {
      return (
        <div className="bg-white shadow-md p-2 rounded-md w-full">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
            <h2 className="text-lg  text-gray-700 mb-2 sm:mb-0">
              {companyName} Information
            </h2>

            <div className="flex flex-wrap gap-2 justify-center">
              <button
                // onClick={handleCreateEstimate}
                className="bg-white text-black border border-gray-400 hover:bg-gray-200 px-3 py-1.5 rounded-sm text-xs font-medium cursor-pointer"
              >
                Create Estimate
              </button>

              <button
                onClick={handleViewPayments} // Updated handler
                className="bg-[#337ab7] text-white px-3 py-1.5 rounded-sm text-xs font-medium cursor-pointer"
              >
                Payments
              </button>

              <button
                onClick={handleViewCreditNote}
                className="bg-white text-black border border-gray-400 hover:bg-gray-200 px-3 py-1.5 rounded-sm text-xs font-medium cursor-pointer" // <-- UPDATED CLASSES
              >
                Credit Note
              </button>
            </div>
          </div>
          {/* Table */}
          <EstimateTable />
        </div>
      );
    }
  };

  return (
    <div className="w-full h-auto bg-[#eef1f5]">
      {/* Header Section */}
      <div className="w-full bg-white shadow-md flex flex-col sm:flex-row justify-between items-center px-4 py-1">
        <h1 className="text-xl font-semibold text-gray-700 mb-2 sm:mb-0">
          ACCOUNT SECTION | ESTIMATE
        </h1>

        <div className="flex flex-wrap gap-2 justify-center">
          <button
            onClick={onBackToOverview}
            className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1.5 rounded-sm text-xs font-medium cursor-pointer"
          >
            Back to Overview
          </button>

          <button className="bg-[#337ab7] hover:bg-blue-700 text-white px-3 py-1.5 rounded-sm text-xs font-medium cursor-pointer">
            Add Client
          </button>

          <button className="bg-[#337ab7] hover:bg-blue-700 text-white px-3 py-1.5 rounded-sm text-xs font-medium cursor-pointer">
            Master List
          </button>
        </div>
      </div>
      {/* Main content area */}
      <div className="flex flex-col m-4 gap-4">{renderContent()}</div>
    </div>
  );
};

export default AccountsComponent;
