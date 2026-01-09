import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiEdit, FiTrash2, FiDownload } from 'react-icons/fi';
import './VehicleDetails.css';

const VehicleDetails = () => {
    const { id } = useParams();

    const vehicle = {
        regNumber: 'AB-1234',
        chassisNumber: 'JT2BG22K0X0123456',
        make: 'Toyota',
        model: 'Camry',
        year: 2020,
        mileage: 45000,
        status: 'Active',
        driver: 'John Doe',
        nextService: 50000,
        fuelEfficiency: 12.5,
        insurance: { number: 'INS-12345', expiry: '2026-05-15' },
        license: { number: 'LIC-54321', expiry: '2026-03-20' },
    };

    const serviceHistory = [
        { date: '2025-11-15', type: 'Regular Service', cost: 'LKR 15,000', garage: 'Auto Care Center' },
        { date: '2025-08-10', type: 'Oil Change', cost: 'LKR 5,000', garage: 'Quick Service' },
        { date: '2025-05-20', type: 'Brake Repair', cost: 'LKR 25,000', garage: 'Expert Mechanics' },
    ];

    return (
        <div className="vehicle-details-page">
            <Link to="/vehicles" className="back-btn">
                <FiArrowLeft /> Back to Vehicles
            </Link>

            <div className="details-header">
                <div>
                    <h1>{vehicle.regNumber}</h1>
                    <p>{vehicle.make} {vehicle.model} ({vehicle.year})</p>
                </div>
                <div className="actions">
                    <button className="btn btn-secondary">
                        <FiEdit /> Edit
                    </button>
                    <button className="btn btn-danger">
                        <FiTrash2 /> Delete
                    </button>
                </div>
            </div>

            <div className="details-grid">
                <div className="info-card">
                    <h3>Vehicle Information</h3>
                    <div className="info-grid">
                        <div className="info-item">
                            <span>Chassis Number</span>
                            <strong>{vehicle.chassisNumber}</strong>
                        </div>
                        <div className="info-item">
                            <span>Current Mileage</span>
                            <strong>{vehicle.mileage.toLocaleString()} km</strong>
                        </div>
                        <div className="info-item">
                            <span>Status</span>
                            <strong><span className="badge badge-success">{vehicle.status}</span></strong>
                        </div>
                        <div className="info-item">
                            <span>Assigned Driver</span>
                            <strong>{vehicle.driver}</strong>
                        </div>
                    </div>
                </div>

                <div className="info-card">
                    <h3>Documents</h3>
                    <div className="document-list">
                        <div className="document-item">
                            <div>
                                <h4>Insurance</h4>
                                <p>{vehicle.insurance.number}</p>
                            </div>
                            <span className="expiry">Exp: {vehicle.insurance.expiry}</span>
                        </div>
                        <div className="document-item">
                            <div>
                                <h4>Revenue License</h4>
                                <p>{vehicle.license.number}</p>
                            </div>
                            <span className="expiry">Exp: {vehicle.license.expiry}</span>
                        </div>
                    </div>
                </div>

                <div className="info-card full-width">
                    <h3>Service History</h3>
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Service Type</th>
                                    <th>Garage</th>
                                    <th>Cost</th>
                                </tr>
                            </thead>
                            <tbody>
                                {serviceHistory.map((service, index) => (
                                    <tr key={index}>
                                        <td>{service.date}</td>
                                        <td>{service.type}</td>
                                        <td>{service.garage}</td>
                                        <td>{service.cost}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VehicleDetails;
