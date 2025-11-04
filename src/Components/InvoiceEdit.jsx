import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchEstimates } from "../features/estimates/estimateSlice";
import { fetchStates } from "../features/state/stateSlice";
import { fetchEvents } from "../features/crmEvent/crmEventSlice";
import { fetchCities } from "../features/city/citySlice";
import { fetchCountries } from "../features/add_by_admin/country/countrySlice";
import { fetchInvoices, createInvoice } from "../features/invoice/invoiceSlice";
import { fetchCompanies } from "../features/company/companySlice";
import { showError, showSuccess } from "../utils/toastMessage";

const InvoiceEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  // Redux state (safe fallback)
  const estimates = useSelector((state) => state.estimates?.estimates || []);
  const companies = useSelector((state) => state.companies?.companies || []);
  const events = useSelector((state) => state.crmEvents?.events || []);
  const countries = useSelector((state) => state.countries?.countries || []);
  const states = useSelector((state) => state.states?.states || []);
  const cities = useSelector((state) => state.cities?.cities || []);

  const [formData, setFormData] = useState({
    estimate_no: "",
    type_of_invoice: "",
    gst_no: "",
    supply_date: "",
    consignee_name: "",
    consignee_addr: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
    stateCode: "",
  });

  const [foundEventName, setFoundEventName] = useState("");
  const [companyIdForSubmission, setCompanyIdForSubmission] = useState("");

  // Fetch basic data
  useEffect(() => {
    dispatch(fetchEstimates());
    dispatch(fetchCompanies());
    dispatch(fetchEvents());
    dispatch(fetchCountries());
    dispatch(fetchInvoices());
  }, [dispatch]);

  // When country changes, fetch states dynamically
  useEffect(() => {
    if (formData.country) {
      dispatch(fetchStates({ country: formData.country }));
    }
  }, [formData.country, dispatch]);

  // When state changes, fetch cities dynamically
  useEffect(() => {
    if (formData.state) {
      dispatch(fetchCities({ state: formData.state }));
    }
  }, [formData.state, dispatch]);

  // Find company name
  useEffect(() => {
    if (companies.length > 0 && id) {
      const matchedCompany = companies.find((c) => c._id === id);
      if (matchedCompany) {
        setFoundEventName(matchedCompany.eventName || "");
      } else {
        setFoundEventName("");
      }
    }
  }, [companies, id]);

  // Pre-fill form from Estimate
  useEffect(() => {
    if (estimates.length > 0 && id) {
      let matchedEstimate = estimates.find((c) => c._id === id);
      if (!matchedEstimate) {
        matchedEstimate = estimates.find((c) => c.companyId === id);
      }

      if (matchedEstimate) {
        const estCompanyId = matchedEstimate.companyId;
        setCompanyIdForSubmission(estCompanyId);

        setFormData((prev) => ({
          ...prev,
          estimate_no: matchedEstimate.est_no || "",
          gst_no: matchedEstimate.gst_no || "",
          supply_date: matchedEstimate.supply_date || "",
          consignee_name: matchedEstimate.consignee_name || prev.consignee_name,
          consignee_addr: matchedEstimate.consignee_addr || prev.consignee_addr,
          country: matchedEstimate.country || prev.country,
          state: matchedEstimate.state || prev.state,
          city: matchedEstimate.city || prev.city,
          pincode: String(matchedEstimate.pincode || prev.pincode),
        }));
      }
    }
  }, [estimates, id]);

  // Override Address from Event
  useEffect(() => {
    if (events.length > 0 && foundEventName) {
      const matchedEvent = events.find(
        (e) => e.event_name === foundEventName
      );
      if (matchedEvent) {
        setFormData((prev) => ({
          ...prev,
          consignee_name: matchedEvent.event_fullName || prev.consignee_name,
          consignee_addr: matchedEvent.event_address || prev.consignee_addr,
          country: matchedEvent.event_country || prev.country,
          pincode: matchedEvent.event_pincode || prev.pincode,
        }));
      }
    }
  }, [events, foundEventName]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newState = { [name]: value };

    if (name === "country") {
      newState = { ...newState, state: "", city: "" };
    }
    if (name === "state") {
      newState = { ...newState, city: "" };
    }

    setFormData((prev) => ({ ...prev, ...newState }));
  };

  const requiredFields = [
    "type_of_invoice",
    "gst_no",
    "supply_date",
    "consignee_name",
    "consignee_addr",
    "country",
    "state",
    "city",
    "pincode",
  ];

  const handleUpdateInvoice = (e) => {
    if (e) e.preventDefault();
    const missingFields = requiredFields.filter((key) => !formData[key]);

    if (missingFields.length > 0) {
      showError("Please fill in all required fields (marked with *).");
      return;
    }

    const userName = localStorage.getItem("user_name") || "unknown_user";

    const invoicePayload = {
      ...formData,
      companyId: id,
      added_by: userName,
    };

    dispatch(createInvoice(invoicePayload));
    showSuccess("Invoice created successfully!");
    setFormData({
      estimate_no: "",
      type_of_invoice: "",
      gst_no: "",
      supply_date: "",
      consignee_name: "",
      consignee_addr: "",
      country: "",
      state: "",
      city: "",
      pincode: "",
      stateCode: "",
    });
    navigate(-1);
  };

  const styling =
    "w-full px-2 py-1.5 text-xs border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-transparent focus:outline-none";

  const stateOptions = states?.data || states || [];
  const cityOptions = cities?.data || cities || [];

  return (
    <>
      <div className="flex justify-between w-full h-auto bg-white items-center px-4 py-1 mb-1">
        <h1 className="font-normal text-xl text-gray-500">
          ACCOUNT SECTION | INVOICE
        </h1>
        <div className="flex gap-2">
          <button onClick={()=>navigate("/ihweClientData2026/addNewClients")} className="hover:bg-gray-200 border border-gray-600 text-gray-600 px-1 py-0.5 text-xs font-normal cursor-pointer">
            Add Client
          </button>
          <button onClick={()=>navigate("/ihweClientData2026/masterData")} className="hover:bg-gray-200 border border-gray-600 text-gray-600 px-1 py-0.5 text-xs font-normal cursor-pointer">
            Master List
          </button>
        </div>
      </div>

      <div className="min-h-screen bg-[#eef1f5] p-4">
        <form
          onSubmit={handleUpdateInvoice}
          className="w-full bg-white px-4 pb-7 pt-1"
        >
          <h1 className="font-normal text-lg text-gray-500 mb-0.5">
            Update Invoice
          </h1>
          <hr className="w-full mb-2 opacity-10" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
            {/* Estimate No */}
            <div className="flex flex-col col-span-1">
              <label className="text-xs font-medium text-gray-900 mb-1 block">
                Estimate No. <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="estimate_no"
                value={formData.estimate_no}
                onChange={handleChange}
                className={styling}
              />
            </div>

            {/* Type of Invoice */}
            <div className="flex flex-col col-span-1">
              <label className="text-xs font-medium text-gray-900 mb-1 block">
                Type of Invoice <span className="text-red-500">*</span>
              </label>
              <select
                className={styling}
                name="type_of_invoice"
                value={formData.type_of_invoice}
                onChange={handleChange}
                required
              >
                <option value="">Select Invoice</option>
                <option value="Foreign Sale">Foreign Sale</option>
                <option value="Intrastate">Intrastate</option>
                <option value="Interstate Sale">Interstate Sale</option>
              </select>
            </div>

            {/* GST */}
            <div className="flex flex-col col-span-1">
              <label className="text-xs font-medium text-gray-900 mb-1 block">
                GSTIN No./PAN No. <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="gst_no"
                value={formData.gst_no}
                onChange={handleChange}
                className={styling}
              />
            </div>

            {/* Supply Date */}
            <div className="flex flex-col col-span-1">
              <label className="text-xs font-medium text-gray-900 mb-1 block">
                Supply Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="supply_date"
                value={formData.supply_date}
                onChange={handleChange}
                className={styling}
              />
            </div>

            {/* Consignee Name */}
            <div className="flex flex-col col-span-1">
              <label className="text-xs font-medium text-gray-900 mb-1 block">
                Consignee Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="consignee_name"
                value={formData.consignee_name}
                onChange={handleChange}
                className={styling}
              />
            </div>

            {/* Address */}
            <div className="flex flex-col col-span-2">
              <label className="text-xs font-medium text-gray-900 mb-1 block">
                Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="consignee_addr"
                value={formData.consignee_addr}
                onChange={handleChange}
                className={styling}
              />
            </div>

            {/* Country */}
            <div className="flex flex-col col-span-1">
              <label className="text-xs font-medium text-gray-900 mb-1 block">
                Country <span className="text-red-500">*</span>
              </label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className={styling}
                required
              >
                <option value="">Select Country</option>
                {(countries || []).map((country, i) => (
                  <option key={country._id || i} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            {/* State */}
            <div className="flex flex-col col-span-1">
              <label className="text-xs font-medium text-gray-900 mb-1 block">
                State <span className="text-red-500">*</span>
              </label>
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                className={styling}
                required
              >
                <option value="">Select State</option>
                {(stateOptions || []).map((stateObj) => (
                  <option key={stateObj._id} value={stateObj.name}>
                    {stateObj.name}
                  </option>
                ))}
              </select>
            </div>

            {/* City */}
            <div className="flex flex-col col-span-1">
              <label className="text-xs font-medium text-gray-900 mb-1 block">
                City <span className="text-red-500">*</span>
              </label>
              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                className={styling}
                required
                disabled={!formData.state}
              >
                <option value="">Select City</option>
                {(cityOptions || []).map((cityObj) => (
                  <option key={cityObj._id} value={cityObj.name}>
                    {cityObj.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Pincode */}
            <div className="flex flex-col col-span-1">
              <label className="text-xs font-medium text-gray-900 mb-1 block">
                Pin Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={(e)=>{
                    const value = e.target.value;
                // Allow only digits and up to 6 characters
                if (/^\d{0,6}$/.test(value)) {
                  handleChange(e); // ✅ call your existing handler safely
                }
              }}
                className={styling}
              />
            </div>

            {/* State Code */}
            <div className="flex flex-col col-span-1">
              <label className="text-xs font-medium text-gray-900 mb-1 block">
                State Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="stateCode"
                value={formData.stateCode}
                onChange={handleChange}
                className={styling}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-2 mt-3 pt-3 border-t border-gray-200">
            <button
              type="submit"
              className="px-4 py-1.5 text-xs bg-[#337ab7] hover:bg-[#286090] text-white cursor-pointer"
            >
              Update Invoice
            </button>
            <button
              type="button"
              className="bg-gray-300 text-gray-800 px-4 py-1.5 text-xs hover:bg-gray-400 cursor-pointer"
              onClick={() => navigate(-1)}
            >
              CANCEL
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default InvoiceEdit;
