"use client";
import { useEffect, useState } from "react";
import UserTable from "@/components/userTable";
import UpdateUserModal from "@/components/updateUserModal";
import { getAllUsers, updateUser } from "@/services/api";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

    const getUsers = async () => {
        try {
            const res = await getAllUsers();
            const response = await res.json();
            if (response.status) {
                setUsers(response.data);
            } else {
                console.error(response.message);
            }
        } catch (error) {
            console.error("Failed to fetch users", error.message);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    const handleUpdateUser = (user) => {
        setSelectedUser(user);
        setIsUpdateModalOpen(true);
    };

    const handleModalClose = () => {
        setIsUpdateModalOpen(false);
        setSelectedUser(null);
    };

    const handleUserUpdate = async (updatedUser) => {
        try {
            const res = await updateUser(updatedUser);
            const response = await res.json();
            if (response.status) {
                // Update the users list with the updated user
                setUsers(prevUsers =>
                    prevUsers.map(user =>
                        user.id === updatedUser.id ? updatedUser : user
                    )
                );
                handleModalClose();
            } else {
                console.error(response.message);
            }
        } catch (error) {
            console.error("Failed to update user", error.message);
        }
    };

    const handleDeleteUser = async (user) => {
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
                onClose={handleModalClose}
                user={selectedUser}
                onUpdateUser={handleUserUpdate}
            />
        </div>
    );
};

export default UserList;
