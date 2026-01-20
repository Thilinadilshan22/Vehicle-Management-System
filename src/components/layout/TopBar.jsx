import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FiBell, FiSearch, FiMenu, FiUser, FiSettings, FiLogOut, FiMoon, FiSun,
    FiTruck, FiTool, FiAlertCircle, FiCheckCircle, FiX, FiCheck
} from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';
import './TopBar.css';

const TopBar = ({ toggleSidebar }) => {
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();
    const [showProfileMenu, setShowProfileMenu] = React.useState(false);
    const [showNotifications, setShowNotifications] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [notifications, setNotifications] = React.useState([
        {
            id: 1,
            type: 'warning',
            icon: FiAlertCircle,
            title: 'Service Due',
            message: 'Vehicle AB-1234 requires maintenance in 2 days',
            time: '10 min ago',
            read: false,
        },
        {
            id: 2,
            type: 'success',
            icon: FiCheckCircle,
            title: 'Driver Approved',
            message: 'New driver John Doe has been approved',
            time: '1 hour ago',
            read: false,
        },
        {
            id: 3,
            type: 'info',
            icon: FiTruck,
            title: 'Vehicle Added',
            message: 'New vehicle CD-5678 added to the system',
            time: '2 hours ago',
            read: false,
        },
        {
            id: 4,
            type: 'warning',
            icon: FiTool,
            title: 'Maintenance Completed',
            message: 'Service for vehicle XY-9876 has been completed',
            time: '3 hours ago',
            read: true,
        },
    ]);

    const unreadCount = notifications.filter(n => !n.read).length;

    const markAsRead = (id) => {
        setNotifications(notifications.map(n =>
            n.id === id ? { ...n, read: true } : n
        ));
    };

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    const clearAll = () => {
        setNotifications([]);
        setShowNotifications(false);
    };

    const getNotificationColor = (type) => {
        switch (type) {
            case 'success': return 'var(--accent-green)';
            case 'warning': return 'var(--accent-orange)';
            case 'error': return 'var(--accent-red)';
            default: return 'var(--primary-400)';
        }
    };

    return (
        <header className="topbar">
            <div className="topbar-left">
                <button className="menu-btn" onClick={toggleSidebar}>
                    <FiMenu />
                </button>

                <div className="search-bar">
                    <FiSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search vehicles, drivers, services..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                    />
                </div>
            </div>

            <div className="topbar-right">
                <div
                    className={`theme-toggle-switch ${theme === 'light' ? 'light' : 'dark'}`}
                    onClick={toggleTheme}
                    title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                >
                    <div className="toggle-track">
                        <FiMoon className="track-icon moon" />
                        <FiSun className="track-icon sun" />
                    </div>
                    <div className="toggle-thumb">
                        {theme === 'dark' ? <FiMoon /> : <FiSun />}
                    </div>
                </div>

                <div className="notification-menu">
                    <button
                        className="icon-btn"
                        title="Notifications"
                        onClick={() => setShowNotifications(!showNotifications)}
                    >
                        <FiBell />
                        {unreadCount > 0 && (
                            <span className="notification-badge">{unreadCount}</span>
                        )}
                    </button>

                    {showNotifications && (
                        <div className="notification-panel">
                            <div className="notification-header">
                                <h3>Notifications</h3>
                                <div className="notification-actions">
                                    {unreadCount > 0 && (
                                        <button
                                            className="text-btn"
                                            onClick={markAllAsRead}
                                            title="Mark all as read"
                                        >
                                            <FiCheck /> Mark all read
                                        </button>
                                    )}
                                    {notifications.length > 0 && (
                                        <button
                                            className="text-btn"
                                            onClick={clearAll}
                                            title="Clear all"
                                        >
                                            <FiX /> Clear all
                                        </button>
                                    )}
                                </div>
                            </div>
                            <div className="notification-list">
                                {notifications.length === 0 ? (
                                    <div className="no-notifications">
                                        <FiBell />
                                        <p>No notifications</p>
                                    </div>
                                ) : (
                                    notifications.map(notification => (
                                        <div
                                            key={notification.id}
                                            className={`notification-item ${notification.read ? 'read' : 'unread'}`}
                                            onClick={() => markAsRead(notification.id)}
                                        >
                                            <div
                                                className="notification-icon"
                                                style={{ color: getNotificationColor(notification.type) }}
                                            >
                                                <notification.icon />
                                            </div>
                                            <div className="notification-content">
                                                <h4>{notification.title}</h4>
                                                <p>{notification.message}</p>
                                                <span className="notification-time">{notification.time}</span>
                                            </div>
                                            {!notification.read && (
                                                <div className="unread-indicator"></div>
                                            )}
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <div className="user-menu">
                    <button
                        className="user-btn"
                        onClick={() => setShowProfileMenu(!showProfileMenu)}
                    >
                        <div className="user-avatar">
                            <FiUser />
                        </div>
                        <div className="user-info">
                            <span className="user-name">Admin User</span>
                            <span className="user-role">System Controller</span>
                        </div>
                    </button>

                    {showProfileMenu && (
                        <div className="dropdown-menu">
                            <button
                                className="dropdown-item"
                                onClick={() => {
                                    navigate('/profile');
                                    setShowProfileMenu(false);
                                }}
                            >
                                <FiUser /> Profile
                            </button>
                            <button
                                className="dropdown-item"
                                onClick={() => {
                                    navigate('/profile');
                                    setShowProfileMenu(false);
                                }}
                            >
                                <FiSettings /> Settings
                            </button>
                            <div className="dropdown-divider" />
                            <button className="dropdown-item danger">
                                <FiLogOut /> Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default TopBar;
