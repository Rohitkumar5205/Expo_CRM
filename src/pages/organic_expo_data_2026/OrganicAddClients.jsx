import React, { useState } from "react";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const OrganicAddClients = () => {
  const Options = [
    "Select Here",
    "Acupressure/Acupuncture",
    "Agriculture Equipments",
    "ANIMAL HUSBANDARY AND DAIRY FIRMING",
    "Ayurveda",
    "Ayurveda Medicine",
    "Ayurveda Products",
    "AYUSH services via Mobile APP",
    "Essential Oil Association Of India",
    "FAFAI Fragrance & Flavour Association of India",
    "Fitness Equipment",
    "Floriculture",
    "Gadgets/Equipments",
    "Govt. & VIPs",
    "Handicraft",
    "HEALTH AND WELLNESS - TOURISM",
    "Herbal Cosmetics",
    "Herbal Medicine",
    "Herbal Products",
    "Homeopathy",
    "Homeopathy Medicine",
    "Horticulture",
    "Hospital",
    "Hospital Equipments",
    "Hospitality",
    "Insurance",
    "Media",
    "Millets",
    "Ministry",
    "Naturopathy",
    "Naturopathy Products",
    "Nutritional Supplements",
    "Organic Fertiliser",
    "Organic Food",
    "Organic Products",
    "Others",
    "Panchkarma Equipments",
    "Pharma",
    "Siddha",
    "Siddha Medicine",
    "Solar",
    "Spices",
    "Sports Equipment",
    "Stevia",
    "Textile",
    "Travel & Tourism",
    "Unani",
    "Unani Medicine/Products",
    "Vegan Food",
    "Wellness Products",
    "Wellness Retreat/Center",
    "Wellness Services",
    "Yoga",
  ];

  const Options1 = [
    "Select Here",
    "Agency",
    "Aggregator",
    "Association",
    "College",
    "Dealer",
    "Digital Media",
    "Distributor",
    "Electronic Media",
    "Government Body",
    "Institution",
    "Manufacturer",
    "N G O",
    "Print Media",
    "Raw material Supplier",
    "Research Organisation",
    "Retailer",
    "Service Provider",
    "University",
  ];

  const countryStateCityData = {
    India: {
      UttarPradesh: [
        "Agra",
        "Aligarh",
        "Allahabad",
        "Ambedkar Nagar",
        "Amethi",
        "Amroha",
        "Auraiya",
        "Azamgarh",
        "Baghpat",
        "Bahraich",
      ],
      MadhyaPradesh: [
        "Agar Malwa",
        "Alirajpur",
        "Anuppur",
        "Ashoknagar",
        "Balaghat",
        "Barwani",
        "Betul",
        "Bhind",
        "Bhopal",
        "Burhanpur",
      ],
      Uttarakhand: [
        "Almora",
        "Bageshwar",
        "Chamoli",
        "Champawat",
        "Dehradun",
        "Haridwar",
        "Nainital",
        "Pauri Garhwal",
        "Pithoragarh",
        "Rudraprayag",
      ],
      Rajasthan: [
        "Ajmer",
        "Alwar",
        "Banswara",
        "Baran",
        "Barmer",
        "Bharatpur",
        "Bhilwara",
        "Bikaner",
        "Bundi",
        "Chittorgarh",
      ],
      AndhraPradesh: [
        "Anakapalli",
        "Ananthapuramu",
        "Annamayya",
        "Bapatla",
        "Chittoor",
        "Dr. B.R. Ambedkar Konaseema",
        "East Godavari",
        "Eluru",
        "Guntur",
        "Kakinada",
      ],
    },
    USA: {
      California: [
        "Los Angeles",
        "San Francisco",
        "San Diego",
        "Sacramento",
        "San Jose",
        "Fresno",
        "Oakland",
        "Bakersfield",
        "Anaheim",
        "Santa Ana",
      ],
      Texas: [
        "Houston",
        "San Antonio",
        "Dallas",
        "Austin",
        "Fort Worth",
        "El Paso",
        "Arlington",
        "Corpus Christi",
        "Plano",
        "Laredo",
      ],
      Florida: [
        "Jacksonville",
        "Miami",
        "Tampa",
        "Orlando",
        "St. Petersburg",
        "Hialeah",
        "Port St. Lucie",
        "Tallahassee",
        "Cape Coral",
        "Fort Lauderdale",
      ],
      NewYork: [
        "New York City",
        "Buffalo",
        "Rochester",
        "Yonkers",
        "Syracuse",
        "Albany",
        "New Rochelle",
        "Mount Vernon",
        "Schenectady",
        "Utica",
      ],
      Illinois: [
        "Chicago",
        "Aurora",
        "Naperville",
        "Joliet",
        "Rockford",
        "Elgin",
        "Springfield",
        "Peoria",
        "Champaign",
        "Waukegan",
      ],
    },
    Canada: {
      Ontario: [
        "Toronto",
        "Ottawa",
        "Mississauga",
        "Brampton",
        "Hamilton",
        "London",
        "Markham",
        "Vaughan",
        "Kitchener",
        "Windsor",
      ],
      Quebec: [
        "Montreal",
        "Quebec City",
        "Laval",
        "Gatineau",
        "Longueuil",
        "Sherbrooke",
        "Saguenay",
        "Levis",
        "Trois-Rivieres",
        "Terrebonne",
      ],
      BritishColumbia: [
        "Vancouver",
        "Surrey",
        "Burnaby",
        "Richmond",
        "Abbotsford",
        "Coquitlam",
        "Kelowna",
        "Saanich",
        "Langley",
        "Delta",
      ],
      Alberta: [
        "Calgary",
        "Edmonton",
        "Red Deer",
        "Lethbridge",
        "St. Albert",
        "Medicine Hat",
        "Grande Prairie",
        "Airdrie",
        "Spruce Grove",
        "Leduc",
      ],
      Manitoba: [
        "Winnipeg",
        "Brandon",
        "Steinbach",
        "Thompson",
        "Portage la Prairie",
        "Selkirk",
        "Morden",
        "Winkler",
        "Dauphin",
        "Carman",
      ],
    },
    Russia: {
      Moscow: ["Moscow"],
      SaintPetersburg: ["Saint Petersburg"],
      NovosibirskOblast: ["Novosibirsk", "Ob", "Iskitim", "Koltushi", "Berdsk"],
      SverdlovskOblast: [
        "Yekaterinburg",
        "Nizhny Tagil",
        "Kamensk-Uralsky",
        "Pervouralsk",
        "Revda",
      ],
      KrasnodarKrai: ["Krasnodar", "Sochi", "Novorossiysk", "Anapa", "Armavir"],
      RepublicOfTatarstan: [
        "Kazan",
        "Naberezhnye Chelny",
        "Almetyevsk",
        "Zelenodolsk",
        "Bugulma",
      ],
      ChelyabinskOblast: [
        "Chelyabinsk",
        "Magnitogorsk",
        "Miass",
        "Snezhinsk",
        "Zlatoust",
      ],
      SamaraOblast: [
        "Samara",
        "Togliatti",
        "Novokuybyshevsk",
        "Syzran",
        "Kuybyshev",
      ],
      RostovOblast: [
        "Rostov-on-Don",
        "Taganrog",
        "Shakhty",
        "Novocherkassk",
        "Volgodonsk",
      ],
      BashkortostanRepublic: [
        "Ufa",
        "Sterlitamak",
        "Salavat",
        "Neftekamsk",
        "Oktyabrsky",
      ],
    },
    Japan: {
      Tokyo: [
        "Tokyo",
        "Hachioji",
        "Machida",
        "Tachikawa",
        "Koganei",
        "Fuchu",
        "Chofu",
        "Akishima",
        "Hino",
        "Musashino",
      ],
      Osaka: [
        "Osaka",
        "Sakai",
        "Higashiosaka",
        "Takatsuki",
        "Moriguchi",
        "Yao",
        "Kadoma",
        "Matsubara",
        "Hirakata",
        "Ibaraki",
      ],
      Hokkaido: [
        "Sapporo",
        "Hakodate",
        "Asahikawa",
        "Obihiro",
        "Kushiro",
        "Otaru",
        "Wakkanai",
        "Tomakomai",
        "Kitami",
        "Nemuro",
      ],
      Aichi: [
        "Nagoya",
        "Toyota",
        "Okazaki",
        "Ichinomiya",
        "Kasugai",
        "Komaki",
        "Anjo",
        "Chiryu",
        "Tokoname",
        "Tajimi",
      ],
      Fukuoka: [
        "Fukuoka",
        "Kitakyushu",
        "Kurume",
        "Omuta",
        "Iizuka",
        "Miyama",
        "Chikugo",
        "Yanagawa",
        "Munakata",
        "Tagawa",
      ],
    },
    Germany: {
      Bavaria: [
        "Munich",
        "Nuremberg",
        "Augsburg",
        "Regensburg",
        "Würzburg",
        "Ingolstadt",
        "Fürth",
        "Erlangen",
        "Landshut",
        "Passau",
      ],
      NorthRhineWestphalia: [
        "Cologne",
        "Düsseldorf",
        "Dortmund",
        "Essen",
        "Duisburg",
        "Bochum",
        "Wuppertal",
        "Bielefeld",
        "Bonn",
        "Münster",
      ],
      BadenWürttemberg: [
        "Stuttgart",
        "Karlsruhe",
        "Mannheim",
        "Freiburg",
        "Heidelberg",
        "Ulm",
        "Pforzheim",
        "Reutlingen",
        "Tübingen",
        "Aalen",
      ],
      Hesse: [
        "Frankfurt am Main",
        "Wiesbaden",
        "Kassel",
        "Darmstadt",
        "Offenbach",
        "Hanau",
        "Marburg",
        "Gießen",
        "Fulda",
        "Rüsselsheim",
      ],
      LowerSaxony: [
        "Hanover",
        "Braunschweig",
        "Osnabrück",
        "Oldenburg",
        "Göttingen",
        "Wolfsburg",
        "Hildesheim",
        "Lüneburg",
        "Delmenhorst",
        "Celle",
      ],
    },
  };

  
 
  const [add, setadd] = useState([{ id: uuidv4() }]);
 
  const addnewgrid = () => {
    setadd([...add, { id: uuidv4() }]);
  };

  const removegrid = (id) => {
    setadd((prev) =>
      prev.length > 1 ? prev.filter((item) => item.id !== id) : prev
    );
  };
  // state for form 
  const [formdata,setformdata] = useState({
      companyname:"",
      category:"",
      natureOfBussiness:"",
      address:"",
      countryName:"",
      stateName:"",
      cityName:"",
      digits:"",
      website:"",
      landline:"",
      email:"",
      datasource:"",
      eventname:"",
      reminderdate:"",
      forword:"",
      title:"",
      fullname:"",
      surname:"",
      desination:"",
      emailr:"",
      numberdigit:"",
      Altnumberdigit:"",

  });

  const [countryName,setcountryName] = useState("");
  const [stateName,setstateName] = useState("");
  const [cityName,setcityName] = useState("");
  
  // handle input change dynamically
const handleChange=(e)=>{
  const {name,value} = e.target;
    setformdata((prev)=>({...prev,[name]:value}))
};


  // logic for form data saving

  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log("form has been successfully submitted:", );
    toast.success("form has been successfully submitted");
  };
  
  // Logic for reset the data
const handleReset = () => {
  ({
    companyname:"",
      category:"",
      natureOfBussiness:"",
      address:"",
      countryName:"",
      stateName:"",
      cityName:"",
      digits:"",
      website:"",
      landline:"",
      email:"",
      datasource:"",
      eventname:"",
      reminderdate:"",
      forword:"",
      title:"",
      fullname:"",
      surname:"",
      desination:"",
      emailr:"",
      numberdigit:"",
      Altnumberdigit:"",

 }) // reset all string states to empty

  console.log("Form reset successful!");
  toast.dismiss("Form reset successful!");
};



  return (
    <div className="w-full min-h-screen bg-gray-100">
      {/* Heading Section */}
      <div className="w-full bg-white shadow-md">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between px-5 py-1">
          <h1 className="text-xl font-normal text-gray-600 mb-2 lg:mb-0">
            COMPANY DETAILS
          </h1>
          <div className="flex flex-wrap gap-2">
            {/*<button className="px-3 py-1 text-xs bg-[#3598dc] hover:bg-[#216aaa] text-white  transition-colors duration-200">
              Upload Exhibitor
            </button> */}
            <button className="px-3 py-1 text-xs bg-[#3598dc] hover:bg-[#216aaa] text-white  transition-colors duration-200">
              Master List
            </button>
            <button className="px-3 py-1 text-xs bg-[#3598dc] hover:bg-[#216aaa] text-white  transition-colors duration-200">
              Exhibitor List
            </button> 
          </div>
        </div>
      </div>

      {/* Main Form Section */}
      <>
      <form action="" onSubmit={handleSubmit}>
      <div className="max-w-full  bg-white shadow-lg m-4 ">
        <div className="p-4">
          <h2 className="text-xl font-normal text-gray-600 mb-1">
            Add New Company
          </h2>
          <hr className=" w-full opacity-10 mb-4" />

          {/* Company Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 mb-4">
            <div className="col-span-1">
              <label className="text-xs font-medium text-gray-900 mb-1 block">
                Company Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formdata.companyname}
                className="w-full px-2 py-1.5 text-xs border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-transparent focus:outline-none"
                placeholder="Enter company name"
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-span-1">
              <label className="text-xs font-medium text-gray-900 mb-1 block">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                onChange={handleChange}
                value={formdata.category}
                required
                className="w-full px-2 py-1.5 text-xs border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-transparent focus:outline-none"
              >
                {Options.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-span-1">
              <label className="text-xs font-medium text-gray-900 mb-1 block">
                Nature of Business <span className="text-red-500">*</span>
              </label>
              <select
                onChange={handleChange}
                value={formdata.natureOfBussiness}
                required
                className="w-full px-2 py-1.5 text-xs border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-transparent focus:outline-none"
              >
                {Options1.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-span-1">
              <label className="text-xs font-medium text-gray-900 mb-1 block">
                Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formdata.address}
                onChange={handleChange}
                className="w-full px-2 py-1.5 text-xs border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-transparent focus:outline-none"
                placeholder="Enter address"
                required
              />
            </div>

            <div className="col-span-1">
              <label className="text-xs font-medium text-gray-900 mb-1 block">
                Country <span className="text-red-500">*</span>
              </label>
              <select
                value={formdata.countryName}
                required
                onChange={() => {
                  handleChange;
                  setcountryName("");
                  setstateName("");
                  setcityName("");
                }}
                className="w-full px-2 py-1.5 text-xs border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-transparent focus:outline-none"
              >
                <option value="">Select Country Here</option>
                {Object.keys(countryStateCityData).map((country) => (
                  <option value={country} key={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Additional Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 mb-4">
            <div className="col-span-1">
              <label className="text-xs font-medium text-gray-900 mb-1 block">
                State <span className="text-red-500">*</span>
              </label>
              <select
                onChange={() => {
                  handleChange;
                  setstateName("");
                  setcityName("");
                }}
                value={formdata.stateName}
                disabled={!formdata.countryName}
                required
                className="w-full px-2 py-1.5 text-xs border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-transparent focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                <option value="">Select State Here</option>
                {countryName &&
                  Object.keys(countryStateCityData[countryName]).map(
                    (state) => (
                      <option value={state} key={state}>
                        {state}
                      </option>
                    )
                  )}
              </select>
            </div>

            <div className="col-span-1">
              <label className="text-xs font-medium text-gray-900 mb-1 block">
                City <span className="text-red-500">*</span>
              </label>
              <select
                onChange={()=>{
                  handleChange;
                  setcityName();
                }}
                disabled={!formdata.stateName}
                value={formdata.cityName}
                required
                className="w-full px-2 py-1.5 text-xs border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-transparent focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                <option value="">Select City Here</option>
                {countryName &&
                  stateName &&
                  countryStateCityData[countryName][stateName].map((city) => (
                    <option value={city} key={city}>
                      {city}
                    </option>
                  ))}
              </select>
            </div>

            <div className="col-span-1">
              <label className="text-xs font-medium text-gray-900 mb-1 block">
                Pin Code <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={formdata.digits}
                className="w-full px-2 py-1.5 text-xs border border-gray-300 focus:ring-1
                 focus:ring-blue-500 focus:border-transparent focus:outline-none
                 [appearance:textfield] 
                            [&::-webkit-inner-spin-button]:appearance-none 
                            [&::-webkit-outer-spin-button]:appearance-none"
                placeholder="Enter pin code"
                required
                onChange={(e)=>{
                  const value = e.target.value;

                  if (!isNaN(value) && value.length<=6) {
                    setformdata(value);
                  }
                }}
              />
            </div>

            <div className="col-span-1">
              <label className="text-xs font-medium text-gray-900 mb-1 block">
                Website <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formdata.website}
                onChange={handleChange}
                className="w-full px-2 py-1.5 text-xs border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-transparent focus:outline-none"
                placeholder="Enter website URL"
                required
              />
            </div>

            <div className="col-span-1">
              <label className="text-xs font-medium text-gray-900 mb-1 block">
                LandLine No.
              </label>
              <input
                type="text"
                value={formdata.landline}
                 onChange={handleChange}
                className="w-full px-2 py-1.5 text-xs border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-transparent focus:outline-none"
                placeholder="Enter landline number"
              />
            </div>

            <div className="col-span-1">
              <label className="text-xs font-medium text-gray-900 mb-1 block">
                Email Id <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={formdata.email}
                 onChange={handleChange}
                className="w-full px-2 py-1.5 text-xs border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-transparent focus:outline-none"
                placeholder="Enter email address"
                required
              />
            </div>
          </div>

          {/* Event Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
            <div className="col-span-1">
              <label className="text-xs font-medium text-gray-900 mb-1 block">
                Data Source <span className="text-red-500">*</span>
              </label>
              <select 
              required 
              value={formdata.datasource}
               onChange={handleChange}
              className="w-full px-2 py-1.5 text-xs border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-transparent focus:outline-none">
                <option value="">Select Here</option>
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
              </select>
            </div>

            <div className="col-span-1">
              <label className="text-xs font-medium text-gray-900 mb-1 block">
                Event Name <span className="text-red-500">*</span>
              </label>
              <select
               required  
               value={formdata.eventname}
                onChange={handleChange}
              className="w-full px-2 py-1.5 text-xs border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-transparent focus:outline-none">
                <option value="">Select Here</option>
                <option value="Organic Expo 2026">Organic Expo 2026</option>
              </select>
            </div>

            <div className="col-span-1">
              <label className="text-xs font-medium text-gray-900 mb-1 block">
                Reminder Date & Time
              </label>
              <input
                type="datetime-local"
                value={formdata.reminderdate}
                 onChange={handleChange}
                className="w-full px-2 py-1.5 text-xs border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-transparent focus:outline-none"
              />
            </div>

            <div className="col-span-1">
              <label className="text-xs font-medium text-gray-900 mb-1 block">
                Forward To <span className="text-red-500">*</span>
              </label>
              <select
               required 
               value={formdata.forword}
                onChange={handleChange}
              className="w-full px-2 py-1.5 text-xs border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-transparent focus:outline-none">
                <option value="">Select Here</option>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </select>
            </div>
          </div>

          {/* Contact Details Section */}
          <h3 className="text-sm font-medium text-gray-800 mb-1 mt-6">
            Contact Details-1
          </h3>
          <hr className=" w-full opacity-10 mb-1" />

          {add.map((addItem, index) => (
            <div key={addItem.id} className=" p-3 bg-gray-50 ">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3">
                <div className="col-span-1">
                  <label className="text-xs font-medium text-gray-900 mb-1 block">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <select 
                  required 
                  value={formdata.title}
                   onChange={handleChange}
                  className="w-full px-2 py-1.5 text-xs border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-transparent focus:outline-none">
                    <option value="Select Here">Select Here</option>
                    <option value="Mr.">Mr.</option>
                    <option value="Ms.">Ms.</option>
                    <option value="Mrs.">Mrs.</option>
                    <option value="Dr.">Dr.</option>
                  </select>
                </div>

                <div className="col-span-1">
                  <label className="text-xs font-medium text-gray-900 mb-1 block">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formdata.fullname}
                     onChange={handleChange}
                    className="w-full px-2 py-1.5 text-xs border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-transparent focus:outline-none"
                    placeholder="Enter first name"
                    required
                  />
                </div>

                <div className="col-span-1">
                  <label className="text-xs font-medium text-gray-900 mb-1 block">
                    Surname <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formdata.surname}
                     onChange={handleChange}
                    className="w-full px-2 py-1.5 text-xs border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-transparent focus:outline-none"
                    placeholder="Enter surname"
                    required
                  />
                </div>

                <div className="col-span-1">
                  <label className="text-xs font-medium text-gray-900 mb-1 block">
                    Designation <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formdata.desination}
                     onChange={handleChange}
                    className="w-full px-2 py-1.5 text-xs border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-transparent focus:outline-none"
                    placeholder="Enter designation"
                    required
                  />
                </div>

                <div className="col-span-1">
                  <label className="text-xs font-medium text-gray-900 mb-1 block">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={formdata.emailr}
                     onChange={handleChange}
                    className="w-full px-2 py-1.5 text-xs border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-transparent focus:outline-none"
                    placeholder="Enter email address"
                    required
                  />
                </div>

                <div className="col-span-1">
                  <label className="text-xs font-medium text-gray-900 mb-1 block">
                    Mobile No. <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formdata.numberdigit}
                    className="w-full px-2 py-1.5 text-xs border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-transparent focus:outline-none"
                    placeholder="Enter mobile number"
                    required
                    onChange={(e)=>{
                    const value = e.target.value;
                    if (!isNaN(value) && value.length<=10) {
                      setnumberdigit(value);
                    }
                    }}
                  />
                </div>

                <div className="col-span-1">
                  <div className="flex items-center gap-1 mb-1">
                    <label className="text-xs font-medium text-gray-900 mb-1 block">
                      Alternate No.
                    </label>
                    {index === 0 ? (
                      <button
                        type="button"
                        onClick={addnewgrid}
                        className="bg-green-500 hover:bg-green-600 text-white w-4 h-4 -full flex items-center justify-center text-xs font-bold transition-colors duration-200"
                      >
                        +
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => removegrid(addItem.id)}
                        className="bg-red-500 hover:bg-red-600 text-white w-4 h-4 -full flex items-center justify-center text-xs font-bold transition-colors duration-200"
                      >
                        -
                      </button>
                    )}
                  </div>
                  <input
                    type="tel"
                    value={formdata.Altnumberdigit}
                    className="w-full px-2 py-1.5 text-xs border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-transparent focus:outline-none"
                    placeholder="Enter alternate number"
                    onChange={(e)=>{
                  const value = e.target.value;

                  if (!isNaN(value)&& value.length<=10) {
                    setAltnumberdigit(value);
                  }
                    }}
                  />
                </div>
            
              </div>
              
            </div>
          ))}
    
          <hr className=" w-full opacity-10 my-2" />

          {/* Footer Section */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-3">
            <p className="text-xs text-gray-600 mb-3 sm:mb-0">
              <span className="text-red-500 text-sm">*</span> Required Fields
            </p>
            <div className="flex gap-2">
              <button className="px-4 py-1.5 text-xs bg-[#3598dc] hover:bg-[#216aaa] text-white  transition-colors duration-200 flex items-center gap-1">
                Save <IoIosArrowDroprightCircle />
              </button>
              <button onClick={handleReset} className="px-4 py-1.5 text-xs bg-red-500 hover:bg-red-700 text-white  transition-colors duration-200">
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
        </form>
</>
    </div>
  );
};

export default OrganicAddClients;
