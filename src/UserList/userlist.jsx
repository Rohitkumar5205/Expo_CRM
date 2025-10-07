import React, { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UserList = () => {
    const [users, setUsers] = useState([
        { id: 1, fullName: 'Admin', designation: 'It Admin', username: 'Admin', mobile: '8057965238', type: 'MAD', status: 'Active' },
        { id: 2, fullName: 'Vijay Sharma', designation: 'Managing Director', username: 'Vijay', mobile: '9810247319', type: 'MAD', status: 'Active' },
        { id: 3, fullName: 'Rohit', designation: 'Sr. Accountant', username: 'Accounts', mobile: '8285519315', type: 'AD', status: 'Active' },
        { id: 4, fullName: 'Rishay Singh', designation: 'Marketing Manager', username: 'Rishay', mobile: '9354811889', type: 'U', status: 'Active' },
        { id: 5, fullName: 'Reetika Singh', designation: 'Marketing Manager', username: 'Reetika', mobile: '9773992519', type: 'AD', status: 'Inactive' },
        { id: 6, fullName: 'Dinesh Rathore', designation: 'Marketing Manager', username: 'Dinesh', mobile: '9810032448', type: 'AD', status: 'Inactive' },
        { id: 7, fullName: 'Durga', designation: 'Marketing Executive', username: 'Durga', mobile: '6296912086', type: 'U', status: 'Inactive' },
        { id: 8, fullName: 'Ankit Mishra', designation: 'Marketing Executive', username: 'Ankit', mobile: '8789243890', type: 'U', status: 'Inactive' },
        { id: 9, fullName: 'Abhay Raj', designation: 'Marketing Executive', username: 'Abhay', mobile: '9119088939', type: 'U', status: 'Active' },
        { id: 10, fullName: 'Milan Kumar', designation: 'Marketing Executive', username: 'Milan', mobile: '7300755677', type: 'U', status: 'Inactive' },
        { id: 11, fullName: 'Sumit Mishra', designation: 'Marketing Executive', username: 'Sumit', mobile: '6203568448', type: 'U', status: 'Active' },
        { id: 12, fullName: 'Nitin Kumar', designation: 'Marketing Manager', username: 'Nitin', mobile: '9220448105', type: 'U', status: 'Inactive' },
        { id: 13, fullName: 'Shivam Srivastava', designation: 'Marketing Manager', username: 'Shivam', mobile: '9953190944', type: 'AD', status: 'Inactive' },
        { id: 14, fullName: 'Chiranjeev Sharma', designation: 'Marketing Executive', username: 'Chiranjeev', mobile: '8287272104', type: 'U', status: 'Active' },
        { id: 15, fullName: 'Jai Prakash', designation: 'Marketing Manager', username: 'Jaiprakash', mobile: '8800714762', type: 'U', status: 'Inactive' },
        { id: 16, fullName: 'Shimpl Rawat', designation: 'Tele Marketing Executive', username: 'Shimpl', mobile: '9389947466', type: 'U', status: 'Active' },
        { id: 17, fullName: 'Tanya Jaiswal', designation: 'Tele Marketing Executive', username: 'Tanya', mobile: '9220448107', type: 'U', status: 'Active' },
        { id: 18, fullName: 'Prerna Pandey', designation: 'Tele Marketing Executive', username: 'Prerna', mobile: '9220448109', type: 'U', status: 'Active' },
        { id: 19, fullName: 'Keshav Madan', designation: 'Tele Marketing Executive', username: 'Keshav', mobile: '9220408162', type: 'U', status: 'Inactive' },
        { id: 20, fullName: 'Sanjeev Premi', designation: 'Marketing Executive', username: 'Sanjeev', mobile: '7042466330', type: 'AD', status: 'Inactive' },
        { id: 21, fullName: 'Manoj Mishra', designation: 'Project Manager', username: 'Manoj', mobile: '7000281125', type: 'AD', status: 'Active' }
    ]);

    const navigate = useNavigate();

    const handleEdit = (userId) => {
        const userToEdit = users.find(user => user.id === userId);
        navigate('/adduser', { state: { user: userToEdit, isEdit: true } });
    };

    const handleDelete = (userId, userName) => {
        const confirmed = window.confirm(`Are you sure you want to delete ${userName}?`);
        if (confirmed) {
            setUsers(users.filter(user => user.id !== userId));
            alert('User deleted successfully!');
        }
    };

    return (
        <div className="w-full min-h-screen" style={{ backgroundColor: '#f5f5f5' }}>
            {/* Header Section */}
            <div className="w-full bg-white" style={{ borderBottom: '1px solid #e0e0e0' }}>
                <div className="flex items-center justify-between px-6 py-3">
                    <h1 className="text-lg font-normal" style={{ color: '#666' }}>USERS</h1>
                    <button 
                        className="px-5 py-2 text-sm text-white rounded cursor-pointer"
                        style={{ backgroundColor: '#78a300' }}
                        onClick={() => navigate('/adduser')}
                    >
                        Actions
                    </button>
                </div>
            </div>

            {/* Table Section */}
            <div className="mx-6 mt-6 bg-white" style={{ border: '1px solid #e0e0e0' }}>
                {/* Blue Header */}
                <div className="px-5 py-3 text-white" style={{ backgroundColor: '#3598dc' }}>
                    <h2 className="text-xl font-medium">USERS LIST</h2>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr style={{ backgroundColor: '#f9f9f9', borderBottom: '2px solid #ddd' }}>
                                <th className="px-4 py-3 text-sm font-semibold text-center" style={{ color: '#333', borderRight: '1px solid #ddd' }}>No.</th>
                                <th className="px-4 py-3 text-sm font-semibold text-left" style={{ color: '#333', borderRight: '1px solid #ddd' }}>Full Name</th>
                                <th className="px-4 py-3 text-sm font-semibold text-left" style={{ color: '#333', borderRight: '1px solid #ddd' }}>Designation</th>
                                <th className="px-4 py-3 text-sm font-semibold text-left" style={{ color: '#333', borderRight: '1px solid #ddd' }}>Username</th>
                                <th className="px-4 py-3 text-sm font-semibold text-left" style={{ color: '#333', borderRight: '1px solid #ddd' }}>Mobile</th>
                                <th className="px-4 py-3 text-sm font-semibold text-center" style={{ color: '#333', borderRight: '1px solid #ddd' }}>Type</th>
                                <th className="px-4 py-3 text-sm font-semibold text-center" style={{ color: '#333', borderRight: '1px solid #ddd' }}>status</th>
                                <th className="px-4 py-3 text-sm font-semibold text-center" style={{ color: '#333' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr 
                                    key={user.id}
                                    style={{ 
                                        borderBottom: '1px solid #e8e8e8',
                                        backgroundColor: index % 2 === 0 ? '#ffffff' : '#fafafa'
                                    }}
                                >
                                    <td className="px-4 py-3 text-sm text-center" style={{ color: '#333', borderRight: '1px solid #e8e8e8' }}>
                                        {user.id}
                                    </td>
                                    <td className="px-4 py-3 text-sm" style={{ borderRight: '1px solid #e8e8e8' }}>
                                        <span style={{ color: '#3598dc', cursor: 'pointer' }}>{user.fullName}</span>
                                    </td>
                                    <td className="px-4 py-3 text-sm" style={{ color: '#333', borderRight: '1px solid #e8e8e8' }}>
                                        {user.designation}
                                    </td>
                                    <td className="px-4 py-3 text-sm" style={{ color: '#333', borderRight: '1px solid #e8e8e8' }}>
                                        {user.username}
                                    </td>
                                    <td className="px-4 py-3 text-sm" style={{ color: '#333', borderRight: '1px solid #e8e8e8' }}>
                                        {user.mobile}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-center" style={{ color: '#333', borderRight: '1px solid #e8e8e8' }}>
                                        {user.type}
                                    </td>
                                    <td className="px-4 py-3 text-center" style={{ borderRight: '1px solid #e8e8e8' }}>
                                        <span 
                                            className="inline-block px-3 py-1 text-xs text-white rounded"
                                            style={{ 
                                                backgroundColor: user.status === 'Active' ? '#26c6da' : '#ef5350'
                                            }}
                                        >
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center justify-center gap-2">
                                            <button
                                                onClick={() => handleEdit(user.id)}
                                                className="p-2 rounded cursor-pointer"
                                                style={{ 
                                                    border: '1px solid #3598dc',
                                                    color: '#3598dc',
                                                    backgroundColor: 'white'
                                                }}
                                                title="Edit"
                                            >
                                                <Pencil size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(user.id, user.fullName)}
                                                className="p-2 rounded cursor-pointer"
                                                style={{ 
                                                    border: '1px solid #ef5350',
                                                    color: '#ef5350',
                                                    backgroundColor: 'white'
                                                }}
                                                title="Delete"
                                            >
                                                <Trash2 size={16} />
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