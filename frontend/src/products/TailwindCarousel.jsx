import axios from 'axios';
import React, { useState, useEffect } from 'react';

// Components
import ProductCard from './ProductCard';

// Design
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Carousel } from "@material-tailwind/react";

const TailwindCarousel = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    console.log("useEffect for fetchProducts");

    // Fetch product data once when the component loads
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}products/bestsellers`);
        setProducts(response.data);
      } catch (e) {
        console.log('Error fetching carousel products:', e);
      }
    };

    fetchProducts();
  }, []);
  return (
    <div id="parent" className="p-6 bg-gray-50">
      <h2 className="text-[48px] text-colour-4 rubik-80s-fade-regular text-center mb-4">Bestsellers</h2>
      {products.length > 0 &&
        <div id="carousel" className="w-full relative h-[38rem] overflow-hidden">
          <Carousel
            autoplay={true}
            autoplayDelay={3000}
            loop={true}
            className="rounded-xl"
            navigation={({ setActiveIndex, activeIndex, length }) => (
              <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                {new Array(length).fill("").map((_, i) => (
                  <span
                    key={i}
                    className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                      activeIndex === i ? "w-8 bg-colour-3" : "w-4 bg-colour-3/50"
                    }`}
                    onClick={() => setActiveIndex(i)}
                  />
                ))}
              </div>
            )}
            prevArrow={({ handlePrev }) => (
              <button className="!absolute top-[37.5%] left-4 h-10 w-10 bg-colour-4 bg-opacity-25 flex items-center justify-center rounded-3xl hover:border hover:border-colour-3">
                <ChevronLeft
                  color="white"
                  onClick={handlePrev}
                />
              </button>
            )}
            nextArrow={({ handleNext }) => (
              <button className="!absolute top-[37.5%] !right-4 h-10 w-10 bg-colour-4 bg-opacity-25 flex items-center justify-center rounded-3xl hover:border hover:border-colour-3">
                <ChevronRight
                  color="white"
                  onClick={handleNext}
                >
                </ChevronRight>
              </button>
            )}
          >
            <div className="flex w-full">
              {products[0].map(product => (
                <div className="w-1/3" key={product.id}>
                  <ProductCard product={product} height={"h-[34rem]"}/>
                </div>
              ))}
            </div>
            <div className="flex w-full">
              {products[1].map(product => (
                <div className="w-1/3" key={product.id}>
                  <ProductCard product={product} height={"h-[34rem]"}/>
                </div>
              ))}
            </div>
            <div className="flex w-full">
              {products[2].map(product => (
                <div className="w-1/3" key={product.id}>
                  <ProductCard product={product} height={"h-[34rem]"}/>
                </div>
              ))}
            </div>
            <div className="flex w-full">
              {products[3].map(product => (
                <div className="w-1/3" key={product.id}>
                  <ProductCard product={product} height={"h-[34rem]"}/>
                </div>
              ))}
            </div>
          </Carousel>
        </div>
      }
    </div>
  )
}

export default TailwindCarousel