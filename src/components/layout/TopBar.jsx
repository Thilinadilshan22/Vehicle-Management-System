import React from 'react';
import { FiBell, FiSearch, FiMenu, FiUser, FiSettings, FiLogOut } from 'react-icons/fi';
import './TopBar.css';

const TopBar = ({ toggleSidebar }) => {
    const [showProfileMenu, setShowProfileMenu] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState('');

    return (
        <header className="topbar">
            <div className="topbar-left">
                <button className="menu-btn" onClick={toggleSidebar}>
                    <FiMenu />
                </button>

                <div className="search-bar">
                    <FiSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search vehicles, drivers, services..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                    />
                </div>
            </div>

            <div className="topbar-right">
                <button className="icon-btn" title="Notifications">
                    <FiBell />
                    <span className="notification-badge">3</span>
                </button>

                <div className="user-menu">
                    <button
                        className="user-btn"
                        onClick={() => setShowProfileMenu(!showProfileMenu)}
                    >
                        <div className="user-avatar">
                            <FiUser />
                        </div>
                        <div className="user-info">
                            <span className="user-name">Admin User</span>
                            <span className="user-role">System Controller</span>
                        </div>
                    </button>

                    {showProfileMenu && (
                        <div className="dropdown-menu">
                            <button className="dropdown-item">
                                <FiUser /> Profile
                            </button>
                            <button className="dropdown-item">
                                <FiSettings /> Settings
                            </button>
                            <div className="dropdown-divider" />
                            <button className="dropdown-item danger">
                                <FiLogOut /> Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default TopBar;
