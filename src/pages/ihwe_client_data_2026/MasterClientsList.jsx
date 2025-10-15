import React, { useRef, useState } from 'react';
import Globallytable from '../../Components/Globallytable';
import Textarea from '../../Components/Textarea';
import ClientOverview from '../../Components/ClientOverview';
import { useReactToPrint } from 'react-to-print';
import * as XLSX from 'xlsx';

const MasterClientsList = () => {
    const [selectedClient, setSelectedClient] = useState(null);
    const printref = useRef()

    // print function 
    
const handleprint = useReactToPrint({
   
    contentRef:printref,
    documentTitle:"Table Print",
    removeAfterPrint:true,
});

// Excel function with styling
const exportTableToExcel = () => {
    const table = printref.current.querySelector('table'); // Assumes Globallytable renders <table>
    if (!table) return;

    // Convert table to worksheet
    const workbook = XLSX.utils.table_to_book(table, { sheet: 'MasterClients' });

    // Access the first worksheet
    const worksheet = workbook.Sheets['MasterClients'];

    // Make headers bold
    const range = XLSX.utils.decode_range(worksheet['!ref']);
    for (let C = range.s.c; C <= range.e.c; ++C) {
        const cell_address = { c: C, r: 0 }; // First row = headers
        const cell_ref = XLSX.utils.encode_cell(cell_address);
        if (!worksheet[cell_ref]) continue;
        if (!worksheet[cell_ref].s) worksheet[cell_ref].s = {};
        worksheet[cell_ref].s.font = { bold: true };
    }

    // Auto-width for columns
    const colWidths = [];
    for (let C = range.s.c; C <= range.e.c; ++C) {
        let maxWidth = 10; // Minimum width
        for (let R = range.s.r; R <= range.e.r; ++R) {
            const cell_ref = XLSX.utils.encode_cell({ c: C, r: R });
            const cell = worksheet[cell_ref];
            if (cell && cell.v) {
                const length = cell.v.toString().length;
                if (length > maxWidth) maxWidth = length;
            }
        }
        colWidths.push({ wch: maxWidth + 2 }); // +2 for padding
    }
    worksheet['!cols'] = colWidths;

    XLSX.writeFile(workbook, 'MasterClientsList.xlsx');
};



     const columns = [
        { label: "Company Name", accessor: "company.name" },
        { label: "Contact Details", accessor: "company.detail" },
        { label: "Category", accessor: "category.main" },
        { label: "Nature", accessor: "nature.name" },
        { label: "State", accessor: "location.state" },
        { label: "City", accessor: "location.city" },
        { label: "Source", accessor: "source.type" },
        {label:"Status",accessor:"Status.name"},
        {label:"Subject", accessor:"subject.name"},
        { label: "Updated Details", accessor: "update.by" },
        { label: "Added Details", accessor: "added.By" },
    ];

   const rows = [
  {
    checkbox: true,
    company: { name: "Tentamus India Pvt. Ltd", detail: "labs@tentamus.com | +91 9848042002" },
    category: { main: "Organic Products" },
    nature: { name: "Manufacturer" },
    location: { state: "Telangana", city: "Hyderabad" },
    source: { type: "Local Visit" },
    Status: { name: "Active" },
    subject: { name: "Quality Testing Collaboration" },
    update: { by: "Sumit" },
    added: { By: "Admin" },
  },
  {
    checkbox: true,
    company: { name: "AgriLabs Pvt. Ltd", detail: "info@agrilabs.com | +91 9876543210" },
    category: { main: "Dairy" },
    nature: { name: "Manufacturer" },
    location: { state: "Delhi", city: "New Delhi" },
    source: { type: "Referral" },
    Status: { name: "Pending" },
    subject: { name: "Milk Testing Project" },
    update: { by: "Anita" },
    added: { By: "Ramesh" },
  },
  {
    checkbox: true,
    company: { name: "FreshFarms Ltd", detail: "contact@freshfarms.com | +91 9123456789" },
    category: { main: "Vegetables" },
    nature: { name: "Manufacturer" },
    location: { state: "Maharashtra", city: "Mumbai" },
    source: { type: "Exhibition" },
    Status: { name: "Follow-up" },
    subject: { name: "Export Supply Discussion" },
    update: { by: "Ravi" },
    added: { By: "Seema" },
  },
  {
    checkbox: true,
    company: { name: "BioCrop Sciences", detail: "support@biocrop.com | +91 9812345678" },
    category: { main: "Seeds" },
    nature: { name: "Manufacturer" },
    location: { state: "Gujarat", city: "Ahmedabad" },
    source: { type: "Conference" },
    Status: { name: "Active" },
    subject: { name: "Hybrid Seed Development" },
    update: { by: "Deepak" },
    added: { By: "Karan" },
  },
  {
    checkbox: true,
    company: { name: "GreenHarvest Pvt Ltd", detail: "info@greenharvest.com | +91 9876500000" },
    category: { main: "Fruits" },
    nature: { name: "Exporter" },
    location: { state: "Maharashtra", city: "Pune" },
    source: { type: "Trade Fair" },
    Status: { name: "Completed" },
    subject: { name: "Organic Mango Export Deal" },
    update: { by: "Alok" },
    added: { By: "Ritika" },
  },
  {
    checkbox: true,
    company: { name: "NutriAgro Foods", detail: "contact@nutriagro.com | +91 9999998888" },
    category: { main: "Processed Foods" },
    nature: { name: "Supplier" },
    location: { state: "Uttar Pradesh", city: "Lucknow" },
    source: { type: "Website" },
    Status: { name: "In Progress" },
    subject: { name: "Snack Distribution Contract" },
    update: { by: "Priya" },
    added: { By: "Manish" },
  },
  {
    checkbox: true,
    company: { name: "AgroChem Labs", detail: "sales@agrochem.com | +91 9123456000" },
    category: { main: "Chemicals" },
    nature: { name: "Distributor" },
    location: { state: "Tamil Nadu", city: "Chennai" },
    source: { type: "Dealer Network" },
    Status: { name: "Active" },
    subject: { name: "Pesticide Product Expansion" },
    update: { by: "Sonal" },
    added: { By: "Rohit" },
  },
  {
    checkbox: true,
    company: { name: "Healthy Harvesters", detail: "info@healthyharvest.com | +91 9012345678" },
    category: { main: "Grains" },
    nature: { name: "Wholesaler" },
    location: { state: "Rajasthan", city: "Jaipur" },
    source: { type: "Cold Call" },
    Status: { name: "Inactive" },
    subject: { name: "Organic Wheat Supply Proposal" },
    update: { by: "Raj" },
    added: { By: "Meena" },
  },
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
                    <div className="w-[97%] bg-white m-4">
                        
                        <div className='flex justify-between pt-1'>
                            <h1 className='text-base font-semibold text-gray-950 pl-4 pt-1'>MASTER CLIENTS LIST</h1>
                          <div className="flex flex-wrap justify-start md:justify-end gap-2 mb-1 pr-3">
                              <button
            onClick={handleprint}
            className="text-[#2f353b] h-8 w-14 text-xs text-center cursor-pointer hover:bg-black hover:text-white border border-[#2f353b]"
          >
            Print
          </button>
          <button
            onClick={exportTableToExcel}
            className="h-8 w-14 text-[#78a300] text-xs text-center cursor-pointer hover:bg-[#78a300] hover:text-white border border-[#78a300]"
          >
            Excel
          </button>
                          </div>
                        </div>
                        <hr className="opacity-10 mb-2" />
                        
                        <div ref={printref} className="text-xs print:text-sm print:block print:w-full print:overflow-visible">
                            <Globallytable rows={rows} colomns={columns} onRowClick={handleClientClick} extrabutton={false} />
                        </div>
                        
                    </div>
                    {/* The Textarea component is now placed outside of the table's container */}
                    <div className="bg-white shadow-md m-4 w-[97%]">
                        <Textarea />
                    </div>
                </>
            )}
        </div>
    );
};

export default MasterClientsList;
