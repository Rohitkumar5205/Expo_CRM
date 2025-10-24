import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Globallytable from "../../Components/Globallytable";
import Textarea from "../../Components/Textarea";
import { useSelector, useDispatch } from "react-redux";
import { fetchCompanies } from "../../features/company/companySlice";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const NewLeadList = () => {
  const dispatch = useDispatch();

  // 🏢 Company redux data
  const { companies, loading, error } = useSelector((state) => state.companies);

  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch]);

  // 📋 Table Columns
  const columns = [
    {
      label: "Company Name",
      accessor: "company.name",
      render: (value, row) => (
        <Link
          to={`/clientOverview1/${row.id}`} // use row.id
          className="text-blue-500 hover:underline"
        >
          {value} {/* value = company name */}
        </Link>
      ),
    },
    { label: "Contact Details", accessor: "contact.details" },
    { label: "Category", accessor: "category.main" },
    { label: "Nature of Business", accessor: "business.type" },
    { label: "City", accessor: "location.city" },
    { label: "State", accessor: "location.state" },
    { label: "Source", accessor: "source.name" },
    { label: "Update Details", accessor: "update.details" },
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

  // 🆔 For Debugging (optional)
  // const allIds = rows.map((row) => row.id);
  // console.log("✅ All Company IDs:", allIds);

  return (
    <div className="w-full h-auto bg-[#eef1f5]">
      {/* 🔹 Header */}
      <div className="w-full bg-white shadow-md">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between px-4 py-2 mb-3">
          <h1 className="text-xl text-gray-500 font-normal">
            CLIENT DATA 2023
          </h1>
        </div>
      </div>

      {/* 🔹 Main Section */}
      <div className="w-[97%] bg-white ml-5 p-2 rounded-md shadow-sm">
        <div className="flex justify-between items-center pr-4 pt-2">
          <h1 className="text-base font-semibold text-gray-900 pl-4">
            NEW LEAD LIST
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

        {/* 🔹 Data Table */}
        <div className="text-xs">
          {loading ? (
            <div className="text-center text-gray-500 py-4">Loading...</div>
          ) : error ? (
            <div className="text-center text-red-500 py-4">
              Error loading companies: {error}
            </div>
          ) : (
            <Globallytable rows={rows} colomns={columns} />
          )}
        </div>
      </div>

      {/* 🔹 Notes Section */}
      <div className="bg-white shadow-md m-3 ml-5 p-3 -md">
        <Textarea />
      </div>
    </div>
  );
};

export default NewLeadList;
