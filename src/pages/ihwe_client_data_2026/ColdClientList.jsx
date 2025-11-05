import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Globallytable from "../../Components/Globallytable";
import Textarea from "../../Components/Textarea";
import ClientOverview from "../../Components/ClientOverview";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanies } from "../../features/company/companySlice";

const ColdClientList = () => {
  const [selectedClient, setSelectedClient] = useState(null);

  const dispatch = useDispatch();
  const { companies, loading, error } = useSelector((state) => state.companies);

  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch]);

const fallbackRows = [
  {
    id: 1,
    company: { name: "Tentamus India Pvt. Ltd" },
    contact: { details: "Rohit Sharma | +91-9876543210 | rohit@tentamus.com" },
    Exihibitor: { Category: "Food & Beverages" },
    Nature: { Bussiness: "Manufacturer" },
    location: { city: "New Delhi", state: "Delhi" },
    source: { type: "Website Inquiry" },
    Status: { name: "Hot Client" },
    Event: { name: "Food Expo 2025", type: "Anita Verma" },
    Document: { Number: "DOC-2025-001" },
    Update: { detail: "Updated by Abhay Raj on 20 Sep 2025" },
  },
  {
    id: 2,
    company: { name: "AgroTech Solutions" },
    contact: { details: "Priya Verma | +91-9876501234 | priya@agrotech.com" },
    Exihibitor: { Category: "Agriculture" },
    Nature: { Bussiness: "Distributor" },
    location: { city: "Lucknow", state: "Uttar Pradesh" },
    source: { type: "Cold Call" },
    Status: { name: "Follow-up" },
    Event: { name: "AgroFair 2025", type: "Rishabh Singh" },
    Document: { Number: "DOC-2025-002" },
    Update: { detail: "Updated by Rishabh Singh on 18 Sep 2025" },
  },
  {
    id: 3,
    company: { name: "Green Organics Ltd" },
    contact: { details: "Ankit Mehra | +91-9012345678 | ankit@greenorganics.com" },
    Exihibitor: { Category: "Organic Products" },
    Nature: { Bussiness: "Exporter" },
    location: { city: "Mumbai", state: "Maharashtra" },
    source: { type: "Reference" },
    Status: { name: "Sent Details" },
    Event: { name: "Organic India Expo", type: "Tanya Jaiswal" },
    Document: { Number: "DOC-2025-003" },
    Update: { detail: "Updated by Tanya Jaiswal on 16 Sep 2025" },
  },
];

const dynamicRows =
  companies?.map((c) => ({
    id: c._id,
    company: { name: c.companyName || "N/A" },
    contact: {
      details:
        c.contacts?.length > 0
          ? c.contacts
              .map((ct) => `${ct.firstName} ${ct.surname} | ${ct.mobile}`)
              .join(", ")
          : "No Contacts",
    },
    Exihibitor: { Category: c.category || "Uncategorized" },
    Nature: { Bussiness: c.businessNature || "Unknown" },
    location: { city: c.city || "-", state: c.state || "-" },
    source: { type: c.dataSource || "Manual Entry" },
    Status: { name: c.status || "Pending" },
    Event: { name: c.eventName || "No Event", type: c.dealBy || "Not Assigned" },
    Document: { Number: c.documentNo || "N/A" },
    Update: {
      detail: `${
        new Date(c.updatedAt).toLocaleDateString() || "-"
      } | ${c.contacts?.[0]?.firstName || "-"} `,
    },
  })) || [];

  const rows =
  dynamicRows && dynamicRows.length > 0 ? dynamicRows : fallbackRows;


   const columns = [
    {
      label: "Company Name",
      accessor: "company.name",
      render: (value, row) => (
        <Link to={`/clientOverview1/${row.id}`} className="hover:underline text-blue-500">
          {value}
        </Link>
      ),
    },
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

          <div className="w-[97%] bg-white m-4">
            <div className="flex justify-between pr-4 pt-1">
              <h1 className="text-md font-semibold text-gray-950 pl-4 pt-1">
                COLD CLIENT LIST
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
                specificColor={false}
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
