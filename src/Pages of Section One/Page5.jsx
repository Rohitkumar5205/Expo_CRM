import React, { useState } from 'react';
import Globallytable from '../Components/Globallytable';
import Textarea from '../Components/Textarea';
import ClientOverview from '../Components/ClientOverview';

const Page5 = () => {
    const [selectedClient, setSelectedClient] = useState(null);

    const columns = [
        { label: "Company Name", accessor: "company.name" }, 
        { label: "Contact Details", accessor: "contact.details" },
        { label: "Category", accessor: "category.main" },
        { label: "Nature", accessor: "Nature.name" },
        { label: "City", accessor: "location.city" },
        { label: "State", accessor: "location.state" },
        { label: "Size", accessor: "size.number" },
        { label: "Subject", accessor: "Subject.name" },
        { label: "Source", accessor: "source.type" },
        { label: "Status", accessor: "Status.name" },
        { label: "DealBy", accessor: "deal.by" },
        { label: "Update Details", accessor: "Update.detail" },
        
    ];


 const rows = [
  {
    company: { name: "TechVision Pvt. Ltd." },
    contact: { details: "info@techvision.com, +91-9876543210" },
    category: { main: "IT Services" },
    Nature: { name: "Software Development" },
    location: { city: "Bangalore", state: "Karnataka" },
    size: { number: "200+" },
    Subject: { name: "AI Integration" },
    source: { type: "Website" },
    Status: { name: "Active" },
    deal: { by: "Mr. Sharma" },
    Update: { detail: "Follow-up call scheduled" }
  },
  {
    company: { name: "GreenLeaf Organics" },
    contact: { details: "contact@greenleaf.in, +91-9988776655" },
    category: { main: "Agriculture" },
    Nature: { name: "Organic Farming" },
    location: { city: "Pune", state: "Maharashtra" },
    size: { number: "50+" },
    Subject: { name: "Sustainable Crops" },
    source: { type: "Referral" },
    Status: { name: "Pending" },
    deal: { by: "Ms. Verma" },
    Update: { detail: "Requested product catalog" }
  },
  {
    company: { name: "Skyline Constructions" },
    contact: { details: "sales@skyline.com, +91-9123456789" },
    category: { main: "Real Estate" },
    Nature: { name: "Infrastructure" },
    location: { city: "Hyderabad", state: "Telangana" },
    size: { number: "500+" },
    Subject: { name: "Smart City Projects" },
    source: { type: "Cold Call" },
    Status: { name: "Interested" },
    deal: { by: "Mr. Khan" },
    Update: { detail: "Shared proposal documents" }
  },
  {
    company: { name: "MediCare Solutions" },
    contact: { details: "support@medicare.com, +91-9786543210" },
    category: { main: "Healthcare" },
    Nature: { name: "Medical Equipment" },
    location: { city: "Chennai", state: "Tamil Nadu" },
    size: { number: "120+" },
    Subject: { name: "Hospital Equipment" },
    source: { type: "Event" },
    Status: { name: "Active" },
    deal: { by: "Dr. Mehta" },
    Update: { detail: "Demo arranged" }
  },
  {
    company: { name: "EduSmart Technologies" },
    contact: { details: "hello@edusmart.com, +91-9345678901" },
    category: { main: "Education" },
    Nature: { name: "E-learning" },
    location: { city: "Delhi", state: "Delhi" },
    size: { number: "80+" },
    Subject: { name: "Learning Platforms" },
    source: { type: "LinkedIn" },
    Status: { name: "Pending" },
    deal: { by: "Ms. Kapoor" },
    Update: { detail: "Follow-up scheduled" }
  },
  {
    company: { name: "AquaPure Systems" },
    contact: { details: "sales@aquapure.com, +91-9654321876" },
    category: { main: "Water Solutions" },
    Nature: { name: "Purification Systems" },
    location: { city: "Ahmedabad", state: "Gujarat" },
    size: { number: "60+" },
    Subject: { name: "Industrial Filters" },
    source: { type: "Distributor" },
    Status: { name: "Active" },
    deal: { by: "Mr. Patel" },
    Update: { detail: "Quotation sent" }
  },
  {
    company: { name: "AutoDrive Motors" },
    contact: { details: "contact@autodrive.com, +91-9123987654" },
    category: { main: "Automobile" },
    Nature: { name: "Car Manufacturing" },
    location: { city: "Mumbai", state: "Maharashtra" },
    size: { number: "1000+" },
    Subject: { name: "EV Vehicles" },
    source: { type: "Website" },
    Status: { name: "Interested" },
    deal: { by: "Mr. Desai" },
    Update: { detail: "Test drive requested" }
  },
  {
    company: { name: "FinServe Capital" },
    contact: { details: "info@finserve.com, +91-9345098765" },
    category: { main: "Finance" },
    Nature: { name: "Investment Advisory" },
    location: { city: "Kolkata", state: "West Bengal" },
    size: { number: "300+" },
    Subject: { name: "Wealth Management" },
    source: { type: "Email Campaign" },
    Status: { name: "Pending" },
    deal: { by: "Mr. Roy" },
    Update: { detail: "Presentation scheduled" }
  },
  {
    company: { name: "Foodies Hub Pvt. Ltd." },
    contact: { details: "support@foodieshub.com, +91-9456123789" },
    category: { main: "Food & Beverages" },
    Nature: { name: "Restaurant Chain" },
    location: { city: "Jaipur", state: "Rajasthan" },
    size: { number: "150+" },
    Subject: { name: "Franchise Expansion" },
    source: { type: "Event" },
    Status: { name: "Active" },
    deal: { by: "Chef Arora" },
    Update: { detail: "Franchise inquiry received" }
  },
  {
    company: { name: "NextGen Robotics" },
    contact: { details: "hello@nextgenrobotics.com, +91-9765432189" },
    category: { main: "Robotics" },
    Nature: { name: "AI & Automation" },
    location: { city: "Gurugram", state: "Haryana" },
    size: { number: "90+" },
    Subject: { name: "Industrial Robots" },
    source: { type: "LinkedIn" },
    Status: { name: "Interested" },
    deal: { by: "Ms. Nair" },
    Update: { detail: "Product demo scheduled" }
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
                    <div className="w-full bg-white shadow-md ">
                        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between px-4 py-1">
                            <h1 className="text-xl  text-gray-700 mb-2 lg:mb-0">
                                CLIENT DATA 2023
                            </h1>
                        </div>
                    </div>
                    <div className="w-full bg-white mx-4 my-6">
                        
                        <div className='flex justify-between pr-4 pt-1' >
                            <h1 className='text-md text-[#4f5a67] pl-4 pt-1 font-semibold'>CONFIRM CLIENT LIST</h1>
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

export default Page5;