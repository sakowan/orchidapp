import React, {useState} from 'react'
import MainBody from './MainBody'
import AddressForm from './AddressForm'
import ShippingForm from './ShippingForm'
import PaymentForm from './PaymentForm'
import CheckoutNavigation from './CheckoutNavigation'

const Checkout = (children) => {
  const [isAddressPage, setisAddressPage] = useState(true);
  const [isShippingPage, setisShippingPage] = useState(false);
  const [isPaymentPage, setisPaymentPage] = useState(false);

  const [formData, setFormData] = useState({});
  
  const handleAddressData = (formData) => {
    setFormData(formData);
    setisAddressPage(false);
    setisShippingPage(true);
  };

  const handleShippingData = (shippingType) => {
    setFormData(prevData => ({
      ...prevData,
      'shipping_type': shippingType
    }));
    setisShippingPage(false);
    setisPaymentPage(true);
  };

  return (
    <MainBody>
      <div className="flex h-screen">
        {/* Left Side */}
        <div className="flex-none w-3/5 overflow-auto">
          <div className="p-4 pt-2 space-y-4">
            <CheckoutNavigation/>
            {isAddressPage ? <AddressForm onSendAddressData={handleAddressData}/> : (isShippingPage ? <ShippingForm formData={formData} onSendShippingData={handleShippingData}/> : <PaymentForm formData={formData}/>)}
          </div>
        </div>
        
        {/* Right Side */}
        <div className="flex-grow w-2/5 bg-gray-100 p-4 fixed right-0 h-full">
          {/* Content here will be static */}
          <h1 className="text-2xl font-bold text-gray">Order Summary</h1>
        </div>
      </div>
    </MainBody>
  )
}
export default Checkout