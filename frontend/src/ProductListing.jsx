import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard'
import axios from 'axios';

const ProductListing = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch products data when the component mounts
        axios.get('http://127.0.0.1:8000/api/product_listings')
          .then(response => {
            setProducts(response.data); // Set response data to products
          })
          .catch(error => {
            setError(error);
          });
      }, []); // Empty dependency array means this effect runs only once after the initial render
    
      if (error) return <div>Error: {error.message}</div>;
    
      return (
        <ul className='flex flex-wrap items-center justify-center -mx-4'>
          {products.map(product => (
            <li className="w-1/3" key={product.id}>
              <ProductCard product={product}/>
            </li>
          ))}
        </ul>
      );
};

export default ProductListing;
