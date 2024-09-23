import axios from 'axios'
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import ProductCard from './ProductCard'
import CartDrawer from '../cart/CartDrawer'
import Footer from '../Footer'

// Design
import { Search } from 'lucide-react';

const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');

  const searchProduct = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    <div className="px-10">
      <CartDrawer/>
      <div className="flex items-center w-full my-6 h-14 p-4 border-b border-gray-200 space-x-2 text-gray-400">
        <Search/>
        <input
        value={searchTerm} 
        onChange={searchProduct} 
        type="text" placeholder='Looking for something?'
        className="w-full h-full text-gray-700 focus:outline-none"/>
      </div>
      <ul className='flex flex-wrap items-center justify-center -mx-6'>
        {filteredProducts.map(product => (
          <li onClick={() => goProductView(product)} className="w-1/3" key={product.id}>
            <ProductCard product={product}/>
          </li>
        ))}
      </ul>
      <Footer/>
    </div>
  );
};

export default Products;
