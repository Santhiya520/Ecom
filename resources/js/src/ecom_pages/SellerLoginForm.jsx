// SellerLoginForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BASE_URL = "http://localhost:8000/api/";

const SellerLoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'seller',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(`${BASE_URL}seller/login`, {
        email: formData.email,
        password: formData.password,
      });

      console.log('Seller login successful:', response.data);

      // Save user data/token if needed
      // localStorage.setItem('user', JSON.stringify(response.data.data));

      navigate('/dashboard'); // Redirect to dashboard or home
    } catch (err) {
      if (err.response?.status === 401) {
        setError('Invalid seller credentials');
      } else {
        setError('Something went wrong. Please try again.');
      }
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

      <button
        type="submit"
        className="btn w-100"
        style={{ backgroundColor: '#0d6efd', color: '#fff' }}
      >
        Login as Seller
      </button>
    </form>
  );
};

export default SellerLoginForm;
