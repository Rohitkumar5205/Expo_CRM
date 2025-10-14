import React, { useState } from "react";
import Globallytable from "../../Components/Globallytable";
import Textarea from "../../Components/Textarea";
import ClientOverview from "../../Components/ClientOverview";

const ColdClientList = () => {
  const [selectedClient, setSelectedClient] = useState(null);

  const columns = [
    { label: "Company Name", accessor: "company.name" },
    { label: "Contact Details", accessor: "contact.details" },
    { label: "Exihibitor Category", accessor: "Exihibitor.Category" },
    { label: "Nature of Bussiness", accessor: "Nature.Bussiness" },
    { label: "City", accessor: "location.city" },
    { label: "State", accessor: "location.state" },
    { label: "Source", accessor: "source.type" },
    { label: "Status", accessor: "Status.name" },
    { label: "Event", accessor: "Event.name" },
    { label: "Document No.", accessor: "Document.Number" },
    { label: "DealBy", accessor: "Event.type" },
    { label: "Updated Details", accessor: "Update.detail" },
  ];

  const rows = [
    {
      company: { name: "TechVision Pvt. Ltd." },
      contact: { details: "info@techvision.com, +91-9876543210" },
      Exihibitor: { Category: "IT Services" },
      Nature: { Bussiness: "Software Development" },
      location: { city: "Bangalore", state: "Karnataka" },
      source: { type: "Website" },
      Status: { name: "Active" },
      Event: { name: "Tech Expo 2025", type: "Mr. Sharma" },
      Document: { Number: "DOC-001" },
      Update: { detail: "Meeting scheduled for next week" },
    },
    {
      company: { name: "GreenLeaf Organics" },
      contact: { details: "contact@greenleaf.in, +91-9988776655" },
      Exihibitor: { Category: "Agriculture" },
      Nature: { Bussiness: "Organic Farming" },
      location: { city: "Pune", state: "Maharashtra" },
      source: { type: "Referral" },
      Status: { name: "Pending" },
      Event: { name: "Agro Fair", type: "Ms. Verma" },
      Document: { Number: "DOC-002" },
      Update: { detail: "Requested brochure via email" },
    },
    {
      company: { name: "Skyline Constructions" },
      contact: { details: "sales@skyline.com, +91-9123456789" },
      Exihibitor: { Category: "Real Estate" },
      Nature: { Bussiness: "Construction" },
      location: { city: "Hyderabad", state: "Telangana" },
      source: { type: "Cold Call" },
      Status: { name: "Interested" },
      Event: { name: "Infra Expo", type: "Mr. Khan" },
      Document: { Number: "DOC-003" },
      Update: { detail: "Shared proposal" },
    },
    {
      company: { name: "MediCare Solutions" },
      contact: { details: "support@medicare.com, +91-9786543210" },
      Exihibitor: { Category: "Healthcare" },
      Nature: { Bussiness: "Medical Equipment" },
      location: { city: "Chennai", state: "Tamil Nadu" },
      source: { type: "Event" },
      Status: { name: "Active" },
      Event: { name: "HealthCon", type: "Dr. Mehta" },
      Document: { Number: "DOC-004" },
      Update: { detail: "Demo arranged for next week" },
    },
    {
      company: { name: "EduSmart Technologies" },
      contact: { details: "hello@edusmart.com, +91-9345678901" },
      Exihibitor: { Category: "Education" },
      Nature: { Bussiness: "E-learning" },
      location: { city: "Delhi", state: "Delhi" },
      source: { type: "LinkedIn" },
      Status: { name: "Pending" },
      Event: { name: "EduTech Summit", type: "Ms. Kapoor" },
      Document: { Number: "DOC-005" },
      Update: { detail: "Follow-up in 2 days" },
    },
    {
      company: { name: "AquaPure Systems" },
      contact: { details: "sales@aquapure.com, +91-9654321876" },
      Exihibitor: { Category: "Water Solutions" },
      Nature: { Bussiness: "Water Purification" },
      location: { city: "Ahmedabad", state: "Gujarat" },
      source: { type: "Distributor" },
      Status: { name: "Active" },
      Event: { name: "Water Expo", type: "Mr. Patel" },
      Document: { Number: "DOC-006" },
      Update: { detail: "Quotation sent" },
    },
    {
      company: { name: "AutoDrive Motors" },
      contact: { details: "contact@autodrive.com, +91-9123987654" },
      Exihibitor: { Category: "Automobile" },
      Nature: { Bussiness: "Car Manufacturing" },
      location: { city: "Mumbai", state: "Maharashtra" },
      source: { type: "Website" },
      Status: { name: "Interested" },
      Event: { name: "Auto Expo", type: "Mr. Desai" },
      Document: { Number: "DOC-007" },
      Update: { detail: "Test drive requested" },
    },
    {
      company: { name: "FinServe Capital" },
      contact: { details: "info@finserve.com, +91-9345098765" },
      Exihibitor: { Category: "Finance" },
      Nature: { Bussiness: "Investment Advisory" },
      location: { city: "Kolkata", state: "West Bengal" },
      source: { type: "Email Campaign" },
      Status: { name: "Pending" },
      Event: { name: "Finance Summit", type: "Mr. Roy" },
      Document: { Number: "DOC-008" },
      Update: { detail: "Presentation scheduled" },
    },
    {
      company: { name: "Foodies Hub Pvt. Ltd." },
      contact: { details: "support@foodieshub.com, +91-9456123789" },
      Exihibitor: { Category: "Food & Beverages" },
      Nature: { Bussiness: "Restaurant Chain" },
      location: { city: "Jaipur", state: "Rajasthan" },
      source: { type: "Event" },
      Status: { name: "Active" },
      Event: { name: "Food Fest", type: "Chef Arora" },
      Document: { Number: "DOC-009" },
      Update: { detail: "Franchise inquiry received" },
    },
    {
      company: { name: "NextGen Robotics" },
      contact: { details: "hello@nextgenrobotics.com, +91-9765432189" },
      Exihibitor: { Category: "Robotics" },
      Nature: { Bussiness: "AI & Robotics" },
      location: { city: "Gurugram", state: "Haryana" },
      source: { type: "LinkedIn" },
      Status: { name: "Interested" },
      Event: { name: "Robotics Expo", type: "Ms. Nair" },
      Document: { Number: "DOC-010" },
      Update: { detail: "Product demo scheduled" },
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
          <div className="w-full bg-white shadow-md mb-4">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between px-4 py-1">
              <h1 className="text-xl  text-gray-700 mb-2 lg:mb-0">
                CLIENT DATA 2023
              </h1>
            </div>
          </div>

          <div className="w-[97%] bg-white mx-4 my-6">
            <div className="flex justify-between pr-4 pt-1">
              <h1 className="text-md font-semibold text-gray-950 pl-4 pt-1">
                COLD CLIENT LIST
              </h1>
              <div className="flex flex-wrap justify-start md:justify-end gap-2 mb-1">
                <button className="bg-[#337ab7] hover:bg-[#286090] text-white px-2.5 py-1  text-sm font-medium">
                  Add New Lead
                </button>
                <button className="bg-[#337ab7] hover:bg-[#286090] text-white px-2.5 py-1  text-sm font-medium">
                  Warm Client
                </button>
                <button className="bg-[#337ab7] hover:bg-[#286090] text-white px-2.5 py-1  text-sm font-medium">
                  Hot Client
                </button>
                <button className="bg-[#337ab7] hover:bg-[#286090] text-white px-2.5 py-1  text-sm font-medium">
                  Confirm Client
                </button>
                <button className="bg-[#337ab7] hover:bg-[#286090] text-white px-2.5 py-1  text-sm font-medium">
                  Cold Client
                </button>
                <button className="bg-[#337ab7] hover:bg-[#286090] text-white px-2.5 py-1  text-sm font-medium">
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
          {/* The Textarea component is now placed outside of the table's container */}
          <div className="bg-white shadow-md m-4   w-[97%]">
            <Textarea />
          </div>
        </>
      )}
    </div>
  );
};

export default ColdClientList;
