"use client";
import { useAuth } from '@/contexts/authContext';

const PermissionGate = ({ permission, children, fallback = null }) => {
    const { hasPermission } = useAuth();
    if (permission && !hasPermission(permission)) {
        return fallback;
    }
    return children;
}

export default PermissionGate;
