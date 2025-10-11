import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AddUser = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        mobileNo: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        designation: '',
        department: '',
        role: '',
        status: 'Active'
    });

    const { state } = useLocation();
    const navigate = useNavigate();
    const isEdit = state?.isEdit || false;
    const userToEdit = state?.user || null;

    useEffect(() => {
        if (isEdit && userToEdit) {
            setFormData({
                firstName: userToEdit.fullName.split(' ')[0] || '',
                lastName: userToEdit.fullName.split(' ')[1] || '',
                mobileNo: userToEdit.mobile || '',
                email: '',
                username: userToEdit.username || '',
                password: '',
                confirmPassword: '',
                designation: userToEdit.designation || '',
                department: '',
                role: '',
                status: userToEdit.status || 'Active'
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
        "Head Media and Communication"
    ];

    const departments = [
        "Production",
        "Design Studio",
        "Marketing",
        "Accounts",
        "Projects",
        "Sales",
        "IT"
    ];

    const roles = [
        "User",
        "Admin"
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleCancelClick = () => {
        setFormData({
            firstName: '',
            lastName: '',
            mobileNo: '',
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
            designation: '',
            department: '',
            role: '',
            status: 'Active'
        });
        navigate('/userlist');
    };

    const handleAddUser = () => {
        if (isEdit) {
            console.log('User data updated:', formData);
            alert('User updated successfully!');
            navigate('/userlist');
        } else {
            console.log('User data to be added:', formData);
            alert('User added successfully!');
        }
    };

    return (
        <div className="w-full min-h-screen" style={{ backgroundColor: '#f5f5f5' }}>
            {/* Header Section */}
            <div className="w-full bg-white" style={{ borderBottom: '1px solid #e0e0e0' }}>
                <div className="flex items-center justify-between px-6 py-3">
                    <h1 className="text-lg font-normal" style={{ color: '#666' }}>
                        {isEdit ? 'EDIT USERS' : 'USERS'}
                    </h1>
                    <button 
                        className="px-5 py-2 text-sm text-white rounded cursor-pointer"
                        style={{ backgroundColor: '#78a300' }}
                        onClick={() => navigate('/userlist')}
                    >
                        Actions
                    </button>
                </div>
            </div>

            {/* Main Form Section */}
            <div className="mx-6 mt-6 bg-white" style={{ border: '1px solid #e0e0e0' }}>
                {/* Blue Header */}
                <div className="px-5 py-3 text-white" style={{ backgroundColor: '#3598dc' }}>
                    <h2 className="text-xl font-medium">
                        {isEdit ? 'EDIT USERS' : 'ADD USERS'}
                    </h2>
                </div>

                {/* Form Content */}
                <div className="p-8" style={{ backgroundColor: '#fafafa' }}>
                    {/* Name Row */}
                    <div className="flex items-start mb-5">
                        <label className="w-64 text-right pr-8 pt-2 text-sm" style={{ color: '#333' }}>
                            Name <span style={{ color: '#f44336' }}>*</span>
                        </label>
                        <div className="flex-1 grid grid-cols-2 gap-4">
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                placeholder="First Name"
                                className="w-full px-3 py-2 text-sm rounded"
                                style={{ 
                                    border: '1px solid #d0d0d0',
                                    backgroundColor: 'white'
                                }}
                            />
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                placeholder="Last Name"
                                className="w-full px-3 py-2 text-sm rounded"
                                style={{ 
                                    border: '1px solid #d0d0d0',
                                    backgroundColor: 'white'
                                }}
                            />
                        </div>
                    </div>

                    {/* Mobile No. */}
                    <div className="flex items-center mb-5">
                        <label className="w-64 text-right pr-8 text-sm" style={{ color: '#333' }}>
                            Mobile No. <span style={{ color: '#f44336' }}>*</span>
                        </label>
                        <div className="flex-1">
                            <input
                                type="tel"
                                name="mobileNo"
                                value={formData.mobileNo}
                                onChange={handleChange}
                                className="w-full px-3 py-2 text-sm rounded"
                                style={{ 
                                    border: '1px solid #d0d0d0',
                                    backgroundColor: 'white'
                                }}
                            />
                        </div>
                    </div>

                    {/* Email Address */}
                    <div className="flex items-center mb-5">
                        <label className="w-64 text-right pr-8 text-sm" style={{ color: '#333' }}>
                            Email Address <span style={{ color: '#f44336' }}>*</span>
                        </label>
                        <div className="flex-1">
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-3 py-2 text-sm rounded"
                                style={{ 
                                    border: '1px solid #d0d0d0',
                                    backgroundColor: 'white'
                                }}
                            />
                        </div>
                    </div>

                    {/* Username */}
                    <div className="flex items-center mb-5">
                        <label className="w-64 text-right pr-8 text-sm" style={{ color: '#333' }}>
                            Username <span style={{ color: '#f44336' }}>*</span>
                        </label>
                        <div className="flex-1">
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className="w-full px-3 py-2 text-sm rounded"
                                style={{ 
                                    border: '1px solid #d0d0d0',
                                    backgroundColor: 'white'
                                }}
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="flex items-center mb-5">
                        <label className="w-64 text-right pr-8 text-sm" style={{ color: '#333' }}>
                            Password <span style={{ color: '#f44336' }}>*</span>
                        </label>
                        <div className="flex-1">
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-3 py-2 text-sm rounded"
                                style={{ 
                                    border: '1px solid #d0d0d0',
                                    backgroundColor: 'white'
                                }}
                            />
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="flex items-center mb-5">
                        <label className="w-64 text-right pr-8 text-sm" style={{ color: '#333' }}>
                            Confirm Password <span style={{ color: '#f44336' }}>*</span>
                        </label>
                        <div className="flex-1">
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full px-3 py-2 text-sm rounded"
                                style={{ 
                                    border: '1px solid #d0d0d0',
                                    backgroundColor: 'white'
                                }}
                            />
                        </div>
                    </div>

                    {/* Designation */}
                    <div className="flex items-center mb-5">
                        <label className="w-64 text-right pr-8 text-sm" style={{ color: '#333' }}>
                            Designation <span style={{ color: '#f44336' }}>*</span>
                        </label>
                        <div className="flex-1">
                            <select
                                name="designation"
                                value={formData.designation}
                                onChange={handleChange}
                                className="w-full px-3 py-2 text-sm rounded"
                                style={{ 
                                    border: '1px solid #d0d0d0',
                                    backgroundColor: 'white',
                                    color: '#666'
                                }}
                            >
                                <option value="">----- Select -----</option>
                                {designations.map((des, index) => (
                                    <option key={index} value={des}>{des}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Department */}
                    <div className="flex items-center mb-5">
                        <label className="w-64 text-right pr-8 text-sm" style={{ color: '#333' }}>
                            Department <span style={{ color: '#f44336' }}>*</span>
                        </label>
                        <div className="flex-1">
                            <select
                                name="department"
                                value={formData.department}
                                onChange={handleChange}
                                className="w-full px-3 py-2 text-sm rounded"
                                style={{ 
                                    border: '1px solid #d0d0d0',
                                    backgroundColor: 'white',
                                    color: '#666'
                                }}
                            >
                                <option value="">----- Select -----</option>
                                {departments.map((dept, index) => (
                                    <option key={index} value={dept}>{dept}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Role */}
                    <div className="flex items-center mb-5">
                        <label className="w-64 text-right pr-8 text-sm" style={{ color: '#333' }}>
                            Role <span style={{ color: '#f44336' }}>*</span>
                        </label>
                        <div className="flex-1">
                            <select
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="w-full px-3 py-2 text-sm rounded"
                                style={{ 
                                    border: '1px solid #d0d0d0',
                                    backgroundColor: 'white',
                                    color: '#666'
                                }}
                            >
                                <option value="">Select User Role</option>
                                {roles.map((role, index) => (
                                    <option key={index} value={role}>{role}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Status */}
                    <div className="flex items-center mb-8">
                        <label className="w-64 text-right pr-8 text-sm" style={{ color: '#333' }}>
                            Status <span style={{ color: '#f44336' }}>*</span>
                        </label>
                        <div className="flex-1 flex items-center gap-6">
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="radio"
                                    name="status"
                                    value="Active"
                                    checked={formData.status === 'Active'}
                                    onChange={handleChange}
                                    className="w-4 h-4"
                                />
                                <span className="ml-2 text-sm" style={{ color: '#333' }}>Active</span>
                            </label>
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="radio"
                                    name="status"
                                    value="Inactive"
                                    checked={formData.status === 'Inactive'}
                                    onChange={handleChange}
                                    className="w-4 h-4"
                                />
                                <span className="ml-2 text-sm" style={{ color: '#333' }}>Inactive</span>
                            </label>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex items-center">
                        <div className="w-64"></div>
                        <div className="flex-1 flex gap-3">
                            <button
                                onClick={handleAddUser}
                                className="px-6 py-2 text-sm text-white rounded"
                                style={{ backgroundColor: '#2196f3' }}
                            >
                                {isEdit ? 'Update user' : 'Add user'}
                            </button>
                            <button
                                onClick={handleCancelClick}
                                className="px-6 py-2 text-sm rounded"
                                style={{ 
                                    backgroundColor: '#e0e0e0',
                                    color: '#666'
                                }}
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