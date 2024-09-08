import React, { useContext, useEffect } from 'react';
import api from './api';
import { CartContext } from './CartContext';
import CartProdsMainList from './CartProdsMainList';

const CartView = () => {
  const { cartProds, setCartProds} = useContext(CartContext);
  
  useEffect(() => {
    // Call cart protudcts
    api.get('cart_products').then((res) => {
      setCartProds(res.data.cart_products)
      console.log("Updated cart products in UI:", cartProds);
    })
  }, []);

  return (
    <CartProdsMainList/>
  )
}

export default CartView