import React, { useState } from 'react';
import { MdOutlineModeEditOutline } from "react-icons/md";
import { Link, useLocation } from 'react-router-dom';

const Invoice = () => {
  // states 
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");



  // heading update function
  
const location = useLocation();

  const heading = location.state?.heading||"Create Invoice";

  const Citydata = {
    India: {
      AndhraPradesh: ["Anakapalli", "Ananthapuramu", "Annamayya", "Bapatla", "Chittoor", "Konaseema", "East Godavari", "Eluru"],
      ArunachalPradesh: ["Anjaw", "Changlang", "Dibang Valley", "East Kameng", "East Siang", "Kamle", "Kra Daadi", "Kurung Kumey"],
      Assam: ["Baksa", "Barpeta", "Biswanath", "Bongaigaon", "Cachar", "Charaideo", "Chirang", "Darrang"],
      Bihar: ["Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur", "Bhojpur", "Buxar"],
      Chhattisgarh: ["Balod", "Baloda Bazar", "Balrampur", "Bastar", "Bemetara", "Bijapur", "Bilaspur", "Dantewada"],
      Goa: ["North Goa", "South Goa", "Panaji", "Margao", "Mapusa", "Ponda", "Bicholim", "Canacona"],
      Gujarat: ["Ahmedabad", "Amreli", "Anand", "Aravalli", "Banaskantha", "Bharuch", "Bhavnagar", "Botad"],
      Haryana: ["Ambala", "Bhiwani", "Charkhi Dadri", "Faridabad", "Fatehabad", "Gurugram", "Hisar", "Jhajjar"],
      HimachalPradesh: ["Bilaspur", "Chamba", "Hamirpur", "Kangra", "Kinnaur", "Kullu", "Lahaul and Spiti", "Mandi"],
      Jharkhand: ["Bokaro", "Chatra", "Deoghar", "Dhanbad", "Dumka", "East Singhbhum", "Garhwa", "Giridih"],
      Karnataka: ["Bagalkot", "Bangalore Rural", "Bangalore Urban", "Belagavi", "Bellary", "Bidar", "Chamarajanagar", "Chikballapur"],
      Kerala: ["Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasaragod", "Kollam", "Kottayam", "Kozhikode"],
      MadhyaPradesh: ["Agar Malwa", "Alirajpur", "Anuppur", "Ashoknagar", "Balaghat", "Barwani", "Betul", "Bhind"],
      Maharashtra: ["Ahmednagar", "Akola", "Amravati", "Aurangabad", "Beed", "Bhandara", "Buldhana", "Chandrapur"],
      Manipur: ["Bishnupur", "Chandel", "Churachandpur", "Imphal East", "Imphal West", "Jiribam", "Kakching", "Kamjong"],
      Meghalaya: ["East Garo Hills", "East Jaintia Hills", "East Khasi Hills", "North Garo Hills", "Ri-Bhoi", "South Garo Hills", "South West Garo Hills", "South West Khasi Hills"],
      Mizoram: ["Aizawl", "Champhai", "Hnahthial", "Khawzawl", "Kolasib", "Lawngtlai", "Lunglei", "Mamit"],
      Nagaland: ["Chümoukedima", "Dimapur", "Kiphire", "Kohima", "Longleng", "Mokokchung", "Mon", "Niuland"],
      Odisha: ["Angul", "Balangir", "Balasore", "Bargarh", "Bhadrak", "Boudh", "Cuttack", "Deogarh"],
      Punjab: ["Amritsar", "Barnala", "Bathinda", "Faridkot", "Fatehgarh Sahib", "Fazilka", "Ferozepur", "Gurdaspur"],
      Rajasthan: ["Ajmer", "Alwar", "Banswara", "Baran", "Barmer", "Bharatpur", "Bhilwara", "Bikaner"],
      Sikkim: ["East Sikkim", "North Sikkim", "South Sikkim", "West Sikkim", "Gangtok", "Namchi", "Mangan", "Gyalshing"],
      TamilNadu: ["Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul", "Erode"],
      Telangana: ["Adilabad", "Bhadradri Kothagudem", "Hanamkonda", "Hyderabad", "Jagtial", "Jangaon", "Jayashankar Bhupalpally", "Jogulamba Gadwal"],
      Tripura: ["Dhalai", "Gomati", "Khowai", "North Tripura", "Sepahijala", "South Tripura", "Unakoti", "West Tripura"],
      UttarPradesh: ["Agra", "Aligarh", "Allahabad", "Ambedkar Nagar", "Amethi", "Amroha", "Auraiya", "Azamgarh"],
      Uttarakhand: ["Almora", "Bageshwar", "Chamoli", "Champawat", "Dehradun", "Haridwar", "Nainital", "Pauri Garhwal"],
      WestBengal: ["Alipurduar", "Bankura", "Birbhum", "Cooch Behar", "Dakshin Dinajpur", "Darjeeling", "Hooghly", "Howrah"]
    }
  };

  // Logic for dropdowns
  const countries = Object.keys(Citydata);
  const states = country && Citydata[country] ? Object.keys(Citydata[country]) : [];
  const cities = country && state && Citydata[country][state] ? Citydata[country][state] : [];

  // Utility for standard input/select fields
  const FormField = ({ label, children, required = false, colSpan = 'col-span-1' }) => (
    <div className={`flex flex-col  ${colSpan}`}>
      <label className="text-gray-700 text-xs font-medium mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  );

  const InputStyle = "px-2 py-1.5 w-full border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500";
  const ReadOnlyInputStyle = "px-2 py-1.5 w-full border border-gray-300 text-sm bg-gray-100 text-gray-600";
  const SelectStyle = "px-2 py-1.5 w-full border border-gray-300 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500";

  return (
    <>
      {/* Header */}
      <div className="flex justify-between w-full h-6 bg-white items-center px-4 pt-4 mb-4">
        <h1 className="font-normal text-xl text-[#333]">ACCOUNT SECTION | INVOICE</h1>
        <div className="flex gap-2">
          <button className="text-[#333] border border-[#333] text-xs px-2 py-1 hover:bg-gray-100">Add Client</button>
          <button className="text-[#333] border border-[#333] text-xs px-2 py-1 hover:bg-gray-100">Master List</button>
        </div>
      </div>

      <div className="min-h-screen bg-[#eef1f5] p-4">
        {/* Create Invoice Section */}
        <div className="w-full bg-white px-4 pb-7 pt-1 shadow-md">
          <h1 className="font-normal text-xl text-[#333] mb-2">{heading}</h1>
          <hr className="w-full mb-2 opacity-10" />

          {/* Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-xs">
            <FormField label="Estimate No." required>
              <input className={ReadOnlyInputStyle} type="text" readOnly defaultValue="NGW/25-26/EST/112" />
            </FormField>

            <FormField label="Type of Invoice" required>
              <select className={SelectStyle}>
                <option>Foreign Sale</option>
                <option>Intrastate</option>
                <option>Interstate Sale</option>
              </select>
            </FormField>

            <FormField label="GSTIN No./PAN No." required>
              <input className={InputStyle} type="text" />
            </FormField>

            <FormField label="Supply Date" required>
              <input className={InputStyle} type="date" defaultValue="2025-09-04" />
            </FormField>

            <FormField label="Consignee Name" required>
              <input className={InputStyle} type="text" defaultValue="Organic Expo 2026" />
            </FormField>

            {/* Address */}
            <FormField label="Address" required colSpan="lg:col-span-2">
              <input className={InputStyle} type="text" />
            </FormField>

            {/* Country */}
            <FormField label="Country" required>
              <select
                value={country}
                onChange={(e) => { setCountry(e.target.value); setState(""); setCity(""); }}
                className={SelectStyle}
              >
                <option value="">Select Country</option>
                {countries.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </FormField>

            {/* State */}
            <FormField label="State" required>
              <select
                value={state}
                onChange={(e) => { setState(e.target.value); setCity(""); }}
                className={SelectStyle}
                disabled={!country}
              >
                <option value="">Select State</option>
                {states.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </FormField>

            {/* City */}
            <FormField label="City" required>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className={SelectStyle}
                disabled={!state}
              >
                <option value="">Select City</option>
                {cities.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </FormField>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pb-3 pt-4 text-xs">
            <FormField label="Pin Code" required>
              <input className={InputStyle} type="text" defaultValue="110001" />
            </FormField>

            <FormField label="State Code">
              <input className={InputStyle} type="text" />
            </FormField>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mt-1 pt-3 border-t border-gray-100">
            <button className="bg-blue-500 text-white font-medium py-2 px-4 text-sm hover:bg-blue-600">CREATE INVOICE</button>
            <button className="bg-gray-300 text-gray-800 font-medium py-2 px-4 text-sm hover:bg-gray-400">CANCEL</button>
          </div>
        </div>
        {/* Invoice List Section */}
      <div className="w-full bg-white p-4  shadow-md mt-6 pb-8">
        <h1 className="font-normal text-xl text-[#333] mb-3">Invoice List</h1>
        {/* Table Structure */}
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead className="bg-gray-50">
              <tr>
                {['S.No.', 'Invoice No.', 'Performa no', 'Date', 'Created By', 'Action'].map((header) => (
                  <th key={header} className="px-6 py-2 border border-gray-300  text-xs text-center text-black font-bold uppercase tracking-wider">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className='border border-gray-300'>
            <tr>
              <td className='px-6 py-2  border border-gray-300 text-center text-xs'>1</td>
              <td className='px-6 py-2  border border-gray-300 text-center text-xs'><Link to="/invoiceformbutton"><button className='px-2  text-blue-500 hover:text-gray-800 text-center cursor-pointer'>NGW/INV/24-25/026</button></Link></td>
              <td className='px-6 py-2  border border-gray-300 text-center text-xs'>NGW/24-25/EST/019</td>
              <td className='px-6 py-2  border border-gray-300 text-center text-xs'>19-02-2025</td>
              <td className='px-6 py-2  border border-gray-300 text-center text-xs'>Accounts</td>
              <td className='px-6 py-2  border border-gray-300 text-center text-xs'><Link to="/creditnotecomponent"><button className='px-2  border border-blue-500 text-blue-500 hover:bg-gray-100 text-center cursor-pointer'>Credit Note</button></Link></td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    

      </div>

 


    </>
  );
};

export default Invoice;
