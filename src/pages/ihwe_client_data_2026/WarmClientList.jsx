import React, { useEffect, useState } from "react";
import {  Link, useNavigate, useParams } from "react-router-dom";
import Globallytable from "../../Components/Globallytable";
import Textarea from "../../Components/Textarea";
import ClientOverview from "../../Components/ClientOverview";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanies } from "../../features/company/companySlice";

const WarmClientList = () => {
  const [selectedClient, setSelectedClient] = useState(null);
  const navigate = useNavigate();
 
 
  //logic of table data
  const dispatch = useDispatch();

  // 🏢 Company redux data
  const { companies, loading, error } = useSelector((state) => state.companies);

  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch]);

  // useparms for id

  const { id } = useParams();
 

     const columns = [
        { label: "Company Name", accessor: "company.name",
         render:(value,row)=>(
          <Link to={`/clientOverview1/${row.id}`}
          className="hover:underline text-blue-500"
          >
          {value}
          </Link>
         )
         }, 
        { label: "Contact Details", accessor: "contact.details" },
        { label: "Category", accessor: "category.main" },
        { label: "Nature Bussiness", accessor: "Nature Bussiness" },
        { label: "Business Type", accessor: "Bussiness.type" },
        { label: "City", accessor: "location.city" },
        { label: "State", accessor: "location.state" },
        { label: "Source", accessor: "source.type" },
        { label: "Status", accessor: "Status" },
        { label: "Event", accessor: "Event.type" },
        { label: "Update Details", accessor: "Update.detail" },
    ];

     // 🧱 Prepare Rows
  const rows = companies.map((c) => ({
    id: c._id,
    checkbox: true,
    company: {
      name: c.companyName,
    },
    contact: {
      details: c.contacts
        ?.map(
          (contact) =>
            `${contact.firstName} ${contact.surname} | ${contact.mobile}`
        )
        .join(", "),
    },
    category: { main: c.category },
    business: { type: c.businessNature },
    location: { city: c.city, state: c.state },
    source: { name: c.dataSource || "-" },
    update: {
      details: `${new Date(c.updatedAt).toLocaleDateString()} | ${
        c.contacts?.[0]?.firstName || "-"
      }`,
    },
  }));

  {/* const rows = [
  {
    id: {_id:1},
    company: { name: "Tentamus India Pvt. Ltd" },
    contact: { details: "Rohit Sharma | +91-9876543210 | rohit@tentamus.com" },
    category: { main: "Food & Beverages" },
    "Nature Bussiness": "Manufacturing",
    Bussiness: { type: "Private Limited" },
    location: { city: "New Delhi", state: "Delhi" },
    source: { type: "Website Inquiry" },
    Status: "Warm Client",
    Event: { type: "Organic Expo 2026" },
    Update: { detail: "Updated by Abhay Raj on 20 Sep 2025" },
  },
  {
    id: {_id:2},
    company: { name: "AgroTech Solutions" },
    contact: { details: "Priya Verma | +91-9876501234 | priya@agrotech.com" },
    category: { main: "Agriculture" },
    "Nature Bussiness": "Trading",
    Bussiness: { type: "Proprietorship" },
    location: { city: "Lucknow", state: "Uttar Pradesh" },
    source: { type: "Cold Call" },
    Status: "Follow-up Call",
    Event: { type: "Agri India Expo 2025" },
    Update: { detail: "Updated by Rishabh Singh on 18 Sep 2025" },
  },
  {
    id: {_id:3},
    company: { name: "Green Organics Ltd" },
    contact: { details: "Ankit Mehra | +91-9012345678 | ankit@greenorganics.com" },
    category: { main: "Organic Products" },
    "Nature Bussiness": "Distributor",
    Bussiness: { type: "Public Limited" },
    location: { city: "Mumbai", state: "Maharashtra" },
    source: { type: "Reference" },
    Status: "Sent Details",
    Event: { type: "Organic Expo 2026" },
    Update: { detail: "Updated by Tanya Jaiswal on 16 Sep 2025" },
  },
  {
    id: {_id:4},
    company: { name: "Herbal Life Care" },
    contact: { details: "Sunita Gupta | +91-9090909090 | sunita@herballife.com" },
    category: { main: "Healthcare" },
    "Nature Bussiness": "Retail" ,
    Bussiness: { type: "Partnership" },
    location: { city: "Jaipur", state: "Rajasthan" },
    source: { type: "Event Lead" },
    Status: "New Client",
    Event: { type: "Health Expo 2025" },
    Update: { detail: "Updated by Shimpi Rawat on 14 Sep 2025" },
  },
  {
    id: {_id:5},
    company: { name: "Spice World Exporters" },
    contact: { details: "Arjun Yadav | +91-9123456789 | arjun@spiceworld.com" },
    category: { main: "Export" },
    "Nature Bussiness": "Exporter",
    Bussiness: { type: "LLP" },
    location: { city: "Kochi", state: "Kerala" },
    source: { type: "Walk-in" },
    Status: "Not Interested",
    Event: { type: "International Trade Fair 2025" },
    Update: { detail: "Updated by Manoj Mishra on 10 Sep 2025" },
  }
];*/}

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
          <div className="w-full bg-white shadow-md">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between px-4 py-1 mb-4">
              <h1 className="text-xl  text-gray-600 mb-2 lg:mb-0">
                CLIENT DATA 2023
              </h1>
            </div>
          </div>
          <div className="w-[97%] bg-white px-3 py-1 m-4">
            <div className="flex justify-between md:justify-between mb-2 ">
              <h1 className="text-base font-semibold text-gray-950 pl-2 pt-1">
              WARM CLIENT LIST{" "}
            </h1>
           
            
            <div className=" flex gap-2 ">
              <button
                onClick={handleAddNewLeadClick}
                className="bg-[#337ab7] hover:bg-[#286090] text-white px-2.5 py-1  text-xs font-medium"
              >
                Add New Lead
              </button>
              <button
                onClick={handleWarmClientClick}
                className="bg-[#337ab7] hover:bg-[#286090] text-white px-2.5 py-1  text-xs font-medium"
              >
                Warm Client
              </button>
              <button
                onClick={handleHotClientClick}
                className="bg-[#337ab7] hover:bg-[#286090] text-white px-2.5 py-1  text-xs font-medium"
              >
                Hot Client
              </button>
              <button
                onClick={handleConfirmClientClick}
                className="bg-[#337ab7] hover:bg-[#286090] text-white px-2.5 py-1  text-xs font-medium"
              >
                Confirm Client
              </button>
              <button
                onClick={handleColdClientClick}
                className="bg-[#337ab7] hover:bg-[#286090] text-white px-2.5 py-1  text-xs font-medium"
              >
                Cold Client
              </button>
              <button
                onClick={handleRawDataListClick}
                className="bg-[#337ab7] hover:bg-[#286090] text-white px-2.5 py-1  text-xs font-medium"
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
          <div className="bg-white w-[97%] m-4  ">
            <Textarea />
          </div>
        </>
      )}
    </div>
  );
};

export default WarmClientList;
