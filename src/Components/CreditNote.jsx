import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CreditNote = () => {
  const navigate = useNavigate();

  // 🔹 Each row has its own data
  const [rows, setRows] = useState([
    { estimate: "", item: "", qty: "", amount: "", remark: "" },
  ]);

  const Datas = [
    { creditno: "1", creditamount: "435", CreditDate: "12/03/2025", updated: "29/03/2025", UpdatedBy: "admin" },
    { creditno: "2", creditamount: "720", CreditDate: "15/03/2025", updated: "16/03/2025", UpdatedBy: "manager" },
    { creditno: "3", creditamount: "980", CreditDate: "20/03/2025", updated: "21/03/2025", UpdatedBy: "admin" },
    { creditno: "4", creditamount: "650", CreditDate: "25/03/2025", updated: "19/03/2025", UpdatedBy: "supervisor" },
  ];

  const buttonStyle =
    "px-3 py-1 text-xs bg-[#3598dc] hover:bg-[#286090] text-white transition-colors";

  const handleAddClient = () => navigate("/ihweClientData2026/addNewClients");
  const handleMasterList = () => navigate("/ihweClientData2026/masterData");

  // 🔹 Add new blank row
  const handleAddRow = () => {
    setRows([
      ...rows,
      { estimate: "", item: "", qty: "", amount: "", remark: "" },
    ]);
  };

  // 🔹 Remove row
  const handleRemoveRow = (index) => {
    if (rows.length > 1) {
      setRows(rows.filter((_, i) => i !== index));
    }
  };

  // 🔹 Handle input change per row
  const handleRowChange = (index, field, value) => {
    const updatedRows = [...rows];
    if (field === "qty" || field === "amount") {
      // Only numbers & one decimal
      value = value.replace(/[^0-9.]/g, "");
      if ((value.match(/\./g) || []).length > 1) return;
    }
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  // 🔹 Reset all input fields
  const resetForm = () => {
    setRows([{ estimate: "", item: "", qty: "", amount: "", remark: "" }]);
  };

  // 🔹 Submit form (show all rows)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", rows);
    alert("Form Submitted Successfully!");
    resetForm(); // clear inputs after submit
  };

  // 🔹 Cancel button
  const handleCancle = () => {
    resetForm();
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 font-sans">
      <div className="max-w-full mx-auto bg-white shadow-lg">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between px-4 py-1">
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

      <div className="bg-white shadow-md p-3 m-4 rounded-md">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Add Credit Note
        </h2>

        <form onSubmit={handleSubmit}>
          {rows.map((row, index) => (
            <div
              key={index}
              className="grid grid-cols-5 md:grid-cols-6 gap-3 mb-4 items-end"
            >
              {index === 0 ? (
                <div className="flex flex-col md:col-span-1">
                  
                   <label className="text-xs font-medium text-gray-900 mb-1 block">
                Select Estimate <span className="text-red-500 font-semibold">*</span>
              </label>
                  <select
                    value={row.estimate}
                    onChange={(e) =>
                      handleRowChange(index, "estimate", e.target.value)
                    }
                    required
                    className="border border-gray-300 px-2 text-xs h-8 focus:ring-1 focus:ring-blue-500 focus:border-transparent focus:outline-none font-medium"
                  >
                    <option value="">Select Here</option>
                    <option value="Estimate-1">Estimate-1</option>
                    <option value="Estimate-2">Estimate-2</option>
                  </select>
                </div>
              ) : (
                <div className="md:col-span-1 h-8" />
              )}

              <div className="flex flex-col md:col-span-1">
                <label className="text-xs font-medium text-gray-900 mb-1 block">
                  Select Item <span className="text-red-500 font-semibold">*</span>
                </label>
                <select
                  value={row.item}
                  onChange={(e) =>
                    handleRowChange(index, "item", e.target.value)
                  }
                  required
                  className="border border-gray-300 px-2 text-xs h-8 focus:ring-1 focus:ring-blue-500 focus:border-transparent focus:outline-none font-medium"
                >
                  <option value="">Select Here</option>
                  <option value="Item-1">Item-1</option>
                  <option value="Item-2">Item-2</option>
                </select>
              </div>

              <div className="flex flex-col md:col-span-1">
                <label className="text-xs font-medium text-gray-900 mb-1 block">
                  Quantity <span className="text-red-500 font-semibold">*</span>
                </label>
                <input
                  type="text"
                  value={row.qty}
                  onChange={(e) =>
                    handleRowChange(index, "qty", e.target.value)
                  }
                  required
                  className="border border-gray-300 px-2 text-xs h-8 focus:ring-1 focus:ring-blue-500 focus:border-transparent focus:outline-none"
                />
              </div>

              <div className="flex flex-col md:col-span-1">
                <label className="text-xs font-medium text-gray-900 mb-1 block">
                  CN Amount <span className="text-red-500 font-semibold">*</span>
                </label>
                <input
                  type="text"
                  value={row.amount}
                  onChange={(e) =>
                    handleRowChange(index, "amount", e.target.value)
                  }
                  required
                  className="border border-gray-300 px-2 text-xs h-8 focus:ring-1 focus:ring-blue-500 focus:border-transparent focus:outline-none"
                />
              </div>

              <div className="flex flex-col md:col-span-2">
                <label className="text-xs font-medium text-gray-900 mb-1 block">
                  Credit Note Remark <span className="text-red-500 font-semibold">*</span>
                </label>
                <div className="flex items-center gap-2">
                  <textarea
                  required
                    value={row.remark}
                    onChange={(e) =>
                      handleRowChange(index, "remark", e.target.value)
                    }
                    className="border border-gray-300 px-2 text-xs h-8 focus:ring-1 focus:ring-blue-500 focus:border-transparent focus:outline-none flex-grow"
                  ></textarea>

                  <div className="flex gap-1.5 h-8">
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveRow(index)}
                        className="bg-red-600 hover:bg-red-700 text-white h-8 w-8 flex items-center justify-center transition-colors"
                        title="Remove Row"
                      >
                        <FaMinus size={12} />
                      </button>
                    )}
                    {index === rows.length - 1 && (
                      <button
                        type="button"
                        onClick={handleAddRow}
                        className="bg-green-600 hover:bg-green-700 text-white h-8 w-8 flex items-center justify-center transition-colors"
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

          <div className="flex justify-start gap-4 mt-6">
            <button
              type="submit"
              className="bg-[#337ab7] hover:bg-[#286ca7] text-white px-4 py-1.5 text-sm font-medium transition-colors"
            >
              SAVE
            </button>
            <button
              type="button"
              onClick={handleCancle}
              className="bg-[#d9534f] hover:bg-[#bd3a35] text-white px-4 py-1.5 text-sm font-medium transition-colors"
            >
              CANCEL
            </button>
          </div>
        </form>

        <div className="mt-8">
          <h3 className="text-base font-bold mb-3 text-gray-700 border-b pb-1">
            Credit Note Details
          </h3>
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
                {Datas.length === 0 ? (
                  <tr>
                    <td
                      className="border border-gray-300 px-2 py-3 text-center text-gray-500"
                      colSpan={5}
                    >
                      No Data Found
                    </td>
                  </tr>
                ) : (
                  Datas.map((v, i) => (
                    <tr key={i}>
                      <td className="border border-gray-300 px-2 py-3 text-center text-gray-500">
                        {v.creditno}
                      </td>
                      <td className="border border-gray-300 px-2 py-3 text-center text-gray-500">
                        {v.creditamount}
                      </td>
                      <td className="border border-gray-300 px-2 py-3 text-center text-gray-500">
                        {v.CreditDate}
                      </td>
                      <td className="border border-gray-300 px-2 py-3 text-center text-gray-500">
                        {v.updated}
                      </td>
                      <td className="border border-gray-300 px-2 py-3 text-center text-gray-500">
                        {v.UpdatedBy}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditNote;
