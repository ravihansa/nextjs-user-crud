"use client";
import { useEffect, useState } from "react";
import UserTable from "@/components/userTable";
import { getAllUsers } from "@/services/api";

const UserList = () => {
    const [users, setUsers] = useState([]);

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

    return (
        <div>
            <UserTable data={users} />
        </div>
    );
};

export default UserList;
