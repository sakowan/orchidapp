import axios from 'axios';
import React, { useState, useEffect } from 'react';

// Components
import ProductCard from './ProductCard';

// Design
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ProductCarousel = () => {
  const [products, setProducts] = useState([]);
  const [currentCar, setCurrentCar] = useState(0)

  const prevCar = () => {
    let nextCar = currentCar-1
    if(currentCar == 0){
      nextCar = 3
    }
    setCurrentCar(nextCar)
    document.getElementById(`car_${currentCar}`).classList.add('transform', '-translate-x-[100%]')
    document.getElementById(`car_${nextCar}`).classList.remove('hidden')
  }

  const nextCar = () => {
    let nextCar = currentCar+1
    if(currentCar == 3){
      nextCar = 0
    }
    setCurrentCar(nextCar)
    document.getElementById(`car_${currentCar}`).classList.add('hidden')
    document.getElementById(`car_${nextCar}`).classList.remove('hidden')
  }

  useEffect(() => {
    // Fetch product data once when the component loads
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}products/bestsellers`);
        console.log('Carousel', response.data);
        setProducts(response.data);
      } catch (e) {
        console.log('Error fetching carousel products:', e);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let currentCar = document.getElementById("car_0")
    for(let i=1; i<products.length; i++){
      let hideCar = document.getElementById(`car_${i}`)
      hideCar.classList.add('hidden')
    }
    console.log(currentCar)

  }, [products])

  return (
    <div className="flex flex-col bg-my-muted w-full p-8 justify-center items-center">
      <h1 className="text-[36px] mb-4 text-gray-700 rubik-80s-fade-regular">Best Sellers</h1>
      
      <div id="controls-carousel" className="relative w-full" data-carousel="static">
        {products.map((chunk, index) => (
          <div id={`car_${index}`} key={index} className="flex w-full items-center justify-center duration-700 ease-in-out" data-carousel-item>
            {chunk.map((p) => (
              <ProductCard key={p.id} product={p} className="!w-[10rem]" />
            ))}
          </div>
        ))}

        <button onClick={prevCar} type="button" className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-colour-2/30 group-hover:bg-colour-4/50 group-focus:outline-none">
            <ChevronLeft className="text-white" />
          </span>
        </button>
        
        <button onClick={nextCar} type="button" className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-colour-2/30 group-hover:bg-colour-4/50 group-focus:outline-none">
            <ChevronRight className="text-white" />
          </span>
        </button>
      </div>
    </div>
  );
};

export default ProductCarousel;
