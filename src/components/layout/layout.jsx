'use client';
import { useState } from 'react';
import Sidebar from './sidebar';
import Topbar from './topbar';
import '@/styles/layout.css';

const Layout = ({ children }) => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    const toggleSidebar = () => {
        setSidebarCollapsed(!sidebarCollapsed);
    };

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

export default Layout;
