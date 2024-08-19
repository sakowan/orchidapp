import api from "./api"
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import MainBody from './MainBody'
import ProductCard from './ProductCard'
import ProductView from './ProductView'

const ProductListings = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data once when the app loads
    const fetchProducts = async () => {
      try{
        const response = await api.get("product_listings")
        setProducts(response.data)
      } catch (e) {
          console.log('Error fetching product listings:', e)
      }
    };

    fetchProducts();
  }, []);

  const goProductView = (product) => {
    console.log(product.name);
    navigate(`/product_listings/${product.url_name}`, { state: { product } });
    // navigate to the product view, e.g., navigate(`/products/${product.url_name}`);
  };

  return (
    <MainBody>
      <ul className='flex flex-wrap items-center justify-center -mx-4'>
        {products.map(product => (
          <li onClick={() => goProductView(product)} className="w-1/3" key={product.id}>
            <ProductCard product={product}/>
          </li>
        ))}
      </ul>
    </MainBody>
  );
};

export default ProductListings;
