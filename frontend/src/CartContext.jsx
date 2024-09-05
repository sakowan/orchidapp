// CartContext.js
import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [cartProds, setCartProds] = useState([]);
  const [numCartProds, setNumCartProds] = useState(0);

  return (
    <CartContext.Provider value={{ cartProds, setCartProds, numCartProds, setNumCartProds, openDrawer, setOpenDrawer}}>
      {children}
    </CartContext.Provider>
  );
};
