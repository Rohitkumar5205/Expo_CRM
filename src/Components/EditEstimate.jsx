import React, { useState } from "react";

const EditEstimate = ({ onEstimateCreated, onCancel }) => {
  const [formData, setFormData] = useState({
    estimateType: "",
    estimateNo: "NGW/25-26/EST/114",
    gstNo: "",
    supplyDate: "",
    consigneeName: "Organic Expo 2026",
    address: "Hall No.-12, Ground Floor, ITPO, Pragati Maidan",
    country: "India",
    state: "",
    city: "",
    pinCode: "110001",
  });

  const [items, setItems] = useState([
    {
      id: Date.now(),
      itemDesc: "",
      hsn: "",
      qty: "",
      size: "",
      unit: "",
      rate: "",
      amount: 0,
      disc: 0,
      taxable: 0,
      gstRate: 0,
      finalAmount: 0,
      remarks: "",
    },
  ]);

  const handleBasicChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleItemChange = (id, field, value) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };

          const qty = Number(updatedItem.qty) || 0;
          const rate = Number(updatedItem.rate) || 0;
          const disc = Number(updatedItem.disc) || 0;
          const gstRate = Number(updatedItem.gstRate) || 0;

          const newAmount = qty * rate;
          const newTaxable = newAmount - newAmount * (disc / 100);
          const newFinalAmount = newTaxable + newTaxable * (gstRate / 100);

          return {
            ...updatedItem,
            amount: newAmount.toFixed(2),
            taxable: newTaxable.toFixed(2),
            finalAmount: newFinalAmount.toFixed(2),
          };
        }
        return item;
      })
    );
  };

  const addItemRow = () => {
    const newItem = {
      id: Date.now(),
      itemDesc: "",
      hsn: "",
      qty: "",
      size: "",
      unit: "",
      rate: "",
      amount: 0,
      disc: 0,
      taxable: 0,
      gstRate: 0,
      finalAmount: 0,
      remarks: "",
    };
    setItems([...items, newItem]);
  };

  const removeItemRow = (id) => {
    if (items.length > 1) {
      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    }
  };

  const validateForm = () => {
    if (!formData.estimateType) return "Please select estimate type";
    if (!formData.gstNo) return "Please enter GST/PAN number";
    if (!formData.supplyDate) return "Please select supply date";
    if (!formData.state) return "Please select state";
    if (!formData.city) return "Please select city";

    for (let item of items) {
      if (!item.itemDesc) return "Please enter item description";
      if (!item.hsn) return "Please enter HSN number";
      if (!item.qty) return "Please enter quantity";
      if (!item.unit) return "Please select unit";
      if (!item.rate) return "Please enter rate";
    }

    return null;
  };

  const handleSave = () => {
    const validationError = validateForm();
    if (validationError) {
      alert(validationError);
      return;
    }

    // Calculate totals
    const totalAmount = items.reduce(
      (sum, item) => sum + parseFloat(item.finalAmount || 0),
      0
    );
    const totalTaxable = items.reduce(
      (sum, item) => sum + parseFloat(item.taxable || 0),
      0
    );

    const estimateData = {
      id: Date.now(),
      ...formData,
      items: items,
      totalAmount: totalAmount.toFixed(2),
      totalTaxable: totalTaxable.toFixed(2),
      createdDate: new Date().toLocaleDateString(),
      status: "Active",
    };

    // Show success message
    alert(
      `✅ Estimate saved successfully!\n\nEstimate No: ${
        formData.estimateNo
      }\nTotal Amount: ₹${totalAmount.toFixed(2)}\nItems: ${items.length}`
    );

    // Pass data to parent component
    if (onEstimateCreated) {
      onEstimateCreated(estimateData);
    }
  };

  const handleAddEstimate = () => {
    handleSave();
  };

  const ArrowIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
    </svg>
  );

  return (
    <>
      {/* Heading Section */}
      <div className="w-full h-auto bg-white  px-3 py-2  ">
        <h2 className="text-xl font-semibold text-gray-500 ">
          ESTIMATE | EDIT
        </h2>
      </div>

      <div className="w-full min-h-screen bg-gray-100 font-sans mx-1 pt-2 ">
        {/* Main Form Section */}
        <div className="max-w-full  bg-white  mx-8 my-4  rounded-lg">
          <div className="p-4 mx-4">
            <h2 className="text-xl font-semibold text-gray-500  ">
              Edit Estimate
            </h2>
            <hr className="w-full opacity-10 mb-2" />
            {/* Basic Information - Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 mb-2">
              <div className="col-span-1">
                <label className="block text-xs font-normal text-gray-700 mb-1">
                  Estimate Types <span className="text-red-500">*</span>
                </label>
                <select
                  name="estimateType"
                  value={formData.estimateType}
                  onChange={handleBasicChange}
                  className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Here</option>
                  <option value="proforma">Proforma</option>
                  <option value="quotation">Quotation</option>
                </select>
              </div>

              <div className="col-span-1">
                <label className="block text-xs font-normal text-gray-700 mb-1">
                  Estimate No. <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="estimateNo"
                  value={formData.estimateNo}
                  readOnly
                  className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="col-span-1">
                <label className="block text-xs font-normal text-gray-700 mb-1">
                  GSTIN No./PAN No. <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="gstNo"
                  value={formData.gstNo}
                  onChange={handleBasicChange}
                  className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="col-span-1">
                <label className="block text-xs font-normal text-gray-700 mb-1">
                  Supply Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="supplyDate"
                  value={formData.supplyDate}
                  onChange={handleBasicChange}
                  className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="col-span-1">
                <label className="block text-xs font-normal text-gray-700 mb-1">
                  Consignee Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="consigneeName"
                  value={formData.consigneeName}
                  onChange={handleBasicChange}
                  className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Address Information - Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 mb-4">
              <div className="col-span-2">
                <label className="block text-xs font-normal text-gray-700 mb-1">
                  Consignee Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleBasicChange}
                  className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="col-span-1">
                <label className="block text-xs font-normal text-gray-700 mb-1">
                  Country <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  readOnly
                  className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="col-span-1">
                <label className="block text-xs font-normal text-gray-700 mb-1">
                  State <span className="text-red-500">*</span>
                </label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleBasicChange}
                  className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select State</option>
                  <option value="Delhi">Delhi</option>
                  <option value="UP">Uttar Pradesh</option>
                  <option value="HR">Haryana</option>
                </select>
              </div>

              <div className="col-span-1">
                <label className="block text-xs font-normal text-gray-700 mb-1">
                  City <span className="text-red-500">*</span>
                </label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleBasicChange}
                  className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Here</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Noida">Noida</option>
                  <option value="Gurgaon">Gurgaon</option>
                </select>
              </div>
            </div>

            {/* Pin Code Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 mb-4">
              <div className="col-span-1">
                <label className="block text-xs font-normal text-gray-700 mb-1">
                  Pin Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="pinCode"
                  value={formData.pinCode}
                  onChange={handleBasicChange}
                  className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Items Section */}
            {items.map((item, index) => (
              <div key={item.id} className="mb-1  bg-gray-50 ">
                {/* Item Header */}

                <div className="flex justify-between items-center mb-2">
                  <h4 className="w-full bg-gray-400 text-center text-sm font-semibold text-black">
                    Item No. {index + 1}
                  </h4>
                  {items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeItemRow(item.id)}
                      className="bg-red-500 hover:bg-red-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold transition-colors duration-200"
                    >
                      -
                    </button>
                  )}
                </div>

                {/* Item Fields Row 1 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-9 gap-3 mb-3">
                  <div className="col-span-2">
                    <label className="block text-xs font-normal text-gray-700 mb-1">
                      Item Description <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={item.itemDesc}
                      onChange={(e) =>
                        handleItemChange(item.id, "itemDesc", e.target.value)
                      }
                      className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Type here..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-normal text-gray-700 mb-1">
                      HSN No. <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={item.hsn}
                      onChange={(e) =>
                        handleItemChange(item.id, "hsn", e.target.value)
                      }
                      className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-normal text-gray-700 mb-1">
                      Qty <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={item.qty}
                      onChange={(e) =>
                        handleItemChange(item.id, "qty", e.target.value)
                      }
                      className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-normal text-gray-700 mb-1">
                      Size
                    </label>
                    <input
                      type="text"
                      value={item.size}
                      onChange={(e) =>
                        handleItemChange(item.id, "size", e.target.value)
                      }
                      className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-normal text-gray-700 mb-1">
                      Unit <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={item.unit}
                      onChange={(e) =>
                        handleItemChange(item.id, "unit", e.target.value)
                      }
                      className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Unit</option>
                      <option value="kg">Kg</option>
                      <option value="pcs">Pcs</option>
                      <option value="ltr">Ltr</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-normal text-gray-700 mb-1">
                      Rate <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={item.rate}
                      onChange={(e) =>
                        handleItemChange(item.id, "rate", e.target.value)
                      }
                      className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-normal text-gray-700 mb-1">
                      Amount <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={item.amount}
                      readOnly
                      className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-normal text-gray-700 mb-1">
                      DISC % <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={item.disc}
                      onChange={(e) =>
                        handleItemChange(item.id, "disc", e.target.value)
                      }
                      className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className=" block text-xs font-normal text-gray-700">
                      Taxable Value <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={item.taxable}
                      readOnly
                      className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Item Fields Row 2 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 mb-3">
                  <div className="col-span-1">
                    <label className="block text-xs font-normal text-gray-700 mb-1">
                      GST Rate % <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center">
                      <input
                        type="number"
                        value={item.gstRate}
                        onChange={(e) =>
                          handleItemChange(item.id, "gstRate", e.target.value)
                        }
                        className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                      />
                      <span className="ml-2 text-xs font-normal text-gray-700">
                        %
                      </span>
                    </div>
                  </div>

                  <div className="col-span-1">
                    <label className="block text-xs font-normal text-gray-700 mb-1">
                      Final Amount
                    </label>
                    <input
                      type="number"
                      value={item.finalAmount}
                      readOnly
                      className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="col-span-3">
                    <label className="block text-xs font-normal text-gray-700 mb-1">
                      Any Remarks
                    </label>
                    <input
                      type="text"
                      value={item.remarks}
                      onChange={(e) =>
                        handleItemChange(item.id, "remarks", e.target.value)
                      }
                      className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Type here..."
                    />
                  </div>
                </div>

                {/* Add/Remove buttons for this item */}
                <div className="flex justify-end gap-2 mt-1">
                  <button
                    type="button"
                    onClick={() => removeItemRow(item.id)}
                    disabled={items.length === 1}
                    className="px-2 py-1 text-xs bg-red-500 hover:bg-red-600 text-white rounded transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    -
                  </button>
                  {index === items.length - 1 && (
                    <button
                      type="button"
                      onClick={addItemRow}
                      className="px-2 py-1 text-xs bg-green-500 hover:bg-green-600 text-white rounded transition-colors duration-200"
                    >
                      +
                    </button>
                  )}
                </div>
              </div>
            ))}

            {/* Footer Section */}

            <div className="flex flex-col sm:flex-row  items-start sm:items-center mx-1">
              <div className="flex gap-2">
                <button
                  onClick={handleAddEstimate}
                  className="px-4 py-1.5 text-xs bg-[#337ab7] hover:bg-[#286090] text-white rounded transition-colors duration-200 flex items-center gap-1"
                >
                  ADD ESTIMATE <ArrowIcon />
                </button>
                <button
                  onClick={onCancel}
                  className="px-4 py-1.5 text-xs bg-red-600 hover:bg-red-700 text-white rounded transition-colors duration-200"
                >
                  CANCEL
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditEstimate;
