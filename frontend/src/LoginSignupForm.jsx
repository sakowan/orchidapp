import './index.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginSignupForm = ({client, onLoginUser, currentUser}) => {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [formUrl, setFormUrl] = useState('');
  const [data, setData] = useState({first_name: "", last_name: "", phone_number: "", email: "", password: ""});

  useEffect(() => {
    console.log('loginsignup', currentUser)
    if (currentUser) {
      return navigate('/')
    }
    isRegister ? setFormUrl("/api/register") : setFormUrl("/api/login/");
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

  const handleRegister = async (e) => {
    e.preventDefault();
    client.post(
      formUrl,
      {
        first_name: data.first_name,
        last_name: data.last_name,
        phone: data.phone_number,
        email: data.email,
        password: data.password
      }
    ).then(function(result){
      client.post(
        formUrl,
        {
          email: data.email,
          password: data.password
        }
      ).then(function(result){
        onLoginUser(true);
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
      <div className="login-parent-sm">
        {/* Content here will be static */}
        <form onSubmit={isRegister ? handleRegister : handleLogin}>
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
            
            {isRegister ?
            <button className="main-button-hover w-full rounded-lg h-12 bg-colour-4 text-white" type="submit">Register</button>
            :
            <button className="main-button-hover w-full rounded-lg h-12 bg-colour-4 text-white"type="submit">Sign in</button>}

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
