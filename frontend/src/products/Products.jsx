import axios from 'axios'
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import MainBody from '../MainBody'
import ProductCard from './ProductCard'

const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data once when the app loads
    const fetchProducts = async () => {
      try{
        const response = await axios.get(import.meta.env.VITE_API_URL + "products")
        setProducts(response.data)
      } catch (e) {
          console.log('Error fetching product listings:', e)
      }
    };

    fetchProducts();
  }, []);

  const goProductView = (product) => {
    navigate(`/products/${product.url_name}`, { state: { product } });
  };

  return (
    <MainBody>
      <ul className='flex flex-wrap items-center justify-center -mx-6 mt-[2.1rem]'>
        {products.map(product => (
          <li onClick={() => goProductView(product)} className="w-1/3" key={product.id}>
            <ProductCard product={product}/>
          </li>
        ))}
      </ul>
    </MainBody>
  );
};

export default Products;
