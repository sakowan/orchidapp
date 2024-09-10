import React from 'react'
import { ChevronRight, Dot } from 'lucide-react';

const CheckoutNavigation = ({showSections}) => {
  return (
    <>
        <div className="px-36 mt-2 flex justify-center">
        <img className="w-1/3" src="/src/assets/images/princess1.webp"></img>
        </div>
        <div className="text-gray flex justify-center space-x-3 ibm-extralight">
          <p className={showSections.address ? 'text-colour-6 ibm-regular' : ''}>Information</p>
          <ChevronRight strokeWidth={1}/>
          <p className={showSections.shipping ? 'text-colour-6 ibm-regular' : ''}>Shipping</p>
          <ChevronRight strokeWidth={1}/>
          <p className={showSections.payment ? 'text-colour-6 ibm-regular' : ''}>Payment</p>
        </div>
    </>
  )
}
export default CheckoutNavigation;