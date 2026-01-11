import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
    FiArrowLeft, FiEdit, FiTrash2, FiPhone, FiMail, FiMapPin,
    FiCreditCard, FiTruck, FiCalendar, FiActivity, FiAlertCircle,
    FiCheckCircle, FiClock
} from 'react-icons/fi';
import './DriverProfile.css';

const DriverProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Mock driver data - in real app, fetch based on id
    const driver = {
        id: parseInt(id),
        firstName: 'John',
        lastName: 'Doe',
        dateOfBirth: '1985-05-15',
        licenseNumber: 'DL-123456',
        licenseExpiry: '2028-06-30',
        licenseClass: 'B',
        phone: '+94 77 123 4567',
        email: 'john.doe@example.com',
        emergencyContact: 'Jane Doe',
        emergencyPhone: '+94 77 234 5678',
        address: '123 Main Street',
        city: 'Colombo',
        postalCode: '10100',
        status: 'Active',
        assignedVehicle: {
            id: 1,
            regNumber: 'AB-1234',
            make: 'Toyota',
            model: 'Camry',
        },
        stats: {
            totalTrips: 245,
            totalHours: 1240,
            totalDistance: 18500,
            incidents: 2,
        },
        performance: {
            safetyScore: 92,
            efficiency: 88,
            onTimeDelivery: 95,
            customerRating: 4.8,
        },
        recentActivities: [
            {
                id: 1,
                type: 'trip',
                title: 'Completed trip to Kandy',
                time: '2 hours ago',
                icon: FiCheckCircle,
            },
            {
                id: 2,
                type: 'incident',
                title: 'Minor incident reported',
                time: '1 day ago',
                icon: FiAlertCircle,
            },
            {
                id: 3,
                type: 'trip',
                title: 'Completed trip to Galle',
                time: '2 days ago',
                icon: FiCheckCircle,
            },
        ],
    };

    const getInitials = () => {
        return (driver.firstName.charAt(0) + driver.lastName.charAt(0)).toUpperCase();
    };

    const calculateAge = (dob) => {
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    return (
        <div className="driver-profile-page">
            <button onClick={() => navigate('/drivers')} className="back-btn">
                <FiArrowLeft /> Back to Drivers
            </button>

            <div className="profile-header">
                <div className="profile-top">
                    <div className="profile-avatar-large">
                        {getInitials()}
                    </div>

                    <div className="profile-main-info">
                        <h1 className="profile-name">{driver.firstName} {driver.lastName}</h1>

                        <div className="profile-meta">
                            <div className="meta-item">
                                <FiCreditCard />
                                <span>License: {driver.licenseNumber}</span>
                            </div>
                            <div className="meta-item">
                                <FiPhone />
                                <span>{driver.phone}</span>
                            </div>
                            <div className="meta-item">
                                <FiMail />
                                <span>{driver.email}</span>
                            </div>
                            <div className="meta-item">
                                <FiMapPin />
                                <span>{driver.city}</span>
                            </div>
                        </div>

                        <div className="profile-actions">
                            <button className="btn btn-primary">
                                <FiEdit /> Edit Profile
                            </button>
                            <button className="btn btn-secondary">
                                <FiCalendar /> View Schedule
                            </button>
                            <button className="btn btn-danger">
                                <FiTrash2 /> Remove Driver
                            </button>
                        </div>
                    </div>

                    <span className={`badge badge-${driver.status === 'Active' ? 'success' : 'warning'}`}>
                        {driver.status}
                    </span>
                </div>

                <div className="profile-quick-stats">
                    <div className="quick-stat">
                        <span className="quick-stat-value">{driver.stats.totalTrips}</span>
                        <span className="quick-stat-label">Total Trips</span>
                    </div>
                    <div className="quick-stat">
                        <span className="quick-stat-value">{driver.stats.totalHours}h</span>
                        <span className="quick-stat-label">Total Hours</span>
                    </div>
                    <div className="quick-stat">
                        <span className="quick-stat-value">{driver.stats.totalDistance.toLocaleString()} km</span>
                        <span className="quick-stat-label">Total Distance</span>
                    </div>
                    <div className="quick-stat">
                        <span className="quick-stat-value" style={{
                            color: driver.stats.incidents === 0 ? 'var(--accent-green)' :
                                driver.stats.incidents <= 2 ? 'var(--accent-orange)' :
                                    'var(--accent-red)'
                        }}>
                            {driver.stats.incidents}
                        </span>
                        <span className="quick-stat-label">Incidents</span>
                    </div>
                </div>
            </div>

            <div className="profile-content">
                <div className="content-main">
                    {/* Personal Information */}
                    <div className="info-card">
                        <h3 className="info-card-title">
                            <FiCreditCard /> Personal & License Information
                        </h3>
                        <div className="info-grid">
                            <div className="info-item">
                                <span className="info-label">Date of Birth</span>
                                <span className="info-value">
                                    {new Date(driver.dateOfBirth).toLocaleDateString()} ({calculateAge(driver.dateOfBirth)} years)
                                </span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">License Class</span>
                                <span className="info-value">Class {driver.licenseClass}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">License Number</span>
                                <span className="info-value">{driver.licenseNumber}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">License Expiry</span>
                                <span className="info-value">
                                    {new Date(driver.licenseExpiry).toLocaleDateString()}
                                </span>
                            </div>
                            <div className="info-item full-width">
                                <span className="info-label">Address</span>
                                <span className="info-value">
                                    {driver.address}, {driver.city} {driver.postalCode}
                                </span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Emergency Contact</span>
                                <span className="info-value">{driver.emergencyContact}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Emergency Phone</span>
                                <span className="info-value">{driver.emergencyPhone}</span>
                            </div>
                        </div>
                    </div>

                    {/* Performance Metrics */}
                    <div className="info-card">
                        <h3 className="info-card-title">
                            <FiActivity /> Performance Metrics
                        </h3>
                        <div className="performance-grid">
                            <div className="performance-item">
                                <div className="performance-label">Safety Score</div>
                                <div className="performance-value">{driver.performance.safetyScore}%</div>
                                <div className="performance-bar">
                                    <div className="performance-bar-fill" style={{ width: `${driver.performance.safetyScore}%` }}></div>
                                </div>
                            </div>
                            <div className="performance-item">
                                <div className="performance-label">Efficiency</div>
                                <div className="performance-value">{driver.performance.efficiency}%</div>
                                <div className="performance-bar">
                                    <div className="performance-bar-fill" style={{ width: `${driver.performance.efficiency}%` }}></div>
                                </div>
                            </div>
                            <div className="performance-item">
                                <div className="performance-label">On-Time Delivery</div>
                                <div className="performance-value">{driver.performance.onTimeDelivery}%</div>
                                <div className="performance-bar">
                                    <div className="performance-bar-fill" style={{ width: `${driver.performance.onTimeDelivery}%` }}></div>
                                </div>
                            </div>
                            <div className="performance-item">
                                <div className="performance-label">Customer Rating</div>
                                <div className="performance-value">{driver.performance.customerRating}/5.0</div>
                                <div className="performance-bar">
                                    <div className="performance-bar-fill" style={{ width: `${(driver.performance.customerRating / 5) * 100}%` }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="content-sidebar">
                    {/* Assigned Vehicle */}
                    <div className="info-card">
                        <h3 className="info-card-title">
                            <FiTruck /> Assigned Vehicle
                        </h3>
                        {driver.assignedVehicle ? (
                            <Link to={`/vehicles/${driver.assignedVehicle.id}`} className="assigned-vehicle-card">
                                <div className="vehicle-icon">
                                    <FiTruck />
                                </div>
                                <div className="vehicle-details">
                                    <h4 className="vehicle-reg">{driver.assignedVehicle.regNumber}</h4>
                                    <p className="vehicle-model">
                                        {driver.assignedVehicle.make} {driver.assignedVehicle.model}
                                    </p>
                                </div>
                            </Link>
                        ) : (
                            <div className="no-data">
                                <p>No vehicle assigned</p>
                            </div>
                        )}
                    </div>

                    {/* Recent Activities */}
                    <div className="info-card">
                        <h3 className="info-card-title">
                            <FiClock /> Recent Activities
                        </h3>
                        <div className="recent-activities">
                            {driver.recentActivities.map((activity) => (
                                <div key={activity.id} className="activity-item">
                                    <div className="activity-icon">
                                        <activity.icon />
                                    </div>
                                    <div className="activity-details">
                                        <p className="activity-title">{activity.title}</p>
                                        <p className="activity-time">{activity.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DriverProfile;
