import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import './AddService.css';

const AddService = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = React.useState({
        vehicle: '',
        serviceType: '',
        serviceDate: '',
        mileage: '',
        cost: '',
        technician: '',
        description: '',
        nextServiceMileage: '',
    });

    const serviceTypes = [
        'Oil Change',
        'Brake Service',
        'Tire Rotation',
        'General Maintenance',
        'Engine Repair',
        'Transmission Service',
        'Battery Replacement',
        'Air Filter Replacement',
        'Wheel Alignment',
        'Other',
    ];

    // Mock vehicle data for dropdown
    const vehicles = [
        { id: 1, regNumber: 'AB-1234', name: 'Toyota Camry' },
        { id: 2, regNumber: 'CD-5678', name: 'Honda Civic' },
        { id: 3, regNumber: 'EF-9012', name: 'Nissan Navara' },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Service record submitted:', formData);
        navigate('/service');
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="add-service-page">
            <Link to="/service" className="back-btn">
                <FiArrowLeft /> Back to Service History
            </Link>

            <div className="form-container">
                <h1>Add Service Record</h1>
                <p>Log a new service or maintenance record</p>

                <form onSubmit={handleSubmit} className="service-form">
                    <div className="form-row">
                        <div className="input-group">
                            <label className="input-label">Vehicle *</label>
                            <select
                                name="vehicle"
                                className="input"
                                value={formData.vehicle}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select a vehicle</option>
                                {vehicles.map((vehicle) => (
                                    <option key={vehicle.id} value={vehicle.regNumber}>
                                        {vehicle.regNumber} - {vehicle.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="input-group">
                            <label className="input-label">Service Type *</label>
                            <select
                                name="serviceType"
                                className="input"
                                value={formData.serviceType}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select service type</option>
                                {serviceTypes.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="input-group">
                            <label className="input-label">Service Date *</label>
                            <input
                                type="date"
                                name="serviceDate"
                                className="input"
                                value={formData.serviceDate}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label className="input-label">Current Mileage (km) *</label>
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

                    <div className="form-row">
                        <div className="input-group">
                            <label className="input-label">Service Cost (Rs.) *</label>
                            <input
                                type="number"
                                name="cost"
                                className="input"
                                placeholder="8500"
                                value={formData.cost}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label className="input-label">Technician/Workshop *</label>
                            <input
                                type="text"
                                name="technician"
                                className="input"
                                placeholder="Auto Care Center"
                                value={formData.technician}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="input-group full-width">
                            <label className="input-label">Next Service Due (km)</label>
                            <input
                                type="number"
                                name="nextServiceMileage"
                                className="input"
                                placeholder="50000"
                                value={formData.nextServiceMileage}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="input-group full-width">
                            <label className="input-label">Description/Notes</label>
                            <textarea
                                name="description"
                                className="input textarea"
                                placeholder="Add any additional notes about the service..."
                                value={formData.description}
                                onChange={handleChange}
                                rows="4"
                            />
                        </div>
                    </div>

                    <div className="form-actions">
                        <button type="button" onClick={() => navigate('/service')} className="btn btn-secondary">
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                            Add Service Record
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddService;
