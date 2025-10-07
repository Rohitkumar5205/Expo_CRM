import React, { useState } from 'react';
import Globallytable from '../Components/Globallytable';
import Textarea from '../Components/Textarea';
import ClientOverview from '../Components/ClientOverview';

const Page4 = () => {
    const [selectedClient, setSelectedClient] = useState(null);

     const columns = [
        { label: "Client Name", accessor: "Client.name" }, 
        { label: "Contact Details", accessor: "contact.details" },
        { label: "Category", accessor: "category.main" },
        { label: "City", accessor: "location.city" },
        { label: "State", accessor: "location.state" },
         { label: "Source", accessor: "source.type" },
         { label: "Status", accessor: "Status" },
         { label: "Event", accessor: "Event.type" },
        { label: "Document No.", accessor: "Document.number" },
        { label: "Updated Details", accessor: "Updated.detail" },  
    ];

  const rows = [
  {
    Client: { name: "Ravi Sharma" },
    contact: { details: "ravi.sharma@example.com | +91-9876543210" },
    category: { main: "Pharmaceuticals" },
    location: { city: "Mumbai", state: "Maharashtra" },
    source: { type: "Website Inquiry" },
    Status: "Active",
    Event: { type: "Pharma Expo 2025" },
    Document: { number: "DOC-1001" },
    Updated: { detail: "Updated by Neha Verma on 20 Sep 2025" },
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
                                CLIENT DATA 2023
                            </h1>
                        </div>
                    </div>
                    <div className="w-full bg-white mx-4 my-6">
                        
                        <div className='flex justify-between pr-4 pt-1' >
                            <h1 className='text-md font-semibold text-[#4f5a67] pl-4 pt-1'>HOT CLIENT LIST</h1>
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

export default Page4;
