import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

const AddVehicle = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = React.useState({
        regNumber: '',
        chassisNumber: '',
        make: '',
        model: '',
        year: '',
        mileage: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        navigate('/vehicles');
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="add-vehicle-page">
            <Link to="/vehicles" className="back-btn">
                <FiArrowLeft /> Back to Vehicles
            </Link>

            <div className="form-container">
                <h1>Add New Vehicle</h1>
                <p>Register a new vehicle to your fleet</p>

                <form onSubmit={handleSubmit} className="vehicle-form">
                    <div className="form-row">
                        <div className="input-group">
                            <label className="input-label">Registration Number *</label>
                            <input
                                type="text"
                                name="regNumber"
                                className="input"
                                placeholder="AB-1234"
                                value={formData.regNumber}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label className="input-label">Chassis Number *</label>
                            <input
                                type="text"
                                name="chassisNumber"
                                className="input"
                                placeholder="JT2BG22K0X0123456"
                                value={formData.chassisNumber}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="input-group">
                            <label className="input-label">Make *</label>
                            <input
                                type="text"
                                name="make"
                                className="input"
                                placeholder="Toyota"
                                value={formData.make}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label className="input-label">Model *</label>
                            <input
                                type="text"
                                name="model"
                                className="input"
                                placeholder="Camry"
                                value={formData.model}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="input-group">
                            <label className="input-label">Year *</label>
                            <input
                                type="number"
                                name="year"
                                className="input"
                                placeholder="2020"
                                value={formData.year}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label className="input-label">Initial Mileage (km) *</label>
                            <input
                                type="number"
                                name="mileage"
                                className="input"
                                placeholder="45000"
                                value={formData.mileage}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-actions">
                        <button type="button" onClick={() => navigate('/vehicles')} className="btn btn-secondary">
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                            Add Vehicle
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddVehicle;
