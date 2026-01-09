import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import './Layout.css';

const Layout = () => {
    const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);

    return (
        <div className="layout">
            <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
            <div className={`main-content ${sidebarCollapsed ? 'expanded' : ''}`}>
                <TopBar toggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />
                <div className="page-content">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Layout;
