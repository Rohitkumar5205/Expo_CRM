import React, { useState } from 'react';
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const Page1 = () => {

// Heading function logic

const location = useLocation();

const heading = location.state?.heading||"Add New Company";


    const Options = [
        "Select Here",
        "Acupressure/Acupuncture", "Agriculture Equipments", "ANIMAL HUSBANDARY AND DAIRY FIRMING", "Ayurveda", "Ayurveda Medicine", "Ayurveda Products", "AYUSH services via Mobile APP",
        "Essential Oil Association Of India", "FAFAI Fragrance & Flavour Association of India", "Fitness Equipment",
        "Floriculture", "Gadgets/Equipments", "Govt. & VIPs", "Handicraft", "HEALTH AND WELLNESS - TOURISM", "Herbal Cosmetics", "Herbal Medicine", "Herbal Products",
        "Homeopathy", "Homeopathy Medicine", "Horticulture", "Hospital", "Hospital Equipments", "Hospitality", "Insurance", "Media", "Millets", "Ministry", "Naturopathy", "Naturopathy Products",
        "Nutritional Supplements", "Organic Fertiliser", "Organic Food", "Organic Products", "Others",
        "Panchkarma Equipments", "Pharma", "Siddha", "Siddha Medicine", "Solar", "Spices", "Sports Equipment", "Stevia", "Textile", "Travel & Tourism", "Unani", "Unani Medicine/Products", "Vegan Food",
        "Wellness Products", "Wellness Retreat/Center", "Wellness Services", "Yoga",
    ];

    const Options1 = [
        "Select Here", "Agency", "Aggregator", "Association", "College", "Dealer", "Digital Media", "Distributor", "Electronic Media", "Government Body",
        "Institution", "Manufacturer", "N G O", "Print Media", "Raw material Supplier", "Research Organisation", "Retailer", "Service Provider", "University",
    ];

    const countryStateCityData = {
        India: {
            UttarPradesh: ["Agra", "Aligarh", "Allahabad", "Ambedkar Nagar", "Amethi", "Amroha", "Auraiya", "Azamgarh", "Baghpat", "Bahraich"],
            MadhyaPradesh: ["Agar Malwa", "Alirajpur", "Anuppur", "Ashoknagar", "Balaghat", "Barwani", "Betul", "Bhind", "Bhopal", "Burhanpur"],
            Uttarakhand: ["Almora", "Bageshwar", "Chamoli", "Champawat", "Dehradun", "Haridwar", "Nainital", "Pauri Garhwal", "Pithoragarh", "Rudraprayag"],
            Rajasthan: ["Ajmer", "Alwar", "Banswara", "Baran", "Barmer", "Bharatpur", "Bhilwara", "Bikaner", "Bundi", "Chittorgarh"],
            AndhraPradesh: ["Anakapalli", "Ananthapuramu", "Annamayya", "Bapatla", "Chittoor", "Dr. B.R. Ambedkar Konaseema", "East Godavari", "Eluru", "Guntur", "Kakinada"],
        },
        USA: {
            California: ["Los Angeles", "San Francisco", "San Diego", "Sacramento", "San Jose", "Fresno", "Oakland", "Bakersfield", "Anaheim", "Santa Ana"],
            Texas: ["Houston", "San Antonio", "Dallas", "Austin", "Fort Worth", "El Paso", "Arlington", "Corpus Christi", "Plano", "Laredo"],
            Florida: ["Jacksonville", "Miami", "Tampa", "Orlando", "St. Petersburg", "Hialeah", "Port St. Lucie", "Tallahassee", "Cape Coral", "Fort Lauderdale"],
            NewYork: ["New York City", "Buffalo", "Rochester", "Yonkers", "Syracuse", "Albany", "New Rochelle", "Mount Vernon", "Schenectady", "Utica"],
            Illinois: ["Chicago", "Aurora", "Naperville", "Joliet", "Rockford", "Elgin", "Springfield", "Peoria", "Champaign", "Waukegan"],
        },
        Canada: {
            Ontario: ["Toronto", "Ottawa", "Mississauga", "Brampton", "Hamilton", "London", "Markham", "Vaughan", "Kitchener", "Windsor"],
            Quebec: ["Montreal", "Quebec City", "Laval", "Gatineau", "Longueuil", "Sherbrooke", "Saguenay", "Levis", "Trois-Rivieres", "Terrebonne"],
            BritishColumbia: ["Vancouver", "Surrey", "Burnaby", "Richmond", "Abbotsford", "Coquitlam", "Kelowna", "Saanich", "Langley", "Delta"],
            Alberta: ["Calgary", "Edmonton", "Red Deer", "Lethbridge", "St. Albert", "Medicine Hat", "Grande Prairie", "Airdrie", "Spruce Grove", "Leduc"],
            Manitoba: ["Winnipeg", "Brandon", "Steinbach", "Thompson", "Portage la Prairie", "Selkirk", "Morden", "Winkler", "Dauphin", "Carman"]
        },
        Russia: {
            Moscow: ["Moscow"],
            SaintPetersburg: ["Saint Petersburg"],
            NovosibirskOblast: ["Novosibirsk", "Ob", "Iskitim", "Koltushi", "Berdsk"],
            SverdlovskOblast: ["Yekaterinburg", "Nizhny Tagil", "Kamensk-Uralsky", "Pervouralsk", "Revda"],
            KrasnodarKrai: ["Krasnodar", "Sochi", "Novorossiysk", "Anapa", "Armavir"],
            RepublicOfTatarstan: ["Kazan", "Naberezhnye Chelny", "Almetyevsk", "Zelenodolsk", "Bugulma"],
            ChelyabinskOblast: ["Chelyabinsk", "Magnitogorsk", "Miass", "Snezhinsk", "Zlatoust"],
            SamaraOblast: ["Samara", "Togliatti", "Novokuybyshevsk", "Syzran", "Kuybyshev"],
            RostovOblast: ["Rostov-on-Don", "Taganrog", "Shakhty", "Novocherkassk", "Volgodonsk"],
            BashkortostanRepublic: ["Ufa", "Sterlitamak", "Salavat", "Neftekamsk", "Oktyabrsky"]
        },
        Japan: {
            Tokyo: ["Tokyo", "Hachioji", "Machida", "Tachikawa", "Koganei", "Fuchu", "Chofu", "Akishima", "Hino", "Musashino"],
            Osaka: ["Osaka", "Sakai", "Higashiosaka", "Takatsuki", "Moriguchi", "Yao", "Kadoma", "Matsubara", "Hirakata", "Ibaraki"],
            Hokkaido: ["Sapporo", "Hakodate", "Asahikawa", "Obihiro", "Kushiro", "Otaru", "Wakkanai", "Tomakomai", "Kitami", "Nemuro"],
            Aichi: ["Nagoya", "Toyota", "Okazaki", "Ichinomiya", "Kasugai", "Komaki", "Anjo", "Chiryu", "Tokoname", "Tajimi"],
            Fukuoka: ["Fukuoka", "Kitakyushu", "Kurume", "Omuta", "Iizuka", "Miyama", "Chikugo", "Yanagawa", "Munakata", "Tagawa"]
        },
        Germany: {
            Bavaria: ["Munich", "Nuremberg", "Augsburg", "Regensburg", "Würzburg", "Ingolstadt", "Fürth", "Erlangen", "Landshut", "Passau"],
            NorthRhineWestphalia: ["Cologne", "Düsseldorf", "Dortmund", "Essen", "Duisburg", "Bochum", "Wuppertal", "Bielefeld", "Bonn", "Münster"],
            BadenWürttemberg: ["Stuttgart", "Karlsruhe", "Mannheim", "Freiburg", "Heidelberg", "Ulm", "Pforzheim", "Reutlingen", "Tübingen", "Aalen"],
            Hesse: ["Frankfurt am Main", "Wiesbaden", "Kassel", "Darmstadt", "Offenbach", "Hanau", "Marburg", "Gießen", "Fulda", "Rüsselsheim"],
            LowerSaxony: ["Hanover", "Braunschweig", "Osnabrück", "Oldenburg", "Göttingen", "Wolfsburg", "Hildesheim", "Lüneburg", "Delmenhorst", "Celle"]
        },
    };

    const [come, setcome] = useState("");
    const [come1, setcome1] = useState("");
    const [countryName, setcountryName] = useState("");
    const [stateName, setstateName] = useState("");
    const [cityName, setcityName] = useState("");
    const [add, setadd] = useState([{ id: uuidv4() }]);

    const addnewgrid = () => {
        setadd([...add, { id: uuidv4() }]);
    };

    const removegrid = (id) => {
        setadd(prev => prev.length > 1 ? prev.filter(item => item.id !== id) : prev);
    };

    return (
        <div className="w-full  min-h-screen bg-gray-100">
            {/* Heading Section */}
            <div className="w-full h-fit bg-white shadow-md  ">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between px-2 py-1">
                    <h1 className="text-xl  text-gray-700 mb-2 lg:mb-0">COMPANY DETAILS</h1>
                    <div className="flex flex-wrap gap-2">
                        <button className="px-3 py-1 text-xs bg-[#3598dc] hover:bg-[#286090] text-white  transition-colors ">
                            Upload Exhibitor
                        </button>
                        <button className="px-3 py-1 text-xs bg-[#3598dc] hover:bg-[#286090] text-white  transition-colors ">
                            Master List
                        </button>
                        <button className="px-3 py-1 text-xs bg-[#3598dc] hover:bg-[#286090] text-white  transition-colors ">
                            Exhibitor List
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Form Section */}
            <div className="max-w-full  bg-white shadow-lg m-4 rounded-lg mx-4">
                <div className="p-4">
                    <h2 className="text-base font-medium text-gray-700 mb-3">{heading}</h2>
                    <hr className="mb-4" />

                    {/* Company Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 mb-4">
                        <div className="col-span-1">
                            <label className="block text-xs font-normal text-gray-700 mb-1">
                                Company Name <span className="text-red-500">*</span>
                            </label>
                            <input 
                                type="text" 
                                className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter company name"
                            />
                        </div>
                        
                        <div className="col-span-1">
                            <label className="block text-xs font-normal text-gray-700 mb-1">
                                Category <span className="text-red-500">*</span>
                            </label>
                            <select 
                                onChange={(e) => setcome(e.target.value)} 
                                value={come} 
                                className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                            >
                                {Options.map((option, index) => (
                                    <option key={index} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>
                        
                        <div className="col-span-1">
                            <label className="block text-xs font-normal text-gray-700 mb-1">
                                Nature of Business <span className="text-red-500">*</span>
                            </label>
                            <select 
                                onChange={(e) => setcome1(e.target.value)} 
                                value={come1} 
                                className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                            >
                                {Options1.map((option, index) => (
                                    <option key={index} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>
                        
                        <div className="col-span-1">
                            <label className="block text-xs font-normal text-gray-700 mb-1">
                                Address <span className="text-red-500">*</span>
                            </label>
                            <input 
                                type="text" 
                                className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter address"
                            />
                        </div>
                        
                        <div className="col-span-1">
                            <label className="block text-xs font-normal text-gray-700 mb-1">
                                Country <span className="text-red-500">*</span>
                            </label>
                            <select 
                                value={countryName} 
                                onChange={(e) => {
                                    setcountryName(e.target.value);
                                    setstateName("");
                                    setcityName("");
                                }} 
                                className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">Select Country Here</option>
                                {Object.keys(countryStateCityData).map((country) => (
                                    <option value={country} key={country}>{country}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Additional Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 mb-4">
                        <div className="col-span-1">
                            <label className="block text-xs font-normal text-gray-700 mb-1">
                                State <span className="text-red-500">*</span>
                            </label>
                            <select 
                                onChange={(e) => {
                                    setstateName(e.target.value);
                                    setcityName("");
                                }} 
                                value={stateName} 
                                disabled={!countryName}
                                className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                            >
                                <option value="">Select State Here</option>
                                {countryName && Object.keys(countryStateCityData[countryName]).map((state) => (
                                    <option value={state} key={state}>{state}</option>
                                ))}
                            </select>
                        </div>
                        
                        <div className="col-span-1">
                            <label className="block text-xs font-normal text-gray-700 mb-1">
                                City <span className="text-red-500">*</span>
                            </label>
                            <select 
                                onChange={(e) => setcityName(e.target.value)} 
                                disabled={!stateName} 
                                value={cityName} 
                                className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                            >
                                <option value="">Select City Here</option>
                                {countryName && stateName && countryStateCityData[countryName][stateName].map((city) => (
                                    <option value={city} key={city}>{city}</option>
                                ))}
                            </select>
                        </div>
                        
                        <div className="col-span-1">
                            <label className="block text-xs font-normal text-gray-700 mb-1">
                                Pin Code <span className="text-red-500">*</span>
                            </label>
                            <input 
                                type="text" 
                                className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter pin code"
                            />
                        </div>
                        
                        <div className="col-span-1">
                            <label className="block text-xs font-normal text-gray-700 mb-1">
                                Website <span className="text-red-500">*</span>
                            </label>
                            <input 
                                type="text" 
                                className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter website URL"
                            />
                        </div>
                        
                        <div className="col-span-1">
                            <label className="block text-xs font-normal text-gray-700 mb-1">
                                LandLine No.
                            </label>
                            <input 
                                type="text" 
                                className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter landline number"
                            />
                        </div>
                        
                        <div className="col-span-1">
                            <label className="block text-xs font-normal text-gray-700 mb-1">
                                Email Id <span className="text-red-500">*</span>
                            </label>
                            <input 
                                type="email" 
                                className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter email address"
                            />
                        </div>
                    </div>

                    {/* Event Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                        <div className="col-span-1">
                            <label className="block text-xs font-normal text-gray-700 mb-1">
                                Data Source <span className="text-red-500">*</span>
                            </label>
                            <select className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent">
                                <option value="">Select Here</option>
                                <option value="Online">Online</option>
                                <option value="Offline">Offline</option>
                            </select>
                        </div>
                        
                        <div className="col-span-1">
                            <label className="block text-xs font-normal text-gray-700 mb-1">
                                Event Name <span className="text-red-500">*</span>
                            </label>
                            <select className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent">
                                <option value="">Select Here</option>
                                <option value="Expo 2024">Expo 2024</option>
                                <option value="Expo 2025">Expo 2025</option>
                            </select>
                        </div>
                        
                        <div className="col-span-1">
                            <label className="block text-xs font-normal text-gray-700 mb-1">
                                Reminder Date & Time
                            </label>
                            <input 
                                type="datetime-local" 
                                className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        
                        <div className="col-span-1">
                            <label className="block text-xs font-normal text-gray-700 mb-1">
                                Forward To <span className="text-red-500">*</span>
                            </label>
                            <select className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent">
                                <option value="">Select Here</option>
                                <option value="Admin">Admin</option>
                                <option value="User">User</option>
                            </select>
                        </div>
                    </div>

                    {/* Contact Details Section */}
                    <h3 className="text-base font-medium text-gray-700 mb-3 mt-6">Contact Details-1</h3>
                    <hr className="mb-4" />

                    {add.map((addItem, index) => (
                        <div key={addItem.id} className="mb-4 p-3 bg-gray-50 rounded">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3">
                                <div className="col-span-1">
                                    <label className="block text-xs font-normal text-gray-700 mb-1">
                                        Title <span className="text-red-500">*</span>
                                    </label>
                                    <select className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent">
                                        <option value="Select Here">Select Here</option>
                                        <option value="Mr.">Mr.</option>
                                        <option value="Ms.">Ms.</option>
                                        <option value="Mrs.">Mrs.</option>
                                        <option value="Dr.">Dr.</option>
                                    </select>
                                </div>
                                
                                <div className="col-span-1">
                                    <label className="block text-xs font-normal text-gray-700 mb-1">
                                        First Name <span className="text-red-500">*</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Enter first name"
                                    />
                                </div>
                                
                                <div className="col-span-1">
                                    <label className="block text-xs font-normal text-gray-700 mb-1">
                                        Surname <span className="text-red-500">*</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Enter surname"
                                    />
                                </div>
                                
                                <div className="col-span-1">
                                    <label className="block text-xs font-normal text-gray-700 mb-1">
                                        Designation <span className="text-red-500">*</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Enter designation"
                                    />
                                </div>
                                
                                <div className="col-span-1">
                                    <label className="block text-xs font-normal text-gray-700 mb-1">
                                        Email Address <span className="text-red-500">*</span>
                                    </label>
                                    <input 
                                        type="email" 
                                        className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Enter email address"
                                    />
                                </div>
                                
                                <div className="col-span-1">
                                    <label className="block text-xs font-normal text-gray-700 mb-1">
                                        Mobile No. <span className="text-red-500">*</span>
                                    </label>
                                    <input 
                                        type="tel" 
                                        className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Enter mobile number"
                                    />
                                </div>
                                
                                <div className="col-span-1">
                                    <div className="flex items-center gap-1 mb-1">
                                        <label className="text-xs font-normal text-gray-700">
                                            Alternate No.
                                        </label>
                                        {index === 0 ? (
                                            <button 
                                                type="button" 
                                                onClick={addnewgrid} 
                                                className="bg-green-500 hover:bg-green-600 text-white w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold transition-colors duration-200"
                                            >
                                                +
                                            </button>
                                        ) : (
                                            <button 
                                                type="button" 
                                                onClick={() => removegrid(addItem.id)} 
                                                className="bg-red-500 hover:bg-red-600 text-white w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold transition-colors duration-200"
                                            >
                                                -
                                            </button>
                                        )}
                                    </div>
                                    <input 
                                        type="tel" 
                                        className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Enter alternate number"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}

                    <hr className="my-4" />

                    {/* Footer Section */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-3">
                        <p className="text-xs text-gray-600 mb-3 sm:mb-0">
                            <span className="text-red-500 text-sm">*</span> Required Fields
                        </p>
                        <div className="flex gap-2">
                            <button className="px-4 py-1.5 text-xs bg-[#337ab7] hover:bg-[#286090] text-white rounded transition-colors duration-200 flex items-center gap-1">
                                Save <IoIosArrowDroprightCircle />
                            </button>
                            <button className="px-4 py-1.5 text-xs bg-red-600 hover:bg-red-700 text-white rounded transition-colors duration-200">
                                Reset
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page1;