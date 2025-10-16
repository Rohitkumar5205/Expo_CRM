import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createUser, updateUser } from "../../features/auth/userSlice";
import { showError, showSuccess } from "../../utils/toastMessage";

const AddUser = () => {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const navigate = useNavigate();

  const isEdit = state?.isEdit || false;
  const userToEdit = state?.user || null;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobileNo: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    designation: "",
    department: "",
    role: "",
    status: "Active",
  });

  useEffect(() => {
    if (isEdit && userToEdit) {
      const fullName = userToEdit.fullName || userToEdit.user_fullname || "";
      const nameParts = fullName.split(" ");

      setFormData({
        firstName: nameParts[0] || "",
        lastName: nameParts[1] || "",
        mobileNo: userToEdit.mobile || userToEdit.user_mobile || "",
        email: userToEdit.email || userToEdit.user_email || "",
        username: userToEdit.username || userToEdit.user_name || "",
        password: "",
        confirmPassword: "",
        designation:
          userToEdit.designation || userToEdit.user_designation || "",
        department: userToEdit.department || userToEdit.user_dept || "",
        role:
          userToEdit.role || (userToEdit.user_role === "A" ? "Admin" : "User"),
        status: userToEdit.status || userToEdit.user_status || "Active",
      });
    }
  }, [isEdit, userToEdit]);

  const designations = [
    "Sr. Interior Designer",
    "Interior Designer",
    "Sr. Accountant",
    "Accountants",
    "Marketing Executive",
    "Brand Manager",
    "Project Manager",
    "Marketing Manager",
    "Production Manager",
    "Managing Director",
    "Tele Marketing Executive",
    "Account & Finance Head",
    "IT Admin",
    "GM Sales",
    "Director",
    "Head Media and Communication",
  ];

  const departments = [
    "Production",
    "Design Studio",
    "Marketing",
    "Accounts",
    "Projects",
    "Sales",
    "IT",
  ];

  const roles = ["User", "Admin"];

    // ✅ Updated handleChange with 10-digit mobile number logic
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Allow only digits and max 10 for mobile number
    if (name === "mobileNo") {
      const numericValue = value.replace(/\D/g, "").slice(0, 10);
      setFormData((prev) => ({ ...prev, [name]: numericValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };
  const handleCancelClick = () => {
    navigate("/users/userList");
  };

  const handleAddUser = async () => {
    // Required fields validation
    if (!formData.firstName || !formData.lastName || !formData.username) {
      showError("Please fill in all required fields.");
      return;
    }

    // Password required only when adding new user
    if (!isEdit && !formData.password) {
      showError("Password is required for new users.");
      return;
    }

    if (formData.password && formData.password !== formData.confirmPassword) {
      showError("Passwords do not match.");
      return;
    }

    const userPayload = {
      user_name: formData.username,
      user_password: formData.password || undefined, // only send if not empty
      user_email: formData.email,
      user_mobile: formData.mobileNo,
      user_fullname: `${formData.firstName} ${formData.lastName}`,
      user_role: formData.role === "Admin" ? "A" : "U",
      user_designation: formData.designation,
      user_dept: formData.department,
      user_status: formData.status,
      user_expo_category: "General",
      user_last_login: new Date(),
      user_added: new Date(),
    };

    try {
      if (isEdit) {
        await dispatch(
          updateUser({ id: userToEdit._id, updates: userPayload })
        ).unwrap();
        showSuccess("User updated successfully!");
      } else {
        await dispatch(createUser(userPayload)).unwrap();
        showSuccess("User added successfully!");
      }
      navigate("/users/userList");
    } catch (error) {
      console.error("Error saving user:", error);
      showError(`Error: ${error.message || "Something went wrong"}`);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100">
      <div className="w-full bg-white  border-gray-300">
        <div className="flex items-center justify-between px-4 py-2">
          <h1 className="text-xl font-normal text-gray-600">
            {isEdit ? "EDIT USER" : "USERS"}
          </h1>
        </div>
      </div>

      <div className="mx-5 my-5 bg-white border border-[#3598dc]">
        <div className="px-3 py-1.5 text-white bg-[#3598dc]">
          <h2 className="text-xl font-semibold">
            {isEdit ? "EDIT USERS" : "ADD USERS"}
          </h2>
        </div>

        <div className="p-8 bg-gray-50 ">
          {/* Name */}
          <div className="flex items-start mb-5 ">
            <label className="w-64 text-right pr-8 pt-2 text-sm text-gray-800">
              Name <span className="text-red-600">*</span>
            </label>
            <div className="flex-1 grid grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className="w-full px-3 py-2 text-sm  border border-gray-300"
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="w-full px-3 py-2 text-sm  border border-gray-300"
              />
            </div>
          </div>

          {/* Mobile */}
          <div className="flex items-center mb-5">
            <label className="w-64 text-right pr-8 text-sm text-gray-800">
              Mobile No. <span className="text-red-600">*</span>
            </label>
            <div className="flex-1">
              <input
                type="tel"
                name="mobileNo"
                value={formData.mobileNo}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm  border border-gray-300"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center mb-5">
            <label className="w-64 text-right pr-8 text-sm text-gray-800">
              Email Address
            </label>
            <div className="flex-1">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm  border border-gray-300"
                required
              />
            </div>
          </div>

          {/* Username */}
          <div className="flex items-center mb-5">
            <label className="w-64 text-right pr-8 text-sm text-gray-800">
              Username <span className="text-red-600">*</span>
            </label>
            <div className="flex-1">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm  border border-gray-300"
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex items-center mb-5">
            <label className="w-64 text-right pr-8 text-sm text-gray-800">
              Password {!isEdit && <span className="text-red-600">*</span>}
            </label>
            <div className="flex-1">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder={
                  isEdit ? "Leave blank to keep current password" : ""
                }
                className="w-full px-3 py-2 text-sm  border border-gray-300"
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div className="flex items-center mb-5">
            <label className="w-64 text-right pr-8 text-sm text-gray-800">
              Confirm Password{" "}
              {!isEdit && <span className="text-red-600">*</span>}
            </label>
            <div className="flex-1">
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder={
                  isEdit ? "Leave blank to keep current password" : ""
                }
                className="w-full px-3 py-2 text-sm  border border-gray-300"
              />
            </div>
          </div>

          {/* Designation */}
          <div className="flex items-center mb-5">
            <label className="w-64 text-right pr-8 text-sm text-gray-800">
              Designation
            </label>
            <div className="flex-1">
              <select
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm  border border-gray-300 text-gray-700"
              >
                <option value="">----- Select -----</option>
                {designations.map((des, idx) => (
                  <option key={idx} value={des}>
                    {des}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Department */}
          <div className="flex items-center mb-5">
            <label className="w-64 text-right pr-8 text-sm text-gray-800">
              Department
            </label>
            <div className="flex-1">
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm  border border-gray-300 text-gray-700"
              >
                <option value="">----- Select -----</option>
                {departments.map((dept, idx) => (
                  <option key={idx} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Role */}
          <div className="flex items-center mb-5">
            <label className="w-64 text-right pr-8 text-sm text-gray-800">
              Role
            </label>
            <div className="flex-1">
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm  border border-gray-300 text-gray-700"
              >
                <option value="">Select User Role</option>
                {roles.map((role, idx) => (
                  <option key={idx} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center mb-8">
            <label className="w-64 text-right pr-8 text-sm text-gray-800">
              Status
            </label>
            <div className="flex-1 flex items-center gap-6">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  value="Active"
                  checked={formData.status === "Active"}
                  onChange={handleChange}
                  className="w-4 h-4"
                />
                <span className="ml-2 text-sm text-gray-800">Active</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  value="Inactive"
                  checked={formData.status === "Inactive"}
                  onChange={handleChange}
                  className="w-4 h-4"
                />
                <span className="ml-2 text-sm text-gray-800">Inactive</span>
              </label>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center">
            <div className="w-64"></div>
            <div className="flex-1 flex gap-3">
              <button
                onClick={handleAddUser}
                className="px-4 py-2 text-sm text-white  bg-[#3598dc]"
              >
                {isEdit ? "Update user" : "Add user"}
              </button>
              <button
                onClick={handleCancelClick}
                className="px-4 py-2 text-sm  bg-gray-300 text-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
