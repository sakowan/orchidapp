import React, { useState, useEffect } from 'react';

const SummaryDetails = ({formData, hasShippingType }) => {
  const [contact, setContact] = useState('');
  const [addressInfo, setAddressInfo] = useState('');
  const [shippingType, setShippingType] = useState('');
  const [showShipping, setShowShipping] = useState(false);

  useEffect(() => {
    if(hasShippingType){
      if (formData.shipping_type == 'free_shipping'){
        setShippingType('Free Shipping')
      } else {
        setShippingType('Express Shipping')
      }
    }
    setShowShipping(hasShippingType)
  }, [hasShippingType]);

  
  useEffect(() => {
    const formattedAddress = `${formData.first_name} ${formData.last_name}, ${formData.building}, ${formData.street}, ${formData.city}, ${formData.prefecture}, ${formData.post_code}, ${formData.country}`
    // Set up onload
    setAddressInfo(formattedAddress);
    setContact(formData.email);
  }, [formData]);

  return (
    <>
      <div className="px-4 border border-gray-100 h-50 flex flex-col justify-center">
        <div className="flex">
          <p className="text-sm text-gray p-2.5 w-1/4">Contact</p>
          <p className="text-sm text-gray p-2.5 w-3/4">{contact}</p>
        </div>
        <hr />
        <div className="flex">
          <p className="text-sm text-gray p-2.5 w-1/4">Ship to</p>
          <p className="text-sm text-gray p-2.5 w-3/4">{addressInfo}</p>
        </div>

        {hasShippingType && 
          <>
            <hr />
            <div className="flex">
              <p className="text-sm text-gray p-2.5 w-1/4">Shipping Method</p>
              <p className="text-sm text-gray p-2.5 w-3/4">{shippingType}</p>
            </div>
          </>
        }
      </div>
    </>
  );
};

export default SummaryDetails;
