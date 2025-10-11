import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const AddCreditNote = ({ onCancel }) => {
  const [rows, setRows] = useState([
    { estimate: "", item: "", qty: "", amount: "", remark: "" },
  ]);

  const handleAddRow = () => {
    setRows([
      ...rows,
      { estimate: "", item: "", qty: "", amount: "", remark: "" },
    ]);
  };

  const handleRemoveRow = (index) => {
    const updated = [...rows];
    updated.splice(index, 1);
    setRows(updated);
  };

  return (
    <div className="bg-white shadow-md p-3 rounded-md w-full">
      <h2 className="text-lg font-semibold text-black-700 mb-4">
        Add Credit Note
      </h2>

      {/* Dynamic Form Rows */}
      {rows.map((row, index) => (
        <div
          key={index}
          className="grid grid-cols-1 md:grid-cols-6 gap-3 mb-4"
        >
          {/* Estimate */}
          <div className="flex flex-col">
            <label className="text-[10px] text-gray-600 font-medium mb-1">
              Select Estimate *
            </label>
            <select className="border border-gray-300 px-2 text-xs rounded-sm h-8 font-medium">
              <option>Select Here</option>
            </select>
          </div>

          {/* Item */}
          <div className="flex flex-col">
            <label className="text-[10px] text-gray-600 font-medium mb-1">
              Select Item *
            </label>
            <select className="border border-gray-300 px-2 text-xs rounded-sm h-8 font-medium">
              <option>Select Here</option>
            </select>
          </div>

          {/* Qty */}
          <div className="flex flex-col">
            <label className="text-[10px] text-gray-600 font-medium mb-1">
              Quantity *
            </label>
            <input
              type="number"
              className="border border-gray-300 px-2 text-xs rounded-sm h-8"
            />
          </div>

          {/* Amount */}
          <div className="flex flex-col">
            <label className="text-[10px] text-gray-600 font-medium mb-1">
              CN Amount *
            </label>
            <input
              type="number"
              className="border border-gray-300 px-2 text-xs rounded-sm h-8"
            />
          </div>

          {/* Remark + Buttons */}
          <div className="flex flex-col md:col-span-2">
            <label className="text-[10px] text-gray-600 font-medium mb-1">
              Credit Note Remark *
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                className="border border-gray-300 px-2 text-xs rounded-sm h-8 flex-grow"
              />
              {index === rows.length - 1 ? (
                <button
                  onClick={handleAddRow}
                  className="bg-green-600 text-white h-8 w-8 flex items-center justify-center rounded-sm"
                >
                  <FaPlus size={12} /> 
                </button>
              ) : (
                <button
                  onClick={() => handleRemoveRow(index)}
                  className="bg-red-600 text-white h-8 w-8 flex items-center justify-center rounded-sm"
                >
                  <FaMinus size={12} /> 
                </button>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Buttons */}
      <div className="flex justify-start gap-4 mt-4">
        <button className="bg-[#337ab7] hover:bg-[#286ca7] text-white px-4 py-2 text-sm rounded-sm font-medium">
          SAVE
        </button>
        <button
          onClick={onCancel}
          className="bg-[#d9534f] hover:bg-[#bd3a35] text-white px-4 py-2 text-sm rounded-sm font-medium"
        >
          CANCEL
        </button>
      </div>

      {/* Table Section */}
      <div className="mt-6">
        <h3 className="text-sm font-semibold mb-2">Credit Note Details</h3>
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 text-xs">
            <thead className="bg-gray-700 text-white">
              <tr>
                <th className="border px-2 py-1 font-normal">Credit Note No.</th>
                <th className="border px-2 py-1 font-normal">Credit Amount</th>
                <th className="border px-2 py-1 font-normal">Credit Date</th>
                <th className="border px-2 py-1 font-normal">Updated</th>
                <th className="border px-2 py-1 font-normal">Updated By</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  className="border px-2 py-1 text-center"
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
  );
};

export default AddCreditNote;