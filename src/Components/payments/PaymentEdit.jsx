import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchPayments,
  updatePayment,
} from "../../features/payment/paymentSlice";
import { fetchEstimates } from "../../features/estimates/estimateSlice";
import { fetchInvoices } from "../../features/invoice/invoiceSlice";
import { fetchPerformaInvoices } from "../../features/performaInvoice/performaInvoiceSlice";
import { showSuccess, showError } from "../../utils/toastMessage";

const PaymentEdit = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const added_By = localStorage.getItem("user_name");
  const { estimates } = useSelector((state) => state.estimates);
  const { payments: allPayments, loading: paymentsLoading } = useSelector(
    (state) => state.payment
  );
  const { invoices } = useSelector((state) => state.invoice);
  const { perInvoices, loading: piLoading } = useSelector(
    (state) => state.perinvoice
  );
  console.log("invoices...", invoices);
  const [showCardFields, setShowCardFields] = useState(false);
  const [showEwalletFields, setShowEwalletFields] = useState(false);
  const [showNeftFields, setShowNeftFields] = useState(false);
  const [showUpiFields, setShowUpiFields] = useState(false);

  const [formData, setFormData] = useState({
    pymtAgainst: "",
    invoice_id: "",
    f_amount: "",
    amount_text: "",
    tds_text: "",
    status_short: "",
    payment_date: new Date().toISOString().split("T")[0],
    debit_note_no: "",
    debit_note_ammount: "",
    debit_note_date: "",
    payment_mode: "",
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
  });
  const [documentOptions, setDocumentOptions] = useState([]);

  // Fetch all required data on component mount
  useEffect(() => {
    dispatch(fetchPayments());
    dispatch(fetchEstimates());
    dispatch(fetchInvoices());
    dispatch(fetchPerformaInvoices());
  }, [dispatch]);

  // Populate form with payment data when it's available
  useEffect(() => {
    console.log("EDIT PAGE: Checking for payment data...");
    console.log("EDIT PAGE: URL ID:", id);
    console.log("EDIT PAGE: All payments from Redux:", allPayments);

    if (allPayments.length > 0 && id) {
      const paymentToEdit = allPayments.find((p) => p._id === id);
      console.log("EDIT PAGE: Found payment to edit:", paymentToEdit);
      if (paymentToEdit) {
        const formattedData = {
          ...paymentToEdit,
          payment_date: paymentToEdit.payment_date
            ? paymentToEdit.payment_date.split("T")[0]
            : "",
          debit_note_date: paymentToEdit.debit_note_date
            ? paymentToEdit.debit_note_date.split("T")[0]
            : "",
        };
        setFormData(formattedData);
        updateConditionalFields(formattedData);
        console.log("EDIT PAGE: Form data set for editing:", formattedData);
        console.log(
          "EDIT PAGE: Checking pymtAgainst:",
          formattedData.pymtAgainst,
          "for company:",
          formattedData.ex_no
        );

        // Pre-populate document options based on the loaded data
        if (formattedData.pymtAgainst === "PerInvoice") {
          const companyPerInvoices = perInvoices.filter(
            (pi) => pi.companyId === formattedData.companyId
          );
          setDocumentOptions(
            companyPerInvoices.map((pi) => ({
              value: pi.pi_no,
              label: pi.pi_no,
              est_no: pi.est_no,
            }))
          );
        } else if (formattedData.pymtAgainst === "Invoice") {
          const companyInvoices = invoices.filter(
            (inv) => inv.companyId === formattedData.companyId
          );
          console.log("EDIT PAGE: Found Invoices:", companyInvoices);
          setDocumentOptions(
            companyInvoices.map((inv) => ({
              value: inv.invoice_no,
              label: inv.invoice_no,
              est_no: inv.estimate_no,
            }))
          );
        }
      } else {
        console.log("EDIT PAGE: No payment found with the given ID.");
      }
    } else {
      console.log(
        "EDIT PAGE: Waiting for payments data or ID is not available."
      );
    }
  }, [id, allPayments, invoices, perInvoices]);

  const resetConditionalFields = () => {
    setShowCardFields(false);
    setShowEwalletFields(false);
    setShowNeftFields(false);
    setShowUpiFields(false);
  };

  const updateConditionalFields = (data) => {
    resetConditionalFields();
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

  const handlePymtAgainstChange = (e) => {
    const { name, value } = e.target;
    // Also reset the document number and final amount when the type changes
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      invoice_id: "",
      f_amount: "",
    }));
    console.log("CHANGE HANDLER: Switched to:", value);
    console.log(
      "CHANGE HANDLER: Filtering documents for company:",
      formData.companyId
    );
    if (value === "PerInvoice") {
      const companyPerInvoices = perInvoices.filter(
        (pi) => pi.companyId === formData.companyId
      );
      setDocumentOptions(
        companyPerInvoices.map((pi) => ({
          value: pi.pi_no,
          // label: `${pi.pi_no} - ₹${pi.finalAmount?.toFixed(2) || "0.00"}`,
          label: pi.pi_no,
          est_no: pi.est_no,
        }))
      );
      console.log("CHANGE HANDLER: Found PIs:", companyPerInvoices);
    } else if (value === "Invoice") {
      const companyInvoices = invoices.filter(
        (inv) => inv.companyId === formData.companyId
      );
      console.log("CHANGE HANDLER: Found Invoices:", companyInvoices);
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
        // (est) => est.est_no === selectedDoc.est_no && est.companyId === id
        (est) =>
          est.est_no === selectedDoc.est_no &&
          est.companyId === formData.companyId
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
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentModeChange = (event) => {
    handleInputChange(event);
    updateConditionalFields({
      ...formData,
      payment_mode: event.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updatePayment({ id, updatedData: formData })).unwrap();
      showSuccess("Payment updated successfully!");
      if (formData.ex_no) {
        navigate(`/ihweClientData2026/payments/${formData.ex_no}`);
      } else {
        navigate(-1); // Fallback to go back one page
      }
    } catch (error) {
      showError(error.message || "Failed to update payment.");
      console.error("Update payment error:", error);
    }
  };

  const handleCancel = () => {
    if (formData.companyId) {
      navigate(`/ihweClientData2026/payments/${formData.companyId}`);
    } else {
      navigate(-1);
    }
  };

  const buttonStyle =
    "px-3 py-1 text-xs bg-[#3598dc] hover:bg-[#286090] text-white transition-colors";
  const handleMasterList = () => navigate("/ihweClientData2026/masterData");
  const handleAddClient = () => navigate("/ihweClientData2026/addNewClients");
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

      <div className="bg-white shadow-md p-4 m-4 rounded">
        <hr className="w-full opacity-10 mb-6" />
        {/* <form
        // onSubmit={handleSubmit}
        > */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-3 mb-4">
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
                name="status_short"
                // value={reviewData.status_short}
                // onChange={handlePaymentTypeChange}
                value={formData.status_short}
                onChange={handleInputChange}
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
            {/* <div className=""> */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-500 text-white px-4 py-2 text-sm font-medium hover:bg-gray-600"
              >
                CANCEL
              </button>

              <button
                type="submit"
                className="bg-[#337ab7] text-white px-4 py-2 text-sm  font-medium hover:bg-blue-700"
              >
                {/* ADD PAYMENT */}
                UPDATE PAYMENT
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentEdit;
