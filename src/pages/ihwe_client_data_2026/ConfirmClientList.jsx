import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Globallytable from "../../Components/Globallytable";
import Textarea from "../../Components/Textarea";
import ClientOverview from "../../Components/ClientOverview";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanies } from "../../features/company/companySlice";

const ConfirmClientList = () => {
  const [selectedClient, setSelectedClient] = useState(null);
  const dispatch = useDispatch();
  const { companies, loading, error } = useSelector((state) => state.companies);

  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch]);

  // ✅ Fallback static data
  const fallbackRows = [
    {
      id: 1,
      company: { name: "Tentamus India Pvt. Ltd" },
      contact: { details: "Rohit Sharma | +91-9876543210 | rohit@tentamus.com" },
      category: { main: "Food & Beverages" },
      Nature: { name: "Manufacturing" },
      location: { city: "New Delhi", state: "Delhi" },
      size: { number: "Large" },
      Subject: { name: "Quality Check Follow-up" },
      source: { type: "Website Inquiry" },
      Status: { name: "Hot Client" },
      deal: { by: "Anita Verma" },
      Update: { detail: "Updated by Abhay Raj on 20 Sep 2025" },
    },
    {
      id: 2,
      company: { name: "AgroTech Solutions" },
      contact: { details: "Priya Verma | +91-9876501234 | priya@agrotech.com" },
      category: { main: "Agriculture" },
      Nature: { name: "Distributor" },
      location: { city: "Lucknow", state: "Uttar Pradesh" },
      size: { number: "Medium" },
      Subject: { name: "Client Review Call" },
      source: { type: "Cold Call" },
      Status: { name: "Follow-up" },
      deal: { by: "Rishabh Singh" },
      Update: { detail: "Updated by Rishabh Singh on 18 Sep 2025" },
    },
    {
      id: 3,
      company: { name: "Green Organics Ltd" },
      contact: { details: "Ankit Mehra | +91-9012345678 | ankit@greenorganics.com" },
      category: { main: "Organic Products" },
      Nature: { name: "Exporter" },
      location: { city: "Mumbai", state: "Maharashtra" },
      size: { number: "Small" },
      Subject: { name: "Price Negotiation" },
      source: { type: "Reference" },
      Status: { name: "Sent Details" },
      deal: { by: "Tanya Jaiswal" },
      Update: { detail: "Updated by Tanya Jaiswal on 16 Sep 2025" },
    },
    {
      id: 4,
      company: { name: "Herbal Life Care" },
      contact: { details: "Sunita Gupta | +91-9090909090 | sunita@herballife.com" },
      category: { main: "Healthcare" },
      Nature: { name: "Retailer" },
      location: { city: "Jaipur", state: "Rajasthan" },
      size: { number: "Medium" },
      Subject: { name: "Sample Dispatch" },
      source: { type: "Event Lead" },
      Status: { name: "New Client" },
      deal: { by: "Shimpi Rawat" },
      Update: { detail: "Updated by Shimpi Rawat on 14 Sep 2025" },
    },
  ];
// ✅ Dynamic Redux Data Mapping
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
    category: { main: c.category || "Uncategorized" },
    Nature: { name: c.businessNature || "Unknown" },
    location: { city: c.city || "-", state: c.state || "-" },
    size: { number: c.companySize || c.size || "N/A" }, // ✅ size fixed
    Subject: { name: c.subject || c.remark || "No Subject" }, // ✅ subject fixed
    source: { type: c.dataSource || "Manual Entry" },
    Status: { name: c.status || "Pending" },
    deal: { by: c.dealBy || "Not Assigned" },
    Update: {
      detail: `${
        c.updatedAt ? new Date(c.updatedAt).toLocaleDateString() : "—"
      } | ${c.contacts?.[0]?.firstName || "-"}`,
    },
  })) || [];

// ✅ Use dynamic data if present, else fallback static data
const rows = dynamicRows.length > 0 ? dynamicRows : fallbackRows;


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
    { label: "Category", accessor: "category.main" },
    { label: "Nature", accessor: "Nature.name" },
    { label: "City", accessor: "location.city" },
    { label: "State", accessor: "location.state" },
    { label: "Size", accessor: "size.number" },
    { label: "Subject", accessor: "Subject.name" },
    { label: "Source", accessor: "source.type" },
    { label: "Status", accessor: "Status.name" },
    { label: "Deal By", accessor: "deal.by" },
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
        <ClientOverview client={selectedClient} onBack={handleBackClick} />
      ) : (
        <>
          <div className="w-full bg-white shadow-md">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between px-4 py-1">
              <h1 className="text-xl text-gray-700 mb-2 lg:mb-0">CLIENT DATA 2023</h1>
            </div>
          </div>
          <div className="w-[97%] bg-white m-4">
            <div className="flex justify-between pr-4 pt-1">
              <h1 className="text-md text-gray-950 pl-4 pt-1 font-semibold">CONFIRM CLIENT LIST</h1>
            </div>
            <hr className="opacity-10 mb-2" />
            <div className="text-xs">
              {/* ✅ Pass merged rows */}
              <Globallytable
                rows={rows}
                colomns={columns}
                onRowClick={handleClientClick}
                specificColor={false}
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

export default ConfirmClientList;
