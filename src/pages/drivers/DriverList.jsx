import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiSearch, FiFilter, FiPhone, FiMail, FiTruck } from 'react-icons/fi';
import './DriverList.css';

const DriverList = () => {
    const [searchTerm, setSearchTerm] = useState('');

    // Mock driver data
    const drivers = [
        {
            id: 1,
            name: 'John Doe',
            licenseNumber: 'DL-123456',
            phone: '+94 77 123 4567',
            email: 'john.doe@example.com',
            status: 'Active',
            assignedVehicle: 'AB-1234',
            totalTrips: 245,
            totalHours: 1240,
            incidents: 2,
        },
        {
            id: 2,
            name: 'Sarah Smith',
            licenseNumber: 'DL-234567',
            phone: '+94 77 234 5678',
            email: 'sarah.smith@example.com',
            status: 'Active',
            assignedVehicle: 'CD-5678',
            totalTrips: 189,
            totalHours: 950,
            incidents: 0,
        },
        {
            id: 3,
            name: 'Mike Johnson',
            licenseNumber: 'DL-345678',
            phone: '+94 77 345 6789',
            email: 'mike.j@example.com',
            status: 'Active',
            assignedVehicle: 'EF-9012',
            totalTrips: 312,
            totalHours: 1580,
            incidents: 1,
        },
        {
            id: 4,
            name: 'Emily Davis',
            licenseNumber: 'DL-456789',
            phone: '+94 77 456 7890',
            email: 'emily.davis@example.com',
            status: 'On Leave',
            assignedVehicle: null,
            totalTrips: 156,
            totalHours: 780,
            incidents: 0,
        },
        {
            id: 5,
            name: 'Robert Wilson',
            licenseNumber: 'DL-567890',
            phone: '+94 77 567 8901',
            email: 'robert.w@example.com',
            status: 'Active',
            assignedVehicle: 'GH-3456',
            totalTrips: 278,
            totalHours: 1390,
            incidents: 3,
        },
    ];

    const filteredDrivers = drivers.filter(driver =>
        driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        driver.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        driver.assignedVehicle?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getInitials = (name) => {
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase();
    };

    return (
        <div className="driver-list-page">
            <div className="page-header">
                <div>
                    <h1>Drivers</h1>
                    <p>Manage your fleet drivers</p>
                </div>
                <Link to="/drivers/add" className="btn btn-primary">
                    <FiPlus /> Add Driver
                </Link>
            </div>

            <div className="filters-bar">
                <div className="search-box">
                    <FiSearch />
                    <input
                        type="text"
                        placeholder="Search drivers..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button className="btn btn-secondary">
                    <FiFilter /> Filters
                </button>
            </div>

            <div className="drivers-grid">
                {filteredDrivers.map((driver) => (
                    <Link
                        key={driver.id}
                        to={`/drivers/${driver.id}`}
                        className="driver-card"
                    >
                        <div className="driver-header">
                            <div className="driver-avatar">
                                {getInitials(driver.name)}
                            </div>
                            <div className="driver-info">
                                <h3>{driver.name}</h3>
                                <p className="driver-license">License: {driver.licenseNumber}</p>
                                <div className="driver-contact">
                                    <FiPhone /> {driver.phone}
                                </div>
                            </div>
                            <span className={`badge badge-${driver.status === 'Active' ? 'success' : 'warning'}`}>
                                {driver.status}
                            </span>
                        </div>

                        <div className="driver-stats">
                            <div className="stat">
                                <span className="stat-label">Total Trips</span>
                                <span className="stat-value">{driver.totalTrips}</span>
                            </div>
                            <div className="stat">
                                <span className="stat-label">Total Hours</span>
                                <span className="stat-value">{driver.totalHours}h</span>
                            </div>
                            <div className="stat">
                                <span className="stat-label">Incidents</span>
                                <span className="stat-value" style={{
                                    color: driver.incidents === 0 ? 'var(--accent-green)' :
                                        driver.incidents <= 2 ? 'var(--accent-orange)' :
                                            'var(--accent-red)'
                                }}>
                                    {driver.incidents}
                                </span>
                            </div>
                        </div>

                        <div className="driver-footer">
                            {driver.assignedVehicle ? (
                                <div className="assigned-vehicle">
                                    <FiTruck /> {driver.assignedVehicle}
                                </div>
                            ) : (
                                <span style={{ color: 'var(--gray-500)', fontSize: '0.875rem' }}>
                                    No vehicle assigned
                                </span>
                            )}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default DriverList;
