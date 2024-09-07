import api from './api'
import React, { createContext, useState, useContext } from 'react';
import { UserContext } from './UserContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  const [subtotal, setSubTotal] = useState(0.00);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [cartProds, setCartProds] = useState([]);
  const [numCartProds, setNumCartProds] = useState(0);

  const adjustQty = async (pid, increment) => {
    // When adding to cart, check if user exists otherwise redirect them to login
    if(!user){
      navigate('/login')
    }

    console.log('Function: adjustQty')
    // Check if current product already exists in users Cart
    api.get(`cart_products/${pid}`).then((res1) => {
      if(res1.status === 200){
        console.log("Cart product adjustQty status:", res1.data.cart_product.quantity)

        // Product exists in cart, get quantity
        let quantity = res1.data.cart_product.quantity;
        
        increment ?  quantity+=1 : quantity-=1

        // Disallow negative inputs when decrementing
        if(quantity < 1){
          return
        }

        // Update quantity and update in backend
        api.patch(`cart_products/${res1.data.cart_product.id}/`, {quantity: quantity}).then(res2 => {
          console.log('Product updated successfully, quantity:', res2.data.quantity);
          
          // Update All Cart products
          api.get("cart_products/").then((res3) => {
            console.log('Call all cart products:', res3.data.cart_products)
            setCartProds(res3.data.cart_products);
            setNumCartProds(res3.data.num_items);
        });
        })
        .catch(error => {
          console.error('Error updating product:', error.res2);
        });

      }
    }).catch(error => {
      // Current product does not yet exist in user's cart
      api.post("cart_products/", {cart_id: user.cart_id, product_id: pid, quantity:1}).then((res1) => {
        console.log('Function: adjustQty. First time adding THIS product to cart', res1)
        setCartProds(res1.data.cart_products)
        setNumCartProds(res1.data.num_items);
      })
      console.log(error)
    })
  }

  const removeCartProduct = async (cart_product) => {
    try {
      const cart_product_id = cart_product.id;
  
      // Delete CartProduct in backend
      await api.delete(`cart_products/${cart_product_id}`);
  
      // Fetch updated cart products
      const { data } = await api.get('cart_products');
  
      // Update CartProducts state
      setCartProds(data.cart_products);
  
      // Update NumCartProds state for Navbar
      console.log('Update NumCartProds state for Navbar', data.num_items)
      if(data.num_items){
        setNumCartProds(data.num_items);
      } else {
        setNumCartProds(0);
      }
  
    } catch (error) {
      console.log('Error removing cart product', error);
    }
  };

  return (
    <CartContext.Provider value={{ cartProds, setCartProds, numCartProds, setNumCartProds, openDrawer, setOpenDrawer, subtotal, setSubTotal, adjustQty, removeCartProduct}}>
      {children}
    </CartContext.Provider>
  );
};
