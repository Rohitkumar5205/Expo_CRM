import React, { useRef, useState } from 'react';
import Globallytable from '../../Components/Globallytable';
import ClientOverview from '../../Components/ClientOverview';
import { useReactToPrint } from 'react-to-print';
import * as XLSX from 'xlsx';
import { useNavigate } from 'react-router-dom';

const ReminderList = () => {
    const [selectedClient, setSelectedClient] = useState(null);
       const printref = useRef()
   
       // print function 
       
   const handleprint = useReactToPrint({
      
       contentRef:printref,
       documentTitle:"Table Print",
       removeAfterPrint:true,
   });
   // useNavigation call
   const navigation = useNavigate(); 

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
           { label: "Subject", accessor: "subject.name" },
           { label: "Company Name", accessor: "company.name" },
           { label: "Contact Details", accessor: "company.detail" },
           { label: "Reminder Description", accessor: "reminder.description" },
           { label: "Reminder Date", accessor: "reminder.date" },
           { label: "Forword To", accessor: "forwardto.name" },
           { label: "DealBy", accessor: "dealby.name" },
       ];
   
    const rows = [
  {
    subject: { name: "Product Quality Follow-up" },
    company: { name: "AgriLife Pvt. Ltd", detail: "info@agrilife.com | +91 9876543210" },
    reminder: { description: "Call client regarding test report feedback", date: "2025-11-05" },
    forwardto: { name: "Rohit Sharma" },
    dealby: { name: "Anita Verma" },
  },
  {
    subject: { name: "Annual Renewal Reminder" },
    company: { name: "GreenGrow Ltd", detail: "support@greengrow.com | +91 9765432109" },
    reminder: { description: "Renew service agreement for next year", date: "2025-11-07" },
    forwardto: { name: "Deepak Singh" },
    dealby: { name: "Priya Nair" },
  },
  {
    subject: { name: "Invoice Payment Follow-up" },
    company: { name: "BioCrop Solutions", detail: "accounts@biocrop.com | +91 9912345678" },
    reminder: { description: "Check payment status for last invoice", date: "2025-11-10" },
    forwardto: { name: "Karan Patel" },
    dealby: { name: "Ravi Kumar" },
  },
  {
    subject: { name: "Meeting for New Product Launch" },
    company: { name: "FreshFoods India", detail: "contact@freshfoods.com | +91 9087654321" },
    reminder: { description: "Discuss promotional strategy and pricing", date: "2025-11-12" },
    forwardto: { name: "Meena Joshi" },
    dealby: { name: "Vikas Yadav" },
  },
  {
    subject: { name: "Client Visit Reminder" },
    company: { name: "NutriFarm Organics", detail: "sales@nutrifarm.com | +91 9012345678" },
    reminder: { description: "On-site client visit for inspection", date: "2025-11-15" },
    forwardto: { name: "Alok Pandey" },
    dealby: { name: "Ritu Sharma" },
  },
  {
    subject: { name: "Quotation Follow-up" },
    company: { name: "AgroChem Labs", detail: "sales@agrochem.com | +91 9823456780" },
    reminder: { description: "Confirm quotation approval from client", date: "2025-11-18" },
    forwardto: { name: "Manish Gupta" },
    dealby: { name: "Sonal Mehta" },
  },
  {
    subject: { name: "Feedback on Sample Sent" },
    company: { name: "FarmFresh Exports", detail: "exports@farmfresh.com | +91 9934567890" },
    reminder: { description: "Ask for feedback on mango samples", date: "2025-11-20" },
    forwardto: { name: "Rajesh Singh" },
    dealby: { name: "Tanya Agarwal" },
  },
  {
    subject: { name: "Contract Discussion" },
    company: { name: "OrganicRoots Pvt. Ltd", detail: "info@organicroots.com | +91 9998765432" },
    reminder: { description: "Discuss long-term contract renewal terms", date: "2025-11-22" },
    forwardto: { name: "Suresh Kumar" },
    dealby: { name: "Neha Kapoor" },
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
                   <div className="w-full bg-white  mb-4">
                        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between px-5 py-1.5">
                            <h1 className="text-xl  text-gray-700 mb-2 lg:mb-0">
                                CLIENT REMINDERS
                            </h1>
                            <button onClick={()=>navigation("/notification/reminderList/upcomingList")} className='px-3 py-1.5 bg-[#78a300] hover:bg-[#bcbfb5] text-white text-[13px] font-normal'>Upcoming Reminder</button>
                        </div>
                    </div>
                    <div className="w-[97%] bg-white m-4 mb-40">
                        
                        <div className='flex justify-between pt-1'>
                            <h1 className='text-base font-semibold text-gray-600 pl-4 pt-1'>REMINDER LIST</h1>
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
                            <Globallytable rows={rows} colomns={columns} onRowClick={handleClientClick} extrabutton={false} specificColor={true} />
                        </div>
                        
                    </div>
                    
                </>
            )}
        </div>
    );
};

export default ReminderList;

