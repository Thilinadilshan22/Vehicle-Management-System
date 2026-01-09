import React from 'react';
import { useNavigate } from 'react-router-dom';

const AddDriver = () => {
    const navigate = useNavigate();
    return (
        <div className="page-container">
            <h1>Add Driver</h1>
            <div className="card">
                <p>Driver registration form will be displayed here.</p>
                <button onClick={() => navigate('/drivers')} className="btn btn-secondary">Back</button>
            </div>
        </div>
    );
};

export default AddDriver;
