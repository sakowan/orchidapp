import axios from 'axios'
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import MainBody from '../MainBody'
import ProductCard from './ProductCard'
import CartDrawer from '../cart/CartDrawer'
import Footer from '../Footer'

// Design
import { Search } from 'lucide-react';

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
    <div>
      <MainBody>
        <CartDrawer/>
        <div className="flex items-center w-full my-6 h-14 p-4 border-b border-gray-200 space-x-2 text-gray-400">
          <Search/>
          <input className="w-full h-full text-gray-700 focus:outline-none"type="text" placeholder='Looking for something?'/>
        </div>
        <ul className='flex flex-wrap items-center justify-center -mx-6'>
          {products.map(product => (
            <li onClick={() => goProductView(product)} className="w-1/3" key={product.id}>
              <ProductCard product={product}/>
            </li>
          ))}
        </ul>
      </MainBody>
      <Footer/>
    </div>
  );
};

export default Products;
