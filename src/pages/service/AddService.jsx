import React from 'react';
import { useNavigate } from 'react-router-dom';

const AddService = () => {
    const navigate = useNavigate();
    return (
        <div className="page-container">
            <h1>Add Service Record</h1>
            <div className="card">
                <p>Service logging form will be displayed here.</p>
                <button onClick={() => navigate('/service')} className="btn btn-secondary">Back</button>
            </div>
        </div>
    );
};

export default AddService;
