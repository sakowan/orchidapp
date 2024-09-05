import api from './api'
import React, { useState, useEffect, useContext } from 'react';
import { Heart, ShoppingCart, User } from 'lucide-react';

import DropdownUser from './DropdownUser';
import { CartContext } from './CartContext';

const Navbar = () => {
  const [scrollingDown, setScrollingDown] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const { cartProds, setCartProds, numCartProds, setNumCartProds } = useContext(CartContext);
  const names = ['💸 FREE SHIPPING ON ORDERS OVER ¥2500 💸', '🚀 DELIVERY TIME 2-3 BUSINESS DAYS 🚀', '💖 SIGN UP NOW FOR ¥500 OFF YOUR FIRST PURCHASE 💖'];
  const [currentName, setCurrentName] = useState(names[0]);
  const [fade, setFade] = useState(false);
  let index = 0;

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        index = (index + 1) % names.length;
        setCurrentName(names[index]);
        setFade(true);
      }, 1000); // Match the fade duration
    }, 3500); // Interval to switch names

    return () => clearInterval(interval); // Clean up interval on unmount
  }, []);
  
  useEffect(() => {
    const fetchCartProds = async () => {
      try{
        const response = await api.get(import.meta.env.VITE_API_URL + "cart_products")

        // Set these for CartContext
        setCartProds(response.data.cart_products)

        if(response.data.num_items){
          setNumCartProds(response.data.num_items);
        } else {
          setNumCartProds(0);
        }
      } catch (e) {
          console.log('Error fetching cart items:', e)
      }
    };

    fetchCartProds();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop = document.documentElement.scrollTop;

      if (currentScrollTop > lastScrollTop) {
        setScrollingDown(true);
      } else {
        setScrollingDown(false);
      }
      setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollTop]);

  return (
    <div id="full nav" className={`transition-transform duration-300 ease-in-out ${scrollingDown ? 'transform -translate-y-[8rem]' : 'transform translate-y-0'
    }`}>
      <nav
        className={`flex items-center justify-center z-20 ibm-plex-mono-extralight h-[4.5rem] text-2xl fixed top-0 left-0 right-0 bg-my-muted`}
      >
        <div className="h-full w-full container my-auto flex items-center">
          <div className="flex w-1/5 items-center space-x-6">
            <a className='nav-link' href="/products">All</a>
            <a className='nav-link' href="/">Skin</a>
            <a className='nav-link' href="/">Makeup</a>
            <a className='nav-link' href="/">Hair</a>

          </div>

          <div className="flex-1 w-3/5 flex justify-center">
            <img src="/src/assets/images/princess1.webp" alt="Brand Logo" className="h-12" />
          </div>

          <div className="flex w-1/5 h-full justify-end space-x-4">

            {/* Cart counter */}
            <div className='h-full relative grid place-items-center'>
              <p className='absolute flex text-sm right-2 top-3'>{numCartProds}</p>
              <ShoppingCart className="lucide-icon mx-3" />
            </div>

            <Heart className="lucide-icon h-full mx-3" />
            <div className="hover:cursor-pointer group flex items-center h-full">
              <User className="group my-auto lucide-icon mx-3"/>
              <div className="invisible group-hover:visible">
                <DropdownUser/>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div
      className='flex justify-center items-center ibm-plex-mono-bold h-[2.5rem] text-colour-6 text-center fixed top-[4.8rem] left-0 right-0 bg-colour-1'>
        <span className={`transition-opacity duration-1000 ${fade ? 'opacity-100' : 'opacity-0'}`}>
          {currentName}
        </span>
      </div>
    </div>
  );
};
export default Navbar;