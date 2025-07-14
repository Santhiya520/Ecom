// import React, { useEffect, useState } from 'react';
// import { Spinner, Table, Button, Collapse } from 'react-bootstrap';
// import Sidebar from './Sidebar';

// const BASE_URL = "https://ecom-6ffz.onrender.com/api";

// const AdminOrderList = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [expanded, setExpanded] = useState(null);

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const fetchOrders = async () => {
//     try {
//       const res = await fetch(`${BASE_URL}/all/orders`, {
//         credentials: 'include',
//       });
//       const data = await res.json();
//       console.log({data});
//       setOrders(data || []);
//     } catch (err) {
//       console.error('❌ Error loading orders:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const toggleExpand = (orderId) => {
//     setExpanded(expanded === orderId ? null : orderId);
//   };

//   return (
//     <div className="d-flex">
//       <Sidebar />

//       <div className="flex-grow-1 p-4 bg-light"  style={{ minHeight: '100vh', marginLeft: '250px' }}>
//         <h4 className="mb-4">📋 Order List</h4>

//         {loading ? (
//           <Spinner animation="border" />
//         ) : (
//           <Table striped bordered hover>
//             <thead>
//               <tr>
//                 <th>#Order</th>
//                 <th>Customer</th>
//                 <th>Total</th>
//                 <th>Date</th>
//                 <th>Details</th>
//               </tr>
//             </thead>
//             <tbody>
//               {orders.map((order) => (
//                 <React.Fragment key={order.id}>
//                   <tr>
//                     <td>{order.id}</td>
//                     <td>{order.user?.name || 'Guest'}</td>
//                     <td>₹{order.total_price}</td>
//                     <td>{new Date(order.created_at).toLocaleString()}</td>
//                     <td>
//                       <Button size="sm" onClick={() => toggleExpand(order.id)} variant="info">
//                         {expanded === order.id ? 'Hide' : 'View'}
//                       </Button>
//                     </td>
//                   </tr>
//                   <tr>
//                     <td colSpan="5" style={{ padding: 0, border: 0 }}>
//                       <Collapse in={expanded === order.id}>
//                         <div className="p-3 bg-white">
//                           <strong>Items:</strong>
//                           <Table size="sm" className="mt-2">
//                             <thead>
//                               <tr>
//                                 <th>Product</th>
//                                 <th>Qty</th>
//                                 <th>Price</th>
//                                 <th>Subtotal</th>
//                               </tr>
//                             </thead>
//                             <tbody>
//                               {order.items.map((item) => (
//                                 <tr key={item.id}>
//                                   <td>{item.product?.name || 'N/A'}</td>
//                                   <td>{item.quantity}</td>
//                                   <td>₹{item.price}</td>
//                                   <td>₹{item.quantity * item.price}</td>
//                                 </tr>
//                               ))}
//                             </tbody>
//                           </Table>
//                         </div>
//                       </Collapse>
//                     </td>
//                   </tr>
//                 </React.Fragment>
//               ))}
//             </tbody>
//           </Table>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminOrderList;


import React, { useEffect, useState } from 'react';
import { Spinner, Table, Button, Collapse } from 'react-bootstrap';
import Sidebar from './Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';

const BASE_URL = "https://ecom-6ffz.onrender.com/api";

const AdminOrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${BASE_URL}/all/orders`, {
        credentials: 'include',
      });
      const data = await res.json();
      setOrders(data || []);
    } catch (err) {
      console.error('❌ Error loading orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (orderId) => {
    setExpanded(expanded === orderId ? null : orderId);
  };

  return (
    <div className="d-flex">
      {/* Sidebar for desktop */}
      <div className="d-none d-md-block">
        <Sidebar />
      </div>

      {/* Sidebar for mobile */}
      {sidebarOpen && (
        <div className="sidebar-overlay sidebar-visible d-md-none">
          <Sidebar closeSidebar={() => setSidebarOpen(false)} />
        </div>
      )}

      <div className="flex-grow-1 p-3 bg-light container-fluid" style={{ minHeight: '100vh' }}>
        {/* Toggle Button for Mobile */}
        <Button
          variant="outline-primary"
          className="d-md-none mb-3"
          onClick={() => setSidebarOpen(true)}
        >
          ☰ Menu
        </Button>

        <h4 className="mb-4">📋 Order List</h4>

        {loading ? (
          <Spinner animation="border" />
        ) : (
          <div className="table-responsive">
            <Table striped bordered hover className="align-middle">
              <thead>
                <tr>
                  <th>#Order</th>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Date</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <React.Fragment key={order.id}>
                    <tr>
                      <td>{order.id}</td>
                      <td>{order.user?.name || 'Guest'}</td>
                      <td>₹{order.total_price}</td>
                      <td>{new Date(order.created_at).toLocaleString()}</td>
                      <td>
                        <Button size="sm" onClick={() => toggleExpand(order.id)} variant="info">
                          {expanded === order.id ? 'Hide' : 'View'}
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="5" style={{ padding: 0, border: 0 }}>
                        <Collapse in={expanded === order.id}>
                          <div className="p-3 bg-white">
                            <strong>Items:</strong>
                            <Table size="sm" className="mt-2">
                              <thead>
                                <tr>
                                  <th>Product</th>
                                  <th>Qty</th>
                                  <th>Price</th>
                                  <th>Subtotal</th>
                                </tr>
                              </thead>
                              <tbody>
                                {order.items.map((item) => (
                                  <tr key={item.id}>
                                    <td>{item.product?.name || 'N/A'}</td>
                                    <td>{item.quantity}</td>
                                    <td>₹{item.price}</td>
                                    <td>₹{item.quantity * item.price}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </Table>
                          </div>
                        </Collapse>
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrderList;
