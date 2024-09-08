import React, {useEffect, useState} from 'react'
import CheckoutNavigation from './CheckoutNavigation'
import AddressForm from './AddressForm'
import SummaryDetails from './SummaryDetails'
import ShippingMethod from './ShippingMethod'
import PaymentForm from './PaymentForm'
import CartView from '../CartView'

const Checkout = (children) => {
  const [showAddress, setShowAddress] = useState(true);
  const [showSummary, setShowSummary] = useState(false);
  const [showShippingMethod, setShowShippingMethod] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [shippingMethod, setShippingMethod] = useState('');

  const [formData, setFormData] = useState({});
  
  const handleAddressData = (formData) => {
    setFormData(formData);
    handleNext();
  };

  const handleShippingData = (shippingType) => {
    setFormData(prevData => ({
      ...prevData,
      'shipping_type': shippingType
    }));
    setShippingMethod(shippingType);
    handleNext();
  };

  const handleNext = () => {
    if (showAddress){
      setShowSummary(true)
      setShowShippingMethod(true);
      setShowAddress(false)
    } else if (showShippingMethod) {
      setShowShippingMethod(false)
      setShowPayment(true)
    }
  }

  const handleBack = () => {
    console.log('Handle back')
    if (showShippingMethod){
      setShowSummary(false)
      setShowShippingMethod(false);
      setShowAddress(true)
    } else if (showPayment) {
      setShowShippingMethod(true)
      setShowPayment(false)
    }
  }

  return (
    <div className="flex h-screen">
      {/* Left Side */}
      <div className="flex-none w-[55%] overflow-auto h-full">
        <div className="p-12 pt-2 space-y-4 h-full">
          <CheckoutNavigation/>
          {showAddress && <AddressForm existingFormData={formData} onSendAddressData={handleAddressData}/>}
          {showSummary && <SummaryDetails formData={formData} hasShippingType={shippingMethod}/>}
          {showShippingMethod && <ShippingMethod formData={formData} onSendShippingData={handleShippingData} onEditAddressData={handleBack}/>}
          {showPayment && <PaymentForm formData={formData} onEditShippingData={handleBack}/>}
        </div>
      </div>
      
      {/* Right Side */}
      <div className="flex-grow w-[45%] bg-gray-100 p-4 fixed right-0 h-full">
        {/* Content here will be static */}
        <CartView/>
      </div>
    </div>
  )
}
export default Checkout