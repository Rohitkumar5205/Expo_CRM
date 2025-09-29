import React, { useState } from "react";
import PaymentDetailsTable from "./PaymentDetailsTable";
import HeaderComponent from "./HeaderComponent";

const PaymentsComponent = ({ client, onBack }) => {
  const clientName = client?.company?.name || "Loading Company...";

  // State to manage visibility for "Advance PYMT" and "Running PYMT" fields
  const [showAdvanceFields, setShowAdvanceFields] = useState(false);

  // State to manage visibility for "Card Payments" fields
  const [showCardFields, setShowCardFields] = useState(false);

  // State for e-Wallet fields
  const [showEwalletFields, setShowEwalletFields] = useState(false);

  // State for NEFT/RTGS fields
  const [showNeftFields, setShowNeftFields] = useState(false);

  // State for UPI fields
  const [showUpiFields, setShowUpiFields] = useState(false);

  // New state to manage modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to handle the change in 'Type of Payment' dropdown
  const handlePaymentTypeChange = (event) => {
    const selectedValue = event.target.value;

    if (selectedValue === "Advance PYMT" || selectedValue === "Running PYMT") {
      setShowAdvanceFields(true);
    } else {
      setShowAdvanceFields(false);
    }
  };

  // Function to handle the change in 'Payment Mode' dropdown
  const handlePaymentModeChange = (event) => {
    const selectedValue = event.target.value;

    // Reset all payment mode fields visibility first
    setShowCardFields(false);
    setShowEwalletFields(false);
    setShowNeftFields(false);
    setShowUpiFields(false);

    // Set visibility based on the new selection
    if (selectedValue === "Card Payments") {
      setShowCardFields(true);
    } else if (selectedValue === "e-Wallet Payments") {
      setShowEwalletFields(true);
    } else if (selectedValue === "NEFT/RTGS Payments") {
      setShowNeftFields(true);
    } else if (selectedValue === "UPI Payments") {
      setShowUpiFields(true);
    }
  };

  return (
    <div className="w-full h-auto bg-[#eef1f5]">
      <HeaderComponent
        title="PAYMENT SECTION"
        buttons={[{ label: "Back to Overview", onClick: onBack }]}
      />
      <div className="flex flex-col gap-4">
        <div className="bg-white shadow-md p-4 rounded-md w-full">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Add Payments</h2>

          {/* Inputs grid */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-3 mb-4">
            {/* Row 1 */}
            <div className="flex flex-col">
              <label className="text-[10px] text-gray-600 font-medium mb-1">
                PYMT Against For *
              </label>
              <select className="border border-gray-300 px-2 text-xs rounded-sm h-8 font-medium">
                <option className="font-medium">Select Here</option>
                <option className="font-medium">Performa Invoice</option>
                <option className="font-medium">Invoice</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-[10px] text-gray-600 font-medium mb-1">
                Document No. *
              </label>
              <select className="border border-gray-300 px-2 text-xs rounded-sm h-8 font-medium">
                <option className="font-medium">Select Here</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-[10px] text-gray-600 font-medium mb-1">
                Final Amount
              </label>
              <input
                type="text"
                className="border border-gray-300 px-2 text-xs rounded-sm h-8"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-[10px] text-gray-600 font-medium mb-1">
                Recieved Amount *
              </label>
              <input
                type="text"
                className="border border-gray-300 px-2 text-xs rounded-sm h-8"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-[10px] text-gray-600 font-medium mb-1">
                TDS Amount
              </label>
              <input
                type="text"
                className="border border-gray-300 px-2 text-xs rounded-sm h-8"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-[10px] text-gray-600 font-medium mb-1">
                Recieved Date *
              </label>
              <input
                type="date"
                className="border border-gray-300 px-2 text-xs rounded-sm h-8"
                defaultValue={new Date().toISOString().split("T")[0]}
              />
            </div>

            {/* Row 2 */}
            <div className="flex flex-col">
              <label className="text-[10px] text-gray-600 font-medium mb-1">
                Debit Note No.
              </label>
              <input
                type="text"
                className="border border-gray-300 px-2 text-xs rounded-sm h-8"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-[10px] text-gray-600 font-medium mb-1">
                Debit Note Amount
              </label>
              <input
                type="text"
                className="border border-gray-300 px-2 text-xs rounded-sm h-8"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-[10px] text-gray-600 font-medium mb-1">
                Debit Note Date
              </label>
              <input
                type="date"
                className="border border-gray-300 px-2 text-xs rounded-sm h-8"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-[10px] text-gray-600 font-medium mb-1">
                Type of Payment *
              </label>
              <select
                className="border border-gray-300 px-2 text-xs rounded-sm h-8 font-medium"
                onChange={handlePaymentTypeChange}
              >
                <option className="font-medium">Select Here</option>
                <option className="font-medium">Advance PYMT</option>
                <option className="font-medium">Running PYMT</option>
                <option className="font-medium">Final PYMT</option>
                <option className="font-medium">ADJMT PYMT</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-[10px] text-gray-600 font-medium mb-1">
                Payment Mode *
              </label>
              <select
                className="border border-gray-300 px-2 text-xs rounded-sm h-8 font-medium"
                onChange={handlePaymentModeChange}
              >
                <option className="font-medium">Select Here</option>
                <option className="font-medium">Cash Payments</option>
                <option className="font-medium">Card Payments</option>
                <option className="font-medium">e-Wallet Payments</option>
                <option className="font-medium">NEFT/RTGS Payments</option>
                <option className="font-medium">UPI Payments</option>
              </select>
            </div>

            {/* Empty cell for alignment */}
            <div className="flex flex-col">
              <label className="text-[10px] text-gray-600 font-medium mb-1">&nbsp;</label>
              <div className="h-8"></div>
            </div>
          </div>

          {/* Conditionally rendered fields for Advance PYMT and Running PYMT */}
          {showAdvanceFields && (
            <div className="grid grid-cols-1 md:grid-cols-6 gap-3 mb-4">
              <div className="flex flex-col">
                <label className="text-[10px] text-gray-600 font-medium mb-1">
                  Forward To *
                </label>
                <select className="border border-gray-300 px-2 text-xs rounded-sm h-8 font-medium">
                  <option className="font-medium">Select Here</option>
                  <option className="font-medium">ADMIN</option>
                  <option className="font-medium">Vijay Sharma</option>
                  <option className="font-medium">Rohit</option>
                  <option className="font-medium">Rishav Singh</option>
                  <option className="font-medium">Abhay Raj</option>
                  <option className="font-medium">Sumit Mishra</option>
                  <option className="font-medium">Chiranjeev Sharma</option>
                  <option className="font-medium">Shimpi Rawat</option>
                  <option className="font-medium">Tanya Jaiswal</option>
                  <option className="font-medium">Prerna Pandey</option>
                  <option className="font-medium">Manoj Mishra</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="text-[10px] text-gray-600 font-medium mb-1">
                  Reminder Date & Time *
                </label>
                <input
                  type="datetime-local"
                  className="border border-gray-300 px-2 text-xs rounded-sm h-8"
                />
              </div>
            </div>
          )}

          {/* Conditionally rendered fields for Card Payments */}
          {showCardFields && (
            <div className="grid grid-cols-1 md:grid-cols-6 gap-3 mb-4">
              <div className="flex flex-col">
                <label className="text-[10px] text-gray-600 font-medium mb-1">
                  Card Type
                </label>
                <select className="border border-gray-300 px-2 text-xs rounded-sm h-8 font-medium">
                  <option className="font-medium">Select Card Type</option>
                  <option className="font-medium">Debit Card</option>
                  <option className="font-medium">Credit Card</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="text-[10px] text-gray-600 font-medium mb-1">
                  Name on Card
                </label>
                <input
                  type="text"
                  className="border border-gray-300 px-2 text-xs rounded-sm h-8"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[10px] text-gray-600 font-medium mb-1">
                  Transaction Number
                </label>
                <input
                  type="text"
                  className="border border-gray-300 px-2 text-xs rounded-sm h-8"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[10px] text-gray-600 font-medium mb-1">
                  Card Last Four Digit
                </label>
                <input
                  type="text"
                  className="border border-gray-300 px-2 text-xs rounded-sm h-8"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[10px] text-gray-600 font-medium mb-1">
                  Bank Name of Card *
                </label>
                <select className="border border-gray-300 px-2 text-xs rounded-sm h-8 font-medium">
                  <option className="font-medium">Select Bank Name</option>
                  <option className="font-medium">Kotak Bank</option>
                  <option className="font-medium">Punjab National Bank</option>
                  <option className="font-medium">Yes Bank Ltd</option>
                </select>
              </div>
            </div>
          )}

          {/* Conditionally rendered fields for e-Wallet Payments */}
          {showEwalletFields && (
            <div className="grid grid-cols-1 md:grid-cols-6 gap-3 mb-4">
              <div className="flex flex-col">
                <label className="text-[10px] text-gray-600 font-medium mb-1">
                  e-Wallet Name
                </label>
                <select className="border border-gray-300 px-2 text-xs rounded-sm h-8 font-medium">
                  <option className="font-medium">Select e-Wallet</option>
                  <option className="font-medium">Paytm</option>
                  <option className="font-medium">PhonePe powered by YES Bank</option>
                  <option className="font-medium">Gpay</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="text-[10px] text-gray-600 font-medium mb-1">
                  Transaction Number
                </label>
                <input
                  type="text"
                  className="border border-gray-300 px-2 text-xs rounded-sm h-8"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[10px] text-gray-600 font-medium mb-1">
                  Mobile Number
                </label>
                <input
                  type="text"
                  className="border border-gray-300 px-2 text-xs rounded-sm h-8"
                />
              </div>
            </div>
          )}

          {/* New conditionally rendered fields for NEFT/RTGS Payments */}
          {showNeftFields && (
            <div className="grid grid-cols-1 md:grid-cols-6 gap-3 mb-4">
              <div className="flex flex-col">
                <label className="text-[10px] text-gray-600 font-medium mb-1">
                  Bank Name
                </label>
                <select className="border border-gray-300 px-2 text-xs rounded-sm h-8 font-medium">
                  <option className="font-medium">Select Here</option>
                  <option className="font-medium">AU Small Finance Bank</option>
                  <option className="font-medium">Kotak Bank</option>
                  <option className="font-medium">Punjab National Bank</option>
                  <option className="font-medium">Yes Bank Ltd</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="text-[10px] text-gray-600 font-medium mb-1">
                  UTR No.
                </label>
                <input
                  type="text"
                  className="border border-gray-300 px-2 text-xs rounded-sm h-8"
                />
              </div>
            </div>
          )}

          {/* New conditionally rendered field for UPI Payments */}
          {showUpiFields && (
            <div className="grid grid-cols-1 md:grid-cols-6 gap-3 mb-4">
              <div className="flex flex-col md:col-span-2">
                <label className="text-[10px] text-gray-600 font-medium mb-1">
                  Transaction Details
                </label>
                <input
                  type="text"
                  className="border border-gray-300 px-2 text-xs rounded-sm h-8"
                />
              </div>
            </div>
          )}

          <p className="text-red-500 text-xs mt-2">* Required Fields</p>
          <div className="flex justify-end mt-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#337ab7] text-white px-4 py-2 text-sm rounded-sm font-medium hover:bg-blue-700"
            >
              ADD PAYMENT
            </button>
          </div>
        </div>

        {/* Payment Details Table */}
        <div className="bg-white shadow-md p-4 rounded-md w-full">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Payment History</h2>
          <PaymentDetailsTable clientName={clientName} />
        </div>
      </div>

      {/* New Modal Component */}
      {isModalOpen && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-2xl transition-all duration-500 ease-out animate-slideDown">
          <div className="bg-white border border-gray-200 shadow-xl rounded-md p-6">
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-2">
              <h2 className="text-base font-semibold">Bank Name</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="mt-4">
              <select className="w-full border border-gray-300 px-3 text-sm rounded-sm h-10">
                <option>--Select Option--</option>
                <option>Kotak Mahindra Bank</option>
                <option>Punjab National Bank</option>
              </select>
            </div>

            {/* Footer */}
            <div className="flex justify-end mt-5">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-blue-500 text-white px-4 py-2 text-sm rounded hover:bg-blue-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentsComponent;