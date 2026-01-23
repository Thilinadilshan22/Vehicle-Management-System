import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import {
    FiUser, FiMail, FiPhone, FiMapPin, FiCalendar, FiEdit,
    FiSettings, FiShield, FiBell, FiClock, FiCheckCircle,
    FiTruck, FiUsers, FiTool, FiDroplet, FiLock, FiKey,
    FiGlobe, FiMoon, FiSun, FiActivity, FiDownload, FiLogOut,
    FiMonitor, FiType
} from 'react-icons/fi';
import './UserProfile.css';

const UserProfile = () => {
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

    const [isEditing, setIsEditing] = React.useState(false);
    const [showNotification, setShowNotification] = React.useState(false);
    const [notificationMessage, setNotificationMessage] = React.useState('');
    const [notificationType, setNotificationType] = React.useState('success');

    // Mock user data - in real app, fetch from auth context or API
    const [userData, setUserData] = React.useState({
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
    });

    const [formData, setFormData] = React.useState({});
    const [errors, setErrors] = React.useState({});

    const getInitials = () => {
        return (userData.firstName.charAt(0) + userData.lastName.charAt(0)).toUpperCase();
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

    const validateForm = () => {
        const newErrors = {};

        // First Name validation
        if (!formData.firstName || formData.firstName.trim() === '') {
            newErrors.firstName = 'First name is required';
        }

        // Last Name validation
        if (!formData.lastName || formData.lastName.trim() === '') {
            newErrors.lastName = 'Last name is required';
        }

        // Email validation
        if (!formData.email || formData.email.trim() === '') {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Phone validation
        if (!formData.phone || formData.phone.trim() === '') {
            newErrors.phone = 'Phone number is required';
        } else if (!/^[+]?[0-9\s-()]+$/.test(formData.phone)) {
            newErrors.phone = 'Please enter a valid phone number';
        }

        // Date of Birth validation
        if (!formData.dateOfBirth || formData.dateOfBirth.trim() === '') {
            newErrors.dateOfBirth = 'Date of birth is required';
        }

        // Address validation
        if (!formData.address || formData.address.trim() === '') {
            newErrors.address = 'Address is required';
        }

        // City validation
        if (!formData.city || formData.city.trim() === '') {
            newErrors.city = 'City is required';
        }

        // Postal Code validation
        if (!formData.postalCode || formData.postalCode.trim() === '') {
            newErrors.postalCode = 'Postal code is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleEdit = () => {
        setFormData({ ...userData });
        setIsEditing(true);
        setErrors({});
    };

    const handleCancel = () => {
        setIsEditing(false);
        setFormData({});
        setErrors({});
    };

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error for this field when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const handleSave = () => {
        if (validateForm()) {
            setUserData({ ...userData, ...formData });
            setIsEditing(false);
            setFormData({});
            setErrors({});

            // Show success notification
            setNotificationType('success');
            setNotificationMessage('Profile updated successfully!');
            setShowNotification(true);

            // Hide notification after 3 seconds
            setTimeout(() => {
                setShowNotification(false);
            }, 3000);
        } else {
            // Show error notification
            setNotificationType('error');
            setNotificationMessage('Please fix the errors before saving.');
            setShowNotification(true);

            setTimeout(() => {
                setShowNotification(false);
            }, 3000);
        }
    };

    // Handle settings changes with localStorage persistence
    const handleSettingChange = (key, value) => {
        localStorage.setItem(`v-mas-${key}`, typeof value === 'boolean' ? JSON.stringify(value) : value);

        // Show notification for settings change
        setNotificationType('success');
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
                        <h1 className="profile-name">{userData.firstName} {userData.lastName}</h1>
                        <p className="profile-role">{userData.role}</p>

                        <div className="profile-meta-info">
                            <div className="meta-item">
                                <FiMail />
                                <span>{userData.email}</span>
                            </div>
                            <div className="meta-item">
                                <FiPhone />
                                <span>{userData.phone}</span>
                            </div>
                            <div className="meta-item">
                                <FiCalendar />
                                <span>Joined {formatDate(userData.joinDate)}</span>
                            </div>
                        </div>

                        <div className="profile-header-actions">
                            <button className="btn btn-primary" onClick={handleEdit}>
                                <FiEdit /> Edit Profile
                            </button>
                            <button className="btn btn-secondary">
                                <FiSettings /> Account Settings
                            </button>
                        </div>
                    </div>

                    <span className={`badge badge-${userData.status === 'Active' ? 'success' : 'warning'}`}>
                        {userData.status}
                    </span>
                </div>

                {/* Quick Stats */}
                <div className="profile-quick-stats">
                    <div className="quick-stat">
                        <div className="quick-stat-icon" style={{ background: 'rgba(59, 130, 246, 0.2)' }}>
                            <FiTruck style={{ color: 'var(--primary-400)' }} />
                        </div>
                        <div className="quick-stat-info">
                            <span className="quick-stat-value">{userData.stats.vehiclesManaged}</span>
                            <span className="quick-stat-label">Vehicles Managed</span>
                        </div>
                    </div>
                    <div className="quick-stat">
                        <div className="quick-stat-icon" style={{ background: 'rgba(139, 92, 246, 0.2)' }}>
                            <FiUsers style={{ color: 'var(--accent-violet)' }} />
                        </div>
                        <div className="quick-stat-info">
                            <span className="quick-stat-value">{userData.stats.activeDrivers}</span>
                            <span className="quick-stat-label">Active Drivers</span>
                        </div>
                    </div>
                    <div className="quick-stat">
                        <div className="quick-stat-icon" style={{ background: 'rgba(245, 158, 11, 0.2)' }}>
                            <FiTool style={{ color: 'var(--accent-orange)' }} />
                        </div>
                        <div className="quick-stat-info">
                            <span className="quick-stat-value">{userData.stats.servicesScheduled}</span>
                            <span className="quick-stat-label">Services Scheduled</span>
                        </div>
                    </div>
                    <div className="quick-stat">
                        <div className="quick-stat-icon" style={{ background: 'rgba(16, 185, 129, 0.2)' }}>
                            <FiDroplet style={{ color: 'var(--accent-green)' }} />
                        </div>
                        <div className="quick-stat-info">
                            <span className="quick-stat-value">{userData.stats.fuelRecords}</span>
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
                            {!isEditing && (
                                <button className="btn-icon" onClick={handleEdit}>
                                    <FiEdit />
                                </button>
                            )}
                        </div>

                        {isEditing ? (
                            <>
                                <div className="info-grid">
                                    <div className="info-item">
                                        <span className="info-label">First Name *</span>
                                        <input
                                            type="text"
                                            className={`form-input ${errors.firstName ? 'input-error' : ''}`}
                                            value={formData.firstName || ''}
                                            onChange={(e) => handleChange('firstName', e.target.value)}
                                            placeholder="Enter first name"
                                        />
                                        {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                                    </div>
                                    <div className="info-item">
                                        <span className="info-label">Last Name *</span>
                                        <input
                                            type="text"
                                            className={`form-input ${errors.lastName ? 'input-error' : ''}`}
                                            value={formData.lastName || ''}
                                            onChange={(e) => handleChange('lastName', e.target.value)}
                                            placeholder="Enter last name"
                                        />
                                        {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                                    </div>
                                    <div className="info-item">
                                        <span className="info-label">Email Address *</span>
                                        <input
                                            type="email"
                                            className={`form-input ${errors.email ? 'input-error' : ''}`}
                                            value={formData.email || ''}
                                            onChange={(e) => handleChange('email', e.target.value)}
                                            placeholder="Enter email address"
                                        />
                                        {errors.email && <span className="error-message">{errors.email}</span>}
                                    </div>
                                    <div className="info-item">
                                        <span className="info-label">Phone Number *</span>
                                        <input
                                            type="tel"
                                            className={`form-input ${errors.phone ? 'input-error' : ''}`}
                                            value={formData.phone || ''}
                                            onChange={(e) => handleChange('phone', e.target.value)}
                                            placeholder="Enter phone number"
                                        />
                                        {errors.phone && <span className="error-message">{errors.phone}</span>}
                                    </div>
                                    <div className="info-item">
                                        <span className="info-label">Date of Birth *</span>
                                        <input
                                            type="date"
                                            className={`form-input ${errors.dateOfBirth ? 'input-error' : ''}`}
                                            value={formData.dateOfBirth || ''}
                                            onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                                        />
                                        {errors.dateOfBirth && <span className="error-message">{errors.dateOfBirth}</span>}
                                    </div>
                                    <div className="info-item">
                                        <span className="info-label">Role</span>
                                        <input
                                            type="text"
                                            className="form-input"
                                            value={userData.role}
                                            disabled
                                            style={{ opacity: 0.6, cursor: 'not-allowed' }}
                                        />
                                    </div>
                                    <div className="info-item">
                                        <span className="info-label">Address *</span>
                                        <input
                                            type="text"
                                            className={`form-input ${errors.address ? 'input-error' : ''}`}
                                            value={formData.address || ''}
                                            onChange={(e) => handleChange('address', e.target.value)}
                                            placeholder="Enter address"
                                        />
                                        {errors.address && <span className="error-message">{errors.address}</span>}
                                    </div>
                                    <div className="info-item">
                                        <span className="info-label">City *</span>
                                        <input
                                            type="text"
                                            className={`form-input ${errors.city ? 'input-error' : ''}`}
                                            value={formData.city || ''}
                                            onChange={(e) => handleChange('city', e.target.value)}
                                            placeholder="Enter city"
                                        />
                                        {errors.city && <span className="error-message">{errors.city}</span>}
                                    </div>
                                    <div className="info-item">
                                        <span className="info-label">Postal Code *</span>
                                        <input
                                            type="text"
                                            className={`form-input ${errors.postalCode ? 'input-error' : ''}`}
                                            value={formData.postalCode || ''}
                                            onChange={(e) => handleChange('postalCode', e.target.value)}
                                            placeholder="Enter postal code"
                                        />
                                        {errors.postalCode && <span className="error-message">{errors.postalCode}</span>}
                                    </div>
                                </div>

                                <div className="form-actions">
                                    <button className="btn btn-secondary" onClick={handleCancel}>
                                        Cancel
                                    </button>
                                    <button className="btn btn-primary" onClick={handleSave}>
                                        Save Changes
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="info-grid">
                                <div className="info-item">
                                    <span className="info-label">First Name</span>
                                    <span className="info-value">{userData.firstName}</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">Last Name</span>
                                    <span className="info-value">{userData.lastName}</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">Email Address</span>
                                    <span className="info-value">{userData.email}</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">Phone Number</span>
                                    <span className="info-value">{userData.phone}</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">Date of Birth</span>
                                    <span className="info-value">{formatDate(userData.dateOfBirth)}</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">Role</span>
                                    <span className="info-value">{userData.role}</span>
                                </div>
                                <div className="info-item full-width">
                                    <span className="info-label">Address</span>
                                    <span className="info-value">
                                        {userData.address}, {userData.city} {userData.postalCode}
                                    </span>
                                </div>
                            </div>
                        )}
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
                                            Last login: {formatDateTime(userData.lastLogin)}
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
                            {userData.recentActivities.map((activity, index) => (
                                <div key={activity.id} className="activity-item">
                                    <div className="activity-icon-wrapper">
                                        <activity.icon className="activity-icon" />
                                        {index !== userData.recentActivities.length - 1 && (
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

            {/* Notification Toast */}
            {showNotification && (
                <div className={`notification notification-${notificationType}`}>
                    {notificationType === 'success' ? <FiCheckCircle /> : <FiShield />}
                    <span>{notificationMessage}</span>
                </div>
            )}
        </div>
    );
};

export default UserProfile;
