import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CreditNote = ({ onCancel }) => {
  const navigate = useNavigate();
  const [rows, setRows] = useState([
    { estimate: "", item: "", qty: "", amount: "", remark: "" },
  ]);

  // Navigation Handlers
  const handleMasterList = () => {
    navigate("/ihweClientData2026/masterData");
  };
  const handleAddClient = () => {
    navigate("/ihweClientData2026/addNewClients");
  };

  // --- Handlers ---
  const handleAddRow = () => {
    setRows([
      ...rows,
      { estimate: "", item: "", qty: "", amount: "", remark: "" },
    ]);
  };

  const handleRemoveRow = (index) => {
    // Prevent removing the first row unless it's the only one left (rows.length > 1)
    if (rows.length > 1) {
      const updated = [...rows];
      updated.splice(index, 1);
      setRows(updated);
    }
  };
  const buttonStyle =
    "px-3 py-1 text-xs bg-[#3598dc] hover:bg-[#286090] text-white transition-colors";

  return (
    <div className="w-full min-h-screen bg-gray-100 font-sans">
      {/* 1. Heading and Navigation Buttons */}
      <div className="max-w-full mx-auto bg-white shadow-lg ">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between px-4 py-1.5">
          <h1 className="text-xl text-gray-500 mb-2 lg:mb-0 uppercase">
            ACCOUNT SECTION | CREDIT NOTE
          </h1>
          <div className="flex flex-wrap gap-2 cursor-pointer">
            <button onClick={handleAddClient} className={buttonStyle}>
              Add Client
            </button>
            <button onClick={handleMasterList} className={buttonStyle}>
              Master List
            </button>
          </div>
        </div>
      </div>
      <div className="bg-white shadow-md p-3 m-4  rounded-md ">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Add Credit Note
        </h2>

        {/* Dynamic Form Rows */}
        {rows.map((row, index) => (
          <div
            key={index}
            // Grid layout for 5 fields + 1 for buttons (total 6 columns)
            className="grid grid-cols-5 md:grid-cols-6 gap-3 mb-4 items-end"
          >
            {/* 1. Select Estimate Field (Conditional) / Spacer */}
            {index === 0 ? (
              // Select Estimate (Only in the first row)
              <div className="flex flex-col md:col-span-1">
                <label className="text-[10px] text-gray-600 font-medium mb-1">
                  Select Estimate *
                </label>
                <select className="border border-gray-300 px-2 text-xs rounded-sm h-8 font-medium">
                  <option>Select Here</option>
                  {/* Populate with estimate options here */}
                </select>
              </div>
            ) : (
              // Spacer for all subsequent rows to maintain alignment
              <div className="md:col-span-1 h-8">
                {/* This empty div takes the space of 'Select Estimate' for alignment */}
              </div>
            )}

            {/* 2. Item */}
            <div className="flex flex-col md:col-span-1">
              <label className="text-[10px] text-gray-600 font-medium mb-1">
                Select Item *
              </label>
              <select className="border border-gray-300 px-2 text-xs rounded-sm h-8 font-medium">
                <option>Select Here</option>
                {/* Populate with item options here */}
              </select>
            </div>

            {/* 3. Qty */}
            <div className="flex flex-col md:col-span-1">
              <label className="text-[10px] text-gray-600 font-medium mb-1">
                Quantity *
              </label>
              <input
                type="number"
                className="border border-gray-300 px-2 text-xs rounded-sm h-8"
              />
            </div>

            {/* 4. Amount */}
            <div className="flex flex-col md:col-span-1">
              <label className="text-[10px] text-gray-600 font-medium mb-1">
                CN Amount *
              </label>
              <input
                type="number"
                className="border border-gray-300 px-2 text-xs rounded-sm h-8"
              />
            </div>

            {/* 5. Remark + Buttons */}
            <div className="flex flex-col md:col-span-2">
              <label className="text-[10px] text-gray-600 font-medium mb-1">
                Credit Note Remark *
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  className="border border-gray-300 px-2 text-xs rounded-sm h-8 flex-grow"
                />

                {/* --- Buttons Logic --- */}
                <div className="flex gap-1.5 h-8">
                  {/* Remove Button (-): Visible on all rows EXCEPT the first one (index > 0) */}
                  {index > 0 && (
                    <button
                      onClick={() => handleRemoveRow(index)}
                      className="bg-red-600 hover:bg-red-700 text-white h-8 w-8 flex items-center justify-center rounded-sm transition-colors"
                      title="Remove Row"
                    >
                      <FaMinus size={12} />
                    </button>
                  )}

                  {/* Add Button (+): Visible only on the LAST row */}
                  {index === rows.length - 1 && (
                    <button
                      onClick={handleAddRow}
                      className="bg-green-600 hover:bg-green-700 text-white h-8 w-8 flex items-center justify-center rounded-sm transition-colors"
                      title="Add New Row"
                    >
                      <FaPlus size={12} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* --- Action Buttons (SAVE/CANCEL) --- */}
        <div className="flex justify-start gap-4 mt-6">
          <button className="bg-[#337ab7] hover:bg-[#286ca7] text-white px-4 py-2 text-sm rounded-sm font-medium transition-colors">
            SAVE
          </button>
          <button
            onClick={onCancel}
            className="bg-[#d9534f] hover:bg-[#bd3a35] text-white px-4 py-2 text-sm rounded-sm font-medium transition-colors"
          >
            CANCEL
          </button>
        </div>

        {/* ----------------------------------- */}

        {/* --- Table Section --- */}
        <div className="mt-8">
          <h3 className="text-base font-bold mb-3 text-gray-700 border-b pb-1">
            Credit Note Details
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 text-xs">
              <thead className="bg-gray-700 text-white">
                <tr>
                  <th className="border px-2 py-1 font-normal">
                    Credit Note No.
                  </th>
                  <th className="border px-2 py-1 font-normal">
                    Credit Amount
                  </th>
                  <th className="border px-2 py-1 font-normal">Credit Date</th>
                  <th className="border px-2 py-1 font-normal">Updated</th>
                  <th className="border px-2 py-1 font-normal">Updated By</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    className="border px-2 py-3 text-center text-gray-500"
                    colSpan={5}
                  >
                    No Data Found
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditNote;
