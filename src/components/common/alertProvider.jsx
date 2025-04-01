import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Create a custom hook for using alerts anywhere in the app
export const useAlerts = () => {
    const showSuccess = (message, options = {}) => {
        return toast.success(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            ...options
        });
    };

    const showError = (message, options = {}) => {
        return toast.error(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            ...options
        });
    };

    const showWarning = (message, options = {}) => {
        return toast.warning(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            ...options
        });
    };

    const showInfo = (message, options = {}) => {
        return toast.info(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            ...options
        });
    };

    return {
        successAlert: showSuccess,
        errorAlert: showError,
        warningAlert: showWarning,
        infoAlert: showInfo
    };
};

// AlertProvider component
const AlertProvider = () => {
    return (
        <>
            <ToastContainer />
        </>
    );
};

export default AlertProvider;
