"use client";
import { useAuth } from '@/contexts/authContext';

const RoleBasedContent = ({ allowedRoles, children, fallback = null }) => {
    const { role } = useAuth();
    if (!allowedRoles.includes(role)) {
        return fallback;
    }
    return children;
}

export default RoleBasedContent;
