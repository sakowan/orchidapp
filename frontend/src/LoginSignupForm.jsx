import './index.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginSignupForm = ({client, onLoginUser, currentUser}) => {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [data, setData] = useState({first_name: "", last_name: "", phone_number: "", email: "", password: ""});

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      first_name: data.first_name,
      last_name: data.last_name,
      phone: data.phone_number,
      email: data.email,
      password: data.password
    };
    axios
      .post("http://127.0.0.1:8000/api/users/", userData)
      .then((response) => {
        console.log(response);
        navigate('/');
      })
    })
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    client.post(
      formUrl,
      {
        email: data.email,
        password: data.password
      }
    ).then(function(result){
      onLoginUser(true);
      console.log('login token', client)
      navigate('/');
    })
  }
    
  return (
    <div className="flex overflow-hidden">
      {/* Left Side */}
      <img src="/src/assets/images/clouds1.jpg" alt="Brand Logo" className="h-full w-full" />
      <div className="flex w-3/5">
        <div className="p-4 pt-2 space-y-4">
        </div>
      </div>
      
      {/* Right Side */}
      <div className="flex w-2/5 bg-gray-100 bg-opacity-75 p-12 fixed right-0 h-full">
        {/* Content here will be static */}
        <form onSubmit={isRegister ? handleRegister : handleLogin}>
          <div className='w-full p-12 space-y-4'>
            <h1 className="mt-14 text-2xl font-bold text-gray text-center">{isRegister ? `Register` : `Sign in`}</h1>
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
            
            {isRegister ?
            <>
              <button className="main-button-hover w-full rounded-lg h-12 bg-colour-4 text-white" type="submit">Register</button>
              <p className='text-xs px-0'>Already have an account? <span onClick={handleRegisterToggle} className='text-colour-7 cursor-pointer'>Sign in</span>.</p>
            </>
            :
            <>
              <button className="main-button-hover w-full rounded-lg h-12 bg-colour-4 text-white"type="submit">Sign in</button>
              <p className='text-xs px-0'>Don't have an account? <span onClick={handleRegisterToggle} className='text-colour-7 cursor-pointer'>Register</span> here.</p>
            </>
            }
          </div>
      </form>
      </div>
    </div>
  );
};

export default LoginSignupForm;
