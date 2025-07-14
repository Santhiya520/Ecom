import React from 'react'
import { useNavigate } from 'react-router-dom';
import NavbarEcom from './NavbarEcom';
import ProductList from './ProductList';
const HomeEcom = () => {
  const navigate = useNavigate(); 
  return (
    <div> 
      <NavbarEcom />
      <ProductList />
    </div>
  )
}

export default HomeEcom