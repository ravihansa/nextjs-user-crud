"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);
    const [permissions, setPermissions] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('jwt');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                if (decoded.exp * 1000 < Date.now()) {
                    logout();
                } else {
                    setUser(decoded.sub);
                    setRole(decoded.role);
                    setPermissions(decoded.permissions ?? []);
                    setIsAuthenticated(true);
                }
            } catch (err) {
                logout();
            } finally {
                setLoading(false);
            }
        } else {
            setLoading(false);
            logout();
        }
    }, []);

    const login = (jwtToken) => {
        try {
            localStorage.setItem('jwt', jwtToken);
            const decoded = jwtDecode(jwtToken);
            setUser(decoded.sub);
            setRole(decoded.role);
            setPermissions(decoded.permissions ?? []);
            setIsAuthenticated(true);
        } catch (error) {
            console.error(error);
        }
    };

    const logout = () => {
        localStorage.removeItem('jwt');
        setUser(null);
        setRole(null);
        setPermissions([]);
        setIsAuthenticated(false);
        router.push('/login');
    };

    const hasPermission = (permission) => {
        return permissions.includes(permission);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, loading, user, role, login, logout, hasPermission }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
