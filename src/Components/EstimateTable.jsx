import React from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaPrint, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const stylebutton =
  "text-[#3598dc] cursor-pointer border border-[#3598dc] hover:bg-[#3598dc] hover:text-white font-medium flex items-center gap-1 px-1";

const EstimateTable = () => {
  const navigate = useNavigate();

  // New function to handle navigation for Print/Copy buttons
  const handlePrintCopyNavigation = (copyType) => {
    navigate("/payments/taxInvoiceDetails", {
      state: { heading: copyType },
    });
  };

  return (
    <div className="overflow-x-auto p-2">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead className="border  border-gray-300">
          <tr>
            <th
              scope="col"
              className="px-4 py-2 text-left text-xs font-medium text-black uppercase tracking-wider"
            >
              S.No.
            </th>

            <th
              scope="col"
              className="px-4 py-2 text-left text-xs font-medium text-black uppercase tracking-wider"
            >
              Estimate Details
            </th>

            <th
              scope="col"
              className="px-4 py-2 text-left text-xs font-medium text-black uppercase tracking-wider"
            >
              Performa Inv.
            </th>

            <th
              scope="col"
              className="px-4 py-2 text-left text-xs font-medium text-black uppercase tracking-wider"
            >
              {" "}
              Invoice Details
            </th>

            <th
              scope="col"
              className="px-4 py-2 text-left text-xs font-medium text-black uppercase tracking-wider"
            >
              Print
            </th>

            <th
              scope="col"
              className="px-4 py-2 text-left text-xs font-medium text-black uppercase tracking-wider"
            >
              Updated Details
            </th>

            <th
              scope="col"
              className="px-4 py-2 text-left text-xs font-medium text-black uppercase tracking-wider"
            >
              Action
            </th>
          </tr>
        </thead>

        <tbody className="bg-white border border-gray-300">
          {/* Sample Row */} 
          <tr>
            <td className="border border-gray-300 px-4 py-2 whitespace-nowrap text-xs text-black">
              1
            </td>

            <td className="border border-gray-300 px-4 py-2 whitespace-now-wrap text-xs text-black">
              <button
                onClick={() => navigate("/payments/estimateDetails")}
                className="text-[#3598dc] cursor-pointer hover:text-[#566e7d] font-medium flex items-center gap-1 px-1"
              >
                NGW/24-25/EST/019{" "}
              </button>
              | 21 Dec 24 | 53100
            </td>

            <td className="border border-gray-300 px-4 py-2 whitespace-nowrap text-xs text-black">
              <button
                onClick={() => navigate("/payments/performanceInvoiceDetails")}
                className="text-[#3598dc] cursor-pointer hover:text-blue-900 font-medium"
              >
                NGW/25-26/PI/116 | 06 Sep 25 | 70800
              </button>
            </td>

            <td className="border border-gray-300 px-4 py-2 whitespace-nowrap text-xs text-black ">
              <button
                onClick={() => navigate("/payments/createInvoice")}
                className={stylebutton}
              >
                Create INV
              </button>
            </td>
            <td className="border border-gray-300 px-4 py-2 whitespace-nowrap text-xs text-black"></td>

            <td className="border border-gray-300 px-4 py-2 whitespace-nowrap text-xs text-black">
              2025-09-25
            </td>

            <td className=" border border-gray-300 px-4 py-2 whitespace-nowrap text-xs font-medium flex gap-2">
              <button className=" border border-gray-300 text-red-600 hover:text-red-900 px-2 cursor-pointer">
                x
              </button>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2 whitespace-nowrap text-xs text-black">
              1
            </td>

            <td className="border border-gray-300 px-4 py-2 whitespace-now-wrap text-xs text-black">
              {" "}
              <Link to="/performaInvoicemain">
                <button className="text-[#3598dc] cursor-pointer hover:text-[#566e7d] font-medium flex items-center gap-1 px-1">
                  NGW/24-25/EST/019{" "}
                </button>
              </Link>{" "}
              | 21 Dec 24 | 53100
            </td>

            <td className="border border-gray-300 px-4 py-2 whitespace-nowrap text-xs text-black">
              <Link to="/performaInvoice">
                <button className="text-[#3598dc] cursor-pointer hover:text-blue-900 font-medium">
                  NGW/25-26/PI/116 | 06 Sep 25 | 70800
                </button>
              </Link>
            </td>

            <td className="border border-gray-300 px-4 py-2 whitespace-nowrap text-xs text-black">
              NGW/INV/24-25/026 | 19 Feb 25 | 53100
            </td>
            {/* THIS IS THE CELL YOU ASKED TO CHANGE */}
            <td className="border border-gray-300 px-2 py-2 whitespace-nowrap text-xs text-black ">
              <div className="flex justify-between gap-1">
                {/* Original Copy Button */}
                <button
                  onClick={() => handlePrintCopyNavigation("Original Copy")}
                  className={stylebutton}
                >
                  O
                </button>

                {/* Duplicate Copy Button */}
                <button
                  onClick={() => handlePrintCopyNavigation("Duplicate Copy")}
                  className={stylebutton}
                >
                  D
                </button>

                {/* Triplicate Copy Button */}
                <button
                  onClick={() => handlePrintCopyNavigation("Triplicate Copy")}
                  className={stylebutton}
                >
                  T
                </button>
              </div>
            </td>

            <td className="border border-gray-300 px-4 py-2 whitespace-nowrap text-xs text-black">
              2025-09-25
            </td>

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

export default EstimateTable;
