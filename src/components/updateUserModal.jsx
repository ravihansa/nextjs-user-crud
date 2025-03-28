import React, { useState, useEffect } from 'react';
import "@/styles/updateUser.css";

const UpdateUserModal = ({ isOpen, onClose, user, onUpdateUser }) => {
    const [formData, setFormData] = useState({
        userName: '',
        email: '',
        fName: '',
        lName: ''
    });

    // Populate form when user prop changes
    useEffect(() => {
        if (user) {
            setFormData({
                userName: user.userName || '',
                email: user.email || '',
                fName: user.fName || '',
                lName: user.lName || ''
            });
        }
    }, [user]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdateUser({
            ...user,
            ...formData
        });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Update User</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            name="userName"
                            value={formData.userName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>First Name</label>
                        <input
                            type="text"
                            name="fName"
                            value={formData.fName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Last Name</label>
                        <input
                            type="text"
                            name="lName"
                            value={formData.lName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="modal-actions">
                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="update-btn"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateUserModal;
