import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { FaTrash, FaUser, FaBuilding, FaPencilAlt } from "react-icons/fa";
import { fetchCompanies } from "../features/company/companySlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const ClientOverview1 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [showAccounts, setShowAccounts] = useState(false);
  const [showPayments, setShowPayments] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [Flip, setFlip] = useState(false);

  // company redux
  const { companies, loading, error } = useSelector((state) => state.companies);
  const [company, setCompany] = useState(null);

  console.log("ClientOverview1", companies);
  useEffect(() => {
    if (companies.length === 0) {
      dispatch(fetchCompanies());
    }
  }, [dispatch, companies]);

  useEffect(() => {
    if (companies.length > 0) {
      const matched = companies.find((c) => c._id === id);
      setCompany(matched);
    }
  }, [companies, id]);

  const handleEdit = () => {
    if (!company) return; // safety check
    navigate(`/ihweClientData2026/addNewClients/${company._id}`, {
      state: { heading: "Edit Client Details" },
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!company) return <p>No company found with ID: {id}</p>;

  const baseInputClass =
    "mt-1 block w-full p-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-xs sm:text-sm";

  const communicationHistoryData = [
    {
      id: 1,
      title: "FOLLOW-UP CALL FOR ORGANIC EXPO 2026",
      reminder: "CALL THE CLIENT ON 25 SEP 25 AT 15:45",
      isActive: true,
      details:
        "Call back required after 7 days, he will visit the office | By: Abhay Raj | On September 20, 2025 at 15:50",
    },
    {
      id: 2,
      title: "FOLLOW-UP CALL FOR ORGANIC EXPO 2026",
      reminder: "CALL THE CLIENT ON 20 SEP 25 AT 12:15",
      isActive: false,
      details:
        "Call back required after 7 days, he will visit in office | By: Abhay Raj | On September 19, 2025 at 12:28",
    },
  ];

  const handleDelete = (id) => {
    Swal.fire("Deleted!", `Record with ID ${id} has been deleted.`, "success");
  };

  const handleSendWhatsapp = () => {
    Swal.fire({
      title: "Send WhatsApp Message",
      text: "This is a demo popup (functionality removed).",
      icon: "info",
      confirmButtonText: "OK",
    });
  };

  return (
    <div className="w-full h-auto bg-[#eef1f5]">
      {/* Header */}
      <div className="flex justify-between items-center bg-white shadow-md px-6 py-3 border-b">
        <h2 className="text-lg font-semibold text-gray-800">CLIENT OVERVIEW</h2>
        <div className="flex gap-2">
          <button className="bg-[#337ab7] hover:bg-[#286090] text-white px-3 py-1.5 rounded-sm text-sm font-medium">
            Back to List
          </button>
          <button className="bg-[#337ab7] hover:bg-[#286090] text-white px-3 py-1.5 rounded-sm text-sm font-medium">
            Add Client
          </button>
          <button className="bg-[#337ab7] hover:bg-[#286090] text-white px-3 py-1.5 rounded-sm text-sm font-medium">
            Master List
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col m-4 gap-4">
        <div className="bg-white shadow-md p-4 rounded-md w-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-700">
              {company.companyName} | Details
            </h2>
            <div className="flex gap-2">
              <button
                onClick={handleSendWhatsapp}
                className="bg-white text-black px-3 py-2 text-xs rounded-sm cursor-pointer border border-gray-400 hover:bg-gray-100 transition-colors"
              >
                Send Whatsapp
              </button>
              <button
                onClick={() => setShowAccounts(true)}
                className="bg-white text-black px-3 py-2 text-xs rounded-sm cursor-pointer border border-gray-300 hover:bg-gray-100 transition-colors"
              >
                Account
              </button>
              <button
                onClick={() => setShowPayments(true)}
                className="bg-white text-black px-3 py-2 text-xs rounded-sm cursor-pointer border border-gray-300 hover:bg-gray-100 transition-colors"
              >
                Payments
              </button>
              <button
                onClick={handleEdit}
                className="flex items-center justify-center w-8 h-8 rounded-sm text-gray-600 border border-gray-300 hover:bg-gray-100 transition-colors"
                aria-label="Edit"
              >
                <FaPencilAlt className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Client Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-6 text-sm text-gray-600 border-b pb-4 mb-4">
            <div>
              <p className="font-semibold text-gray-800">Company Details</p>
              <p>
                {company.companyName} | {company.businessNature} |{" "}
                {company.category}
              </p>
            </div>
            <div>
              <p className="font-semibold text-gray-800">Data Source</p>
              <p>{company.dataSource || "-"}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-800">Website</p>
              <p>{company.website || "-"}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-800">Address</p>
              <p>{company.address}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-800">Email Id</p>
              <p className="text-blue-600">{company.email}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-800">Landline No.</p>
              <p>{company.landline || "-"}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-800">Contact Person</p>
              <p>
                {company.contacts
                  ?.map((c) => `${c.firstName} ${c.surname} | ${c.mobile}`)
                  .join(", ")}
              </p>
            </div>
            <div>
              <p className="font-semibold text-gray-800">Added / Updated By</p>
              <p>{company.updated_by || "-"}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-800">Client Status</p>
              <p>{company.status || "New Client"}</p>
            </div>
          </div>
        </div>

        {/* Pop-Up Form (toggle simulation) */}
        {popUp && (
          <div className="w-full h-auto bg-white rounded-md shadow-md px-4 py-4 gap-4">
            <div className="flex flex-col md:flex-row gap-4 md:gap-7">
              <div className="w-auto">
                <label
                  htmlFor="ClientStatus"
                  className="block text-xs font-medium text-gray-700"
                >
                  Client Status
                </label>
                <select
                  onChange={(e) => setFlip(e.target.value !== "")}
                  id="ClientStatus"
                  className={baseInputClass}
                >
                  <option value="">Select Current Status</option>
                  <option value="Sent Details">Sent Details</option>
                  <option value="Follow-up Call">Follow-up Call</option>
                </select>
              </div>

              {Flip && (
                <div className="flex flex-col md:flex-row gap-4 md:gap-7">
                  <div className="w-auto">
                    <label
                      htmlFor="ReminderDateTime"
                      className="block text-xs font-medium text-gray-700"
                    >
                      Reminder Date & Time{" "}
                      <span className="text-red-700">*</span>
                    </label>
                    <input
                      type="datetime-local"
                      id="ReminderDateTime"
                      className={baseInputClass}
                    />
                  </div>

                  <div className="w-auto">
                    <label
                      htmlFor="ForwardTo"
                      className="block text-xs font-medium text-gray-700"
                    >
                      Forward To <span className="text-red-700">*</span>
                    </label>
                    <select id="ForwardTo" className={baseInputClass}>
                      <option value="">Select Here</option>
                      <option value="Vijay Sharma">Vijay Sharma</option>
                      <option value="Rishav Singh">Rishav Singh</option>
                    </select>
                  </div>
                </div>
              )}

              <div className="w-auto">
                <label
                  htmlFor="PreviousStatus"
                  className="block text-xs font-medium text-gray-700"
                >
                  Previous Status
                </label>
                <input
                  type="text"
                  id="PreviousStatus"
                  value="Follow Up call"
                  readOnly
                  className={baseInputClass}
                />
              </div>

              <div className="w-auto">
                <label
                  htmlFor="EventName"
                  className="block text-xs font-medium text-gray-700"
                >
                  Event Name <span className="text-red-700">*</span>
                </label>
                <select id="EventName" className={baseInputClass}>
                  <option value="Organic Expo 2026">Organic Expo 2026</option>
                </select>
              </div>
            </div>

            <div className="mt-4">
              <label
                htmlFor="Remark"
                className="flex gap-2 text-xs font-medium text-gray-700"
              >
                Any Remark <span className="text-red-600">*</span>
              </label>
              <div className="flex flex-col md:flex-row gap-2 mt-1">
                <textarea
                  id="Remark"
                  className="w-full border p-2 text-xs"
                  placeholder="update status"
                ></textarea>
                <button className="w-full md:w-auto px-4 py-2 text-xs bg-[#3598dc] text-white hover:bg-[#246a99] transition">
                  SAVE
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Communication History */}
        <div className="bg-white shadow-md rounded-md w-full">
          <h3 className="text-lg font-semibold text-gray-700 py-3 px-4 bg-gray-100 rounded-t-md border-b border-gray-200">
            <p className="flex items-center gap-2">
              <FaBuilding className="text-lg text-gray-600" /> Communication
              Status History
            </p>
          </h3>
          <div className="space-y-0.5 p-2">
            {communicationHistoryData.map((entry) => (
              <div
                key={entry.id}
                className="flex items-start gap-2 py-1.5 px-2 bg-white rounded-md border border-gray-200 text-sm"
              >
                <FaUser className="w-4 h-4 text-gray-500 mt-1" />
                <div className="flex-grow">
                  <p className="font-medium text-xs sm:text-sm">
                    <span className="text-blue-400">{entry.title}</span>
                    <span
                      onClick={() => setPopUp(!popUp)}
                      className={`${
                        entry.isActive ? "text-red-500" : "text-gray-700"
                      } cursor-pointer hover:underline`}
                    >
                      {" "}
                      | ▲ {entry.reminder}
                    </span>
                  </p>
                  <p className="text-xs text-gray-500 leading-tight">
                    {entry.details}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(entry.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <FaTrash className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientOverview1;
