import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaEdit, FaPrint, FaTrash } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
// ⚠️ ADJUST THESE IMPORT PATHS ⚠️
import { fetchEstimates } from "../features/estimates/estimateSlice";
import { createPerformaInvoice } from "../features/performaInvoice/performaInvoiceSlice";

const stylebutton =
  "text-[#3598dc] cursor-pointer border border-[#3598dc] hover:bg-[#3598dc] hover:text-white font-medium flex items-center gap-1 px-1";

// Helper function to format the PI details
const formatPiDisplay = (pi) => {
  if (!pi || !pi.added) return "";
  const dateObj = new Date(pi.added);
  const date = dateObj
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "2-digit",
    })
    .replace(/\//g, " ");
  return `${pi.pi_no} | ${date} | ${pi.finalAmount}`;
};

const EstimateTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  // Redux state for estimates
  const { estimates, loading: estimatesLoading } = useSelector(
    (state) => state.estimates
  );

  // Local state to track PI creation status for EACH row
  // Format: { [estimateId]: { isCreating: boolean, piData: object | null, error: string | null } }
  const [perInvoiceState, setPerInvoiceState] = useState({});

  // 2. Find the specific company based on the ID from the URL
  useEffect(() => {
    if (estimates.length > 0 && id) {
      const matchedEstimate = estimates.find((c) => c._id === id);
      // This line was causing an error in your original code since 'matchedEstimate' was not defined in the scope
      // For now, let's keep it simple or remove it if not strictly necessary for the table view.
      // setEstimate(matchedEstimate);
    }
  }, [estimates, id]);

  // Fetch all estimates on component mount
  useEffect(() => {
    dispatch(fetchEstimates());
  }, [dispatch]);

  // Handler for PI creation
  const handleCreatePI = useCallback(
    (estimate, totalFinalAmount) => {
      const estimateId = estimate._id;

      // 1. Set row-specific loading state
      setPerInvoiceState((prev) => ({
        ...prev,
        [estimateId]: { isCreating: true, piData: null, error: null },
      }));

      const invoiceData = {
        est_no: estimate.est_no,
        companyId: estimate.companyId,
        finalAmount: totalFinalAmount,
      };

      // 2. Dispatch the async thunk
      dispatch(createPerformaInvoice(invoiceData))
        .unwrap()
        .then((newPiData) => {
          // 3. Success: Update row state with the new PI data
          setPerInvoiceState((prev) => ({
            ...prev,
            [estimateId]: { isCreating: false, piData: newPiData, error: null },
          }));
        })
        .catch((err) => {
          // 4. Failure: Update row state with the error
          setPerInvoiceState((prev) => ({
            ...prev,
            [estimateId]: {
              isCreating: false,
              piData: null,
              error: err || "Failed to create PI",
            },
          }));
        });
    },
    [dispatch]
  );

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
          {estimates.map((estimate, index) => {
            // 💰 Calculate Amount
            const totalFinalAmount = estimate?.items?.reduce((total, item) => {
              return total + (parseFloat(item.finalAmount) || 0);
            }, 0);
            const displayAmount = totalFinalAmount?.toFixed(2) || "0.00";

            // 📅 Format Dates
            let formattedDate = "N/A";
            if (estimate?.supply_date) {
              const dateObj = new Date(estimate.supply_date);
              formattedDate = dateObj
                .toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "2-digit",
                })
                .replace(/\//g, " ");
            }
            let formattedUpdatedDate = "N/A";
            if (estimate?.updated) {
              const dateObj = new Date(estimate.updated);
              formattedUpdatedDate = dateObj
                .toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "2-digit",
                })
                .replace(/\//g, " ");
            }

            // 🔍 Get PI status from local state
            const rowState = perInvoiceState[estimate._id] || {};
            // ℹ️ Check if PI data exists (either already in estimate or in local state after creation)
            const currentPiData =
              rowState.piData || estimate.performa_invoice_data; // Replace 'performa_invoice_data' with actual property name

            return (
              <tr key={estimate._id}>
                <td className="border border-gray-300 px-4 py-2 whitespace-nowrap text-xs text-black">
                  {index + 1}
                </td>

                <td className="border border-gray-300 px-4 py-2 whitespace-nowrap text-xs text-black">
                  <Link to="/performaInvoicemain">
                    <button className="text-[#3598dc] cursor-pointer hover:text-[#566e7d] font-medium flex items-center gap-1 px-1">
                      {estimate?.est_no}
                    </button>
                  </Link>
                  | {formattedDate} | {displayAmount}
                </td>

                {/* 🚀 PERFORMA INVOICE CELL LOGIC 🚀 */}
                <td className="border border-gray-300 px-4 py-2 whitespace-nowrap text-xs text-black">
                  {rowState.error && (
                    <p className="text-red-500 mb-1">{rowState.error}</p>
                  )}

                  {currentPiData ? (
                    // 🟢 Show PI Link
                    <Link to={`/performaInvoice/${currentPiData._id}`}>
                      <button className="text-[#3598dc] cursor-pointer hover:text-blue-900 font-medium">
                        {formatPiDisplay(currentPiData)}
                      </button>
                    </Link>
                  ) : (
                    // 🟡 Show Create PI Button
                    <button
                      className={stylebutton}
                      onClick={() => handleCreatePI(estimate, totalFinalAmount)}
                      disabled={rowState.isCreating}
                    >
                      {rowState.isCreating ? "Creating..." : "Create PI"}
                    </button>
                  )}
                </td>

                {/* ... Invoice Details Cell ... */}
                <td className="border border-gray-300 px-4 py-2 whitespace-nowrap text-xs text-black">
                  NGW/INV/24-25/026 | 19 Feb 25 | 53100
                  <button
                    onClick={() => navigate("/payments/createInvoice")}
                    className={stylebutton}
                  >
                    Create INV
                  </button>
                </td>

                {/* ... Print, Updated Details, Action cells ... */}
                <td className="border border-gray-300 px-2 py-2 whitespace-nowrap text-xs text-black ">
                  <div className="flex justify-between gap-1">
                    <button
                      onClick={() => handlePrintCopyNavigation("Original Copy")}
                      className={stylebutton}
                    >
                      O
                    </button>
                    <button
                      onClick={() =>
                        handlePrintCopyNavigation("Duplicate Copy")
                      }
                      className={stylebutton}
                    >
                      D
                    </button>
                    <button
                      onClick={() =>
                        handlePrintCopyNavigation("Triplicate Copy")
                      }
                      className={stylebutton}
                    >
                      T
                    </button>
                  </div>
                </td>

                <td className="border border-gray-300 px-4 py-2 whitespace-nowrap text-xs text-black">
                  {formattedUpdatedDate} | {estimate?.added_by}
                </td>

                <td className="border border-gray-300 px-4 py-2 whitespace-nowrap text-xs font-medium flex gap-2">
                  <button className="border border-gray-300 text-red-600 hover:text-red-900 px-2 cursor-pointer">
                    x
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default EstimateTable;
