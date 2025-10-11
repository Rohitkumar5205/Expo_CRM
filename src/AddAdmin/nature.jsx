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
  Main Nature Component
  --------------------------- */

const LOCAL_STORAGE_KEY = "app_nature_of_business_v1";

const Nature = () => {
  const [editingNature, setEditingNature] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    status: "Active",
  });
  const [natureOfBusinesses, setNatureOfBusinesses] = useState(() => {
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {
      console.warn("Failed to parse nature of business from localStorage", e);
    }
    return [
      { id: 1, name: "Agency", status: "Active" },
      { id: 2, name: "Aggregator", status: "Active" },
      { id: 3, name: "Digital Media", status: "Active" },
      { id: 4, name: "Electronic Media", status: "Active" },
      { id: 5, name: "Print Media", status: "Active" },
      { id: 6, name: "Research Organisation", status: "Active" },
      { id: 7, name: "Government Body", status: "Active" },
      { id: 8, name: "N G O", status: "Active" },
      { id: 9, name: "Institution", status: "Active" },
      { id: 10, name: "University", status: "Active" },
      { id: 11, name: "College", status: "Active" },
      { id: 12, name: "Association", status: "Active" },
      { id: 13, name: "Service Provider", status: "Active" },
      { id: 14, name: "Dealer", status: "Active" },
      { id: 15, name: "Raw Material Suppplier", status: "Active" },
      { id: 16, name: "Manufacturer", status: "Active" },
      { id: 17, name: "Retailer", status: "Active" },
      { id: 18, name: "Distributor", status: "Active" },
    ];
  });

  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState({ key: "id", dir: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [natureToDelete, setNatureToDelete] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(natureOfBusinesses));
    } catch (e) {
      console.warn("Failed to save nature of business to localStorage", e);
    }
  }, [natureOfBusinesses]);

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
    setFormData({ name: "", status: "Active" });
    setEditingNature(null);
  };

  const handleAddNature = () => {
    if (!formData.name || !formData.name.trim()) {
      showMessage("Please enter a name!");
      return;
    }

    const trimmedName = formData.name.trim();
    const duplicate = natureOfBusinesses.find(
      (c) =>
        c.name.trim().toLowerCase() === trimmedName.toLowerCase() &&
        (!editingNature || c.id !== editingNature.id)
    );
    if (duplicate) {
      showMessage("A name with that name already exists!");
      return;
    }

    if (editingNature) {
      setNatureOfBusinesses((prev) =>
        prev.map((nat) => (nat.id === editingNature.id ? { ...nat, name: trimmedName, status: formData.status } : nat))
      );
      showMessage("Nature of business updated successfully!");
      resetForm();
    } else {
      const newId = natureOfBusinesses.length > 0 ? Math.max(...natureOfBusinesses.map((c) => c.id)) + 1 : 1;
      const newNature = {
        id: newId,
        name: trimmedName,
        status: formData.status,
      };
      setNatureOfBusinesses((prev) => [...prev, newNature]);
      showMessage("Nature of business added successfully!");
      resetForm();
    }
  };

  const handleEdit = (natureId) => {
    const natureToEdit = natureOfBusinesses.find((nat) => nat.id === natureId);
    if (natureToEdit) {
      setFormData({
        name: natureToEdit.name,
        status: natureToEdit.status,
      });
      setEditingNature(natureToEdit);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const openDeleteModal = (natureId) => {
    const nature = natureOfBusinesses.find((c) => c.id === natureId);
    setNatureToDelete(nature);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setNatureToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (!natureToDelete) {
      closeDeleteModal();
      return;
    }
    setNatureOfBusinesses((prev) => prev.filter((c) => c.id !== natureToDelete.id));
    showMessage("Nature of business deleted successfully!");
    closeDeleteModal();
  };

  const filteredAndSortedNatureOfBusinesses = useMemo(() => {
    let list = [...natureOfBusinesses];
    if (searchText && searchText.trim()) {
      const s = searchText.trim().toLowerCase();
      list = list.filter((c) => c.name.toLowerCase().includes(s));
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
  }, [natureOfBusinesses, searchText, statusFilter, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredAndSortedNatureOfBusinesses.length / rowsPerPage));
  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [totalPages, currentPage]);

  const currentPageData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredAndSortedNatureOfBusinesses.slice(start, start + rowsPerPage);
  }, [filteredAndSortedNatureOfBusinesses, currentPage, rowsPerPage]);

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
          <h1 className="text-lg font-normal" style={{ color: "#666" }}>NATURE OF BUSINESS</h1>
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
              {editingNature ? "EDIT NATURE OF BUSINESS" : "ADD NATURE OF BUSINESS"}
            </h2>
          </div>

          <div className="p-6">
            <div className="flex items-start gap-8" style={{ alignItems: "flex-end" }}>
              {/* Name Field */}
              <div style={{ flex: 1 }}>
                <label className="block text-sm font-medium mb-2" style={{ color: "#333" }}>
                  Name <span style={{ color: "#f44336" }}>*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm"
                  style={{
                    ...styles.input,
                  }}
                  placeholder="Enter name"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleAddNature();
                    }
                  }}
                />
              </div>

              {/* Status Field */}
              <div style={{ width: 280 }}>
                <label className="block text-sm font-medium mb-2" style={{ color: "#333" }}>
                  Status <span style={{ color: "#f44336" }}>*</span>
                </label>
                <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                  <label style={styles.radioLabel}>
                    <input
                      type="radio"
                      name="status"
                      value="Active"
                      checked={formData.status === "Active"}
                      onChange={handleChange}
                      style={{ marginRight: 8 }}
                    />
                    <span style={{ color: "#333" }}>Active</span>
                  </label>
                  <label style={styles.radioLabel}>
                    <input
                      type="radio"
                      name="status"
                      value="Inactive"
                      checked={formData.status === "Inactive"}
                      onChange={handleChange}
                      style={{ marginRight: 8 }}
                    />
                    <span style={{ color: "#333" }}>Inactive</span>
                  </label>
                </div>
              </div>

              {/* Add / Update Button */}
              <div style={{ display: "flex", alignItems: "flex-end" }}>
                <button
                  onClick={handleAddNature}
                  className="px-6 py-2 text-sm text-white"
                  style={{
                    backgroundColor: "#5bc0de",
                    border: "none",
                    borderRadius: 3,
                    cursor: "pointer",
                  }}
                  title={editingNature ? "Update" : "Add"}
                >
                  {editingNature ? "Update" : "Add"}
                </button>
              </div>

              {/* Cancel (visible when editing) */}
              {editingNature && (
                <div style={{ display: "flex", alignItems: "flex-end" }}>
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
                </div>
              )}
            </div>
          </div>
        </div>

        {/* List Section */}
        <div className="bg-white" style={{ border: "1px solid #ddd" }}>
          {/* Header */}
          <div className="px-5 py-3" style={{ backgroundColor: "#f9f9f9", borderBottom: "1px solid #ddd" }}>
            <h2 className="text-base font-semibold" style={{ color: "#555", margin: 0 }}>
              NATURE OF BUSINESS LIST
            </h2>
          </div>

          {/* Filter / Search / Sort Row */}
          <div className="px-5 py-3" style={{ backgroundColor: "#f9f9f9", borderBottom: "1px solid #ddd", display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <label style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <span style={{ color: "#333", fontSize: 13 }}>Show</span>
                <select value={rowsPerPage} onChange={(e) => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); }} style={styles.smallSelect}>
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
                <span style={{ color: "#333", fontSize: 13 }}>entries</span>
              </label>

              <label style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <span style={{ color: "#333", fontSize: 13 }}>Status</span>
                <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }} style={styles.smallSelect}>
                  <option value="All">All</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </label>
            </div>

            {/* Search box */}
            <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center" }}>
              <input
                type="text"
                placeholder="Search..."
                value={searchText}
                onChange={(e) => { setSearchText(e.target.value); setCurrentPage(1); }}
                style={styles.searchInput}
              />
              <button onClick={() => { setSearchText(""); setStatusFilter("All"); setRowsPerPage(10); setSortBy({ key: "id", dir: "asc" }); }} style={styles.clearBtn}>
                Reset
              </button>
            </div>
          </div>

          {/* Table header */}
          <div style={{ maxHeight: "500px", overflowY: "auto" }}>
            <table className="w-full" style={{ borderCollapse: "collapse", width: "100%" }}>
              <thead style={{ position: "sticky", top: 0, backgroundColor: "#f9f9f9", zIndex: 1 }}>
                <tr style={{ borderBottom: "2px solid #ddd" }}>
                  <th className="px-4 py-3 text-sm font-semibold text-center" style={thStyle(80)}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                      No.
                      <button onClick={() => toggleSort("id")} style={styles.sortBtn}>
                        {sortBy.key === "id" ? (sortBy.dir === "asc" ? "▲" : "▼") : "↕"}
                      </button>
                    </div>
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold text-left" style={thStyle()}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      Name
                      <button onClick={() => toggleSort("name")} style={styles.sortBtn}>
                        {sortBy.key === "name" ? (sortBy.dir === "asc" ? "▲" : "▼") : "↕"}
                      </button>
                    </div>
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold text-center" style={thStyle(150)}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                      Status
                      <button onClick={() => toggleSort("status")} style={styles.sortBtn}>
                        {sortBy.key === "status" ? (sortBy.dir === "asc" ? "▲" : "▼") : "↕"}
                      </button>
                    </div>
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold text-center" style={thStyle(120)}>
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {currentPageData.length === 0 ? (
                  <tr>
                    <td colSpan={4} style={{ padding: 24, textAlign: "center", color: "#777" }}>
                      No entries found.
                    </td>
                  </tr>
                ) : (
                  currentPageData.map((nature, index) => (
                    <tr
                      key={nature.id}
                      style={{
                        borderBottom: "1px solid #ddd",
                        backgroundColor: (index % 2 === 0) ? "#ffffff" : "#f9f9f9",
                      }}
                    >
                      <td className="px-4 py-3 text-sm text-center" style={{ color: "#333", width: 80 }}>
                        {nature.id}
                      </td>

                      <td className="px-4 py-3 text-sm" style={{ color: "#333" }}>
                        {nature.name}
                      </td>

                      <td className="px-4 py-3 text-center">
                        <span
                          className="inline-block px-3 py-1 text-xs text-white"
                          style={{
                            backgroundColor: nature.status === "Active" ? "#337ab7" : "#d9534f",
                            borderRadius: 3,
                          }}
                        >
                          {nature.status}
                        </span>
                      </td>

                      <td className="px-4 py-3" style={{ textAlign: "center" }}>
                        <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
                          <button
                            onClick={() => handleEdit(nature.id)}
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
                            onClick={() => openDeleteModal(nature.id)}
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
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: 12 }}>
            <div style={{ color: "#666", fontSize: 13 }}>
              Showing{" "}
              <strong style={{ color: "#333" }}>
                {(filteredAndSortedNatureOfBusinesses.length === 0) ? 0 : (currentPage - 1) * rowsPerPage + 1}
              </strong>{" "}
              to{" "}
              <strong style={{ color: "#333" }}>
                {Math.min(currentPage * rowsPerPage, filteredAndSortedNatureOfBusinesses.length)}
              </strong>{" "}
              of{" "}
              <strong style={{ color: "#333" }}>{filteredAndSortedNatureOfBusinesses.length}</strong> entries
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
            Are you sure you want to delete the nature of business{" "}
            <strong>{natureToDelete ? natureToDelete.name : ""}</strong>? This action cannot be undone.
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
    width: 280,
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
  textAlign: "center",
  width: width ? width : "auto",
  padding: "12px 8px",
});

export default Nature;