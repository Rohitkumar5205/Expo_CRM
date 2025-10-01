import React, { useState } from 'react';
import { FaEdit, FaPrint, FaTrash } from 'react-icons/fa';
import PaymentsComponent from './PaymentsComponent'; 
import CreateEstimateComponent from './CreateEstimateComponent'; 
import CreditNoteComponent from './CreditNoteComponent'; 

// This is the table component to display estimate details.
const EstimateTable = () => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-900">
                <thead className="bg-gray-300">
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
                <tbody className="bg-white divide-y divide-gray-200">
                    {/* Sample Row */}
                    <tr>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-black">1</td>
                        <td className="px-4 py-2 whitespace-now-wrap text-sm text-black">Estimate #2025-001</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-black">
                            <button className="text-blue-600 hover:text-blue-900 font-medium">View Performa</button>
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-black">Invoice #INV-001</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-black">
                            <button className="text-blue-600 hover:text-blue-900 font-medium flex items-center gap-1">
                                <FaPrint /> Print
                            </button>
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-black">2025-09-25</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm font-medium flex gap-2">
                            <button className="text-blue-600 hover:text-blue-900">
                                <FaEdit />
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                                <FaTrash />
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
                        <h2 className="text-lg font-semibold text-gray-700 mb-2 sm:mb-0">
                            {companyName} Information
                        </h2>
                        <div className="flex flex-wrap gap-2 justify-center">
                            <button
                                onClick={handleCreateEstimate}
                                className="bg-white text-black border border-gray-400 hover:bg-gray-200 px-3 py-1.5 rounded-sm text-sm font-medium cursor-pointer"
                            >
                                Create Estimate
                            </button>
                            <button
                                onClick={handleViewPayments} // Updated handler
                                className="bg-[#337ab7] text-white px-3 py-1.5 rounded-sm text-sm font-medium cursor-pointer"
                            >
                                Payments
                            </button>
                            <button 
                                onClick={handleViewCreditNote} // <-- NEW ONCLICK
                                className="bg-white text-black border border-gray-400 hover:bg-gray-200 px-3 py-1.5 rounded-sm text-sm font-medium cursor-pointer" // <-- UPDATED CLASSES
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
            <div className="w-full bg-white shadow-md border-b flex flex-col sm:flex-row justify-between items-center px-4 py-3">
                <h1 className="text-xl font-semibold text-gray-700 mb-2 sm:mb-0">
                    ACCOUNT SECTION | ESTIMATE
                </h1>
                <div className="flex flex-wrap gap-2 justify-center">
                    <button onClick={onBackToOverview} className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1.5 rounded-sm text-sm font-medium cursor-pointer">
                        Back to Overview
                    </button>
                    <button className="bg-[#337ab7] hover:bg-blue-700 text-white px-3 py-1.5 rounded-sm text-sm font-medium cursor-pointer">
                        Add Client
                    </button>
                    <button className="bg-[#337ab7] hover:bg-blue-700 text-white px-3 py-1.5 rounded-sm text-sm font-medium cursor-pointer">
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