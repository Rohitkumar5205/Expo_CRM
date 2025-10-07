import React, { useState } from 'react';
import Globallytable from '../Components/Globallytable';
import Textarea from '../Components/Textarea';
import ClientOverview from '../Components/ClientOverview';

const Page3 = () => {
    const [selectedClient, setSelectedClient] = useState(null);

    const columns = [
        { label: "Company Name", accessor: "company.name" }, 
        { label: "Contact Details", accessor: "contact.details" },
        { label: "Category", accessor: "category.main" },
        { label: "Nature Bussiness", accessor: "Nature Bussiness" },
        { label: "Business Type", accessor: "Bussiness.type" },
        { label: "City", accessor: "location.city" },
        { label: "State", accessor: "location.state" },
        { label: "Source", accessor: "source.type" },
        { label: "Status", accessor: "Status" },
        { label: "Event", accessor: "Event.type" },
        { label: "Update Details", accessor: "Update.detail" },
    ];

   const rows = [
  {
    company: { name: "Tentamus India Pvt. Ltd" },
    contact: { details: "Rohit Sharma | +91-9876543210 | rohit@tentamus.com" },
    category: { main: "Food & Beverages" },
    "Nature Bussiness": "Manufacturing",
    Bussiness: { type: "Private Limited" },
    location: { city: "New Delhi", state: "Delhi" },
    source: { type: "Website Inquiry" },
    Status: "Warm Client",
    Event: { type: "Organic Expo 2026" },
    Update: { detail: "Updated by Abhay Raj on 20 Sep 2025" },
  },
  {
    company: { name: "AgroTech Solutions" },
    contact: { details: "Priya Verma | +91-9876501234 | priya@agrotech.com" },
    category: { main: "Agriculture" },
    "Nature Bussiness": "Trading",
    Bussiness: { type: "Proprietorship" },
    location: { city: "Lucknow", state: "Uttar Pradesh" },
    source: { type: "Cold Call" },
    Status: "Follow-up Call",
    Event: { type: "Agri India Expo 2025" },
    Update: { detail: "Updated by Rishabh Singh on 18 Sep 2025" },
  },
  {
    company: { name: "Green Organics Ltd" },
    contact: { details: "Ankit Mehra | +91-9012345678 | ankit@greenorganics.com" },
    category: { main: "Organic Products" },
    "Nature Bussiness": "Distributor",
    Bussiness: { type: "Public Limited" },
    location: { city: "Mumbai", state: "Maharashtra" },
    source: { type: "Reference" },
    Status: "Sent Details",
    Event: { type: "Organic Expo 2026" },
    Update: { detail: "Updated by Tanya Jaiswal on 16 Sep 2025" },
  },
  {
    company: { name: "Herbal Life Care" },
    contact: { details: "Sunita Gupta | +91-9090909090 | sunita@herballife.com" },
    category: { main: "Healthcare" },
    "Nature Bussiness": "Retail" ,
    Bussiness: { type: "Partnership" },
    location: { city: "Jaipur", state: "Rajasthan" },
    source: { type: "Event Lead" },
    Status: "New Client",
    Event: { type: "Health Expo 2025" },
    Update: { detail: "Updated by Shimpi Rawat on 14 Sep 2025" },
  },
  {
    company: { name: "Spice World Exporters" },
    contact: { details: "Arjun Yadav | +91-9123456789 | arjun@spiceworld.com" },
    category: { main: "Export" },
    "Nature Bussiness": "Exporter",
    Bussiness: { type: "LLP" },
    location: { city: "Kochi", state: "Kerala" },
    source: { type: "Walk-in" },
    Status: "Not Interested",
    Event: { type: "International Trade Fair 2025" },
    Update: { detail: "Updated by Manoj Mishra on 10 Sep 2025" },
  }
];


    const handleClientClick = (clientData) => {
        setSelectedClient(clientData);
    };

    const handleBackClick = () => {
        setSelectedClient(null);
    };

    return (
        <div className="w-full h-auto bg-[#eef1f5]">
            {selectedClient ? (
                // When a client is selected, show only the ClientOverview component
                <ClientOverview client={selectedClient} onBack={handleBackClick} />
            ) : (
                // When no client is selected, show the list and the Textarea below it
                <>
                    <div className="w-full bg-white shadow-md mb-4">
                        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between px-4 py-1">
                            <h1 className="text-xl  text-gray-700 mb-2 lg:mb-0">
                             CLIENT DATA 2025
                            </h1>
                        </div>
                    </div>
                    <div className="w-full bg-white mx-4 my-6">
                        
                        <div className='flex justify-between pr-4 pt-1' >
                            <h1 className='text-md font-semibold text-[#4f5a67] pl-4 pt-1'>WARM CLIENT LIST</h1>
                           <div className="flex flex-wrap justify-start md:justify-end gap-2 mb-1">
                             <button className="bg-[#337ab7] hover:bg-[#286090] text-white px-2.5 py-1  text-sm font-medium">
                                Add New Lead
                            </button>
                            <button className="bg-[#337ab7] hover:bg-[#286090] text-white px-2.5 py-1  text-sm font-medium">
                                Warm Client
                            </button>
                            <button className="bg-[#337ab7] hover:bg-[#286090] text-white px-2.5 py-1  text-sm font-medium">
                                Hot Client
                            </button>
                            <button className="bg-[#337ab7] hover:bg-[#286090] text-white px-2.5 py-1  text-sm font-medium">
                                Confirm Client
                            </button>
                            <button className="bg-[#337ab7] hover:bg-[#286090] text-white px-2.5 py-1  text-sm font-medium">
                                Cold Client
                            </button>
                            <button className="bg-[#337ab7] hover:bg-[#286090] text-white px-2.5 py-1  text-sm font-medium">
                                Raw Data List
                            </button>
                           </div>
                        </div>
                        <hr className="opacity-10 mb-2" />
                        <div className="text-xs">
                            <Globallytable rows={rows} colomns={columns} onRowClick={handleClientClick} />
                        </div>
                    </div>
                    {/* The Textarea component is now placed outside of the table's container */}
                    <div className="bg-white shadow-md m-4 p-4 rounded-md w-full">
                        <Textarea />
                    </div>
                </>
            )}
        </div>
    );
};

export default Page3;