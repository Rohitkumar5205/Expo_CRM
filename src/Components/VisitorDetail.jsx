import React from "react";

const VisitorDetail = ({ visitor, onBack }) => {
  const statusOptions = [
    "Select Status",
    "Sent Details",
    "Follow-up Call",
    "Warm Client",
    "Hot Client",
    "Est./PI Sent",
    "Adv. Recd",
    "PYMT Recd",
    "Inv. Req.",
    "Visitor Pass Sent",
    "Not Interested",
    "FB Lead",
    "Instagram Lead",
    "Web Lead",
    "Whatsapp Lead",
    "Company Not Available",
    "Wrong Data",
    "Under PYMT Followups",
    "Reminder Reschedule",
  ];

  // Sample visitor data for demo
  // Using a default object for demonstration if visitor is not passed
  const defaultVisitor = {
    name: "Yogita Bagri",
    mobile: "9899271894",
    email: "yogianu786@gmail.com",
    address: "G 294 Ambedkar Nagar Dakshin Puri, Delhi, Bharat",
    remark:
      "I am yoga student from lal bahadur sanskrit vidyapeeth,looking for new things and thats why i want to become the part of this expo",
    company: "None",
    designation: "Student",
  };

  const currentVisitor = visitor || defaultVisitor;

  return (
    <div className="w-full min-h-screen bg-gray-100 p-4">
      {/* Header section with buttons */}
      <div className="w-full bg-white shadow-md border-b mb-6">
        <div className="flex items-center justify-between px-4 py-3">
          <h1 className="text-xl font-semibold text-gray-700 mb-2 lg:mb-0">
            VISITOR OVERVIEW
          </h1>
          <div className="flex gap-2">
            <button
              onClick={onBack}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-sm text-sm font-medium"
            >
              Back to List
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Visitor Information Panel */}
        <div className="bg-white rounded-md shadow border border-gray-200 p-4 mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-base font-semibold text-gray-700">
              Visitor Information
            </h2>
            <button className="p-2 hover:bg-gray-100 rounded" title="Print">
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                />
              </svg>
            </button>
          </div>

          {/* Visitor Details Table */}
          {/* Increased text size to 'sm' for better visibility */}
          <table className="w-full text-sm border-collapse">
            <tbody>
              {/* Row 1 */}
              <tr className="bg-gray-50 border-y border-gray-200">
                <td className="font-semibold px-2 py-2 w-1/5">Visitor Name</td>
                <td className="px-2 py-2 w-1/3 text-gray-600">
                  {currentVisitor.name}
                </td>
                <td className="font-semibold px-2 py-2 w-1/5">Contact No.</td>
                <td className="px-2 py-2 w-1/3 text-gray-600">
                  {currentVisitor.mobile}
                </td>
              </tr>
              {/* Row 2 */}
              <tr className="border-b border-gray-200">
                <td className="font-semibold px-2 py-2">Email Id</td>
                <td className="px-2 py-2 text-gray-600">
                  {currentVisitor.email}
                </td>
                <td className="font-semibold px-2 py-2">Remark</td>
                <td className="px-2 py-2 text-gray-600">
                  {currentVisitor.remark || "No remark provided"}
                </td>
              </tr>
              {/* Row 3 */}
              <tr className="bg-gray-50 border-b border-gray-200">
                <td className="font-semibold px-2 py-2">Address</td>
                <td colSpan="3" className="px-2 py-2 text-gray-600">
                  {currentVisitor.address || "N/A"}
                </td>
              </tr>
              {/* Row 4 */}
              <tr className="border-b border-gray-200">
                <td className="font-semibold px-2 py-2">Company</td>
                <td className="px-2 py-2 text-gray-600">
                  {currentVisitor.company || "None"}
                </td>
                <td className="font-semibold px-2 py-2">Designation</td>
                <td className="px-2 py-2 text-gray-600">
                  {currentVisitor.designation || "Student"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Status Update Section */}
        <div className="bg-white rounded-md shadow border border-gray-200 p-4 mb-6 text-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="font-semibold text-gray-700 block mb-1">
                Status
              </label>
              <select className="w-full border border-gray-300 rounded px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                {statusOptions.map((option, index) => (
                  <option key={index}>{option}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="font-semibold text-gray-700 block mb-1">
                Previous Status
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded px-2 py-1.5 bg-gray-100 text-sm"
                disabled
              />
            </div>
            <div>
              <label className="font-semibold text-gray-700 block mb-1">
                Event <span className="text-red-500">*</span>
              </label>
              <select className="w-full border border-gray-300 rounded px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                <option>---- Select Event -----</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="font-semibold text-gray-700 block mb-1">
              Description
            </label>
            <textarea
              className="w-full border border-gray-300 rounded px-2 py-1 h-24 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
              placeholder="Update Status..."
            ></textarea>
          </div>

          <div className="flex justify-end">
            <button className="bg-[#337AB7] hover:bg-blue-700 text-white px-4 py-2 rounded-sm font-medium">
              POST
            </button>
          </div>
        </div>

        {/* Visitor Status Panel - Updated to match the image */}
        <div className="bg-gray-50 rounded-md border border-gray-200 p-3 shadow-sm">
          <div className="flex justify-between items-center">
            <h2 className="text-base font-semibold text-gray-700 flex items-center">
              {/* Chat Bubble Icon (SVG) */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
              {currentVisitor.name} Status
            </h2>
            <button className="p-2 hover:bg-gray-200 rounded" title="Print">
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitorDetail;
