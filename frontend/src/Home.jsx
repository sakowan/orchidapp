import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard'
import axios from 'axios'

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
    <div className="w-screen h-screen flex flex-col">
      <div className='flex justify-center mx-auto relative top-[7.6rem] w-[98%] h-3/4 bg-white animate-zoomOut'>
        <div id="banner1" className="flex justify-center w-full h-full bg-[url('/src/assets/images/bg4_transparent.png')] bg-cover bg-center rounded-lg">
          <div className='w-1/2 h-full flex flex-col items-center justify-center'>
            <h1 className="home-h1">Introducing Orchid</h1>
            <h2 className='text-colour-7'>
              Explore our collection for a subtle blend of feminine grace and soft allure.
            </h2>
            <button 
            className='home-shopnow-btn'
            onClick={() => shopNow()}
            >Shop Now</button>
          </div>
          <div className='w-1/2 h-full flex justify-center relative'>
            <img className="absolute w-[42rem] z-1 rotate-[25deg]" src="/src/assets/images/stock/pinkcircle.png"/>
            <img className="opacity-95 h-full z-10" src="/src/assets/images/stock/girl5.png" alt="Girl" />

            <img className="absolute w-[15rem] right-[20%] rotate-[-45deg] z-10" src="/src/assets/images/stock/flower1.png"/>
            <img className="absolute w-[17rem] bottom-0 left-[15%] rotate-[-30deg] z-10" src="/src/assets/images/stock/moon.png"/>

          </div>
        </div>
      </div>

      <div id="banner2" className="flex flex-col items-center justify-center w-[98%] h-3/4 mx-auto mt-[10rem] border border-gray-400">
        <h1 className="home-h1">What's New</h1>
        <div id="new-products" className='flex justify-center'>


        </div>
      </div>
    </div>
  )
}

export default Home