import React, { useState, useEffect } from 'react';
import { Menu, ShoppingCart, User } from 'lucide-react';
import DropdownUser from './DropdownUser';

const Navbar = ({ user }) => {
  const [scrollingDown, setScrollingDown] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  const [hoverUserIcon, setHoverUserIcon] = useState(false);
  const [hoverDropdown, setHoverDropdown] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

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
        className={`flex z-10 ibm-plex-mono-extralight h-16 text-2xl icon-color fixed top-0 left-0 right-0 bg-my-muted transition-transform duration-300 ease-in-out ${
          scrollingDown ? 'transform -translate-y-full' : 'transform translate-y-0'
        }`}
      >
        <div className="container mx-auto my-auto flex items-center">
          <div className="flex items-center space-x-6">
            <a className='mx-3.5 ibm-plex-mono-extralight text-xl' href="/product_listings">Shop</a>
          </div>

          <div className="flex-1 flex justify-center">
            <img src="/src/assets/images/princess1.webp" alt="Brand Logo" className="h-12" />
          </div>

          <div className="flex items-center">
            <div className="hover:cursor-pointer group flex items-center h-[4rem]">
              <User className="group my-auto lucide-icon mx-3"/>
              <div className="invisible group-hover:visible">
                <DropdownUser user={user}/>
              </div>
            </div>
            <ShoppingCart className="lucide-icon mx-3" />
            <Menu className="lucide-icon mx-3" />
          </div>
          <div className="w-16"></div>
        </div>
      </nav>
    </>
  );
};
export default Navbar;