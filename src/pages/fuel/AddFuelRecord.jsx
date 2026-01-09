import React from 'react';
import { useNavigate } from 'react-router-dom';

const AddFuelRecord = () => {
    const navigate = useNavigate();
    return (
        <div className="page-container">
            <h1>Add Fuel Record</h1>
            <div className="card">
                <p>Fuel record form will be displayed here.</p>
                <button onClick={() => navigate('/fuel')} className="btn btn-secondary">Back</button>
            </div>
        </div>
    );
};

export default AddFuelRecord;
