import React from 'react'
import { ChevronRight } from 'lucide-react';

const CheckoutNavigation = () => {
  return (
    <>
        <div className="px-36 flex justify-center">
        <img className="w-1/3" src="/src/assets/images/princess1.webp"></img>
        </div>
        <div className="text-gray flex justify-center space-x-3 ibm-plex-mono-extralight">
        <p>Information</p>
        <ChevronRight strokeWidth={1}/>
        <p>Shipping</p>
        <ChevronRight strokeWidth={1}/>
        <p>Payment</p>
        </div>
    </>
  )
}
export default CheckoutNavigation;