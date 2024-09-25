import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

// Components
import CartDrawer from './cart/CartDrawer';
import Footer from './Footer'
import ProductCarousel from './products/ProductCarousel';

// Design
import { ChevronsDown } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const [newProds, setNewProds] = useState([])
  useEffect(() => {
    const getWhatsNew = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_API_URL + "products")
        setNewProds(response.data)
      } catch (e) {
        console.log('Error fetching whats new:', e)
      }
    }
    getWhatsNew();
  }, []);

  function shopNow() {
    navigate("/products");
  }
  return (
    <div className="flex flex-col min-h-screen">
      <CartDrawer/>
      {/* Main Content */}
      <div className="flex-grow w-screen">
        <div className='flex w-full h-full justify-center items-center mx-auto h-[80%] animate-zoomOut'>
          <video
            src="/src/assets/videos/video1.mov"
            autoPlay
            loop
            muted
            playsInline
            className="w-screen opacity-85"
          />
          <div className="absolute flex flex-col justify-center items-center text-white ">
            <h1 className="text-[300px] rubik-80s-fade-regular">Orchid</h1>
            <div className="animate-pulse flex flex-col items-center">
              <p className="text-[25px] rubik-80s-fade-regular">Scroll down</p>
              <ChevronsDown/>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center w-full p-8 bg-[url('/src/assets/images/bg4_transparent.png')] bg-cover bg-center ">
          <div className="w-1/2 h-full">
            <div className="flex flex-col">
              <img src="/src/assets/images/stock/palette1.webp" className="h-[42rem] w-[38rem]"></img>
            </div>
          </div>
          <div className="flex flex-col justify-center w-1/2 text-gray-700">
          <h2 className="text-[36px] text-colour-4 rubik-80s-fade-regular">Just in!</h2>
          <h2 className="text-[36px] rubik-80s-fade-regular">Retro eyeshadow pallete</h2>
          <p>Dive into the vibrant essence of the 80s with our "Retro Eyeshadow Palette," a dazzling collection inspired by the neon lights and bustling streets of Tokyo.</p>
          </div>
        </div>

        <ProductCarousel/>
      </div>
      {/* Footer */}
      <Footer/>
    </div>
  )
}

export default Home;
