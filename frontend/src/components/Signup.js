import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

const Signup = () => {
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    try {
      const { confirmPassword, ...data } = formData;
      await api.post('/auth/signup', data);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.msg || 'Signup failed');
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="card">
        <h2>Create Account</h2>
        {error && <div className="error-msg">{error}</div>}
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input type="text" placeholder="Full Name" onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} required />
          </div>
          <div className="form-group">
            <input type="email" placeholder="Email Address" onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
          </div>
          <div className="form-group">
            <input type="password" placeholder="Password (Min 6 chars)" onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
          </div>
          <div className="form-group">
            <input type="password" placeholder="Confirm Password" onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} required />
          </div>
          <button type="submit" className="primary-btn">Sign Up</button>
        </form>
        <p style={{ marginTop: '15px', textAlign: 'center' }}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;