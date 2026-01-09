import React from 'react';
import { useParams } from 'react-router-dom';

const DriverProfile = () => {
    const { id } = useParams();
    return (
        <div className="page-container">
            <h1>Driver Profile</h1>
            <div className="card">
                <p>Driver details for ID: {id}</p>
            </div>
        </div>
    );
};

export default DriverProfile;
