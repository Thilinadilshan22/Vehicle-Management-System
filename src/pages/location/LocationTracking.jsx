import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
    FiMapPin, FiTruck, FiNavigation, FiActivity,
    FiAlertCircle, FiFilter, FiSearch, FiRefreshCw
} from 'react-icons/fi';
import './LocationTracking.css';

// Fix default marker icons (Leaflet + Vite issue)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Custom colored marker icons
const createColoredIcon = (color) => {
    const svgIcon = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 42" width="32" height="42">
            <defs>
                <filter id="shadow${color.replace('#','')}" x="-20%" y="-10%" width="140%" height="130%">
                    <feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="${color}" flood-opacity="0.4"/>
                </filter>
            </defs>
            <path d="M16 0C7.163 0 0 7.163 0 16c0 10 16 26 16 26S32 26 32 16C32 7.163 24.837 0 16 0z"
                  fill="${color}" filter="url(#shadow${color.replace('#','')})"/>
            <circle cx="16" cy="16" r="7" fill="white" opacity="0.9"/>
            <circle cx="16" cy="16" r="4" fill="${color}"/>
        </svg>`;
    return L.divIcon({
        html: svgIcon,
        iconSize: [32, 42],
        iconAnchor: [16, 42],
        popupAnchor: [0, -42],
        className: '',
    });
};

const statusColors = {
    Active: '#10b981',
    Idle: '#f59e0b',
    Parked: '#6b7280',
};

// Mock vehicle data with Sri Lanka locations
const mockVehicles = [
    {
        id: 1,
        plate: 'AB-1234',
        make: 'Toyota Camry',
        driver: 'Kasun Perera',
        status: 'Active',
        speed: '62 km/h',
        location: 'Colombo 03',
        lat: 6.9147,
        lng: 79.8547,
        fuel: '78%',
        mileage: '45,230 km',
        lastUpdate: 'Just now',
    },
    {
        id: 2,
        plate: 'CD-5678',
        make: 'Honda Civic',
        driver: 'Nuwan Silva',
        status: 'Active',
        speed: '48 km/h',
        location: 'Nugegoda',
        lat: 6.8728,
        lng: 79.8878,
        fuel: '55%',
        mileage: '32,100 km',
        lastUpdate: '1 min ago',
    },
    {
        id: 3,
        plate: 'EF-9012',
        make: 'Nissan Navara',
        driver: 'Dinesh Jayawardena',
        status: 'Idle',
        speed: '0 km/h',
        location: 'Dehiwala',
        lat: 6.8519,
        lng: 79.8678,
        fuel: '42%',
        mileage: '67,540 km',
        lastUpdate: '8 min ago',
    },
    {
        id: 4,
        plate: 'GH-3456',
        make: 'Mitsubishi L200',
        driver: 'Saman Ratnayake',
        status: 'Parked',
        speed: '0 km/h',
        location: 'Kottawa',
        lat: 6.8345,
        lng: 79.9689,
        fuel: '90%',
        mileage: '28,760 km',
        lastUpdate: '25 min ago',
    },
    {
        id: 5,
        plate: 'IJ-7890',
        make: 'Toyota HiAce',
        driver: 'Roshan Fernando',
        status: 'Active',
        speed: '55 km/h',
        location: 'Maharagama',
        lat: 6.8482,
        lng: 79.9278,
        fuel: '63%',
        mileage: '52,880 km',
        lastUpdate: 'Just now',
    },
    {
        id: 6,
        plate: 'KL-2345',
        make: 'Isuzu Trooper',
        driver: 'Priya Mendis',
        status: 'Parked',
        speed: '0 km/h',
        location: 'Boralesgamuwa',
        lat: 6.8630,
        lng: 79.9060,
        fuel: '30%',
        mileage: '81,200 km',
        lastUpdate: '1 hr ago',
    },
];

// Helper: fly map to vehicle
const MapController = ({ target }) => {
    const map = useMap();
    useEffect(() => {
        if (target) {
            map.flyTo([target.lat, target.lng], 15, { duration: 1.2 });
        }
    }, [target, map]);
    return null;
};

const LocationTracking = () => {
    const [filter, setFilter] = useState('All');
    const [search, setSearch] = useState('');
    const [selected, setSelected] = useState(null);
    const [mapTarget, setMapTarget] = useState(null);
    const [lastRefresh, setLastRefresh] = useState(new Date());

    const filters = ['All', 'Active', 'Idle', 'Parked'];

    const filtered = mockVehicles.filter((v) => {
        const matchFilter = filter === 'All' || v.status === filter;
        const matchSearch =
            v.plate.toLowerCase().includes(search.toLowerCase()) ||
            v.make.toLowerCase().includes(search.toLowerCase()) ||
            v.driver.toLowerCase().includes(search.toLowerCase());
        return matchFilter && matchSearch;
    });

    const stats = [
        {
            label: 'Active Vehicles',
            value: mockVehicles.filter((v) => v.status === 'Active').length,
            icon: FiTruck,
            color: 'green',
        },
        {
            label: 'Routes Today',
            value: '14',
            icon: FiNavigation,
            color: 'blue',
        },
        {
            label: 'Km Covered',
            value: '1,248',
            icon: FiActivity,
            color: 'purple',
        },
        {
            label: 'Geofenced Zones',
            value: '3',
            icon: FiMapPin,
            color: 'orange',
        },
    ];

    const handleVehicleClick = (vehicle) => {
        setSelected(vehicle);
        setMapTarget(vehicle);
    };

    const handleRefresh = () => {
        setLastRefresh(new Date());
    };

    return (
        <div className="location-page">
            {/* Header */}
            <div className="location-header">
                <div>
                    <h1>Live Location Tracking</h1>
                    <p>Real-time map visualization of your fleet</p>
                </div>
                <button className="refresh-btn" onClick={handleRefresh}>
                    <FiRefreshCw />
                    <span>Refresh</span>
                    <span className="refresh-time">
                        {lastRefresh.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                </button>
            </div>

            {/* Stat Cards */}
            <div className="location-stats">
                {stats.map((s, i) => {
                    const Icon = s.icon;
                    return (
                        <div key={i} className={`loc-stat-card ${s.color}`}>
                            <div className="loc-stat-icon">
                                <Icon />
                            </div>
                            <div>
                                <div className="loc-stat-value">{s.value}</div>
                                <div className="loc-stat-label">{s.label}</div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Main Content */}
            <div className="location-main">
                {/* Sidebar */}
                <div className="location-sidebar">
                    <div className="sidebar-controls">
                        <div className="search-box">
                            <FiSearch className="search-icon" />
                            <input
                                type="text"
                                placeholder="Search vehicle or driver…"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <div className="filter-tabs">
                            {filters.map((f) => (
                                <button
                                    key={f}
                                    className={`filter-tab ${filter === f ? 'active' : ''}`}
                                    onClick={() => setFilter(f)}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="vehicle-list">
                        {filtered.length === 0 && (
                            <div className="no-vehicles">
                                <FiAlertCircle />
                                <p>No vehicles match your filter</p>
                            </div>
                        )}
                        {filtered.map((vehicle) => (
                            <div
                                key={vehicle.id}
                                className={`vehicle-list-card ${selected?.id === vehicle.id ? 'selected' : ''}`}
                                onClick={() => handleVehicleClick(vehicle)}
                            >
                                <div className="vehicle-list-header">
                                    <div className="vehicle-list-info">
                                        <span className="vehicle-plate">{vehicle.plate}</span>
                                        <span className={`vehicle-status-badge status-${vehicle.status.toLowerCase()}`}>
                                            <span className="status-dot" />
                                            {vehicle.status}
                                        </span>
                                    </div>
                                    <span className="vehicle-speed">{vehicle.speed}</span>
                                </div>
                                <div className="vehicle-make">{vehicle.make}</div>
                                <div className="vehicle-driver">
                                    <FiNavigation className="driver-icon" />
                                    {vehicle.driver}
                                </div>
                                <div className="vehicle-location-info">
                                    <FiMapPin className="loc-icon" />
                                    <span>{vehicle.location}</span>
                                    <span className="update-time">{vehicle.lastUpdate}</span>
                                </div>
                                <div className="vehicle-meta">
                                    <span>⛽ {vehicle.fuel}</span>
                                    <span>📍 {vehicle.mileage}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Map */}
                <div className="map-wrapper">
                    <MapContainer
                        center={[6.8853, 79.9067]}
                        zoom={12}
                        className="leaflet-map"
                        zoomControl={true}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <MapController target={mapTarget} />
                        {filtered.map((vehicle) => (
                            <Marker
                                key={vehicle.id}
                                position={[vehicle.lat, vehicle.lng]}
                                icon={createColoredIcon(statusColors[vehicle.status])}
                                eventHandlers={{
                                    click: () => setSelected(vehicle),
                                }}
                            >
                                <Popup className="vehicle-popup">
                                    <div className="popup-content">
                                        <div className="popup-header">
                                            <strong>{vehicle.plate}</strong>
                                            <span className={`popup-status status-${vehicle.status.toLowerCase()}`}>
                                                {vehicle.status}
                                            </span>
                                        </div>
                                        <div className="popup-row">🚗 {vehicle.make}</div>
                                        <div className="popup-row">👤 {vehicle.driver}</div>
                                        <div className="popup-row">📍 {vehicle.location}</div>
                                        <div className="popup-row">⚡ {vehicle.speed}</div>
                                        <div className="popup-row">⛽ Fuel: {vehicle.fuel}</div>
                                        <div className="popup-row">🕐 {vehicle.lastUpdate}</div>
                                    </div>
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>

                    {/* Map Legend */}
                    <div className="map-legend">
                        <div className="legend-title">Legend</div>
                        {Object.entries(statusColors).map(([status, color]) => (
                            <div key={status} className="legend-item">
                                <span className="legend-dot" style={{ background: color }} />
                                {status}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LocationTracking;
