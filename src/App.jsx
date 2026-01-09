import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import VehicleList from './pages/vehicles/VehicleList';
import VehicleDetails from './pages/vehicles/VehicleDetails';
import AddVehicle from './pages/vehicles/AddVehicle';
import ServiceHistory from './pages/service/ServiceHistory';
import AddService from './pages/service/AddService';
import DriverList from './pages/drivers/DriverList';
import DriverProfile from './pages/drivers/DriverProfile';
import AddDriver from './pages/drivers/AddDriver';
import FuelAnalysis from './pages/fuel/FuelAnalysis';
import AddFuelRecord from './pages/fuel/AddFuelRecord';
import Reports from './pages/reports/Reports';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(true); // Mock auth

  if (!isAuthenticated) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login setAuth={setIsAuthenticated} />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          
          {/* Vehicle Routes */}
          <Route path="vehicles" element={<VehicleList />} />
          <Route path="vehicles/add" element={<AddVehicle />} />
          <Route path="vehicles/:id" element={<VehicleDetails />} />
          
          {/* Service Routes */}
          <Route path="service" element={<ServiceHistory />} />
          <Route path="service/add" element={<AddService />} />
          
          {/* Driver Routes */}
          <Route path="drivers" element={<DriverList />} />
          <Route path="drivers/add" element={<AddDriver />} />
          <Route path="drivers/:id" element={<DriverProfile />} />
          
          {/* Fuel Routes */}
          <Route path="fuel" element={<FuelAnalysis />} />
          <Route path="fuel/add" element={<AddFuelRecord />} />
          
          {/* Reports */}
          <Route path="reports" element={<Reports />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
