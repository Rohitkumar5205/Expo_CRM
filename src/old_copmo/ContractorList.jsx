import React from "react";

const ContractorList = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      {/* Contractor List Header and Buttons */}
      <div className="bg-white p-6 mb-6 flex items-center justify-between border-b border-gray-200">
        <h2 className="text-xl font-normal text-gray-700">CONTRACTOR LIST</h2>
        <div className="flex items-center gap-4">
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 text-sm">
            ADD REG. CONTRACTOR
          </button>
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 text-sm">
            ADD NON-REG. CONTRACTOR
          </button>
          <button className="bg-white border border-gray-300 px-2 py-1">
            <img src="https://via.placeholder.com/24" alt="Icon" className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Contractor List Table */}
      <div className="bg-white p-6 rounded-lg shadow-sm overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <input type="checkbox" className="form-checkbox" />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                S.No.
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contractor Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Types
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Products
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Updated
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <input type="checkbox" className="form-checkbox" />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">S.No.</td>
              <td className="px-6 py-4 whitespace-nowrap">Contractor Name</td>
              <td className="px-6 py-4 whitespace-nowrap">Category</td>
              <td className="px-6 py-4 whitespace-nowrap">Types</td>
              <td className="px-6 py-4 whitespace-nowrap">Products</td>
              <td className="px-6 py-4 whitespace-nowrap">Updated</td>
              <td className="px-6 py-4 whitespace-nowrap">User</td>
              <td className="px-6 py-4 whitespace-nowrap">Action</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContractorList;