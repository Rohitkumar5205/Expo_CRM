import React, { useEffect, useMemo, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

/* ---------------------------
  Helper components & utils
  --------------------------- */

/** Modal Component */
const Modal = ({
  open,
  title,
  children,
  onClose,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
}) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-[520px] rounded-lg shadow-lg overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200">
          <h3 className="m-0 text-gray-800">{title}</h3>
        </div>
        <div className="p-4 text-gray-700">{children}</div>
        <div className="flex justify-end gap-2 p-3 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded bg-gray-200 text-gray-800"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="px-3 py-1.5 rounded bg-red-600 text-white"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

/* ---------------------------
  Main AddTarget Component
  --------------------------- */

const LOCAL_STORAGE_KEY = "app_user_targets_v1";
const USER_LIST = [
  "Abhay Raj",
  "Rohit",
  "ADMIN",
  "Chiranjeev Sharma",
  "Manoj Mishra",
  "Prerna Pandey",
  "Rishav Singh",
  "Shrigi Rawat",
  "Sumit Mistra",
  "Tanya Jaiswal",
  "Vijay Sharma",
];

const AddTarget = () => {
  const [editingTarget, setEditingTarget] = useState(null);
  const [formData, setFormData] = useState({
    user: "",
    target: "",
    status: "Active",
  });
  const [targets, setTargets] = useState(() => {
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch {
      return [
        { id: 1, user: "sumit mishra", target: 100, status: "Active" },
        { id: 2, user: "Chiranjeev Sharma", target: 100, status: "Active" },
        { id: 3, user: "prerna pandey", target: 100, status: "Active" },
        { id: 4, user: "abhay raj", target: 100, status: "Active" },
      ];
    }
  });
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState({ key: "id", dir: "asc" });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [targetToDelete, setTargetToDelete] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(targets));
    } catch {}
  }, [targets]);

  const showMessage = (text, ms = 2000) => {
    setMessage(text);
    setTimeout(() => setMessage(null), ms);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({ user: "", target: "", status: "Active" });
    setEditingTarget(null);
  };

  const handleAddTarget = () => {
    if (!formData.user || !formData.target) {
      showMessage("Please select a user and enter a target!");
      return;
    }

    const duplicate = targets.find(
      (t) =>
        t.user.toLowerCase() === formData.user.toLowerCase() &&
        (!editingTarget || t.id !== editingTarget.id)
    );
    if (duplicate) {
      showMessage("A target for this user already exists!");
      return;
    }

    if (editingTarget) {
      setTargets((prev) =>
        prev.map((item) =>
          item.id === editingTarget.id
            ? {
                ...item,
                user: formData.user,
                target: formData.target,
                status: formData.status,
              }
            : item
        )
      );
      showMessage("Target updated successfully!");
      resetForm();
    } else {
      const newId = targets.length > 0 ? Math.max(...targets.map((c) => c.id)) + 1 : 1;
      setTargets((prev) => [
        ...prev,
        { id: newId, user: formData.user, target: Number(formData.target), status: formData.status },
      ]);
      showMessage("Target added successfully!");
      resetForm();
    }
  };

  const handleEdit = (id) => {
    const t = targets.find((i) => i.id === id);
    if (t) {
      setFormData({ user: t.user, target: t.target, status: t.status });
      setEditingTarget(t);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const openDeleteModal = (id) => {
    setTargetToDelete(targets.find((c) => c.id === id));
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setTargetToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (targetToDelete) {
      setTargets((prev) => prev.filter((c) => c.id !== targetToDelete.id));
      showMessage("Target deleted successfully!");
      closeDeleteModal();
    }
  };

  const filteredAndSortedItems = useMemo(() => {
    let list = [...targets];
    if (searchText.trim()) {
      const s = searchText.trim().toLowerCase();
      list = list.filter(
        (c) => c.user.toLowerCase().includes(s) || String(c.target).includes(s)
      );
    }
    if (statusFilter === "Active" || statusFilter === "Inactive")
      list = list.filter((c) => c.status === statusFilter);

    const { key, dir } = sortBy;
    list.sort((a, b) => {
      let av = a[key],
        bv = b[key];
      if (key === "id" || key === "target") {
        av = Number(av);
        bv = Number(bv);
      } else {
        av = (av || "").toLowerCase();
        bv = (bv || "").toLowerCase();
      }
      return av < bv ? (dir === "asc" ? -1 : 1) : av > bv ? (dir === "asc" ? 1 : -1) : 0;
    });
    return list;
  }, [targets, searchText, statusFilter, sortBy]);

  const toggleSort = (key) => {
    setSortBy((prev) =>
      prev.key === key ? { ...prev, dir: prev.dir === "asc" ? "desc" : "asc" } : { key, dir: "asc" }
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex items-center px-6 py-3">
          <h1 className="text-gray-600 text-lg font-normal">USER TARGET</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-5">
        {message && (
          <div className="inline-block bg-green-100 border border-green-200 text-green-700 px-3 py-2 rounded mb-3">
            {message}
          </div>
        )}

        {/* Add/Edit Form */}
        <div className="bg-white border border-gray-300 mb-5 rounded">
          <div className="px-5 py-3 bg-gray-50 border-b border-gray-300">
            <h2 className="text-gray-600 font-semibold text-base">
              {editingTarget ? "EDIT TARGET" : "ADD TARGET"}
            </h2>
          </div>
          <div className="p-6">
            <div className="flex gap-8 items-end flex-wrap">
              {/* User */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  User <span className="text-red-600">*</span>
                </label>
                <select
                  name="user"
                  value={formData.user}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                  disabled={!!editingTarget}
                >
                  <option value="">Select User</option>
                  {USER_LIST.map((u) => (
                    <option key={u} value={u}>
                      {u}
                    </option>
                  ))}
                </select>
              </div>

              {/* Target */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target <span className="text-red-600">*</span>
                </label>
                <input
                  type="number"
                  name="target"
                  value={formData.target}
                  onChange={handleChange}
                  placeholder="Enter target"
                  onKeyDown={(e) => e.key === "Enter" && handleAddTarget()}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                />
              </div>

              {/* Status */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status <span className="text-red-600">*</span>
                </label>
                <div className="flex gap-4 items-center">
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value="Active"
                      checked={formData.status === "Active"}
                      onChange={handleChange}
                    />
                    <span className="text-gray-700">Active</span>
                  </label>
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value="Inactive"
                      checked={formData.status === "Inactive"}
                      onChange={handleChange}
                    />
                    <span className="text-gray-700">Inactive</span>
                  </label>
                </div>
              </div>

              {/* Add/Update */}
              <div className="flex items-end gap-2">
                <button
                  onClick={handleAddTarget}
                  className="px-6 py-2 bg-sky-500 text-white rounded"
                >
                  {editingTarget ? "Update Target" : "Add Target"}
                </button>
                {editingTarget && (
                  <button
                    onClick={resetForm}
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white border border-gray-300 rounded">
          {/* Filter/Search */}
          <div className="px-5 py-3 bg-gray-50 border-b border-gray-300 flex flex-wrap items-center gap-3">
            <div className="flex gap-3 items-center flex-wrap">
              <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                Status
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1"
                >
                  <option value="All">All</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </label>
            </div>

            <div className="ml-auto flex gap-2 items-center">
              <input
                type="text"
                placeholder="Search targets..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 w-72"
              />
              <button
                onClick={() => {
                  setSearchText("");
                  setStatusFilter("All");
                  setSortBy({ key: "id", dir: "asc" });
                }}
                className="px-2 py-1 border border-gray-300 rounded bg-white text-sm"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-auto">
            <table className="w-full border border-gray-300 text-sm">
              <thead className="bg-white">
                <tr className="text-gray-700">
                  <th
                    onClick={() => toggleSort("id")}
                    className="border border-gray-300 px-4 py-2 text-center cursor-pointer"
                  >
                    No.
                  </th>
                  <th
                    onClick={() => toggleSort("user")}
                    className="border border-gray-300 px-4 py-2 text-left cursor-pointer"
                  >
                    User
                  </th>
                  <th
                    onClick={() => toggleSort("target")}
                    className="border border-gray-300 px-4 py-2 text-center cursor-pointer"
                  >
                    Target
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-center">
                    Status
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedItems.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="text-center py-4 text-gray-500"
                    >
                      No data found
                    </td>
                  </tr>
                ) : (
                  filteredAndSortedItems.map((item, idx) => (
                    <tr
                      key={item.id}
                      className={`${idx % 2 ? "bg-gray-50" : "bg-white"} border`}
                    >
                      <td className="border border-gray-300 px-3 py-2 text-center">
                        {idx + 1}
                      </td>
                      <td className="border border-gray-300 px-3 py-2">
                        {item.user}
                      </td>
                      <td className="border border-gray-300 px-3 py-2 text-center">
                        {item.target}
                      </td>
                      <td className="border border-gray-300 px-3 py-2 text-center">
                        <span
                          className={`px-3 py-1 text-xs text-white ${
                            item.status === "Active"
                              ? "bg-blue-500"
                              : "bg-red-500"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="border border-gray-300 px-3 py-2 text-center">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleEdit(item.id)}
                            className="border border-blue-500 text-blue-500 p-1 hover:bg-blue-50"
                          >
                            <Pencil size={14} />
                          </button>
                          <button
                            onClick={() => openDeleteModal(item.id)}
                            className="border border-red-500 text-red-500 p-1 hover:bg-red-50"
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
        </div>

        <Modal
          open={isDeleteModalOpen}
          title="Confirm Delete"
          onClose={closeDeleteModal}
          onConfirm={handleConfirmDelete}
          confirmText="Delete"
          cancelText="Cancel"
        >
          Are you sure you want to delete this user target? This action cannot be undone.
        </Modal>
      </div>
    </div>
  );
};

export default AddTarget;
