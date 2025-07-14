// import React from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { FaTachometerAlt, FaBoxOpen, FaClipboardList, FaSignOutAlt } from 'react-icons/fa';
// import { useCart } from './CartContext';

// const BASE_URL = "https://ecom-6ffz.onrender.com";

// // Helper to read cookie
// function getCookie(name) {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop().split(';').shift();
// }

// const Sidebar = () => {
//   const navigate = useNavigate();
//   const { clearCart } = useCart(); // ✅ Import clearCart

//   const logout = async () => {
//     try {
//       await fetch(`${BASE_URL}/sanctum/csrf-cookie`, { credentials: 'include' });
//       const token = decodeURIComponent(getCookie('XSRF-TOKEN'));

//       const res = await fetch(`${BASE_URL}/api/logout`, {
//         method: 'POST',
//         credentials: 'include',
//         headers: {
//           'Content-Type': 'application/json',
//           'X-XSRF-TOKEN': token,
//         }
//       });

//       if (res.ok) {
//         localStorage.removeItem('user_id');
//         clearCart();
//         navigate('/');
//         alert('✅ Logged out successfully!');
//       } else {
//         const data = await res.json();
//         alert(`❌ Logout failed: ${data.message}`);
//       }
//     } catch (err) {
//       console.error('❌ Logout error:', err);
//       alert('Error during logout');
//     }
//   };

//   return (
//     <div className="bg-dark text-white vh-100 p-3" style={{ width: '250px', position: 'fixed' }}>
//       <h5 className="text-center mb-4">🛍 Admin Panel</h5>
//       <ul className="nav flex-column gap-2">
//         <li className="nav-item">
//           <NavLink to="/dashboard" className="nav-link text-white" activeclassname="active">
//             <FaTachometerAlt className="me-2" /> Dashboard
//           </NavLink>
//         </li>
//         <li className="nav-item">
//           <NavLink to="/orders" className="nav-link text-white" activeclassname="active">
//             <FaClipboardList className="me-2" /> Order List
//           </NavLink>
//         </li>
//         <li className="nav-item">
//           <NavLink to="/products-list" className="nav-link text-white" activeclassname="active">
//             <FaBoxOpen className="me-2" /> Products
//           </NavLink>
//         </li>
//         <li className="nav-item mt-4">
//           <button className="btn btn-danger w-100 d-flex align-items-center justify-content-center gap-2" onClick={logout}>
//             <FaSignOutAlt /> Logout
//           </button>
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaTachometerAlt, FaBoxOpen, FaClipboardList, FaSignOutAlt } from 'react-icons/fa';
import { useCart } from './CartContext';

const BASE_URL = "https://ecom-6ffz.onrender.com";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

const Sidebar = ({ isOpen, closeSidebar }) => {
  const navigate = useNavigate();
  const { clearCart } = useCart();

  const logout = async () => {
    try {
      await fetch(`${BASE_URL}/sanctum/csrf-cookie`, { credentials: 'include' });
      const token = decodeURIComponent(getCookie('XSRF-TOKEN'));

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
        navigate('/');
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
    <div className={`sidebar-container bg-dark text-white p-3 ${isOpen ? 'open' : ''}`}>
      {/* Close button for mobile */}
      {closeSidebar && (
        <button className="close-btn d-md-none btn btn-sm btn-light mb-3 text-danger text-bold" onClick={closeSidebar}>
          ×
        </button>
      )}

      <h5 className="text-center mb-4">🛍 Admin Panel</h5>
      <ul className="nav flex-column gap-2">
        <li className="nav-item">
          <NavLink to="/dashboard" className="nav-link text-white">
            <FaTachometerAlt className="me-2" /> Dashboard
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/orders" className="nav-link text-white">
            <FaClipboardList className="me-2" /> Order List
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/products-list" className="nav-link text-white">
            <FaBoxOpen className="me-2" /> Products
          </NavLink>
        </li>
        <li className="nav-item mt-4">
          <button className="btn btn-danger w-100 d-flex align-items-center justify-content-center gap-2" onClick={logout}>
            <FaSignOutAlt /> Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

