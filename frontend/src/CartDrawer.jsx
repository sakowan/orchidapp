import React, { useContext, useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { Drawer, ThemeProvider } from "@material-tailwind/react";
import { CartContext } from './CartContext';
import { Minus, Plus, Frown } from 'lucide-react';
import { drawerTheme } from "./constants";

const CartDrawer = () => {
  const navigate = useNavigate();
  const { cartProds, openDrawer, setOpenDrawer, subtotal, setSubTotal, adjustQty, removeCartProduct} = useContext(CartContext);

  const cdCloseDrawer = () => setOpenDrawer(false);

  const calculateSubtotal = () => {
    let st = 0.00;
    if(cartProds){
      cartProds.map((cp) => {
        st += parseFloat((cp.product_info.price * cp.quantity).toFixed(2));
      });
    }
    return st;
  };  

  useEffect(() => {
    const st = calculateSubtotal().toFixed(2)
    setSubTotal(st)
  }, [cartProds])

  useEffect(() => {
    console.log("Updated cart products in UI:", cartProds);
  }, [cartProds]);

  return (
    <ThemeProvider value={drawerTheme}>
      <Drawer
        placement="right"
        open={openDrawer}
        onClose={cdCloseDrawer}
        className={openDrawer ? '!w-2/5 !max-w-none' : ''}
      >
        <div className='p-6'>
          <h1 className='pv-h1 text-center pb-6'>ITEMS</h1>
          <hr className='pv-hr' />
          <div id="cartDrawerBody" className={!cartProds ? "h-screen flex justify-center items-center" : ""}>
            {cartProds && cartProds.map((cp) => (
              <div key={cp.id} className="my-2">
                <div className='flex py-2'>
                  <img src={`/src/assets/images/${cp.product_info.main_img}`} className="w-[6rem] h-[6rem] mr-4 border border-gray-100 rounded-sm" alt={cp.product_info.name} />
                  <div className="flex flex-col justify-between w-full">
                    <div className="flex justify-between w-full">
                      <h3 className="pv-h3 w-4/5">{cp.product_info.name}</h3>
                      <h3 className="pv-h3 text-right w-1/5">¥{(cp.product_info.price * cp.quantity).toFixed(2)}</h3>
                    </div>

                    <div className="flex justify-between">
                      <div className="flex max-w-[10rem]">
                        <button onClick={() => adjustQty(cp.product, false)} type="button" className="rounded-s-lg pv-qty-btn">
                          <Minus className='lucide-icon' />
                        </button>
                        <input
                          type="text"
                          className="bg-gray-50 border-x-0 border-gray-300 h-10 text-center text-gray-900 text-sm block w-full py-2.5"
                          placeholder="1"
                          value={cp.quantity}
                          readOnly
                        />
                        <button onClick={() => adjustQty(cp.product, true)} type="button" className="rounded-e-lg pv-qty-btn">
                          <Plus className='lucide-icon' />
                        </button>
                      </div>
                      <div className="flex text-left">
                        <button onClick={() => removeCartProduct(cp)} className='pv-rm-btn'>Remove</button>
                      </div>
                    </div>
                  </div>
                </div>
                <hr className='pv-hr' />
              </div>
            ))}
            {!cartProds && 
            <div className="flex flex-col w-full text-center items-center relative -top-28">
              <div className="absolute -top-12">
                <Frown className="text-gray-400 w-16 h-16" />
              </div>
              <h1 className="text-2xl text-gray-400 mt-12">Your cart is empty</h1>
            </div>}
          </div>

          <div id="subtotal" className='absolute bottom-6 w-full pr-12'>
            <hr className='pv-hr' />
            <div className="flex justify-between pt-6 pv-h2 font-bold">
              <h2>SUBTOTAL</h2>
              <h2>¥{subtotal}</h2>
            </div>
            <p className='text-xs text-gray-600'>*Shipping, taxes, and discounts calculated at checkout.</p>
            <button 
            onClick={() => navigate("/checkout")} 
            disabled={!cartProds}
            className={`pv-btn-1 ${!cartProds ? "btn-disabled" : "hover:btn-1-hover"}`}>CHECKOUT</button>
          </div>
        </div>
      </Drawer>
    </ThemeProvider>
  );
};

export default CartDrawer;