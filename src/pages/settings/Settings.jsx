import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import {
    FiSettings, FiBell, FiPhone, FiMoon, FiSun, FiGlobe,
    FiType, FiClock, FiCalendar, FiMonitor, FiLogOut,
    FiDownload, FiChevronLeft
} from 'react-icons/fi';
import './Settings.css';

const Settings = () => {
    const navigate = useNavigate();
    const { theme, toggleTheme, isDark } = useTheme();

    // Load settings from localStorage
    const [emailNotifications, setEmailNotifications] = React.useState(() => {
        const saved = localStorage.getItem('v-mas-email-notifications');
        return saved ? JSON.parse(saved) : true;
    });
    const [smsAlerts, setSmsAlerts] = React.useState(() => {
        const saved = localStorage.getItem('v-mas-sms-alerts');
        return saved ? JSON.parse(saved) : false;
    });
    const [timezone, setTimezone] = React.useState(() => {
        return localStorage.getItem('v-mas-timezone') || 'Asia/Colombo';
    });
    const [dateFormat, setDateFormat] = React.useState(() => {
        return localStorage.getItem('v-mas-date-format') || 'DD/MM/YYYY';
    });
    const [language, setLanguage] = React.useState(() => {
        return localStorage.getItem('v-mas-language') || 'en';
    });
    const [textSize, setTextSize] = React.useState(() => {
        return localStorage.getItem('v-mas-text-size') || 'medium';
    });
    const [autoLogout, setAutoLogout] = React.useState(() => {
        const saved = localStorage.getItem('v-mas-auto-logout');
        return saved ? JSON.parse(saved) : true;
    });
    const [compactView, setCompactView] = React.useState(() => {
        const saved = localStorage.getItem('v-mas-compact-view');
        return saved ? JSON.parse(saved) : false;
    });

    const [showNotification, setShowNotification] = React.useState(false);
    const [notificationMessage, setNotificationMessage] = React.useState('');

    // Handle settings changes with localStorage persistence
    const handleSettingChange = (key, value) => {
        localStorage.setItem(`v-mas-${key}`, typeof value === 'boolean' ? JSON.stringify(value) : value);

        // Show notification for settings change
        setNotificationMessage('Setting updated successfully!');
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 2000);
    };

    const handleEmailNotificationsChange = (value) => {
        setEmailNotifications(value);
        handleSettingChange('email-notifications', value);
    };

    const handleSmsAlertsChange = (value) => {
        setSmsAlerts(value);
        handleSettingChange('sms-alerts', value);
    };

    const handleTimezoneChange = (value) => {
        setTimezone(value);
        handleSettingChange('timezone', value);
    };

    const handleDateFormatChange = (value) => {
        setDateFormat(value);
        handleSettingChange('date-format', value);
    };

    const handleLanguageChange = (value) => {
        setLanguage(value);
        handleSettingChange('language', value);
    };

    const handleTextSizeChange = (value) => {
        setTextSize(value);
        handleSettingChange('text-size', value);
        // Apply text size to document
        document.documentElement.setAttribute('data-text-size', value);
    };

    const handleAutoLogoutChange = (value) => {
        setAutoLogout(value);
        handleSettingChange('auto-logout', value);
    };

    const handleCompactViewChange = (value) => {
        setCompactView(value);
        handleSettingChange('compact-view', value);
    };

    // Apply text size on mount
    React.useEffect(() => {
        document.documentElement.setAttribute('data-text-size', textSize);
    }, []);

    return (
        <div className="settings-page">
            {/* Success Notification */}
            {showNotification && (
                <div className="notification-toast success">
                    {notificationMessage}
                </div>
            )}

            {/* Settings Header */}
            <div className="settings-header">
                <button className="back-btn" onClick={() => navigate(-1)}>
                    <FiChevronLeft />
                </button>
                <div>
                    <h1 className="settings-title">
                        <FiSettings /> Settings
                    </h1>
                    <p className="settings-subtitle">
                        Manage your application preferences and site-wide settings
                    </p>
                </div>
            </div>

            {/* Settings Content */}
            <div className="settings-content">
                {/* Appearance Settings */}
                <div className="settings-card">
                    <div className="settings-card-header">
                        <h3 className="settings-card-title">Appearance</h3>
                        <p className="settings-card-description">
                            Customize how the application looks and feels
                        </p>
                    </div>
                    <div className="settings-list">
                        {/* Dark Mode */}
                        <div className="setting-item">
                            <div className="setting-info">
                                {isDark ? <FiMoon className="setting-icon" /> : <FiSun className="setting-icon" />}
                                <div>
                                    <h4 className="setting-title">Dark Mode</h4>
                                    <p className="setting-description">
                                        {isDark ? 'Switch to light theme' : 'Switch to dark theme'}
                                    </p>
                                </div>
                            </div>
                            <label className="toggle-switch">
                                <input
                                    type="checkbox"
                                    checked={isDark}
                                    onChange={toggleTheme}
                                />
                                <span className="toggle-slider"></span>
                            </label>
                        </div>

                        {/* Text Size */}
                        <div className="setting-item">
                            <div className="setting-info">
                                <FiType className="setting-icon" />
                                <div>
                                    <h4 className="setting-title">Text Size</h4>
                                    <p className="setting-description">
                                        Adjust the text size across the application
                                    </p>
                                </div>
                            </div>
                            <select
                                className="setting-select"
                                value={textSize}
                                onChange={(e) => handleTextSizeChange(e.target.value)}
                            >
                                <option value="small">Small</option>
                                <option value="medium">Medium</option>
                                <option value="large">Large</option>
                                <option value="extra-large">Extra Large</option>
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
                                    onChange={(e) => handleCompactViewChange(e.target.checked)}
                                />
                                <span className="toggle-slider"></span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Localization Settings */}
                <div className="settings-card">
                    <div className="settings-card-header">
                        <h3 className="settings-card-title">Localization</h3>
                        <p className="settings-card-description">
                            Set your language, timezone, and regional preferences
                        </p>
                    </div>
                    <div className="settings-list">
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
                            <select
                                className="setting-select"
                                value={language}
                                onChange={(e) => handleLanguageChange(e.target.value)}
                            >
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
                                onChange={(e) => handleTimezoneChange(e.target.value)}
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
                                onChange={(e) => handleDateFormatChange(e.target.value)}
                            >
                                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Notifications Settings */}
                <div className="settings-card">
                    <div className="settings-card-header">
                        <h3 className="settings-card-title">Notifications</h3>
                        <p className="settings-card-description">
                            Manage how you receive updates and alerts
                        </p>
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
                                    onChange={(e) => handleEmailNotificationsChange(e.target.checked)}
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
                                    onChange={(e) => handleSmsAlertsChange(e.target.checked)}
                                />
                                <span className="toggle-slider"></span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Security & Privacy Settings */}
                <div className="settings-card">
                    <div className="settings-card-header">
                        <h3 className="settings-card-title">Security & Privacy</h3>
                        <p className="settings-card-description">
                            Manage your security and privacy preferences
                        </p>
                    </div>
                    <div className="settings-list">
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
                                    onChange={(e) => handleAutoLogoutChange(e.target.checked)}
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
            </div>
        </div>
    );
};

export default Settings;
