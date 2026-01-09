import React from 'react';
import { Link } from 'react-router-dom';

const ServiceHistory = () => {
    return (
        <div className="page-container">
            <div className="page-header">
                <h1>Service & Maintenance</h1>
                <p>Track all service records and schedules</p>
                <Link to="/service/add" className="btn btn-primary">Add Service Record</Link>
            </div>
            <div className="card">
                <p>Service history and maintenance tracking will be displayed here.</p>
            </div>
        </div>
    );
};

export default ServiceHistory;
