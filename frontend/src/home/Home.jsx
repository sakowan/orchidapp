import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

// Components
import CartDrawer from '../cart/CartDrawer';
import Footer from '../Footer'
import TailwindCarousel from '../products/TailwindCarousel';
import { SubscribeNewsletter } from '../mailing/SubscribeNewsletter';

// Design
import './home.css'
import { ChevronsDown } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const [newProds, setNewProds] = useState([])
  const [showNewsletter, setShowNewsletter] = useState(false)
  
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

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setShowNewsletter(true);
  //   }, 1);

  //   // Cleanup the timer on 
  //   return () => clearTimeout(timer);
  // }, []);

  function shopNow() {
    navigate("/products");
  }
  return (
    <div className="flex flex-col min-h-screen">
      <SubscribeNewsletter showNewsletter={showNewsletter}/>
      <CartDrawer/>
      {/* Main Content */}
      <div className="flex-grow w-screen">
        <div className='panel-1-vid-holder'>
          <video
            src="/src/assets/videos/video1.mov"
            autoPlay
            loop
            muted
            playsInline
            className="panel-1-vid"
          />
          <div className="panel-1-sub">
            <h1 className="text-[300px]">Orchid</h1>
            <div className="animate-pulse flex flex-col items-center">
              <h2 className="text-[25px]">Scroll down</h2>
              <ChevronsDown/>
            </div>
          </div>
        </div>
        
        <div className="panel-2-main bg-[url('/src/assets/images/bg4_transparent.png')]">
          <div className="w-1/2 h-full">
            <div className="flex flex-col">
              <img src="/src/assets/images/stock/palette1.webp" className="panel-2-img"></img>
            </div>
          </div>
          <div className="panel-2-sub">
          <h2 className="home-h2 text-colour-4">Just in!</h2>
          <h2 className="home-h2">Retro eyeshadow pallete</h2>
          <p>Dive into the vibrant essence of the 80s with our "Retro Eyeshadow Palette," a dazzling collection inspired by the neon lights and bustling streets of Tokyo.</p>
          </div>
        </div>

        <TailwindCarousel/>
      </div>
      <Footer/>
    </div>
  )
}

export default Home;
