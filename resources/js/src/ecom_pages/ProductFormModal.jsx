import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const BASE_URL = 'https://ecom-6ffz.onrender.com/api';

const CATEGORIES = ['Electronics', 'Cloths', 'Fruits'];

const ProductFormModal = ({ product, onClose, onSaved }) => {
  const isEdit = !!product;
  const [form, setForm] = useState({
    name: product?.name || '',
    price: product?.price || '',
    categories: product?.categories || '',
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('price', form.price);
    formData.append('categories', form.categories);
    if (image) formData.append('image', image);

    try {
      const res = await fetch(`${BASE_URL}/products${isEdit ? '/' + product.id : ''}`, {
        method: isEdit ? 'POST' : 'POST',
        body: formData,
        credentials: 'include',
        headers: isEdit ? { 'X-HTTP-Method-Override': 'PUT' } : undefined,
      });

      const data = await res.json();
      if (res.ok) {
        alert('✅ Product saved successfully');
        onSaved();
      } else {
        alert(`❌ Error: ${data.message}`);
      }
    } catch (err) {
      console.error('Save failed:', err);
    }
  };

  return (
    <Modal show onHide={onClose}>
      <Form onSubmit={handleSubmit} encType="multipart/form-data">
        <Modal.Header closeButton>
          <Modal.Title>{isEdit ? '✏️ Edit' : '➕ Add'} Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-2">
            <Form.Label>Name</Form.Label>
            <Form.Control name="name" value={form.name} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Price</Form.Label>
            <Form.Control name="price" value={form.price} onChange={handleChange} required type="number" />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Category</Form.Label>
            <Form.Select name="categories" value={form.categories} onChange={handleChange} required>
              <option value="">-- Select Category --</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Image</Form.Label>
            <Form.Control type="file" onChange={handleFileChange} />
            {product?.image && (
              <img
                src={`https://ecom-6ffz.onrender.com/${product.image}`}
                alt="current"
                width="100"
                className="mt-2"
              />
            )}
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>Close</Button>
          <Button type="submit" variant="primary">{isEdit ? 'Update' : 'Create'}</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ProductFormModal;
