import React from 'react';
import '@/styles/deleteConfirmationModal.css';

/**
 * DeleteConfirmationModal - A reusable confirmation modal for delete operations
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Controls the visibility of the modal
 * @param {function} props.onClose - Function to call when closing the modal
 * @param {function} props.onConfirm - Function to call when delete is confirmed
 * @param {string} props.itemName - Name of the item being deleted (optional)
 * @param {string} props.title - Custom title for the modal (optional)
 * @param {string} props.message - Custom message for the modal (optional)
 */
const DeleteConfirmationModal = ({
    isOpen,
    onClose,
    onConfirm,
    itemName = "this item",
    title = "Confirm Deletion",
    message = `Are you sure you want to delete ${itemName}? This action cannot be undone.`
}) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <h2 className="modal-title">{title}</h2>
                <p className="modal-message">{message}</p>
                <div className="modal-actions">
                    <button
                        onClick={onClose}
                        className="modal-button cancel-button"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        className="modal-button delete-button"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;
