import React, {useEffect, useState} from 'react'
import CheckoutNavigation from './CheckoutNavigation'
import AddressForm from './AddressForm'
import SummaryDetails from './SummaryDetails'
import ShippingMethod from './ShippingMethod'
import PaymentForm from './PaymentForm'
import CartView from '../cart/CartView'

const Checkout = (children) => {
  const [formData, setFormData] = useState({});
  const [shippingType, setShippingType] = useState('');

  const [showSections, setShowSections] = useState({
    address: true,
    shippingMethod: false,
    payment: false,
    summary: false,
  });

  const updateSection = (section, value) => {
    setShowSections((prevState) => ({
      ...prevState,
      [section]: value,
    }));
  };

  
  const handleAddressData = (formData) => {
    setFormData(formData);
    handleNext();
  };

  const handleShippingData = (shippingType, edittingForm) => {
    console.log('handleShippingData', edittingForm)
    setFormData(prevData => ({
      ...prevData,
      'shipping_type': shippingType
    }));
    setShippingType(shippingType);
    if(edittingForm == true){
      return
    }
      handleNext();
  };

  const handleNext = () => {
    if (showSections.address){
      updateSection('summary', true);
      updateSection('shipping', true);
      updateSection('address', false);
    } else if (showSections.shipping) {
      updateSection('shipping', false);
      updateSection('payment', true);
    }
  }

  const handleBack = () => {
    console.log('Handle back')
    if (showSections.shipping){
      updateSection('summary', false);
      updateSection('shipping', false);
      updateSection('address', true);
    } else if (showSections.payment) {
      updateSection('shipping', true);
      updateSection('payment', false);
    }
  }

  return (
    <div className="flex h-screen">
      {/* Left Side */}
      <div className="flex-none w-[55%] overflow-auto h-full">
        <div className="p-12 pt-2 space-y-4 h-full">
          <CheckoutNavigation showSections={showSections}/>
          {showSections.address && <AddressForm existingFormData={formData} onSendAddressData={handleAddressData}/>}
          {showSections.summary && <SummaryDetails formData={formData} hasShippingType={shippingType}/>}
          {showSections.shipping && <ShippingMethod formData={formData} onSendShippingData={handleShippingData} onEditAddressData={handleBack}/>}
          {showSections.payment && <PaymentForm formData={formData} setFormData={setFormData} onEditShippingData={handleBack}/>}
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