import React from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiSearch, FiFilter, FiCalendar, FiTool, FiDollarSign } from 'react-icons/fi';
import './ServiceHistory.css';

const ServiceHistory = () => {
    // Mock service data
    const services = [
        {
            id: 1,
            vehicle: 'AB-1234',
            vehicleName: 'Toyota Camry',
            serviceType: 'Oil Change',
            date: '2024-01-05',
            mileage: 45000,
            cost: 8500,
            technician: 'Auto Care Center',
            status: 'Completed',
            nextService: 50000,
            description: 'Regular oil and filter change'
        },
        {
            id: 2,
            vehicle: 'CD-5678',
            vehicleName: 'Honda Civic',
            serviceType: 'Brake Service',
            date: '2024-01-08',
            mileage: 32000,
            cost: 15000,
            technician: 'Honda Service',
            status: 'Completed',
            nextService: 42000,
            description: 'Front brake pads replacement'
        },
        {
            id: 3,
            vehicle: 'EF-9012',
            vehicleName: 'Nissan Navara',
            serviceType: 'General Maintenance',
            date: '2024-01-15',
            mileage: 78000,
            cost: 25000,
            technician: 'Nissan Workshop',
            status: 'Scheduled',
            nextService: 88000,
            description: 'Complete vehicle inspection and service'
        },
        {
            id: 4,
            vehicle: 'AB-1234',
            vehicleName: 'Toyota Camry',
            serviceType: 'Tire Rotation',
            date: '2023-12-20',
            mileage: 43000,
            cost: 3500,
            technician: 'Quick Service',
            status: 'Completed',
            nextService: 45000,
            description: 'All four tires rotated and balanced'
        },
        {
            id: 5,
            vehicle: 'CD-5678',
            vehicleName: 'Honda Civic',
            serviceType: 'Air Filter Replacement',
            date: '2023-12-15',
            mileage: 30000,
            cost: 2500,
            technician: 'Auto Care Center',
            status: 'Completed',
            nextService: 35000,
            description: 'Engine air filter replaced'
        },
    ];

    // Calculate statistics
    const totalCost = services.reduce((sum, service) => sum + service.cost, 0);
    const completedServices = services.filter(s => s.status === 'Completed').length;
    const scheduledServices = services.filter(s => s.status === 'Scheduled').length;

    return (
        <div className="service-history-page">
            <div className="page-header">
                <div>
                    <h1>Service & Maintenance</h1>
                    <p>Track all service records and schedules</p>
                </div>
                <Link to="/service/add" className="btn btn-primary">
                    <FiPlus /> Add Service Record
                </Link>
            </div>

            {/* Statistics Cards */}
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                        <FiTool />
                    </div>
                    <div className="stat-info">
                        <span className="stat-label">Total Services</span>
                        <span className="stat-value">{services.length}</span>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
                        <FiCalendar />
                    </div>
                    <div className="stat-info">
                        <span className="stat-label">Scheduled</span>
                        <span className="stat-value">{scheduledServices}</span>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
                        <FiDollarSign />
                    </div>
                    <div className="stat-info">
                        <span className="stat-label">Total Cost</span>
                        <span className="stat-value">Rs. {totalCost.toLocaleString()}</span>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="filters-bar">
                <div className="search-box">
                    <FiSearch />
                    <input type="text" placeholder="Search service records..." />
                </div>
                <button className="btn btn-secondary">
                    <FiFilter /> Filters
                </button>
            </div>

            {/* Service Records Grid */}
            <div className="services-grid">
                {services.map((service) => (
                    <div key={service.id} className="service-card">
                        <div className="service-header">
                            <div>
                                <h3>{service.serviceType}</h3>
                                <p className="vehicle-info">
                                    {service.vehicle} - {service.vehicleName}
                                </p>
                            </div>
                            <span className={`badge badge-${service.status === 'Completed' ? 'success' : 'warning'}`}>
                                {service.status}
                            </span>
                        </div>

                        <div className="service-detail">
                            <p className="description">{service.description}</p>
                        </div>

                        <div className="service-stats">
                            <div className="stat">
                                <span className="stat-label">Date</span>
                                <span className="stat-value">{new Date(service.date).toLocaleDateString()}</span>
                            </div>
                            <div className="stat">
                                <span className="stat-label">Mileage</span>
                                <span className="stat-value">{service.mileage.toLocaleString()} km</span>
                            </div>
                            <div className="stat">
                                <span className="stat-label">Cost</span>
                                <span className="stat-value">Rs. {service.cost.toLocaleString()}</span>
                            </div>
                        </div>

                        <div className="service-footer">
                            <span className="technician">🔧 {service.technician}</span>
                            <span className="next-service">Next: {service.nextService.toLocaleString()} km</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ServiceHistory;
