'use client';
import { useState } from 'react';
import Sidebar from './sidebar';
import Topbar from './topbar';
import { useAuth } from '@/contexts/authContext';
import Loader from '@/components/common/loader';
import '@/styles/layout.css';

const Layout = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();
    const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

    const toggleSidebar = () => {
        setSidebarCollapsed(!sidebarCollapsed);
    };

    // Show loading spinner while checking authentication
    if (loading) {
        return <Loader size="medium" />
    }

    // Show layout with sidebar and topbar only for authenticated users
    if (isAuthenticated) {
        return (
            <div className="layout">
                <Topbar onToggleSidebar={toggleSidebar} />
                <div className="layout-body">
                    <Sidebar collapsed={sidebarCollapsed} />
                    <main className={`main-content ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
                        {children}
                    </main>
                </div>
            </div>
        );
    }

    // Show children without layout for non authenticated users
    return (
        <div className="auth-layout">
            {children}
        </div>
    );
}

export default Layout;
