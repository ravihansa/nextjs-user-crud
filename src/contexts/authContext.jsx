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
            setIsAuthenticated(true);
        } catch (error) {
            console.error(error);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setRole(null);
        setIsAuthenticated(false);
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, loading, user, role, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
