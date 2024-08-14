// Navbar.js
import React, { useState, useEffect } from 'react';
import { Menu, ShoppingCart, User } from 'lucide-react';
import { ACCESS_TOKEN, REFRESH_TOKEN } from './constants';

const Navbar = () => {
  const [scrollingDown, setScrollingDown] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    (localStorage.getItem(ACCESS_TOKEN)&&localStorage.getItem(REFRESH_TOKEN)) && setAuthorized(true);
    
    const handleScroll = () => {
      const currentScrollTop = document.documentElement.scrollTop;

      if (currentScrollTop > lastScrollTop) {
        setScrollingDown(true);
      } else {
        setScrollingDown(false);
      }
      setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop); // For Mobile or negative scrolling
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollTop]);

  return (
    <nav
      className={`z-10 ibm-plex-mono-extralight h-18 text-2xl icon-color fixed top-0 left-0 right-0 bg-my-muted p-4 transition-transform duration-300 ease-in-out ${
        scrollingDown ? 'transform -translate-y-full' : 'transform translate-y-0'
      }`}
    >
      <div className="container mx-auto flex items-center">
        {/* Left section: menu and shop link */}
        <div className="flex items-center space-x-6">
          <a className='mx-3.5 ibm-plex-mono-extralight text-xl' href="/product_listings">Shop</a>
        </div>
        
        {/* Centered logo */}
        <div className="flex-1 flex justify-center">
          <img src="/src/assets/images/princess1.webp" alt="Brand Logo" className="h-12" />
        </div>
        
        <div className="flex items-center space-x-6">
          <ShoppingCart strokeWidth={1}/>
          <Menu strokeWidth={1} />
          {authorized && <User strokeWidth={1} />} 
        </div>
        <div className="w-16"></div>
      </div>
    </nav>
  );
};

export default Navbar;
