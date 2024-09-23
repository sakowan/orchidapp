import api from './api'
import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'

import { Heart, ShoppingCart, User } from 'lucide-react';

import DropdownUser from './DropdownUser';
import { CartContext } from './cart/CartContext';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrollingDown, setScrollingDown] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const { setCartProds, numCartProds, setNumCartProds, setOpenDrawer} = useContext(CartContext);
  const names = ['💸 FREE SHIPPING ON ORDERS OVER ¥2500 💸', '🚀 DELIVERY TIME 2-3 BUSINESS DAYS 🚀', '💖 SIGN UP NOW FOR ¥500 OFF YOUR FIRST PURCHASE 💖'];
  const [currentName, setCurrentName] = useState(names[0]);
  const [fade, setFade] = useState(false);
  let index = 0;
  
  const navOpenDrawer = () => setOpenDrawer(true);
  
  const goHome = () => {
    navigate('/')
  }

  useEffect(() => {
    // For reordering the navbars based on pathname
    const offerNav = document.getElementById('nav-offers')
    const defaultrNav = document.getElementById('nav-default')
    
    if(location.pathname === '/'){
      offerNav.classList.add('order-2')
      defaultrNav.classList.add('order-1')

    } else {
      offerNav.classList.add('order-1')
      defaultrNav.classList.add('order-2')
    }

    // Clean up: Remove classes to prevent duplication
    return () => {
      offerNav.classList.remove('order-1', 'order-2');
      defaultrNav.classList.remove('order-1', 'order-2');
    };

  }, [location])

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        index = (index + 1) % names.length;
        setCurrentName(names[index]);
        setFade(true);
      }, 1000); // Match the fade duration
    }, 3000); // Interval to switch names

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
    <div className={`flex flex-col relative z-[990] transition-transform duration-300 ease-in-out ${scrollingDown ? 'transform -translate-y-[8rem]' : 'transform translate-y-0'}`}>
      <nav id="nav-offers" className='flex justify-center items-center ibm-bold h-[2.5rem] text-colour-6 text-center bg-colour-1'>
        <span className={`transition-opacity duration-1000 ${fade ? 'opacity-100' : 'opacity-0'}`}>
          {currentName}
        </span>
      </nav>
      <nav id="nav-default" className="flex items-center justify-center z-[990] ibm-extralight h-[4.5rem] text-2xl bg-my-muted">
        <div className="relative h-full w-full container my-auto flex items-center">
          <div className="flex w-1/5 items-center space-x-6">
            <a className='nav-link' href="/products">All</a>
            <a className='nav-link' href="/">Skin</a>
            <a className='nav-link' href="/">Makeup</a>
            <a className='nav-link' href="/">Hair</a>
          </div>

          <div className="flex-1 w-3/5 flex justify-center">
            <img onClick={() => goHome()} src="/src/assets/images/princess1.webp" alt="Brand Logo" className="h-12 hover:cursor-pointer"/>
          </div>

          <div className="flex w-1/5 h-full justify-end space-x-4">
            {/* Cart counter */}
            <div id="navbar-cart" className='h-full relative grid place-items-center' onClick={() => navOpenDrawer()}>
              <p className='absolute flex text-sm right-2 top-3'>{numCartProds}</p>
              <ShoppingCart className="lucide-icon mx-3" />
            </div>

            <Heart className="lucide-icon h-full mx-3" />
            <div className="hover:cursor-pointer group flex items-center h-full">
              <User className="group my-auto lucide-icon mx-3"/>
              <div className="absolute invisible group-hover:visible right-[8rem]">
                <DropdownUser/>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};
export default Navbar;