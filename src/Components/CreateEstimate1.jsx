import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addEstimate,
  clearEstimateState,
  fetchNextEstimateNo,
} from "../features/estimates/estimateSlice";
import { fetchEvents } from "../features/crmEvent/crmEventSlice";
import { fetchCountries } from "../features/add_by_admin/country/countrySlice";
import { fetchStates } from "../features/state/stateSlice";
import { fetchCities } from "../features/city/citySlice";
import { fetchCompanies } from "../features/company/companySlice";
import { showError, showSuccess } from "../utils/toastMessage";

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
  "inch",
];

const CreateEstimate1 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id: companyIdFromParams } = useParams();
  const { loading, error, success } = useSelector((state) => state.estimates);
  const { events } = useSelector((state) => state.crmEvents);
  const { countries } = useSelector((state) => state.countries);
  const { states } = useSelector((state) => state.states);
  const { cities } = useSelector((state) => state.cities);
  const { companies } = useSelector((state) => state.companies);

  useEffect(() => {
    dispatch(fetchEvents());
    dispatch(fetchCountries());
    dispatch(fetchStates());
    dispatch(fetchCities());
    if (companies.length === 0) {
      dispatch(fetchCompanies());
    }
    dispatch(fetchNextEstimateNo())
      .unwrap()
      .then((nextEstNo) => {
        // 🟢 Update the local state with the fetched number
        setEstimateData((prev) => ({
          ...prev,
          est_no: nextEstNo,
        }));
      })
      .catch((err) => {
        showError(`Failed to fetch estimate number: ${err.message || err}`);
      });
  }, [dispatch]);

  console.log("countries", countries);
  console.log("states", states);
  console.log("cities", cities);
  // --- State Initialization ---
  const [estimateData, setEstimateData] = useState({
    est_type: "",
    est_no: "",
    gst_no: "",
    supply_date: "",
    consignee_name: "",
    consignee_addr: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
    remarks: "",
  });

  const [items, setItems] = useState([
    {
      description: "",
      hsn: "",
      qty: "",
      size: "",
      unit: "",
      rate: "",
      amount: "0.00",
      disc: "0",
      tax: "0.00",
      gstRate: "",
      finalAmount: "0.00",
      remarks: "",
    },
  ]);

  // 🟢 NEW: State to track submission status
  const [isSubmitted, setIsSubmitted] = useState(false);

  // 🟢 NEW: Handle API feedback (Success/Error)
  useEffect(() => {
    if (success && isSubmitted) {
      showSuccess("Estimate created successfully!");
      dispatch(clearEstimateState()); // Clear success message after showing
      navigate(`/ihweClientData2026/accountSection1/${companyIdFromParams}`);
    }
    if (error && isSubmitted) {
      showError(`Error: ${error.message || error}`); // Show error message
      dispatch(clearEstimateState()); // Clear error message
    }
  }, [success, error, isSubmitted, dispatch, navigate, companyIdFromParams]);

  // --- Handlers (Unchanged) ---
  const handleEstimateChange = (e) => {
    const { name, value } = e.target;

    setEstimateData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "country" && { state: "", city: "" }),
      ...(name === "state" && { city: "" }),
    }));
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const newItems = [...items];
    newItems[index][name] = value;
    setItems(newItems);
  };

  // --- Calculation Logic (Unchanged) ---
  useEffect(() => {
    let totalFinalAmount = 0;

    const calculateItems = items.map((item) => {
      const qty = parseFloat(item.qty) || 0;
      const rate = parseFloat(item.rate) || 0;
      const disc = parseFloat(item.disc) || 0;
      const gstRate = parseFloat(item.gstRate) || 0;

      const amount = qty * rate;
      const taxableValue = amount - amount * (disc / 100);
      const gstAmount = taxableValue * (gstRate / 100);
      const finalAmount = taxableValue + gstAmount;

      totalFinalAmount += finalAmount;

      return {
        ...item,
        amount: amount.toFixed(2),
        tax: taxableValue.toFixed(2),
        finalAmount: finalAmount.toFixed(2),
      };
    });

    setItems(calculateItems);

    setEstimateData((prev) => ({
      ...prev,
      finalAmount: totalFinalAmount.toFixed(2),
    }));
  }, [
    items.length,
    ...items
      .map((item) => [item.qty, item.rate, item.disc, item.gstRate])
      .flat(),
  ]);

  const handleAddItem = () => {
    setItems((prev) => [
      ...prev,
      {
        description: "",
        hsn: "",
        qty: "",
        size: "",
        unit: "",
        rate: "",
        amount: "0.00",
        disc: "0",
        tax: "0.00",
        gstRate: "",
        finalAmount: "0.00",
        remarks: "",
      },
    ]);
  };

  const handleRemoveItem = (index) => {
    if (items.length > 1) {
      setItems((prev) => prev.filter((_, i) => i !== index));
    }
  };

  // 3. FORM SUBMISSION AND API CALL (FIXED)
  const handleSubmit = (e) => {
    e.preventDefault();

    // 🟢 Set submitted flag to true to trigger effect on success/error
    setIsSubmitted(true);

    const isIntrastate = estimateData.est_type === "Intrastate";
    const isInterstate = estimateData.est_type === "Interstate Sale";
    const isForeignSale = estimateData.est_type === "Foreign Sale";

    const addedBy = sessionStorage.getItem("user_name") || "unknown_user";
    // Assuming 'company_id' holds the companyId value
    const companyId = companyIdFromParams;
    // Item Data Transformation with GST Breakdown
    const transformedItems = items.map((item) => {
      const taxableValue = parseFloat(item.tax) || 0;
      const totalGstRate = parseFloat(item.gstRate) || 0;
      const totalGstAmount = taxableValue * (totalGstRate / 100);
      let cgstPer = "0";
      let cgstAmount = "0.00";
      let igstPer = "0";

      if (isIntrastate) {
        // Intrastate Sale: Fill FULL rate and amount into CGST fields (as per your request)
        cgstPer = totalGstRate.toFixed(0);
        cgstAmount = totalGstAmount.toFixed(2);
        igstPer = "0"; // Ensure IGST is 0
      } else if (isInterstate) {
        // Interstate Sale: Fill FULL rate into IGST rate, and full amount into CGST amount field (as per your existing schema structure)
        igstPer = totalGstRate.toFixed(0);
        cgstAmount = totalGstAmount.toFixed(2);
        cgstPer = "0"; // Ensure CGST rate is 0
      } else if (isForeignSale) {
        // Foreign Sale: Tax is 0
        cgstPer = "0";
        cgstAmount = "0.00";
        igstPer = "0";
      }

      return {
        // ... direct mapping fields
        description: item.description,
        hsn: item.hsn,
        qty: item.qty,
        size: item.size,
        unit: item.unit,
        rate: item.rate,
        amount: item.amount,
        disc: item.disc,
        tax: item.tax,
        gstRate: item.gstRate,
        finalAmount: item.finalAmount,
        remarks: item.remarks,
        // ... calculated fields
        depth: item.depth || "",
        cgst: cgstAmount,
        cgst_per: cgstPer,
        igst_per: igstPer,
      };
    });

    // Main Estimate Data Transformation
    const finalEstimateData = {
      // ... direct mapping fields
      est_type: estimateData.est_type,
      est_no: estimateData.est_no,
      gst_no: estimateData.gst_no,
      supply_date: estimateData.supply_date,
      consignee_name: estimateData.consignee_name,
      consignee_addr: estimateData.consignee_addr,
      country: estimateData.country,
      state: estimateData.state,
      city: estimateData.city,
      pincode: estimateData.pincode,
      remarks: estimateData.remarks,

      // Final Amount
      finalAmount: estimateData.finalAmount,

      // 🔴 MANDATORY: Auth Context से आनी चाहिए
      companyId: companyId,
      added_by: addedBy,

      items: transformedItems,
      status: "active",
    };
    console.log("finalEstimateData...", finalEstimateData);
    // 🟢 NEW: Dispatch the Redux Thunk
    dispatch(addEstimate(finalEstimateData));
  };
  // Derived filtered lists
  const selectedCountryObj = countries?.find((c) => c.name === estimateData.country);
  const filteredStates = states?.filter(
    (st) => st.countryCode == selectedCountryObj?.countryCode,
  );

  const selectedStateObj = states?.find((s) => s.name === estimateData.state);
  const filteredCities = cities?.filter(
    (ct) => ct.stateCode == selectedStateObj?.stateCode,
  );

  // --- Navigation Handlers (Unchanged) ---
  const handleMasterList = () => {
    navigate("/ihweClientData2026/masterData");
  };
  const handleAddClient = () => {
    navigate("/ihweClientData2026/addNewClients");
  };
  const handleCancel = () => {
    navigate(-1); // navigate(-1) is equivalent to window.history.back()
  };

  const inputClass =
    "w-full px-2 py-1 text-sm border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-transparent focus:outline-none";
  const labelClass = "block text-sm font-normal text-gray-700 mb-1 ";

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ... (JSX remains largely the same) ... */}
      <div className="w-full h-fit bg-white ">
        <div className="w-full bg-white  flex flex-col sm:flex-row justify-between items-center px-4 py-1">
          <h1 className="text-xl text-gray-500 mb-2 lg:mb-0 uppercase">
            Account Section | Estimate
          </h1>
          <div className="flex flex-wrap gap-2 cursor-pointer">
            <button
              onClick={handleAddClient}
              className="hover:bg-gray-200 border border-gray-600  text-gray-600 px-1 py-0.5  text-xs font-normal cursor-pointer"
            >
              Add Client
            </button>
            <button
              onClick={handleMasterList}
              className="hover:bg-gray-200 border border-gray-600  text-gray-600 px-1 py-0.5  text-xs font-normal cursor-pointer"
            >
              Master List
            </button>
          </div>
        </div>
      </div>
      <div className="bg-white shadow-lg  px-6 pt-2 pb-6 m-4">
        <h2 className="text-lg font-normal text-gray-600 mb-2 border-b border-b-gray-200 pb-2">
          Create Estimate
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Main Estimate Details Section (Unchanged) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-x-6 gap-y-4 mb-4">
            {/* Estimate Types */}
            <div>
              <label htmlFor="est_type" className={labelClass}>
                Estimate Types *
              </label>
              <select
                id="est_type"
                name="est_type"
                value={estimateData.est_type}
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
              <label htmlFor="est_no" className={labelClass}>
                Estimate No. *
              </label>
              <input
                type="text"
                id="est_no"
                name="est_no"
                value={estimateData.est_no}
                onChange={handleEstimateChange}
                className={`w-full bg-gray-100 cursor-not-allowed ${inputClass}`}
                readOnly
                required
              />
            </div>

            {/* GSTIN No./PAN No. */}
            <div>
              <label htmlFor="gst_no" className={labelClass}>
                GSTIN No./PAN No. *
              </label>
              <input
                type="text"
                id="gst_no"
                name="gst_no"
                value={estimateData.gst_no}
                onChange={handleEstimateChange}
                className={`w-full ${inputClass}`}
                placeholder="Enter GSTIN/PAN No."
                required
              />
            </div>

            {/* Supply Date */}
            <div>
              <label htmlFor="supply_date" className={labelClass}>
                Supply Date *
              </label>
              <input
                type="date"
                id="supply_date"
                name="supply_date"
                value={estimateData.supply_date}
                onChange={handleEstimateChange}
                className={`w-full bg-gray-100 ${inputClass}`}
                required
              />
            </div>

            {/* Consignee Name */}
            <div>
              <label htmlFor="consignee_name" className={labelClass}>
                Consignee Name *
              </label>
              <select
                id="consignee_name"
                name="consignee_name"
                value={estimateData.consignee_name}
                onChange={handleEstimateChange}
                className={`w-full ${inputClass}`}
                required
              >
                <option value="">Select Here</option>
                {events.map((event, i) => (
                  <option key={i} value={event?.event_name}>
                    {event?.event_name}
                  </option>
                ))}
              </select>
            </div>

            {/* Consignee Address */}
            <div>
              <label htmlFor="consignee_addr" className={labelClass}>
                Consignee Address *
              </label>
              <input
                type="text"
                id="consignee_addr"
                name="consignee_addr"
                value={estimateData.consignee_addr}
                onChange={handleEstimateChange}
                className={`w-full ${inputClass}`}
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
                className={`w-full ${inputClass}`}
                required
              >
                <option value="">Select Country</option>
                {countries?.map((country) => (
                  <option key={country.countryCode} value={country.name}>
                    {country.name}
                  </option>
                ))}
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
                disabled={!estimateData.country}
              >
                <option value="">Select State</option>
                {filteredStates?.map((state) => (
                  <option key={state.stateCode} value={state.name}>
                    {state.name}
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
                disabled={!estimateData.state}
              >
                <option value="">Select City</option>
                {filteredCities?.map((city) => (
                  <option key={city.cityCode} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Pin Code */}
            <div>
              <label htmlFor="pincode" className={labelClass}>
                Pin Code *
              </label>
              <input
                type="text"
                id="pincode"
                name="pincode"
                value={estimateData.pincode}
                onChange={handleEstimateChange}
                className={`w-full   ${inputClass}`}
                required
              />
            </div>
          </div>

          {/* Item Rows Section (Unchanged) */}
          {items.map((item, index) => (
            <div
              key={index}
              className=" bg-gray-50 p-4  mb-4 border border-gray-200"
            >
              {index > 0 && (
                <h3 className="w-full bg-gray-500 text-sm text-center font-semibold text-gray-900 mb-4 py-0.5">
                  item No.{index + 1}
                </h3>
              )}

              <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-x-4 gap-y-3 items-end">
                {/* ... (Item fields: Description, HSN, Qty, Size, Unit, Rate, Amount) ... */}
                {/* 1. Item Description */}
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
                {/* 2. HSN No. */}
                <div className="col-span-3 md:col-span-3 lg:col-span-2">
                  <label htmlFor={`hsn-${index}`} className={labelClass}>
                    HSN No. *
                  </label>
                  <input
                    type="text"
                    id={`hsn-${index}`}
                    name="hsn"
                    value={item.hsn}
                    onChange={(e) => handleItemChange(index, e)}
                    className={`w-full ${inputClass}`}
                    required
                  />
                </div>
                {/* 3. Qty */}
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
                    className={`w-full [appearance:textfield] 
                            [&::-webkit-inner-spin-button]:appearance-none 
                            [&::-webkit-outer-spin-button]:appearance-none" ${inputClass}`}
                    required
                  />
                </div>
                {/* 4. Size */}
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
                {/* 5. Unit */}
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
                    {unitOptions.map((unit, index) => (
                      <option key={index} value={unit}>
                        {unit}
                      </option>
                    ))}
                  </select>
                </div>
                {/* 6. Rate */}
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
                    className={`w-full [appearance:textfield] 
                            [&::-webkit-inner-spin-button]:appearance-none 
                            [&::-webkit-outer-spin-button]:appearance-none" ${inputClass}`}
                    required
                  />
                </div>
                {/* 7. Amount */}
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

                {/* 8. DISC % */}
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
                    className={`w-full [appearance:textfield] 
                            [&::-webkit-inner-spin-button]:appearance-none 
                            [&::-webkit-outer-spin-button]:appearance-none" ${inputClass}`}
                    required
                  />
                </div>
                {/* 9. Taxable Value */}
                <div className="col-span-3 md:col-span-2 lg:col-span-2">
                  <label htmlFor={`tax-${index}`} className={labelClass}>
                    Taxable Value *
                  </label>
                  <input
                    type="text"
                    id={`tax-${index}`}
                    name="tax"
                    value={item.tax}
                    readOnly
                    className={`w-full bg-gray-100 cursor-not-allowed ${inputClass}`}
                    required
                  />
                </div>
                {/* 10. GST Rate */}
                <div className="col-span-3 md:col-span-3 lg:col-span-2">
                  <label htmlFor={`gstRate-${index}`} className={labelClass}>
                    GST Rate *
                  </label>
                  <div className="flex items-center">
                    <input
                      type="number"
                      id={`gstRate-${index}`}
                      name="gstRate"
                      value={item.gstRate}
                      onChange={(e) => handleItemChange(index, e)}
                      className={`w-1/3  [appearance:textfield] 
                            [&::-webkit-inner-spin-button]:appearance-none 
                            [&::-webkit-outer-spin-button]:appearance-none" ${inputClass} rounded-r-none border-r-0`}
                      placeholder="e.g. 18"
                      required
                    />
                    <span className="w-fit bg-gray-100 px-2 py-1.5 text-xs border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-transparent focus:outline-none">
                      %
                    </span>
                    <input
                      type="text"
                      value={(
                        (parseFloat(item.tax) || 0) *
                        ((parseFloat(item.gstRate) || 0) / 100)
                      ).toFixed(2)}
                      required
                      readOnly
                      className={`w-1/3 bg-gray-100 cursor-not-allowed ${inputClass} rounded-l-none border-l-0`}
                    />
                  </div>
                </div>
                {/* 11. Final Amount */}
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
                {/* 12. Any Remarks */}
                <div className="col-span-full md:col-span-5 lg:col-span-3 ">
                  <label
                    htmlFor={`itemRemarks-${index}`}
                    className={labelClass}
                  >
                    Any Remarks
                  </label>
                  <textarea
                    id={`itemRemarks-${index}`}
                    name="remarks"
                    value={item.remarks}
                    onChange={(e) => handleItemChange(index, e)}
                    className={`w-full border border-gray-300 align-middle text-sm  h-[30px] resize-y px-2 py-1 ${inputClass}`}
                    placeholder="Type Here..."
                  ></textarea>
                </div>
                {/* 13. Add/Remove Buttons */}
                <div className="flex items-end justify-end gap-2 col-span-full md:col-span-1 lg:col-span-1 min-w-[70px]">
                  {items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(index)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3.5 py-0.5   transition-colors  flex items-center justify-center text-base font-bold cursor-pointer"
                      aria-label="Remove Item"
                    >
                      -
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleAddItem}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-0.5  transition-colors  flex items-center justify-center text-base font-bold cursor-pointer"
                    aria-label="Add Item"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Action Buttons */}
          <div className="mt-3 flex space-x-4">
            <button
              type="submit"
              className="px-4 py-1.5 text-xs bg-[#337ab7] hover:bg-[#286090] text-white transition-colors disabled:bg-gray-400 cursor-pointer"
              disabled={loading} // 🟢 Disable button while loading
            >
              {loading ? "ADDING..." : "ADD ESTIMATE"}{" "}
              {/* 🟢 Loading state feedback */}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-1.5 text-xs bg-gray-300 text-gray-800   hover:bg-gray-400 transition-colors cursor-pointer"
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
