import React, { useState } from 'react';
import { FaEdit, FaPrint, FaTrash } from 'react-icons/fa';
import PaymentsComponent from './PaymentsComponent'; 
import CreateEstimateComponent from './CreateEstimateComponent'; 
import CreditNoteComponent from './CreditNoteComponent'; 
import { Link } from 'react-router-dom';


 const stylebutton="text-[#3598dc] cursor-pointer border border-[#3598dc] hover:bg-[#3598dc] hover:text-white font-medium flex items-center gap-1 px-1"

// This is the table component to display estimate details.
const EstimateTable = () => {
    
  

    // function to pass heading
   
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
                <thead className="border  border-gray-300">
                    <tr>
                        <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-black uppercase tracking-wider">
                            S.No.
                        </th>
                        <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-black uppercase tracking-wider">
                            Estimate Details
                        </th>
                        <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-black uppercase tracking-wider">
                            Performa Inv.
                        </th>
                        <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-black uppercase tracking-wider">
                            Invoice Details
                        </th>
                        <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-black uppercase tracking-wider">
                            Print
                        </th>
                        <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-black uppercase tracking-wider">
                            Updated Details
                        </th>
                        <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-black uppercase tracking-wider">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white border border-gray-300">
                    {/* Sample Row */}
                    <tr>
                        <td className="border border-gray-300 px-4 py-2 whitespace-nowrap text-xs text-black">1</td>
                        <td className="border border-gray-300 px-4 py-2 whitespace-now-wrap text-xs text-black"><Link to='/performaInvoicemain'><button className='text-[#3598dc] cursor-pointer hover:text-[#566e7d] font-medium flex items-center gap-1 px-1'>NGW/24-25/EST/019 </button></Link>| 21 Dec 24 | 53100</td>
                        <td className="border border-gray-300 px-4 py-2 whitespace-nowrap text-xs text-black">
                            <Link to='/performaInvoice'><button className="text-[#3598dc] cursor-pointer hover:text-blue-900 font-medium">NGW/25-26/PI/116 | 06 Sep 25 | 70800</button></Link>
                        </td>
                        
                        <td className="border border-gray-300 px-4 py-2 whitespace-nowrap text-xs text-black ">
                            <Link to="/invoice" className='flex justify-center'><button className={stylebutton}>
                                Create INV
                            </button></Link>
                        </td>
                        <td className="border border-gray-300 px-4 py-2 whitespace-nowrap text-xs text-black"></td>
                        <td className="border border-gray-300 px-4 py-2 whitespace-nowrap text-xs text-black">2025-09-25</td>
                        <td className=" border border-gray-300 px-4 py-2 whitespace-nowrap text-xs font-medium flex gap-2">
                            
                            <button className=" border border-gray-300 text-red-600 hover:text-red-900 px-2 cursor-pointer">
                                x
                            </button>
                        </td>
                    </tr>
  <tr>
                        <td className="border border-gray-300 px-4 py-2 whitespace-nowrap text-xs text-black">1</td>
                        <td className="border border-gray-300 px-4 py-2 whitespace-now-wrap text-xs text-black"> <Link to='/performaInvoicemain'><button className='text-[#3598dc] cursor-pointer hover:text-[#566e7d] font-medium flex items-center gap-1 px-1'>NGW/24-25/EST/019 </button></Link> | 21 Dec 24 | 53100</td>
                        <td className="border border-gray-300 px-4 py-2 whitespace-nowrap text-xs text-black">
                            <Link to='/performaInvoice'><button className="text-[#3598dc] cursor-pointer hover:text-blue-900 font-medium">NGW/25-26/PI/116 | 06 Sep 25 | 70800</button></Link>
                        </td>
                        
                        <td className="border border-gray-300 px-4 py-2 whitespace-nowrap text-xs text-black">
                            
                                NGW/INV/24-25/026 | 19 Feb 25 | 53100
                            
                        </td>
                        <td className="border border-gray-300 px-2 py-2 whitespace-nowrap text-xs text-black ">
                           <div className='flex justify-between gap-1'> 
                            <Link to='/performabutton' state={{ heading: "Original Copy" }}><button  className={stylebutton}>O</button></Link>
                            <Link to='/performabutton' state={{ heading: "Duplicate Copy" }}><button  className={stylebutton}>D</button></Link>
                            <Link to='/performabutton' state={{ heading: "Triplicate Copy" }}><button  className={stylebutton}>T</button></Link>
                            </div>
                        </td>
                        <td className="border border-gray-300 px-4 py-2 whitespace-nowrap text-xs text-black">2025-09-25</td>
                        <td className="border border-gray-300 px-4 py-2 whitespace-nowrap text-xs font-medium flex gap-2">
                            
                            <button className="border border-gray-300 text-red-600 hover:text-red-900 px-2 cursor-pointer">
                                x
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

// Main AccountsComponent
const AccountsComponent = ({ onBackToOverview, client }) => {
    const companyName = client?.company?.name || 'Loading Company...';

    // State to toggle between the different views
    const [currentView, setCurrentView] = useState('estimates'); // 'estimates', 'payments', 'createEstimate', or 'creditNote'

    const handleCreateEstimate = () => {
        setCurrentView('createEstimate');
    };

    const handleViewPayments = () => {
        setCurrentView('payments');
    };
    
    // New handler for Credit Note
    const handleViewCreditNote = () => {
        setCurrentView('creditNote');
    }

    const handleCancel = () => {
        setCurrentView('estimates');
    };

    const renderContent = () => {
        if (currentView === 'createEstimate') {
            return <CreateEstimateComponent onCancel={handleCancel} />;
        } else if (currentView === 'payments') {
            return <PaymentsComponent onBackToOverview={onBackToOverview} client={client} onBackToAccounts={handleCancel} />;
        } else if (currentView === 'creditNote') {
            return <CreditNoteComponent onCancel={handleCancel} />; // <-- RENDER THE NEW COMPONENT
        } else {
            return (
                <div className="bg-white shadow-md p-2 rounded-md w-full">
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
                        <h2 className="text-lg  text-gray-700 mb-2 sm:mb-0">
                            {companyName} Information
                        </h2>
                        <div className="flex flex-wrap gap-2 justify-center">
                            <button
                                onClick={handleCreateEstimate}
                                className="bg-white text-black border border-gray-400 hover:bg-gray-200 px-3 py-1.5 rounded-sm text-xs font-medium cursor-pointer"
                            >
                                Create Estimate
                            </button>
                            <button
                                onClick={handleViewPayments} // Updated handler
                                className="bg-[#337ab7] text-white px-3 py-1.5 rounded-sm text-xs font-medium cursor-pointer"
                            >
                                Payments
                            </button>
                            <button 
                                onClick={handleViewCreditNote} // <-- NEW ONCLICK
                                className="bg-white text-black border border-gray-400 hover:bg-gray-200 px-3 py-1.5 rounded-sm text-xs font-medium cursor-pointer" // <-- UPDATED CLASSES
                            >
                                Credit Note
                            </button>
                        </div>
                    </div>
                    {/* Table */}
                    <EstimateTable />
                </div>
            );
        }
    };

    return (
        <div className="w-full h-auto bg-[#eef1f5]">
            {/* Header Section */}
            <div className="w-full bg-white shadow-md flex flex-col sm:flex-row justify-between items-center px-4 py-1">
                <h1 className="text-xl font-semibold text-gray-700 mb-2 sm:mb-0">
                    ACCOUNT SECTION | ESTIMATE
                </h1>
                <div className="flex flex-wrap gap-2 justify-center">
                    <button onClick={onBackToOverview} className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1.5 rounded-sm text-xs font-medium cursor-pointer">
                        Back to Overview
                    </button>
                    <button className="bg-[#337ab7] hover:bg-blue-700 text-white px-3 py-1.5 rounded-sm text-xs font-medium cursor-pointer">
                        Add Client
                    </button>
                    <button className="bg-[#337ab7] hover:bg-blue-700 text-white px-3 py-1.5 rounded-sm text-xs font-medium cursor-pointer">
                        Master List
                    </button>
                </div>
            </div>

            {/* Main content area */}
            <div className="flex flex-col m-4 gap-4">
                {renderContent()}
            </div>
        </div>
    );
};

export default AccountsComponent;