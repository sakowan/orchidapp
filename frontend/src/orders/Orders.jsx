import React, { useState, useEffect } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import MainBody from '../MainBody';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const goReturnOrderPage = (order) => {
    navigate(`/orders/${order.id}`, { state: { order } });
  }

  useEffect(() => {
    // Fetch user data once when the app loads
    const fetchOrders = async () => {
      try{
        const response = await api.get("orders")
        setOrders(response.data)
        console.log('orders', response.data)
      } catch (e) {
          console.log('Error fetching orders:', e)
      }
    };

    fetchOrders();
  }, []);
  return (
    <MainBody>
      <div className='flex flex-col justify-center items-center mt-10 w-full space-y-6'>
        <h1 className="pv-h1 mt-2">Orders</h1>
        {orders && orders.map((order) => (
          <div key={order.id} className="w-[70%] bg-gray-100 border rounded-lg p-4">
            {order.order_products.map((op) => (
              <>
                <div key={op.id} className="flex py-2">
                  <img src={`/src/assets/images/${op.product_info.main_img}`} className="w-[4rem] h-[4rem] mr-4 border border-gray-100 rounded-sm flex-shrink-0" alt={op.product_info.name}/>
                  <div className="flex justify-between items-center w-full text-gray-500">
                    <div>{op.product_info.name}</div>
                    <div className="flex flex-col justify-between h-full text-right ">

                      <p className="!italic ibm-light">{op.quantity} × ¥{op.product_info.price}</p>

                      <p className="font-bold">¥{op.quantity * op.product_info.price}</p>
                    </div>
                  </div>


                </div>
                <hr className='border-gray-300'/>
              </>
            ))}
            <div className="flex flex-col w-full text-gray-500 text-right mt-2">
              <p className='italic'>SHIPPING: ¥{order.shipping_fee}</p>
            </div>
            <div className="flex items-center justify-between space-x-4">
              <button onClick={() => goReturnOrderPage(order)}className='btn-1 w-1/6 rounded-3xl bg-colour-4'>RETURN ITEM(S)</button>
              <h2 className="text-xl font-bold text-colour-5">TOTAL: ¥{order.total}</h2>
            </div>
          </div>
        ))}
      </div>
    </MainBody>

  )
}

export default Orders