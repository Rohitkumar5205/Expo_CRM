import React, { useState } from "react";

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
    onSave(selectedBank);
    // Reset selectedBank state in modal after successful save
    setSelectedBank("");
  };
  return (
    <>
      {/* Backdrop/Overlay */}
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300"
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
        <div className="bg-white w-full max-w-md mx-auto rounded-2xl shadow-xl transform transition-all duration-300 ease-out overflow-hidden">
          {/* Header */}
          <div className="flex justify-between items-center border-b border-gray-100 bg-gray-50/50 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
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
                    d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                  />
                </svg>
              </div>
              <div>
                <h2
                  id="modal-title"
                  className="text-lg font-bold text-gray-800"
                >
                  Select Bank
                </h2>
                <p className="text-xs text-gray-500 font-medium">
                  Choose destination bank for payment
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsModalOpen(false)}
              className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-all"
              aria-label="Close modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
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
          <div className="p-6">
            <label
              htmlFor="bank-select"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Bank Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                id="bank-select"
                className="appearance-none w-full border border-gray-300 px-4 py-3 text-sm rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors bg-white text-gray-700 cursor-pointer shadow-sm outline-none"
                value={selectedBank}
                onChange={(e) => setSelectedBank(e.target.value)}
                required
              >
                <option value="" disabled>
                  -- Select Bank Account --
                </option>
                {bankOptions.map((bank, index) => (
                  <option key={index} value={bank}>
                    {bank}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Footer / Action Buttons */}
          <div className="flex justify-end gap-3 px-6 py-4 bg-gray-50/50 border-t border-gray-100">
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-5 py-2.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-gray-800 hover:border-gray-300 transition-all focus:ring-2 focus:ring-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={!selectedBank}
              className={`px-5 py-2.5 text-sm font-medium text-white rounded-lg shadow-sm transition-all
                ${
                  !selectedBank
                    ? "bg-blue-300 cursor-not-allowed opacity-70"
                    : "bg-blue-600 hover:bg-blue-700 hover:shadow-md active:transform active:scale-95"
                }`}
            >
              Confirm Selection
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BankNameModal;
