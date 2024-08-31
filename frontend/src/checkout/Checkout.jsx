import React, {useState} from 'react'
import CheckoutNavigation from './CheckoutNavigation'
import AddressForm from './AddressForm'
import SummaryDetails from './SummaryDetails'
import ShippingMethod from './ShippingMethod'
import PaymentForm from './PaymentForm'

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
      console.log('Checkout.jsx shipping type', shippingMethod)
    }
  }
  return (
    <div className="flex h-screen">
      {/* Left Side */}
      <div className="flex-none w-[55%] overflow-auto">
        <div className="p-4 pt-2 space-y-4">
          <CheckoutNavigation/>
          {showAddress && <AddressForm onSendAddressData={handleAddressData}/>}
          {showSummary && <SummaryDetails formData={formData} hasShippingType={shippingMethod}/>}
          {showShippingMethod && <ShippingMethod onSendShippingData={handleShippingData}/>}
          {showPayment && <PaymentForm formData={formData}/>}
        </div>
      </div>
      
      {/* Right Side */}
      <div className="flex-grow w-[45%] bg-gray-100 p-4 fixed right-0 h-full">
        {/* Content here will be static */}
        <h1 className="text-2xl font-bold text-gray">Order Summary</h1>
      </div>
    </div>
  )
}
export default Checkout