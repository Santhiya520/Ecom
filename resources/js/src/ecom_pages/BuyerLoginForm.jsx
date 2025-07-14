import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BASE_URL = "http://localhost:8000/api/";

const BuyerLoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '', role: 'buyer' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(`${BASE_URL}buyer/login`, {
        email: formData.email,
        password: formData.password
      });

      console.log('Buyer login successful:', response.data);

      // Optional: Save user data/token in localStorage or context
      // localStorage.setItem('user', JSON.stringify(response.data.data));

      navigate('/product'); // redirect after login
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError('Invalid email or password');
      } else {
        setError('Something went wrong. Please try again.');
      }
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label>Email</label>
        <input
          type="email"
          className="form-control"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-4">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      {error && <div className="alert alert-danger py-2">{error}</div>}

      <button type="submit" className="btn w-100" style={{ backgroundColor: '#0d6efd', color: '#fff' }}>
        Login as Buyer
      </button>

      <p className="mt-3 text-center">
        Don't have an account?{' '}
        <button
          type="button"
          className="btn btn-link p-0"
          style={{ color: '#0d6efd', textDecoration: 'underline' }}
          onClick={() => navigate('/register-form')}
        >
          Register here
        </button>
      </p>
    </form>
  );
};

export default BuyerLoginForm;
