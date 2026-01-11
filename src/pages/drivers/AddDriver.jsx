import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiUser, FiCreditCard, FiPhone, FiMapPin, FiUpload, FiCamera } from 'react-icons/fi';
import './AddDriver.css';

const AddDriver = () => {
    const navigate = useNavigate();
    const [photoPreview, setPhotoPreview] = useState(null);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        licenseNumber: '',
        licenseExpiry: '',
        licenseClass: '',
        phone: '',
        email: '',
        emergencyContact: '',
        emergencyPhone: '',
        address: '',
        city: '',
        postalCode: '',
        notes: '',
        photo: null,
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, photo: file });
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Driver data submitted:', formData);
        navigate('/drivers');
    };

    const getInitials = () => {
        const first = formData.firstName.charAt(0).toUpperCase();
        const last = formData.lastName.charAt(0).toUpperCase();
        return first + last;
    };

    return (
        <div className="add-driver-page">
            <button onClick={() => navigate('/drivers')} className="back-btn">
                <FiArrowLeft /> Back to Drivers
            </button>

            <div className="form-container">
                <h1>Add New Driver</h1>
                <p>Register a new driver to your fleet</p>

                <form onSubmit={handleSubmit} className="driver-form">
                    {/* Personal Information */}
                    <div className="form-section">
                        <h3 className="form-section-title">
                            <FiUser /> Personal Information
                        </h3>

                        <div className="form-row">
                            <div className="input-group full-width">
                                <label className="photo-upload" htmlFor="photo-input">
                                    <input
                                        id="photo-input"
                                        type="file"
                                        accept="image/*"
                                        onChange={handlePhotoUpload}
                                        className="file-input"
                                    />
                                    <div className="photo-preview">
                                        {photoPreview ? (
                                            <img src={photoPreview} alt="Driver" />
                                        ) : formData.firstName || formData.lastName ? (
                                            getInitials()
                                        ) : (
                                            <FiCamera className="upload-icon" />
                                        )}
                                    </div>
                                    <div className="upload-text">
                                        <p><strong>Click to upload photo</strong> or drag and drop</p>
                                        <p>PNG, JPG up to 5MB</p>
                                    </div>
                                </label>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="input-group">
                                <label className="input-label">First Name *</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    className="input"
                                    placeholder="John"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <label className="input-label">Last Name *</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    className="input"
                                    placeholder="Doe"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="input-group">
                                <label className="input-label">Date of Birth *</label>
                                <input
                                    type="date"
                                    name="dateOfBirth"
                                    className="input"
                                    value={formData.dateOfBirth}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* License Information */}
                    <div className="form-section">
                        <h3 className="form-section-title">
                            <FiCreditCard /> License Information
                        </h3>

                        <div className="form-row">
                            <div className="input-group">
                                <label className="input-label">License Number *</label>
                                <input
                                    type="text"
                                    name="licenseNumber"
                                    className="input"
                                    placeholder="DL-123456"
                                    value={formData.licenseNumber}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <label className="input-label">License Class *</label>
                                <select
                                    name="licenseClass"
                                    className="input"
                                    value={formData.licenseClass}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select class</option>
                                    <option value="A">Class A - Motorcycles</option>
                                    <option value="A1">Class A1 - Light Motorcycles</option>
                                    <option value="B">Class B - Light Vehicles</option>
                                    <option value="C">Class C - Medium Vehicles</option>
                                    <option value="D">Class D - Heavy Vehicles</option>
                                    <option value="G">Class G - Passenger Transport</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="input-group">
                                <label className="input-label">License Expiry Date *</label>
                                <input
                                    type="date"
                                    name="licenseExpiry"
                                    className="input"
                                    value={formData.licenseExpiry}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="form-section">
                        <h3 className="form-section-title">
                            <FiPhone /> Contact Information
                        </h3>

                        <div className="form-row">
                            <div className="input-group">
                                <label className="input-label">Phone Number *</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    className="input"
                                    placeholder="+94 77 123 4567"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <label className="input-label">Email Address *</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="input"
                                    placeholder="john.doe@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="input-group">
                                <label className="input-label">Emergency Contact Name</label>
                                <input
                                    type="text"
                                    name="emergencyContact"
                                    className="input"
                                    placeholder="Jane Doe"
                                    value={formData.emergencyContact}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="input-group">
                                <label className="input-label">Emergency Contact Phone</label>
                                <input
                                    type="tel"
                                    name="emergencyPhone"
                                    className="input"
                                    placeholder="+94 77 234 5678"
                                    value={formData.emergencyPhone}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Address Information */}
                    <div className="form-section">
                        <h3 className="form-section-title">
                            <FiMapPin /> Address
                        </h3>

                        <div className="form-row">
                            <div className="input-group full-width">
                                <label className="input-label">Street Address *</label>
                                <input
                                    type="text"
                                    name="address"
                                    className="input"
                                    placeholder="123 Main Street"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="input-group">
                                <label className="input-label">City *</label>
                                <input
                                    type="text"
                                    name="city"
                                    className="input"
                                    placeholder="Colombo"
                                    value={formData.city}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <label className="input-label">Postal Code *</label>
                                <input
                                    type="text"
                                    name="postalCode"
                                    className="input"
                                    placeholder="10100"
                                    value={formData.postalCode}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="input-group full-width">
                                <label className="input-label">Additional Notes</label>
                                <textarea
                                    name="notes"
                                    className="input textarea"
                                    placeholder="Any additional information about the driver..."
                                    value={formData.notes}
                                    onChange={handleChange}
                                    rows="4"
                                    maxLength="500"
                                />
                                <div className="char-count">
                                    {formData.notes.length}/500 characters
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="form-actions">
                        <button type="button" onClick={() => navigate('/drivers')} className="btn btn-secondary">
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                            <FiUser /> Add Driver
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddDriver;
