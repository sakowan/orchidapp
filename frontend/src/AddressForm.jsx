import React, { useState, useRef, useEffect } from 'react';
import CheckoutNavigation from './CheckoutNavigation';

const AddressForm = () => {
  // State initialization
  const [formData, setFormData] = useState({email: '',first_name: '',last_name: '',country: '',post_code: '',prefecture: '',city: '',street: '',building_name: ''});

  const countryRef = useRef(null);
  const prefectureRef = useRef(null);
  const cityRef = useRef(null);

  useEffect(() => {
    const initialCountry = countryRef.current?.options[0]?.value || '';
    const initialPrefecture = prefectureRef.current?.options[0]?.value || '';
    const initialCity = cityRef.current?.options[0]?.value || '';

    setFormData((prevData) => ({
      ...prevData,
      country: initialCountry,
      prefecture: initialPrefecture,
      city: initialCity,
    }));
  }, []);

  const collectFormData = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  console.log(formData)
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
            ref={countryRef}
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
              className="address-form-inputs"
              value={formData.post_code}
              placeholder="XXX-XXXX"
              onChange={collectFormData}
            />
          </div>
          <div className="flex-1">
            <label className="address-form-labels">Prefecture</label>
            <select
              ref={prefectureRef}
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
              ref={cityRef}
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
