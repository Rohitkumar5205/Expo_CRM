import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Globallytable from "../../Components/Globallytable";
import Textarea from "../../Components/Textarea";
import ClientOverview from "../../Components/ClientOverview";

const HotClientList = () => {
  const [selectedClient, setSelectedClient] = useState(null);
  const navigate = useNavigate();

   const columns = [
        { label: "Client Name", accessor: "Client.name" }, 
        { label: "Contact Details", accessor: "contact.details" },
        { label: "Category", accessor: "category.main" },
        { label: "City", accessor: "location.city" },
        { label: "State", accessor: "location.state" },
         { label: "Source", accessor: "source.type" },
         { label: "Status", accessor: "Status" },
         { label: "Event", accessor: "Event.type" },
        { label: "Document No.", accessor: "Document.number" },
        { label: "Updated Details", accessor: "Updated.detail" },  
    ];

  const rows = [
  {
    Client: { name: "Ravi Sharma" },
    contact: { details: "ravi.sharma@example.com | +91-9876543210" },
    category: { main: "Pharmaceuticals" },
    location: { city: "Mumbai", state: "Maharashtra" },
    source: { type: "Website Inquiry" },
    Status: "Active",
    Event: { type: "Pharma Expo 2025" },
    Document: { number: "DOC-1001" },
    Updated: { detail: "Updated by Neha Verma on 20 Sep 2025" },
  }
  ];


  const handleClientClick = (clientData) => {
    setSelectedClient(clientData);
  };

  const handleBackClick = () => {
    setSelectedClient(null);
  };

  const handleAddNewLeadClick = () => {
    navigate("/page1");
  };

  const handleWarmClientClick = () => {
    navigate("/page3");
  };

  // New navigation handlers for the other buttons
  const handleHotClientClick = () => {
    navigate("/page4");
  };

  const handleConfirmClientClick = () => {
    navigate("/page5");
  };

  const handleColdClientClick = () => {
    navigate("/page6");
  };

  const handleRawDataListClick = () => {
    navigate("/page8");
  };

  return (
    <div className="w-full h-auto bg-[#eef1f5]">
      {selectedClient ? (
        <ClientOverview client={selectedClient} onBack={handleBackClick} />
      ) : (
        <>
          <div className="w-full bg-white shadow-md ">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between px-4 py-1">
              <h1 className="text-xl  text-gray-600 mb-2 lg:mb-0">
                CLIENT DATA 2023
              </h1>
            </div>
          </div>
          <div className="w-[97%] bg-white p-1 m-4">
            <div className="flex justify-between md:justify-between ">
              <h1 className="text-base font-semibold text-gray-950 pl-4 pt-1">
              HOT CLIENT LIST
            </h1>
            <div className="flex flex-wrap justify-start gap-2 mb-1">
              <button
                onClick={handleAddNewLeadClick}
                className="bg-[#337ab7] hover:bg-[#286090] text-white px-2.5 py-1  text-sm font-medium"
              >
                Add New Lead
              </button>
              <button
                onClick={handleWarmClientClick}
                className="bg-[#337ab7] hover:bg-[#286090] text-white px-2.5 py-1  text-sm font-medium"
              >
                Warm Client
              </button>
              <button
                onClick={handleHotClientClick}
                className="bg-[#337ab7] hover:bg-[#286090] text-white px-2.5 py-1  text-sm font-medium"
              >
                Hot Client
              </button>
              <button
                onClick={handleConfirmClientClick}
                className="bg-[#337ab7] hover:bg-[#286090] text-white px-2.5 py-1  text-sm font-medium"
              >
                Confirm Client
              </button>
              <button
                onClick={handleColdClientClick}
                className="bg-[#337ab7] hover:bg-[#286090] text-white px-2.5 py-1  text-sm font-medium"
              >
                Cold Client
              </button>
              <button
                onClick={handleRawDataListClick}
                className="bg-[#337ab7] hover:bg-[#286090] text-white px-2.5 py-1  text-sm font-medium"
              >
                Raw Data List
              </button>
            </div>
            </div>
            <hr className="opacity-10 mb-2" />
            <div className="text-xs">
              <Globallytable
                rows={rows}
                colomns={columns}
                onRowClick={handleClientClick}
              />
            </div>
          </div>
          <div className="bg-white shadow-md m-4 w-[97%]">
            <Textarea />
          </div>
        </>
      )}
    </div>
  );
};

export default HotClientList;
