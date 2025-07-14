// import React, { useEffect, useState } from 'react';
// import Sidebar from './Sidebar';
// import { Button, Table, Spinner, Modal, Form } from 'react-bootstrap';
// import ProductFormModal from './ProductFormModal';

// const BASE_URL = 'https://ecom-6ffz.onrender.com/api';

// const AdminProductList = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [editing, setEditing] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   const fetchProducts = async () => {
//     try {
//       const res = await fetch(`${BASE_URL}/products`);
//       const data = await res.json();
//       setProducts(data.data);
//     } catch (err) {
//       console.error('❌ Failed to load products:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const handleDelete = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this product?')) return;
//     try {
//       await fetch(`${BASE_URL}/products/${id}`, {
//         method: 'DELETE',
//         credentials: 'include',
//       });
//       fetchProducts();
//     } catch (err) {
//       alert('Delete failed');
//     }
//   };

//   const handleEdit = (product) => {
//     setEditing(product);
//     setShowModal(true);
//   };

//   const handleModalClose = () => {
//     setEditing(null);
//     setShowModal(false);
//   };

//   return (
//     <div className="d-flex">
//       <Sidebar />
//       <div className="flex-grow-1 p-4 bg-light" style={{ minHeight: '100vh', marginLeft: '250px' }}>
//         <div className="d-flex justify-content-between mb-3">
//           <h4>🛍 Product List</h4>
//           <Button onClick={() => setShowModal(true)}>➕ Add Product</Button>
//         </div>

//         {loading ? (
//           <Spinner />
//         ) : (
//           <Table bordered hover>
//             <thead>
//               <tr>
//                 <th>#</th>
//                 <th>Preview</th>
//                 <th>Name</th>
//                 <th>Price</th>
//                 <th>Category</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {products.map((p) => (
//                 <tr key={p.id}>
//                   <td>{p.id}</td>
//                   <td>
//                     {p.image && (
//                       <img src={`https://ecom-6ffz.onrender.com/${p.image}`} alt="product" width="50" />
//                     )}
//                   </td>
//                   <td>{p.name}</td>
//                   <td>₹{p.price}</td>
//                   <td>{p.categories}</td>
//                   <td>
//                     <Button size="sm" variant="warning" onClick={() => handleEdit(p)}>
//                       Edit
//                     </Button>{' '}
//                     <Button size="sm" variant="danger" onClick={() => handleDelete(p.id)}>
//                       Delete
//                     </Button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         )}

//         {showModal && (
//           <ProductFormModal
//             product={editing}
//             onClose={handleModalClose}
//             onSaved={() => {
//               fetchProducts();
//               handleModalClose();
//             }}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminProductList;



import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { Button, Table, Spinner } from 'react-bootstrap';
import ProductFormModal from './ProductFormModal';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './Dashboard.css';

const BASE_URL = 'https://ecom-6ffz.onrender.com/api';

const AdminProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${BASE_URL}/products`);
      const data = await res.json();
      setProducts(data.data);
    } catch (err) {
      console.error('❌ Failed to load products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await fetch(`${BASE_URL}/products/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      fetchProducts();
    } catch (err) {
      alert('Delete failed');
    }
  };

  const handleEdit = (product) => {
    setEditing(product);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setEditing(null);
    setShowModal(false);
  };

  return (
    <div className="d-flex">
      {/* Desktop Sidebar */}
      <div className="d-none d-md-block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="sidebar-overlay sidebar-visible d-md-none">
          <Sidebar closeSidebar={() => setSidebarOpen(false)} />
        </div>
      )}

      <div className="flex-grow-1 p-3 bg-light container-fluid">
        {/* Toggle Button for Mobile */}
        <Button
          variant="outline-primary"
          className="d-md-none mb-3"
          onClick={() => setSidebarOpen(true)}
        >
          ☰ Menu
        </Button>

        <div className="d-flex justify-content-between mb-3 flex-wrap gap-2">
          <h4>🛍 Product List</h4>
          <Button onClick={() => setShowModal(true)}>➕ Add Product</Button>
        </div>

        {loading ? (
          <Spinner animation="border" />
        ) : (
          <div className="table-responsive">
            <Table bordered hover className="align-middle">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Preview</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>
                      {p.image && (
                        <img
                          src={`https://ecom-6ffz.onrender.com/${p.image}`}
                          alt="product"
                          width="50"
                          height="50"
                          style={{ objectFit: 'cover' }}
                        />
                      )}
                    </td>
                    <td>{p.name}</td>
                    <td>₹{p.price}</td>
                    <td>{p.categories}</td>
                    <td>
                      <Button
                        size="sm"
                        variant="warning"
                        onClick={() => handleEdit(p)}
                        className="me-2"
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => handleDelete(p.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}

        {showModal && (
          <ProductFormModal
            product={editing}
            onClose={handleModalClose}
            onSaved={() => {
              fetchProducts();
              handleModalClose();
            }}
          />
        )}
      </div>
    </div>
  );
};

export default AdminProductList;
