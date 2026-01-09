import React from 'react';
import { Link } from 'react-router-dom';
import {
    FiTruck, FiActivity, FiAlertCircle, FiDollarSign,
    FiTrendingUp, FiTrendingDown, FiPlus, FiArrowRight
} from 'react-icons/fi';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import './Dashboard.css';

const Dashboard = () => {
    // Mock data
    const stats = [
        {
            title: 'Total Vehicles',
            value: '24',
            change: '+2',
            trend: 'up',
            icon: FiTruck,
            color: 'blue',
        },
        {
            title: 'Active Services',
            value: '7',
            change: '-3',
            trend: 'down',
            icon: FiActivity,
            color: 'green',
        },
        {
            title: 'Pending Alerts',
            value: '5',
            change: '+1',
            trend: 'up',
            icon: FiAlertCircle,
            color: 'orange',
        },
        {
            title: 'Monthly Cost',
            value: 'LKR 125K',
            change: '+12%',
            trend: 'up',
            icon: FiDollarSign,
            color: 'purple',
        },
    ];

    const alerts = [
        {
            type: 'service',
            priority: 'high',
            title: 'Service Due Soon',
            description: 'Toyota Camry (AB-1234) needs service in 200 km',
            time: '2 hours ago',
        },
        {
            type: 'document',
            priority: 'medium',
            title: 'Insurance Expiring',
            description: 'Honda Civic (CD-5678) insurance expires in 15 days',
            time: '5 hours ago',
        },
        {
            type: 'fuel',
            priority: 'low',
            title: 'Low Fuel Efficiency',
            description: 'Nissan Navara (EF-9012) showing 20% decrease in efficiency',
            time: '1 day ago',
        },
    ];

    const fuelData = [
        { month: 'Jan', cost: 45000 },
        { month: 'Feb', cost: 52000 },
        { month: 'Mar', cost: 48000 },
        { month: 'Apr', cost: 55000 },
        { month: 'May', cost: 51000 },
        { month: 'Jun', cost: 58000 },
    ];

    const vehicleStatus = [
        { name: 'Active', value: 18, color: '#10b981' },
        { name: 'In Service', value: 4, color: '#f59e0b' },
        { name: 'Idle', value: 2, color: '#6b7280' },
    ];

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <div>
                    <h1>Dashboard</h1>
                    <p>Welcome back! Here's what's happening with your fleet.</p>
                </div>
                <div className="header-actions">
                    <Link to="/vehicles/add" className="btn btn-primary">
                        <FiPlus /> Add Vehicle
                    </Link>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="stats-grid">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    const TrendIcon = stat.trend === 'up' ? FiTrendingUp : FiTrendingDown;

                    return (
                        <div key={index} className={`stat-card ${stat.color}`}>
                            <div className="stat-icon">
                                <Icon />
                            </div>
                            <div className="stat-content">
                                <p className="stat-label">{stat.title}</p>
                                <h3 className="stat-value">{stat.value}</h3>
                                <div className={`stat-change ${stat.trend}`}>
                                    <TrendIcon />
                                    <span>{stat.change}</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="dashboard-grid">
                {/* Charts */}
                <div className="dashboard-card">
                    <div className="card-header">
                        <h3>Fuel Cost Trend</h3>
                        <p>Last 6 months</p>
                    </div>
                    <div className="chart-container">
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={fuelData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#2a3447" />
                                <XAxis dataKey="month" stroke="#6b7280" />
                                <YAxis stroke="#6b7280" />
                                <Tooltip
                                    contentStyle={{
                                        background: '#131829',
                                        border: '1px solid #2a3447',
                                        borderRadius: '8px'
                                    }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="cost"
                                    stroke="#3b82f6"
                                    strokeWidth={3}
                                    dot={{ fill: '#3b82f6', r: 5 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="dashboard-card">
                    <div className="card-header">
                        <h3>Vehicle Status</h3>
                        <p>Current distribution</p>
                    </div>
                    <div className="chart-container">
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={vehicleStatus}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {vehicleStatus.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        background: '#131829',
                                        border: '1px solid #2a3447',
                                        borderRadius: '8px'
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Alerts */}
                <div className="dashboard-card alerts-card">
                    <div className="card-header">
                        <h3>Recent Alerts</h3>
                        <Link to="/service" className="view-all">
                            View All <FiArrowRight />
                        </Link>
                    </div>
                    <div className="alerts-list">
                        {alerts.map((alert, index) => (
                            <div key={index} className={`alert-item priority-${alert.priority}`}>
                                <div className="alert-indicator" />
                                <div className="alert-content">
                                    <h4>{alert.title}</h4>
                                    <p>{alert.description}</p>
                                    <span className="alert-time">{alert.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="dashboard-card">
                    <div className="card-header">
                        <h3>Quick Actions</h3>
                    </div>
                    <div className="quick-actions">
                        <Link to="/service/add" className="action-btn">
                            <FiActivity />
                            <span>Log Service</span>
                        </Link>
                        <Link to="/fuel/add" className="action-btn">
                            <FiDollarSign />
                            <span>Add Fuel Record</span>
                        </Link>
                        <Link to="/drivers/add" className="action-btn">
                            <FiPlus />
                            <span>Add Driver</span>
                        </Link>
                        <Link to="/reports" className="action-btn">
                            <FiTrendingUp />
                            <span>View Reports</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
