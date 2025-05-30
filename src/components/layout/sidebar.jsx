'use client';
import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import '@/styles/sidebar.css';

const Sidebar = ({ collapsed }) => {
    const router = useRouter();
    const pathname = usePathname();
    const [expandedMenus, setExpandedMenus] = useState({});

    const toggleMenu = (menuKey) => {
        if (collapsed) return;
        setExpandedMenus(prev => ({
            ...prev,
            [menuKey]: !prev[menuKey]
        }));
    };

    const navigateTo = (path) => {
        router.push(path);
    };

    const isActive = (path) => {
        return pathname === path;
    };

    const menuItems = [
        {
            key: 'dashboard',
            label: 'Dashboard',
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
            path: '/dashboard'
        },
        {
            key: 'users',
            label: 'Users',
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M23 21V19C23 17.9391 22.5786 16.9217 21.8284 16.1716C21.0783 15.4214 20.0609 15 19 15C17.9391 15 16.9217 15.4214 16.1716 16.1716C15.4214 16.9217 15 17.9391 15 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
            hasChildren: true,
            children: [
                { key: 'register', label: 'Register', path: '/users/register' },
                { key: 'details', label: 'Details', path: '/users' }
            ]
        },
        {
            key: 'companies',
            label: 'Companies',
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 16V8C20.9996 7.64928 20.9071 7.30481 20.7315 7.00116C20.556 6.69751 20.3037 6.44536 20 6.27L13 2.27C12.696 2.09446 12.3511 2.00205 12 2.00205C11.6489 2.00205 11.304 2.09446 11 2.27L4 6.27C3.69626 6.44536 3.44398 6.69751 3.26846 7.00116C3.09294 7.30481 3.00036 7.64928 3 8V16C3.00036 16.3507 3.09294 16.6952 3.26846 16.9988C3.44398 17.3025 3.69626 17.5546 4 17.73L11 21.73C11.304 21.9055 11.6489 21.9979 12 21.9979C12.3511 21.9979 12.696 21.9055 13 21.73L20 17.73C20.3037 17.5546 20.556 17.3025 20.7315 16.9988C20.9071 16.6952 20.9996 16.3507 21 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
            path: '/companies'
        }
    ];

    return (
        <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
            <nav className="sidebar-nav">
                <ul className="sidebar-menu">
                    {menuItems.map((item) => (
                        <li key={item.key} className="sidebar-menu-item">
                            {item.hasChildren ? (
                                <>
                                    <button
                                        className={`sidebar-link ${expandedMenus[item.key] ? 'expanded' : ''}`}
                                        onClick={() => toggleMenu(item.key)}
                                    >
                                        <span className="sidebar-icon">{item.icon}</span>
                                        {!collapsed && (
                                            <>
                                                <span className="sidebar-label">{item.label}</span>
                                                <svg
                                                    className="sidebar-arrow"
                                                    width="16"
                                                    height="16"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </>
                                        )}
                                    </button>
                                    {!collapsed && expandedMenus[item.key] && (
                                        <ul className="sidebar-submenu">
                                            {item.children.map((child) => (
                                                <li key={child.key} className="sidebar-submenu-item">
                                                    <button
                                                        className={`sidebar-sublink ${isActive(child.path) ? 'active' : ''}`}
                                                        onClick={() => navigateTo(child.path)}
                                                    >
                                                        <span className="sidebar-sublabel">{child.label}</span>
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </>
                            ) : (
                                <button
                                    className={`sidebar-link ${isActive(item.path) ? 'active' : ''}`}
                                    onClick={() => navigateTo(item.path)}
                                >
                                    <span className="sidebar-icon">{item.icon}</span>
                                    {!collapsed && <span className="sidebar-label">{item.label}</span>}
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
}

export default Sidebar;
