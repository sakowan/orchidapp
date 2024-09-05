// CartContext.js
import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [subtotal, setSubTotal] = useState(0.00);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [cartProds, setCartProds] = useState([]);
  const [numCartProds, setNumCartProds] = useState(0);

  return (
    <CartContext.Provider value={{ cartProds, setCartProds, numCartProds, setNumCartProds, openDrawer, setOpenDrawer, subtotal, setSubTotal}}>
      {children}
    </CartContext.Provider>
  );
};
