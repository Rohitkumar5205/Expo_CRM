import React, { useState } from "react";
import { FaEye, FaTrash } from "react-icons/fa";
// Import useNavigate for navigation functions
import { useNavigate } from "react-router-dom";
// Import MdOutlineEdit for Edit icon
import { MdOutlineEdit } from "react-icons/md";
import { Target } from "lucide-react";
import { ValueType } from "exceljs";

// --- Component: BankNameModal (Professional Design) ---
const BankNameModal = ({ isModalOpen, setIsModalOpen, onSave }) => {
  if (!isModalOpen) return null;

  const bankOptions = [
    "Kotak Mahindra Bank",
    "Punjab National Bank",
    "HDFC Bank",
    "ICICI Bank",
    "State Bank of India",
  ];

  const [selectedBank, setSelectedBank] = useState("");

  const handleSave = () => {
    // Check if a bank is selected before saving
    if (selectedBank) {
      onSave(selectedBank);
      // Reset selectedBank state in modal after successful save
      setSelectedBank("");
    }
  };

  return (
    <>
      {/* Backdrop/Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
        onClick={() => setIsModalOpen(false)}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div
        className="fixed inset-0 flex items-center justify-center z-50 p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="bg-white w-full max-w-sm mx-auto rounded-lg shadow-2xl transform transition-all duration-300 ease-out p-6">
          {/* Header */}
          <div className="flex justify-between items-center border-b border-gray-200 pb-3">
            <h2 id="modal-title" className="text-xl font-bold text-gray-800">
              Select Bank Name
            </h2>
            <button
              onClick={() => setIsModalOpen(false)}
              className="text-gray-500 hover:text-gray-800 p-1 transition-colors"
              aria-label="Close modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="mt-6">
            <label
              htmlFor="bank-select"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Choose Bank *
            </label>
            <select
              id="bank-select"
              className="w-full border border-gray-300 px-3 py-2 text-base rounded-md focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
              value={selectedBank}
              onChange={(e) => setSelectedBank(e.target.value)}
              required
            >
              <option value="" disabled>
                -- Select Option --
              </option>
              {bankOptions.map((bank, index) => (
                <option key={index} value={bank}>
                  {bank}
                </option>
              ))}
            </select>
          </div>

          {/* Footer / Action Buttons */}
          <div className="flex justify-end mt-8 space-x-3">
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-sm font-medium border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-4 py-2 text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
              disabled={!selectedBank} // Disable Save button until a bank is selected
            >
              Save & Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
// --- End Component: BankNameModal ---

const initialPaymentData = [
  {
    id: "p1",
    documentDetails: "INV-2025/001 (Date: 2025-09-01)",
    received: 15000.0,
    debitNote: 0.0,
    tds: 1500.0,
    balance: 13500.0,
    paymentDetails: "Bank Transfer, 2025-10-15",
    updatedDetails: "Admin (2025-10-24)",
    // Mock data to load into form for editing
    pymtAgainst: "Invoice",
    documentNo: "DOC-001",
    finalAmount: 15000.0,
    receivedAmount: 13500.0,
    tdsAmount: 1500.0,
    receivedDate: "2025-10-15",
    debitNoteNo: "",
    debitNoteAmount: 0,
    debitNoteDate: "",
    typeOfPayment: "Final PYMT",
    paymentMode: "NEFT/RTGS Payments",
    // ... other fields as needed
  },
];

const emptyFormData = {
  pymtAgainst: "",
  documentNo: "",
  finalAmount: "",
  receivedAmount: "",
  tdsAmount: "",
  receivedDate: new Date().toISOString().split("T")[0],
  debitNoteNo: "",
  debitNoteAmount: "",
  debitNoteDate: "",
  typeOfPayment: "",
  paymentMode: "",
  forwardTo: "",
  reminderDateTime: "",
  cardType: "",
  nameOnCard: "",
  transactionNumberCard: "",
  cardLastFourDigit: "",
  bankNameCard: "",
  eWalletName: "",
  transactionNumberEwallet: "",
  mobileNumberEwallet: "",
  bankNameNeft: "",
  utrNo: "",
  transactionDetailsUpi: "",
  selectedBankFromModal: "",
};

// --- Payments Component ---
const Payments = ({ client, onBack }) => {
  const navigate = useNavigate();
  const clientName = client?.company?.name || "Loading Company...";
  const [payments, setPayments] = useState(initialPaymentData);
  const [formData, setFormData] = useState(emptyFormData);

  // New state to manage Edit/Add mode
  const [editingItem, setEditingItem] = useState(null); // Stores the payment object being edited, null if adding.

  // Conditional fields state
  const [showAdvanceFields, setShowAdvanceFields] = useState(false);
  const [showCardFields, setShowCardFields] = useState(false);
  const [showEwalletFields, setShowEwalletFields] = useState(false);
  const [showNeftFields, setShowNeftFields] = useState(false);
  const [showUpiFields, setShowUpiFields] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- Utility Functions ---

  // Function to reset all conditional field visibility
  const resetConditionalFields = () => {
    setShowAdvanceFields(false);
    setShowCardFields(false);
    setShowEwalletFields(false);
    setShowNeftFields(false);
    setShowUpiFields(false);
  };

  // Function to update conditional field visibility based on form data
  const updateConditionalFields = (data) => {
    resetConditionalFields();

    // Set visibility based on payment type
    if (
      data.typeOfPayment === "Advance PYMT" ||
      data.typeOfPayment === "Running PYMT"
    ) {
      setShowAdvanceFields(true);
    }

    // Set visibility based on payment mode
    if (data.paymentMode === "Card Payments") {
      setShowCardFields(true);
    } else if (data.paymentMode === "e-Wallet Payments") {
      setShowEwalletFields(true);
    } else if (data.paymentMode === "NEFT/RTGS Payments") {
      setShowNeftFields(true);
    } else if (data.paymentMode === "UPI Payments") {
      setShowUpiFields(true);
    }
  };

  // --- INPUT HANDLERS ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentTypeChange = (event) => {
    handleInputChange(event);
    // Update conditional fields based on the new type value
    updateConditionalFields({
      ...formData,
      typeOfPayment: event.target.value,
      paymentMode: formData.paymentMode,
    });
  };

  const handlePaymentModeChange = (event) => {
    handleInputChange(event);
    // Update conditional fields based on the new mode value
    updateConditionalFields({
      ...formData,
      paymentMode: event.target.value,
      typeOfPayment: formData.typeOfPayment,
    });
  };

  // --- EDIT HANDLER ---
  const handleEditDetails = (paymentItem) => {
    // 1. Set the item to be edited
    setEditingItem(paymentItem);

    // 2. Load the item's data into the form
    // Note: We need to map table data fields (like received) to form fields (like receivedAmount)
    const formReadyData = {
      ...emptyFormData, // Start with a clean slate
      ...paymentItem, // Copy existing form-compatible fields
      // Map any derived fields back to input fields if needed, e.g.,
      // receivedAmount: paymentItem.received || '',
      // We'll assume the initialPaymentData was created with full fields for simplicity in this example.
    };

    // The mock data needs to be fully populated for a good edit experience.
    // Since mock data has the required fields, we just use spread.
    setFormData({
      ...emptyFormData,
      ...paymentItem,
    });

    // 3. Set conditional fields based on the loaded data
    updateConditionalFields(formReadyData);

    // Scroll to the top to see the form
    window.scrollTo(0, 0);
  };

  // --- SUBMIT / SAVE LOGIC ---
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the form requires a bank selection via modal
    if (
      formData.paymentMode === "NEFT/RTGS Payments" ||
      formData.paymentMode === "Card Payments"
    ) {
      setIsModalOpen(true); // Open modal to select bank
    } else {
      // For Cash/e-Wallet/UPI, submit/save directly
      handleSaveBank(formData.selectedBankFromModal);
    }
  };

  const handleSaveBank = (bankName) => {
    const finalFormData = {
      ...formData,
      selectedBankFromModal: bankName || "N/A (Cash/UPI/e-Wallet)",
    };

    console.log("--- FINAL FORM DATA FOR SUBMISSION ---");
    console.log(`Mode: ${editingItem ? "EDIT" : "ADD"}`);
    console.log("Form Data:", finalFormData);
    console.log("Selected Bank from Modal:", bankName);

    if (editingItem) {
      // ** EDIT LOGIC **
      setPayments((prevPayments) =>
        prevPayments.map((p) =>
          p.id === editingItem.id
            ? {
                ...p,
                // Update table display fields based on new form data
                received: finalFormData.receivedAmount || 0,
                tds: finalFormData.tdsAmount || 0,
                debitNote: finalFormData.debitNoteAmount || 0,
                balance:
                  (finalFormData.receivedAmount || 0) -
                  (finalFormData.tdsAmount || 0) -
                  (finalFormData.debitNoteAmount || 0),
                paymentDetails: `${finalFormData.paymentMode}, ${finalFormData.receivedDate}`,
                // Spread the rest of the form data to keep all necessary fields for next edit
                ...finalFormData,
              }
            : p
        )
      );
      setEditingItem(null); // Exit edit mode
      alert("Payment changes saved.");
    } else {
      // ** ADD LOGIC **
      const newPayment = {
        id: `p${payments.length + 1}`, // Generate a simple new ID
        // Map form fields to display fields
        documentDetails: `${finalFormData.documentNo} (Date: ${finalFormData.receivedDate})`,
        received: finalFormData.receivedAmount || 0,
        debitNote: finalFormData.debitNoteAmount || 0,
        tds: finalFormData.tdsAmount || 0,
        balance:
          (finalFormData.receivedAmount || 0) -
          (finalFormData.tdsAmount || 0) -
          (finalFormData.debitNoteAmount || 0),
        paymentDetails: `${finalFormData.paymentMode}, ${finalFormData.receivedDate}`,
        updatedDetails: `User (${new Date().toLocaleDateString()})`,
        // Include all form data for future editing
        ...finalFormData,
      };
      setPayments((prevPayments) => [...prevPayments, newPayment]);
      alert("New Payment added.");
    }

    // Common Reset Steps
    setIsModalOpen(false); // Close Modal
    setFormData(emptyFormData); // Reset Form Data
    resetConditionalFields(); // Reset conditional field visibility
  };

  // --- DELETE HANDLER ---
  const handleDeletePayment = (paymentId) => {
    if (window.confirm("Are you sure you want to delete this payment entry?")) {
      const updatedPayments = payments.filter((item) => item.id !== paymentId);
      setPayments(updatedPayments);
      alert(`Payment with ID ${paymentId} deleted.`);
      console.log("Deleted item with ID:", paymentId);
    }
  };

  // --- NAVIGATION ---
  const buttonStyle =
    "px-3 py-1 text-xs bg-[#3598dc] hover:bg-[#286090] text-white transition-colors";
  const handleMasterList = () => navigate("/ihweClientData2026/masterData");
  const handleAddClient = () => navigate("/ihweClientData2026/addNewClients");

  // Function to switch back to Add mode (e.g., for a 'Cancel Edit' button)
  const handleCancelEdit = () => {
    setEditingItem(null);
    setFormData(emptyFormData);
    resetConditionalFields();
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 font-sans">
      {/* 1. Heading and Navigation Buttons */}
      <div className="max-w-full mx-auto bg-white shadow-lg sticky top-0 z-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between px-4 py-1">
          <h1 className="text-xl text-gray-500 mb-2 lg:mb-0 uppercase">
            ACCOUNT SECTION | PAYMENTS
          </h1>
          <div className="flex flex-wrap gap-2 cursor-pointer">
            <button onClick={handleAddClient} className={buttonStyle}>
              Add Client
            </button>
            <button onClick={handleMasterList} className={buttonStyle}>
              Master List
            </button>
          </div>
        </div>
      </div>

      {/* 2. Add/Edit Payments Form */}
      <div className="bg-white shadow-md p-4 m-4 rounded">
        <div className="flex justify-between items-center mb-1">
          <h2 className="text-xl font-normal text-gray-600">
            {editingItem ? "Edit Payment" : "Add Payments"}
          </h2>
          {editingItem && (
            <button
              onClick={handleCancelEdit}
              className="text-red-500 text-sm hover:text-red-700 font-medium bg-white border border-gray-400 hover:bg-gray-200 px-3 py-1 "
            >
              Cancel Edit
            </button>
          )}
        </div>
         <hr className="w-full opacity-10 mb-6" />
        <form onSubmit={handleSubmit}>
          {/* Inputs grid (Row 1 & 2) - Kept same as previous structure */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-3 mb-4">
            {/* Row 1 Fields */}
            <div className="flex flex-col md:col-span-1">
              <label className="text-[13px] text-gray-900 font-medium mb-1">
                PYMT Against For *
              </label>
              <select
                name="pymtAgainst"
                value={formData.pymtAgainst}
                onChange={handleInputChange}
                className="border border-gray-300 px-2 text-xs  h-8 font-medium focus:ring-1 focus:ring-blue-500 focus:border-transparent focus:outline-none"
              >
                <option value="">Select Here</option>
                <option value="Performa Invoice">Performa Invoice</option>
                <option value="Invoice">Invoice</option>
              </select>
            </div>

            <div className="flex flex-col md:col-span-1">
              <label className="text-[13px] text-gray-900 font-medium mb-1">
                Document No. *
              </label>
              <select
                name="documentNo"
                value={formData.documentNo}
                onChange={handleInputChange}
                className="border border-gray-300 px-2 text-xs  h-8 font-medium focus:ring-1 focus:ring-blue-500 focus:border-transparent focus:outline-none"
              >
                <option value="">Select Here</option>
                <option value="DOC-001">DOC-001</option>
              </select>
            </div>

            <div className="flex flex-col md:col-span-1">
              <label className="text-[13px] text-gray-900 font-medium mb-1">
                Final Amount
              </label>
             <input
             type="text"
             name="finalAmount"
             value={formData.finalAmount}
             onChange={(e) => {
               let value = e.target.value;
           
               // Allow only digits and one decimal point
               value = value.replace(/[^0-9.]/g, "");
           
               // Prevent multiple decimals
               if ((value.match(/\./g) || []).length > 1) {
                 return;
               }
               // Update state safely
               setFormData((prev) => ({
                 ...prev,
                 finalAmount: value,
               }));
             }}
             className="border border-gray-300 px-2 text-xs h-8  focus:ring-1 focus:ring-blue-500 focus:border-transparent focus:outline-none "
             inputMode="decimal" // shows numeric keypad on mobile
           />
            </div>

            <div className="flex flex-col md:col-span-1">
              <label className="text-[13px] text-gray-900 font-medium mb-1">
                Recieved Amount *
              </label>
              <input
                type="text"
                name="receivedAmount"
                value={formData.receivedAmount}
                  onChange={(e) => {
               let value = e.target.value;
           
               // Allow only digits and one decimal point
               value = value.replace(/[^0-9.]/g, "");
           
               // Prevent multiple decimals
               if ((value.match(/\./g) || []).length > 1) {
                 return;
               }
               // Update state safely
               setFormData((prev) => ({
                 ...prev,
                 receivedAmount: value,
               }));
             }}
                className="border border-gray-300 px-2 text-xs  h-8 focus:ring-1 focus:ring-blue-500 focus:border-transparent focus:outline-none "
                inputMode="decimal"
                required
              />
            </div>

            <div className="flex flex-col md:col-span-1">
              <label className="text-[13px] text-gray-900 font-medium mb-1">
                TDS Amount
              </label>
              <input
                type="text"
                name="tdsAmount"
                value={formData.tdsAmount}
                onChange={(e)=>{
                  let value = e.target.value;
                  // Allow only digits and one decimal point
               value = value.replace(/[^0-9.]/g, "");
           
               // Prevent multiple decimals
               if ((value.match(/\./g) || []).length > 1) {
                 return;
               }
               setFormData((prev)=>({
                ...prev,
                tdsAmount:value,
               }))
                }}
                className="border border-gray-300 px-2 text-xs h-8 focus:ring-1 focus:ring-blue-500 focus:border-transparent focus:outline-none"
                inputMode="decimal"
              />
            </div>

            <div className="flex flex-col md:col-span-1">
              <label className="text-[13px] text-gray-900 font-medium mb-1">
                Recieved Date *
              </label>
              <input
                type="date"
                name="receivedDate"
                value={formData.receivedDate}
                onChange={handleInputChange}
                className="border border-gray-300 px-2 text-xs  h-8 focus:ring-1 focus:ring-blue-500 focus:border-transparent focus:outline-none"
                required
              />
            </div>

            {/* Row 2 Fields */}
            <div className="flex flex-col md:col-span-1">
              <label className="text-[13px] text-gray-900 font-medium mb-1">
                Debit Note No.
              </label>
              <input
                type="text"
                name="debitNoteNo"
                value={formData.debitNoteNo}
                onChange={handleInputChange}
                className="border border-gray-300 px-2 text-xs  h-8 focus:ring-1 focus:ring-blue-500 focus:border-transparent focus:outline-none"
              />
            </div>

            <div className="flex flex-col md:col-span-1">
              <label className="text-[13px] text-gray-900 font-medium mb-1">
                Debit Note Amount
              </label>
              <input
                type="text"
                name="debitNoteAmount"
                value={formData.debitNoteAmount}
                 onChange={(e)=>{
                  let value = e.target.value;
                  // Allow only digits and one decimal point
               value = value.replace(/[^0-9.]/g, "");
           
               // Prevent multiple decimals
               if ((value.match(/\./g) || []).length > 1) {
                 return;
               }
               setFormData((prev)=>({
                ...prev,
                debitNoteAmount:value,
               }))
                }}
                className="border border-gray-300 px-2 text-xs  h-8 focus:ring-1 focus:ring-blue-500 focus:border-transparent focus:outline-none"
                inputMode="decimal"
              />
            </div>

            <div className="flex flex-col md:col-span-1">
              <label className="text-[13px] text-gray-900 font-medium mb-1">
                Debit Note Date
              </label>
              <input
                type="date"
                name="debitNoteDate"
                value={formData.debitNoteDate}
                onChange={handleInputChange}
                className="border border-gray-300 px-2 text-xs  h-8 focus:ring-1 focus:ring-blue-500 focus:border-transparent focus:outline-none"
              />
            </div>

            <div className="flex flex-col md:col-span-1">
              <label className="text-[13px] text-gray-900 font-medium mb-1">
                Type of Payment *
              </label>
              <select
                name="typeOfPayment"
                value={formData.typeOfPayment}
                onChange={handlePaymentTypeChange}
                className="border border-gray-300 px-2 text-xs  h-8 font-medium focus:ring-1 focus:ring-blue-500 focus:border-transparent focus:outline-none "
                required
              >
                <option value="">Select Here</option>
                <option value="Advance PYMT">Advance PYMT</option>
                <option value="Running PYMT">Running PYMT</option>
                <option value="Final PYMT">Final PYMT</option>
                <option value="ADJMT PYMT">ADJMT PYMT</option>
              </select>
            </div>

            <div className="flex flex-col md:col-span-1">
              <label className="text-[13px] text-gray-900 font-medium mb-1">
                Payment Mode *
              </label>
              <select
                name="paymentMode"
                value={formData.paymentMode}
                onChange={handlePaymentModeChange}
                className="border border-gray-300 px-2 text-xs  h-8 font-medium focus:ring-1 focus:ring-blue-500 focus:border-transparent focus:outline-none "
                required
              >
                <option value="">Select Here</option>
                <option value="Cash Payments">Cash Payments</option>
                <option value="Card Payments">Card Payments</option>
                <option value="e-Wallet Payments">e-Wallet Payments</option>
                <option value="NEFT/RTGS Payments">NEFT/RTGS Payments</option>
                <option value="UPI Payments">UPI Payments</option>
              </select>
            </div>

            <div className="md:col-span-1 h-8"></div>
          </div>

          {/* Conditional Sections */}
          {showAdvanceFields && (
            <div className="grid grid-cols-1 md:grid-cols-6 gap-3 mb-4">
              <div className="flex flex-col md:col-span-2">
                <label className="text-[13px] text-gray-900 font-medium mb-1">
                  Forward To *
                </label>
                <select
                  name="forwardTo"
                  value={formData.forwardTo}
                  onChange={handleInputChange}
                  className="border border-gray-300 px-2 text-xs  h-8 font-medium focus:ring-1 focus:ring-blue-500 focus:border-transparent focus:outline-none "
                  required
                >
                  <option value="">Select Here</option>
                  <option value="ADMIN">ADMIN</option>
                  <option value="Vijay Sharma">Vijay Sharma</option>
                  <option value="Rohit">Rohit</option>
                </select>
              </div>
              <div className="flex flex-col md:col-span-2">
                <label className="text-[13px] text-gray-900 font-medium mb-1">
                  Reminder Date & Time *
                </label>
                <input
                  type="datetime-local"
                  name="reminderDateTime"
                  value={formData.reminderDateTime}
                  onChange={handleInputChange}
                  className="border border-gray-300 px-2 text-xs  h-8 focus:ring-1 focus:ring-blue-500 focus:border-transparent focus:outline-none"
                  required
                />
              </div>
            </div>
          )}

          {showCardFields && (
            <div className="grid grid-cols-1 md:grid-cols-6 gap-3 mb-4">
              <div className="flex flex-col md:col-span-1">
                <label className="text-[13px] text-gray-900 font-medium mb-1">
                  Card Type
                </label>
                <select
                  name="cardType"
                  value={formData.cardType}
                  onChange={handleInputChange}
                  className="border border-gray-300 px-2 text-xs  h-8 font-medium focus:ring-1 focus:ring-blue-500 focus:border-transparent focus:outline-none"
                >
                  <option value="">Select Card Type</option>
                  <option value="Debit Card">Debit Card</option>
                  <option value="Credit Card">Credit Card</option>
                </select>
              </div>
              <div className="flex flex-col md:col-span-1">
                <label className="text-[13px] text-gray-900 font-medium mb-1">
                  Name on Card
                </label>
                <input
                  type="text"
                  name="nameOnCard"
                  value={formData.nameOnCard}
                  onChange={handleInputChange}
                  className="border border-gray-300 px-2 text-xs  h-8 focus:ring-1 focus:ring-blue-500 focus:border-transparent focus:outline-none"
                />
              </div>
              <div className="flex flex-col md:col-span-1">
                <label className="text-[13px] text-gray-900 font-medium mb-1">
                  Transaction Number
                </label>
                <input
                  type="text"
                  name="transactionNumberCard"
                  value={formData.transactionNumberCard}
                   onChange={(e)=>{
                  let value = e.target.value;
                  // Allow only digits and one decimal point
               value = value.replace(/[^0-9.]/g, "");
           
               // Prevent multiple decimals
               if ((value.match(/\./g) || []).length > 1) {
                 return;
               }
               setFormData((prev)=>({
                ...prev,
                transactionNumberCard:value,
               }))
                }}
                  className="border border-gray-300 px-2 text-xs  h-8 focus:ring-1 focus:ring-blue-500 focus:border-transparent focus:outline-none"
                />
              </div>
              <div className="flex flex-col md:col-span-1">
                <label className="text-[13px] text-gray-900 font-medium mb-1">
                  Card Last Four Digit
                </label>
                <input
                  type="text"
                  name="cardLastFourDigit"
                  value={formData.cardLastFourDigit}
                  onChange={(e)=>{
                    const value = e.target.value;
                   if (!isNaN(value)&&value.length<=4) {
                    setFormData((prev)=>({
                      ...prev,
                      cardLastFourDigit:value,
                    }))
                   }
                  }}
                  className="border border-gray-300 px-2 text-xs  h-8 focus:ring-1 focus:ring-blue-500 focus:border-transparent focus:outline-none"
                />
              </div>
              <div className="flex flex-col md:col-span-2">
                <label className="text-[13px] text-gray-900 font-medium mb-1">
                  Bank Name of Card *
                </label>
                <select
                  name="bankNameCard"
                  value={formData.bankNameCard}
                  onChange={handleInputChange}
                  className="border border-gray-300 px-2 text-xs  h-8 font-medium focus:ring-1 focus:ring-blue-500 focus:border-transparent focus:outline-none"
                  required={showCardFields}
                >
                  <option value="">Select Bank Name</option>
                  <option value="Kotak Bank">Kotak Bank</option>
                  <option value="Punjab National Bank">
                    Punjab National Bank
                  </option>
                  <option value="Yes Bank Ltd">Yes Bank Ltd</option>
                </select>
              </div>
            </div>
          )}

          {showEwalletFields && (
            <div className="grid grid-cols-1 md:grid-cols-6 gap-3 mb-4">
              <div className="flex flex-col md:col-span-2">
                <label className="text-[13px] text-gray-900 font-medium mb-1">
                  e-Wallet Name
                </label>
                <select
                  name="eWalletName"
                  value={formData.eWalletName}
                  onChange={handleInputChange}
                  className="border border-gray-300 px-2 text-xs  h-8 font-medium focus:ring-1 focus:ring-blue-500 focus:border-transparent focus:outline-none"
                >
                  <option value="">Select e-Wallet</option>
                  <option value="Paytm">Paytm</option>
                  <option value="PhonePe powered by YES Bank">
                    PhonePe powered by YES Bank
                  </option>
                  <option value="Gpay">Gpay</option>
                </select>
              </div>
              <div className="flex flex-col md:col-span-2">
                <label className="text-[13px] text-gray-900 font-medium mb-1">
                  Transaction Number
                </label>
                <input
                  type="text"
                  name="transactionNumberEwallet"
                  value={formData.transactionNumberEwallet}
                  onChange={handleInputChange}
                  className="border border-gray-300 px-2 text-xs  h-8 focus:ring-1 focus:ring-blue-500 focus:border-transparent focus:outline-none"
                />
              </div>
              <div className="flex flex-col md:col-span-2">
                <label className="text-[13px] text-gray-900 font-medium mb-1">
                  Mobile Number
                </label>
                <input
                  type="text"
                  name="mobileNumberEwallet"
                  value={formData.mobileNumberEwallet}
                  onChange={(e)=>{
                    const value = e.target.value;
                    if (!isNaN(value)&&value.length<=10) {
                      setFormData((prev)=>({
                        ...prev,
                        mobileNumberEwallet:value,
                      }))
                    }
                  }}
                  className="border border-gray-300 px-2 text-xs  h-8 focus:ring-1 focus:ring-blue-500 focus:border-transparent focus:outline-none"
                />
              </div>
            </div>
          )}

          {showNeftFields && (
            <div className="grid grid-cols-1 md:grid-cols-6 gap-3 mb-4">
              <div className="flex flex-col md:col-span-2">
                <label className="text-[13px] text-gray-900 font-medium mb-1">
                  Bank Name
                </label>
                <select
                  name="bankNameNeft"
                  value={formData.bankNameNeft}
                  onChange={handleInputChange}
                  className="border border-gray-300 px-2 text-xs  h-8 font-medium focus:ring-1 focus:ring-blue-500 focus:border-transparent focus:outline-none"
                >
                  <option value="">Select Here</option>
                  <option value="AU Small Finance Bank">
                    AU Small Finance Bank
                  </option>
                  <option value="Kotak Bank">Kotak Bank</option>
                  <option value="Punjab National Bank">
                    Punjab National Bank
                  </option>
                  <option value="Yes Bank Ltd">Yes Bank Ltd</option>
                </select>
              </div>
              <div className="flex flex-col md:col-span-2">
                <label className="text-[13px] text-gray-900 font-medium mb-1">
                  UTR No.
                </label>
                <input
                  type="text"
                  name="utrNo"
                  value={formData.utrNo}
                  onChange={(e)=>{
                    let value = e.target.value;
                    // Allow only digits and one decimal point
               value = value.replace(/[^0-9.]/g, "");
           
               // Prevent multiple decimals
               if ((value.match(/\./g) || []).length > 1) {
                 return;
               }
               setFormData((prev)=>({
                ...prev,
                utrNo:value,
               }))
                  }}
                  className="border border-gray-300 px-2 text-xs  h-8 focus:ring-1 focus:ring-blue-500 focus:border-transparent focus:outline-none"
                />
              </div>
            </div>
          )}

          {showUpiFields && (
            <div className="grid grid-cols-1 md:grid-cols-6 gap-3 mb-4">
              <div className="flex flex-col md:col-span-3">
                <label className="text-[13px] text-gray-900 font-medium mb-1">
                  Transaction Details
                </label>
                <input
                  type="text"
                  name="transactionDetailsUpi"
                  value={formData.transactionDetailsUpi}
                  onChange={handleInputChange}
                  className="border border-gray-300 px-2 text-xs  h-8 focus:ring-1 focus:ring-blue-500 focus:border-transparent focus:outline-none"
                />
              </div>
            </div>
          )}

          <div className="flex justify-between">
            <div>
              <p className="text-red-500 text-xs mt-2">* Required Fields</p>
            </div>
            <div className="">
              <button
                type="submit"
                className="bg-[#337ab7] text-white px-4 py-2 text-sm  font-medium hover:bg-blue-700"
              >
                {editingItem ? "SAVE CHANGES" : "ADD PAYMENT"}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* 3. Payment Details Table (History) - Only show when NOT editing */}
      {!editingItem && (
        <div className="bg-white shadow-md p-4 m-4 rounded">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Payment History - {clientName}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 text-xs">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-2 py-1 text-left">S.NO.</th>
                  <th className="border px-2 py-1 text-left">
                    DOCUMENT DETAILS
                  </th>
                  <th className="border px-2 py-1 text-left">RECEIVED</th>
                  <th className="border px-2 py-1 text-left">DEBIT NOTE</th>
                  <th className="border px-2 py-1 text-left">TDS</th>
                  <th className="border px-2 py-1 text-left">BALANCE</th>
                  <th className="border px-2 py-1 text-left">
                    PAYMENT DETAILS
                  </th>
                  <th className="border px-2 py-1 text-left">
                    UPDATED DETAILS
                  </th>
                  <th className="border px-2 py-1 text-left">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {payments && payments.length > 0 ? (
                  payments.map((item, index) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="border px-2 py-2">{index + 1}</td>
                      <td className="border px-2 py-2">
                        {item.documentDetails}
                      </td>
                      <td className="border px-2 py-2 text-right">
                        {item.received.toFixed(2)}
                      </td>
                      <td className="border px-2 py-2 text-right">
                        {item.debitNote.toFixed(2)}
                      </td>
                      <td className="border px-2 py-2 text-right">
                        {item.tds.toFixed(2)}
                      </td>
                      <td className="border px-2 py-2 text-right font-medium">
                        {item.balance.toFixed(2)}
                      </td>
                      <td className="border px-2 py-2">
                        {item.paymentDetails}
                      </td>
                      <td className="border px-2 py-2 text-center">
                        {item.updatedDetails}
                      </td>
                      <td className="border px-2 py-2 text-center">
                        <div className="flex justify-center items-center space-x-2">
                          <button
                            onClick={() => handleEditDetails(item)}
                            className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-100 transition-colors"
                            title="Edit Details"
                          >
                            <MdOutlineEdit size={20} />
                          </button>
                          <button
                            onClick={() => handleDeletePayment(item.id)}
                            className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-100 transition-colors"
                            title="Delete Entry"
                          >
                            <FaTrash size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center py-4 text-gray-500">
                      No Data Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. New Modal Component (Professional Design) */}
      <BankNameModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        onSave={handleSaveBank}
      />
    </div>
  );
};

export default Payments;
