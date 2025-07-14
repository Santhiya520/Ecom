import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaShoppingCart } from 'react-icons/fa';
import { useCart } from './CartContext';

const BASE_URL = "https://ecom-6ffz.onrender.com";
// 🧁 Helper: Read cookie value
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
const NavbarEcom = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      // 🔐 Optional: get CSRF cookie
      await fetch(`${BASE_URL}/sanctum/csrf-cookie`, { credentials: 'include' });

      const token = decodeURIComponent(getCookie('XSRF-TOKEN'));

      // 🚪 Logout call
      const res = await fetch(`${BASE_URL}/api/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-XSRF-TOKEN': token,
        }
      });

      if (res.ok) {
        localStorage.removeItem('user_id');
        clearCart();
        navigate('/'); // Redirect to login page
        alert('✅ Logged out successfully!');
      } else {
        const data = await res.json();
        alert(`❌ Logout failed: ${data.message}`);
      }
    } catch (err) {
      console.error('❌ Logout error:', err);
      alert('Error during logout');
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-custom bg-primary text-white">
      <div className="container-fluid px-4">
        <NavLink className="navbar-brand fw-bold text-white" to="/">
          🛒 E-Shop
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarContent">
          <ul className="navbar-nav gap-3 align-items-center">
            <li className="nav-item position-relative me-3">
              <NavLink to="/cart-page" className="nav-link text-white">
                <FaShoppingCart size={22} />
                {cartItems.length > 0 && (
                  <span
                    className="badge bg-danger position-absolute top-0 start-100 translate-middle"
                    style={{ fontSize: '0.7rem' }}
                  >
                    {cartItems.length}
                  </span>
                )}
              </NavLink>
            </li>

            <li className="nav-item dropdown">
              <button
                className="btn btn-outline-light dropdown-toggle d-flex align-items-center"
                type="button"
                id="profileDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <FaUserCircle size={20} className="me-1" />
                Profile
              </button>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
                <li><NavLink className="dropdown-item" to="/order-history">Order History</NavLink></li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <button className="dropdown-item text-danger" onClick={logout}>
                    Logout
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavbarEcom;
