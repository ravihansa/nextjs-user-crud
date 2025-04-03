"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/authContext';
import Loader from '@/components/common/loader';

const RoleGuard = ({ children, allowedRoles, redirectTo = '/unauthorized' }) => {
    const { role, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading) {
            if (!allowedRoles.includes(role)) {
                router.push(redirectTo);
            }
        }
    }, [role, loading, router, allowedRoles, redirectTo]);

    if (loading) {
        return <Loader size="medium" />
    }

    return allowedRoles.includes(role) ? children : null;
}

export default RoleGuard;
