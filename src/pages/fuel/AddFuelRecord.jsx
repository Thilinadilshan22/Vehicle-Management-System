import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import './AddFuelRecord.css';

const AddFuelRecord = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        vehicle: '',
        fuelDate: '',
        liters: '',
        pricePerLiter: '',
        mileage: '',
        fuelType: '',
        station: '',
        notes: '',
    });

    // Mock vehicle data matching the FuelAnalysis vehicles
    const vehicles = [
        { id: 1, regNumber: 'AB-1234', name: 'Toyota Camry' },
        { id: 2, regNumber: 'CD-5678', name: 'Honda Civic' },
        { id: 3, regNumber: 'EF-9012', name: 'Nissan Navara' },
    ];

    const fuelTypes = [
        'Petrol 95',
        'Petrol 92',
        'Diesel',
        'Super Diesel',
    ];

    // Calculate total cost automatically
    const totalCost = formData.liters && formData.pricePerLiter
        ? (parseFloat(formData.liters) * parseFloat(formData.pricePerLiter)).toFixed(2)
        : '0.00';

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Fuel record submitted:', {
            ...formData,
            totalCost,
        });
        // Navigate back to fuel analysis page
        navigate('/fuel');
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="add-fuel-page">
            <Link to="/fuel" className="back-btn">
                <FiArrowLeft /> Back to Fuel Analysis
            </Link>

            <div className="form-container">
                <h1>Add Fuel Record</h1>
                <p>Log a new fuel purchase for your vehicle</p>

                <form onSubmit={handleSubmit} className="fuel-form">
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
                            <label className="input-label">Fuel Date *</label>
                            <input
                                type="date"
                                name="fuelDate"
                                className="input"
                                value={formData.fuelDate}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="input-group">
                            <label className="input-label">Liters *</label>
                            <input
                                type="number"
                                step="0.01"
                                name="liters"
                                className="input"
                                placeholder="45.5"
                                value={formData.liters}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label className="input-label">Price per Liter (Rs.) *</label>
                            <input
                                type="number"
                                step="0.01"
                                name="pricePerLiter"
                                className="input"
                                placeholder="230"
                                value={formData.pricePerLiter}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="input-group">
                            <label className="input-label">Total Cost (Rs.)</label>
                            <input
                                type="text"
                                className="input input-readonly"
                                value={`Rs. ${parseFloat(totalCost).toLocaleString()}`}
                                readOnly
                            />
                        </div>

                        <div className="input-group">
                            <label className="input-label">Current Mileage (km) *</label>
                            <input
                                type="number"
                                name="mileage"
                                className="input"
                                placeholder="45200"
                                value={formData.mileage}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="input-group">
                            <label className="input-label">Fuel Type *</label>
                            <select
                                name="fuelType"
                                className="input"
                                value={formData.fuelType}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select fuel type</option>
                                {fuelTypes.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="input-group">
                            <label className="input-label">Fuel Station</label>
                            <input
                                type="text"
                                name="station"
                                className="input"
                                placeholder="Lanka IOC, Caltex, Shell..."
                                value={formData.station}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="input-group full-width">
                            <label className="input-label">Notes</label>
                            <textarea
                                name="notes"
                                className="input textarea"
                                placeholder="Add any additional notes about this fuel purchase..."
                                value={formData.notes}
                                onChange={handleChange}
                                rows="4"
                            />
                        </div>
                    </div>

                    <div className="form-actions">
                        <button type="button" onClick={() => navigate('/fuel')} className="btn btn-secondary">
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                            Add Fuel Record
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddFuelRecord;
