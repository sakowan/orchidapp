import api from './api'
import React, { createContext, useState, useContext } from 'react';
import { UserContext } from './UserContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  const [localProductQty, setLocalProductQty] = useState(0);
  const [subtotal, setSubTotal] = useState(0.00);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [cartProds, setCartProds] = useState([]);
  const [numCartProds, setNumCartProds] = useState(0);

  const updateCartProds = (index, newQty) => {
    console.log('Function: updateCartProds')
    // Update array of elements
    setCartProds(prev => {
      const updated = [...prev];
      
      if(index < updated.length){ // Current page product exists in cart already
        // Update the specific product
        updated[index] = { ...updated[index], quantity: newQty };
        return updated;
      } else {
        return updated;
      }
    });
  }

  const updateProductBackend = async (pid, newQty, index) => {
    console.log('Function: updateProductBackend')

    const data = {
      cart_id: user.cart_id,
      product_id: pid,
      quantity: newQty
    }
    try{
      const response = await api.post(`/cart_products/`, data).then(async (response) => {
        // Fetch and set updated Cart Products
        const fetchCartProducts = await api.get('cart_products')
        const updatedCartProducts = fetchCartProducts.data.cart_products
        setCartProds(updatedCartProducts)
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <CartContext.Provider value={{ cartProds, setCartProds, numCartProds, setNumCartProds, openDrawer, setOpenDrawer, subtotal, setSubTotal, updateProductBackend}}>
      {children}
    </CartContext.Provider>
  );
};
