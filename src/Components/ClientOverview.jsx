import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { FaTrash, FaUser, FaBuilding, FaPencilAlt } from "react-icons/fa";
import { IoCallSharp } from "react-icons/io5";
import AccountsComponent from "./AccountsComponent";
import HeaderComponent from "./HeaderComponent";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchCompanies } from "../features/company/companySlice";
import { useNavigate } from "react-router-dom";
// import Payments from "./Payments";
import Payment from "./payments/Payment";

const ClientOverview = ({ client, onBack }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showAccounts, setShowAccounts] = useState(false);
  const [showPayments, setShowPayments] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [Flip, setFlip] = useState(false);

  // company redux
  const { companies, loading, error } = useSelector((state) => state.companies);
  console.log("companies data", companies);

  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch]);

  const baseInputClass =
    "mt-1 block w-full p-2 border border-gray-300  shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-xs sm:text-sm";

  // Communication history data with onClick handler reference
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

  const defaultClient = {
    company: { name: "Tentamus India Pvt. Ltd", email: "info@tentamus.com" },
    Bussiness: { type: "Manufacturing" },
    category: { main: "Products" },
    source: { type: "Web Search" },
    location: { city: "Hyderabad", state: "Telangana", pincode: "500081" },
    contact: { person: "Ravi Kumar", phone: "+91 9848042094" },
    update: { date: "17 Sep 2025", by: "Sumit" },
  };

  const clientData = client || defaultClient;

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "Deleted!",
          `Record with ID ${id} has been deleted.`,
          "success"
        );
      }
    });
  };

  const handleSendWhatsapp = () => {
    Swal.fire({
      title: "Send WhatsApp Message",
      html: `
        <div style="text-align: left; font-size: 12px; padding: 6px;">
          <div style="display: flex; gap: 15px; margin-bottom: 10px; justify-content: flex-start; align-items: center; flex-wrap: nowrap;">
            <label style="display: flex; align-items: center; cursor: pointer; font-size: 11px; padding: 5px 10px; border: 1px solid #ddd; border-radius: 3px; background: #f8f9fa; height: 28px; white-space: nowrap;">
              <input type="radio" name="whatsappOption" value="sendDetails" style="width: 12px; height: 12px; margin-right: 6px; flex-shrink: 0;" checked>
              <span style="line-height: 1; white-space: nowrap;">Send Details</span>
            </label>
            <label style="display: flex; align-items: center; cursor: pointer; font-size: 11px; padding: 5px 10px; border: 1px solid #ddd; border-radius: 3px; background: #f8f9fa; height: 28px; white-space: nowrap;">
              <input type="radio" name="whatsappOption" value="officeLocation" style="width: 12px; height: 12px; margin-right: 6px; flex-shrink: 0;">
              <span style="line-height: 1; white-space: nowrap;">Office Location</span>
            </label>
            <label style="display: flex; align-items: center; cursor: pointer; font-size: 11px; padding: 5px 10px; border: 1px solid #ddd; border-radius: 3px; background: #f8f9fa; height: 28px; white-space: nowrap;">
              <input type="radio" name="whatsappOption" value="venueLocation" style="width: 12px; height: 12px; margin-right: 6px; flex-shrink: 0;">
              <span style="line-height: 1; white-space: nowrap;">Venue Location</span>
            </label>
            <label style="display: flex; align-items: center; cursor: pointer; font-size: 11px; padding: 5px 10px; border: 1px solid #ddd; border-radius: 3px; background: #f8f9fa; height: 28px; white-space: nowrap;">
              <input type="radio" name="whatsappOption" value="visitorPass" style="width: 12px; height: 12px; margin-right: 6px; flex-shrink: 0;">
              <span style="line-height: 1; white-space: nowrap;">Visitor Pass</span>
            </label>
          </div>
          
          <div style="margin-bottom: 10px;">
            <p style="margin-bottom: 4px; font-size: 11px; font-weight: 500; color: #666;">Message</p>
            <textarea id="whatsappMessage" style="width: 100%; height: 40px; padding: 5px; border: 1px solid #ddd; border-radius: 3px; font-size: 11px; box-sizing: border-box; resize: vertical;" placeholder="Update Status..."></textarea>
          </div>

          <div style="display: flex; align-items: center; gap: 10px;">
            <div>
              <p style="margin-bottom: 3px; font-size: 11px; font-weight: 500; color: #666;">Select file</p>
              <input type="file" id="whatsappFile" style="display: none;">
              <label htmlFor="whatsappFile" style="display: inline-block; background: #22c55e; color: white; padding: 5px 12px; border-radius: 3px; cursor: pointer; font-size: 11px; border: none; height: 28px; line-height: 18px;">
                Choose File
              </label>
            </div>
            <p id="fileNameDisplay" style="font-size: 10px; color: #666; margin: 0;"></p>
          </div>
        </div>
      `,
      showCloseButton: true,
      showConfirmButton: true,
      confirmButtonText: "SEND",
      confirmButtonColor: "#22C55E",
      showCancelButton: false,
      width: "700px",
      position: "top",
      customClass: {
        popup: "swal2-popup-custom",
        confirmButton: "swal2-confirm-custom",
        title: "swal2-title-custom",
      },
      buttonsStyling: false,
      didOpen: () => {
        const style = document.createElement("style");
        style.textContent = `
          .swal2-popup-custom {
            font-size: 12px !important;
            padding: 15px !important;
          }
          .swal2-title-custom {
            font-size: 16px !important;
            margin-bottom: 15px !important;
            font-weight: 600 !important;
          }
          .swal2-confirm-custom {
            background: #22c55e !important;
            color: white !important;
            padding: 8px 24px !important;
            border-radius: 4px !important;
            font-size: 12px !important;
            font-weight: 500 !important;
            border: none !important;
            margin-top: 15px !important;
          }
          .swal2-confirm-custom:hover {
            background: #16a34a !important;
          }
        `;
        document.head.appendChild(style);

        const fileInput = document.getElementById("whatsappFile");
        const fileNameDisplay = document.getElementById("fileNameDisplay");
        if (fileInput && fileNameDisplay) {
          fileInput.addEventListener("change", (event) => {
            const fileName = event.target.files[0]?.name;
            if (fileName) {
              fileNameDisplay.textContent = `Selected: ${fileName}`;
            } else {
              fileNameDisplay.textContent = "";
            }
          });
        }
      },
      preConfirm: () => {
        const selectedOption = document.querySelector(
          'input[name="whatsappOption"]:checked'
        )?.value;
        if (!selectedOption) {
          Swal.showValidationMessage("Please select an option.");
          return false;
        }
        const message = document.getElementById("whatsappMessage")?.value || "";
        const file = document.getElementById("whatsappFile")?.files[0];
        return { selectedOption, message, file };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "Sent!",
          "Your message has been prepared for sending.",
          "success"
        );
      }
    });
  };

  const handleEdit = () => {
    navigate("/ihweClientData2026/addNewClients", {
      state: { heading: "Edit Client Details" },
    });
  };

  if (showAccounts) {
    return (
      <AccountsComponent
        client={clientData}
        onBackToOverview={() => setShowAccounts(false)}
      />
    );
  }
  if (showPayments) {
    return (
      <Payment client={clientData} onBack={() => setShowPayments(false)} />
    );
  }

  return (
    <div className="w-full h-auto bg-[#eef1f5]">
      <HeaderComponent
        title="CLIENT OVERVIEW"
        buttons={[
          { label: "Back to List", onClick: onBack },
          {
            label: "Add Client",
            className:
              "bg-[#337ab7] hover:bg-[#286090] text-white px-3 py-1.5 rounded-sm text-sm font-medium cursor-pointer",
          },
          {
            label: "Master List",
            className:
              "bg-[#337ab7] hover:bg-[#286090] text-white px-3 py-1.5 rounded-sm text-sm font-medium cursor-pointer",
          },
        ]}
      />
      <div className="flex flex-col m-4 gap-4">
        <div className="bg-white shadow-md p-4 rounded-md w-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-700">
              {clientData.company?.name} | Details
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
              {/* </Link> */}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-6 text-sm text-gray-600 border-b pb-4 mb-4">
            <div>
              <p className="font-semibold text-gray-800">Company Details</p>
              <p>
                {client.company?.name} | {client.business?.type} |{" "}
                {client.category?.main}
              </p>
            </div>
            <div>
              <p className="font-semibold text-gray-800">Data Source</p>
              <p>{client.source?.name}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-800">Website</p>
              <p>{client.company?.website || "-"}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-800">Address</p>
              <p>
                {client.location?.city}, {client.location?.state}, India
              </p>
            </div>
            <div>
              <p className="font-semibold text-gray-800">Email Id</p>
              <p className="text-blue-600">{client.company?.email}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-800">Landline No.</p>
              <p>{client.contact?.landline || "-"}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-800">Contact Details</p>
              <p>{client.contact?.details}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-800">Added By</p>
              <p>{client.update?.details}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-800">Updated By</p>
              <p>{client.update?.details}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-800">Client Status</p>
              <p>{client.status || "New Client"}</p>
            </div>
          </div>
        </div>

        {/* Pop Up Form */}
        {popUp && (
          <div className="w-full h-auto bg-white rounded-md shadow-md px-4 sm:px-6 md:px-10 py-4 gap-4">
            <div className="flex flex-col md:flex-row gap-4 md:gap-7">
              {/* Client Status */}
              <div className="w-auto">
                <label
                  htmlFor="ClientStatus"
                  className="block text-xs font-medium text-gray-700"
                >
                  Client Status
                </label>
                <select
                  onChange={(e) => {
                    if (e.target.value !== "") {
                      setFlip(true);
                    } else {
                      setFlip(false);
                    }
                  }}
                  name="status"
                  id="ClientStatus"
                  className={baseInputClass}
                >
                  <option value="">Select Current Status</option>
                  <option value="Sent Details">Sent Details</option>
                  <option value="Follow-up Call">Follow-up Call</option>
                  <option value="Warm Client">Warm Client</option>
                  <option value="Est./PI Sent">Est./PI Sent</option>
                  <option value="Adv. Recd">Adv. Recd</option>
                  <option value="Visitor Pass Sent">Visitor Pass Sent</option>
                  <option value="Not Interested">Not Interested</option>
                  <option value="Company Not Available">
                    Company Not Available
                  </option>
                  <option value="Wrong Data">Wrong Data</option>
                  <option value="Under PYMT Followups">
                    Under PYMT Followups
                  </option>
                  <option value="Reminder Reschedule">
                    Reminder Reschedule
                  </option>
                </select>
              </div>

              {Flip && (
                <div className="flex flex-col md:flex-row gap-4 md:gap-7">
                  {/* Reminder Date & Time */}
                  <div className="w-auto">
                    <label
                      htmlFor="ReminderDateTime"
                      className="block text-xs font-medium text-gray-700"
                    >
                      Reminder Date & Time
                      <span className="text-red-700"> * </span>
                    </label>
                    <div className="input-container flex">
                      <input
                        type="datetime-local"
                        id="ReminderDateTime"
                        name="reminderDateTime"
                        className={baseInputClass}
                        required
                      />
                    </div>
                  </div>

                  {/* Forward To */}
                  <div className="w-auto">
                    <label
                      htmlFor="ForwardTo"
                      className="block text-xs font-medium text-gray-700"
                    >
                      Forward To <span className="text-red-700"> * </span>
                    </label>
                    <select
                      name="forwardTo"
                      id="ForwardTo"
                      className={baseInputClass}
                    >
                      <option value="">Select Here</option>
                      <option value="Vijay Sharma">Vijay Sharma</option>
                      <option value="Rishav Singh">Rishav Singh</option>
                      <option value="Warm Client">Warm Client</option>
                      <option value="Reetika Singh">Reetika Singh</option>
                      <option value="Abhay Raj">Abhay Raj</option>
                      <option value="Sumit Mishra">Sumit Mishra</option>
                      <option value="Chiranjeev Sharma">
                        Chiranjeev Sharma
                      </option>
                      <option value="Shimpi Rawat">Shimpi Rawat</option>
                      <option value="Tanya Jaiswal">Tanya Jaiswal</option>
                      <option value="Prerna Pandey">Prerna Pandey</option>
                      <option value="Manoj Mishra">Manoj Mishra</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Previous Status */}
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
                  className={baseInputClass}
                  readOnly
                />
              </div>

              {/* Event Name */}
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

            {/* Remark Section */}
            <div className="mt-4">
              <label
                htmlFor="Remark"
                className="flex gap-2 text-xs font-medium text-gray-700"
              >
                Any Remark <span className="text-red-600">*</span>
              </label>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-2 mt-1">
                <textarea
                  id="Remark"
                  className="w-full border p-2 text-xs xs:text-base"
                  placeholder="update status"
                ></textarea>
                <button className="w-full md:w-auto px-4 py-2 text-xs xs:text-base bg-[#3598dc] text-white hover:bg-[#246a99] transition">
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
            {communicationHistoryData.map((entry, index) => (
              <div
                key={entry.id}
                className="flex items-start gap-2 py-1.5 px-2 bg-white rounded-md border border-gray-200 text-sm"
              >
                <div className="flex-shrink-0 mt-1">
                  <FaUser className="w-4 h-4 text-gray-500" />
                </div>
                <div className="flex-grow flex flex-col">
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
                  className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0 mt-1 cursor-pointer"
                  aria-label="Delete history entry"
                >
                  <FaTrash className="w-4 h-4" />
                </button>
              </div>
            ))}
            {communicationHistoryData.length === 0 && (
              <p className="text-center text-gray-500 py-4 text-sm">
                No communication history found.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientOverview;
