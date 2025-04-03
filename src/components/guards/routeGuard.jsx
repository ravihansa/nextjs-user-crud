"use client";
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/authContext';
import Loader from '@/components/common/loader';

const RouteGuard = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    // Public routes that do not require authentication
    const publicRoutes = ['/login'];
    const isPublicRoute = publicRoutes.includes(pathname);

    useEffect(() => {
        if (!loading) {
            if (!isAuthenticated && !isPublicRoute) {
                router.push('/login');
            }
        }
    }, [isAuthenticated, loading, isPublicRoute, router, pathname]);

    if (loading) {
        return <Loader size="medium" />
    }

    // If user is not authenticated and trying to access a protected route, render nothing while the redirect happens
    if (!isAuthenticated && !isPublicRoute) {
        return null;
    }

    // Allow rendering on public routes or if the user is authenticated
    return children;
}

export default RouteGuard;
