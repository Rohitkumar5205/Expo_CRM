import React, { useEffect, useMemo, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

const Modal = ({ open, title, children, onClose, onConfirm }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white -md shadow-lg w-[400px]">
        <div className="border-b px-4 py-2 font-semibold text-gray-800">{title}</div>
        <div className="p-4 text-gray-700">{children}</div>
        <div className="border-t px-4 py-2 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-1.5 bg-gray-200  hover:bg-gray-300 text-gray-800 text-sm">
            Cancel
          </button>
          <button onClick={onConfirm} className="px-4 py-1.5 bg-red-500  hover:bg-red-600 text-white text-sm">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const LOCAL_STORAGE_KEY = "app_fix_lengths_v1";

const AddRemarkLengthFixed = () => {
  const [editingFixLength, setEditingFixLength] = useState(null);
  const [formData, setFormData] = useState({ name: "", status: "Active" });
  const [fixLengths, setFixLengths] = useState(() => {
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch {}
    return [{ id: 1, name: "50", status: "Active" }];
  });
  const [message, setMessage] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [fixLengthToDelete, setFixLengthToDelete] = useState(null);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(fixLengths));
  }, [fixLengths]);

  const showMessage = (text, ms = 2000) => {
    setMessage(text);
    setTimeout(() => setMessage(null), ms);
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const resetForm = () => {
    setFormData({ name: "", status: "Active" });
    setEditingFixLength(null);
  };

  const handleAddFixLength = () => {
    if (!formData.name.trim()) return showMessage("Please enter fix length!");
    const trimmedName = formData.name.trim();
    const duplicate = fixLengths.find(
      (c) => c.name.toLowerCase() === trimmedName.toLowerCase() && (!editingFixLength || c.id !== editingFixLength.id)
    );
    if (duplicate) return showMessage("A fix length with that name already exists!");

    if (editingFixLength) {
      setFixLengths((prev) =>
        prev.map((item) =>
          item.id === editingFixLength.id ? { ...item, name: trimmedName, status: formData.status } : item
        )
      );
      showMessage("Fix Length updated successfully!");
      resetForm();
    } else {
      const newId = fixLengths.length > 0 ? Math.max(...fixLengths.map((c) => c.id)) + 1 : 1;
      setFixLengths([...fixLengths, { id: newId, name: trimmedName, status: formData.status }]);
      showMessage("Fix Length added successfully!");
      resetForm();
    }
  };

  const handleEdit = (id) => {
    const item = fixLengths.find((f) => f.id === id);
    setEditingFixLength(item);
    setFormData({ name: item.name, status: item.status });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleConfirmDelete = () => {
    if (fixLengthToDelete) {
      setFixLengths(fixLengths.filter((f) => f.id !== fixLengthToDelete.id));
      showMessage("Fix Length deleted successfully!");
    }
    setIsDeleteModalOpen(false);
    setFixLengthToDelete(null);
  };

  return (
    <div className="bg-[#ecf0f5] min-h-screen">
      {/* Header */}
      <div className="bg-white  border-gray-300 px-5 py-0.5">
        <h1 className="text-xl font-normal text-gray-600"> FIX LENGTH</h1>
      </div>

      <div className="p-5">
        {message && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-3 py-2 mb-3 ">{message}</div>
        )}

        {/* Form */}
        <div className="bg-white mb-5">
          <div className="bg-white border-b border-gray-200 px-5 py-2">
            <h2 className="text-base font-semibold text-gray-500">
              {editingFixLength ? "EDIT FIX LENGTH" : "ADD FIX LENGTH"}
            </h2>
          </div>
          <div className="pt-8 pb-14 px-4 flex flex-wrap gap-6 items-end">
            <div className="flex-1 min-w-[250px]">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter fixed length"
                onKeyDown={(e) => e.key === "Enter" && handleAddFixLength()}
                className="border border-gray-300  px-3 py-2 w-full text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-4 items-center">
                <label className="flex items-center gap-1 text-gray-700 text-sm">
                  <input
                    type="radio"
                    name="status"
                    value="Active"
                    checked={formData.status === "Active"}
                    onChange={handleChange}
                  />
                  Active
                </label>
                <label className="flex items-center gap-1 text-gray-700 text-sm">
                  <input
                    type="radio"
                    name="status"
                    value="Inactive"
                    checked={formData.status === "Inactive"}
                    onChange={handleChange}
                  />
                  Inactive
                </label>
              </div>
            </div>

            <div className="flex gap-2">
              <button onClick={handleAddFixLength} className="bg-sky-500 hover:bg-sky-600 text-white px-5 py-2  text-sm">
                {editingFixLength ? "Update Fix Length" : "Add Fix Length"}
              </button>
              {editingFixLength && (
                <button onClick={resetForm} className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2  text-sm">
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white w-full h-auto px-4 pb-6 pt-2">
            <h1 className="text-gray-600 text-base font-semibold pb-1">LIST OF FIX LENGTH</h1>
            <hr className="w-full opacity-10 pb-3" />
        <div className="bg-white border border-gray-300">
          <div className="overflow-auto">
            <table className="w-full border border-gray-300 text-sm">
              <thead className="bg-white">
                <tr className="text-gray-700">
                  <th className="border border-gray-300 px-4 py-2 text-center w-16 font-semibold">No.</th>
                  <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Fix Length</th>
                  <th className="border border-gray-300 px-4 py-2 text-center w-32 font-semibold">Status</th>
                  <th className="border border-gray-300 px-4 py-2 text-center w-32 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {fixLengths.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-4 text-gray-500">
                      No data found
                    </td>
                  </tr>
                ) : (
                  fixLengths.map((item, idx) => (
                    <tr key={item.id} className={`${idx % 2 ? "bg-gray-50" : "bg-white"} border`}>
                      <td className="border border-gray-300 px-3 py-2 text-center">{idx + 1}</td>
                      <td className="border border-gray-300 px-3 py-2">{item.name}</td>
                      <td className="border border-gray-300 px-3 py-2 text-center">
                        <span
                          className={`px-3 py-1  text-xs text-white ${
                            item.status === "Active" ? "bg-blue-500" : "bg-red-500"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="border border-gray-300 px-3 py-2 text-center">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleEdit(item.id)}
                            className="border border-blue-500 text-blue-500 p-1  hover:bg-blue-50"
                          >
                            <Pencil size={14} />
                          </button>
                          <button
                            onClick={() => {
                              setFixLengthToDelete(item);
                              setIsDeleteModalOpen(true);
                            }}
                            className="border border-red-500 text-red-500 p-1  hover:bg-red-50"
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
       </div>
        <Modal
          open={isDeleteModalOpen}
          title="Confirm Delete"
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleConfirmDelete}
        >
          Are you sure you want to delete this fixed length?
        </Modal>
      </div>
    </div>
  );
};

export default AddRemarkLengthFixed;
