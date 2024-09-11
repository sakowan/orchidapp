import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MainBody from '../MainBody';
import api from '../api'

const ReturnOrder = () => {
  const location = useLocation();
  const { order } = location.state || {};

  return (
    <MainBody>
      <div className='flex flex-col justify-center items-center mt-10 w-full space-y-6'>
        <h1 className="pv-h1 mt-2">Return</h1>
        <div id="column-headers" className='w-[70%] flex font-bold text-gray-600 bg-gray-100 text-center p-2 rounded-sm'>
          <p className="w-2/4">ITEMS</p>
          <p className="w-1/4">QTY</p>
          <p className="w-1/4">REFUNDABLE AMOUNT</p>
        </div>
        <div key={order.id} className="w-[70%] border p-4 !mt-0">
        
          {order.order_products.map((op) => (
            <>
              <div key={op.id} className="flex w-full py-2">
                <div className="flex w-2/4 items-center">
                  <div className="flex items-center me-4">
                    <input type="radio" value=""  className="w-4 h-4"/>
                  </div>
                  <img src={`/src/assets/images/${op.product_info.main_img}`} className="w-[4rem] h-[4rem] mr-4 border border-gray-100 rounded-sm flex-shrink-0" alt={op.product_info.name}/>
                  <p>{op.product_info.name}</p>
                </div>

                <div className="flex w-1/4 justify-center items-center">
                  <p>hi</p>
                </div>

                <div className="flex w-1/4 justify-center items-center">
                  <p>hi</p>
                </div>

              </div>
              <hr className='border-gray-300'/>
            </>
          ))}
        </div>
      </div>
    </MainBody>
  )
}

export default ReturnOrder