import React, { useEffect } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUser } from "../../features/auth/userSlice";
import { showError, showSuccess } from "../../utils/toastMessage";

const UserList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { users, loading, error } = useSelector((state) => state.users);

  // ✅ Fetch users on mount
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleEdit = (userId) => {
    const userToEdit = users.find((u) => u._id === userId);
    navigate("/users/addUser", { state: { user: userToEdit, isEdit: true } });
  };

  const handleDelete = (userId, userName) => {
    dispatch(deleteUser(userId))
      .unwrap()
      .then(() => showSuccess("User deleted successfully!"))
      .catch((err) => showError("Failed to delete user: " + err));
  };

  if (loading) return <div className="p-5 text-center">Loading...</div>;
  if (error) return <div className="p-5 text-red-500 text-center">{error}</div>;

  return (
    <div className="w-full min-h-screen bg-[#f5f5f5]">
      <div className="w-full bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-6 py-3">
          <h1 className="text-lg font-normal text-gray-600">USERS</h1>
        </div>
      </div>

      <div className="mx-6 mt-6 bg-white border border-gray-200">
        <div className="px-5 py-3 text-white bg-[#3598dc]">
          <h2 className="text-xl font-medium">USERS LIST</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b-2 border-gray-300">
                <th className="px-4 py-3 text-sm font-semibold text-center border-r border-gray-300">
                  No.
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-left border-r border-gray-300">
                  Full Name
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-left border-r border-gray-300">
                  Designation
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-left border-r border-gray-300">
                  Username
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-left border-r border-gray-300">
                  Mobile
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-center border-r border-gray-300">
                  Type
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-center border-r border-gray-300">
                  Status
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-center">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user._id}
                  className={`border-b border-gray-200 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="px-4 py-3 text-sm text-center border-r border-gray-200">
                    {index + 1}
                  </td>
                  <td className="px-4 py-3 text-sm border-r border-gray-200 text-blue-600 cursor-pointer">
                    {user.user_fullname}
                  </td>
                  <td className="px-4 py-3 text-sm border-r border-gray-200">
                    {user.user_designation}
                  </td>
                  <td className="px-4 py-3 text-sm border-r border-gray-200">
                    {user.user_name}
                  </td>
                  <td className="px-4 py-3 text-sm border-r border-gray-200">
                    {user.user_mobile}
                  </td>
                  <td className="px-4 py-3 text-sm text-center border-r border-gray-200">
                    {user.user_role}
                  </td>
                  <td className="px-4 py-3 text-center border-r border-gray-200">
                    <span
                      className={`inline-block px-3 py-1 text-xs text-white rounded ${
                        user.user_status === "Active"
                          ? "bg-teal-400"
                          : "bg-red-500"
                      }`}
                    >
                      {user.user_status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleEdit(user._id)}
                        className="p-2 border border-[#3598dc] text-[#3598dc] bg-white rounded"
                        title="Edit"
                      >
                        <Pencil size={12} />
                      </button>
                      <button
                        onClick={() =>
                          handleDelete(user._id, user.user_fullname)
                        }
                        className="p-2 border border-red-500 text-red-500 bg-white rounded"
                        title="Delete"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserList;
