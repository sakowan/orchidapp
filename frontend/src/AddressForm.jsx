import React, { useState, useRef, useEffect } from 'react';

const AddressForm = () => {
  const [formData, setFormData] = useState({email: '',first_name: '',last_name: '',country: '',post_code: '',prefecture: '',city: '',street: '',building_name: ''});
  const [dataValid, setDataValid] = useState({email: false, first_name: false, last_name: false, country: false, post_code: false, prefecture: false, city: false, street: false, building_name: false});
  const defaultData = {country: useRef(null),prefecture: useRef(null),city: useRef(null)};
  const regexPatterns = {
    post_code: /^\d{0,7}$/,
    first_name: /^[a-zA-Z]*$/,
    last_name: /^[a-zA-Z]*$/
  };

  const finalPatterns = {
    email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    post_code: /^\d{7}$/,
    first_name: /^[a-zA-Z]*$/,
    last_name: /^[a-zA-Z]*$/
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

  // const validateRegexField = (name, value) => {
  //   console.log('Regex result: ',regexPatterns[name] ? regexPatterns[name].test(value) : (value != ''))
  //   return regexPatterns[name] ? regexPatterns[name].test(value) : (value != '');
  // };

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
    console.log(value, entryValid, finalValid)
    if (entryValid) {
      setFormData(prevData => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  useEffect(() => {
    console.log('email:', dataValid.email, 'post_code', dataValid.post_code); // This will show the updated dataValid state
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
            ref={defaultData.country}
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
              className={`${dataValid.post_code ? 'address-form-inputs border border-green-500 focus:ring-green-500' : 'address-form-inputs'}`}
              value={formData.post_code}
              placeholder="1234567"
              pattern="/^\d{7}$/"
              onChange={collectFormData}
            />
          </div>
          <div className="flex-1">
            <label className="address-form-labels">Prefecture</label>
            <select
              ref={defaultData.prefecture}
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
              ref={defaultData.city}
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
          <p>{allFieldsValid.toString()}</p>
        </div>
      </div>
    </>
  );
};

export default AddressForm;
