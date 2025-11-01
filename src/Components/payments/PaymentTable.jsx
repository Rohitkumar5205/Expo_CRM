import React from "react";
import { FaEye, FaTrash } from "react-icons/fa";
import { MdOutlineEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const PaymentTable = ({
  client,
  payments,
  handleEditDetails,
  handleDeletePayment,
}) => {
  const navigate = useNavigate();
  const clientName = client?.company?.name || "Loading Company...";
  console.log("payments table", payments);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";

    // Date object create karein
    const date = new Date(dateString);

    // Components extract karein (zero padding ke liye padStart ka use)
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed, so add 1
    const year = date.getFullYear();

    // DD-MM-YYYY format mein return karein
    return `${day}-${month}-${year}`;
  };

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
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="border px-2 py-2">{index + 1}</td>
                  <td className="border px-2 py-2">
                    {/* {item.documentDetails} */}
                    {item?.invoice_id} INR. {item?.f_amount}/-
                  </td>
                  <td className="border px-2 py-2 text-right">
                    {/* {item?.amount_text.toFixed(2) || 0} */}
                    {parseFloat(item?.amount_text || 0).toFixed(2)}
                  </td>
                  <td className="border px-2 py-2 text-right">
                    {/* {item.debitNote.toFixed(2)} */}
                    {item?.debit_note_no}/{item?.debit_note_ammount}/-
                    {formatDate(item?.debit_note_date)}/
                    {parseFloat(item?.amount_text || 0).toFixed(2)}
                  </td>
                  <td className="border px-2 py-2 text-right">
                    {item?.tds_text}
                  </td>
                  <td className="border px-2 py-2 text-right font-medium">
                    {/* Calculate the balance and format to 2 decimal places */}
                    {(
                      parseFloat(item?.f_amount || 0) -
                      parseFloat(item?.amount_text || 0)
                    ).toFixed(2)}
                  </td>
                  <td className="border px-2 py-2">
                    {item?.status_short} recd. through {item?.payment_mode} in{" "}
                    {""}
                    {item?.bankId} on {item?.payment_date}. Txn id:{" "}
                    {item?.payment_mode} {""}
                    against {item?.invoice_id}
                  </td>
                  <td className="border px-2 py-2 text-center">
                    {formatDate(item?.updated)} | {item?.added_by}
                  </td>
                  <td className="border px-2 py-2 text-center">
                    <div className="flex justify-center items-center space-x-2">
                      <button
                        onClick={() =>
                          navigate(
                            `/ihweClientData2026/paymentEdit/${item._id}`
                          )
                        }
                        className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-100 transition-colors"
                        title="Edit Details"
                      >
                        <MdOutlineEdit size={20} />
                      </button>
                      <button
                        onClick={() => handleDeletePayment(item._id)}
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
