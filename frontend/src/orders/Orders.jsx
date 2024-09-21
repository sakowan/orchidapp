import React, { useState, useEffect } from 'react';
import api from '../api';
import { useLocation, useNavigate } from 'react-router-dom';
import MainBody from '../MainBody';
import { CircleX } from 'lucide-react';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const location = useLocation()

  const goReturnOrderPage = (order) => {
    navigate(`/orders/${order.id}`, { state: { order } });
  }

  const removeComplaint = () => {
    navigate(location.pathname, { replace: true });
  }

  useEffect(() => {
    // Fetch user data once when the app loads
    const fetchOrders = async () => {
      try{
        const response = await api.get("orders")
        console.log('Orders:', response.data)
        setOrders(response.data)
      } catch (e) {
          console.log('Error fetching orders:', e)
      }
    };

    fetchOrders();
  }, []);
  return (
    <MainBody>
      <div className='ord_main_div'>
        <h1 className="pv-h1 mt-2">Orders</h1>
        {location.state?.successComplaint && 
        <div className="w-[70%] bg-gray-100 border border-green-400 bg-green-50 rounded-lg p-4 text-green-500">
          <div className="flex justify-between items-center">
            <h2 className="font-bold">Complaint ID: {location.state?.successComplaint}</h2>
            <CircleX className="hover:cursor-pointer" onClick={removeComplaint}/>
          </div>
          <p>We've received your complaint, please allow us up to 48 hours to response.</p>
        </div>
        }
        {orders && orders.map((order) => (
          <div key={order.id} className="w-[70%] bg-gray-100 border rounded-lg p-4">
            {order.order_products.map((op) => (
              <div key={op.id} >
                <div className="flex py-2">
                  <img src={`/src/assets/images/${op.product_info.main_img}`} className="ord_img" alt={op.product_info.name}/>
                  <div className="flex justify-between items-center w-full text-gray-500">
                    <div>{op.product_info.name}</div>
                    <div className="flex flex-col justify-between h-full text-right ">

                      <p className="ibm-light !italic">{op.quantity} × ¥{op.product_info.price}</p>

                      <p className="font-bold">¥{op.quantity * op.product_info.price}</p>
                    </div>
                  </div>

                </div>
                <hr className='border-gray-300'/>
              </div>
            ))}
            <div className="flex flex-col w-full text-gray-500 text-right mt-2">
              <p className='italic'>SHIPPING: ¥{order.shipping_fee}</p>
            </div>
            <div className="flex items-center justify-between space-x-4">
              {order.complaint ? 
              <h2 className='text-gray-500'>Return ID | {order.complaint.id}</h2>
              :
              <button onClick={() => goReturnOrderPage(order)}className='btn-1 w-1/6 rounded-3xl bg-colour-4 hover:btn-1-hover'>RETURN ITEM(S)</button>
              }
              <h2 className="text-xl font-bold text-colour-5">TOTAL: ¥{order.total}</h2>
            </div>
          </div>
        ))}
      </div>
    </MainBody>
  )
}

export default Orders