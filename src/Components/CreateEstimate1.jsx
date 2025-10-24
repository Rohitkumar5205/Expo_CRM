import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const indianStates = [
  "Andaman and Nicobar Islands",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra and Nagar Haveli",
  "Daman and Diu",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Pondicherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

const unitOptions = [
  "Inch",
  "Feet",
  "Sqft",
  "Meter",
  "Nos",
  "%",
  "L.S.",
  "Rft.",
  "Nos.",
  "Rmt.",
  "Sqft.",
  "Pcs.",
  "Sqmtr.",
  "Roll",
  "Pkt",
  "Mtr",
  "Q.FT",
  "RFT",
  "RMT",
  "l.s.",
  "%",
  "meter",
  "sqft",
  "feet",
  "inch",
  "nos",
];

const CreateEstimate1 = () => {
  const navigate = useNavigate();
  // State to manage the form data for the main estimate fields
  const [estimateData, setEstimateData] = useState({
    estimateType: "",
    estimateNo: "NGW/25-26/EST/117", // Pre-filled as in screenshot
    gstinPan: "",
    supplyDate: "",
    consigneeName: "Organic Expo 2026", // Pre-filled
    consigneeAddress: "Hall No -12, Ground Floor, ITPO, Pragati Maidan", // Pre-filled
    country: "India", // Pre-filled
    state: "",
    city: "",
    pinCode: "110001", // Pre-filled
    gstRate: "", // For the overall GST
    finalAmount: "",
    anyRemarks: "",
  });

  // State to manage the list of item rows, starting with one default row
  const [items, setItems] = useState([
    {
      description: "",
      hsnNo: "",
      qty: "",
      size: "",
      unit: "",
      rate: "",
      amount: "0.00", // Default calculated values to avoid NaN on render
      disc: "0",
      taxableValue: "0.00",
      gstRate: "", // GST rate for this specific item
      finalAmount: "0.00", // Final amount for this specific item
      anyRemarks: "",
    },
  ]);

  // Handle changes for main estimate fields
  const handleEstimateChange = (e) => {
    const { name, value } = e.target;
    setEstimateData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle changes for item specific fields
  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const newItems = [...items];
    newItems[index][name] = value;
    setItems(newItems);
  };

  // Calculation logic for item row amounts
  useEffect(() => {
    const calculateItems = items.map((item) => {
      // Use parseFloat or default to 0 for calculations
      const qty = parseFloat(item.qty) || 0;
      const rate = parseFloat(item.rate) || 0;
      const disc = parseFloat(item.disc) || 0;
      const gstRate = parseFloat(item.gstRate) || 0;

      // 1. Amount: Qty * Rate
      const amount = qty * rate;

      // 2. Taxable Value: Amount - Discount
      const taxableValue = amount - amount * (disc / 100);

      // 3. GST Amount: Taxable Value * GST Rate
      const gstAmount = taxableValue * (gstRate / 100);

      // 4. Final Amount: Taxable Value + GST Amount
      const finalAmount = taxableValue + gstAmount;

      return {
        ...item,
        amount: amount.toFixed(2),
        taxableValue: taxableValue.toFixed(2),
        finalAmount: finalAmount.toFixed(2),
      };
    });
    setItems(calculateItems);
  }, [
    items.length,
    // Dependency array for deep changes in key fields
    ...items
      .map((item) => [item.qty, item.rate, item.disc, item.gstRate])
      .flat(),
  ]);

  // Add a new item row
  const handleAddItem = () => {
    setItems((prev) => [
      ...prev,
      {
        description: "",
        hsnNo: "",
        qty: "",
        size: "",
        unit: "",
        rate: "",
        amount: "0.00",
        disc: "0",
        taxableValue: "0.00",
        gstRate: "",
        finalAmount: "0.00",
        anyRemarks: "",
      },
    ]);
  };

  // Remove an item row
  const handleRemoveItem = (index) => {
    // Prevent removing the last row
    if (items.length > 1) {
      setItems((prev) => prev.filter((_, i) => i !== index));
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Estimate Data:", estimateData);
    console.log("Items Data:", items);
    alert("Estimate Submitted (Check console for data)");
  };
  // Navigation handlers
  const handleMasterList = () => {
    navigate("/ihweClientData2026/masterData");
  };
  const handleAddClient = () => {
    navigate("/ihweClientData2026/addNewClients");
  };

  const inputClass =
    "p-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500";
  const labelClass = "block text-xs font-semibold text-gray-700 mb-1";

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Heading and Navigation Buttons */}
      <div className="w-full h-fit bg-white shadow-md">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between px-4 py-1.5">
          <h1 className="text-xl text-gray-500 mb-2 lg:mb-0 uppercase">
            Account Section | Estimate
          </h1>
          <div className="flex flex-wrap gap-2 cursor-pointer">
            <button
              onClick={handleAddClient}
              className="px-3 py-1 text-xs bg-[#3598dc] hover:bg-[#286090] text-white transition-colors"
            >
              Add Client
            </button>
            <button
              onClick={handleMasterList}
              className="px-3 py-1 text-xs bg-[#3598dc] hover:bg-[#286090] text-white transition-colors"
            >
              Master List
            </button>
          </div>
        </div>
      </div>
      <div className="bg-white shadow-lg rounded-lg p-6 m-4">
        <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-4">
          Create Estimate
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Main Estimate Details Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-x-6 gap-y-4 mb-8">
            {/* Estimate Types */}
            <div>
              <label htmlFor="estimateType" className={labelClass}>
                Estimate Types *
              </label>
              <select
                id="estimateType"
                name="estimateType"
                value={estimateData.estimateType}
                onChange={handleEstimateChange}
                className={`w-full ${inputClass}`}
                required
              >
                <option value="">Select Here</option>
                <option value="Intrastate">Intrastate</option>
                <option value="Interstate Sale">Interstate Sale</option>
                <option value="Foreign Sale">Foreign Sale</option>
              </select>
            </div>

            {/* Estimate No. */}
            <div>
              <label htmlFor="estimateNo" className={labelClass}>
                Estimate No. *
              </label>
              <input
                type="text"
                id="estimateNo"
                name="estimateNo"
                value={estimateData.estimateNo}
                onChange={handleEstimateChange}
                className={`w-full bg-gray-100 cursor-not-allowed ${inputClass}`}
                readOnly
                required
              />
            </div>

            {/* GSTIN No./PAN No. */}
            <div>
              <label htmlFor="gstinPan" className={labelClass}>
                GSTIN No./PAN No. *
              </label>
              <input
                type="text"
                id="gstinPan"
                name="gstinPan"
                value={estimateData.gstinPan}
                onChange={handleEstimateChange}
                className={`w-full ${inputClass}`}
                placeholder="Enter GSTIN/PAN No."
                required
              />
            </div>

            {/* Supply Date */}
            <div>
              <label htmlFor="supplyDate" className={labelClass}>
                Supply Date *
              </label>
              <input
                type="date"
                id="supplyDate"
                name="supplyDate"
                value={estimateData.supplyDate}
                onChange={handleEstimateChange}
                className={`w-full ${inputClass}`}
                required
              />
            </div>

            {/* Consignee Name */}
            <div>
              <label htmlFor="consigneeName" className={labelClass}>
                Consignee Name *
              </label>
              <input
                type="text"
                id="consigneeName"
                name="consigneeName"
                value={estimateData.consigneeName}
                onChange={handleEstimateChange}
                className={`w-full bg-gray-100 cursor-not-allowed ${inputClass}`}
                readOnly
                required
              />
            </div>

            {/* Consignee Address */}
            <div>
              <label htmlFor="consigneeAddress" className={labelClass}>
                Consignee Address *
              </label>
              <input
                type="text"
                id="consigneeAddress"
                name="consigneeAddress"
                value={estimateData.consigneeAddress}
                onChange={handleEstimateChange}
                className={`w-full bg-gray-100 cursor-not-allowed ${inputClass}`}
                readOnly
                required
              />
            </div>

            {/* Country */}
            <div>
              <label htmlFor="country" className={labelClass}>
                Country *
              </label>
              <select
                id="country"
                name="country"
                value={estimateData.country}
                onChange={handleEstimateChange}
                className={`w-full bg-gray-100 cursor-not-allowed ${inputClass}`}
                readOnly
                required
              >
                <option value="India">India</option>
              </select>
            </div>

            {/* State */}
            <div>
              <label htmlFor="state" className={labelClass}>
                State *
              </label>
              <select
                id="state"
                name="state"
                value={estimateData.state}
                onChange={handleEstimateChange}
                className={`w-full ${inputClass}`}
                required
              >
                <option value="">Select State :</option>
                {indianStates.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            {/* City */}
            <div>
              <label htmlFor="city" className={labelClass}>
                City *
              </label>
              <select
                id="city"
                name="city"
                value={estimateData.city}
                onChange={handleEstimateChange}
                className={`w-full ${inputClass}`}
                required
              >
                <option value="">Select Here</option>
                {/* Dynamically filter/load cities based on selected state in a real application */}
                <option value="New Delhi">New Delhi</option>
                <option value="Mumbai">Mumbai</option>
              </select>
            </div>

            {/* Pin Code */}
            <div>
              <label htmlFor="pinCode" className={labelClass}>
                Pin Code *
              </label>
              <input
                type="text"
                id="pinCode"
                name="pinCode"
                value={estimateData.pinCode}
                onChange={handleEstimateChange}
                className={`w-full bg-gray-100 cursor-not-allowed ${inputClass}`}
                readOnly
                required
              />
            </div>
          </div>

          {/* Item Rows Section */}
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 p-4 rounded-md mb-6 border border-gray-200"
            >
              <h3 className="text-md font-semibold text-gray-700 mb-4">
                Item No. {index + 1}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-x-4 gap-y-3 items-end">
                {/* --- ROW 1: Description, HSN, Qty, Size, Unit, Rate, Amount --- */}

                {/* 1. Item Description (Takes 3/12 columns on large screens) */}
                <div className="col-span-full md:col-span-3 lg:col-span-3">
                  <label
                    htmlFor={`description-${index}`}
                    className={labelClass}
                  >
                    Item Description *
                  </label>
                  <input
                    type="text"
                    id={`description-${index}`}
                    name="description"
                    value={item.description}
                    onChange={(e) => handleItemChange(index, e)}
                    className={`w-full ${inputClass}`}
                    placeholder="Type Here"
                    required
                  />
                </div>

                {/* 2. HSN No. (Takes 2/12 columns) */}
                <div className="col-span-3 md:col-span-3 lg:col-span-2">
                  <label htmlFor={`hsnNo-${index}`} className={labelClass}>
                    HSN No. *
                  </label>
                  <input
                    type="text"
                    id={`hsnNo-${index}`}
                    name="hsnNo"
                    value={item.hsnNo}
                    onChange={(e) => handleItemChange(index, e)}
                    className={`w-full ${inputClass}`}
                    required
                  />
                </div>

                {/* 3. Qty (Takes 1/12 column) */}
                <div className="col-span-3 md:col-span-2 lg:col-span-1">
                  <label htmlFor={`qty-${index}`} className={labelClass}>
                    Qty. *
                  </label>
                  <input
                    type="number"
                    id={`qty-${index}`}
                    name="qty"
                    value={item.qty}
                    onChange={(e) => handleItemChange(index, e)}
                    className={`w-full ${inputClass}`}
                    required
                  />
                </div>

                {/* 4. Size (Takes 1/12 column) */}
                <div className="col-span-3 md:col-span-2 lg:col-span-1">
                  <label htmlFor={`size-${index}`} className={labelClass}>
                    Size
                  </label>
                  <input
                    type="text"
                    id={`size-${index}`}
                    name="size"
                    value={item.size}
                    onChange={(e) => handleItemChange(index, e)}
                    className={`w-full ${inputClass}`}
                  />
                </div>

                {/* 5. Unit (Takes 2/12 columns) */}
                <div className="col-span-3 md:col-span-2 lg:col-span-2">
                  <label htmlFor={`unit-${index}`} className={labelClass}>
                    Unit *
                  </label>
                  <select
                    id={`unit-${index}`}
                    name="unit"
                    value={item.unit}
                    onChange={(e) => handleItemChange(index, e)}
                    className={`w-full ${inputClass}`}
                    required
                  >
                    <option value="">Select Unit</option>
                    {unitOptions.map((unit) => (
                      <option key={unit} value={unit}>
                        {unit}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 6. Rate (Takes 1/12 column) */}
                <div className="col-span-3 md:col-span-2 lg:col-span-1">
                  <label htmlFor={`rate-${index}`} className={labelClass}>
                    Rate *
                  </label>
                  <input
                    type="number"
                    id={`rate-${index}`}
                    name="rate"
                    value={item.rate}
                    onChange={(e) => handleItemChange(index, e)}
                    className={`w-full ${inputClass}`}
                    required
                  />
                </div>

                {/* 7. Amount (Takes 2/12 columns) - End of first logical row */}
                <div className="col-span-3 md:col-span-2 lg:col-span-2">
                  <label htmlFor={`amount-${index}`} className={labelClass}>
                    Amount *
                  </label>
                  <input
                    type="text"
                    id={`amount-${index}`}
                    name="amount"
                    value={item.amount}
                    readOnly
                    className={`w-full bg-gray-100 cursor-not-allowed ${inputClass}`}
                    required
                  />
                </div>

                {/* --- ROW 2: DISC, Taxable Value, GST, Final Amount, Remarks, Buttons --- */}

                {/* 8. DISC % (Takes 2/12 columns) */}
                <div className="col-span-3 md:col-span-2 lg:col-span-2">
                  <label htmlFor={`disc-${index}`} className={labelClass}>
                    DISC % *
                  </label>
                  <input
                    type="number"
                    id={`disc-${index}`}
                    name="disc"
                    value={item.disc}
                    onChange={(e) => handleItemChange(index, e)}
                    className={`w-full ${inputClass}`}
                    required
                  />
                </div>

                {/* 9. Taxable Value (Takes 2/12 columns) */}
                <div className="col-span-3 md:col-span-2 lg:col-span-2">
                  <label
                    htmlFor={`taxableValue-${index}`}
                    className={labelClass}
                  >
                    Taxable Value *
                  </label>
                  <input
                    type="text"
                    id={`taxableValue-${index}`}
                    name="taxableValue"
                    value={item.taxableValue}
                    readOnly
                    className={`w-full bg-gray-100 cursor-not-allowed ${inputClass}`}
                    required
                  />
                </div>

                {/* 10. GST Rate (Takes 2/12 columns) */}
                {/* GST Rate (Takes 3/12 columns to accommodate the extra field) */}
                <div className="col-span-3 md:col-span-3 lg:col-span-2">
                  <label htmlFor={`gstRate-${index}`} className={labelClass}>
                    GST Rate *
                  </label>
                  <div className="flex items-center">
                    {/* 1. Main Input Field (Left section) */}
                    <input
                      type="number"
                      id={`gstRate-${index}`}
                      name="gstRate"
                      value={item.gstRate}
                      onChange={(e) => handleItemChange(index, e)}
                      // Adjust styling: Remove right-rounding, border-r-0 to connect to the span
                      className={`w-1/3 ${inputClass} rounded-r-none border-r-0`}
                      placeholder="e.g. 18"
                      required
                    />
                    {/* 2. % Sign (Middle section) */}
                    <span className="bg-gray-200 p-2 border border-gray-300 text-sm text-gray-600">
                      %
                    </span>
                    {/* 3. Calculated Value (Right section) */}
                    <input
                      type="text"
                      value={(item.taxableValue * (item.gstRate / 100)).toFixed(
                        2
                      )} // Calculated GST Amount
                      readOnly
                      // Adjust styling: Remove left-rounding, use gray background
                      className={`w-1/3 bg-gray-100 cursor-not-allowed ${inputClass} rounded-l-none border-l-0`}
                    />
                  </div>
                </div>

                {/* 11. Final Amount (Takes 2/12 columns) */}
                <div className="col-span-3 md:col-span-2 lg:col-span-2">
                  <label
                    htmlFor={`finalAmount-${index}`}
                    className={labelClass}
                  >
                    Final Amount
                  </label>
                  <input
                    type="text"
                    id={`finalAmount-${index}`}
                    name="finalAmount"
                    value={item.finalAmount}
                    readOnly
                    className={`w-full bg-gray-100 cursor-not-allowed ${inputClass}`}
                  />
                </div>

                {/* 12. Any Remarks (Takes 3/12 columns) */}
                <div className="col-span-full md:col-span-5 lg:col-span-3">
                  <label
                    htmlFor={`itemRemarks-${index}`}
                    className={labelClass}
                  >
                    Any Remarks
                  </label>
                  <textarea
                    id={`itemRemarks-${index}`}
                    name="anyRemarks"
                    value={item.anyRemarks}
                    onChange={(e) => handleItemChange(index, e)}
                    className={`w-full ${inputClass} h-10 resize-y`}
                    placeholder="Type Here..."
                  ></textarea>
                </div>

                {/* 13. Add/Remove Buttons (Takes 1/12 column) */}
                <div className="flex items-end justify-end gap-2 col-span-full md:col-span-1 lg:col-span-1 min-w-[70px]">
                  {items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(index)}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md transition-colors w-7 h-7 flex items-center justify-center text-lg"
                      aria-label="Remove Item"
                    >
                      -
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleAddItem}
                    className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-md transition-colors w-7 h-7 flex items-center justify-center text-lg"
                    aria-label="Add Item"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Action Buttons */}
          <div className="mt-10 flex space-x-4">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors"
            >
              ADD ESTIMATE
            </button>
            <button
              type="button"
              className="px-6 py-2 bg-gray-300 text-gray-800 font-semibold rounded-md hover:bg-gray-400 transition-colors"
              onClick={() => {
                // Simplified form reset
                window.location.reload();
              }}
            >
              CANCEL
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEstimate1;
