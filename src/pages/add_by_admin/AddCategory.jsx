import React, { useEffect, useMemo, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../features/add_by_admin/category/categorySlice";
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

const AddCategory = () => {
  const dispatch = useDispatch();
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    status: "Active",
  });

  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState({ key: "cat_id", dir: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [message, setMessage] = useState(null);

  // categories redux
  const {
    categories,
    loading: isLoading,
    error,
  } = useSelector((state) => state.categories);

  console.log("add category data", categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({ name: "", status: "Active" });
    setEditingCategory(null);
  };

  // ------------------------------------------------------------------
  // ** UPDATED: handleAddCategory to correctly run API calls **
  // ------------------------------------------------------------------
  const handleAddCategory = async (e) => {
    e.preventDefault();

    // 1. Validation Check
    if (!formData.name || !formData.name.trim()) {
      showError("Please enter category name!");
      return;
    }
    if (!formData.status) {
      showError("Please select a status!");
      return;
    }

    const trimmedName = formData.name.trim();

    // 2. Duplicate Check
    const duplicate = (Array.isArray(categories) ? categories : []).find(
      (c) =>
        (c?.cat_name || "").trim().toLowerCase() ===
          trimmedName.toLowerCase() &&
        (!editingCategory || c._id !== editingCategory._id)
    );
    if (duplicate) {
      showError("A category with that name already exists!");
      return;
    }

    // 3. Prepare Data
    const categoryData = {
      cat_name: trimmedName,
      cat_status: formData.status,
      cat_added: new Date().toISOString(),
    };

    try {
      if (editingCategory) {
        // A. Update Category
        await dispatch(
          updateCategory({ id: editingCategory._id, updates: categoryData })
        ).unwrap(); // Use unwrap() to handle success/error

        showSuccess("Category updated successfully!");
      } else {
        // B. Create Category
        // Generate a new ID for the creation action (adjust if backend handles this)
        const newCatId =
          categories.length > 0
            ? Math.max(...categories.map((c) => c.cat_id || 0)) + 1
            : 1;

        await dispatch(
          createCategory({ ...categoryData, cat_id: newCatId })
        ).unwrap(); // Use unwrap() to handle success/error

        showSuccess("Category added successfully!");
      }

      // 4. Success Actions
      resetForm();
      dispatch(fetchCategories()); // Refresh list
    } catch (err) {
      // 5. Error Handling
      const action = editingCategory ? "update" : "add";
      showError(`Failed to ${action} category. Please try again.`);
      console.error(`Failed to ${action} category:`, err);
    }
  };
  // ------------------------------------------------------------------

  const handleEdit = (categoryId) => {
    const categoryToEdit = categories.find((cat) => cat?._id === categoryId);
    if (categoryToEdit) {
      setFormData({
        name: categoryToEdit.cat_name,
        // Ensure status is capitalized to match "Active"/"Inactive" for radio buttons
        status: categoryToEdit.cat_status
          ? categoryToEdit.cat_status.charAt(0).toUpperCase() +
            categoryToEdit.cat_status.slice(1)
          : "Active",
      });
      setEditingCategory(categoryToEdit);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleDelete = async (categoryId) => {
    {
      try {
        await dispatch(deleteCategory(categoryId)).unwrap();
        showSuccess("Category deleted successfully!");
        dispatch(fetchCategories());
      } catch (err) {
        showError("Failed to delete category. Please try again.");
        console.error("Failed to delete category:", err);
      }
    }
  };

  const filteredAndSortedCategories = useMemo(() => {
    let list = Array.isArray(categories) ? categories.filter(Boolean) : [];
    if (searchText && searchText.trim()) {
      const s = searchText.trim().toLowerCase();
      list = list.filter((c) => (c?.cat_name || "").toLowerCase().includes(s));
    }
    if (statusFilter === "Active" || statusFilter === "Inactive") {
      list = list.filter(
        (c) =>
          (c?.cat_status || "").toLowerCase() === statusFilter.toLowerCase()
      );
    }
    const { key, dir } = sortBy;
    list.sort((a, b) => {
      let av = a[key];
      let bv = b[key];
      if (key === "cat_id") {
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
  }, [categories, searchText, statusFilter, sortBy]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredAndSortedCategories.length / rowsPerPage)
  );
  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [totalPages, currentPage]);

  const currentPageData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredAndSortedCategories.slice(start, start + rowsPerPage);
  }, [filteredAndSortedCategories, currentPage, rowsPerPage]);

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
            CATEGORY
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ padding: "20px" }}>
        {/* Add/Edit Category Section */}
        <form
          className="bg-white mb-5"
          style={{ border: "1px solid #ddd" }}
          onSubmit={handleAddCategory}
        >
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
              {editingCategory ? "EDIT CATEGORY" : "ADD CATEGORY"}
            </h2>
          </div>

          <div className="p-6">
            <div
              className="flex items-start gap-8"
              style={{ alignItems: "flex-end" }}
            >
              {/* Name Field */}
              <div style={{ flex: 1 }}>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#333" }}
                >
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
                  placeholder="Enter category name"
                />
              </div>

              {/* Status Field */}
              <div style={{ width: 280 }}>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#333" }}
                >
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
                  type="submit"
                  className="px-6 py-2 text-sm text-white"
                  style={{
                    backgroundColor: "#5bc0de",
                    border: "none",
                    borderRadius: 3,
                    cursor: "pointer",
                  }}
                  title={editingCategory ? "Update Category" : "Add Category"}
                >
                  {editingCategory ? "Update Category" : "Add Category"}
                </button>
              </div>

              {/* Cancel (visible when editing) */}
              {editingCategory && (
                <div style={{ display: "flex", alignItems: "flex-end" }}>
                  <button
                    type="button"
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
        </form>

        {/* List Section (rest of the component remains the same) */}
        <div className="bg-white" style={{ border: "1px solid #ddd" }}>
          {/* Filter / Search / Sort Row */}
          <div
            className="px-5 py-3"
            style={{
              backgroundColor: "#f9f9f9",
              borderBottom: "1px solid #ddd",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
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
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
                <span style={{ color: "#333", fontSize: 13 }}>entries</span>
              </label>

              <label
                style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
              >
                <span style={{ color: "#333", fontSize: 13 }}>Status</span>
                <select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  style={styles.smallSelect}
                >
                  <option value="All">All</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </label>
            </div>

            {/* Search box */}
            <div
              style={{
                marginLeft: "auto",
                display: "flex",
                gap: 8,
                alignItems: "center",
              }}
            >
              <input
                type="text"
                placeholder="Search categories..."
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
                  setSortBy({ key: "id", dir: "asc" });
                }}
                style={styles.clearBtn}
              >
                Reset
              </button>
            </div>
          </div>

          {/* Table header */}
          <div style={{ maxHeight: "500px", overflowY: "auto" }}>
            <table
              className="w-full"
              style={{ borderCollapse: "collapse", width: "100%" }}
            >
              <thead
                style={{
                  position: "sticky",
                  top: 0,
                  backgroundColor: "#f9f9f9",
                  zIndex: 1,
                }}
              >
                <tr style={{ borderBottom: "2px solid #ddd" }}>
                  <th
                    className="px-4 py-3 text-sm font-semibold text-center"
                    style={thStyle(80)}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                      }}
                    >
                      No.
                      <button
                        onClick={() => toggleSort("cat_id")}
                        style={styles.sortBtn}
                      >
                        {sortBy.key === "cat_id"
                          ? sortBy.dir === "asc"
                            ? "▲"
                            : "▼"
                          : "↕"}
                      </button>
                    </div>
                  </th>
                  <th
                    className="px-4 py-3 text-sm font-semibold text-left"
                    style={thStyle()}
                  >
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 8 }}
                    >
                      Category
                      <button
                        onClick={() => toggleSort("cat_name")}
                        style={styles.sortBtn}
                      >
                        {sortBy.key === "cat_name"
                          ? sortBy.dir === "asc"
                            ? "▲"
                            : "▼"
                          : "↕"}
                      </button>
                    </div>
                  </th>
                  <th
                    className="px-4 py-3 text-sm font-semibold text-center"
                    style={thStyle(150)}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                      }}
                    >
                      Status
                      <button
                        onClick={() => toggleSort("cat_status")}
                        style={styles.sortBtn}
                      >
                        {sortBy.key === "cat_status"
                          ? sortBy.dir === "asc"
                            ? "▲"
                            : "▼"
                          : "↕"}
                      </button>
                    </div>
                  </th>
                  <th
                    className="px-4 py-3 text-sm font-semibold text-center"
                    style={thStyle(120)}
                  >
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {isLoading && (
                  <tr>
                    <td
                      colSpan={4}
                      style={{
                        padding: 24,
                        textAlign: "center",
                        color: "#777",
                      }}
                    >
                      Loading categories...
                    </td>
                  </tr>
                )}
               

                {currentPageData.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      style={{
                        padding: 24,
                        textAlign: "center",
                        color: "#777",
                      }}
                    >
                      No categories found.
                    </td>
                  </tr>
                ) : (
                  currentPageData.map((category, index) => (
                    <tr
                      key={category._id}
                      style={{
                        borderBottom: "1px solid #ddd",
                        backgroundColor:
                          index % 2 === 0 ? "#ffffff" : "#f9f9f9",
                      }}
                    >
                      <td
                        className="px-4 py-3 text-sm text-center"
                        style={{ color: "#333", width: 80 }}
                      >
                        {(currentPage - 1) * rowsPerPage + index + 1}
                      </td>

                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: "#333" }}
                      >
                        {category?.cat_name || ""}
                      </td>

                      <td className="px-4 py-3 text-center">
                        {category?.cat_status ? (
                          <span
                            className="inline-block px-3 py-1 text-xs text-white"
                            style={{
                              backgroundColor:
                                category.cat_status.toLowerCase() === "active"
                                  ? "#337ab7"
                                  : "#d9534f",
                              borderRadius: 3,
                            }}
                          >
                            {category.cat_status.charAt(0).toUpperCase() +
                              category.cat_status.slice(1)}
                          </span>
                        ) : null}
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
                            onClick={() => handleEdit(category._id)}
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
                            // onClick={() => openDeleteModal(category.id)}
                            onClick={() => handleDelete(category._id)}
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
            }}
          >
            <div style={{ color: "#666", fontSize: 13 }}>
              Showing{" "}
              <strong style={{ color: "#333" }}>
                {filteredAndSortedCategories.length === 0
                  ? 0
                  : (currentPage - 1) * rowsPerPage + 1}
              </strong>{" "}
              to{" "}
              <strong style={{ color: "#333" }}>
                {Math.min(
                  currentPage * rowsPerPage,
                  filteredAndSortedCategories.length
                )}
              </strong>{" "}
              of{" "}
              <strong style={{ color: "#333" }}>
                {filteredAndSortedCategories.length}
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
};

/* Helper to produce th style with fixed width optional */
const thStyle = (width) => ({
  color: "#333",
  borderRight: "1px solid #ddd",
  textAlign: "center",
  width: width ? width : "auto",
  padding: "12px 8px",
});

export default AddCategory;
