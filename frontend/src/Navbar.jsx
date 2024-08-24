import api from './api'
import React, { useState, useEffect } from 'react';
import { Heart, ShoppingCart, User } from 'lucide-react';

import DropdownUser from './DropdownUser';

const Navbar = () => {
  const [scrollingDown, setScrollingDown] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [cartProds, setCartProds] = useState(0);

  useEffect(() => {
    const fetchCartProds = async () => {
      try{
        const response = await api.get(import.meta.env.VITE_API_URL + "cart_products")
        // console.log(response.data.num_items)
        setCartProds(response.data.num_items)
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
    <>
      <nav
        className={`flex z-10 ibm-plex-mono-extralight h-[4.5rem] text-2xl icon-color fixed top-0 left-0 right-0 bg-my-muted transition-transform duration-300 ease-in-out ${
          scrollingDown ? 'transform -translate-y-full' : 'transform translate-y-0'
        }`}
      >
        <div className="h-full container mx-auto my-auto flex items-center">
          <div className="flex items-center space-x-6">
            <a className='mx-3.5 ibm-plex-mono-extralight text-xl' href="/products">Shop</a>
          </div>

          <div className="flex-1 flex justify-center">
            <img src="/src/assets/images/princess1.webp" alt="Brand Logo" className="h-12" />
          </div>

          <div className="flex h-full items-center">

            {/* Cart counter */}
            <div className='h-full relative grid place-items-center'>
              <p className='absolute flex text-sm right-2 top-3'>{cartProds}</p>
              <ShoppingCart className="lucide-icon mx-3" />
            </div>

            <Heart className="lucide-icon mx-3" />
            <div className="hover:cursor-pointer group flex items-center h-[4rem]">
              <User className="group my-auto lucide-icon mx-3"/>
              <div className="invisible group-hover:visible">
                <DropdownUser/>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
export default Navbar;