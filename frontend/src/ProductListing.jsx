import api from "./api"
import React, { useState, useEffect } from 'react';

import MainBody from './MainBody'
import ProductCard from './ProductCard'

const ProductListing = () => {
  const [products, setProducts] = useState([]);

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
  
  return (
    <MainBody>
      <ul className='flex flex-wrap items-center justify-center -mx-4'>
        {products.map(product => (
          <li className="w-1/3" key={product.id}>
            <ProductCard product={product}/>
          </li>
        ))}
      </ul>
    </MainBody>
  );
};

export default ProductListing;
