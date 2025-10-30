import React from "react";
import { FaEye, FaTrash } from "react-icons/fa";
import { MdOutlineEdit } from "react-icons/md";

const PaymentTable = ({ client, payments, handleEditDetails }) => {
  const clientName = client?.company?.name || "Loading Company...";
  console.log("payments table", payments);

  return (
    <div className="bg-white shadow-md p-4 m-4 rounded">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        Payment History - {clientName}
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
            {payments && payments.length > 0 ? (
              payments.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="border px-2 py-2">{index + 1}</td>
                  <td className="border px-2 py-2">
                    {/* {item.documentDetails} */}
                    NGW/25-26/PI/091 INR. 340902/-
                  </td>
                  <td className="border px-2 py-2 text-right">
                    {/* {item.received.toFixed(2) || 0} */}0.00
                  </td>
                  <td className="border px-2 py-2 text-right">
                    {/* {item.debitNote.toFixed(2)} */}0.00
                  </td>
                  <td className="border px-2 py-2 text-right">
                    {/* {item.tds.toFixed(2)} */}0.00
                  </td>
                  <td className="border px-2 py-2 text-right font-medium">
                    {/* {item.balance.toFixed(2)} */}0.00
                  </td>
                  <td className="border px-2 py-2">
                    {/* {item.paymentDetails} */}Running PYMT recd. through
                    NEFT/RTGS in Kotak Bank on 24 Jun 25. Txn id:
                    NEFTINW1251253692 against NGW/25-26/PI/091
                  </td>
                  <td className="border px-2 py-2 text-center">
                    {/* {item.updatedDetails} */}
                    30 Jun 25 | Accounts
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
  );
};

export default PaymentTable;
