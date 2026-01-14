import React, { useState } from 'react';
import {
    FiDownload,
    FiPrinter,
    FiCalendar,
    FiTrendingUp,
    FiTruck,
    FiUsers,
    FiDroplet,
    FiTool,
    FiDollarSign,
    FiBarChart2,
    FiPieChart,
    FiFileText,
    FiFilter,
    FiCheckCircle
} from 'react-icons/fi';
import './Reports.css';

const Reports = () => {
    const [selectedReport, setSelectedReport] = useState('overview');
    const [dateRange, setDateRange] = useState('month');
    const [selectedVehicle, setSelectedVehicle] = useState('all');

    // Mock data for reports
    const reportTypes = [
        {
            id: 'overview',
            name: 'Overview Report',
            icon: FiBarChart2,
            description: 'Complete system overview with all metrics',
            gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        },
        {
            id: 'vehicle',
            name: 'Vehicle Report',
            icon: FiTruck,
            description: 'Vehicle performance and maintenance status',
            gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
        },
        {
            id: 'fuel',
            name: 'Fuel Report',
            icon: FiDroplet,
            description: 'Fuel consumption and cost analysis',
            gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
        },
        {
            id: 'service',
            name: 'Service Report',
            icon: FiTool,
            description: 'Maintenance and service history',
            gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
        },
        {
            id: 'driver',
            name: 'Driver Report',
            icon: FiUsers,
            description: 'Driver performance and activity',
            gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
        },
        {
            id: 'financial',
            name: 'Financial Report',
            icon: FiDollarSign,
            description: 'Cost breakdown and budget analysis',
            gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)'
        }
    ];

    // Summary statistics
    const summaryStats = [
        {
            label: 'Total Vehicles',
            value: '24',
            change: '+2 this month',
            trend: 'up',
            icon: FiTruck,
            color: '#667eea'
        },
        {
            label: 'Active Drivers',
            value: '18',
            change: '100% operational',
            trend: 'neutral',
            icon: FiUsers,
            color: '#f093fb'
        },
        {
            label: 'Total Expenses',
            value: 'Rs. 284,500',
            change: '+12% from last month',
            trend: 'up',
            icon: FiDollarSign,
            color: '#4facfe'
        },
        {
            label: 'Fuel Efficiency',
            value: '12.8 km/L',
            change: '+0.5 km/L improvement',
            trend: 'up',
            icon: FiTrendingUp,
            color: '#43e97b'
        }
    ];

    // Recent activities
    const recentActivities = [
        {
            id: 1,
            type: 'service',
            vehicle: 'AB-1234',
            description: 'Oil change completed',
            date: '2024-01-15',
            status: 'completed',
            cost: 'Rs. 8,500'
        },
        {
            id: 2,
            type: 'fuel',
            vehicle: 'CD-5678',
            description: 'Fuel refill - 45.5L',
            date: '2024-01-15',
            status: 'completed',
            cost: 'Rs. 10,465'
        },
        {
            id: 3,
            type: 'service',
            vehicle: 'EF-9012',
            description: 'Tire replacement',
            date: '2024-01-14',
            status: 'completed',
            cost: 'Rs. 35,000'
        },
        {
            id: 4,
            type: 'inspection',
            vehicle: 'GH-3456',
            description: 'Annual inspection due',
            date: '2024-01-20',
            status: 'pending',
            cost: 'Rs. 12,000'
        }
    ];

    // Top performing vehicles
    const topVehicles = [
        {
            id: 1,
            vehicle: 'AB-1234',
            model: 'Toyota Camry',
            efficiency: 13.5,
            uptime: 98,
            trips: 145
        },
        {
            id: 2,
            vehicle: 'CD-5678',
            model: 'Honda Civic',
            efficiency: 15.2,
            uptime: 96,
            trips: 132
        },
        {
            id: 3,
            vehicle: 'EF-9012',
            model: 'Nissan Navara',
            efficiency: 9.8,
            uptime: 94,
            trips: 98
        }
    ];

    // Cost breakdown data
    const costBreakdown = [
        { category: 'Fuel', amount: 185600, percentage: 65, color: '#667eea' },
        { category: 'Maintenance', amount: 68400, percentage: 24, color: '#f093fb' },
        { category: 'Insurance', amount: 20500, percentage: 7, color: '#4facfe' },
        { category: 'Other', amount: 10000, percentage: 4, color: '#43e97b' }
    ];

    const handleExportReport = () => {
        console.log('Exporting report...');
        // Export functionality would go here
    };

    const handlePrintReport = () => {
        window.print();
    };

    const getActivityIcon = (type) => {
        switch (type) {
            case 'service': return <FiTool />;
            case 'fuel': return <FiDroplet />;
            case 'inspection': return <FiFileText />;
            default: return <FiCheckCircle />;
        }
    };

    return (
        <div className="reports-page">
            {/* Page Header */}
            <div className="page-header">
                <div>
                    <h1>Reports & Analytics</h1>
                    <p>Comprehensive insights and performance metrics</p>
                </div>
                <div className="header-actions">
                    <div className="date-range-selector">
                        <FiCalendar />
                        <select
                            value={dateRange}
                            onChange={(e) => setDateRange(e.target.value)}
                            className="input"
                        >
                            <option value="week">Last 7 Days</option>
                            <option value="month">Last 30 Days</option>
                            <option value="quarter">Last Quarter</option>
                            <option value="year">Last Year</option>
                            <option value="custom">Custom Range</option>
                        </select>
                    </div>
                    <button className="btn btn-secondary" onClick={handlePrintReport}>
                        <FiPrinter /> Print
                    </button>
                    <button className="btn btn-primary" onClick={handleExportReport}>
                        <FiDownload /> Export PDF
                    </button>
                </div>
            </div>

            {/* Summary Statistics */}
            <div className="summary-stats">
                {summaryStats.map((stat, index) => (
                    <div key={index} className="summary-card">
                        <div className="summary-icon" style={{ background: stat.color }}>
                            <stat.icon />
                        </div>
                        <div className="summary-content">
                            <span className="summary-label">{stat.label}</span>
                            <span className="summary-value">{stat.value}</span>
                            <span className={`summary-change ${stat.trend}`}>
                                {stat.change}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Report Type Selector */}
            <div className="report-types-section">
                <h2>Report Categories</h2>
                <div className="report-types-grid">
                    {reportTypes.map((type) => (
                        <div
                            key={type.id}
                            className={`report-type-card ${selectedReport === type.id ? 'active' : ''}`}
                            onClick={() => setSelectedReport(type.id)}
                        >
                            <div className="report-type-icon" style={{ background: type.gradient }}>
                                <type.icon />
                            </div>
                            <div className="report-type-info">
                                <h3>{type.name}</h3>
                                <p>{type.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Content Area */}
            <div className="reports-content">
                {/* Charts Section */}
                <div className="charts-row">
                    {/* Cost Breakdown Chart */}
                    <div className="chart-card">
                        <div className="chart-header">
                            <h3>Cost Breakdown</h3>
                            <FiPieChart />
                        </div>
                        <div className="pie-chart-container">
                            <div className="pie-chart">
                                {costBreakdown.map((item, index) => {
                                    const rotation = costBreakdown
                                        .slice(0, index)
                                        .reduce((acc, curr) => acc + (curr.percentage * 3.6), 0);
                                    return (
                                        <div
                                            key={index}
                                            className="pie-slice"
                                            style={{
                                                background: `conic-gradient(${item.color} 0deg ${item.percentage * 3.6}deg, transparent ${item.percentage * 3.6}deg 360deg)`,
                                                transform: `rotate(${rotation}deg)`
                                            }}
                                        />
                                    );
                                })}
                                <div className="pie-center">
                                    <span className="pie-total">Rs. 284.5k</span>
                                    <span className="pie-label">Total</span>
                                </div>
                            </div>
                            <div className="chart-legend">
                                {costBreakdown.map((item, index) => (
                                    <div key={index} className="legend-item">
                                        <span className="legend-color" style={{ background: item.color }}></span>
                                        <span className="legend-name">{item.category}</span>
                                        <span className="legend-value">Rs. {(item.amount / 1000).toFixed(1)}k ({item.percentage}%)</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Top Performing Vehicles */}
                    <div className="chart-card">
                        <div className="chart-header">
                            <h3>Top Performing Vehicles</h3>
                            <FiTrendingUp />
                        </div>
                        <div className="top-vehicles-list">
                            {topVehicles.map((vehicle, index) => (
                                <div key={vehicle.id} className="vehicle-performance-item">
                                    <div className="vehicle-rank">#{index + 1}</div>
                                    <div className="vehicle-info-section">
                                        <span className="vehicle-number">{vehicle.vehicle}</span>
                                        <span className="vehicle-model">{vehicle.model}</span>
                                    </div>
                                    <div className="vehicle-metrics">
                                        <div className="metric">
                                            <span className="metric-label">Efficiency</span>
                                            <span className="metric-value">{vehicle.efficiency} km/L</span>
                                        </div>
                                        <div className="metric">
                                            <span className="metric-label">Uptime</span>
                                            <span className="metric-value">{vehicle.uptime}%</span>
                                        </div>
                                        <div className="metric">
                                            <span className="metric-label">Trips</span>
                                            <span className="metric-value">{vehicle.trips}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Recent Activities */}
                <div className="activities-section">
                    <div className="section-header">
                        <h3>Recent Activities</h3>
                        <button className="btn btn-secondary">
                            <FiFilter /> Filter
                        </button>
                    </div>
                    <div className="activities-list">
                        {recentActivities.map((activity) => (
                            <div key={activity.id} className="activity-item">
                                <div className={`activity-icon ${activity.type}`}>
                                    {getActivityIcon(activity.type)}
                                </div>
                                <div className="activity-details">
                                    <div className="activity-main">
                                        <span className="activity-vehicle">{activity.vehicle}</span>
                                        <span className="activity-description">{activity.description}</span>
                                    </div>
                                    <span className="activity-date">{new Date(activity.date).toLocaleDateString()}</span>
                                </div>
                                <div className="activity-meta">
                                    <span className={`activity-status badge badge-${activity.status === 'completed' ? 'success' : 'warning'}`}>
                                        {activity.status}
                                    </span>
                                    <span className="activity-cost">{activity.cost}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reports;
