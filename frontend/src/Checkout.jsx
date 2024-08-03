import React, {useState} from 'react'
import AddressForm from './AddressForm'
import ShippingForm from './ShippingForm'
import PaymentForm from './PaymentForm'
import CheckoutNavigation from './CheckoutNavigation'

const Checkout = (children) => {
  const [isAddressPage, setisAddressPage] = useState(true);
  const [isShippingPage, setisShippingPage] = useState(false);
  const [isPaymentPage, setisPaymentPage] = useState(false);
  const btnMsg = {
    address : 'Proceed to shipping',
    shipping : 'Proceed to payment',
    payment : 'Pay now'
  }

  const [addressDetails, setAddressDetails] = useState('');
  const handleAddressDetails = (details) => {
    setAddressDetails(details);
  };

  const handleNext = () => {
    if (isAddressPage){
      setisShippingPage(true)
      setisAddressPage(!isAddressPage)
    }
    if (isShippingPage){
      setisShippingPage(!isShippingPage)
      setisPaymentPage(true)
    }
    if (isPaymentPage){
      setisShippingPage(!isShippingPage)
    }
  }
  return (
    <div className="flex h-screen">
      {/* Left Side */}
      <div className="flex-none w-3/5 overflow-auto">
        <div className="p-4 pt-2 space-y-4">
          {/* Add content or map through data here */}
          <CheckoutNavigation/>
          {isAddressPage ? <AddressForm onSendAddressDetails={handleAddressDetails}/> : (isShippingPage ? <ShippingForm details={addressDetails}/> : <PaymentForm/>)}
          
          {/* <div className="w-full relative">
            <button onClick={handleNext} className="checkout-button bg-gray-300 hover:none">
              {isAddressPage ? btnMsg['address']: (isShippingPage ? btnMsg['shipping'] : btnMsg['payment'])}
            </button>
          </div> */}
        </div>
      </div>
      
      {/* Right Side */}
      <div className="flex-grow w-2/5 bg-gray-100 p-4 fixed right-0 h-full">
        {/* Content here will be static */}
        <h1 className="text-2xl font-bold text-gray">Order Summary</h1>
      </div>
    </div>
  )
}
export default Checkout