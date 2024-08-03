import React, { useState, useRef, useEffect } from 'react';

const AddressForm = () => {
  const [formData, setFormData] = useState({email: '',first_name: '',last_name: '',country: '',post_code: '',prefecture: '',city: '',street: '',building: ''});
  const [dataValid, setDataValid] = useState({email: false, first_name: false, last_name: false, country: false, post_code: false, prefecture: false, city: false, street: false, building: false});
  const defaultData = {country: useRef(null),prefecture: useRef(null),city: useRef(null)};
  const regexPatterns = {
    post_code: /^\d{0,7}$/,
    first_name: /^[a-zA-Z]*$/,
    last_name: /^[a-zA-Z]*$/,
    street: /^(?:(?<=\b|\s|[\d\w\-#/~&])\s)?[a-zA-Z\d\s\-#/~&]*$/,
    building: /^(?:(?<=\b|\s|[\d\w\-#/~&])\s)?[a-zA-Z\d\s\-#/~&]*$/
  };

  const finalPatterns = {
    email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    post_code: /^\d{7}$/,
    first_name: /^[a-zA-Z]+$/,
    last_name: /^[a-zA-Z]+$/,
    street: /^[a-zA-Z\d\s\-#/~&]{5,}$/,
    building: /^[a-zA-Z\d\s\-#/~&]{1,}$/,
  };

  useEffect(() => {
    // Set up default values for select inputs
    const initialValues = Object.keys(defaultData).reduce((acc, key) => {
      acc[key] = defaultData[key].current?.options[0]?.value || '';
      return acc;
    }, {});

    setFormData(prevData => ({
      ...prevData,
      ...initialValues
    }));
  }, []);

  const collectFormData = (e) => {
    const { name, value } = e.target;

    const delKey = e.nativeEvent.inputType === 'deleteContentBackward';
    const finalValid = finalPatterns[name] ? finalPatterns[name].test(value) : true;
    if (!finalValid && dataValid[name] && !delKey){
      return;
    }

    setDataValid(prevDataValid => ({
      ...prevDataValid,
      [name]: finalValid
    }));
    
    const entryValid = regexPatterns[name] ? regexPatterns[name].test(value) : true;
    // console.log(name, value, entryValid, finalValid)
    if (entryValid) {
      setFormData(prevData => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  useEffect(() => {
    // console.log('email:', dataValid.email, 'post_code', dataValid.post_code); // Live updated dataValid state
    // console.log('name:', dataValid.first_name);
  }, [dataValid]);

  const allFieldsValid = Object.values(dataValid).every(Boolean);

  return (
    <>
      <div className="p-4 border border-gray-100">
        <p className="text-2xl font-bold text-gray">Contact</p>
        <div className="relative z-0 w-full">
          <label className={`address-form-labels ${dataValid.email ? 'text-green-600' : ''}`}>Email</label>
          <input
            type="email"
            name="email"
            className={`address-form-inputs ${dataValid.email ? 'valid-autofill-colour address-form-inputs-valid' : ''}`}
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
            <label className={`address-form-labels ${dataValid.first_name ? 'text-green-600' : ''}`}>First Name</label>
            <input
              name="first_name"
              className={`address-form-inputs ${dataValid.first_name ? 'valid-autofill-colour address-form-inputs-valid' : ''}`}
              placeholder="Hanako"
              value={formData.first_name}
              onChange={collectFormData}
            />
          </div>
          <div className="flex-1">
            <label className={`address-form-labels ${dataValid.last_name ? 'text-green-600' : ''}`}>Last Name</label>
            <input
              name="last_name"
              className={`address-form-inputs ${dataValid.last_name ? 'valid-autofill-colour address-form-inputs-valid' : ''}`}
              placeholder="Yamada"
              value={formData.last_name}
              onChange={collectFormData}
            />
          </div>
        </div>
        <div className="relative w-full">
          <label className={`address-form-labels ${dataValid.country ? 'text-green-600' : ''}`}>Country</label>
          <select
            ref={defaultData.country}
            name="country"
            className={`address-form-inputs ${dataValid.country ? 'valid-autofill-colour address-form-inputs-valid' : ''}`}
            value={formData.country}
            onChange={collectFormData}
          >
            <option value="" disabled></option>
            <option value="Japan">Japan</option>
          </select>
        </div>
        <div className="flex-centred-spaced">
          <div className="flex-1">
            <label className={`address-form-labels ${dataValid.post_code ? 'text-green-600' : ''}`}>Post code</label>
            <input
              name="post_code"
              className={`address-form-inputs ${dataValid.post_code ? 'valid-autofill-colour address-form-inputs-valid' : ''}`}
              value={formData.post_code}
              placeholder="1234567"
              pattern="/^\d{7}$/"
              onChange={collectFormData}
            />
          </div>
          <div className="flex-1">
            <label className={`address-form-labels ${dataValid.prefecture ? 'text-green-600' : ''}`}>Prefecture</label>
            <select
              ref={defaultData.prefecture}
              name="prefecture"
              className={`address-form-inputs ${dataValid.prefecture ? 'valid-autofill-colour address-form-inputs-valid' : ''}`}
              value={formData.prefecture}
              onChange={collectFormData}
            >
              <option value="" disabled></option>
              <option value="A">Prefecture A</option>
            </select>
          </div>
          <div className="flex-1">
            <label className={`address-form-labels ${dataValid.city ? 'text-green-600' : ''}`}>City</label>
            <select
              ref={defaultData.city}
              name="city"
              className={`address-form-inputs ${dataValid.city ? 'valid-autofill-colour address-form-inputs-valid' : ''}`}
              value={formData.city}
              onChange={collectFormData}
            >
              <option value="" disabled></option>
              <option value="B">City A</option>
            </select>
          </div>
        </div>
        <div className="flex-centred-spaced">
          <div className="flex-1">
            <label className={`address-form-labels ${dataValid.street ? 'text-green-600' : ''}`}>Street</label>
            <input
              name="street"
              className={`address-form-inputs ${dataValid.street ? 'valid-autofill-colour address-form-inputs-valid' : ''}`}
              value={formData.street}
              onChange={collectFormData}
            />
          </div>
          <div className="flex-1">
            <label className={`address-form-labels ${dataValid.building ? 'text-green-600' : ''}`}>Building</label>
            <input
              name="building"
              className={`address-form-inputs ${dataValid.building ? 'valid-autofill-colour address-form-inputs-valid' : ''}`}
              value={formData.building}
              onChange={collectFormData}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddressForm;
