import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CartContext } from './CartContext';
import { Minus, Plus, Frown } from 'lucide-react';

const CartProdsMainList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartProds, numCartProds, subtotal, shippingFee, setSubTotal, adjustQty, removeCartProduct} = useContext(CartContext);
  const [total, setTotal] = useState(0)

  const calculateSubtotal = () => {
    let st = 0;
    if(cartProds){
      cartProds.map((cp) => {
        st += parseFloat((cp.product_info.price * cp.quantity));
      });
    }
    return st;
  };

  useEffect(() => {
    console.log("Updated cart products in UI:", cartProds);
    const st = calculateSubtotal()
    setSubTotal(st)
    setTotal(st + shippingFee)
  }, [cartProds])

  useEffect(() => {
    const t = parseFloat((subtotal + shippingFee))
    setTotal(t)
  }, [shippingFee])

  return (
    <div className='p-6'>
      <h1 className='pv-h1 text-center pb-6'>{location.pathname == '/checkout' ? "ORDER SUMMARY" : "ITEMS"}</h1>
      <hr className='pv-hr' />
      <div id="cartDrawerBody" className={!cartProds ? "h-screen flex justify-center items-center" : ""}>
        {cartProds && cartProds.map((cp) => (
          <div key={cp.id} className="my-2">
            <div className='flex py-2'>
              <img src={`/src/assets/images/${cp.product_info.main_img}`} className="w-[6rem] h-[6rem] mr-4 border border-gray-100 rounded-sm flex-shrink-0" alt={cp.product_info.name} />
              <div className="flex flex-col justify-between w-full">
                <div className="flex justify-between w-full h-full">
                  <h3 className="pv-h3 w-4/5">
                    <a className="cursor-pointer" onClick={() => navigate(`/products/${cp.product_info.url_name}`)}>{cp.product_info.name}</a>
                  </h3>
                  {location.pathname == '/checkout' ?
                    <div className="flex flex-col justify-between items-center text-gray-500">
                      <h3 className='italic text-right'>{cp.quantity} × ¥{cp.product_info.price}</h3>
                      <h3 className="pv-h3 font-bold text-right w-1/5">¥{(cp.product_info.price * cp.quantity)}</h3>
                    </div>
                    :
                    <h3 className="pv-h3 text-right w-1/5">¥{(cp.product_info.price * cp.quantity)}</h3>
                  }
                </div>

                {location.pathname !== '/checkout' &&
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
                }
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

      <div id="subtotal" className={`absolute bottom-6 w-full pr-12 ${location.pathname === "/checkout" && 'pr-20'}`}>
        <hr className='pv-hr' />
        {location.pathname !== '/checkout' ?
          <>
            <div className="flex justify-between pt-6 pv-h2 font-bold">
              <h2>SUBTOTAL ({numCartProds} items)</h2>
              <h2>¥{subtotal}</h2>
            </div>
            <p className='text-xs text-gray-600'>*Shipping, taxes, and discounts calculated at checkout.</p>
            <button 
            onClick={() => navigate("/checkout")} 
            disabled={!cartProds}
            className={`pv-btn-1 ${!cartProds ? "btn-disabled" : "hover:btn-1-hover"}`}>CHECKOUT</button>
          </>
          :
          <div className="flex justify-between pt-6 w-full">
            <div className="flex-col text-gray-500">
              <p>Subtotal</p>
              <p>Shipping</p>
              <h2 className='pv-h2 font-bold'>TOTAL</h2>
            </div>
            <div className="flex-col text-gray-500 text-right">
              <p>¥{subtotal}</p>
              <p>{shippingFee > 0 ? `¥ ${shippingFee}` : "Free"}</p>
              <h2 className='pv-h2 font-bold'>¥{total}</h2>
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default CartProdsMainList