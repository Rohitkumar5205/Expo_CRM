import React, { useState } from "react";

// Scoped styles
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
  
  .visitor-form h4 {
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
  // State for visitor type
  const [visitorType, setVisitorType] = useState("corporate");

  // State for Corporate Visitor
  const [corporateData, setCorporateData] = useState({
    registrationFor: "",
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    designation: "",
    companyName: "",
    companyWebsite: "",
    industrySector: "",
    companySize: "",
    country: "",
    state: "",
    city: "",
    b2bMeeting: "",
    whatsappUpdates: "",
    specificRequirement: "",
    subscribe: false,
    purposeOfVisit: {
      exploringBusiness: false,
      meetingExhibitors: false,
      attendingSeminar: false,
      networking: false,
      learningTrends: false,
    },
    areaOfInterest: {
      ayushHerbal: false,
      healthWellness: false,
      organicFarming: false,
      fitnessNutrition: false,
      bioMedicine: false,
      healthTech: false,
    },
  });

  // State for General Visitor
  const [generalData, setGeneralData] = useState({
    registrationFor: "",
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    alternateNo: "",
    dateOfBirth: "",
    gender: "Select Here",
    companyName: "",
    designation: "",
    industrySector: "Select Here",
    country: "Select Country",
    state: "Select Country first",
    city: "Select State first",
    purposeOfVisit: {
      businessNetworking: false,
      exploringProducts: false,
      buyingProducts: false,
      learningTrends: false,
      others: false,
    },
    areaOfInterest: {
      ayushHerbal: false,
      organicProducts: false,
      fitnessWellness: false,
      healthSupplements: false,
      healthcareServices: false,
      agricultureFarming: false,
      researchInnovations: false,
      others: false,
    },
    subscribe: false,
  });

  // State for Free Health Camp Visitor
  const [healthCampData, setHealthCampData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    alternateNo: "",
    dateOfBirth: "",
    gender: "Select Here",
    residenceAddress: "",
    country: "Select Country",
    state: "Select Country first",
    city: "Select State first",
    existingMedicalConditions: "",
    isTakingMedications: "",
    medicationNames: "",
    hasAllergies: "",
    allergyDetails: "",
    isExperiencingSymptoms: "",
    symptomDetails: "",
    healthCheckupServices: {
      generalHealth: false,
      bloodSugar: false,
      bloodPressure: false,
      eyeCheckup: false,
      dentalCheckup: false,
      ayurvedaConsultation: false,
      nutritionConsultation: false,
      other: false,
    },
    preferredDate: "",
    preferredTimeSlot: "09:00 AM - 12:00 PM",
    consentMedicalData: "",
    agreeToUpdates: "",
    specificHealthConcerns: "",
    subscribe: false,
  });

  const registrationOptions = [
    "Select Here",
    "4th Organic Expo 2026",
    "9th International Health and Wellness Expo",
  ];
  const countries = ["Select Country", "India", "USA", "Canada", "UK", "Germany", "Japan", "Australia"];
  const states = ["Select Country first", "Maharashtra", "Delhi", "Karnataka", "Tamil Nadu", "Gujarat"];
  const cities = ["Select State first", "Mumbai", "Delhi", "Bangalore", "Chennai", "Ahmedabad"];
  const genders = ["Select Here", "Male", "Female", "Other"];
  const timeSlots = ["09:00 AM - 12:00 PM", "12:00 PM - 03:00 PM", "03:00 PM - 06:00 PM"];
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
    "Medical Equipment",
  ];

  // Handlers for Corporate Visitor
  const handleCorporatePurposeChange = (key) => {
    setCorporateData((prev) => ({
      ...prev,
      purposeOfVisit: { ...prev.purposeOfVisit, [key]: !prev.purposeOfVisit[key] },
    }));
  };

  const handleCorporateInterestChange = (key) => {
    setCorporateData((prev) => ({
      ...prev,
      areaOfInterest: { ...prev.areaOfInterest, [key]: !prev.areaOfInterest[key] },
    }));
  };

  // Handlers for General Visitor
  const handleGeneralPurposeChange = (key) => {
    setGeneralData((prev) => ({
      ...prev,
      purposeOfVisit: { ...prev.purposeOfVisit, [key]: !prev.purposeOfVisit[key] },
    }));
  };

  const handleGeneralInterestChange = (key) => {
    setGeneralData((prev) => ({
      ...prev,
      areaOfInterest: { ...prev.areaOfInterest, [key]: !prev.areaOfInterest[key] },
    }));
  };

  // Handlers for Free Health Camp
  const handleHealthServiceChange = (key) => {
    setHealthCampData((prev) => ({
      ...prev,
      healthCheckupServices: { ...prev.healthCheckupServices, [key]: !prev.healthCheckupServices[key] },
    }));
  };

  // Render Corporate Visitor Form
  const CorporateVisitorForm = () => (
    <div className="visitor-form">
      <h3 className="text-sm text-gray-900 font-semibold mb-3">Corporate Visitor Registration</h3>

      <div className="grid grid-cols-4 gap-3 mb-4">
        <div>
          <label className="block text-sm text-gray-900 mb-1 font-medium">
            Registration For <span className="text-red-500">*</span>
          </label>
          <select
            value={corporateData.registrationFor}
            onChange={(e) => setCorporateData({ ...corporateData, registrationFor: e.target.value })}
          >
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
            value={corporateData.firstName}
            onChange={(e) => setCorporateData({ ...corporateData, firstName: e.target.value })}
            placeholder="Enter First Name"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-900 mb-1 font-medium">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={corporateData.lastName}
            onChange={(e) => setCorporateData({ ...corporateData, lastName: e.target.value })}
            placeholder="Enter Last Name"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-900 mb-1 font-medium">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={corporateData.email}
            onChange={(e) => setCorporateData({ ...corporateData, email: e.target.value })}
            placeholder="Enter Email"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-900 mb-1 font-medium">
            Mobile No. <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            value={corporateData.mobile}
            onChange={(e) => setCorporateData({ ...corporateData, mobile: e.target.value })}
            placeholder="Enter Mobile"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-900 mb-1 font-medium">
            Designation <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={corporateData.designation}
            onChange={(e) => setCorporateData({ ...corporateData, designation: e.target.value })}
            placeholder="Enter Designation"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-900 mb-1 font-medium">
            Company Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={corporateData.companyName}
            onChange={(e) => setCorporateData({ ...corporateData, companyName: e.target.value })}
            placeholder="Enter Company Name"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-900 mb-1 font-medium">
            Company Website <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={corporateData.companyWebsite}
            onChange={(e) => setCorporateData({ ...corporateData, companyWebsite: e.target.value })}
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
          <select
            value={corporateData.industrySector}
            onChange={(e) => setCorporateData({ ...corporateData, industrySector: e.target.value })}
          >
            {industrySectors.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-900 mb-1 font-medium">
            Company Size <span className="text-red-500">*</span>
          </label>
          <select
            value={corporateData.companySize}
            onChange={(e) => setCorporateData({ ...corporateData, companySize: e.target.value })}
          >
            {["Select Here", "1-10 Employees", "11-50 Employees"].map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-900 mb-1 font-medium">
            Country <span className="text-red-500">*</span>
          </label>
          <select
            value={corporateData.country}
            onChange={(e) => setCorporateData({ ...corporateData, country: e.target.value, state: "Select Country first", city: "Select State first" })}
          >
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
            value={corporateData.state}
            onChange={(e) => setCorporateData({ ...corporateData, state: e.target.value, city: "Select State first" })}
            disabled={!corporateData.country || corporateData.country === "Select Country"}
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
            value={corporateData.city}
            onChange={(e) => setCorporateData({ ...corporateData, city: e.target.value })}
            disabled={!corporateData.state || corporateData.state === "Select Country first"}
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
          {[
            { key: "exploringBusiness", label: "Exploring Business Opportunities" },
            { key: "meetingExhibitors", label: "Meeting Exhibitors & Suppliers" },
            { key: "attendingSeminar", label: "Attending Arogya Sangosthi Seminar" },
            { key: "networking", label: "Networking & Collaborations" },
            { key: "learningTrends", label: "Learning About Latest Trends" },
          ].map(({ key, label }) => (
            <label key={key} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={corporateData.purposeOfVisit[key]}
                onChange={() => handleCorporatePurposeChange(key)}
              />
              <span className="text-sm text-gray-900">{label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm text-gray-900 font-semibold mb-2">
          Area of Interest <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-3 gap-x-6 gap-y-2">
          {[
            { key: "ayushHerbal", label: "AYUSH & Herbal Products" },
            { key: "healthWellness", label: "Health & Wellness" },
            { key: "organicFarming", label: "Organic Farming & Agriculture" },
            { key: "fitnessNutrition", label: "Fitness & Nutrition" },
            { key: "bioMedicine", label: "Bio-Medicine & Research" },
            { key: "healthTech", label: "HealthTech & Startups" },
          ].map(({ key, label }) => (
            <label key={key} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={corporateData.areaOfInterest[key]}
                onChange={() => handleCorporateInterestChange(key)}
              />
              <span className="text-sm text-gray-900">{label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm text-gray-900 mb-2 font-medium">
          Would you like to schedule B2B meetings? <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-4">
          {["yes", "no"].map((value) => (
            <label key={value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="b2bMeeting"
                value={value}
                checked={corporateData.b2bMeeting === value}
                onChange={(e) => setCorporateData({ ...corporateData, b2bMeeting: e.target.value })}
              />
              <span className="text-sm text-gray-900">{value.charAt(0).toUpperCase() + value.slice(1)}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm text-gray-900 mb-2 font-medium">
          Would you like updates via WhatsApp? <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-4">
          {["yes", "no"].map((value) => (
            <label key={value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="whatsappUpdates"
                value={value}
                checked={corporateData.whatsappUpdates === value}
                onChange={(e) => setCorporateData({ ...corporateData, whatsappUpdates: e.target.value })}
              />
              <span className="text-sm text-gray-900">{value.charAt(0).toUpperCase() + value.slice(1)}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm text-gray-900 mb-1 font-medium">
          Any Specific Requirement
        </label>
        <textarea
          value={corporateData.specificRequirement}
          onChange={(e) => setCorporateData({ ...corporateData, specificRequirement: e.target.value })}
          placeholder="Write Here"
          rows="2"
        ></textarea>
      </div>

      <div className="mb-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={corporateData.subscribe}
            onChange={(e) => setCorporateData({ ...corporateData, subscribe: e.target.checked })}
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
  );

  // Render General Visitor Form
  const GeneralVisitorForm = () => (
    <div className="visitor-form">
      <h3 className="text-sm text-gray-900 font-semibold mb-3">General Visitor Registration</h3>

      <div className="grid grid-cols-4 gap-3 mb-4">
        <div>
          <label className="block text-sm text-gray-900 mb-1 font-medium">
            Registration For <span className="text-red-500">*</span>
          </label>
          <select
            value={generalData.registrationFor}
            onChange={(e) => setGeneralData({ ...generalData, registrationFor: e.target.value })}
          >
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
            value={generalData.firstName}
            onChange={(e) => setGeneralData({ ...generalData, firstName: e.target.value })}
            placeholder="Enter First Name"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-900 mb-1 font-medium">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={generalData.lastName}
            onChange={(e) => setGeneralData({ ...generalData, lastName: e.target.value })}
            placeholder="Enter Last Name"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-900 mb-1 font-medium">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={generalData.email}
            onChange={(e) => setGeneralData({ ...generalData, email: e.target.value })}
            placeholder="Enter Email"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-900 mb-1 font-medium">
            Mobile No. <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            value={generalData.mobile}
            onChange={(e) => setGeneralData({ ...generalData, mobile: e.target.value })}
            placeholder="Enter Telephone/Mobile"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-900 mb-1 font-medium">
            Alternate No. (optional)
          </label>
          <input
            type="tel"
            value={generalData.alternateNo}
            onChange={(e) => setGeneralData({ ...generalData, alternateNo: e.target.value })}
            placeholder="Enter Alternate No."
          />
        </div>
        <div>
          <label className="block text-sm text-gray-900 mb-1 font-medium">
            Date of Birth (optional)
          </label>
          <input
            type="date"
            value={generalData.dateOfBirth}
            onChange={(e) => setGeneralData({ ...generalData, dateOfBirth: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm text-gray-900 mb-1 font-medium">
            Gender <span className="text-red-500">*</span>
          </label>
          <select
            value={generalData.gender}
            onChange={(e) => setGeneralData({ ...generalData, gender: e.target.value })}
          >
            {genders.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-900 mb-1 font-medium">
            Company Name (optional)
          </label>
          <input
            type="text"
            value={generalData.companyName}
            onChange={(e) => setGeneralData({ ...generalData, companyName: e.target.value })}
            placeholder="Enter Company Name"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-900 mb-1 font-medium">
            Designation (optional)
          </label>
          <input
            type="text"
            value={generalData.designation}
            onChange={(e) => setGeneralData({ ...generalData, designation: e.target.value })}
            placeholder="Enter Designation"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-900 mb-1 font-medium">
            Industry/Sector (optional)
          </label>
          <select
            value={generalData.industrySector}
            onChange={(e) => setGeneralData({ ...generalData, industrySector: e.target.value })}
          >
            {industrySectors.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-900 mb-1 font-medium">
            Country <span className="text-red-500">*</span>
          </label>
          <select
            value={generalData.country}
            onChange={(e) => setGeneralData({ ...generalData, country: e.target.value, state: "Select Country first", city: "Select State first" })}
          >
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
            value={generalData.state}
            onChange={(e) => setGeneralData({ ...generalData, state: e.target.value, city: "Select State first" })}
            disabled={!generalData.country || generalData.country === "Select Country"}
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
            value={generalData.city}
            onChange={(e) => setGeneralData({ ...generalData, city: e.target.value })}
            disabled={!generalData.state || generalData.state === "Select Country first"}
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
        <div className="grid grid-cols-4 gap-x-6 gap-y-2">
          {[
            { key: "businessNetworking", label: "Business Networking" },
            { key: "exploringProducts", label: "Exploring New Products" },
            { key: "buyingProducts", label: "Buying Products & Services" },
            { key: "learningTrends", label: "Learning Industry Trends" },
            { key: "others", label: "Others" },
          ].map(({ key, label }) => (
            <label key={key} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={generalData.purposeOfVisit[key]}
                onChange={() => handleGeneralPurposeChange(key)}
              />
              <span className="text-sm text-gray-900">{label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm text-gray-900 font-semibold mb-2">
          Area of Interest <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-4 gap-x-6 gap-y-2">
          {[
            { key: "ayushHerbal", label: "AYUSH & Herbal Products" },
            { key: "organicProducts", label: "Organic & Natural Products" },
            { key: "fitnessWellness", label: "Fitness & Wellness Equipment" },
            { key: "healthSupplements", label: "Health Supplements" },
            { key: "healthcareServices", label: "Hospitals & Healthcare Services" },
            { key: "agricultureFarming", label: "Agriculture & Organic Farming" },
            { key: "researchInnovations", label: "R&D & Innovations" },
            { key: "others", label: "Others" },
          ].map(({ key, label }) => (
            <label key={key} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={generalData.areaOfInterest[key]}
                onChange={() => handleGeneralInterestChange(key)}
              />
              <span className="text-sm text-gray-900">{label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={generalData.subscribe}
            onChange={(e) => setGeneralData({ ...generalData, subscribe: e.target.checked })}
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
  );

  // Render Free Health Camp Form
  const FreeHealthCampForm = () => (
    <div className="visitor-form">
      <h3 className="text-sm text-gray-900 font-semibold mb-3">Free Health Camp Registration</h3>

      <h4 className="text-sm text-gray-900 font-medium mb-2">Basic Personal Details:</h4>
      <div className="grid grid-cols-4 gap-3 mb-4">
        <div>
          <label className="block text-sm text-gray-900 mb-1 font-medium">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={healthCampData.firstName}
            onChange={(e) => setHealthCampData({ ...healthCampData, firstName: e.target.value })}
            placeholder="Enter First Name"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-900 mb-1 font-medium">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={healthCampData.lastName}
            onChange={(e) => setHealthCampData({ ...healthCampData, lastName: e.target.value })}
            placeholder="Enter Last Name"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-900 mb-1 font-medium">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={healthCampData.email}
            onChange={(e) => setHealthCampData({ ...healthCampData, email: e.target.value })}
            placeholder="Enter Email"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-900 mb-1 font-medium">
            Mobile No. <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            value={healthCampData.mobile}
            onChange={(e) => setHealthCampData({ ...healthCampData, mobile: e.target.value })}
            placeholder="Enter Telephone/Mobile"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-900 mb-1 font-medium">
            Alternate No.
          </label>
          <input
            type="tel"
            value={healthCampData.alternateNo}
            onChange={(e) => setHealthCampData({ ...healthCampData, alternateNo: e.target.value })}
            placeholder="Enter Alternate No."
          />
        </div>
        <div>
          <label className="block text-sm text-gray-900 mb-1 font-medium">
            Date of Birth <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={healthCampData.dateOfBirth}
            onChange={(e) => setHealthCampData({ ...healthCampData, dateOfBirth: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm text-gray-900 mb-1 font-medium">
            Gender <span className="text-red-500">*</span>
          </label>
          <select
            value={healthCampData.gender}
            onChange={(e) => setHealthCampData({ ...healthCampData, gender: e.target.value })}
          >
            {genders.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-900 mb-1 font-medium">
            Residence Address
          </label>
          <input
            type="text"
            value={healthCampData.residenceAddress}
            onChange={(e) => setHealthCampData({ ...healthCampData, residenceAddress: e.target.value })}
            placeholder="Write Here"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-900 mb-1 font-medium">
            Country <span className="text-red-500">*</span>
          </label>
          <select
            value={healthCampData.country}
            onChange={(e) => setHealthCampData({ ...healthCampData, country: e.target.value, state: "Select Country first", city: "Select State first" })}
          >
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
            value={healthCampData.state}
            onChange={(e) => setHealthCampData({ ...healthCampData, state: e.target.value, city: "Select State first" })}
            disabled={!healthCampData.country || healthCampData.country === "Select Country"}
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
            value={healthCampData.city}
            onChange={(e) => setHealthCampData({ ...healthCampData, city: e.target.value })}
            disabled={!healthCampData.state || healthCampData.state === "Select Country first"}
          >
            {cities.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      <h4 className="text-sm text-gray-900 font-medium mb-2">Health-Related Information:</h4>
      <div className="space-y-3 mb-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-900 font-medium">
            Do you have any existing medical conditions? (If yes, specify)
          </label>
          <div className="flex items-center gap-4">
            {["yes", "no"].map((value) => (
              <label key={value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="medicalConditions"
                  value={value}
                  checked={healthCampData.existingMedicalConditions === value}
                  onChange={(e) => setHealthCampData({ ...healthCampData, existingMedicalConditions: e.target.value })}
                />
                <span className="text-sm text-gray-900">{value.charAt(0).toUpperCase() + value.slice(1)}</span>
              </label>
            ))}
          </div>
          {healthCampData.existingMedicalConditions === "yes" && (
            <textarea
              value={healthCampData.existingMedicalConditions}
              onChange={(e) => setHealthCampData({ ...healthCampData, existingMedicalConditions: e.target.value })}
              placeholder="Specify medical conditions"
              rows="2"
            />
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-900 font-medium">
            Are you currently taking any medications? (If yes, mention the medication names)
          </label>
          <div className="flex items-center gap-4">
            {["yes", "no"].map((value) => (
              <label key={value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="medications"
                  value={value}
                  checked={healthCampData.isTakingMedications === value}
                  onChange={(e) => setHealthCampData({ ...healthCampData, isTakingMedications: e.target.value })}
                />
                <span className="text-sm text-gray-900">{value.charAt(0).toUpperCase() + value.slice(1)}</span>
              </label>
            ))}
          </div>
          {healthCampData.isTakingMedications === "yes" && (
            <textarea
              value={healthCampData.medicationNames}
              onChange={(e) => setHealthCampData({ ...healthCampData, medicationNames: e.target.value })}
              placeholder="Mention medication names"
              rows="2"
            />
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-900 font-medium">
            Do you have any allergies? (If yes, specify)
          </label>
          <div className="flex items-center gap-4">
            {["yes", "no"].map((value) => (
              <label key={value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="allergies"
                  value={value}
                  checked={healthCampData.hasAllergies === value}
                  onChange={(e) => setHealthCampData({ ...healthCampData, hasAllergies: e.target.value })}
                />
                <span className="text-sm text-gray-900">{value.charAt(0).toUpperCase() + value.slice(1)}</span>
              </label>
            ))}
          </div>
          {healthCampData.hasAllergies === "yes" && (
            <textarea
              value={healthCampData.allergyDetails}
              onChange={(e) => setHealthCampData({ ...healthCampData, allergyDetails: e.target.value })}
              placeholder="Specify allergies"
              rows="2"
            />
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-900 font-medium">
            Are you experiencing any symptoms currently? (If yes, specify)
          </label>
          <div className="flex items-center gap-4">
            {["yes", "no"].map((value) => (
              <label key={value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="symptoms"
                  value={value}
                  checked={healthCampData.isExperiencingSymptoms === value}
                  onChange={(e) => setHealthCampData({ ...healthCampData, isExperiencingSymptoms: e.target.value })}
                />
                <span className="text-sm text-gray-900">{value.charAt(0).toUpperCase() + value.slice(1)}</span>
              </label>
            ))}
          </div>
          {healthCampData.isExperiencingSymptoms === "yes" && (
            <textarea
              value={healthCampData.symptomDetails}
              onChange={(e) => setHealthCampData({ ...healthCampData, symptomDetails: e.target.value })}
              placeholder="Specify symptoms"
              rows="2"
            />
          )}
        </div>
      </div>

      <h4 className="text-sm text-gray-900 font-medium mb-2">Health Check-Up Preferences:</h4>
      <div className="grid grid-cols-3 gap-x-6 gap-y-2 mb-4">
        {[
          { key: "generalHealth", label: "General Health Check-up" },
          { key: "bloodSugar", label: "Blood Sugar Test" },
          { key: "bloodPressure", label: "Blood Pressure Check" },
          { key: "eyeCheckup", label: "Eye Check-up" },
          { key: "dentalCheckup", label: "Dental Check-up" },
          { key: "ayurvedaConsultation", label: "Ayurveda Consultation" },
          { key: "nutritionConsultation", label: "Nutrition & Diet Consultation" },
          { key: "other", label: "Other" },
        ].map(({ key, label }) => (
          <label key={key} className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={healthCampData.healthCheckupServices[key]}
              onChange={() => handleHealthServiceChange(key)}
            />
            <span className="text-sm text-gray-900">{label}</span>
          </label>
        ))}
      </div>

      <h4 className="text-sm text-gray-900 font-medium mb-2">Appointment & Availability:</h4>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <label className="block text-sm text-gray-900 mb-1 font-medium">
            Preferred Date for Health Check-up <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={healthCampData.preferredDate}
            onChange={(e) => setHealthCampData({ ...healthCampData, preferredDate: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm text-gray-900 mb-1 font-medium">
            Preferred Time Slot <span className="text-red-500">*</span>
          </label>
          <select
            value={healthCampData.preferredTimeSlot}
            onChange={(e) => setHealthCampData({ ...healthCampData, preferredTimeSlot: e.target.value })}
          >
            {timeSlots.map((slot, index) => (
              <option key={index} value={slot}>{slot}</option>
            ))}
          </select>
        </div>
      </div>

      <h4 className="text-sm text-gray-900 font-medium mb-2">Consent & Agreement:</h4>
      <div className="space-y-3 mb-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-900 font-medium">
            Do you consent to share your medical data with healthcare professionals for analysis? <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-4">
            {["yes", "no"].map((value) => (
              <label key={value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="consentData"
                  value={value}
                  checked={healthCampData.consentMedicalData === value}
                  onChange={(e) => setHealthCampData({ ...healthCampData, consentMedicalData: e.target.value })}
                />
                <span className="text-sm text-gray-900">{value.charAt(0).toUpperCase() + value.slice(1)}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-900 font-medium">
            Do you agree to receive health-related updates and event reminders? <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-4">
            {["yes", "no"].map((value) => (
              <label key={value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="agreeUpdates"
                  value={value}
                  checked={healthCampData.agreeToUpdates === value}
                  onChange={(e) => setHealthCampData({ ...healthCampData, agreeToUpdates: e.target.value })}
                />
                <span className="text-sm text-gray-900">{value.charAt(0).toUpperCase() + value.slice(1)}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm text-gray-900 mb-1 font-medium">
          Any specific health concerns or questions for the doctors?
        </label>
        <textarea
          value={healthCampData.specificHealthConcerns}
          onChange={(e) => setHealthCampData({ ...healthCampData, specificHealthConcerns: e.target.value })}
          placeholder="Write Here"
          rows="2"
        />
      </div>

      <div className="mb-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={healthCampData.subscribe}
            onChange={(e) => setHealthCampData({ ...healthCampData, subscribe: e.target.checked })}
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
  );

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
              {[
                { value: "corporate", label: "Corporate Visitor" },
                { value: "general", label: "General Visitor" },
                { value: "freeHealth", label: "Free Health Camp" },
              ].map(({ value, label }) => (
                <label key={value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="visitorType"
                    value={value}
                    checked={visitorType === value}
                    onChange={(e) => setVisitorType(e.target.value)}
                  />
                  <span className="text-sm text-gray-900 font-medium">{label}</span>
                </label>
              ))}
            </div>

            {visitorType === "corporate" && <CorporateVisitorForm />}
            {visitorType === "general" && <GeneralVisitorForm />}
            {visitorType === "freeHealth" && <FreeHealthCampForm />}
          </div>
        </div>
      </div>
    </>
  );
};

const VisitorList = ({ onBack }) => (
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