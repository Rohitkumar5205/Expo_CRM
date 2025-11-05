import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Globallytable from "../../Components/Globallytable";
import Textarea from "../../Components/Textarea";
import ClientOverview from "../../Components/ClientOverview";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanies } from "../../features/company/companySlice";
const HotClientList = () => {
  const [selectedClient, setSelectedClient] = useState(null);
  const navigate = useNavigate();
  
  //logic of table data
    const dispatch = useDispatch();
    // 🏢 Company redux data
  const { companies, loading, error } = useSelector((state) => state.companies);

  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch]);
  
    

   // ✅ 2️⃣ Dynamic Redux mapping (safe)
const dynamicRows =
  companies?.map((c) => ({
    id: c._id,
    Client: { name: c.companyName || "N/A" },
    contact: {
      details:
        c.contacts?.length > 0
          ? c.contacts
              .map(
                (ct) => `${ct.firstName} ${ct.surname} | ${ct.mobile}`
              )
              .join(", ")
          : "No Contacts",
    },
    category: { main: c.category || "Not Specified" },
    location: { city: c.city || "Unknown", state: c.state || "Unknown" },
    source: { type: c.dataSource || "Manual Entry" },
    Status: c.status || "Pending",
    Event: { type: c.event || "N/A" },
    Document: { number: c.documentNo || "N/A" },
    Updated: {
      number: c.updateNo || "N/A",
      detail: `${new Date(c.updatedAt).toLocaleDateString()} | ${
        c.contacts?.[0]?.firstName || "-"
      }`,
    },
  })) || [];




 // ✅ 1️⃣ Fallback (static) rows
const fallbackRows = [
  {
    id: 1,
    Client: { name: "Tentamus India Pvt. Ltd" },
    contact: { details: "Rohit Sharma | +91-9876543210 | rohit@tentamus.com" },
    category: { main: "Food & Beverages" },
    location: { city: "New Delhi", state: "Delhi" },
    source: { type: "Website Inquiry" },
    Status: "Warm Client",
    Event: { type: "Organic Expo 2026" },
    Document: { number: "DOC-001" },
    Updated: {
      number: "UPD-001",
      detail: "Updated by Abhay Raj on 20 Sep 2025",
    },
  },
  {
    id: 2,
    Client: { name: "AgroTech Solutions" },
    contact: { details: "Priya Verma | +91-9876501234 | priya@agrotech.com" },
    category: { main: "Agriculture" },
    location: { city: "Lucknow", state: "Uttar Pradesh" },
    source: { type: "Cold Call" },
    Status: "Follow-up",
    Event: { type: "Agri India Expo 2025" },
    Document: { number: "DOC-002" },
    Updated: {
      number: "UPD-002",
      detail: "Updated by Rishabh Singh on 18 Sep 2025",
    },
  },
  {
    id: 3,
    Client: { name: "Green Organics Ltd" },
    contact: { details: "Ankit Mehra | +91-9012345678 | ankit@greenorganics.com" },
    category: { main: "Organic Products" },
    location: { city: "Mumbai", state: "Maharashtra" },
    source: { type: "Reference" },
    Status: "Sent Details",
    Event: { type: "Organic Expo 2026" },
    Document: { number: "DOC-003" },
    Updated: {
      number: "UPD-003",
      detail: "Updated by Tanya Jaiswal on 16 Sep 2025",
    },
  },
  {
    id: 4,
    Client: { name: "Herbal Life Care" },
    contact: { details: "Sunita Gupta | +91-9090909090 | sunita@herballife.com" },
    category: { main: "Healthcare" },
    location: { city: "Jaipur", state: "Rajasthan" },
    source: { type: "Event Lead" },
    Status: "New Client",
    Event: { type: "Health Expo 2025" },
    Document: { number: "DOC-004" },
    Updated: {
      number: "UPD-004",
      detail: "Updated by Shimpi Rawat on 14 Sep 2025",
    },
  },
  {
    id: 5,
    Client: { name: "Spice World Exporters" },
    contact: { details: "Arjun Yadav | +91-9123456789 | arjun@spiceworld.com" },
    category: { main: "Export" },
    location: { city: "Kochi", state: "Kerala" },
    source: { type: "Walk-in" },
    Status: "Not Interested",
    Event: { type: "International Trade Fair 2025" },
    Document: { number: "DOC-005" },
    Updated: {
      number: "UPD-005",
      detail: "Updated by Manoj Mishra on 10 Sep 2025",
    },
  },
  {
    id: 6,
    Client: { name: "BioPure Naturals" },
    contact: { details: "Kavita Joshi | +91-9811122233 | kavita@biopure.com" },
    category: { main: "Cosmetics" },
    location: { city: "Pune", state: "Maharashtra" },
    source: { type: "Social Media" },
    Status: "Interested",
    Event: { type: "Beauty Expo 2025" },
    Document: { number: "DOC-006" },
    Updated: {
      number: "UPD-006",
      detail: "Updated by Anjali Singh on 12 Oct 2025",
    },
  },
  {
    id: 7,
    Client: { name: "Ayurveda Essentials" },
    contact: { details: "Rajesh Patel | +91-9823456789 | rajesh@ayurvedaessentials.com" },
    category: { main: "Wellness" },
    location: { city: "Ahmedabad", state: "Gujarat" },
    source: { type: "Reference" },
    Status: "Warm Client",
    Event: { type: "Wellness Fair 2025" },
    Document: { number: "DOC-007" },
    Updated: {
      number: "UPD-007",
      detail: "Updated by Deepak Singh on 22 Oct 2025",
    },
  },
  {
    id: 8,
    Client: { name: "EcoGrow Fertilizers" },
    contact: { details: "Meena Kumari | +91-9876001122 | meena@ecogrow.com" },
    category: { main: "Agriculture" },
    location: { city: "Chandigarh", state: "Punjab" },
    source: { type: "Cold Email" },
    Status: "Pending Follow-up",
    Event: { type: "Agri Expo 2026" },
    Document: { number: "DOC-008" },
    Updated: {
      number: "UPD-008",
      detail: "Updated by Vishal Tiwari on 02 Nov 2025",
    },
  },
];

// ✅ 3️⃣ Final merge logic (fallback)
const rows = dynamicRows.length > 0 ? dynamicRows : fallbackRows;

 const columns = [
        { label: "Client Name", accessor: "Client.name",
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
        { label: "City", accessor: "location.city" },
        { label: "State", accessor: "location.state" },
         { label: "Source", accessor: "source.type" },
         { label: "Status", accessor: "Status" },
         { label: "Event", accessor: "Event.type" },
        { label: "Document No.", accessor: "Document.number" },
       { label: "Updated No.", accessor: "Updated.number" },  
        { label: "Updated Details", accessor: "Updated.detail" },  
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
              <h1 className="text-base font-semibold text-gray-900 pl-4 pt-1">
              HOT CLIENT LIST
            </h1>
            <div className="flex flex-wrap justify-start gap-2 mb-1">
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

export default HotClientList;
