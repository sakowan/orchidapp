import axios from 'axios';
import React, { useState, useEffect } from 'react';

// Components
import ProductCard from './ProductCard';

// Design
import { Carousel } from 'flowbite';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { carousel } from '@material-tailwind/react';

const ProductCarousel = () => {
  const [products, setProducts] = useState([]);
  const [items, setItems] = useState([]);
  const $prevButton = document.getElementById('data-carousel-prev');
  const $nextButton = document.getElementById('data-carousel-next');

  const createCarouselDivs = (chunk, x) => {
    console.log("Function: createCarouselDivs");

    return (
      <div key={`chunk_${x}`}>
        {chunk.map((prod, y) => (
          <ProductCard key={`prod_${y}`} product={prod} />
        ))}
      </div>
    );
  };

  const initCarouselItems = () => {
    console.log("Function: initCarouselItems");

    const tempItems = [];
    for (let i = 0; i < products.length; i++) {
      const item = createCarouselDivs(products[i], i);
      let obj = {
        position: i,
        el: item
      }
      
      tempItems.push(obj);
    }
    setItems(tempItems);
  };

  useEffect(() => {
    console.log("useEffect for fetchProducts");

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
    if (products.length > 0) {
      console.log("useEffect for Products");
      initCarouselItems();
      // console.log('products', products[0])
    }
  }, [products]);

  useEffect(() => {
    if (items.length > 0 && products.length > 0) {
      const carouselElement = document.getElementById('carousel-example');
      const items = [
          {
              position: 0,
              el: document.getElementById('carousel-item-1'),
          },
          {
              position: 1,
              el: document.getElementById('carousel-item-2'),
          },
          {
              position: 2,
              el: document.getElementById('carousel-item-3'),
          },
          {
              position: 3,
              el: document.getElementById('carousel-item-4'),
          },
      ];
      const carousel = new Carousel(carouselElement, items);
      $prevButton.addEventListener('click', () => {
        carousel.prev();
      });
    
      $nextButton.addEventListener('click', () => {
          carousel.next();
      });
    }
  }, [items]);

  return (
    <div id="parent" className="p-6 bg-gray-50">
      <h2 className="text-[36px] text-colour-4 rubik-80s-fade-regular text-center">Bestsellers</h2>
      <div id="carousel-example" className="w-full relative h-[44rem] overflow-hidden">
        {products.length > 0 && 
        <div>
          <div id="carousel-item-1" className="flex w-full hidden duration-700 ease-in-out">
            {products[0].map(product => (
              <div>
                <ProductCard product={product}/>
              </div>
            ))}
          </div>
          <div id="carousel-item-2" className="flex w-full hidden duration-700 ease-in-out">
            {products[1].map(product => (
              <div>
                <ProductCard product={product}/>
              </div>
            ))}
          </div>
          <div id="carousel-item-3" className="flex w-full hidden duration-700 ease-in-out">
            {products[2].map(product => (
              <div>
                <ProductCard product={product}/>
              </div>
            ))}
          </div>
          <div id="carousel-item-4" className="flex w-full hidden duration-700 ease-in-out">
            {products[3].map(product => (
              <div>
                <ProductCard product={product}/>
              </div>
            ))}
          </div>
        </div>
        }
        {/* Carousel Navigation Controls */}
        <button id="data-carousel-prev" className="absolute z-[999] left-0 top-[50%] bg-gray-100 rounded-3xl w-10 h-10 flex items-center justify-center border border-colour-4 border-2"> 
          <ChevronLeft />
        </button>
        <button id="data-carousel-next" className="absolute z-[999] right-0 top-[50%] bg-gray-100 rounded-3xl w-10 h-10 flex items-center justify-center border border-colour-4 border-2">
          <ChevronRight />
        </button>
      </div>

    </div>
  );
};

export default ProductCarousel;
