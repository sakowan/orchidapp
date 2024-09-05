import React, { useContext } from 'react';
import { Drawer, ThemeProvider } from "@material-tailwind/react";
import { CartContext } from './CartContext';
import { Minus, Plus } from 'lucide-react';
import { drawerTheme } from "./constants";

const CartDrawer = ({ open, closeDrawer, adjustQty, removeCartProduct }) => {
  const { cartProds } = useContext(CartContext);

  return (
    cartProds && (
      <ThemeProvider value={drawerTheme}>
        <Drawer
          placement="right"
          open={open}
          onClose={closeDrawer}
          className={open ? '!w-2/5 !max-w-none' : ''}
        >
          <div className='p-6'>
            <h1 className='pv-h1 text-center pb-6'>ITEMS</h1>
            <hr className='pv-hr' />
            {cartProds.map((p, index) => (
              <div key={p.id} className="my-2">
                <div className='flex py-2'>
                  <img src={`/src/assets/images/${p.product_info.main_img}`} className="w-[6rem] h-[6rem] mr-4 border border-gray-100 rounded-sm" alt={p.product_info.name} />
                  <div className="flex flex-col justify-between w-full">
                    <div className="flex justify-between w-full">
                      <h3 className="pv-h3 w-4/5">{p.product_info.name}</h3>
                      <h3 className="pv-h3 text-right w-1/5">¥{(p.product_info.price * p.quantity).toFixed(2)}</h3>
                    </div>

                    <div className="flex justify-between">
                      <div className="flex max-w-[10rem]">
                        <button onClick={() => adjustQty(index, p.product, p.quantity, false)} type="button" className="rounded-s-lg pv-qty-btn">
                          <Minus className='lucide-icon' />
                        </button>
                        <input
                          type="text"
                          className="bg-gray-50 border-x-0 border-gray-300 h-10 text-center text-gray-900 text-sm block w-full py-2.5"
                          placeholder="1"
                          value={p.quantity}
                          readOnly
                        />
                        <button onClick={() => adjustQty(index, p.product, p.quantity, true)} type="button" className="rounded-e-lg pv-qty-btn">
                          <Plus className='lucide-icon' />
                        </button>
                      </div>
                      <div className="flex text-left">
                        <button onClick={() => removeCartProduct(index, p)} className='pv-rm-btn'>Remove</button>
                      </div>
                    </div>
                  </div>
                </div>
                <hr className='pv-hr' />
              </div>
            ))}
          </div>
        </Drawer>
      </ThemeProvider>
    )
  );
};

export default CartDrawer;