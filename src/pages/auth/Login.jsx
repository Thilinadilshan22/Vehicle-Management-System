import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const Login = ({ setAuth }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = React.useState({ email: '', password: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        setAuth(true);
        navigate('/');
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h1>V-Mas</h1>
                    <p>Fleet Management System</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label className="input-label">Email</label>
                        <input
                            type="email"
                            className="input"
                            placeholder="admin@vmas.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label className="input-label">Password</label>
                        <input
                            type="password"
                            className="input"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
