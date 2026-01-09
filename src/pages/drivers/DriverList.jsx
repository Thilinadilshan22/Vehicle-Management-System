import React from 'react';
import { Link } from 'react-router-dom';

const DriverList = () => {
    return (
        <div className="page-container">
            <div className="page-header">
                <h1>Drivers</h1>
                <p>Manage your fleet drivers</p>
                <Link to="/drivers/add" className="btn btn-primary">Add Driver</Link>
            </div>
            <div className="card">
                <p>Driver list will be displayed here.</p>
            </div>
        </div>
    );
};

export default DriverList;
