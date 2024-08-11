import './index.css';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LoginSignupForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const user = { email, password };
  const [isRegister, setIsRegister] = useState(false);
  const [formUrl, setFormUrl] = useState('');
  const [data, setData] = useState({first_name: "", last_name: "", phone_number: "", email: "", password: ""});

  useEffect(() => {
    // Function to fetch data
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/login');
        console.log(response)
      } catch (error) {
        setError(error);
      }
    };

    isRegister ? setFormUrl("http://127.0.0.1:8000/api/users/") : setFormUrl("http://127.0.0.1:8000/api/login/")
    fetchData();  // Call fetch function when the component mounts
  }, []);

  const handleRegisterToggle = () => {
    setIsRegister(!isRegister);
  }

  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      first_name: data.first_name,
      last_name: data.last_name,
      phone: data.phone_number,
      email: data.email,
      password: data.password
    };

    const response = await axios.post(formUrl, userData)
      .then((response) => {
        console.log(response);
        setUser(userData.email, userData.password)
        navigate('/product_listings');
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log("server responded");
        } else if (error.request) {
          console.log("network error");
        } else {
          console.log(error);
        }
      });
  };
    
  return (
    <div className="flex overflow-hidden">
      {/* Left Side */}
      <img src="/src/assets/images/clouds1.jpg" alt="Brand Logo" className="h-full w-full" />
      <div className="flex w-3/5">
        <div className="p-4 pt-2 space-y-4">
        </div>
      </div>
      
      {/* Right Side */}
      <div className="login-parent-sm">
        {/* Content here will be static */}
        <form onSubmit={handleSubmit}>
          <div className='w-full p-12 space-y-4'>
            <h1 className="mt-14 pb-4 text-2xl font-bold text-gray-600">{isRegister ? `Register` : `Sign in`}</h1>
            {isRegister &&
            <>
              <input type="text" 
              className="login-inputs"
              name="first_name" value={data.first_name} onChange={handleChange} placeholder='First Name'/>
              
              <input type="text" 
              className="login-inputs"
              name="last_name" value={data.last_name} onChange={handleChange} placeholder='Last Name'/>
              
              <input type="tel" 
              className="login-inputs"
              name="phone_number" value={data.phone_number} onChange={handleChange} placeholder='Phone Number'/>
            </> }
            <input type="email" 
            className="login-inputs"
            name="email" value={data.email} onChange={handleChange} placeholder='Email'/>
            
            <input type="password" 
            className="login-inputs"
            name="password" value={data.password} onChange={handleChange} placeholder='Password'/>
            
            <button className="main-button-hover w-full rounded-lg h-12 bg-colour-4 text-white"
            type="submit">{isRegister ? `Register` : `Sign in`}</button>
            <p className='text-xs px-0'>
            {isRegister ? <>
              Already have an account? <span onClick={handleRegisterToggle} className='text-colour-7 cursor-pointer'>Sign in</span>.
            </> : 
            <>
              Don't have an account? <span onClick={handleRegisterToggle} className='text-colour-7 cursor-pointer'>Register</span> here.
            </>}
            </p>
          </div>
      </form>
      </div>
    </div>
  );
};

export default LoginSignupForm;
