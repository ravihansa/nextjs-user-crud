"use client";
import { useEffect, useState } from "react";
import UserTable from "@/components/userTable";
import UpdateUserModal from "@/components/updateUserModal";
import { getAllUsers, updateUser, deleteUser } from "@/services/api";
import DeleteConfirmationModal from '@/components/common/deleteConfirmationModal';
import Loader from '@/components/common/loader';
import { useAlerts } from '@/components/common/alertProvider';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState(null);
    const [deletingUserId, setDeletingUserId] = useState(null);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const { successAlert, errorAlert, warningAlert, infoAlert } = useAlerts();

    const getUsers = async () => {
        try {
            const res = await getAllUsers();
            const response = await res.json();
            if (response.status) {
                setUsers(response.data);
                infoAlert(response.message, { autoClose: 1000 });
            } else {
                warningAlert(response.message);
            }
        } catch (error) {
            errorAlert(error.message || 'An error occurred!');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    const handleUpdateUser = (user) => {
        setSelectedUser(user);
        setIsUpdateModalOpen(true);
    };

    const handleUpdateModalClose = () => {
        setIsUpdateModalOpen(false);
        setSelectedUser(null);
    };

    const handleUserUpdate = async (updatedUser) => {
        try {
            setLoading(true);
            const res = await updateUser(updatedUser);
            const response = await res.json();
            if (response.status) {
                // Update the users list with the updated user
                successAlert(response.message);
                setUsers(prevUsers =>
                    prevUsers.map(user =>
                        user.id === updatedUser.id ? updatedUser : user
                    )
                );
                handleUpdateModalClose();
            } else {
                warningAlert(response.message);
            }
        } catch (error) {
            errorAlert(error.message || 'An error occurred!');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteUser = async (user) => {
        setDeletingUserId(user.id);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteModalClose = () => {
        setIsDeleteModalOpen(false);
        setDeletingUserId(null);
    };

    const handleUserDelete = async () => {
        if (!deletingUserId) return;

        try {
            setLoading(true);
            const res = await deleteUser(deletingUserId);
            const response = await res.json();
            if (response.status) {
                // Remove deleted user from the user list
                successAlert(response.message);
                setUsers(prevUsers =>
                    prevUsers.filter(user =>
                        user.id !== deletingUserId
                    )
                );
                handleDeleteModalClose();
            } else {
                warningAlert(response.message);
            }
        } catch (error) {
            errorAlert(error.message || 'An error occurred!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <UserTable
                data={users}
                onUpdateUser={handleUpdateUser}
                onDeleteUser={handleDeleteUser}
            />
            <UpdateUserModal
                isOpen={isUpdateModalOpen}
                onClose={handleUpdateModalClose}
                user={selectedUser}
                onUpdateUser={handleUserUpdate}
            />
            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={handleDeleteModalClose}
                onConfirm={handleUserDelete}
                message="Deleting this user will remove all user related data. This action cannot be undone."
            />
            {loading && <Loader size="large" color="#0000FF" />}
        </div>
    );
};

export default UserList;
