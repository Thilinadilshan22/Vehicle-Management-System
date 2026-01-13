import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiSearch, FiFilter, FiTrendingUp, FiDroplet, FiDollarSign, FiCalendar } from 'react-icons/fi';
import './FuelAnalysis.css';

const FuelAnalysis = () => {
    const [selectedPeriod, setSelectedPeriod] = useState('month');
    const [selectedFuelType, setSelectedFuelType] = useState('all'); // all, petrol, diesel

    // Mock fuel data
    const fuelRecords = [
        {
            id: 1,
            vehicle: 'AB-1234',
            vehicleName: 'Toyota Camry',
            date: '2024-01-15',
            liters: 45.5,
            cost: 10465,
            pricePerLiter: 230,
            mileage: 45200,
            efficiency: 12.5,
            station: 'Lanka IOC',
            fuelType: 'Petrol 95'
        },
        {
            id: 2,
            vehicle: 'CD-5678',
            vehicleName: 'Honda Civic',
            date: '2024-01-12',
            liters: 38.2,
            cost: 8786,
            pricePerLiter: 230,
            mileage: 32150,
            efficiency: 15.2,
            station: 'Caltex',
            fuelType: 'Petrol 95'
        },
        {
            id: 3,
            vehicle: 'EF-9012',
            vehicleName: 'Nissan Navara',
            date: '2024-01-10',
            liters: 52.0,
            cost: 10920,
            pricePerLiter: 210,
            mileage: 78500,
            efficiency: 9.8,
            station: 'Shell',
            fuelType: 'Diesel'
        },
        {
            id: 4,
            vehicle: 'AB-1234',
            vehicleName: 'Toyota Camry',
            date: '2024-01-05',
            liters: 42.8,
            cost: 9844,
            pricePerLiter: 230,
            mileage: 44650,
            efficiency: 13.1,
            station: 'Indian Oil',
            fuelType: 'Petrol 95'
        },
        {
            id: 5,
            vehicle: 'CD-5678',
            vehicleName: 'Honda Civic',
            date: '2024-01-03',
            liters: 40.0,
            cost: 9200,
            pricePerLiter: 230,
            mileage: 31580,
            efficiency: 14.8,
            station: 'Lanka IOC',
            fuelType: 'Petrol 95'
        },
    ];

    // Filter records based on selected fuel type
    const filteredRecords = selectedFuelType === 'all'
        ? fuelRecords
        : fuelRecords.filter(record => {
            if (selectedFuelType === 'petrol') return record.fuelType.includes('Petrol');
            if (selectedFuelType === 'diesel') return record.fuelType.includes('Diesel');
            return true;
        });

    // Calculate statistics for filtered records
    const totalLiters = filteredRecords.reduce((sum, record) => sum + record.liters, 0);
    const totalCost = filteredRecords.reduce((sum, record) => sum + record.cost, 0);
    const avgEfficiency = filteredRecords.length > 0
        ? (filteredRecords.reduce((sum, record) => sum + record.efficiency, 0) / filteredRecords.length).toFixed(1)
        : '0.0';
    const avgCostPerLiter = totalLiters > 0 ? (totalCost / totalLiters).toFixed(2) : '0.00';

    // Separate statistics for petrol and diesel
    const petrolRecords = fuelRecords.filter(r => r.fuelType.includes('Petrol'));
    const dieselRecords = fuelRecords.filter(r => r.fuelType.includes('Diesel'));

    const petrolStats = {
        count: petrolRecords.length,
        liters: petrolRecords.reduce((sum, r) => sum + r.liters, 0).toFixed(1),
        cost: petrolRecords.reduce((sum, r) => sum + r.cost, 0),
        avgEfficiency: petrolRecords.length > 0
            ? (petrolRecords.reduce((sum, r) => sum + r.efficiency, 0) / petrolRecords.length).toFixed(1)
            : '0.0'
    };

    const dieselStats = {
        count: dieselRecords.length,
        liters: dieselRecords.reduce((sum, r) => sum + r.liters, 0).toFixed(1),
        cost: dieselRecords.reduce((sum, r) => sum + r.cost, 0),
        avgEfficiency: dieselRecords.length > 0
            ? (dieselRecords.reduce((sum, r) => sum + r.efficiency, 0) / dieselRecords.length).toFixed(1)
            : '0.0'
    };

    // Mock chart data for visualization
    const chartData = [
        { month: 'Aug', liters: 180, cost: 41400 },
        { month: 'Sep', liters: 195, cost: 44850 },
        { month: 'Oct', liters: 205, cost: 47150 },
        { month: 'Nov', liters: 188, cost: 43240 },
        { month: 'Dec', liters: 210, cost: 48300 },
        { month: 'Jan', liters: 218, cost: 50176 },
    ];

    const maxLiters = Math.max(...chartData.map(d => d.liters));
    const maxCost = Math.max(...chartData.map(d => d.cost));

    return (
        <div className="fuel-analysis-page">
            <div className="page-header">
                <div>
                    <h1>Fuel Analysis</h1>
                    <p>Monitor fuel consumption and efficiency trends</p>
                </div>
                <div className="header-actions">
                    <div className="fuel-type-filter">
                        <button
                            className={selectedFuelType === 'all' ? 'active' : ''}
                            onClick={() => setSelectedFuelType('all')}
                        >
                            All Vehicles
                        </button>
                        <button
                            className={selectedFuelType === 'petrol' ? 'active petrol' : 'petrol'}
                            onClick={() => setSelectedFuelType('petrol')}
                        >
                            ⛽ Petrol ({petrolStats.count})
                        </button>
                        <button
                            className={selectedFuelType === 'diesel' ? 'active diesel' : 'diesel'}
                            onClick={() => setSelectedFuelType('diesel')}
                        >
                            🚛 Diesel ({dieselStats.count})
                        </button>
                    </div>
                    <Link to="/fuel/add" className="btn btn-primary">
                        <FiPlus /> Add Fuel Record
                    </Link>
                </div>
            </div>

            {/* Statistics Cards */}
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                        <FiDroplet />
                    </div>
                    <div className="stat-info">
                        <span className="stat-label">
                            {selectedFuelType === 'all' ? 'Total Fuel' :
                                selectedFuelType === 'petrol' ? 'Petrol Consumed' : 'Diesel Consumed'}
                        </span>
                        <span className="stat-value">{totalLiters.toFixed(1)} L</span>
                        {selectedFuelType === 'all' && (
                            <span className="stat-breakdown">⛽ {petrolStats.liters}L | 🚛 {dieselStats.liters}L</span>
                        )}
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
                        <FiDollarSign />
                    </div>
                    <div className="stat-info">
                        <span className="stat-label">
                            {selectedFuelType === 'all' ? 'Total Cost' :
                                selectedFuelType === 'petrol' ? 'Petrol Cost' : 'Diesel Cost'}
                        </span>
                        <span className="stat-value">Rs. {totalCost.toLocaleString()}</span>
                        {selectedFuelType === 'all' && (
                            <span className="stat-breakdown">⛽ Rs.{petrolStats.cost.toLocaleString()} | 🚛 Rs.{dieselStats.cost.toLocaleString()}</span>
                        )}
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
                        <FiTrendingUp />
                    </div>
                    <div className="stat-info">
                        <span className="stat-label">Avg Efficiency</span>
                        <span className="stat-value">{avgEfficiency} km/L</span>
                        {selectedFuelType === 'all' && (
                            <span className="stat-breakdown">⛽ {petrolStats.avgEfficiency} | 🚛 {dieselStats.avgEfficiency} km/L</span>
                        )}
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' }}>
                        <FiCalendar />
                    </div>
                    <div className="stat-info">
                        <span className="stat-label">Avg Price/L</span>
                        <span className="stat-value">Rs. {avgCostPerLiter}</span>
                        {selectedFuelType === 'all' && (
                            <span className="stat-breakdown">{filteredRecords.length} Records</span>
                        )}
                    </div>
                </div>
            </div>

            {/* Fuel Consumption Chart */}
            <div className="chart-section">
                <div className="chart-header">
                    <h2>Fuel Consumption Trends</h2>
                    <div className="period-selector">
                        <button
                            className={selectedPeriod === 'week' ? 'active' : ''}
                            onClick={() => setSelectedPeriod('week')}
                        >
                            Week
                        </button>
                        <button
                            className={selectedPeriod === 'month' ? 'active' : ''}
                            onClick={() => setSelectedPeriod('month')}
                        >
                            Month
                        </button>
                        <button
                            className={selectedPeriod === 'year' ? 'active' : ''}
                            onClick={() => setSelectedPeriod('year')}
                        >
                            Year
                        </button>
                    </div>
                </div>

                <div className="chart-container">
                    <div className="chart-legend">
                        <div className="legend-item">
                            <span className="legend-color" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}></span>
                            <span>Liters</span>
                        </div>
                        <div className="legend-item">
                            <span className="legend-color" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}></span>
                            <span>Cost (Rs.)</span>
                        </div>
                    </div>

                    <div className="chart-grid">
                        {chartData.map((data, index) => (
                            <div key={index} className="chart-column">
                                <div className="bar-group">
                                    <div
                                        className="bar bar-liters"
                                        style={{
                                            height: `${(data.liters / maxLiters) * 100}%`,
                                            background: 'linear-gradient(180deg, #667eea 0%, #764ba2 100%)'
                                        }}
                                    >
                                        <span className="bar-value">{data.liters}L</span>
                                    </div>
                                    <div
                                        className="bar bar-cost"
                                        style={{
                                            height: `${(data.cost / maxCost) * 100}%`,
                                            background: 'linear-gradient(180deg, #f093fb 0%, #f5576c 100%)'
                                        }}
                                    >
                                        <span className="bar-value">Rs.{(data.cost / 1000).toFixed(1)}k</span>
                                    </div>
                                </div>
                                <span className="chart-label">{data.month}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="filters-bar">
                <div className="search-box">
                    <FiSearch />
                    <input type="text" placeholder="Search fuel records..." />
                </div>
                <button className="btn btn-secondary">
                    <FiFilter /> Filters
                </button>
            </div>

            {/* Fuel Records Grid */}
            <div className="fuel-records-grid">
                {filteredRecords.length > 0 ? filteredRecords.map((record) => (
                    <div key={record.id} className={`fuel-card ${record.fuelType.includes('Petrol') ? 'petrol-card' : 'diesel-card'}`}>
                        <div className="fuel-header">
                            <div>
                                <h3>{record.vehicleName}</h3>
                                <p className="vehicle-info">{record.vehicle}</p>
                            </div>
                            <div className="fuel-amount">
                                <span className="liters">{record.liters}L</span>
                                <span className="fuel-type">{record.fuelType}</span>
                            </div>
                        </div>

                        <div className="fuel-stats">
                            <div className="stat">
                                <span className="stat-label">Date</span>
                                <span className="stat-value">{new Date(record.date).toLocaleDateString()}</span>
                            </div>
                            <div className="stat">
                                <span className="stat-label">Mileage</span>
                                <span className="stat-value">{record.mileage.toLocaleString()} km</span>
                            </div>
                            <div className="stat">
                                <span className="stat-label">Efficiency</span>
                                <span className="stat-value">{record.efficiency} km/L</span>
                            </div>
                        </div>

                        <div className="fuel-cost">
                            <div className="cost-breakdown">
                                <span className="price-label">Price/Liter:</span>
                                <span className="price">Rs. {record.pricePerLiter}</span>
                            </div>
                            <div className="total-cost">
                                <span className="total-label">Total:</span>
                                <span className="total-amount">Rs. {record.cost.toLocaleString()}</span>
                            </div>
                        </div>

                        <div className="fuel-footer">
                            <span className="station">⛽ {record.station}</span>
                        </div>
                    </div>
                )) : (
                    <div className="no-records">
                        <p>No fuel records found for {selectedFuelType === 'petrol' ? 'Petrol' : 'Diesel'} vehicles.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FuelAnalysis;
