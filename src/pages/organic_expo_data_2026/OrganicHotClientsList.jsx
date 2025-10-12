import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Globallytable from "../../Components/Globallytable";
import Textarea from "../../Components/Textarea";
import ClientOverview from "../../Components/ClientOverview";

const OrganicHotClientsList = () => {
  // Renamed from Page2 to Hot
  const [selectedClient, setSelectedClient] = useState(null);
  const navigate = useNavigate();

  const columns = [
    { label: "Company Name", accessor: "company.name" },
    { label: "Company Email", accessor: "company.email" },
    { label: "Contact Person", accessor: "contact.person" },
    { label: "Phone", accessor: "contact.phone" },
    { label: "Category", accessor: "category.main" },
    { label: "Sub Category", accessor: "category.sub" },
    { label: "Business Type", accessor: "Business.type" }, // Fixed typo: "Bussiness" to "Business"
    { label: "City", accessor: "location.city" },
    { label: "State", accessor: "location.state" },
    { label: "Pincode", accessor: "location.pincode" },
    { label: "Source Type", accessor: "source.type" },
    { label: "Added By", accessor: "source.addedBy" },
    { label: "Last Update Date", accessor: "update.date" },
    { label: "Updated By", accessor: "update.by" },
  ];

  const rows = [
    {
      checkbox: true,
      company: { name: "Tentamus India Pvt. Ltd", email: "labs@tentamus.com" },
      contact: { person: "Ravi Kumar", phone: "+91 9848042002" },
      category: { main: "Organic Products", sub: "Fertiliser" },
      Business: { type: "Manufacturer" }, // Fixed typo: "Bussiness" to "Business"
      location: { city: "Hyderabad", pincode: "500001", state: "Telangana" },
      source: { type: "Local Visit", addedBy: "Admin" },
      update: { date: "17 Sep 2025", by: "Sumit" },
    },
    {
      checkbox: true,
      company: { name: "AgriLabs Pvt. Ltd", email: "info@agrilabs.com" },
      contact: { person: "Neha Sharma", phone: "+91 9876543210" },
      category: { main: "Dairy", sub: "Milk Testing" },
      Business: { type: "Manufacturer" },
      location: { city: "Delhi", pincode: "110001", state: "Delhi" },
      source: { type: "Referral", addedBy: "Ramesh" },
      update: { date: "12 Sep 2025", by: "Anita" },
    },
    {
      checkbox: true,
      company: { name: "FreshFarms Ltd", email: "contact@freshfarms.com" },
      contact: { person: "Amit Verma", phone: "+91 9123456789" },
      category: { main: "Vegetables", sub: "Export Quality" },
      Business: { type: "Manufacturer" },
      location: { city: "Mumbai", pincode: "400001", state: "Maharashtra" },
      source: { type: "Exhibition", addedBy: "Seema" },
      update: { date: "05 Sep 2025", by: "Ravi" },
    },
    {
      checkbox: true,
      company: { name: "BioCrop Sciences", email: "support@biocrop.com" },
      contact: { person: "Priya Mehta", phone: "+91 9812345678" },
      category: { main: "Seeds", sub: "Hybrid Seeds" },
      Business: { type: "Manufacturer" },
      location: { city: "Ahmedabad", pincode: "380001", state: "Gujarat" },
      source: { type: "Conference", addedBy: "Karan" },
      update: { date: "10 Aug 2025", by: "Deepak" },
    },
    {
      checkbox: true,
      company: { name: "GreenHarvest Pvt Ltd", email: "info@greenharvest.com" },
      contact: { person: "Suresh Patel", phone: "+91 9876500000" },
      category: { main: "Fruits", sub: "Organic Mangoes" },
      Business: { type: "Exporter" },
      location: { city: "Pune", pincode: "411001", state: "Maharashtra" },
      source: { type: "Trade Fair", addedBy: "Ritika" },
      update: { date: "20 Jul 2025", by: "Alok" },
    },
    {
      checkbox: true,
      company: { name: "NutriAgro Foods", email: "contact@nutriagro.com" },
      contact: { person: "Vikas Singh", phone: "+91 9999998888" },
      category: { main: "Processed Foods", sub: "Snacks" },
      Business: { type: "Supplier" },
      location: { city: "Lucknow", pincode: "226001", state: "Uttar Pradesh" },
      source: { type: "Website", addedBy: "Manish" },
      update: { date: "02 Jul 2025", by: "Priya" },
    },
    {
      checkbox: true,
      company: { name: "AgroChem Labs", email: "sales@agrochem.com" },
      contact: { person: "Kavita Rao", phone: "+91 9123456000" },
      category: { main: "Chemicals", sub: "Pesticides" },
      Business: { type: "Distributor" },
      location: { city: "Chennai", pincode: "600001", state: "Tamil Nadu" },
      source: { type: "Dealer Network", addedBy: "Rohit" },
      update: { date: "18 Jun 2025", by: "Sonal" },
    },
    {
      checkbox: true,
      company: { name: "Healthy Harvesters", email: "info@healthyharvest.com" },
      contact: { person: "Arjun Kapoor", phone: "+91 9012345678" },
      category: { main: "Grains", sub: "Organic Wheat" },
      Business: { type: "Wholesaler" },
      location: { city: "Jaipur", pincode: "302001", state: "Rajasthan" },
      source: { type: "Cold Call", addedBy: "Meena" },
      update: { date: "05 May 2025", by: "Raj" },
    },
  ];

  const handleClientClick = (clientData) => {
    setSelectedClient(clientData);
  };

  const handleBackClick = () => {
    setSelectedClient(null);
  };

  const handleAddNewLeadClick = () => {
    navigate("/organicexpo2026/addnew"); // Updated to Organic Expo 2026 routing
  };

  const handleWarmClientClick = () => {
    navigate("/organicexpo2026/warmclient"); // Placeholder path, update as needed
  };

  const handleHotClientClick = () => {
    navigate("/organicexpo2026/hotclient"); // Updated to self-reference or adjust as needed
  };

  const handleConfirmClientClick = () => {
    navigate("/organicexpo2026/confirmclient"); // Placeholder path, update as needed
  };

  const handleColdClientClick = () => {
    navigate("/organicexpo2026/coldclient"); // Placeholder path, update as needed
  };

  const handleRawDataListClick = () => {
    navigate("/organicexpo2026/rawdatalist"); // Placeholder path, update as needed
  };

  return (
    <div className="w-full h-auto bg-[#eef1f5]">
      {selectedClient ? (
        <ClientOverview client={selectedClient} onBack={handleBackClick} />
      ) : (
        <>
          <div className="w-full bg-white shadow-md border-b">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between px-4 py-3">
              <h1 className="text-xl font-semibold text-gray-700 mb-2 lg:mb-0">
                ORGANIC EXPO 2026 - HOT CLIENT LIST
              </h1>
            </div>
          </div>
          <div className="w-full bg-white p-3">
            <h1 className="text-lg text-[#4f5a67] pl-4 pt-1">
              HOT CLIENT LIST
            </h1>
            <div className="flex flex-wrap justify-start md:justify-end gap-2 mb-1">
              <button
                onClick={handleAddNewLeadClick}
                className="bg-[#337ab7] hover:bg-[#286090] text-white px-2.5 py-1 rounded-sm text-sm font-medium"
              >
                Add New Lead
              </button>
              <button
                onClick={handleWarmClientClick}
                className="bg-[#337ab7] hover:bg-[#286090] text-white px-2.5 py-1 rounded-sm text-sm font-medium"
              >
                Warm Client
              </button>
              <button
                onClick={handleHotClientClick}
                className="bg-[#337ab7] hover:bg-[#286090] text-white px-2.5 py-1 rounded-sm text-sm font-medium"
              >
                Hot Client
              </button>
              <button
                onClick={handleConfirmClientClick}
                className="bg-[#337ab7] hover:bg-[#286090] text-white px-2.5 py-1 rounded-sm text-sm font-medium"
              >
                Confirm Client
              </button>
              <button
                onClick={handleColdClientClick}
                className="bg-[#337ab7] hover:bg-[#286090] text-white px-2.5 py-1 rounded-sm text-sm font-medium"
              >
                Cold Client
              </button>
              <button
                onClick={handleRawDataListClick}
                className="bg-[#337ab7] hover:bg-[#286090] text-white px-2.5 py-1 rounded-sm text-sm font-medium"
              >
                Raw Data List
              </button>
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
          <div className="bg-white shadow-md m-3 p-4 rounded-md">
            <Textarea />
          </div>
        </>
      )}
    </div>
  );
};

export default OrganicHotClientsList;
