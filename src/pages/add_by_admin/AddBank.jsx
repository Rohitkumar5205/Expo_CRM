import React, { useEffect, useMemo, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchBanks,
  addBank,
  updateBank,
  deleteBank,
} from "../../features/add_by_admin/banks/bankSlice";
import { showError, showSuccess } from "../../utils/toastMessage";

/** Simple Pagination component */
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];
  const start = Math.max(1, currentPage - 2);
  const end = Math.min(totalPages, currentPage + 2);
  for (let p = start; p <= end; p++) pages.push(p);

  return (
    <div style={styles.pagination}>
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        style={{
          ...styles.pageBtn,
          ...(currentPage === 1 ? styles.disabledBtn : {}),
        }}
      >
        {"<<"}
      </button>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={{
          ...styles.pageBtn,
          ...(currentPage === 1 ? styles.disabledBtn : {}),
        }}
      >
        {"<"}
      </button>

      {start > 1 && <span style={styles.pageGap}>...</span>}

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          style={{
            ...styles.pageBtn,
            ...(p === currentPage ? styles.activePageBtn : {}),
          }}
        >
          {p}
        </button>
      ))}

      {end < totalPages && <span style={styles.pageGap}>...</span>}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={{
          ...styles.pageBtn,
          ...(currentPage === totalPages ? styles.disabledBtn : {}),
        }}
      >
        {">"}
      </button>
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        style={{
          ...styles.pageBtn,
          ...(currentPage === totalPages ? styles.disabledBtn : {}),
        }}
      >
        {">>"}
      </button>
    </div>
  );
};

const AddBank = () => {
  const dispatch = useDispatch();

  const [editingBank, setEditingBank] = useState(null);
  const [formData, setFormData] = useState({
    bankname: "",
    bankbranch: "",
    accountno: "",
    ifsccode: "",
    status: "Active",
  });

  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState({ key: "bankname", dir: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [errors, setErrors] = useState({});

  const {
    banks,
    loading: isLoading,
    error,
  } = useSelector((state) => state.banks) || {};
  console.log("add banks data", banks);

  useEffect(() => {
    dispatch(fetchBanks());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const resetForm = () => {
    setFormData({
      bankname: "",
      bankbranch: "",
      accountno: "",
      ifsccode: "",
      status: "Active",
    });
    setEditingBank(null);
  };

  const handleAddOrUpdateBank = async (e) => {
    e.preventDefault(); // Prevent default form submission
    const validationErrors = {};
    if (!formData.bankname.trim())
      validationErrors.bankname = "Bank Name is required.";
    if (!formData.bankbranch.trim())
      validationErrors.bankbranch = "Bank Branch is required.";
    if (!formData.accountno.trim()) {
      validationErrors.accountno = "Account No. is required.";
    } else if (!/^\d+$/.test(formData.accountno)) {
      validationErrors.accountno = "Account No. must contain only digits.";
    }
    if (!formData.ifsccode.trim()) {
      validationErrors.ifsccode = "IFSC Code is required.";
    }
    /* ** Removed the following block as requested: 
    {
      validationErrors.ifsccode =
        "Invalid IFSC Code format (e.g., SBIN0123456).";
    }
    */
    if (!formData.status) validationErrors.status = "Status is required.";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      showError("Please correct the errors before submitting.");
      return;
    }
    setErrors({});
    const trimmedAccountNo = formData.accountno.trim();
    const duplicate = (Array.isArray(banks) ? banks : []).find(
      (bank) =>
        (bank.accountno || "").trim() === trimmedAccountNo &&
        (!editingBank || bank._id !== editingBank._id)
    );
    if (duplicate) {
      showError("A bank with that account number already exists!");
      return;
    }

    try {
      if (editingBank) {
        await dispatch(
          updateBank({ id: editingBank._id, updatedData: formData })
        ).unwrap();
        showSuccess("Bank details updated successfully!");
      } else {
        await dispatch(addBank(formData)).unwrap();
        showSuccess("Bank added successfully!");
      }
      resetForm();
      dispatch(fetchBanks());
    } catch (err) {
      const action = editingBank ? "update" : "create";
      showError(`Failed to ${action} bank. Please try again.`);
      console.error(`Failed to ${action} bank:`, err);
      resetForm();
    }
  };

  const handleEdit = (itemId) => {
    const itemToEdit = banks.find((item) => item._id === itemId);
    if (itemToEdit) {
      setFormData(itemToEdit);
      setEditingBank(itemToEdit);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleDelete = async (bankId) => {
    {
      try {
        await dispatch(deleteBank(bankId)).unwrap();
        showSuccess("Bank deleted successfully!");
        dispatch(fetchBanks());
      } catch (err) {
        showError("Failed to delete bank. Please try again.");
        console.error("Failed to delete bank:", err);
      }
    }
  };

  const filteredAndSortedItems = useMemo(() => {
    let list = Array.isArray(banks) ? banks.filter(Boolean) : [];
    if (searchText && searchText.trim()) {
      const s = searchText.trim().toLowerCase();
      list = list.filter(
        (bank) =>
          (bank.bankname || "").toLowerCase().includes(s) ||
          (bank.bankbranch || "").toLowerCase().includes(s) ||
          (bank.accountno || "").toLowerCase().includes(s) ||
          (bank.ifsccode || "").toLowerCase().includes(s)
      );
    }
    if (statusFilter === "Active" || statusFilter === "Inactive") {
      list = list.filter((c) => c.status === statusFilter);
    }
    const { key, dir } = sortBy;
    list.sort((a, b) => {
      let av = a[key];
      let bv = b[key];
      if (typeof av === "string") {
        av = (av || "").toString().toLowerCase();
        bv = (bv || "").toString().toLowerCase();
      }
      if (av < bv) return dir === "asc" ? -1 : 1;
      if (av > bv) return dir === "asc" ? 1 : -1;
      return 0;
    });
    return list;
  }, [banks, searchText, statusFilter, sortBy]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredAndSortedItems.length / rowsPerPage)
  );
  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [totalPages, currentPage]);

  const currentPageData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredAndSortedItems.slice(start, start + rowsPerPage);
  }, [filteredAndSortedItems, currentPage, rowsPerPage]);

  const toggleSort = (key) => {
    setSortBy((prev) => {
      if (prev.key === key) {
        return { ...prev, dir: prev.dir === "asc" ? "desc" : "asc" };
      } else {
        return { key, dir: "asc" };
      }
    });
  };

  return (
    <div
      className="w-full"
      style={{ backgroundColor: "#ecf0f5", minHeight: "100vh", padding: "0" }}
    >
      {/* Header Section */}
      <div
        className="w-full bg-white"
        style={{ borderBottom: "1px solid #e0e0e0" }}
      >
        <div className="flex items-center justify-between px-6 py-3">
          <h1 className="text-lg font-normal" style={{ color: "#666" }}>
            ADD BY ADMIN | ADD BANK
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ padding: "20px" }}>
        {/* Add/Edit Section */}
        <form
          onSubmit={handleAddOrUpdateBank}
          className="bg-white mb-5"
          style={{ border: "1px solid #ddd" }}
        >
          {" "}
          <div
            className="px-5 py-3"
            style={{
              backgroundColor: "#f9f9f9",
              borderBottom: "1px solid #ddd",
            }}
          >
            <h2
              className="text-base font-semibold"
              style={{ color: "#555", margin: 0 }}
            >
              {editingBank ? "EDIT BANK" : "ADD BANK"}
            </h2>
          </div>
          <div className="p-6">
            <div
              className="flex items-start gap-4"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)",
                gap: "1rem",
              }}
            >
              {/* Bank Name */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label
                  className="block text-sm font-medium"
                  style={{ color: "#333" }}
                >
                  Bank Name <span style={{ color: "#f44336" }}>*</span>
                </label>
                <input
                  type="text"
                  name="bankname"
                  value={formData.bankname}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 text-sm"
                  style={styles.input}
                />
                {errors.bankname && (
                  <div style={styles.errorText}>{errors.bankname}</div>
                )}
              </div>

              {/* Bank Branch */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label
                  className="block text-sm font-medium"
                  style={{ color: "#333" }}
                >
                  Bank Branch <span style={{ color: "#f44336" }}>*</span>
                </label>
                <input
                  type="text"
                  name="bankbranch"
                  value={formData.bankbranch}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 text-sm"
                  style={styles.input}
                />
                {errors.bankbranch && (
                  <div style={styles.errorText}>{errors.bankbranch}</div>
                )}
              </div>

              {/* Account No. */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label
                  className="block text-sm font-medium"
                  style={{ color: "#333" }}
                >
                  Account No. <span style={{ color: "#f44336" }}>*</span>
                </label>
                <input
                  type="text"
                  name="accountno"
                  value={formData.accountno}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 text-sm"
                  style={styles.input}
                />
                {errors.accountno && (
                  <div style={styles.errorText}>{errors.accountno}</div>
                )}
              </div>

              {/* IFSC Code */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label
                  className="block text-sm font-medium"
                  style={{ color: "#333" }}
                >
                  IFSC Code <span style={{ color: "#f44336" }}>*</span>
                </label>
                <input
                  type="text"
                  name="ifsccode"
                  value={formData.ifsccode}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 text-sm"
                  style={styles.input}
                />
                {errors.ifsccode && (
                  <div style={styles.errorText}>{errors.ifsccode}</div>
                )}
              </div>

              {/* Status Field */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label
                  className="block text-sm font-medium"
                  style={{ color: "#333" }}
                >
                  Status <span style={{ color: "#f44336" }}>*</span>
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm"
                  style={styles.input}
                  required
                >
                  <option value="" disabled>
                    Select Here
                  </option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
                {errors.status && (
                  <div style={styles.errorText}>{errors.status}</div>
                )}
              </div>
            </div>
            {/* Add / Update Button */}
            <div className="mt-6" style={{ display: "flex", gap: 12 }}>
              <button
                type="submit"
                className="px-6 py-2 text-sm text-white"
                style={{
                  backgroundColor: "#337ab7",
                  border: "none",
                  borderRadius: 3,
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                {editingBank ? "Update Bank" : "Save"}
              </button>
              {editingBank && (
                <button
                  onClick={resetForm}
                  className="px-4 py-2 text-sm"
                  style={{
                    backgroundColor: "#e0e0e0",
                    color: "#333",
                    borderRadius: 3,
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </form>

        {/* List Section */}
        <div className="bg-white" style={{ border: "1px solid #ddd" }}>
          {/* Table header with filters and search */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px 20px",
              borderBottom: "1px solid #eee",
              backgroundColor: "#f9f9f9",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <label
                style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
              >
                <span style={{ color: "#333", fontSize: 13 }}>Show</span>
                <select
                  value={rowsPerPage}
                  onChange={(e) => {
                    setRowsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  style={styles.smallSelect}
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
                <span style={{ color: "#333", fontSize: 13 }}>entries</span>
              </label>

              <button
                style={{
                  ...styles.smallActionBtn,
                  padding: "8px 12px",
                  backgroundColor: "#f7f7f7",
                  border: "1px solid #ddd",
                  borderRadius: "3px",
                  cursor: "pointer",
                  fontSize: "13px",
                }}
              >
                Inactive List
              </button>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ color: "#333", fontSize: 13 }}>Search:</span>
              <input
                type="text"
                placeholder="Search..."
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                  setCurrentPage(1);
                }}
                style={styles.searchInput}
              />
              <button
                onClick={() => {
                  setSearchText("");
                  setStatusFilter("All");
                  setRowsPerPage(10);
                  setSortBy({ key: "bankname", dir: "asc" });
                }}
                style={{
                  ...styles.smallActionBtn,
                  padding: "8px 12px",
                  backgroundColor: "#fff",
                  border: "1px solid #ddd",
                  borderRadius: "3px",
                  cursor: "pointer",
                  fontSize: "13px",
                }}
              >
                Reset
              </button>
            </div>
          </div>

          {/* Table */}
          <div style={{ maxHeight: "500px", overflowY: "auto" }}>
            <table
              className="w-full"
              style={{
                borderCollapse: "collapse",
                width: "100%",
                backgroundColor: "#fff",
              }}
            >
              <thead
                style={{
                  position: "sticky",
                  top: 0,
                  backgroundColor: "#f5f5f5",
                  zIndex: 1,
                }}
              >
                <tr style={{ borderBottom: "2px solid #ddd" }}>
                  <th
                    className="px-4 py-3 text-sm font-semibold text-center"
                    style={thStyle(50)}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      S.No
                    </div>
                  </th>
                  <th
                    className="px-4 py-3 text-sm font-semibold text-left"
                    style={thStyle(150)}
                  >
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 8 }}
                    >
                      Bank Name
                      <button
                        onClick={() => toggleSort("bankname")}
                        style={styles.sortBtn}
                      >
                        {sortBy.key === "bankname"
                          ? sortBy.dir === "asc"
                            ? "▲"
                            : "▼"
                          : "↕"}
                      </button>
                    </div>{" "}
                  </th>
                  <th
                    className="px-4 py-3 text-sm font-semibold text-left"
                    style={thStyle(150)}
                  >
                    Bank Branch
                  </th>
                  <th
                    className="px-4 py-3 text-sm font-semibold text-left"
                    style={thStyle(150)}
                  >
                    Account Number
                  </th>
                  <th
                    className="px-4 py-3 text-sm font-semibold text-left"
                    style={thStyle(120)}
                  >
                    IFSC Code
                  </th>
                  <th
                    className="px-4 py-3 text-sm font-semibold text-center"
                    style={thStyle(100)}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 4,
                      }}
                    >
                      Status
                      <button
                        onClick={() => toggleSort("status")}
                        style={styles.sortBtn}
                      >
                        {sortBy.key === "status"
                          ? sortBy.dir === "asc"
                            ? "▲"
                            : "▼"
                          : "↕"}
                      </button>
                    </div>
                  </th>
                  <th
                    className="px-4 py-3 text-sm font-semibold text-center"
                    style={thStyle(100)}
                  >
                    Updated
                  </th>
                  <th
                    className="px-4 py-3 text-sm font-semibold text-center"
                    style={thStyle(120)}
                  >
                    Updated By
                  </th>
                  <th
                    className="px-4 py-3 text-sm font-semibold text-center"
                    style={thStyle(100)}
                  >
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {isLoading ? (
                  <tr>
                    <td
                      colSpan={9}
                      style={{
                        padding: 24,
                        textAlign: "center",
                        color: "#777",
                      }}
                    >
                      Loading banks...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td
                      colSpan={9}
                      style={{ padding: 24, textAlign: "center", color: "red" }}
                    >
                      Error: {error}
                    </td>
                  </tr>
                ) : currentPageData.length === 0 ? (
                  <tr>
                    <td
                      colSpan={9}
                      style={{
                        padding: 24,
                        textAlign: "center",
                        color: "#777",
                        backgroundColor: "#fff",
                      }}
                    >
                      No bank entries found.
                    </td>
                  </tr>
                ) : (
                  currentPageData.map((item, index) => (
                    <tr
                      key={item._id}
                      style={{
                        borderBottom: "1px solid #ddd",
                        backgroundColor:
                          index % 2 === 0 ? "#ffffff" : "#f9f9f9",
                      }}
                    >
                      <td
                        className="px-4 py-3 text-sm text-center"
                        style={{ color: "#333", width: 50 }}
                      >
                        {(currentPage - 1) * rowsPerPage + index + 1}
                      </td>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: "#333" }}
                      >
                        {item?.bankname || ""}
                      </td>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: "#333" }}
                      >
                        {item?.bankbranch || ""}
                      </td>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: "#333" }}
                      >
                        {item?.accountno || ""}
                      </td>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: "#333" }}
                      >
                        {item.ifsccode || ""}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span
                          className="inline-block px-3 py-1 text-xs text-white"
                          style={{
                            backgroundColor:
                              item.status.toLowerCase() === "active"
                                ? "#337ab7"
                                : "#d9534f",
                            borderRadius: 3,
                          }}
                        >
                          {item?.status || ""}
                        </span>
                      </td>
                      <td
                        className="px-4 py-3 text-sm text-center"
                        style={{ color: "#333" }}
                      >
                        {new Date(item?.updated).toLocaleDateString()}
                      </td>
                      <td
                        className="px-4 py-3 text-sm text-center"
                        style={{ color: "#333" }}
                      >
                        {item?.updated_by || "N/A"}
                      </td>
                      <td className="px-4 py-3" style={{ textAlign: "center" }}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            gap: 8,
                          }}
                        >
                          <button
                            onClick={() => handleEdit(item._id)}
                            style={{
                              ...styles.iconBtn,
                              borderColor: "#337ab7",
                              color: "#337ab7",
                            }}
                            title="Edit"
                          >
                            <Pencil size={14} />
                          </button>

                          <button
                            onClick={() => handleDelete(item._id)}
                            style={{
                              ...styles.iconBtn,
                              borderColor: "#d9534f",
                              color: "#d9534f",
                            }}
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Footer: Pagination and summary */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 12,
              backgroundColor: "#fff",
            }}
          >
            <div style={{ color: "#666", fontSize: 13 }}>
              Showing{" "}
              <strong style={{ color: "#333" }}>
                {filteredAndSortedItems.length === 0
                  ? 0
                  : (currentPage - 1) * rowsPerPage + 1}
              </strong>{" "}
              to{" "}
              <strong style={{ color: "#333" }}>
                {Math.min(
                  currentPage * rowsPerPage,
                  filteredAndSortedItems.length
                )}
              </strong>{" "}
              of{" "}
              <strong style={{ color: "#333" }}>
                {filteredAndSortedItems.length}
              </strong>{" "}
              entries
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------------------------
   Inline styles (kept organized)
   --------------------------- */

const styles = {
  input: {
    border: "1px solid #d2d6de",
    borderRadius: 3,
    padding: "8px 10px",
    fontSize: 14,
    width: "100%",
    boxSizing: "border-box",
  },
  radioLabel: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    cursor: "pointer",
  },
  smallActionBtn: {
    backgroundColor: "#f7f7f7",
    border: "1px solid #ddd",
    padding: "6px 10px",
    borderRadius: 3,
    cursor: "pointer",
    fontSize: 13,
  },
  searchInput: {
    padding: "8px 10px",
    borderRadius: 3,
    border: "1px solid #d2d6de",
    width: 200,
  },
  clearBtn: {
    padding: "8px 10px",
    borderRadius: 3,
    border: "1px solid #ddd",
    backgroundColor: "#fff",
    cursor: "pointer",
    fontSize: 13,
  },
  smallSelect: {
    padding: "6px 8px",
    borderRadius: 3,
    border: "1px solid #d2d6de",
  },
  iconBtn: {
    padding: 6,
    borderRadius: 4,
    border: "1px solid #ccc",
    backgroundColor: "white",
    cursor: "pointer",
  },
  sortBtn: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    padding: 2,
    fontSize: 12,
  },
  messageBox: {
    backgroundColor: "#e9f7ef",
    border: "1px solid #c7efd9",
    padding: "8px 12px",
    borderRadius: 4,
    marginBottom: 12,
    color: "#2f7a4b",
    display: "inline-block",
  },
  pagination: {
    display: "flex",
    gap: 6,
    alignItems: "center",
  },
  pageBtn: {
    padding: "6px 9px",
    border: "1px solid #ddd",
    borderRadius: 4,
    cursor: "pointer",
    background: "white",
  },
  disabledBtn: {
    opacity: 0.5,
    cursor: "not-allowed",
  },
  activePageBtn: {
    backgroundColor: "#3598dc",
    color: "white",
    borderColor: "#2f82c4",
  },
  pageGap: {
    padding: "0 6px",
    color: "#999",
  },
  errorText: {
    color: "#f44336",
    fontSize: "12px",
    marginTop: "4px",
  },
};

/* Helper to produce th style with fixed width optional */
const thStyle = (width) => ({
  color: "#333",
  borderRight: "1px solid #ddd",
  textAlign: "left",
  width: width ? width : "auto",
  padding: "12px 8px",
});

export default AddBank;
