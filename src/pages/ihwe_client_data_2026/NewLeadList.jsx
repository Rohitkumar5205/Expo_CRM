import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Globallytable from "../../Components/Globallytable";
import Textarea from "../../Components/Textarea";
import ClientOverview from "../../Components/ClientOverview";
import { useSelector, useDispatch } from "react-redux";
import { fetchCompanies } from "../../features/company/companySlice";

const NewLeadList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedClient, setSelectedClient] = useState(null);

  // company redux
  const { companies, loading, error } = useSelector((state) => state.companies);
  // console.log("companies data", companies);

  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch]);

  const columns = [
    { label: "", accessor: "checkbox" },
    { label: "Company Name", accessor: "company.name" },
    { label: "Contact Details", accessor: "contact.details" },
    { label: "Category", accessor: "category.main" },
    { label: "Nature of Business", accessor: "business.type" },
    { label: "City", accessor: "location.city" },
    { label: "State", accessor: "location.state" },
    { label: "Source", accessor: "source.name" },
    { label: "Update Details", accessor: "update.details" },
  ];

  const rows = companies.map((c) => ({
    id: c._id,
    checkbox: true,
    company: { name: c.companyName },
    contact: {
      details: c.contacts
        .map(
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
        c.contacts[0]?.firstName || "-"
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
          <div className="w-full bg-white shadow-md">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between px-4 py-1 mb-4">
              <h1 className="text-xl font-semibold text-gray-700 mb-2 lg:mb-0">
                CLIENT DATA 2023
              </h1>
            </div>
          </div>
          <div className="w-full bg-white ">
            <div className="flex justify-between pr-4 pt-1">
              <h1 className="text-lg text-[#4f5a67] pl-4 pt-1">
                NEW LEAD LIST
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
          <div className="bg-white shadow-md m-3 p-4 rounded-md ">
            <Textarea />
          </div>
        </>
      )}
    </div>
  );
};

export default NewLeadList;
