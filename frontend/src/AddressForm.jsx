// src/components/Layout.jsx
import React, { useState, useEffect } from 'react';
import CheckoutNavigation from './CheckoutNavigation';

const AddressForm = (whichPage) => {
    // Optional cleanup function:
  const [formData, setFormData ] = useState({
    email : ''
  });

  const collectFormData = (e) => {
    const newValue = e.target.value;
    setFormData((prevFormData) => {
      const newFormData = { ...prevFormData, email: newValue };
      console.log(newFormData);
      return newFormData;
    });
  };
  return (
    <>
      <div className="p-4 border border-gray-100 h-50">
        <p className="text-2xl font-bold text-gray">Contact</p>
        <div className="relative z-0 w-full">
          <label className="address-form-labels">Email </label>
          <input type="email" name="email" className="address-form-inputs" value={formData.email} onChange={collectFormData} placeholder="contact@gmail.com" required/>
        </div>
      </div>
      <div className="p-4 border border-gray-100 h-90">
        <p className="text-2xl font-bold text-gray">Shipping Address</p>
        <div className="flex justify-center w-full space-x-4">
          <div className="w-1/2">
            <label className="address-form-labels">First Name</label>
            <input name="first_name" className="address-form-inputs" 
            required="" placeholder="Hanako" />

          </div>
          <div className="w-1/2">
            <label className="address-form-labels">Last Name</label>
            <input name="last_name" className="address-form-inputs" required="" placeholder="Yamada"/>
          </div>
        </div>
        <div className="relative z-0 w-full">
          <label className="address-form-labels">
          Country 
          </label>
          <select name="country" className="address-form-inputs" 
          required="">
            <option>Japan</option>
          </select>
        </div>
        <div className="flex justify-center w-full space-x-4">
          <div className="w-1/3">
            <label className="address-form-labels">Post code</label>
            <input name="post_code" className="address-form-inputs" 
            required="" placeholder="XXX-XXXX" />

          </div>
          <div className="w-1/3">
            <label className="address-form-labels">Prefecture</label>
            <select name="prefecture" className="address-form-inputs" 
            required=""></select>
          </div>
          <div className="w-1/3">
            <label className="address-form-labels">City</label>
            <select name="city" className="address-form-inputs" 
            required=""></select>
          </div>
        </div>
        <div className="flex justify-center w-full space-x-4">
          <div className="w-1/2">
            <label className="address-form-labels">Street</label>
            <input name="street" className="address-form-inputs" />
          </div>
          <div className="w-1/2">
            <label className="address-form-labels">Building</label>
            <input name="building_name" className="address-form-inputs" />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddressForm;
