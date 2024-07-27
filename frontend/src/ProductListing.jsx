import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard'
import axios from 'axios';

const ProductListing = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch products data when the component mounts
        axios.get('http://127.0.0.1:8000/api/product_listings')
          .then(response => {
            setProducts(response.data); // Set response data to products
            setLoading(false);
          })
          .catch(error => {
            setError(error);
            setLoading(false);
          });
      }, []); // Empty dependency array means this effect runs only once after the initial render
    
      if (loading) return <div>Loading...</div>;
      if (error) return <div>Error: {error.message}</div>;
    
      return (
        <div className='flex items-center justify-center'>
          <ul className='flex flex-wrap'>
            {products.map(product => (
              <li key={product.id}>
                <ProductCard product={product}/>
              </li>
            ))}
          </ul>
        </div>
      );
};

export default ProductListing;
