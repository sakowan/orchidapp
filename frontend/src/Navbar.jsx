// Navbar.js
import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';

const Navbar = () => {
  const [scrollingDown, setScrollingDown] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  useEffect(() => {
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
      className={`ibm-plex-mono-extralight h-18 text-2xl icon-color fixed top-0 left-0 right-0 bg-my-muted p-4 transition-transform duration-300 ease-in-out ${
        scrollingDown ? 'transform -translate-y-full' : 'transform translate-y-0'
      }`}
    >
      <div className="container mx-auto flex items-center">
        {/* Left section: menu and shop link */}
        <div className="flex items-center space-x-6">
          <Menu strokeWidth={1} />
          <a href="">Shop</a>
        </div>
        
        {/* Centered logo */}
        <div className="flex-1 flex justify-center">
          <img src="/src/assets/images/princess1.webp" alt="Brand Logo" className="h-12" />
        </div>
        
        {/* Right section (empty, but can be used for future additions) */}
        <div className="w-16"></div>
      </div>
    </nav>
  );
};

export default Navbar;
