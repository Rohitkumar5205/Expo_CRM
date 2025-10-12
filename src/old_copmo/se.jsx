import React, { useState } from "react";

// Scoped styles with reduced text and input sizes
const scopedStyles = `
  .visitor-form input[type="text"],
  .visitor-form input[type="email"],
  .visitor-form input[type="tel"],
  .visitor-form select,
  .visitor-form textarea {
    all: unset;
    display: block;
    width: 100%;
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 0.2rem;
    background: white;
    box-sizing: border-box;
  }
  
  .visitor-form input[type="text"]:focus,
  .visitor-form input[type="email"]:focus,
  .visitor-form input[type="tel"]:focus,
  .visitor-form select:focus,
  .visitor-form textarea:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 1px #3b82f6;
  }
  
  .visitor-form input[type="radio"],
  .visitor-form input[type="checkbox"] {
    all: unset;
    width: 12px;
    height: 12px;
    border: 2px solid #6b7280;
    border-radius: 2px;
    display: inline-block;
    cursor: pointer;
    flex-shrink: 0;
  }
  
  .visitor-form input[type="radio"] {
    border-radius: 50%;
  }
  
  .visitor-form input[type="radio"]:checked,
  .visitor-form input[type="checkbox"]:checked {
    background-color: #3598dc;
    border-color: #3598dc;
    position: relative;
  }
  
  .visitor-form input[type="checkbox"]:checked::after {
    content: "✓";
    position: absolute;
    color: white;
    font-size: 8px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  
  .visitor-form input[type="radio"]:checked::after {
    content: "";
    position: absolute;
    width: 6px;
    height: 6px;
    background: white;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  
  .visitor-form select {
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10'%3E%3Cpath fill='%23333' d='M5 7.5L1 3h8z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 0.5rem center;
    padding-right: 2rem;
  }
  
  .visitor-form select:disabled {
    background-color: #f3f4f6;
    cursor: not-allowed;
  }
  
  .visitor-form label {
    font-size: 0.75rem;
  }
  
  .visitor-form h2 {
    font-size: 1rem;
  }
  
  .visitor-form h3 {
    font-size: 0.875rem;
  }
  
  .visitor-form span {
    font-size: 0.75rem;
  }
  
  .visitor-form button {
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
  }
`;

const VisitorRegistration = ({ onNavigateToList }) => {
  const [visitorType, setVisitorType] = useState("corporate");
  const [registrationFor, setRegistrationFor] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [designation, setDesignation] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [industrySector, setIndustrySector] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [b2bMeeting, setB2bMeeting] = useState("");
  const [whatsappUpdates, setWhatsappUpdates] = useState("");
  const [specificRequirement, setSpecificRequirement] = useState("");
  const [subscribe, setSubscribe] = useState(false);

  const [purposeOfVisit, setPurposeOfVisit] = useState({
    exploringBusiness: false,
    meetingExhibitors: false,
    attendingSeminar: false,
    networking: false,
    learningTrends: false
  });

  const [areaOfInterest, setAreaOfInterest] = useState({
    ayushHerbal: false,
    healthWellness: false,
    organicFarming: false,
    fitnessNutrition: false,
    bioMedicine: false,
    healthTech: false
  });

  const registrationOptions = [
    "Select Here",
    "Self",
    "Company",
    "Group",
    "Association",
    "Government",
    "Media"
  ];

  const industrySectors = [
    "Select Here",
    "AYUSH & Herbal Products",
    "Health & Wellness",
    "Organic Farming & Agriculture",
    "Fitness & Nutrition",
    "Bio-Medicine & Research",
    "HealthTech & Startups",
    "Pharmaceuticals",
    "Healthcare Services",
    "Medical Equipment"
  ];

  const companySizes = [
    "Select Here",
    "1-10 Employees",
    "11-50 Employees",
    "51-200 Employees",
    "201-500 Employees",
    "501-1000 Employees",
    "1000+ Employees"
  ];

  const countries = ["Select Country", "India", "USA", "Canada", "UK", "Germany", "Japan", "Australia"];
  const states = ["Select Country first", "Maharashtra", "Delhi", "Karnataka", "Tamil Nadu", "Gujarat"];
  const cities = ["Select State first", "Mumbai", "Delhi", "Bangalore", "Chennai", "Ahmedabad"];

  const handlePurposeChange = (key) => {
    setPurposeOfVisit(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleInterestChange = (key) => {
    setAreaOfInterest(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
      <style>{scopedStyles}</style>
      <div className="bg-gray-100 min-h-screen">
        <div className="bg-white border-b border-gray-200 px-4 py-2 flex justify-between items-center">
          <h1 className="text-base text-gray-700 font-normal">VISITOR</h1>
          <div className="flex gap-2">
            <button className="bg-[#3598dc] hover:bg-[#2980b9] text-white px-3 py-1 text-sm rounded">
              Master List
            </button>
            <button 
              onClick={onNavigateToList}
              className="bg-[#3598dc] hover:bg-[#2980b9] text-white px-3 py-1 text-sm rounded"
            >
              Visitor List
            </button>
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto p-4">
          <div className="bg-white rounded shadow p-4 visitor-form">
            <h2 className="text-base text-gray-700 font-normal mb-4">Add New Visitor</h2>

            <div className="mb-4 flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="visitorType"
                  value="corporate"
                  checked={visitorType === "corporate"}
                  onChange={(e) => setVisitorType(e.target.value)}
                />
                <span className="text-sm text-gray-900 font-medium">Corporate Visitor</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="visitorType"
                  value="general"
                  checked={visitorType === "general"}
                  onChange={(e) => setVisitorType(e.target.value)}
                />
                <span className="text-sm text-gray-900 font-medium">General Visitor</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="visitorType"
                  value="freeHealth"
                  checked={visitorType === "freeHealth"}
                  onChange={(e) => setVisitorType(e.target.value)}
                />
                <span className="text-sm text-gray-900 font-medium">Free Health Camp</span>
              </label>
            </div>

            <h3 className="text-sm text-gray-900 font-semibold mb-3">Corporate Visitor Registration</h3>

            <div className="grid grid-cols-4 gap-3 mb-4">
              <div>
                <label className="block text-sm text-gray-900 mb-1 font-medium">
                  Registration For <span className="text-red-500">*</span>
                </label>
                <select value={registrationFor} onChange={(e) => setRegistrationFor(e.target.value)}>
                  {registrationOptions.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-900 mb-1 font-medium">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter First Name"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-900 mb-1 font-medium">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Enter Last Name"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-900 mb-1 font-medium">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Email"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-900 mb-1 font-medium">
                  Mobile No. <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="Enter Mobile"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-900 mb-1 font-medium">
                  Designation <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  placeholder="Enter Designation"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-900 mb-1 font-medium">
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Enter Company Name"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-900 mb-1 font-medium">
                  Company Website <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={companyWebsite}
                  onChange={(e) => setCompanyWebsite(e.target.value)}
                  placeholder="Enter Website"
                />
              </div>
            </div>

            <h3 className="text-sm text-gray-900 font-semibold mb-3 mt-4">Company & Industry Information:</h3>
            <div className="grid grid-cols-5 gap-3 mb-4">
              <div>
                <label className="block text-sm text-gray-900 mb-1 font-medium">
                  Industry/Sector <span className="text-red-500">*</span>
                </label>
                <select value={industrySector} onChange={(e) => setIndustrySector(e.target.value)}>
                  {industrySectors.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-900 mb-1 font-medium">
                  Company Size <span className="text-red-500">*</span>
                </label>
                <select value={companySize} onChange={(e) => setCompanySize(e.target.value)}>
                  {companySizes.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-900 mb-1 font-medium">
                  Country <span className="text-red-500">*</span>
                </label>
                <select value={country} onChange={(e) => setCountry(e.target.value)}>
                  {countries.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-900 mb-1 font-medium">
                  State <span className="text-red-500">*</span>
                </label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  disabled={!country || country === "Select Country"}
                >
                  {states.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-900 mb-1 font-medium">
                  City <span className="text-red-500">*</span>
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  disabled={!state || state === "Select Country first"}
                >
                  {cities.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm text-gray-900 font-semibold mb-2">
                Purpose of Visit <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-3 gap-x-6 gap-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={purposeOfVisit.exploringBusiness}
                    onChange={() => handlePurposeChange("exploringBusiness")}
                  />
                  <span className="text-sm text-gray-900">Exploring Business Opportunities</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={purposeOfVisit.meetingExhibitors}
                    onChange={() => handlePurposeChange("meetingExhibitors")}
                  />
                  <span className="text-sm text-gray-900">Meeting Exhibitors & Suppliers</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={purposeOfVisit.attendingSeminar}
                    onChange={() => handlePurposeChange("attendingSeminar")}
                  />
                  <span className="text-sm text-gray-900">Attending Arogya Sangosthi Seminar</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={purposeOfVisit.networking}
                    onChange={() => handlePurposeChange("networking")}
                  />
                  <span className="text-sm text-gray-900">Networking & Collaborations</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={purposeOfVisit.learningTrends}
                    onChange={() => handlePurposeChange("learningTrends")}
                  />
                  <span className="text-sm text-gray-900">Learning About Latest Trends</span>
                </label>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm text-gray-900 font-semibold mb-2">
                Area of Interest <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-3 gap-x-6 gap-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={areaOfInterest.ayushHerbal}
                    onChange={() => handleInterestChange("ayushHerbal")}
                  />
                  <span className="text-sm text-gray-900">AYUSH & Herbal Products</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={areaOfInterest.healthWellness}
                    onChange={() => handleInterestChange("healthWellness")}
                  />
                  <span className="text-sm text-gray-900">Health & Wellness</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={areaOfInterest.organicFarming}
                    onChange={() => handleInterestChange("organicFarming")}
                  />
                  <span className="text-sm text-gray-900">Organic Farming & Agriculture</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={areaOfInterest.fitnessNutrition}
                    onChange={() => handleInterestChange("fitnessNutrition")}
                  />
                  <span className="text-sm text-gray-900">Fitness & Nutrition</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={areaOfInterest.bioMedicine}
                    onChange={() => handleInterestChange("bioMedicine")}
                  />
                  <span className="text-sm text-gray-900">Bio-Medicine & Research</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={areaOfInterest.healthTech}
                    onChange={() => handleInterestChange("healthTech")}
                  />
                  <span className="text-sm text-gray-900">HealthTech & Startups</span>
                </label>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm text-gray-900 mb-2 font-medium">
                Would you like to schedule B2B meetings? <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="b2bMeeting"
                    value="yes"
                    checked={b2bMeeting === "yes"}
                    onChange={(e) => setB2bMeeting(e.target.value)}
                  />
                  <span className="text-sm text-gray-900">Yes</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="b2bMeeting"
                    value="no"
                    checked={b2bMeeting === "no"}
                    onChange={(e) => setB2bMeeting(e.target.value)}
                  />
                  <span className="text-sm text-gray-900">No</span>
                </label>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm text-gray-900 mb-2 font-medium">
                Would you like updates via WhatsApp? <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="whatsappUpdates"
                    value="yes"
                    checked={whatsappUpdates === "yes"}
                    onChange={(e) => setWhatsappUpdates(e.target.value)}
                  />
                  <span className="text-sm text-gray-900">Yes</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="whatsappUpdates"
                    value="no"
                    checked={whatsappUpdates === "no"}
                    onChange={(e) => setWhatsappUpdates(e.target.value)}
                  />
                  <span className="text-sm text-gray-900">No</span>
                </label>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm text-gray-900 mb-1 font-medium">
                Any Specific Requirement
              </label>
              <textarea
                value={specificRequirement}
                onChange={(e) => setSpecificRequirement(e.target.value)}
                placeholder="Write Here"
                rows="2"
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={subscribe}
                  onChange={(e) => setSubscribe(e.target.checked)}
                />
                <span className="text-sm text-gray-900">Subscribe to Event Updates & Newsletters</span>
              </label>
            </div>

            <div className="flex justify-start">
              <button className="px-4 py-1 bg-[#3598dc] hover:bg-[#2980b9] text-white text-sm rounded uppercase">
                Submit Registration
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const VisitorList = ({ onBack }) => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="bg-white border-b border-gray-200 px-4 py-2 flex justify-between items-center">
        <h1 className="text-base text-gray-700 font-normal">VISITOR LIST</h1>
        <button 
          onClick={onBack}
          className="bg-[#3598dc] hover:bg-[#2980b9] text-white px-3 py-1 text-sm rounded"
        >
          Add Visitor
        </button>
      </div>

      <div className="max-w-6xl mx-auto p-4">
        <div className="bg-white rounded shadow p-4">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-base text-gray-700 font-normal">Visitor List</h2>
            <div className="flex gap-2">
              <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-3 py-1 text-sm rounded">
                Export
              </button>
              <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-3 py-1 text-sm rounded">
                Filter
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#4a5568] text-white">
                  <th className="border border-gray-400 px-3 py-2 text-left text-xs">
                    <input type="checkbox" className="cursor-pointer" />
                  </th>
                  <th className="border border-gray-400 px-3 py-2 text-left text-xs">S.No.</th>
                  <th className="border border-gray-400 px-3 py-2 text-left text-xs">Name</th>
                  <th className="border border-gray-400 px-3 py-2 text-left text-xs">Email</th>
                  <th className="border border-gray-400 px-3 py-2 text-left text-xs">Mobile</th>
                  <th className="border border-gray-400 px-3 py-2 text-left text-xs">Company</th>
                  <th className="border border-gray-400 px-3 py-2 text-left text-xs">Type</th>
                  <th className="border border-gray-400 px-3 py-2 text-left text-xs">Date</th>
                  <th className="border border-gray-400 px-3 py-2 text-left text-xs">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-gray-50">
                  <td colSpan="9" className="border border-gray-300 px-3 py-6 text-center text-gray-500 text-sm">
                    No visitors registered yet
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [currentView, setCurrentView] = useState("registration");

  return (
    <div>
      {currentView === "registration" ? (
        <VisitorRegistration onNavigateToList={() => setCurrentView("list")} />
      ) : (
        <VisitorList onBack={() => setCurrentView("registration")} />
      )}
    </div>
  );
};

export default App;