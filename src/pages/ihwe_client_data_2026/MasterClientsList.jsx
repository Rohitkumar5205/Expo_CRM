import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Globallytable from "../../Components/Globallytable";
import Textarea from "../../Components/Textarea";
import ClientOverview from "../../Components/ClientOverview";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanies } from "../../features/company/companySlice";
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

  const dispatch = useDispatch();
  const { companies, loading, error } = useSelector((state) => state.companies);

  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch]);

const columns = [
    {
      label: "Company Name",
      accessor: "company.name",
      render: (value, row) => (
        <Link to={`/clientOverview1/${row.id}`} className="hover:underline text-blue-500">
          {value}
        </Link>
      ),
    },
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
const fallbackRows = [
  {
    id: 1,
    company: {
      name: "Tentamus India Pvt. Ltd",
      detail: "Rohit Sharma | +91-9876543210 | rohit@tentamus.com",
    },
    category: { main: "Food & Beverages" },
    nature: { name: "Manufacturer" },
    location: { state: "Delhi", city: "New Delhi" },
    source: { type: "Website Inquiry" },
    Status: { name: "Hot Client" },
    subject: { name: "Quality Check Follow-up" },
    update: { by: "Updated by Abhay Raj on 20 Sep 2025" },
    added: { By: "Added by Anita Verma on 15 Sep 2025" },
  },
  {
    id: 2,
    company: {
      name: "AgroTech Solutions",
      detail: "Priya Verma | +91-9876501234 | priya@agrotech.com",
    },
    category: { main: "Agriculture" },
    nature: { name: "Distributor" },
    location: { state: "Uttar Pradesh", city: "Lucknow" },
    source: { type: "Cold Call" },
    Status: { name: "Follow-up" },
    subject: { name: "Client Review Call" },
    update: { by: "Updated by Rishabh Singh on 18 Sep 2025" },
    added: { By: "Added by Rishabh Singh on 10 Sep 2025" },
  },
  {
    id: 3,
    company: {
      name: "Green Organics Ltd",
      detail: "Ankit Mehra | +91-9012345678 | ankit@greenorganics.com",
    },
    category: { main: "Organic Products" },
    nature: { name: "Exporter" },
    location: { state: "Maharashtra", city: "Mumbai" },
    source: { type: "Reference" },
    Status: { name: "Sent Details" },
    subject: { name: "Price Negotiation" },
    update: { by: "Updated by Tanya Jaiswal on 16 Sep 2025" },
    added: { By: "Added by Tanya Jaiswal on 05 Sep 2025" },
  },
  {
    id: 4,
    company: {
      name: "Herbal Life Care",
      detail: "Sunita Gupta | +91-9090909090 | sunita@herballife.com",
    },
    category: { main: "Healthcare" },
    nature: { name: "Retailer" },
    location: { state: "Rajasthan", city: "Jaipur" },
    source: { type: "Event Lead" },
    Status: { name: "New Client" },
    subject: { name: "Sample Dispatch" },
    update: { by: "Updated by Shimpi Rawat on 14 Sep 2025" },
    added: { By: "Added by Shimpi Rawat on 10 Sep 2025" },
  },
  {
    id: 5,
    company: {
      name: "Spice World Exporters",
      detail: "Arjun Yadav | +91-9123456789 | arjun@spiceworld.com",
    },
    category: { main: "Export" },
    nature: { name: "Exporter" },
    location: { state: "Kerala", city: "Kochi" },
    source: { type: "Walk-in" },
    Status: { name: "Not Interested" },
    subject: { name: "Contract Renewal" },
    update: { by: "Updated by Manoj Mishra on 10 Sep 2025" },
    added: { By: "Added by Manoj Mishra on 01 Sep 2025" },
  },
  {
    id: 6,
    company: {
      name: "BioPure Naturals",
      detail: "Kavita Joshi | +91-9811122233 | kavita@biopure.com",
    },
    category: { main: "Cosmetics" },
    nature: { name: "Manufacturer" },
    location: { state: "Maharashtra", city: "Pune" },
    source: { type: "Social Media" },
    Status: { name: "Interested" },
    subject: { name: "Product Testing" },
    update: { by: "Updated by Anjali Singh on 12 Oct 2025" },
    added: { By: "Added by Anjali Singh on 02 Oct 2025" },
  },
  {
    id: 7,
    company: {
      name: "Ayurveda Essentials",
      detail: "Rajesh Patel | +91-9823456789 | rajesh@ayurvedaessentials.com",
    },
    category: { main: "Wellness" },
    nature: { name: "Retailer" },
    location: { state: "Gujarat", city: "Ahmedabad" },
    source: { type: "Reference" },
    Status: { name: "Warm Client" },
    subject: { name: "Client Retention Follow-up" },
    update: { by: "Updated by Deepak Singh on 22 Oct 2025" },
    added: { By: "Added by Deepak Singh on 11 Oct 2025" },
  },
  {
    id: 8,
    company: {
      name: "EcoGrow Fertilizers",
      detail: "Meena Kumari | +91-9876001122 | meena@ecogrow.com",
    },
    category: { main: "Agriculture" },
    nature: { name: "Manufacturer" },
    location: { state: "Punjab", city: "Chandigarh" },
    source: { type: "Cold Email" },
    Status: { name: "Pending Follow-up" },
    subject: { name: "Quotation Request" },
    update: { by: "Updated by Vishal Tiwari on 02 Nov 2025" },
    added: { By: "Added by Vishal Tiwari on 20 Oct 2025" },
  },
];

const dynamicRows =
  companies?.map((c) => ({
    id: c._id,
    company: {
      name: c.companyName || "N/A",
      detail:
        c.contacts?.length > 0
          ? c.contacts
              .map((ct) => `${ct.firstName} ${ct.surname} | ${ct.mobile}`)
              .join(", ")
          : "No Contacts",
    },
    category: { main: c.category || "Uncategorized" },
    nature: { name: c.businessNature || "Unknown" },
    location: { state: c.state || "-", city: c.city || "-" },
    source: { type: c.dataSource || "Manual Entry" },
    Status: { name: c.status || "Pending" },
    subject: { name: c.subject || "No Subject" },
    update: {
      by: `${
        new Date(c.updatedAt).toLocaleDateString() || "-"
      } | ${c.updatedBy || "System"}`,
    },
    added: {
      By: `${
        new Date(c.createdAt).toLocaleDateString() || "-"
      } | ${c.createdBy || "System"}`,
    },
  })) || [];

const rows = dynamicRows && dynamicRows.length > 0 ? dynamicRows : fallbackRows;


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
                            <Globallytable rows={rows} colomns={columns} onRowClick={handleClientClick} extrabutton={false} specificColor={false} />
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
