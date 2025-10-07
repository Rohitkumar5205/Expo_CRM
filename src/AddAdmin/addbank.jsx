import React, { useEffect, useMemo, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

/* ---------------------------
   Helper components & utils
   --------------------------- */

/** A small reusable Modal component */
const Modal = ({ open, title, children, onClose, onConfirm, confirmText = "Confirm", cancelText = "Cancel" }) => {
  if (!open) return null;
  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalBox}>
        <div style={styles.modalHeader}>
          <h3 style={{ margin: 0 }}>{title}</h3>
        </div>
        <div style={styles.modalBody}>{children}</div>
        <div style={styles.modalFooter}>
          <button style={{ ...styles.modalBtn, ...styles.cancelBtn }} onClick={onClose}>
            {cancelText}
          </button>
          <button style={{ ...styles.modalBtn, ...styles.confirmBtn }} onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

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
        style={{ ...styles.pageBtn, ...(currentPage === 1 ? styles.disabledBtn : {}) }}
      >
        {"<<"}
      </button>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={{ ...styles.pageBtn, ...(currentPage === 1 ? styles.disabledBtn : {}) }}
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
        style={{ ...styles.pageBtn, ...(currentPage === totalPages ? styles.disabledBtn : {}) }}
      >
        {">"}
      </button>
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        style={{ ...styles.pageBtn, ...(currentPage === totalPages ? styles.disabledBtn : {}) }}
      >
        {">>"}
      </button>
    </div>
  );
};

/* ---------------------------
   Main AddBank Component
   --------------------------- */

const LOCAL_STORAGE_KEY = "add_bank_list_v1";

const AddBank = () => {
  const [editingBank, setEditingBank] = useState(null);
  const [formData, setFormData] = useState({
    bankName: "",
    bankBranch: "",
    accountNo: "",
    ifscCode: "",
    status: "",
  });
  const [bankList, setBankList] = useState(() => {
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {
      console.warn("Failed to parse bank list from localStorage", e);
    }
    return [
      {
        id: 1,
        bankName: "Punjab National Bank",
        bankBranch: "Vikas Marg, Preet Vihar",
        accountNo: "12005015000779",
        ifscCode: "PUNB0139900",
        status: "Active",
        updated: "03 Oct 25",
        updatedBy: "Admin",
      },
      {
        id: 2,
        bankName: "Kotak Mahindra Bank",
        bankBranch: "Jagriti Nagar, Anand Vihar",
        accountNo: "1611490044",
        ifscCode: "KKBK0004584",
        status: "Active",
        updated: "30 Sep 23",
        updatedBy: "Mohit Tyagi",
      },
    ];
  });

  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState({ key: "id", dir: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [bankToDelete, setBankToDelete] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(bankList));
    } catch (e) {
      console.warn("Failed to save bank list to localStorage", e);
    }
  }, [bankList]);

  const showMessage = (text, ms = 2000) => {
    setMessage(text);
    window.setTimeout(() => setMessage(null), ms);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      bankName: "",
      bankBranch: "",
      accountNo: "",
      ifscCode: "",
      status: "Active",
    });
    setEditingBank(null);
  };

  const handleAddOrUpdateBank = () => {
    if (!formData.bankName || !formData.bankBranch || !formData.accountNo || !formData.ifscCode || !formData.status) {
      showMessage("All fields marked with * are required!");
      return;
    }

    const trimmedAccountNo = formData.accountNo.trim();
    const duplicate = bankList.find(
      (bank) =>
        bank.accountNo.trim().toLowerCase() === trimmedAccountNo.toLowerCase() &&
        (!editingBank || bank.id !== editingBank.id)
    );
    if (duplicate) {
      showMessage("A bank with that account number already exists!");
      return;
    }

    const now = new Date();
    const updatedDate = `${now.getDate().toString().padStart(2, '0')} ${now.toLocaleString('default', { month: 'short' })} ${now.getFullYear().toString().slice(-2)}`;
    const updatedBy = "Admin"; // You can replace this with a real user name

    if (editingBank) {
      setBankList((prev) =>
        prev.map((item) =>
          item.id === editingBank.id
            ? { ...item, ...formData, updated: updatedDate, updatedBy }
            : item
        )
      );
      showMessage("Bank details updated successfully!");
      resetForm();
    } else {
      const newId = bankList.length > 0 ? Math.max(...bankList.map((c) => c.id)) + 1 : 1;
      const newItem = {
        id: newId,
        ...formData,
        updated: updatedDate,
        updatedBy,
      };
      setBankList((prev) => [...prev, newItem]);
      showMessage("Bank added successfully!");
      resetForm();
    }
  };

  const handleEdit = (itemId) => {
    const itemToEdit = bankList.find((item) => item.id === itemId);
    if (itemToEdit) {
      setFormData({
        bankName: itemToEdit.bankName,
        bankBranch: itemToEdit.bankBranch,
        accountNo: itemToEdit.accountNo,
        ifscCode: itemToEdit.ifscCode,
        status: itemToEdit.status,
      });
      setEditingBank(itemToEdit);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const openDeleteModal = (itemId) => {
    const item = bankList.find((c) => c.id === itemId);
    setBankToDelete(item);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setBankToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (!bankToDelete) {
      closeDeleteModal();
      return;
    }
    setBankList((prev) => prev.filter((c) => c.id !== bankToDelete.id));
    showMessage("Bank deleted successfully!");
    closeDeleteModal();
  };

  const filteredAndSortedItems = useMemo(() => {
    let list = [...bankList];
    if (searchText && searchText.trim()) {
      const s = searchText.trim().toLowerCase();
      list = list.filter(
        (bank) =>
          bank.bankName.toLowerCase().includes(s) ||
          bank.bankBranch.toLowerCase().includes(s) ||
          bank.accountNo.toLowerCase().includes(s) ||
          bank.ifscCode.toLowerCase().includes(s)
      );
    }
    if (statusFilter === "Active" || statusFilter === "Inactive") {
      list = list.filter((c) => c.status === statusFilter);
    }
    const { key, dir } = sortBy;
    list.sort((a, b) => {
      let av = a[key];
      let bv = b[key];
      if (key === "id") {
        av = Number(av);
        bv = Number(bv);
      } else {
        av = (av || "").toString().toLowerCase();
        bv = (bv || "").toString().toLowerCase();
      }
      if (av < bv) return dir === "asc" ? -1 : 1;
      if (av > bv) return dir === "asc" ? 1 : -1;
      return 0;
    });
    return list;
  }, [bankList, searchText, statusFilter, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredAndSortedItems.length / rowsPerPage));
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
    <div className="w-full" style={{ backgroundColor: "#ecf0f5", minHeight: "100vh", padding: "0" }}>
      {/* Header Section */}
      <div className="w-full bg-white" style={{ borderBottom: "1px solid #e0e0e0" }}>
        <div className="flex items-center justify-between px-6 py-3">
          <h1 className="text-lg font-normal" style={{ color: "#666" }}>ADD BY ADMIN | ADD BANK</h1>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ padding: "20px" }}>
        {/* Notification message */}
        {message && (
          <div style={styles.messageBox}>
            <span>{message}</span>
          </div>
        )}

        {/* Add/Edit Section */}
        <div className="bg-white mb-5" style={{ border: "1px solid #ddd" }}>
          <div className="px-5 py-3" style={{ backgroundColor: "#f9f9f9", borderBottom: "1px solid #ddd" }}>
            <h2 className="text-base font-semibold" style={{ color: "#555", margin: 0 }}>
              {editingBank ? "EDIT BANK" : "ADD BANK"}
            </h2>
          </div>

          <div className="p-6">
            <div className="flex items-start gap-4" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "1rem" }}>
              {/* Bank Name */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label className="block text-sm font-medium" style={{ color: "#333" }}>
                  Bank Name <span style={{ color: "#f44336" }}>*</span>
                </label>
                <input
                  type="text"
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm"
                  style={styles.input}
                />
              </div>

              {/* Bank Branch */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label className="block text-sm font-medium" style={{ color: "#333" }}>
                  Bank Branch <span style={{ color: "#f44336" }}>*</span>
                </label>
                <input
                  type="text"
                  name="bankBranch"
                  value={formData.bankBranch}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm"
                  style={styles.input}
                />
              </div>

              {/* Account No. */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label className="block text-sm font-medium" style={{ color: "#333" }}>
                  Account No. <span style={{ color: "#f44336" }}>*</span>
                </label>
                <input
                  type="text"
                  name="accountNo"
                  value={formData.accountNo}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm"
                  style={styles.input}
                />
              </div>

              {/* IFSC Code */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label className="block text-sm font-medium" style={{ color: "#333" }}>
                  IFSC Code <span style={{ color: "#f44336" }}>*</span>
                </label>
                <input
                  type="text"
                  name="ifscCode"
                  value={formData.ifscCode}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm"
                  style={styles.input}
                />
              </div>

              {/* Status Field */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label className="block text-sm font-medium" style={{ color: "#333" }}>
                  Status <span style={{ color: "#f44336" }}>*</span>
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm"
                  style={styles.input}
                >
                  <option value="" disabled>Select Here</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
            {/* Add / Update Button */}
            <div className="mt-6" style={{ display: "flex", gap: 12 }}>
              <button
                onClick={handleAddOrUpdateBank}
                className="px-6 py-2 text-sm text-white"
                style={{
                  backgroundColor: "#337ab7",
                  border: "none",
                  borderRadius: 3,
                  cursor: "pointer",
                  fontWeight: 600
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
        </div>

        {/* List Section */}
        <div className="bg-white" style={{ border: "1px solid #ddd" }}>
          {/* Table header with filters and search */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 20px", borderBottom: "1px solid #eee", backgroundColor: "#f9f9f9" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <label style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <span style={{ color: "#333", fontSize: 13 }}>Show</span>
                <select value={rowsPerPage} onChange={(e) => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); }} style={styles.smallSelect}>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
                <span style={{ color: "#333", fontSize: 13 }}>entries</span>
              </label>

              <button style={{ ...styles.smallActionBtn, padding: "8px 12px", backgroundColor: "#f7f7f7", border: "1px solid #ddd", borderRadius: "3px", cursor: "pointer", fontSize: "13px" }}>Inactive List</button>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ color: "#333", fontSize: 13 }}>Search:</span>
              <input
                type="text"
                placeholder="Search..."
                value={searchText}
                onChange={(e) => { setSearchText(e.target.value); setCurrentPage(1); }}
                style={styles.searchInput}
              />
              <button
                onClick={() => { setSearchText(""); setStatusFilter("All"); setRowsPerPage(10); setSortBy({ key: "id", dir: "asc" }); }}
                style={{ ...styles.smallActionBtn, padding: "8px 12px", backgroundColor: "#fff", border: "1px solid #ddd", borderRadius: "3px", cursor: "pointer", fontSize: "13px" }}
              >
                Reset
              </button>
            </div>
          </div>

          {/* Table */}
          <div style={{ maxHeight: "500px", overflowY: "auto" }}>
            <table className="w-full" style={{ borderCollapse: "collapse", width: "100%", backgroundColor: "#fff" }}>
              <thead style={{ position: "sticky", top: 0, backgroundColor: "#f5f5f5", zIndex: 1 }}>
                <tr style={{ borderBottom: "2px solid #ddd" }}>
                  <th className="px-4 py-3 text-sm font-semibold text-center" style={thStyle(50)}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
                      S.No.
                      <button onClick={() => toggleSort("id")} style={styles.sortBtn}>
                        {sortBy.key === "id" ? (sortBy.dir === "asc" ? "▲" : "▼") : "↕"}
                      </button>
                    </div>
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold text-left" style={thStyle(150)}>Bank Name</th>
                  <th className="px-4 py-3 text-sm font-semibold text-left" style={thStyle(150)}>Bank Branch</th>
                  <th className="px-4 py-3 text-sm font-semibold text-left" style={thStyle(150)}>Account Number</th>
                  <th className="px-4 py-3 text-sm font-semibold text-left" style={thStyle(120)}>IFSC Code</th>
                  <th className="px-4 py-3 text-sm font-semibold text-center" style={thStyle(100)}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
                      Status
                      <button onClick={() => toggleSort("status")} style={styles.sortBtn}>
                        {sortBy.key === "status" ? (sortBy.dir === "asc" ? "▲" : "▼") : "↕"}
                      </button>
                    </div>
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold text-center" style={thStyle(100)}>Updated</th>
                  <th className="px-4 py-3 text-sm font-semibold text-center" style={thStyle(120)}>Updated By</th>
                  <th className="px-4 py-3 text-sm font-semibold text-center" style={thStyle(100)}>Action</th>
                </tr>
              </thead>

              <tbody>
                {currentPageData.length === 0 ? (
                  <tr>
                    <td colSpan={9} style={{ padding: 24, textAlign: "center", color: "#777", backgroundColor: "#fff" }}>
                      No bank entries found.
                    </td>
                  </tr>
                ) : (
                  currentPageData.map((item, index) => (
                    <tr
                      key={item.id}
                      style={{
                        borderBottom: "1px solid #ddd",
                        backgroundColor: (index % 2 === 0) ? "#ffffff" : "#f9f9f9",
                      }}
                    >
                      <td className="px-4 py-3 text-sm text-center" style={{ color: "#333", width: 50 }}>
                        {item.id}
                      </td>
                      <td className="px-4 py-3 text-sm" style={{ color: "#333" }}>{item.bankName}</td>
                      <td className="px-4 py-3 text-sm" style={{ color: "#333" }}>{item.bankBranch}</td>
                      <td className="px-4 py-3 text-sm" style={{ color: "#333" }}>{item.accountNo}</td>
                      <td className="px-4 py-3 text-sm" style={{ color: "#333" }}>{item.ifscCode}</td>
                      <td className="px-4 py-3 text-center">
                        <span
                          className="inline-block px-3 py-1 text-xs text-white"
                          style={{
                            backgroundColor: item.status === "Active" ? "#337ab7" : "#d9534f",
                            borderRadius: 3,
                          }}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-center" style={{ color: "#333" }}>{item.updated}</td>
                      <td className="px-4 py-3 text-sm text-center" style={{ color: "#333" }}>{item.updatedBy}</td>
                      <td className="px-4 py-3" style={{ textAlign: "center" }}>
                        <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
                          <button
                            onClick={() => handleEdit(item.id)}
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
                            onClick={() => openDeleteModal(item.id)}
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
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: 12, backgroundColor: "#fff" }}>
            <div style={{ color: "#666", fontSize: 13 }}>
              Showing{" "}
              <strong style={{ color: "#333" }}>
                {(filteredAndSortedItems.length === 0) ? 0 : (currentPage - 1) * rowsPerPage + 1}
              </strong>{" "}
              to{" "}
              <strong style={{ color: "#333" }}>
                {Math.min(currentPage * rowsPerPage, filteredAndSortedItems.length)}
              </strong>{" "}
              of{" "}
              <strong style={{ color: "#333" }}>{filteredAndSortedItems.length}</strong> entries
            </div>

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        <Modal
          open={isDeleteModalOpen}
          title="Confirm Delete"
          onClose={closeDeleteModal}
          onConfirm={handleConfirmDelete}
          confirmText="Delete"
          cancelText="Cancel"
        >
          <div>
            Are you sure you want to delete this bank entry? This action cannot be undone.
          </div>
        </Modal>
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

  // modal
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.45)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  },
  modalBox: {
    width: 520,
    background: "#fff",
    borderRadius: 6,
    boxShadow: "0 6px 18px rgba(0,0,0,0.2)",
    overflow: "hidden",
  },
  modalHeader: {
    padding: "12px 16px",
    borderBottom: "1px solid #eee",
  },
  modalBody: {
    padding: 16,
    color: "#333",
  },
  modalFooter: {
    padding: 12,
    display: "flex",
    justifyContent: "flex-end",
    gap: 8,
    borderTop: "1px solid #eee",
  },
  modalBtn: {
    padding: "8px 12px",
    borderRadius: 4,
    cursor: "pointer",
    border: "none",
  },
  cancelBtn: {
    backgroundColor: "#f1f1f1",
    color: "#333",
  },
  confirmBtn: {
    backgroundColor: "#d9534f",
    color: "white",
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