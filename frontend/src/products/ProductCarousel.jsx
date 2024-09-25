import axios from 'axios';
import React, { useState, useEffect } from 'react'

// Design
import { ChevronLeft } from 'lucide-react';
import { ChevronRight } from 'lucide-react';

const ProductCarousel = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    // Fetch user data once when the app loads
    const fetchProducts = async () => {
      try{
        const response = await axios.get(import.meta.env.VITE_API_URL + "products")
        console.log('Carousel', response.data)
        setProducts(response.data)
      } catch (e) {
          console.log('Error fetching carousel products:', e)
      }
    };

    fetchProducts();
  }, []);

  return (
  <div className="flex flex-col bg-my-muted w-full p-8 justify-center items-center">
    <h1 className="text-[36px] text-gray-700 rubik-80s-fade-regular">Best sellers</h1>
    
    <div id="controls-carousel" className="relative w-full" data-carousel="static">
      <div className="relative h-56 w-full overflow-hidden rounded-lg md:h-96">

          <div className="duration-700 ease-in-out" data-carousel-item>
              <img src="/src/assets/images/stock/girl1.jpg"></img>
          </div>

          <div className="duration-700 ease-in-out" data-carousel-item="active">
              <img src="/src/assets/images/stock/girl2.jpg"></img>
          </div>
      </div>

      <button type="button" className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none">
              <ChevronLeft className="text-white"/>
          </span>
      </button>
      <button type="button" className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none">
              <ChevronRight className="text-white"/>
          </span>
      </button>
    </div>
  </div>
  )
}

export default ProductCarousel