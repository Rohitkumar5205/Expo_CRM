import React, { useState, useEffect } from "react";
import { showError, showSuccess } from "../../utils/toastMessage";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchEstimates,
  fetchEstimateById,
} from "../../features/estimates/estimateSlice";
import {
  createInvoice,
  fetchInvoices,
} from "../../features/invoice/invoiceSlice";
import { fetchCompanies } from "../../features/company/companySlice";
import { fetchEvents } from "../../features/crmEvent/crmEventSlice";
import { fetchCountries } from "../../features/add_by_admin/country/countrySlice";
import { fetchStates } from "../../features/state/stateSlice";
import { fetchCities } from "../../features/city/citySlice";

const CreateInvoice = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: companyIdFromParams } = useParams();
  const { id } = useParams();

  // Redux state for estimates, companies, events, states, and cities
  const { estimates, selectedEstimate } = useSelector(
    (state) => state.estimates,
  );
  const { companies } = useSelector((state) => state.companies);
  const { events } = useSelector((state) => state.crmEvents);
  const { countries } = useSelector((state) => state.countries);
  const { states } = useSelector((state) => state.states);
  const { cities } = useSelector((state) => state.cities);
  const { invoices } = useSelector((state) => state.invoice);
  console.log("companies...", companies);

  const initialFormData = {
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
  };

  const [formData, setFormData] = useState(initialFormData);
  const [companyIdForSubmission, setCompanyIdForSubmission] = useState("");

  useEffect(() => {
    if (id) {
      if (id && (!selectedEstimate || selectedEstimate._id !== id)) {
        dispatch(fetchEstimateById(id));
      }
    }
    dispatch(fetchCompanies());
    dispatch(fetchEvents());

    dispatch(fetchStates());
    dispatch(fetchCities());
    dispatch(fetchCountries());
    dispatch(fetchInvoices());
  }, [dispatch, id]);

  // Pre-fill form from Estimate data & STORE companyId
  useEffect(() => {
    // 🛑 IMPORTANT: Wait until ALL required data is loaded to prevent race conditions.
    // This effect will re-run as each piece of data arrives from Redux.
    // It will only proceed when the selectedEstimate matches the URL ID and all
    // location data is available.
    if (
      !id ||
      !selectedEstimate ||
      selectedEstimate._id !== id ||
      !countries.length ||
      !states.length ||
      !cities.length
    ) {
      return;
    }

    const matchedEstimate = selectedEstimate;

    if (matchedEstimate) {
      const estCompanyId = matchedEstimate.companyId;
      setCompanyIdForSubmission(estCompanyId);

      setFormData((prev) => ({
        ...prev,
        estimate_no: matchedEstimate.est_no || "",
        type_of_invoice: matchedEstimate.est_type || "",
        gst_no: matchedEstimate.gst_no || "",

        supply_date: matchedEstimate.supply_date
          ? matchedEstimate.supply_date.split("T")[0]
          : "",

        consignee_name: matchedEstimate.consignee_name || "",
        consignee_addr: matchedEstimate.consignee_addr || "",

        // ✅ FIX (code OR name दोनों handle करेगा)
        country:
          countries.find(
            (c) =>
              c.countryCode == matchedEstimate.country ||
              c.name == matchedEstimate.country,
          )?.name ||
          matchedEstimate.country ||
          "",

        state:
          states.find(
            (s) =>
              s.stateCode == matchedEstimate.state ||
              s.name == matchedEstimate.state,
          )?.name ||
          matchedEstimate.state ||
          "",

        city:
          cities.find(
            (c) =>
              c.cityCode == matchedEstimate.city ||
              c.name == matchedEstimate.city,
          )?.name ||
          matchedEstimate.city ||
          "",

        pincode: String(matchedEstimate.pincode || ""),
      }));
    }
  }, [id, estimates, selectedEstimate, countries, states, cities]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "country" && { state: "", city: "" }),
      ...(name === "state" && { city: "" }),
    }));
  };

  // 3. Define required fields using Mongoose schema keys (remains the same)
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

  const handleCreateInvoice = (e) => {
    if (e) e.preventDefault();
    const missingFields = requiredFields.filter((key) => !formData[key]);

    if (missingFields.length > 0) {
      showError("Please fill in all required fields (marked with *).");
      console.error("Missing required fields:", missingFields);
      return;
    }

    const userName = sessionStorage.getItem("user_name") || " ";

    const invoicePayload = {
      ...formData,
      companyId: companyIdForSubmission,
      added_by: userName,
    };

    // Submit the form data to the server
    dispatch(createInvoice(invoicePayload));
    showSuccess("Invoice created successfully!");
    // Clear form data
    setFormData({
      type_of_invoice: "",
      consignee_name: "",
      state: "",
      city: "",
    });
    console.log("Invoice Data submitted:", invoicePayload);
    navigate(-1);
  };

  // Styles remain defined here for reusability
  const InputStyle =
    "w-full px-2 py-1 text-sm border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-transparent focus:outline-none";

  // heading logic
  const location = useLocation();
  const { Id, heading } = location.state || {};

  const pageHeading = heading || (Id ? "Update Invoice" : "Create Invoice");
  const buttonName = heading || (Id ? "Update Invoice" : "Create Invoice");

  // Find selected objects to get codes for filtering
  const selectedCountryObj = countries?.find((c) => c.name === formData.country);
  const filteredStates = states?.filter(
    (st) => st.countryCode == selectedCountryObj?.countryCode,
  );

  const selectedStateObj = states?.find((s) => s.name === formData.state);
  const cityOptions = cities?.filter((ct) => ct.stateCode == selectedStateObj?.stateCode);

  return (
    <>
      {/* Header (unchanged) */}
      <div className="flex justify-between w-full h-auto bg-white items-center px-4 py-1 mb-1">
        <h1 className="font-normal text-xl text-gray-500">
          ACCOUNT SECTION | INVOICE
        </h1>
        <div className="flex gap-2">
          <button
            onClick={() => navigate("/ihweClientData2026/addNewClients")}
            className="hover:bg-gray-200 border border-gray-600  text-gray-600 px-1 py-0.5  text-sm font-normal cursor-pointer"
          >
            Add Client
          </button>
          <button
            onClick={() => navigate("/ihweClientData2026/masterData")}
            className="hover:bg-gray-200 border border-gray-600  text-gray-600 px-1 py-0.5  text-sm font-normal cursor-pointer"
          >
            Master List
          </button>
        </div>
      </div>

      <div className="min-h-screen bg-[#eef1f5] p-4">
        {/* Create Invoice Section */}
        <form
          className="w-full bg-white px-4 pb-7 pt-1 shadow-md"
          onSubmit={handleCreateInvoice}
        >
          <h1 className="font-normal text-lg text-gray-500 mb-0.5">
            {pageHeading}
          </h1>
          <hr className="w-full mb-2 opacity-10" />

          {/* Form Fields - Mongoose keys used for name/value */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-sm">
            {/* Estimate No. (Read-only) */}
            <div className="flex flex-col col-span-1">
              <label className="text-sm font-normal text-gray-700 mb-1 block">
                Estimate No. <span className="text-red-500">*</span>
              </label>
              <input
                className={InputStyle}
                type="text"
                readOnly
                name="estimate_no"
                value={formData?.estimate_no}
                onChange={handleChange}
              />
            </div>

            {/* Type of Invoice */}
            <div className="flex flex-col col-span-1">
              <label className="text-sm font-normal text-gray-700 mb-1 block">
                Type of Invoice <span className="text-red-500">*</span>
              </label>
              <select
                className={InputStyle}
                name="type_of_invoice"
                value={formData?.type_of_invoice}
                onChange={handleChange}
                required
              >
                <option value="">Select Invoice</option>
                <option value="Foreign Sale">Foreign Sale</option>
                <option value="Intrastate">Intrastate</option>
                <option value="Interstate Sale">Interstate Sale</option>
              </select>
            </div>

            {/* GSTIN No./PAN No. (Read-only since it should come from estimate/company) */}
            <div className="flex flex-col col-span-1">
              <label className="text-sm font-normal text-gray-700 mb-1 block">
                GSTIN No./PAN No. <span className="text-red-500">*</span>
              </label>
              <input
                className={InputStyle} // Changed to ReadOnlyStyle
                type="text"
                name="gst_no"
                value={formData?.gst_no}
                onChange={handleChange}
                readOnly
                required
              />
            </div>

            {/* Supply Date */}
            <div className="flex flex-col col-span-1">
              <label className="text-sm font-normal text-gray-700 mb-1 block">
                Supply Date <span className="text-red-500">*</span>
              </label>
              <input
                className={InputStyle}
                type="date"
                name="supply_date"
                value={formData.supply_date}
                onChange={handleChange}
                required
              />
            </div>

            {/* Consignee Name */}
            <div className="flex flex-col col-span-1">
              <label className="text-sm font-normal text-gray-700 mb-1 block">
                Consignee Name <span className="text-red-500">*</span>
              </label>
              <select
                className={InputStyle}
                name="consignee_name"
                value={formData?.consignee_name}
                onChange={handleChange}
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

            {/* Address */}
            <div className="flex flex-col lg:col-span-2">
              <label className="text-sm font-normal text-gray-700 mb-1 block">
                Address <span className="text-red-500">*</span>
              </label>
              <input
                className={InputStyle}
                type="text"
                name="consignee_addr"
                value={formData.consignee_addr}
                onChange={handleChange}
                required
              />
            </div>

            {/* Country (Read-only) */}
            <div className="flex flex-col col-span-1">
              <label className="text-sm font-normal text-gray-700 mb-1 block">
                Country <span className="text-red-500">*</span>
              </label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className={InputStyle}
                required
              >
                <option value="">Select Country</option>
                {countries?.map((country) => (
                  <option key={country.countryCode} value={country.name}>
                    {country?.name}
                  </option>
                ))}
              </select>
            </div>

            {/* State (Editable Dropdown, uses Redux state) */}
            <div className="flex flex-col col-span-1">
              <label className="text-sm font-normal text-gray-700 mb-1 block">
                State <span className="text-red-500">*</span>
              </label>
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                className={InputStyle}
                disabled={!formData.country}
                required
              >
                <option value="">Select State</option>
                {filteredStates?.map((stateObj) => (
                  <option key={stateObj.stateCode} value={stateObj.name}>
                    {stateObj.name}
                  </option>
                ))}
              </select>
            </div>

            {/* City (Editable Dropdown, uses Redux state) */}
            <div className="flex flex-col col-span-1">
              <label className="text-sm font-normal text-gray-700 mb-1 block">
                City <span className="text-red-500">*</span>
              </label>
              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                className={InputStyle}
                disabled={!formData.state}
                required
              >
                <option value="">Select City</option>
                {cityOptions?.map((cityObj) => (
                  <option key={cityObj.cityCode} value={cityObj.name}>
                    {cityObj.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pb-3 pt-4 text-sm">
            {/* Pin Code */}
            <div className="flex flex-col col-span-1">
              <label className="text-sm font-normal text-gray-700 mb-1 block">
                Pin Code <span className="text-red-500">*</span>
              </label>
              <input
                className={InputStyle}
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                required
              />
            </div>

            {/* State Code */}
            <div className="flex flex-col col-span-1">
              <label className="text-sm font-normal text-gray-700 mb-1 block">
                State Code
              </label>
              <input
                className={InputStyle}
                type="text"
                name="stateCode"
                value={formData.stateCode}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Action Buttons (unchanged) */}
          <div className="flex gap-2 mt-1 pt-3 border-t border-gray-200">
            <button
              type="submit"
              className="px-4 py-1.5 text-sm bg-[#337ab7] hover:bg-[#286090] text-white cursor-pointer "
            >
              {buttonName}
            </button>
            <button
              type="button"
              className="bg-gray-300 text-gray-800  px-4 py-1.5 text-sm hover:bg-gray-400 cursor-pointer"
            >
              CANCEL
            </button>
          </div>
        </form>
        {/* Invoice List Section (unchanged) */}
        <div className="w-full bg-white p-4  shadow-md mt-6 pb-8">
          <h1 className="font-normal text-xl text-[#333] mb-3">Invoice List</h1>
          {/* Table Structure */}
          <div className="overflow-x-auto">
            <table className="min-w-full border">
              <thead>
                <tr>
                  {[
                    "S.No.",
                    "Invoice No.",
                    "Performa no",
                    "Date",
                    "Created By",
                    "Action",
                  ].map((header) => (
                    <th
                      key={header}
                      className="px-6 py-2 border border-gray-300  text-sm text-center text-black font-medium uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="border border-gray-300 bg-gray-50">
                {invoices.map((invoice, index) => (
                  <tr key={invoice._id}>
                    <td className="px-6 py-2  border border-gray-300 text-center text-sm">
                      {index + 1}
                    </td>
                    <td className="px-6 py-2  border border-gray-300 text-center text-sm">
                      <button
                        onClick={() =>
                          navigate(
                            `/payments/ODT/taxInvoiceDetails/${invoice._id}`,
                          )
                        }
                        className="px-2  text-blue-500 hover:text-gray-800 text-center cursor-pointer"
                      >
                        {invoice?.invoice_no}
                      </button>
                    </td>
                    <td className="px-6 py-2  border border-gray-300 text-center text-sm">
                      {invoice?.estimate_no}
                    </td>
                    <td className="px-6 py-2  border border-gray-300 text-center text-sm">
                      {invoice?.supply_date}
                    </td>
                    <td className="px-6 py-2  border border-gray-300 text-center text-sm">
                      {invoice?.added_by || invoice?.addedBy}
                    </td>
                    <td className="px-6 py-2  border border-gray-300 text-center text-sm">
                      <button
                        onClick={() =>
                          navigate(
                            `/ihweClientData2026/creditNote/${companyIdForSubmission}`,
                          )
                        }
                        className="px-2  border border-blue-500 text-blue-500 hover:bg-gray-100 text-center cursor-pointer"
                      >
                        Credit Note
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateInvoice;
