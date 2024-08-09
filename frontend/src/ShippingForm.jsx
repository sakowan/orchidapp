import React, { useState, useEffect } from 'react';

const ShippingForm = ({formData, onSendShippingData }) => {
  const [isFreeChecked, setIsFreeChecked] = useState(false);
  const [isExpChecked, setIsExpChecked] = useState(false);
  const [contact, setContact] = useState('');
  const [addressInfo, setAddressInfo] = useState('');
  const [shippingType, setShippingType] = useState('');
  
  useEffect(() => {
    const formattedAddress = `${formData.first_name} ${formData.last_name}, ${formData.building}, ${formData.street}, ${formData.city}, ${formData.prefecture}, ${formData.post_code}, ${formData.country}`
    // Set up onload
    setAddressInfo(formattedAddress);
    setContact(formData.email);
  }, [formData]);

  const handleChange = (e) => {
    if (e.target.id === 'free_shipping') {
      setIsFreeChecked(true);
      setIsExpChecked(false);
    } else {
      setIsExpChecked(true);
      setIsFreeChecked(false);
    }
    setShippingType(e.target.id);
  };

  const sendShippingData = () => {
    if (shippingType) {
      onSendShippingData(shippingType);
    }
  };

  return (
    <>
      <div className="p-4 border border-gray-100 h-50">
        <div className="flex">
          <p className="text-sm text-gray p-2.5 w-1/4">Contact</p>
          <p className="text-sm text-gray p-2.5 w-3/4">{contact}</p>
        </div>
        <hr />
        <div className="flex">
          <p className="text-sm text-gray p-2.5 w-1/4">Ship to</p>
          <p className="text-sm text-gray p-2.5 w-3/4">{addressInfo}</p>
        </div>
      </div>
      <label
        htmlFor="free_shipping"
        className={`flex w-full p-5 bg-white rounded-lg cursor-pointer ${
          isFreeChecked ? 'text-colour-5 border border-colour-5' : 'border border-gray-200 text-gray-500'
        }`}
      >
        <div className="w-5/6">
          <div>Free Shipping</div>
          <div className="text-sm">Arrives within 2-3 business days.</div>
        </div>
        <div className="w-1/6 flex justify-end">
          <input
            type="radio"
            id="free_shipping"
            name="shipping"
            value="free_shipping"
            className="peer"
            onChange={handleChange}
            required
          />
        </div>
      </label>

      <label
        htmlFor="express_shipping"
        className={`flex w-full p-5 bg-white rounded-lg cursor-pointer ${
          isExpChecked ? 'text-colour-5 border border-colour-5' : 'border border-gray-200 text-gray-500'
        }`}
      >
        <div className="w-5/6">
          <div>Express Shipping</div>
          <div className="text-sm">Arrives within 2-3 business days.</div>
        </div>
        <div className="w-1/6 flex justify-end">
          <input
            type="radio"
            id="express_shipping"
            name="shipping"
            value="express_shipping"
            className="peer"
            onChange={handleChange}
            required
          />
        </div>
      </label>
      <div className="w-full relative">
        <button
          onClick={sendShippingData}
          className={`main-button ${
            shippingType ? 'bg-colour-4 main-button-hover' : 'cursor-default bg-gray-300'
          }`}
        >
          Proceed to shipping
        </button>
      </div>
    </>
  );
};

export default ShippingForm;
