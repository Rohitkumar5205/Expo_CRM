import React, { useState, useEffect, useCallback } from "react";

import { fetchEstimates } from "../../features/estimates/estimateSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { showSuccess, showError } from "../../utils/toastMessage";
import PaymentTable from "./PaymentTable";
import BankNameModal from "./BankNameModal";
import {
  fetchPayments,
  createPayment,
  updatePayment,
} from "../../features/payment/paymentSlice";
import { fetchInvoices } from "../../features/invoice/invoiceSlice";
import { fetchPerformaInvoices } from "../../features/performaInvoice/performaInvoiceSlice";

const emptyFormData = {
  pymtAgainst: "",
  invoice_id: "",
  f_amount: "",
  amount_text: "",
  tds_text: "",
  payment_date: new Date().toISOString().split("T")[0],
  debit_note_no: "",
  debit_note_ammount: "",
  debit_note_date: "",
  pymnt_type: "",
  payment_mode: "",
  forwardTo: "",
  reminderDateTime: "",
  card_type: "",
  card_name: "",
  card_transaction_no: "",
  card_last_digit: "",
  card_bank: "",
  wallet_name: "",
  wallet_transaction_no: "",
  wallet_mobile: "",
  neft_bank: "",
  utr_no: "",
  transactionDetailsUpi: "",
  bankId: "",
};

// --- Payments Component ---
const Payments = ({ client, onBack }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const clientName = client?.company?.name || "Loading Company...";
  const [formData, setFormData] = useState(emptyFormData);
  const [documentOptions, setDocumentOptions] = useState([]);

  // redux logic
  const { estimates, loading: estimatesLoading } = useSelector(
    (state) => state.estimates
  );
  const { payments: allPayments, loading: paymentsLoading } = useSelector(
    (state) => state.payment
  );
  const { invoices } = useSelector((state) => state.invoice);
  const { perInvoices, loading: piLoading } = useSelector(
    (state) => state.perinvoice
  );

  console.log("payments", allPayments);
  console.log("estimates", estimates);
  console.log("id,,", id);
  console.log("invoices data", invoices);
  console.log("perInvoices data", perInvoices);

  const added_By = localStorage.getItem("user_name");
  const [payments, setPayments] = useState(allPayments);
  const [editingItem, setEditingItem] = useState(null);
  const [showAdvanceFields, setShowAdvanceFields] = useState(false);
  const [showCardFields, setShowCardFields] = useState(false);
  const [showEwalletFields, setShowEwalletFields] = useState(false);
  const [showNeftFields, setShowNeftFields] = useState(false);
  const [showUpiFields, setShowUpiFields] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchEstimates());
    dispatch(fetchPayments());
    dispatch(fetchInvoices());
    dispatch(fetchPerformaInvoices());
  }, [dispatch]);

  useEffect(() => {
    setPayments(allPayments);
  }, [allPayments]);

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
      data.pymnt_type === "Advance PYMT" ||
      data.pymnt_type === "Running PYMT"
    ) {
      setShowAdvanceFields(true);
    }

    // Set visibility based on payment mode
    if (data.payment_mode === "Card Payments") {
      setShowCardFields(true);
    } else if (data.payment_mode === "e-Wallet Payments") {
      setShowEwalletFields(true);
    } else if (data.payment_mode === "NEFT/RTGS Payments") {
      setShowNeftFields(true);
    } else if (data.payment_mode === "UPI Payments") {
      setShowUpiFields(true);
    }
  };

  // --- INPUT HANDLERS ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handlePymtAgainstChange = (e) => {
    const { name, value } = e.target;
    // Also reset the document number and final amount when the type changes
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      invoice_id: "",
      f_amount: "",
    }));

    if (value === "PerInvoice") {
      const companyPerInvoices = perInvoices.filter(
        (pi) => pi.companyId === id
      );
      setDocumentOptions(
        companyPerInvoices.map((pi) => ({
          value: pi.pi_no,
          // label: `${pi.pi_no} - ₹${pi.finalAmount?.toFixed(2) || "0.00"}`,
          label: pi.pi_no,
          est_no: pi.est_no,
        }))
      );
    } else if (value === "Invoice") {
      const companyInvoices = invoices.filter((inv) => inv.companyId === id);
      setDocumentOptions(
        companyInvoices.map((inv) => ({
          value: inv.invoice_no,
          label: inv.invoice_no,
          est_no: inv.estimate_no,
        }))
      );
    } else {
      setDocumentOptions([]);
    }
  };

  const handleDocumentChange = (e) => {
    const { name, value } = e.target;
    const selectedDoc = documentOptions.find((doc) => doc.value === value);

    let finalAmount = "";
    if (selectedDoc && selectedDoc.est_no) {
      // Find the corresponding estimate from the Redux store
      const relatedEstimate = estimates.find(
        (est) => est.est_no === selectedDoc.est_no && est.companyId === id
      );

      if (relatedEstimate && relatedEstimate.items) {
        // Calculate the total final amount from the estimate's items
        const totalAmount = relatedEstimate.items.reduce(
          (sum, item) => sum + (parseFloat(item.finalAmount) || 0),
          0
        );
        finalAmount = totalAmount.toFixed(2);
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      // f_amount: selectedDoc ? (selectedDoc.amount || "").toString() : "",
      f_amount: finalAmount,
    }));
  };
  const handlePaymentTypeChange = (event) => {
    handleInputChange(event);
    updateConditionalFields({
      ...formData,
      pymnt_type: event.target.value,
      payment_mode: formData.payment_mode,
    });
  };

  const handlePaymentModeChange = (event) => {
    handleInputChange(event);
    updateConditionalFields({
      ...formData,
      payment_mode: event.target.value,
      pymnt_type: formData.pymnt_type,
    });
  };
  // --- EDIT HANDLER ---
  const handleEditDetails = (paymentItem) => {
    // Set the editingItem state to the selected payment item
    setEditingItem(paymentItem);

    // Create a new form data object by merging the empty form data with the payment item
    const formReadyData = {
      ...emptyFormData,
      ...paymentItem,
    };

    // Update the form data state with the new form data object
    setFormData({
      ...emptyFormData,
      ...paymentItem,
    });

    updateConditionalFields(formReadyData);

    window.scrollTo(0, 0);
  };
  // --- SUBMIT / SAVE LOGIC ---
  const handleSubmit = (e) => {
    e.preventDefault();

    // Always open the modal on submit, which will then call handleSaveBank
    setIsModalOpen(true);
  };

  const handleSaveBank = async (bankName) => {
    const finalFormData = {
      ...formData,
      bankId: bankName || "N/A (Cash/UPI/e-Wallet)",
      companyId: id,
      added_by: added_By,
    };

    try {
      if (editingItem) {
        // ** EDIT LOGIC: Dispatch update action **
        await dispatch(
          updatePayment({ id: editingItem._id, paymentData: finalFormData })
        ).unwrap();
        showSuccess("Payment updated successfully.");
      } else {
        // ** ADD LOGIC: Dispatch create action **
        await dispatch(createPayment(finalFormData)).unwrap();
        showSuccess("New payment added successfully.");
      }

      // Common Reset Steps on success
      setEditingItem(null);
      setIsModalOpen(false); // Close Modal
      setFormData(emptyFormData); // Reset Form Data
      resetConditionalFields(); // Reset conditional field visibility
    } catch (error) {
      console.error("Failed to save payment:", error);
      showError(error.message || "An error occurred while saving the payment.");
    }
  };

  // --- DELETE HANDLER ---
  const handleDeletePayment = (paymentId) => {
    if (window.confirm("Are you sure you want to delete this payment entry?")) {
      const updatedPayments = payments.filter((item) => item.id !== paymentId);
      setPayments(updatedPayments);
      showSuccess(`Payment with ID ${paymentId} deleted.`);
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
                onChange={handlePymtAgainstChange}
                required
                className="border border-gray-300 px-2 text-xs  h-8 font-medium focus:ring-1 focus:ring-blue-500 focus:border-transparent focus:outline-none"
              >
                <option value="">Select Here</option>
                <option value="PerInvoice">Performa Invoice</option>
                <option value="Invoice">Invoice</option>
              </select>
            </div>

            <div className="flex flex-col md:col-span-1">
              <label className="text-[13px] text-gray-900 font-medium mb-1">
                Document No. *
              </label>
              <select
                name="invoice_id"
                value={formData.invoice_id}
                onChange={handleDocumentChange}
                required
                className="border border-gray-300 px-2 text-xs  h-8 font-medium focus:ring-1 focus:ring-blue-500 focus:border-transparent focus:outline-none"
              >
                <option value="">Select Here</option>
                {documentOptions.length > 0 ? (
                  documentOptions.map((doc, index) => (
                    <option key={index} value={doc.value}>
                      {doc.label}
                    </option>
                  ))
                ) : (
                  <option disabled>Please select a payment type first</option>
                )}{" "}
              </select>
            </div>

            <div className="flex flex-col md:col-span-1">
              <label className="text-[13px] text-gray-900 font-medium mb-1">
                Final Amount
              </label>
              <input
                type="text"
                name="f_amount"
                value={formData.f_amount}
                readOnly
                onChange={(e) => {
                  let value = e.target.value;
                  value = value.replace(/[^0-9.]/g, "");

                  if ((value.match(/\./g) || []).length > 1) {
                    return;
                  }
                  setFormData((prev) => ({
                    ...prev,
                    f_amount: value,
                  }));
                }}
                className="border border-gray-300 px-2 text-xs h-8  focus:ring-1 focus:ring-blue-500 focus:border-transparent focus:outline-none "
                inputMode="decimal"
              />
            </div>

            <div className="flex flex-col md:col-span-1">
              <label className="text-[13px] text-gray-900 font-medium mb-1">
                Recieved Amount *
              </label>
              <input
                type="text"
                name="amount_text"
                value={formData.amount_text}
                onChange={(e) => {
                  let value = e.target.value;
                  value = value.replace(/[^0-9.]/g, "");
                  if ((value.match(/\./g) || []).length > 1) {
                    return;
                  }
                  setFormData((prev) => ({
                    ...prev,
                    amount_text: value,
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
                name="tds_text"
                value={formData.tds_text}
                onChange={(e) => {
                  let value = e.target.value;
                  value = value.replace(/[^0-9.]/g, "");
                  if ((value.match(/\./g) || []).length > 1) {
                    return;
                  }
                  setFormData((prev) => ({
                    ...prev,
                    tds_text: value,
                  }));
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
                name="payment_date"
                value={formData.payment_date}
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
                name="debit_note_no"
                value={formData.debit_note_no}
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
                name="debit_note_ammount"
                value={formData.debit_note_ammount}
                onChange={(e) => {
                  let value = e.target.value;
                  value = value.replace(/[^0-9.]/g, "");
                  if ((value.match(/\./g) || []).length > 1) {
                    return;
                  }
                  setFormData((prev) => ({
                    ...prev,
                    debit_note_ammount: value,
                  }));
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
                name="debit_note_date"
                value={formData.debit_note_date}
                onChange={handleInputChange}
                className="border border-gray-300 px-2 text-xs  h-8 focus:ring-1 focus:ring-blue-500 focus:border-transparent focus:outline-none"
              />
            </div>

            <div className="flex flex-col md:col-span-1">
              <label className="text-[13px] text-gray-900 font-medium mb-1">
                Type of Payment *
              </label>
              <select
                name="pymnt_type"
                value={formData.pymnt_type}
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
                name="payment_mode"
                value={formData.payment_mode}
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
                  name="card_type"
                  value={formData.card_type}
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
                  name="card_name"
                  value={formData.card_name}
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
                  name="card_transaction_no"
                  value={formData.card_transaction_no}
                  onChange={(e) => {
                    let value = e.target.value;
                    value = value.replace(/[^0-9.]/g, "");
                    if ((value.match(/\./g) || []).length > 1) {
                      return;
                    }
                    setFormData((prev) => ({
                      ...prev,
                      card_transaction_no: value,
                    }));
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
                  name="card_last_digit"
                  value={formData.card_last_digit}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (!isNaN(value) && value.length <= 4) {
                      setFormData((prev) => ({
                        ...prev,
                        card_last_digit: value,
                      }));
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
                  name="card_bank"
                  value={formData.card_bank}
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
                  name="wallet_name"
                  value={formData.wallet_name}
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
                  name="wallet_transaction_no"
                  value={formData.wallet_transaction_no}
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
                  name="wallet_mobile"
                  value={formData.wallet_mobile}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (!isNaN(value) && value.length <= 10) {
                      setFormData((prev) => ({
                        ...prev,
                        wallet_mobile: value,
                      }));
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
                  name="neft_bank"
                  value={formData.neft_bank}
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
                  name="utr_no"
                  value={formData.utr_no}
                  onChange={(e) => {
                    let value = e.target.value;
                    value = value.replace(/[^0-9.]/g, "");
                    if ((value.match(/\./g) || []).length > 1) {
                      return;
                    }
                    setFormData((prev) => ({
                      ...prev,
                      utr_no: value,
                    }));
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
        <PaymentTable
          payments={payments}
          handleEditDetails={handleEditDetails}
        />
      )}
      <BankNameModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        onSave={handleSaveBank}
        // handleSave={handleSave}
      />
    </div>
  );
};

export default Payments;
