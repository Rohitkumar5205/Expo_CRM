import React, { useState, useEffect } from "react";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { useLocation } from "react-router-dom";
import { showSuccess } from "../../utils/toastMessage";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../../features/auth/userSlice";
import { fetchCategories } from "../../features/add_by_admin/category/categorySlice";
import { fetchNatures } from "../../features/add_by_admin/nature/natureSlice";
import { fetchCountries } from "../../features/add_by_admin/country/countrySlice";
import { fetchStates } from "../../features/state/stateSlice";
import { fetchCities } from "../../features/city/citySlice";
import { fetchDataSources } from "../../features/add_by_admin/dataSource/dataSourceSlice";
import { fetchEvents } from "../../features/crmEvent/crmEventSlice";
import { addCompany } from "../../features/company/companySlice";
import { useNavigate } from "react-router-dom";
const AddNewClients = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate(); // users redux
  const { users, loading, error } = useSelector((state) => state.users);
  // categories redux
  const { categories } = useSelector((state) => state.categories);
  // natures redux
  const { natures } = useSelector((state) => state.natures);
  //  countries redux
  const { countries } = useSelector((state) => state.countries);
  // states redux
  const { states } = useSelector((state) => state.states);
  // cities redux
  const { cities } = useSelector((state) => state.cities);
  // dataSources redux
  const { dataSources } = useSelector((state) => state.dataSources);
  // events redux
  const { events } = useSelector((state) => state.events);

  //   console.log("users data", users);
  //   console.log("categories data", categories);
  //   console.log("natures data", natures);
  //   console.log("countries data", countries);
  //   console.log("states data", states);
  // console.log("cities data", cities);
  //   console.log("dataSources data", dataSources);
  // console.log("events data", events);

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchCategories());
    dispatch(fetchNatures());
    dispatch(fetchCountries());
    dispatch(fetchStates());
    dispatch(fetchCities());
    dispatch(fetchDataSources());
    dispatch(fetchEvents());
  }, [dispatch]);

  const heading = location.state?.heading || "Add New Company";

  const Options = ["Select Here", "Acupressure/Acupuncture"];
  const Options1 = ["Select Here", "Agency"];

  const countryStateCityData = {
    India: {
      UttarPradesh: ["Agra", "Aligarh", "Amethi", "Amroha"],
    },
  };

  // 🧩 Form State
  const [formData, setFormData] = useState({
    companyName: "",
    category: "",
    businessNature: "",
    address: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
    website: "",
    landline: "",
    email: "",
    dataSource: "",
    eventName: "",
    reminder: "",
    forwardTo: "",
    contacts: [
      {
        title: "",
        firstName: "",
        surname: "",
        designation: "",
        email: "",
        mobile: "",
        alternate: "",
      },
    ],
  });

  // 🧠 Update any input value dynamically
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // 🧩 Contact field change
  const handleContactChange = (index, field, value) => {
    const updatedContacts = [...formData.contacts];
    updatedContacts[index][field] = value;
    setFormData((prev) => ({ ...prev, contacts: updatedContacts }));
  };

  // ➕ Add new contact
  const addContact = () => {
    setFormData((prev) => ({
      ...prev,
      contacts: [
        ...prev.contacts,
        {
          title: "",
          firstName: "",
          surname: "",
          designation: "",
          email: "",
          mobile: "",
          alternate: "",
        },
      ],
    }));
  };

  // ➖ Remove contact
  const removeContact = (index) => {
    if (formData.contacts.length === 1) return;
    setFormData((prev) => ({
      ...prev,
      contacts: prev.contacts.filter((_, i) => i !== index),
    }));
  };

  // 💾 Save (print data)
  const handleSave = (e) => {
    e.preventDefault();
    dispatch(addCompany(formData));
    console.log("Form Data:", formData);
    showSuccess("Form data saved successfully!.");
    handleReset();
  };

  // 🔁 Reset
  const handleReset = () => {
    setFormData({
      companyName: "",
      category: "",
      businessNature: "",
      address: "",
      country: "",
      state: "",
      city: "",
      pincode: "",
      website: "",
      landline: "",
      email: "",
      dataSource: "",
      eventName: "",
      reminder: "",
      forwardTo: "",
      contacts: [
        {
          title: "",
          firstName: "",
          surname: "",
          designation: "",
          email: "",
          mobile: "",
          alternate: "",
        },
      ],
    });
  };
  const handleMasterList = () => {
    navigate("/ihweClientData2026/masterData");
  };
  const handleConformList = () => {
    navigate("/ihweClientData2026/confirmClientList");
  };
  const handleUploadExhibitor = () => {
    navigate("/ihweClientData2026/uploadExhibitor");
  };
  return (
    <div className="w-full min-h-screen bg-gray-100">
      {/* Heading */}
      <div className="w-full h-fit bg-white shadow-md">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between px-4 py-1.5">
          <h1 className="text-xl text-gray-500 mb-2 lg:mb-0">
            COMPANY DETAILS
          </h1>
          <div className="flex flex-wrap gap-2 cursor-pointer">
            <button
              onClick={handleUploadExhibitor}
              className="px-3 py-1 text-xs bg-[#3598dc] hover:bg-[#286090] text-white transition-colors"
            >
              Upload Exhibitor
            </button>

            <button
              onClick={handleMasterList}
              className="px-3 py-1 text-xs bg-[#3598dc] hover:bg-[#286090] text-white transition-colors"
            >
              Master List
            </button>

            <button
              onClick={handleConformList}
              className="px-3 py-1 text-xs bg-[#3598dc] hover:bg-[#286090] text-white transition-colors"
            >
              Exhibitor List
            </button>
          </div>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSave}
        className="max-w-full bg-white shadow-lg  rounded-lg m-4"
      >
        <div className="p-4">
          <h2 className="text-base font-medium text-gray-700 mb-3 uppercase">
            {heading}
          </h2>
          <hr className="mb-4" />

          {/* --- Company Details --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 mb-4">
            <div>
              <label className="text-xs text-gray-700 mb-1 block">
                Company Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => handleChange("companyName", e.target.value)}
                className="w-full px-2 py-1.5 text-xs border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-transparent focus:outline-none"
                placeholder="Enter company name"
                required
              />
            </div>

            <div>
              <label className="text-xs text-gray-700 mb-1 block">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleChange("category", e.target.value)}
                className="w-full px-2 py-1.5 text-xs border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-transparent focus:outline-none"
                required
              >
                <option value="">Select Category</option>
                {categories.map((categorie, i) => (
                  <option key={i} value={categorie?.cat_name}>
                    {categorie?.cat_name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs text-gray-700 mb-1 block">
                Nature of Business <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.businessNature}
                onChange={(e) => handleChange("businessNature", e.target.value)}
                className="w-full px-2 py-1.5 text-xs border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-transparent focus:outline-none"
                required
              >
                <option value="">Select Nature</option>
                {natures.map((nature, i) => (
                  <option key={i}>{nature?.nature_name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs text-gray-700 mb-1 block">
                Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => handleChange("address", e.target.value)}
                className="w-full px-2 py-1.5 text-xs border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-transparent focus:outline-none"
                placeholder="Enter address"
                required
              />
            </div>

            <div>
              <label className="text-xs text-gray-700 mb-1 block">
                Country <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.country}
                onChange={(e) =>
                  handleChange("country", e.target.value) ||
                  handleChange("state", "") ||
                  handleChange("city", "")
                }
                className="w-full px-2 py-1.5 text-xs border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-transparent focus:outline-none"
                required
              >
                <option value="">Select Country Here</option>
                {countries.map((country, i) => (
                  <option key={i}>{country?.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* --- State / City --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 mb-4">
            <div>
              <label className="text-xs text-gray-700 mb-1 block">
                State <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.state}
                onChange={(e) =>
                  handleChange("state", e.target.value) ||
                  handleChange("city", "")
                }
                disabled={!formData.country}
                className="w-full px-2 py-1.5 text-xs border border-gray-300 disabled:bg-gray-100 focus:ring-1 focus:ring-blue-500 focus:border-transparent focus:outline-none"
                required
              >
                <option value="">Select State Here</option>
                {formData.country &&
                  states.map((state, i) => (
                    <option key={i}>{state?.name}</option>
                  ))}
              </select>
            </div>

            <div>
              <label className="text-xs text-gray-700 mb-1 block">
                City <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.city}
                onChange={(e) => handleChange("city", e.target.value)}
                disabled={!formData.state}
                className="w-full px-2 py-1.5 text-xs border border-gray-300 disabled:bg-gray-100 focus:ring-1 focus:ring-blue-500 focus:border-transparent focus:outline-none"
                required
              >
                <option value="">Select City Here</option>
                {formData.country &&
                  formData.state &&
                  cities?.data?.map((city, i) => (
                    <option key={i}>{city?.name}</option>
                  ))}
              </select>
            </div>

            <div>
              <label className="text-xs text-gray-700 mb-1 block">
                Pin Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={(e) => {
               const value = e.target.value;
                  // Allow only digits and maximum length 6
                  if (!isNaN(value) && value.length <= 6) {
                    setFormData((prev) => ({
                      ...prev,
                      pincode: value,
                    }));
                  }
                }}   
                maxLength={6} // HTML also prevents more than 6 chars
                className="w-full px-2 py-1.5 text-xs border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-transparent focus:outline-none"
                placeholder="Enter pin code"
                required
              />
            </div>

            <div>
              <label className="text-xs text-gray-700 mb-1 block">
                Website <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.website}
                onChange={(e) => handleChange("website", e.target.value)}
                className="w-full px-2 py-1.5 text-xs border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-transparent focus:outline-none"
                placeholder="Enter website URL"
                required
              />
            </div>

            <div>
              <label className="text-xs text-gray-700 mb-1 block">
                LandLine No.
              </label>
              <input
                type="text"
                value={formData.landline}
                onChange={(e) => handleChange("landline", e.target.value)}
                className="w-full px-2 py-1.5 text-xs border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-transparent focus:outline-none"
                placeholder="Enter landline number"
              />
            </div>
          </div>

          {/* --- Additional Fields --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-3 mb-4">
            <div>
              <label className="text-xs text-gray-700 mb-1 block">
                Email Id <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="w-full px-2 py-1.5 text-xs border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-transparent focus:outline-none"
                placeholder="Enter email address"
                required
              />
            </div>
            <div>
              <label className="text-xs text-gray-700 mb-1 block">
                Data Source <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.dataSource}
                onChange={(e) => handleChange("dataSource", e.target.value)}
                className="w-full px-2 py-1.5 text-xs border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-transparent focus:outline-none"
                required
              >
                <option value="">Select Source</option>
                {dataSources.map((dataSource, i) => (
                  <option key={i} value={dataSource?.source_name}>
                    {dataSource?.source_name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs text-gray-700 mb-1 block">
                Event Name <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.eventName}
                onChange={(e) => handleChange("eventName", e.target.value)}
                className="w-full px-2 py-1.5 text-xs border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-transparent focus:outline-none"
                required
              >
                <option value="">Select Event</option>
                {events.map((event, i) => (
                  <option key={i} value={event?.event_name}>
                    {event?.event_name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs text-gray-700 mb-1 block">
                Reminder Date &amp; Time <span className="text-red-500">*</span>
              </label>
              <input
                type="datetime-local"
                value={formData.reminder}
                onChange={(e) => handleChange("reminder", e.target.value)}
                className="w-full px-2 py-1.5 text-xs border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-transparent focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="text-xs text-gray-700 mb-1 block">
                Forward To <span className="text-red-500">*</span>
              </label>

              <select
                value={formData.forwardTo}
                onChange={(e) => handleChange("forwardTo", e.target.value)}
                className="w-full px-2 py-1.5 text-xs border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-transparent focus:outline-none"
                required
              >
                <option value="">Select Here</option>
                {users.map((user, i) => (
                  <option key={i} value={user?.user_fullname}>
                    {user?.user_fullname}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* --- Contact Details --- */}
          <h3 className="text-base font-medium text-gray-700 mb-3 mt-6">
            Contact Details
          </h3>
          <hr className="mb-4" />

          {formData.contacts.map((contact, index) => (
            <div key={index} className=" p-3 bg-gray-50">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3 items-end">
                {/* Title */}
                <div>
                  <label className="text-xs text-gray-700 mb-1 block">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="title"
                    value={contact.title}
                    onChange={(e) =>
                      handleContactChange(index, "title", e.target.value)
                    }
                    required
                    className="w-full px-2 py-1.5 text-xs border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-transparent focus:outline-none"
                  >
                    <option value="">Select Here</option>
                    <option>Mr.</option>
                    <option>Ms.</option>
                    <option>Mrs.</option>
                    <option>Dr.</option>
                  </select>
                </div>

                {/* First Name */}
                <div>
                  <label className="text-xs text-gray-700 mb-1 block">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={contact.firstName}
                    onChange={(e) =>
                      handleContactChange(index, "firstName", e.target.value)
                    }
                    placeholder="Enter First Name"
                    required
                    className="w-full px-2 py-1.5 text-xs border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-transparent focus:outline-none"
                  />
                </div>

                {/* Surname */}
                <div>
                  <label className="text-xs text-gray-700 mb-1 block">
                    Surname <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="surname"
                    value={contact.surname}
                    onChange={(e) =>
                      handleContactChange(index, "surname", e.target.value)
                    }
                    placeholder="Enter Surname"
                    required
                    className="w-full px-2 py-1.5 text-xs border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-transparent focus:outline-none"
                  />
                </div>

                {/* Designation */}
                <div>
                  <label className="text-xs text-gray-700 mb-1 block">
                    Designation <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="designation"
                    value={contact.designation}
                    onChange={(e) =>
                      handleContactChange(index, "designation", e.target.value)
                    }
                    placeholder="Enter Designation"
                    required
                    className="w-full px-2 py-1.5 text-xs border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-transparent focus:outline-none"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="text-xs text-gray-700 mb-1 block">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={contact.email}
                    onChange={(e) =>
                      handleContactChange(index, "email", e.target.value)
                    }
                    placeholder="Enter Email"
                    required
                    className="w-full px-2 py-1.5 text-xs border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-transparent focus:outline-none"
                  />
                </div>

                {/* Mobile */}
                <div>
                  <label className="text-xs text-gray-700 mb-1 block">
                    Mobile <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="mobile"
                    value={contact.mobile}
                    onChange={(e) => {
                      let val = e.target.value.replace(/\D/g, "");
                      if (val.length > 10) val = val.slice(0, 10);
                      handleContactChange(index, "mobile", val);
                    }}
                    placeholder="Enter Mobile"
                    required
                    className="w-full px-2 py-1.5 text-xs border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-transparent focus:outline-none"
                  />
                </div>

                {/* Alternate Number */}
                {/* Alternate Number */}
                <div className="flex flex-col">
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs text-gray-700 block">
                      Alternate No.
                    </label>
                    {index === 0 ? (
                      <button
                        type="button"
                        onClick={addContact}
                        className="bg-green-500 hover:bg-green-600 text-white w-6 h-6-full flex items-center justify-center text-xs"
                      >
                        +
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => removeContact(index)}
                        className="bg-red-500 hover:bg-red-600 text-white w-6 h-6-full flex items-center justify-center text-xs"
                      >
                        -
                      </button>
                    )}
                  </div>
                  <input
                    type="text"
                    name="alternate"
                    value={contact.alternate}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "");
                      handleContactChange(index, "alternate", val);
                    }}
                    placeholder="Enter Alternate Number"
                    className="w-full px-2 py-1.5 text-xs border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-transparent focus:outline-none"
                  />
                </div>
              </div>
            </div>
          ))}

          <hr className="my-4" />

          {/* --- Footer --- */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-3">
            <p className="text-xs text-gray-600 mb-3 sm:mb-0">
              <span className="text-red-500 text-sm">*</span> Required Fields
            </p>
            <div className="flex gap-2">
              <button
                type="submit"
                className="px-4 py-1.5 text-xs bg-[#337ab7] hover:bg-[#286090] text-white  flex items-center gap-1"
              >
                Save <IoIosArrowDroprightCircle />
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-1.5 text-xs bg-red-600 hover:bg-red-700 text-white "
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddNewClients;
