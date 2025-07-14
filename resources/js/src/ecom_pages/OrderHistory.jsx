import React, { useEffect, useState } from 'react';
import { Button, Collapse, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const BASE_URL = "http://localhost:8000/api";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const userId = localStorage.getItem('user_id') || 1;
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${BASE_URL}/orders`, {
        credentials: 'include',
      });
      const data = await res.json();
      setOrders(data.orders || []);
    } catch (err) {
      console.error('❌ Failed to load orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleOrderDetails = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>📦 Order History</h4>
        <Button variant="secondary" onClick={() => navigate('/product')}>
          ← Back to Products
        </Button>
      </div>

      {loading ? (
        <Spinner animation="border" />
      ) : orders.length === 0 ? (
        <div>No orders found.</div>
      ) : (
        <ul className="list-group">
          {orders.map((order) => (
            <li className="list-group-item mb-3" key={order.id}>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <strong>Order #{order.id}</strong><br />
                  Total: ₹{order.total_price}<br />
                  Date: {new Date(order.created_at).toLocaleString()}
                </div>
                <Button
                  variant="outline-primary"
                  onClick={() => toggleOrderDetails(order.id)}
                >
                  {expandedOrderId === order.id ? 'Hide' : 'Preview'}
                </Button>
              </div>

              <Collapse in={expandedOrderId === order.id}>
                <div className="mt-3">
                  <table className="table table-bordered table-sm">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Qty</th>
                        <th>Price</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items.map((item) => (
                        <tr key={item.id}>
                          <td>{item.product?.name || 'N/A'}</td>
                          <td>{item.quantity}</td>
                          <td>₹{item.price}</td>
                          <td>₹{item.price * item.quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Collapse>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderHistory;
