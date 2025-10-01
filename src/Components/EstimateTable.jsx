import React from 'react';
import { FaEdit, FaPrint, FaTrash } from 'react-icons/fa';

const EstimateTable = () => {
  return (
    <div className="overflow-x-auto bg-white p-2 rounded-md shadow-md">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              S.No.
            </th>
            <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Estimate Details
            </th>
            <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Performa Inv.
            </th>
            <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Invoice Details
            </th>
            <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Print
            </th>
            <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Updated Details
            </th>
            <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {/* Sample Row */}
          <tr>
            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">1</td>
            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">Estimate #2025-001</td>
            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
              <button className="text-blue-600 hover:text-blue-900 font-medium">View Performa</button>
            </td>
            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">Invoice #INV-001</td>
            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
              <button className="text-blue-600 hover:text-blue-900 font-medium flex items-center gap-1">
                <FaPrint /> Print
              </button>
            </td>
            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">2025-09-25</td>
            <td className="px-4 py-2 whitespace-nowrap text-sm font-medium flex gap-2">
              <button className="text-blue-600 hover:text-blue-900">
                <FaEdit />
              </button>
              <button className="text-red-600 hover:text-red-900">
                <FaTrash />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default EstimateTable;