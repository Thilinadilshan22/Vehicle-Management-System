import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    FiHome, FiTruck, FiTool, FiUsers, FiDroplet,
    FiFileText, FiMenu, FiX
} from 'react-icons/fi';
import './Sidebar.css';

const Sidebar = ({ collapsed, setCollapsed }) => {
    const menuItems = [
        { icon: FiHome, label: 'Dashboard', path: '/' },
        { icon: FiTruck, label: 'Vehicles', path: '/vehicles' },
        { icon: FiTool, label: 'Service', path: '/service' },
        { icon: FiUsers, label: 'Drivers', path: '/drivers' },
        { icon: FiDroplet, label: 'Fuel Analysis', path: '/fuel' },
        { icon: FiFileText, label: 'Reports', path: '/reports' },
    ];

    return (
        <>
            <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
                <div className="sidebar-header">
                    <div className="logo">
                        <div className="logo-icon">
                            <FiTruck />
                        </div>
                        {!collapsed && (
                            <div className="logo-text">
                                <h2>V-Mas</h2>
                                <p>Fleet Control</p>
                            </div>
                        )}
                    </div>
                </div>

                <nav className="sidebar-nav">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                                title={collapsed ? item.label : ''}
                            >
                                <Icon className="nav-icon" />
                                {!collapsed && <span className="nav-label">{item.label}</span>}
                            </NavLink>
                        );
                    })}
                </nav>

                <div className="sidebar-footer">
                    <button
                        className="collapse-btn"
                        onClick={() => setCollapsed(!collapsed)}
                        title={collapsed ? 'Expand' : 'Collapse'}
                    >
                        {collapsed ? <FiMenu /> : <FiX />}
                    </button>
                </div>
            </aside>

            {/* Mobile overlay */}
            <div
                className={`sidebar-overlay ${!collapsed ? 'active' : ''}`}
                onClick={() => setCollapsed(true)}
            />
        </>
    );
};

export default Sidebar;
