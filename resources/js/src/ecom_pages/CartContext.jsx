import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();
const BASE_URL = "https://ecom-6ffz.onrender.com";

// 🧁 Helper: Read cookie value
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const userId = localStorage.getItem('user_id') || 1;

  // 1️⃣ Load CSRF cookie once
  useEffect(() => {
    fetch(`${BASE_URL}/sanctum/csrf-cookie`, {
      credentials: 'include',
    }).catch(err => console.error('❌ Failed to get CSRF cookie:', err));
  }, []);

  // 2️⃣ Load initial cart
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/cart/${userId}`, {
          credentials: 'include',
        });
        const data = await res.json();
        if (res.ok && Array.isArray(data.cart)) {
          setCartItems(data.cart.map(item => ({
            ...item.product,
            quantity: item.quantity,
          })));
        } else {
          console.warn('❗ Unexpected cart response:', data);
        }
      } catch (err) {
        console.error('❌ Error loading cart:', err);
      }
    };

    fetchCart();
  }, [userId]);

  // 3️⃣ Add to cart
  const addToCart = async (product) => {
    try {
      await fetch(`${BASE_URL}/sanctum/csrf-cookie`, { credentials: 'include' });

      const token = decodeURIComponent(getCookie('XSRF-TOKEN'));

      const res = await fetch(`${BASE_URL}/api/cart/add`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-XSRF-TOKEN': token,
        },
        body: JSON.stringify({
          user_id: userId,
          product_id: product.id,
          quantity: 1,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setCartItems(prev => {
          const exists = prev.find(p => p.id === product.id);
          return exists
            ? prev.map(p => p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p)
            : [...prev, { ...product, quantity: 1 }];
        });
      } else {
        console.error('❌ Failed to add to cart:', data.message);
      }
    } catch (err) {
      console.error('❌ API error:', err);
    }
  };

  // 4️⃣ Update quantity (+/-)
  const updateQuantity = async (productId, change) => {
    const item = cartItems.find(p => p.id === productId);
    if (!item) return;

    const newQty = item.quantity + change;

    try {
      const token = decodeURIComponent(getCookie('XSRF-TOKEN'));

      const res = await fetch(`${BASE_URL}/api/cart/add`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-XSRF-TOKEN': token,
        },
        body: JSON.stringify({
          user_id: userId,
          product_id: productId,
          quantity: change,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setCartItems(prev => {
          if (newQty < 1) return prev.filter(p => p.id !== productId);
          return prev.map(p => p.id === productId ? { ...p, quantity: newQty } : p);
        });
      } else {
        console.error('❌ Update failed:', data.message);
      }
    } catch (err) {
      console.error('❌ Quantity update error:', err);
    }
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
