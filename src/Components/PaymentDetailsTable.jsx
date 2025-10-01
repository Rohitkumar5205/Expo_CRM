// src/Components/PaymentDetailsTable.jsx
import React from "react";

const PaymentDetailsTable = ({ clientName }) => {
  return (
    <div className="bg-white shadow-md rounded-md p-4 mt-4">
      <h2 className="text-base font-semibold text-gray-700 mb-3">
        Payment Details - {clientName}
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 text-xs">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-2 py-1 text-left">S.NO.</th>
              <th className="border px-2 py-1 text-left">DOCUMENT DETAILS</th>
              <th className="border px-2 py-1 text-left">RECEIVED</th>
              <th className="border px-2 py-1 text-left">DEBIT NOTE</th>
              <th className="border px-2 py-1 text-left">TDS</th>
              <th className="border px-2 py-1 text-left">BALANCE</th>
              <th className="border px-2 py-1 text-left">PAYMENT DETAILS</th>
              <th className="border px-2 py-1 text-left">UPDATED DETAILS</th>
              <th className="border px-2 py-1 text-left">ACTION</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="9" className="text-center py-4 text-gray-500">
                No Data Found
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentDetailsTable;
