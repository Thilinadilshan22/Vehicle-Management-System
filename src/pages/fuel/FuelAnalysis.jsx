import React from 'react';
import { Link } from 'react-router-dom';

const FuelAnalysis = () => {
    return (
        <div className="page-container">
            <div className="page-header">
                <h1>Fuel Analysis</h1>
                <p>Monitor fuel consumption and efficiency</p>
                <Link to="/fuel/add" className="btn btn-primary">Add Fuel Record</Link>
            </div>
            <div className="card">
                <p>Fuel analysis charts and records will be displayed here.</p>
            </div>
        </div>
    );
};

export default FuelAnalysis;
