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

  const columns = [
    {
      label: "Company Name",
      accessor: "company.name",
      render: (value, row) => (
        <Link
          to={`/clientOverview1/${row.id}`}
          className="hover:underline text-blue-500"
        >
          {value}
        </Link>
      ),
    },
    { label: "Contact Details", accessor: "contact.details" },
    { label: "Category", accessor: "category.main" },
    { label: "Nature Bussiness", accessor: "Nature Bussiness" },
    { label: "City", accessor: "location.city" },
    { label: "State", accessor: "location.state" },
    { label: "Source", accessor: "source.type" },
    { label: "Status", accessor: "Status" },
    { label: "Event", accessor: "Event.type" },
    { label: "Updated Details", accessor: "Update.detail" },
  ];

  // 🧱 Prepare Rows
  const filteredCompanies = companies.filter(
    (c) => c.companyStatus === "Est./PI Sent",
  );
  const rows = filteredCompanies.map((c) => ({
    id: c._id,
    checkbox: true,
    company: {
      name: c.companyName,
    },
    contact: {
      details: c.contacts
        ?.map(
          (contact) =>
            `${contact.firstName} ${contact.surname} | ${contact.mobile}`,
        )
        .join(", "),
    },
    category: { main: c.category },
    "Nature Bussiness": c.businessNature,
    location: { city: c.city, state: c.state },
    source: { type: c.dataSource || "-" },
    Status: c.companyStatus,
    Event: { type: "Organic Expo 2026" },
    Update: {
      detail: `${new Date(c.updatedAt).toLocaleDateString()} | ${
        c.contacts?.[0]?.firstName || "-"
      }`,
    },
  }));

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
          {/* 🔹 Header */}
          <div className="w-full bg-white">
            <div className="w-full bg-white  flex flex-col sm:flex-row justify-between items-center px-4 py-1 mb-3">
              <h1 className="text-xl text-gray-500 mb-2 lg:mb-0 uppercase">
                CLIENT DATA 2026
              </h1>
            </div>
          </div>
          {/* 🔹 Main Section */}
          <div className=" bg-white mx-3 p-2 rounded shadow-sm">
            <div className="flex justify-between items-center pr-4 pt-2">
              <h1 className="text-base font-normal text-gray-800 px-4">
                HOT CLIENT LIST{" "}
              </h1>
              {/* 🔸 Navigation Buttons */}
              <div className="flex flex-wrap justify-end gap-2">
                <Link
                  to="/ihweClientData2026/addNewClients"
                  className="px-3 py-1 text-xs bg-[#337ab7] hover:bg-[#286090]  text-white  transition"
                >
                  Add New Lead
                </Link>
                <Link
                  to="/ihweClientData2026/warmClientList"
                  className="px-3 py-1 text-xs bg-[#337ab7] hover:bg-[#286090]  text-white  transition"
                >
                  Warm Client
                </Link>
                <Link
                  to="/ihweClientData2026/hotClientList"
                  className="px-3 py-1 text-xs bg-[#337ab7] hover:bg-[#286090]  text-white  transition"
                >
                  Hot Client
                </Link>
                <Link
                  to="/ihweClientData2026/confirmClientList"
                  className="px-3 py-1 text-xs bg-[#337ab7] hover:bg-[#286090]  text-white  transition"
                >
                  Confirm Client
                </Link>
                <Link
                  to="/ihweClientData2026/coldClientList"
                  className="px-3 py-1 text-xs bg-[#337ab7] hover:bg-[#286090]  text-white  transition"
                >
                  Cold Client
                </Link>
                <Link
                  to="/ihweClientData2026/rawDataList"
                  className="px-3 py-1 text-xs bg-[#337ab7] hover:bg-[#286090]  text-white  transition"
                >
                  Raw Data List
                </Link>
              </div>
            </div>
            <hr className="opacity-10 my-2" />
            <div className="text-xs">
              <Globallytable
                rows={rows}
                colomns={columns}
                onRowClick={handleClientClick}
              />
            </div>
          </div>
          <div className="bg-white shadow-md m-3 ">
            <Textarea />
          </div>
        </>
      )}
    </div>
  );
};

export default HotClientList;
