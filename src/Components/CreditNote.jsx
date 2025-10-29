import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { fetchEstimates } from "../features/estimates/estimateSlice";
import { createCreditNote, fetchCreditNotes } from "../features/creditNote/creditNoteSlice";

const CreditNote = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // URL से ID प्राप्त करना (यह ID Company ID या Estimate ID हो सकती है,
  // आपके useEffect के अनुसार यह Company ID की तरह लग रही है)
  const { id } = useParams();

  console.log("prams id (Company ID assumed):", id);

  const { estimates } = useSelector((state) => state.estimates);
  const {creditNotes} = useSelector((state) => state.creditnotes);
  console.log("creditNotes..",creditNotes);
  // console.log("Estimates Data:", estimates); 

  const [matchedEstNo, setMatchedEstNo] = useState("");

  const [rows, setRows] = useState([
    { estimate: "", item: "", qty: "", amount: "", remark: "" },
  ]);

  const Datas = [
    {
      creditno: "1",
      creditamount: "435",
      CreditDate: "12/03/2025",
      updated: "29/03/2025",
      UpdatedBy: "admin",
    },
  ];

  const userName = localStorage.getItem("user_name") || "unknown_user";

  useEffect(() => {
    dispatch(fetchEstimates());
    dispatch(fetchCreditNotes());
  }, [dispatch]);

  // --- 💡 NEW LOGIC: Collect unique item descriptions ---
  const uniqueItemDescriptions = useMemo(() => {
    if (!estimates || estimates.length === 0) return [];

    const descriptions = new Set();

    // केवल उस कंपनी के estimates के items collect करें जो URL ID से मैच करते हैं
    const companyEstimates = estimates.filter((est) => est.companyId === id);

    companyEstimates.forEach((estimate) => {
      estimate.items.forEach((item) => {
        if (item.description) {
          descriptions.add(item.description);
        }
      });
    });

    return Array.from(descriptions);
  }, [estimates, id]);
  // ----------------------------------------------------

  // --- ✅ CORRECTED MATCHING LOGIC (Assuming 'id' is CompanyId) ---
  useEffect(() => {
    if (id && estimates && estimates.length > 0) {
      // Logic: Company ID से मैच होने वाला पहला Estimate खोजें (केवल est_no दिखाने के लिए)
      const matchedEstimate = estimates.find((est) => est.companyId === id);

      if (matchedEstimate) {
        setMatchedEstNo(matchedEstimate.est_no);
        console.log(
          "✅ Matched Estimate Object (by Company ID):",
          matchedEstimate
        );
        console.log("✅ Matched Estimate No.:", matchedEstimate.est_no);
      } else {
        setMatchedEstNo("");
        console.log("❌ No matching estimate found for Company ID:", id);
      }
    }
  }, [id, estimates]);
  // ------------------------------------------------------------------

  const buttonStyle =
    "px-3 py-1 text-xs bg-[#3598dc] hover:bg-[#286090] text-white transition-colors";

  const handleAddClient = () => navigate("/ihweClientData2026/addNewClients");
  const handleMasterList = () => navigate("/ihweClientData2026/masterData");

  const handleAddRow = () => {
    setRows([
      ...rows,
      { estimate: "", item: "", qty: "", amount: "", remark: "" },
    ]);
  };

  const handleRemoveRow = (index) => {
    if (rows.length > 1) {
      setRows(rows.filter((_, i) => i !== index));
    }
  };

  const handleRowChange = (index, field, value) => {
    const updatedRows = [...rows];
    if (field === "qty" || field === "amount") {
      value = value.replace(/[^0-9.]/g, "");
      if ((value.match(/\./g) || []).length > 1) return;
    }
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  const resetForm = () => {
    setRows([{ estimate: "", item: "", qty: "", amount: "", remark: "" }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedEstimate = rows.length > 0 ? rows[0].estimate : "";

    const items = rows.map(({ estimate, ...rest }) => ({
      item: rest.item,
      companyId: id,
      added_by: userName,
      qty: rest.qty,
      amount: rest.amount,
      remark: rest.remark,
    }));

    const dataToSend = {
      Select_Estimate: selectedEstimate,
      added_by: userName,
      CompanyId: id,
      line_items: items,
      matched_est_no: matchedEstNo,
    };

    console.log("Form Submitted Data Structure:", dataToSend);
    alert("Form Submitted Successfully!");
    resetForm();
  };

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

        {/* Display the matched est_no for confirmation */}
        {/* {matchedEstNo && (
          <div className="text-sm font-medium text-green-700 mb-4 p-2 bg-green-100 border border-green-300 rounded">
            Matched Estimate Number (est_no) for Company ID **{id}**: **
            {matchedEstNo}**
          </div>
        )} */}

        <form onSubmit={handleSubmit}>
          {rows.map((row, index) => (
            <div
              key={index}
              className="grid grid-cols-5 md:grid-cols-6 gap-3 mb-4 items-end"
            >
              {/* Only show 'Select Estimate' on the first row */}
              {index === 0 ? (
                <div className="flex flex-col md:col-span-1">
                  <label className="text-xs font-medium text-gray-900 mb-1 block">
                    Select Estimate{" "}
                    <span className="text-red-500 font-semibold">*</span>
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
                    {/* Estimates को Dynamically Render करें - केवल current company के लिए फ़िल्टर करना बेहतर होगा */}
                    {estimates
                      .filter((est) => est.companyId === id)
                      .map((est) => (
                        <option key={est._id} value={est._id}>
                          {est.est_no}
                        </option>
                      ))}
                  </select>
                </div>
              ) : (
                // Add an empty div for alignment on subsequent rows
                <div className="md:col-span-1 h-8" />
              )}

              <div className="flex flex-col md:col-span-1">
                <label className="text-xs font-medium text-gray-900 mb-1 block">
                  Select Item{" "}
                  <span className="text-red-500 font-semibold">*</span>
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
                  {/* ✅ UPDATED: Items को Dynamically Map किया गया है */}
                  {uniqueItemDescriptions.map((description, descIndex) => (
                    <option key={descIndex} value={description}>
                      {description}
                    </option>
                  ))}
                  {/* यदि कोई आइटम नहीं है */}
                  {uniqueItemDescriptions.length === 0 && (
                    <option value="" disabled>
                      No items found for this Company
                    </option>
                  )}
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
                  CN Amount{" "}
                  <span className="text-red-500 font-semibold">*</span>
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
                  Credit Note Remark{" "}
                  <span className="text-red-500 font-semibold">*</span>
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
                    {/* Show minus button on all but the first row */}
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
                    {/* Show plus button only on the last row */}
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
