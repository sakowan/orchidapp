import React, { useState, useRef, useEffect } from 'react';
import CheckoutNavigation from './CheckoutNavigation';

const AddressForm = () => {
  // State initialization
  const [formData, setFormData] = useState({email: '',first_name: '',last_name: '',country: '',post_code: '',prefecture: '',city: '',street: '',building_name: ''});
  const [formValid, setFormValid] = useState(false);

  const refs = {
    country: useRef(null),
    prefecture: useRef(null),
    city: useRef(null)
  };

  useEffect(() => {
    const initialValues = Object.keys(refs).reduce((acc, key) => {
      acc[key] = refs[key].current?.options[0]?.value || '';
      return acc;
    }, {});

    setFormData(prevData => ({
      ...prevData,
      ...initialValues
    }));
  }, []);

  const collectFormData = (e) => {
    const { name, value } = e.target;
    
    const validators = {
      post_code: /^\d{0,7}$/,
      first_name: /^[a-zA-Z]*$/,
      last_name: /^[a-zA-Z]*$/
    };
  
    // Check if there is a validator for the current field
    const entryValid = validators[name] ? validators[name].test(value) : true;
  
    if (entryValid) {
      setFormData(prevData => ({
        ...prevData,
        [name]: value
      }));
      
    }
  };

  return (
    <>
      <div className="p-4 border border-gray-100">
        <p className="text-2xl font-bold text-gray">Contact</p>
        <div className="relative z-0 w-full">
          <label className="address-form-labels">Email</label>
          <input
            type="email"
            name="email"
            className="address-form-inputs"
            value={formData.email}
            placeholder="contact@gmail.com"
            onChange={collectFormData}
          />
        </div>
      </div>
      <div className="p-4 border border-gray-100">
        <p className="text-2xl font-bold text-gray">Shipping Address</p>
        <div className="flex-centred-spaced">
          <div className="flex-1">
            <label className="address-form-labels">First Name</label>
            <input
              name="first_name"
              className="address-form-inputs"
              placeholder="Hanako"
              value={formData.first_name}
              onChange={collectFormData}
            />
          </div>
          <div className="flex-1">
            <label className="address-form-labels">Last Name</label>
            <input
              name="last_name"
              className="address-form-inputs"
              placeholder="Yamada"
              value={formData.last_name}
              onChange={collectFormData}
            />
          </div>
        </div>
        <div className="relative w-full">
          <label className="address-form-labels">Country</label>
          <select
            ref={refs.country}
            name="country"
            className="address-form-inputs"
            value={formData.country}
            onChange={collectFormData}
          >
            <option value="Japan">Japan</option>
          </select>
        </div>
        <div className="flex-centred-spaced">
          <div className="flex-1">
            <label className="address-form-labels">Post code</label>
            <input
              name="post_code"
              className="address-form-inputs -webkit-appearance: none"
              value={formData.post_code}
              placeholder="1234567"
              onChange={collectFormData}
            />
          </div>
          <div className="flex-1">
            <label className="address-form-labels">Prefecture</label>
            <select
              ref={refs.prefecture}
              name="prefecture"
              className="address-form-inputs"
              value={formData.prefecture}
              onChange={collectFormData}
            >
              <option value="A">A</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="address-form-labels">City</label>
            <select
              ref={refs.city}
              name="city"
              className="address-form-inputs"
              value={formData.city}
              onChange={collectFormData}
            >
              <option value="B">B</option>
            </select>
          </div>
        </div>
        <div className="flex-centred-spaced">
          <div className="flex-1">
            <label className="address-form-labels">Street</label>
            <input
              name="street"
              className="address-form-inputs"
              value={formData.street}
              onChange={collectFormData}
            />
          </div>
          <div className="flex-1">
            <label className="address-form-labels">Building</label>
            <input
              name="building_name"
              className="address-form-inputs"
              value={formData.building_name}
              onChange={collectFormData}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddressForm;
