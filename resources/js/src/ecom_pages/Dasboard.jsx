// import React, { useEffect, useState } from "react";
// import Sidebar from "./Sidebar";

// const BASE_URL = "https://ecom-6ffz.onrender.com/api";

// const Dashboard = () => {
//   const [data, setData] = useState(null);
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   useEffect(() => {
//     fetch(`${BASE_URL}/dashboard`)
//       .then((res) => res.json())
//       .then(setData)
//       .catch((err) => console.error("Dashboard fetch error:", err));
//   }, []);

//   if (!data)
//     return (
//       <div className="p-4 dashboard-main">Loading dashboard...</div>
//     );

//   return (
//     <div className="dashboard d-flex">
//       {/* Toggle Button for Mobile */}
//       <button
//         className="toggle-btn d-md-none"
//         onClick={() => setSidebarOpen(!sidebarOpen)}
//       >
//         ☰
//       </button>

//       <Sidebar isOpen={sidebarOpen} closeSidebar={() => setSidebarOpen(false)} />

//       <div className="flex-grow-1 p-4 bg-light dashboard-main">
//         <h2 className="mb-4">📊 Admin Dashboard</h2>

//         <div className="row g-3 mb-4">
//           <StatCard label="Total Products" value={data.total_products} color="primary" />
//           <StatCard label="Total Orders" value={data.total_orders} color="success" />
//           <StatCard label="Total Users" value={data.total_users} color="warning" />
//           <StatCard label="Total Sales" value={`₹${data.total_sales}`} color="danger" />
//         </div>

//         <div className="row g-3 mb-4">
//           <StatCard label="Today's Orders" value={data.todays_orders} color="info" />
//           <StatCard label="Today's Sales" value={`₹${data.todays_sales}`} color="secondary" />
//           <StatCard label="Total Buyers" value={data.total_buyers} color="dark" />
//           <StatCard label="Total Sellers" value={data.total_sellers} color="light" textColor="black" />
//         </div>

//         {data.top_selling_product && (
//           <div className="alert alert-info">
//             🥇 Top Product: <strong>{data.top_selling_product.name}</strong> sold {data.top_selling_product.quantity} times
//           </div>
//         )}

//         <h5 className="mb-3">🆕 Latest Orders</h5>

//         <div className="table-responsive">
//           <table className="table table-bordered table-sm table-hover text-nowrap">
//             <thead className="table-light">
//               <tr>
//                 <th>Order ID</th>
//                 <th>Date</th>
//                 <th>Total</th>
//                 <th>Items</th>
//               </tr>
//             </thead>
//             <tbody>
//               {data.latest_orders.map((order) => (
//                 <tr key={order.id}>
//                   <td>{order.id}</td>
//                   <td>{new Date(order.created_at).toLocaleString()}</td>
//                   <td>₹{order.total_price}</td>
//                   <td>{order.items.map((i) => i.product?.name).join(", ")}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// const StatCard = ({ label, value, color, textColor = "white" }) => (
//   <div className="col-6 col-md-3">
//     <div className={`card bg-${color} text-${textColor}`}>
//       <div className="card-body text-center py-3">
//         <h6 className="card-title">{label}</h6>
//         <h4 className="card-text">{value}</h4>
//       </div>
//     </div>
//   </div>
// );

// export default Dashboard;



import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import 'bootstrap/dist/css/bootstrap.min.css';
// import './Dashboard.css'; // Custom CSS for sidebar animation

const BASE_URL = "https://ecom-6ffz.onrender.com/api";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetch(`${BASE_URL}/dashboard`)
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error("Dashboard fetch error:", err));
  }, []);

  if (!data)
    return (
      <div className="p-4 dashboard-main">Loading dashboard...</div>
    );

  return (
    <div className="dashboard d-flex">
      {/* Sidebar for Desktop */}
      <div className="d-none d-md-block">
        <Sidebar />
      </div>

      {/* Sidebar for Mobile */}
      {sidebarOpen && (
        <div className="sidebar-overlay sidebar-visible d-md-none">
          <Sidebar closeSidebar={() => setSidebarOpen(false)} />
        </div>
      )}

      <div className="flex-grow-1 p-3 bg-light dashboard-main container-fluid">
        {/* Toggle Button for Mobile */}
        <button
          className="btn btn-outline-primary d-md-none mb-3"
          onClick={() => setSidebarOpen(true)}
        >
          ☰ Menu
        </button>

        <h2 className="mb-4">📊 Admin Dashboard</h2>

        <div className="row g-3 mb-4">
          <StatCard label="Total Products" value={data.total_products} color="primary" />
          <StatCard label="Total Orders" value={data.total_orders} color="success" />
          <StatCard label="Total Users" value={data.total_users} color="warning" />
          <StatCard label="Total Sales" value={`₹${data.total_sales}`} color="danger" />
        </div>

        <div className="row g-3 mb-4">
          <StatCard label="Today's Orders" value={data.todays_orders} color="info" />
          <StatCard label="Today's Sales" value={`₹${data.todays_sales}`} color="secondary" />
          <StatCard label="Total Buyers" value={data.total_buyers} color="dark" />
          <StatCard label="Total Sellers" value={data.total_sellers} color="light" textColor="black" />
        </div>

        {data.top_selling_product && (
          <div className="alert alert-info">
            🥇 Top Product: <strong>{data.top_selling_product.name}</strong> sold {data.top_selling_product.quantity} times
          </div>
        )}

        <h5 className="mb-3">🆕 Latest Orders</h5>

        <div className="table-responsive">
          <table className="table table-bordered table-sm table-hover text-nowrap">
            <thead className="table-light">
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Total</th>
                <th>Items</th>
              </tr>
            </thead>
            <tbody>
              {data.latest_orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{new Date(order.created_at).toLocaleString()}</td>
                  <td>₹{order.total_price}</td>
                  <td>{order.items.map((i) => i.product?.name).join(", ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, color, textColor = "white" }) => (
  <div className="col-6 col-md-3">
    <div className={`card bg-${color} text-${textColor}`}>
      <div className="card-body text-center py-3">
        <h6 className="card-title">{label}</h6>
        <h4 className="card-text">{value}</h4>
      </div>
    </div>
  </div>
);

export default Dashboard;
