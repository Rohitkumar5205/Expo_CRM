import React, { useState } from "react";
import Globallytable from "../../Components/Globallytable";
import ClientOverview from "../../Components/ClientOverview";
import UploaderTextarea from "../../Components/UploaderTextarea";


const RawDataList = () => {
  const [selectedClient, setSelectedClient] = useState(null);

 // Columns definition with padding
const columns = [
  { label: "Company Name", accessor: "company.name",  },
  { label: "Category", accessor: "category.main",  },
  { label: "Mobile", accessor: "mobile.number",  },
  { label: "City", accessor: "location.city",  },
  { label: "Source", accessor: "source.type",  },
  { label: "Added on", accessor: "added.date",  },
];

// 10 rows data
const rows = [
  {
    company: { name: "Tentamus India Pvt. Ltd" },
    category: { main: "Organic Products" },
    mobile: { number: "+91 9848042002" },
    location: { city: "Hyderabad" },
    source: { type: "Local Visit" },
    added: { date: "2025-01-10" },
  },
  {
    company: { name: "AgriLabs Pvt. Ltd" },
    category: { main: "Dairy" },
    mobile: { number: "+91 9876543210" },
    location: { city: "New Delhi" },
    source: { type: "Referral" },
    added: { date: "2025-02-05" },
  },
  {
    company: { name: "FreshFarms Ltd" },
    category: { main: "Vegetables" },
    mobile: { number: "+91 9123456789" },
    location: { city: "Mumbai" },
    source: { type: "Exhibition" },
    added: { date: "2025-03-15" },
  },
  {
    company: { name: "BioCrop Sciences" },
    category: { main: "Seeds" },
    mobile: { number: "+91 9812345678" },
    location: { city: "Ahmedabad" },
    source: { type: "Conference" },
    added: { date: "2025-04-20" },
  },
  {
    company: { name: "GreenHarvest Pvt Ltd" },
    category: { main: "Fruits" },
    mobile: { number: "+91 9876500000" },
    location: { city: "Pune" },
    source: { type: "Trade Fair" },
    added: { date: "2025-05-30" },
  },
  {
    company: { name: "NutriAgro Foods" },
    category: { main: "Processed Foods" },
    mobile: { number: "+91 9999998888" },
    location: { city: "Lucknow" },
    source: { type: "Website" },
    added: { date: "2025-06-12" },
  },
  {
    company: { name: "AgroChem Labs" },
    category: { main: "Chemicals" },
    mobile: { number: "+91 9123456000" },
    location: { city: "Chennai" },
    source: { type: "Dealer Network" },
    added: { date: "2025-07-01" },
  },
  {
    company: { name: "Healthy Harvesters" },
    category: { main: "Grains" },
    mobile: { number: "+91 9012345678" },
    location: { city: "Jaipur" },
    source: { type: "Cold Call" },
    added: { date: "2025-07-15" },
  },
  {
    company: { name: "AgroTech Solutions" },
    category: { main: "Agriculture Equipment" },
    mobile: { number: "+91 9988776655" },
    location: { city: "Bangalore" },
    source: { type: "Website" },
    added: { date: "2025-08-10" },
  },
  {
    company: { name: "GreenLeaf Exports" },
    category: { main: "Fruits & Vegetables" },
    mobile: { number: "+91 9871234560" },
    location: { city: "Kolkata" },
    source: { type: "Trade Fair" },
    added: { date: "2025-09-05" },
  },
];

  const handleClientClick = (clientData) => {
    setSelectedClient(clientData);
  };

  const handleBackClick = () => {
    setSelectedClient(null);
  };

  return (
    <div className="w-full h-auto bg-[#eef1f5]">
      {selectedClient ? (
        // When a client is selected, show only the ClientOverview component
        <ClientOverview client={selectedClient} onBack={handleBackClick} />
      ) : (
        // When no client is selected, show the list and the Textarea below it
        <>
          <div className="w-full bg-white shadow-md  mb-5">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between px-4 py-1">
              <h1 className="text-xl  text-gray-700 mb-2 lg:mb-0">
                CLIENT DATA 2025
              </h1>
            </div>
          </div>
          <div className="w-[97%] bg-white m-4 pb-1">
            <div className="flex justify-between pr-4 pt-1">
              <h1 className="text-base text-gray-950 pl-4 pt-1 font-semibold">
                RAW DATA LIST
              </h1>
              <div className="flex flex-wrap justify-start md:justify-end gap-2 mb-1">
                <button className="bg-[#337ab7] hover:bg-[#286090] text-white px-2.5 py-1  text-xs font-medium">
                  Add New Lead
                </button>
                <button className="bg-[#337ab7] hover:bg-[#286090] text-white px-2.5 py-1  text-xs font-medium">
                  Warm Client
                </button>
                <button className="bg-[#337ab7] hover:bg-[#286090] text-white px-2.5 py-1  text-xs font-medium">
                  Hot Client
                </button>
                <button className="bg-[#337ab7] hover:bg-[#286090] text-white px-2.5 py-1  text-xs font-medium">
                  Confirm Client
                </button>
                <button className="bg-[#337ab7] hover:bg-[#286090] text-white px-2.5 py-1  text-xs font-medium">
                  Cold Client
                </button>
                <button className="bg-[#337ab7] hover:bg-[#286090] text-white px-2.5 py-1  text-xs font-medium">
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
                 tableClassName="text-xs"
  
              />
            </div>
            <div className="mx-6 ">
              <UploaderTextarea />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RawDataList;
