import { useState } from "react";
import CorporateVisitorForm from "./CorporateVisitorForm";
import GeneralVisitorForm from "./GeneralVisitorForm";
import FreeHealthCampForm from "./FreeHealthCampForm";

const VisitorRegistration = ({ onNavigateToList }) => {
  const [visitorType, setVisitorType] = useState("corporate");

  const registrationOptions = [
    "Select Here",
    "4th Organic Expo 2026",
    "9th International Health and Wellness Expo",
  ];
  const countries = [
    "Select Country",
    "India",
    "USA",
    "Canada",
    "UK",
    "Germany",
    "Japan",
    "Australia",
  ];
  const states = [
    "Select Country first",
    "Maharashtra",
    "Delhi",
    "Karnataka",
    "Tamil Nadu",
    "Gujarat",
  ];
  const cities = [
    "Select State first",
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Chennai",
    "Ahmedabad",
  ];
  const genders = ["Select Here", "Male", "Female", "Other"];
  const timeSlots = [
    "09:00 AM - 12:00 PM",
    "12:00 PM - 03:00 PM",
    "03:00 PM - 06:00 PM",
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
    "Medical Equipment",
  ];

  return (
    <div>
      <div className="w-full bg-white border-b border-gray-200 px-4 py-2 flex justify-between items-center">
        <h1 className="text-xl font-normal text-gray-700">VISITOR</h1>
         <div className="flex gap-2">
          <button className="bg-[#3598dc] hover:bg-[#2980b9] text-white px-3 py-1 text-sm ">
            Master List
          </button>
          <button
            onClick={onNavigateToList}
            className="bg-[#3598dc] hover:bg-[#2980b9] text-white px-3 py-1 text-sm "
          >
            Visitor List
          </button>
        </div> 
      </div>
      
      <div className="max-w-[1200px] mx-auto p-4">
        <div className="bg-white rounded shadow p-4 visitor-form">
          <h2 className="text-4xl text-gray-700 font-normal mb-4">
            Add New Visitor
            <hr className="w-full opacity-10"/>
          </h2>
          
          <hr className="w-full pb-6 opacity-10"/>
          <div className="mb-4 flex gap-6">
            {[
              { value: "corporate", label: "Corporate Visitor" },
              { value: "general", label: "General Visitor" },
              { value: "freeHealth", label: "Free Health Camp" },
            ].map(({ value, label }) => (
              <label
                key={value}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="visitorType"
                  value={value}
                  checked={visitorType === value}
                  onChange={(e) => setVisitorType(e.target.value)}
                  className="h-4 w-4 text-[#3598dc] focus:ring-[#3598dc]"
                />
                <span className="text-sm font-medium text-gray-900">
                  {label}
                </span>
              </label>
            ))}
          </div>

          {visitorType === "corporate" && (
            <CorporateVisitorForm
              registrationOptions={registrationOptions}
              industrySectors={industrySectors}
              countries={countries}
              states={states}
              cities={cities}
            />
          )}
          {visitorType === "general" && (
            <GeneralVisitorForm
              registrationOptions={registrationOptions}
              industrySectors={industrySectors}
              countries={countries}
              states={states}
              cities={cities}
              genders={genders}
            />
          )}
          {visitorType === "freeHealth" && (
            <FreeHealthCampForm
              countries={countries}
              states={states}
              cities={cities}
              genders={genders}
              timeSlots={timeSlots}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default VisitorRegistration;
