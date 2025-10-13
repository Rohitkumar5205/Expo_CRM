import React, { useEffect, useMemo, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { showError, showSuccess } from "../../utils/toastMessage";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCrmMessages,
  addCrmMessage,
  updateCrmMessage,
  deleteCrmMessage,
} from "../../features/add_by_admin/crm_wat_mess/CrmWatMessage";

const initialMessages = [
  {
    id: 1,
    title: "Visitor Pass",
    message:
      "8th Internation Health & Wellness Exhibition *Date*: 11 to 13th July 2025 *Location*: Hall No. 12, Pragati Maidan, New Delhi, Bharat Welcome to the 8th Internation Health & Wellness Exhibition We are pleased to have you with us. Your pass grants you access to exhibition areas. Please present this pass at the entrance for entry and enjoy your time exploring the exhibition. If you have any questions or need assistance, feel free to approach any of our staff members. Thank you for visiting and we hope you have an enriching experience! Sincerely, Namogange Wellness Team",
    attachment: "View",
    status: "Active",
  },
  {
    id: 2,
    title: "Venue Location",
    message: "N/A",
    attachment: "N/A",
    status: "Active",
  },
];

const AddCrmWhatsappMessage = () => {
  const [editingMessage, setEditingMessage] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    status: "Active",
    attachment: null,
  });
  // State initialization without localStorage
  const [messages, setMessages] = useState(initialMessages);
  const [notification, setNotification] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "attachment" && files) {
      setFormData((prevData) => ({
        ...prevData,
        attachment: files[0],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      message: "",
      status: "Active",
      attachment: null,
    });
    setEditingMessage(null);
  };

  const handleAddMessage = (e) => {
    e.preventDefault(); // Prevent default form submission

    // Validation
    if (!formData.title || !formData.title.trim()) {
      showError("Please fill in the title field!");
      return;
    }
    if (!formData.message || !formData.message.trim()) {
      showError("Please fill in the message field!");
      return;
    }

    const fileAttachmentName = formData.attachment
      ? formData.attachment.name
      : "N/A";

    if (editingMessage) {
      // Update logic
      setMessages((prev) =>
        prev.map((item) =>
          item.id === editingMessage.id
            ? {
                ...item,
                title: formData.title.trim(),
                message: formData.message.trim(),
                status: formData.status,
                attachment:
                  formData.attachment !== null
                    ? fileAttachmentName
                    : item.attachment,
              }
            : item
        )
      );
      showSuccess("Message updated successfully!");
    } else {
      // Add logic
      const newId =
        messages.length > 0 ? Math.max(...messages.map((c) => c.id)) + 1 : 1;
      const newItem = {
        id: newId,
        title: formData.title.trim(),
        message: formData.message.trim(),
        status: formData.status,
        attachment: fileAttachmentName,
      };
      setMessages((prev) => [...prev, newItem]);
      showSuccess("Message added successfully!");
    }
    resetForm();
  };

  const handleEdit = (itemId) => {
    const itemToEdit = messages.find((item) => item.id === itemId);
    if (itemToEdit) {
      setFormData({
        title: itemToEdit.title,
        message: itemToEdit.message,
        status: itemToEdit.status,
        attachment: null,
      });
      setEditingMessage(itemToEdit);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleDelete = (itemId) => {
    {
      setMessages((prev) => prev.filter((c) => c.id !== itemId));
      showSuccess("Message deleted successfully!");
      if (editingMessage && editingMessage.id === itemId) {
        resetForm();
      }
    }
  };
  const applyFormatting = (tag) => {
    const textarea = document.querySelector('textarea[name="message"]');
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = formData.message.substring(start, end);

    let newText = "";
    if (tag === "B" || tag === "H") {
      newText = `*${selectedText}*`; // WhatsApp Bold/Header uses '*'
    } else if (tag === "I") {
      newText = `_${selectedText}_`; // WhatsApp Italic uses '_'
    }

    const newMessage =
      formData.message.substring(0, start) +
      newText +
      formData.message.substring(end);
    setFormData((prev) => ({ ...prev, message: newMessage }));

    setTimeout(() => {
      textarea.focus();
      // Set cursor back inside the new tag if something was selected, otherwise at the end of the tag
      const cursorPosition = start + (newText.length > 0 ? 1 : 1);
      textarea.setSelectionRange(cursorPosition, cursorPosition);
    }, 0);
  };

  const getPreviewContent = (text) => {
    let previewHtml = text;
    previewHtml = previewHtml.replace(/\*(.*?)\*/g, "<strong>$1</strong>");
    previewHtml = previewHtml.replace(/_(.*?)_/g, "<em>$1</em>");
    previewHtml = previewHtml.replace(/\n/g, "<br />");
    return { __html: previewHtml };
  };

  // Replaced Modal logic with a simple inline preview state
  const [showInlinePreview, setShowInlinePreview] = useState(false);

  const handleChooseFileClick = () => {
    document.getElementById("attachment-input").click();
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
            WHATSAPP MESSAGES
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ padding: "20px" }}>
        {/* Notification message */}
        {notification && (
          <div style={styles.notificationBox}>
            <span>{notification}</span>
          </div>
        )}

        {/* Add/Edit Section - Now a proper form */}
        <form
          className="bg-white mb-5"
          style={{ border: "1px solid #ddd" }}
          onSubmit={handleAddMessage} // Handle form submission
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
              {editingMessage ? "EDIT MESSAGE" : "ADD MESSAGE"}
            </h2>
          </div>

          <div className="p-6">
            <div
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <div
                style={{ display: "flex", gap: "24px", alignItems: "center" }}
              >
                {/* Title Field */}
                <div style={{ flex: 1 }}>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#333" }}
                  >
                    Title <span style={{ color: "#f44336" }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm"
                    style={{ ...styles.input }}
                    placeholder="Enter message title"
                    required // Added HTML required attribute
                  />
                </div>
                {/* Attachment Field with custom styling */}
                <div style={{ flex: 1 }}>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#333" }}
                  >
                    Attachment
                  </label>
                  <div style={styles.customFileInput}>
                    <input
                      id="attachment-input"
                      type="file"
                      name="attachment"
                      onChange={handleChange}
                      style={styles.hiddenFileInput}
                    />
                    <div style={styles.fileInputText}>
                      {formData.attachment
                        ? formData.attachment.name
                        : editingMessage?.attachment &&
                          editingMessage.attachment !== "N/A"
                        ? `Current: ${editingMessage.attachment}`
                        : "No file chosen"}
                    </div>
                    <button
                      type="button" // Important: type="button" to prevent form submission
                      style={styles.fileInputButton}
                      onClick={handleChooseFileClick}
                    >
                      Choose File
                    </button>
                  </div>
                </div>
                {/* Status Field */}
                <div style={{ flex: 1 }}>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#333" }}
                  >
                    Status <span style={{ color: "#f44336" }}>*</span>
                  </label>
                  <div
                    style={{
                      display: "flex",
                      gap: 16,
                      alignItems: "center",
                      height: "40px",
                    }}
                  >
                    <label style={styles.radioLabel}>
                      <input
                        type="radio"
                        name="status"
                        value="Active"
                        checked={formData.status === "Active"}
                        onChange={handleChange}
                        style={{ marginRight: 8 }}
                        required
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
                        required
                      />
                      <span style={{ color: "#333" }}>Inactive</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Message Field */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#333" }}
                >
                  Write a Message <span style={{ color: "#f44336" }}>*</span>
                </label>
                <div style={styles.richTextEditor}>
                  {/* Dummy rich text editor toolbar */}
                  <div style={styles.toolbar}>
                    <button
                      type="button"
                      style={styles.toolbarBtn}
                      onClick={() => applyFormatting("B")}
                    >
                      <strong>B</strong>
                    </button>
                    <button
                      type="button"
                      style={styles.toolbarBtn}
                      onClick={() => applyFormatting("I")}
                    >
                      <em>I</em>
                    </button>
                    {/* Simplified/Placeholder buttons */}
                    <button type="button" style={styles.toolbarBtn}>
                      ✒️
                    </button>
                    <button type="button" style={styles.toolbarBtn}>
                      📄
                    </button>
                    <button type="button" style={styles.toolbarBtn}>
                      📌
                    </button>
                    <button type="button" style={styles.toolbarBtn}>
                      ⭐
                    </button>
                    <button
                      type="button"
                      style={{ ...styles.toolbarBtn, ...styles.previewBtn }}
                      onClick={() => setShowInlinePreview((prev) => !prev)}
                    >
                      <span style={{ marginRight: "4px" }}>🔍</span>{" "}
                      {showInlinePreview ? "Hide Preview" : "Show Preview"}
                    </button>
                  </div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    style={styles.textArea}
                    placeholder="Write your message here... (Use *text* for bold/header, _text_ for italics)"
                    required // Added HTML required attribute
                  ></textarea>
                </div>
              </div>

              {/* Inline Preview Section (Replaced Preview Modal) */}
              {showInlinePreview && (
                <div style={styles.previewBox}>
                  <h4>WhatsApp Preview:</h4>
                  <div
                    style={styles.previewContent}
                    dangerouslySetInnerHTML={getPreviewContent(
                      formData.message
                    )}
                  />
                </div>
              )}

              {/* Add / Update Button */}
              <div style={{ marginTop: "10px" }}>
                <button
                  type="submit" // Will trigger handleAddMessage
                  className="px-6 py-2 text-sm text-white"
                  style={{
                    backgroundColor: "#3598dc",
                    border: "none",
                    borderRadius: 3,
                    cursor: "pointer",
                  }}
                >
                  {editingMessage ? "Update Message" : "Add Message"}
                </button>
                {/* Cancel (visible when editing) */}
                {editingMessage && (
                  <button
                    type="button" // Important: type="button" to prevent form submission
                    onClick={resetForm}
                    className="px-4 py-2 text-sm"
                    style={{
                      marginLeft: 10,
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
        </form>

        {/* List Section */}
        <div className="bg-white" style={{ border: "1px solid #ddd" }}>
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
              LIST OF MESSAGE
            </h2>
          </div>

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
                    style={thStyle(60)}
                  >
                    No.
                  </th>
                  <th
                    className="px-4 py-3 text-sm font-semibold text-left"
                    style={thStyle(150)}
                  >
                    Title
                  </th>
                  <th
                    className="px-4 py-3 text-sm font-semibold text-left"
                    style={thStyle()}
                  >
                    Message
                  </th>
                  <th
                    className="px-4 py-3 text-sm font-semibold text-left"
                    style={thStyle(120)}
                  >
                    Attachment
                  </th>
                  <th
                    className="px-4 py-3 text-sm font-semibold text-center"
                    style={thStyle(100)}
                  >
                    Status
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
                {messages.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      style={{
                        padding: 24,
                        textAlign: "center",
                        color: "#777",
                      }}
                    >
                      No messages found.
                    </td>
                  </tr>
                ) : (
                  messages.map((item, index) => (
                    <tr
                      key={item.id}
                      style={{
                        borderBottom: "1px solid #ddd",
                        backgroundColor:
                          index % 2 === 0 ? "#ffffff" : "#f9f9f9",
                      }}
                    >
                      <td
                        className="px-4 py-3 text-sm text-center"
                        style={{ color: "#333", width: 60 }}
                      >
                        {item.id}
                      </td>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: "#333", width: 150 }}
                      >
                        {item.title}
                      </td>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: "#333" }}
                      >
                        {/* Trim message for table display */}
                        {item.message.length > 50
                          ? item.message.substring(0, 50) + "..."
                          : item.message}
                      </td>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{ color: "#333", width: 120 }}
                      >
                        {item.attachment !== "N/A" ? (
                          <a href="#" onClick={(e) => e.preventDefault()}>
                            {item.attachment}
                          </a>
                        ) : (
                          "N/A"
                        )}
                      </td>
                      <td
                        className="px-4 py-3 text-center"
                        style={{ width: 100 }}
                      >
                        <span
                          className="inline-block px-3 py-1 text-xs text-white"
                          style={{
                            backgroundColor:
                              item.status === "Active" ? "#337ab7" : "#d9534f",
                            borderRadius: 3,
                          }}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td
                        className="px-4 py-3"
                        style={{ textAlign: "center", width: 120 }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            gap: 8,
                          }}
                        >
                          <button
                            type="button"
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
                            type="button"
                            onClick={() => handleDelete(item.id)}
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
  customFileInput: {
    border: "1px solid #d2d6de",
    borderRadius: 3,
    display: "flex",
    alignItems: "center",
    height: "40px",
  },
  hiddenFileInput: {
    display: "none",
  },
  fileInputText: {
    flexGrow: 1,
    padding: "0 10px",
    fontSize: 14,
    color: "#555",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  fileInputButton: {
    backgroundColor: "#e7e7e7",
    border: "none",
    padding: "8px 12px",
    color: "#333",
    fontSize: 14,
    borderLeft: "1px solid #d2d6de",
    cursor: "pointer",
    height: "100%",
  },
  radioLabel: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    cursor: "pointer",
  },
  iconBtn: {
    padding: 6,
    borderRadius: 4,
    border: "1px solid #ccc",
    backgroundColor: "white",
    cursor: "pointer",
  },
  notificationBox: {
    backgroundColor: "#ffe0b2", // Changed color for better contrast/warning
    border: "1px solid #ffcc80",
    padding: "8px 12px",
    borderRadius: 4,
    marginBottom: 12,
    color: "#e65100",
    display: "inline-block",
  },
  richTextEditor: {
    border: "1px solid #ccc",
    borderRadius: "4px",
    overflow: "hidden",
  },
  toolbar: {
    padding: "8px",
    borderBottom: "1px solid #ccc",
    backgroundColor: "#f7f7f7",
    display: "flex",
    gap: "4px",
  },
  toolbarBtn: {
    background: "none",
    border: "1px solid #ccc",
    padding: "4px 8px",
    borderRadius: "3px",
    cursor: "pointer",
    fontSize: "14px",
  },
  previewBtn: {
    marginLeft: "auto",
    display: "flex",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  textArea: {
    width: "100%",
    minHeight: "150px",
    border: "none",
    padding: "10px",
    outline: "none",
    resize: "vertical",
    fontSize: 14,
  },
  previewBox: {
    marginTop: 16,
    padding: 16,
    border: "1px solid #3598dc",
    borderRadius: 4,
    backgroundColor: "#eaf5ff",
  },
  previewContent: {
    padding: 8,
    backgroundColor: "white",
    border: "1px solid #eee",
    borderRadius: 4,
    whiteSpace: "pre-wrap", // Preserve formatting
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

export default AddCrmWhatsappMessage;
