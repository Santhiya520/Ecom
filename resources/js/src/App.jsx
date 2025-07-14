import React, { Component } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import './ecom_pages/style.css';

// Bootstrap & Icons
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Pages
import HomeEcom from './ecom_pages/HomeEcom';
import RegisterForm from './ecom_pages/RegisterForm';
import LoginForm from './ecom_pages/LoginForm';
import { CartProvider } from './ecom_pages/CartContext';
import CartPage from './ecom_pages/CartPage';
import CheckoutPage from './ecom_pages/CheckoutPage';
import OrderHistory from './ecom_pages/OrderHistory';
import Dashboard from './ecom_pages/Dasboard';
import AdminOrderList from './ecom_pages/AdminOrderList';
import AdminProductList from './ecom_pages/AdminProductList';

// Global Base URL (if needed)
export const BASE_URL = 'https://totalwebsolutions.co.in';

class App extends Component {
  render() {
    return (
      <React.StrictMode>
        <CartProvider>
          <HashRouter>
            <Routes>
              <Route path="/product" element={<HomeEcom />} />
              <Route path="/register-form" element={<RegisterForm />} />
              <Route path="/" element={<LoginForm />} />
               <Route path="/cart-page" element={<CartPage />} />
               <Route path="/checkout" element={<CheckoutPage />} />
               <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/order-history" element={<OrderHistory />} />
                <Route path="/orders" element={<AdminOrderList />} />
                <Route path="/products-list" element={<AdminProductList />} />
            </Routes>
          </HashRouter>
        </CartProvider>
      </React.StrictMode>
    );
  }
}

// Mount the app
const root = createRoot(document.getElementById('app'));
root.render(<App />);
