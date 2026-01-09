import React from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiSearch, FiFilter } from 'react-icons/fi';
import './VehicleList.css';

const VehicleList = () => {
    // Mock vehicle data
    const vehicles = [
        {
            id: 1,
            regNumber: 'AB-1234',
            make: 'Toyota',
            model: 'Camry',
            year: 2020,
            status: 'Active',
            mileage: 45000,
            nextService: 50000,
            driver: 'John Doe',
            fuelEfficiency: 12.5,
        },
        {
            id: 2,
            regNumber: 'CD-5678',
            make: 'Honda',
            model: 'Civic',
            year: 2021,
            status: 'Active',
            mileage: 32000,
            nextService: 35000,
            driver: 'Sarah Smith',
            fuelEfficiency: 14.2,
        },
        {
            id: 3,
            regNumber: 'EF-9012',
            make: 'Nissan',
            model: 'Navara',
            year: 2019,
            status: 'In Service',
            mileage: 78000,
            nextService: 80000,
            driver: 'Mike Johnson',
            fuelEfficiency: 9.8,
        },
    ];

    return (
        <div className="vehicle-list-page">
            <div className="page-header">
                <div>
                    <h1>Vehicles</h1>
                    <p>Manage your fleet vehicles</p>
                </div>
                <Link to="/vehicles/add" className="btn btn-primary">
                    <FiPlus /> Add Vehicle
                </Link>
            </div>

            <div className="filters-bar">
                <div className="search-box">
                    <FiSearch />
                    <input type="text" placeholder="Search vehicles..." />
                </div>
                <button className="btn btn-secondary">
                    <FiFilter /> Filters
                </button>
            </div>

            <div className="vehicles-grid">
                {vehicles.map((vehicle) => (
                    <Link
                        key={vehicle.id}
                        to={`/vehicles/${vehicle.id}`}
                        className="vehicle-card"
                    >
                        <div className="vehicle-header">
                            <div>
                                <h3>{vehicle.regNumber}</h3>
                                <p>{vehicle.make} {vehicle.model}</p>
                            </div>
                            <span className={`badge badge-${vehicle.status === 'Active' ? 'success' : 'warning'}`}>
                                {vehicle.status}
                            </span>
                        </div>

                        <div className="vehicle-stats">
                            <div className="stat">
                                <span className="stat-label">Mileage</span>
                                <span className="stat-value">{vehicle.mileage.toLocaleString()} km</span>
                            </div>
                            <div className="stat">
                                <span className="stat-label">Next Service</span>
                                <span className="stat-value">{vehicle.nextService.toLocaleString()} km</span>
                            </div>
                            <div className="stat">
                                <span className="stat-label">Efficiency</span>
                                <span className="stat-value">{vehicle.fuelEfficiency} km/L</span>
                            </div>
                        </div>

                        <div className="vehicle-footer">
                            <span className="driver">🚗 {vehicle.driver}</span>
                            <span className="year">{vehicle.year}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default VehicleList;
