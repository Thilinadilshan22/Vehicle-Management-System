import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FiUser, FiMail, FiPhone, FiMapPin, FiCalendar, FiEdit,
    FiSettings, FiShield, FiBell, FiClock, FiCheckCircle,
    FiTruck, FiUsers, FiTool, FiDroplet, FiLock, FiKey,
    FiGlobe, FiMoon, FiSun, FiActivity, FiDownload, FiLogOut,
    FiMonitor
} from 'react-icons/fi';
import './UserProfile.css';

const UserProfile = () => {
    const navigate = useNavigate();
    const [darkMode, setDarkMode] = React.useState(true);
    const [emailNotifications, setEmailNotifications] = React.useState(true);
    const [smsAlerts, setSmsAlerts] = React.useState(false);
    const [timezone, setTimezone] = React.useState('Asia/Colombo');
    const [dateFormat, setDateFormat] = React.useState('DD/MM/YYYY');
    const [autoLogout, setAutoLogout] = React.useState(true);
    const [compactView, setCompactView] = React.useState(false);

    // Mock user data - in real app, fetch from auth context or API
    const user = {
        id: 1,
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@vmas.com',
        phone: '+94 77 999 8888',
        role: 'System Controller',
        dateOfBirth: '1990-03-15',
        address: '456 Management Street',
        city: 'Colombo',
        postalCode: '10200',
        status: 'Active',
        joinDate: '2023-01-15',
        lastLogin: '2026-01-16T20:30:00',
        stats: {
            vehiclesManaged: 48,
            activeDrivers: 32,
            servicesScheduled: 15,
            fuelRecords: 245,
        },
        recentActivities: [
            {
                id: 1,
                type: 'vehicle',
                title: 'Added new vehicle AB-5678',
                time: '2 hours ago',
                icon: FiTruck,
            },
            {
                id: 2,
                type: 'service',
                title: 'Scheduled service for AB-1234',
                time: '5 hours ago',
                icon: FiTool,
            },
            {
                id: 3,
                type: 'driver',
                title: 'Approved driver license renewal',
                time: '1 day ago',
                icon: FiUsers,
            },
            {
                id: 4,
                type: 'fuel',
                title: 'Generated fuel analysis report',
                time: '2 days ago',
                icon: FiDroplet,
            },
        ],
    };

    const getInitials = () => {
        return (user.firstName.charAt(0) + user.lastName.charAt(0)).toUpperCase();
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatDateTime = (dateString) => {
        return new Date(dateString).toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="user-profile-page">
            {/* Profile Header */}
            <div className="profile-header">
                <div className="profile-header-content">
                    <div className="profile-avatar-section">
                        <div className="profile-avatar-large">
                            {getInitials()}
                        </div>
                        <button className="avatar-upload-btn" title="Change Photo">
                            <FiEdit />
                        </button>
                    </div>

                    <div className="profile-header-info">
                        <h1 className="profile-name">{user.firstName} {user.lastName}</h1>
                        <p className="profile-role">{user.role}</p>

                        <div className="profile-meta-info">
                            <div className="meta-item">
                                <FiMail />
                                <span>{user.email}</span>
                            </div>
                            <div className="meta-item">
                                <FiPhone />
                                <span>{user.phone}</span>
                            </div>
                            <div className="meta-item">
                                <FiCalendar />
                                <span>Joined {formatDate(user.joinDate)}</span>
                            </div>
                        </div>

                        <div className="profile-header-actions">
                            <button className="btn btn-primary">
                                <FiEdit /> Edit Profile
                            </button>
                            <button className="btn btn-secondary">
                                <FiSettings /> Account Settings
                            </button>
                        </div>
                    </div>

                    <span className={`badge badge-${user.status === 'Active' ? 'success' : 'warning'}`}>
                        {user.status}
                    </span>
                </div>

                {/* Quick Stats */}
                <div className="profile-quick-stats">
                    <div className="quick-stat">
                        <div className="quick-stat-icon" style={{ background: 'rgba(59, 130, 246, 0.2)' }}>
                            <FiTruck style={{ color: 'var(--primary-400)' }} />
                        </div>
                        <div className="quick-stat-info">
                            <span className="quick-stat-value">{user.stats.vehiclesManaged}</span>
                            <span className="quick-stat-label">Vehicles Managed</span>
                        </div>
                    </div>
                    <div className="quick-stat">
                        <div className="quick-stat-icon" style={{ background: 'rgba(139, 92, 246, 0.2)' }}>
                            <FiUsers style={{ color: 'var(--accent-violet)' }} />
                        </div>
                        <div className="quick-stat-info">
                            <span className="quick-stat-value">{user.stats.activeDrivers}</span>
                            <span className="quick-stat-label">Active Drivers</span>
                        </div>
                    </div>
                    <div className="quick-stat">
                        <div className="quick-stat-icon" style={{ background: 'rgba(245, 158, 11, 0.2)' }}>
                            <FiTool style={{ color: 'var(--accent-orange)' }} />
                        </div>
                        <div className="quick-stat-info">
                            <span className="quick-stat-value">{user.stats.servicesScheduled}</span>
                            <span className="quick-stat-label">Services Scheduled</span>
                        </div>
                    </div>
                    <div className="quick-stat">
                        <div className="quick-stat-icon" style={{ background: 'rgba(16, 185, 129, 0.2)' }}>
                            <FiDroplet style={{ color: 'var(--accent-green)' }} />
                        </div>
                        <div className="quick-stat-info">
                            <span className="quick-stat-value">{user.stats.fuelRecords}</span>
                            <span className="quick-stat-label">Fuel Records</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="profile-content">
                <div className="content-main">
                    {/* Personal Information */}
                    <div className="info-card">
                        <div className="info-card-header">
                            <h3 className="info-card-title">
                                <FiUser /> Personal Information
                            </h3>
                            <button className="btn-icon">
                                <FiEdit />
                            </button>
                        </div>
                        <div className="info-grid">
                            <div className="info-item">
                                <span className="info-label">First Name</span>
                                <span className="info-value">{user.firstName}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Last Name</span>
                                <span className="info-value">{user.lastName}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Email Address</span>
                                <span className="info-value">{user.email}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Phone Number</span>
                                <span className="info-value">{user.phone}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Date of Birth</span>
                                <span className="info-value">{formatDate(user.dateOfBirth)}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Role</span>
                                <span className="info-value">{user.role}</span>
                            </div>
                            <div className="info-item full-width">
                                <span className="info-label">Address</span>
                                <span className="info-value">
                                    {user.address}, {user.city} {user.postalCode}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Account Settings */}
                    <div className="info-card">
                        <div className="info-card-header">
                            <h3 className="info-card-title">
                                <FiSettings /> Account Settings
                            </h3>
                        </div>
                        <div className="settings-list">
                            {/* Email Notifications */}
                            <div className="setting-item">
                                <div className="setting-info">
                                    <FiBell className="setting-icon" />
                                    <div>
                                        <h4 className="setting-title">Email Notifications</h4>
                                        <p className="setting-description">
                                            Receive email updates about system activities
                                        </p>
                                    </div>
                                </div>
                                <label className="toggle-switch">
                                    <input
                                        type="checkbox"
                                        checked={emailNotifications}
                                        onChange={(e) => setEmailNotifications(e.target.checked)}
                                    />
                                    <span className="toggle-slider"></span>
                                </label>
                            </div>

                            {/* SMS Alerts */}
                            <div className="setting-item">
                                <div className="setting-info">
                                    <FiPhone className="setting-icon" />
                                    <div>
                                        <h4 className="setting-title">SMS Alerts</h4>
                                        <p className="setting-description">
                                            Get SMS notifications for critical events
                                        </p>
                                    </div>
                                </div>
                                <label className="toggle-switch">
                                    <input
                                        type="checkbox"
                                        checked={smsAlerts}
                                        onChange={(e) => setSmsAlerts(e.target.checked)}
                                    />
                                    <span className="toggle-slider"></span>
                                </label>
                            </div>

                            {/* Dark Mode */}
                            <div className="setting-item">
                                <div className="setting-info">
                                    <FiMoon className="setting-icon" />
                                    <div>
                                        <h4 className="setting-title">Dark Mode</h4>
                                        <p className="setting-description">
                                            Use dark theme across the application
                                        </p>
                                    </div>
                                </div>
                                <label className="toggle-switch">
                                    <input
                                        type="checkbox"
                                        checked={darkMode}
                                        onChange={(e) => setDarkMode(e.target.checked)}
                                    />
                                    <span className="toggle-slider"></span>
                                </label>
                            </div>

                            {/* Language */}
                            <div className="setting-item">
                                <div className="setting-info">
                                    <FiGlobe className="setting-icon" />
                                    <div>
                                        <h4 className="setting-title">Language</h4>
                                        <p className="setting-description">
                                            Choose your preferred language
                                        </p>
                                    </div>
                                </div>
                                <select className="setting-select">
                                    <option value="en">English</option>
                                    <option value="si">Sinhala</option>
                                    <option value="ta">Tamil</option>
                                </select>
                            </div>

                            {/* Timezone */}
                            <div className="setting-item">
                                <div className="setting-info">
                                    <FiClock className="setting-icon" />
                                    <div>
                                        <h4 className="setting-title">Timezone</h4>
                                        <p className="setting-description">
                                            Set your local timezone for accurate time display
                                        </p>
                                    </div>
                                </div>
                                <select
                                    className="setting-select"
                                    value={timezone}
                                    onChange={(e) => setTimezone(e.target.value)}
                                >
                                    <option value="Asia/Colombo">Asia/Colombo (GMT +5:30)</option>
                                    <option value="Asia/Dubai">Asia/Dubai (GMT +4:00)</option>
                                    <option value="Europe/London">Europe/London (GMT +0:00)</option>
                                    <option value="America/New_York">America/New York (GMT -5:00)</option>
                                    <option value="Asia/Tokyo">Asia/Tokyo (GMT +9:00)</option>
                                </select>
                            </div>

                            {/* Date Format */}
                            <div className="setting-item">
                                <div className="setting-info">
                                    <FiCalendar className="setting-icon" />
                                    <div>
                                        <h4 className="setting-title">Date Format</h4>
                                        <p className="setting-description">
                                            Choose how dates are displayed
                                        </p>
                                    </div>
                                </div>
                                <select
                                    className="setting-select"
                                    value={dateFormat}
                                    onChange={(e) => setDateFormat(e.target.value)}
                                >
                                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                                </select>
                            </div>

                            {/* Compact View */}
                            <div className="setting-item">
                                <div className="setting-info">
                                    <FiMonitor className="setting-icon" />
                                    <div>
                                        <h4 className="setting-title">Compact View</h4>
                                        <p className="setting-description">
                                            Use a more condensed layout to show more information
                                        </p>
                                    </div>
                                </div>
                                <label className="toggle-switch">
                                    <input
                                        type="checkbox"
                                        checked={compactView}
                                        onChange={(e) => setCompactView(e.target.checked)}
                                    />
                                    <span className="toggle-slider"></span>
                                </label>
                            </div>

                            {/* Auto Logout */}
                            <div className="setting-item">
                                <div className="setting-info">
                                    <FiLogOut className="setting-icon" />
                                    <div>
                                        <h4 className="setting-title">Auto Logout</h4>
                                        <p className="setting-description">
                                            Automatically log out after 30 minutes of inactivity
                                        </p>
                                    </div>
                                </div>
                                <label className="toggle-switch">
                                    <input
                                        type="checkbox"
                                        checked={autoLogout}
                                        onChange={(e) => setAutoLogout(e.target.checked)}
                                    />
                                    <span className="toggle-slider"></span>
                                </label>
                            </div>

                            {/* Data Export */}
                            <div className="setting-item">
                                <div className="setting-info">
                                    <FiDownload className="setting-icon" />
                                    <div>
                                        <h4 className="setting-title">Export Data</h4>
                                        <p className="setting-description">
                                            Download a copy of your account data and activity
                                        </p>
                                    </div>
                                </div>
                                <button className="btn btn-secondary btn-sm">
                                    Export Data
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Security Settings */}
                    <div className="info-card">
                        <div className="info-card-header">
                            <h3 className="info-card-title">
                                <FiShield /> Security Settings
                            </h3>
                        </div>
                        <div className="security-list">
                            <div className="security-item">
                                <div className="security-info">
                                    <FiLock className="security-icon" />
                                    <div>
                                        <h4 className="security-title">Password</h4>
                                        <p className="security-description">
                                            Last changed 30 days ago
                                        </p>
                                    </div>
                                </div>
                                <button className="btn btn-secondary btn-sm">
                                    Change Password
                                </button>
                            </div>

                            <div className="security-item">
                                <div className="security-info">
                                    <FiKey className="security-icon" />
                                    <div>
                                        <h4 className="security-title">Two-Factor Authentication</h4>
                                        <p className="security-description">
                                            Add an extra layer of security to your account
                                        </p>
                                    </div>
                                </div>
                                <button className="btn btn-outline btn-sm">
                                    Enable 2FA
                                </button>
                            </div>

                            <div className="security-item">
                                <div className="security-info">
                                    <FiClock className="security-icon" />
                                    <div>
                                        <h4 className="security-title">Login History</h4>
                                        <p className="security-description">
                                            Last login: {formatDateTime(user.lastLogin)}
                                        </p>
                                    </div>
                                </div>
                                <button className="btn btn-secondary btn-sm">
                                    View History
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="content-sidebar">
                    {/* Activity Timeline */}
                    <div className="info-card">
                        <h3 className="info-card-title">
                            <FiActivity /> Recent Activities
                        </h3>
                        <div className="activity-timeline">
                            {user.recentActivities.map((activity, index) => (
                                <div key={activity.id} className="activity-item">
                                    <div className="activity-icon-wrapper">
                                        <activity.icon className="activity-icon" />
                                        {index !== user.recentActivities.length - 1 && (
                                            <div className="activity-line"></div>
                                        )}
                                    </div>
                                    <div className="activity-content">
                                        <p className="activity-title">{activity.title}</p>
                                        <p className="activity-time">{activity.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="btn btn-secondary btn-sm" style={{ width: '100%', marginTop: 'var(--spacing-md)' }}>
                            View All Activities
                        </button>
                    </div>

                    {/* Account Status */}
                    <div className="info-card">
                        <h3 className="info-card-title">
                            <FiCheckCircle /> Account Status
                        </h3>
                        <div className="account-status">
                            <div className="status-item">
                                <FiCheckCircle className="status-icon success" />
                                <span>Email Verified</span>
                            </div>
                            <div className="status-item">
                                <FiCheckCircle className="status-icon success" />
                                <span>Phone Verified</span>
                            </div>
                            <div className="status-item">
                                <FiCheckCircle className="status-icon success" />
                                <span>Profile Complete</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
