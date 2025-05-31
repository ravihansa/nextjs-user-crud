"use client";
import { useAuth } from '@/contexts/authContext';
import '@/styles/topbar.css';

const Topbar = ({ onToggleSidebar }) => {
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    return (
        <header className="topbar">
            <div className="topbar-left">
                <button className="sidebar-toggle" onClick={onToggleSidebar}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                <h1 className="topbar-title">Dashboard</h1>
            </div>
            <div className="topbar-right">
                {user && (
                    <span className="user-info">
                        Welcome {user}
                    </span>
                )}
                <span className="logout-btn" onClick={handleLogout}>
                    Logout
                </span>
            </div>
        </header>
    );
}

export default Topbar;
