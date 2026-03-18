import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchEstimates } from "../features/estimates/estimateSlice";
import { fetchStates } from "../features/state/stateSlice";
import { fetchEvents } from "../features/crmEvent/crmEventSlice";
import { fetchCities } from "../features/city/citySlice";
import { fetchCountries } from "../features/add_by_admin/country/countrySlice";
import {
  fetchInvoices,
  updateInvoice,
  clearInvoiceState,
} from "../features/invoice/invoiceSlice";
import { fetchCompanies } from "../features/company/companySlice";
import { showError, showSuccess } from "../utils/toastMessage";

const InvoiceEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  // Redux state (safe fallback)
  const { invoices, loading, error, success } = useSelector(
    (state) => state.invoice,
  );
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

  const [companyIdForSubmission, setCompanyIdForSubmission] = useState("");
  const [currentInvoice, setCurrentInvoice] = useState(null);

  // --- 1. Fetch Initial Data (Estimates, Invoices, Companies, Locations) ---
  useEffect(() => {
    dispatch(fetchCompanies());
    dispatch(fetchEvents());
    dispatch(fetchCountries());
    dispatch(fetchInvoices());
  }, [dispatch]);

  // --- 2. Pre-fill Form Data from Matched Invoice ---
  useEffect(() => {
    // Wait for all required data to prevent race conditions.
    if (
      !id ||
      loading ||
      !invoices.length ||
      !countries.length ||
      !states.length ||
      !cities.length
    ) {
      return;
    }
    const matchedInvoice = invoices.find((inv) => inv._id === id);

    if (matchedInvoice) {
      setCurrentInvoice(matchedInvoice);
      if (matchedInvoice.companyId)
        dispatch(fetchEstimates(matchedInvoice.companyId));
      setCompanyIdForSubmission(matchedInvoice.companyId);

      setFormData({
        estimate_no: matchedInvoice.estimate_no || "",
        type_of_invoice: matchedInvoice.type_of_invoice || "",
        gst_no: matchedInvoice.gst_no || "",
        supply_date: matchedInvoice.supply_date || "",
        consignee_name: matchedInvoice.consignee_name || "",
        consignee_addr: matchedInvoice.consignee_addr || "",
        country:
          countries?.find((c) => c.countryCode == matchedInvoice.country)
            ?.name ||
          matchedInvoice.country ||
          "",
        state:
          states?.find((s) => s.stateCode == matchedInvoice.state)?.name ||
          matchedInvoice.state ||
          "",
        city:
          cities?.find((c) => c.cityCode == matchedInvoice.city)?.name ||
          matchedInvoice.city ||
          "",
        pincode: String(matchedInvoice.pincode || ""),
        stateCode: matchedInvoice.stateCode || "",
      });

      // Fetch location data needed for dropdowns on load
    } else if (!loading) {
      showError(`Invoice with ID ${id} not found.`);
    }
  }, [invoices, id, dispatch, countries, states, cities, loading]);

  // --- 3. Dynamic Location Fetching (when country/state changes manually) ---
  useEffect(() => {
    // Logic handled by Redux slice fetchStates() in initial load or master data
    // Assuming fetchStates() fetches all. If it fetches by ID, we need logic here.
    // Based on previous files, fetchStates() seems to fetch all.
    // If your backend requires countryCode to fetch states, use selectedCountryObj.countryCode
  }, [formData.country]);

  useEffect(() => {
    if (success) {
      showSuccess("Invoice updated successfully!");
      dispatch(clearInvoiceState());
      navigate(-1);
    }
    if (error) {
      showError(`Error updating invoice: ${error.message || error}`);
      dispatch(clearInvoiceState()); // ✅ Error के बाद state क्लियर करें
    }
  }, [success, error, dispatch, navigate]);

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
    "estimate_no",
    "type_of_invoice",
    "gst_no",
    "supply_date",
    "consignee_name",
    "consignee_addr",
    "country",
    "state",
    "city",
    "pincode",
    "stateCode",
  ];

  // --- 5. Correct Update Submission ---
  const handleUpdateInvoice = (e) => {
    if (e) e.preventDefault();
    const missingFields = requiredFields.filter((key) => !formData[key]);

    if (missingFields.length > 0) {
      showError("Please fill in all required fields (marked with *).");
      return;
    }

    if (!currentInvoice) {
      showError("Original invoice data is missing. Cannot update.");
      return;
    }

    const userName = sessionStorage.getItem("user_name") || "unknown_user";
    const invoicePayload = {
      ...currentInvoice,
      ...formData,
      companyId: currentInvoice.companyId,
      updated_by: userName,
    };

    // Dispatch the update action with the ID and the payload
    dispatch(
      updateInvoice({
        id: currentInvoice._id,
        data: invoicePayload,
      }),
    );
  };

  const styling =
    "w-full px-2 py-1.5 text-xs border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-transparent focus:outline-none";

  // Filter Logic
  const selectedCountryObj = (countries || []).find(
    (c) => c.name === formData.country,
  );
  const stateOptions = (states?.data || states || []).filter(
    (st) => st.countryCode == selectedCountryObj?.countryCode,
  );

  const selectedStateObj = (states?.data || states || []).find(
    (s) => s.name === formData.state,
  );
  const cityOptions = (cities?.data || cities || []).filter(
    (ct) => ct.stateCode == selectedStateObj?.stateCode,
  );

  // Disable form while loading
  const isFormDisabled = loading || !currentInvoice;

  return (
    <>
      <div className="flex justify-between w-full h-auto bg-white items-center px-4 py-1 mb-1">
        <h1 className="font-normal text-xl text-gray-500">
          ACCOUNT SECTION | INVOICE
        </h1>
        <div className="flex gap-2">
          <button
            onClick={() => navigate("/ihweClientData2026/addNewClients")}
            className="hover:bg-gray-200 border border-gray-600 text-gray-600 px-1 py-0.5 text-xs font-normal cursor-pointer"
          >
            Add Client
          </button>
          <button
            onClick={() => navigate("/ihweClientData2026/masterData")}
            className="hover:bg-gray-200 border border-gray-600 text-gray-600 px-1 py-0.5 text-xs font-normal cursor-pointer"
          >
            Master List
          </button>
        </div>
      </div>

      <div className="min-h-screen bg-[#eef1f5] p-4">
        <form
          onSubmit={handleUpdateInvoice}
          className={`w-full bg-white px-4 pb-7 pt-1 ${
            isFormDisabled ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          <h1 className="font-normal text-lg text-gray-500 mb-0.5">
            {loading && !currentInvoice
              ? "Loading Invoice..."
              : "Update Invoice"}
          </h1>
          <hr className="w-full mb-2 opacity-10" />

          {/* Display loading state or error if the invoice is not found */}
          {!currentInvoice && !loading && id ? (
            <div className="text-red-500 text-sm py-4">
              Error: Could not find invoice with ID: {id}.
            </div>
          ) : (
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
                  disabled={isFormDisabled}
                  required
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
                  disabled={isFormDisabled}
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
                  disabled={isFormDisabled}
                  required
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
                  disabled={isFormDisabled}
                  required
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
                  disabled={isFormDisabled}
                  required
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
                  disabled={isFormDisabled}
                  required
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
                  disabled={isFormDisabled}
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
                  disabled={isFormDisabled}
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
                  disabled={!formData.state || isFormDisabled}
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
                  onChange={(e) => {
                    const value = e.target.value;
                    // Allow only digits and up to 6 characters
                    if (/^\d{0,6}$/.test(value)) {
                      handleChange(e); // ✅ call your existing handler safely
                    }
                  }}
                  className={styling}
                  disabled={isFormDisabled}
                  required
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
                  disabled={isFormDisabled}
                  required
                />
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-2 mt-3 pt-3 border-t border-gray-200">
            <button
              type="submit"
              className="px-4 py-1.5 text-xs bg-[#337ab7] hover:bg-[#286090] text-white cursor-pointer disabled:bg-gray-400"
              disabled={isFormDisabled}
            >
              {loading ? "UPDATING..." : "UPDATE INVOICE"}
            </button>
            <button
              type="button"
              className="bg-gray-300 text-gray-800 px-4 py-1.5 text-xs hover:bg-gray-400 cursor-pointer"
              onClick={() => navigate(-1)}
              disabled={loading}
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
