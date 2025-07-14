import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BASE_URL = "https://ecom-6ffz.onrender.com/api/";

const RegisterForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    role: 'buyer',
    name: '',
    email: '',
    password: '',
    phone_number: '',
    address: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/buyer/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        alert('✅ Registration successful!');
        navigate('/login-form');
      } else {
        alert(`❌ ${result.message || 'Registration failed'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('❌ Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}
    >
      <div
        className="card shadow"
        style={{ width: '100%', maxWidth: '450px', borderTop: '4px solid #0d6efd' }}
      >
        <div className="card-body">
          <h3 className="text-center mb-4" style={{ color: '#0d6efd' }}>
            Buyer Registration
          </h3>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

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

            <div className="mb-3">
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

            <div className="mb-3">
              <label>Phone Number</label>
              <input
                type="text"
                className="form-control"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label>Address</label>
              <textarea
                className="form-control"
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="2"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn w-100"
              disabled={loading}
              style={{ backgroundColor: '#0d6efd', color: '#fff' }}
            >
              {loading ? 'Registering...' : 'Register as Buyer'}
            </button>

            <p className="mt-3 text-center">
              Already have an account?{' '}
              <button
                type="button"
                className="btn btn-link p-0"
                style={{ color: '#0d6efd', textDecoration: 'underline' }}
                onClick={() => navigate('/login-form')}
              >
                Login here
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
