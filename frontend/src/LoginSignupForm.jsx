import './index.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// // Axios
// import axios from 'axios';
// axios.defaults.xsrfCookieName= 'csrftoken';
// axios.defaults.xsrfHeaderName= 'X-CSRFToken';
// axios.defaults.withCredentials= true;
// const client = axios.create({
//     baseURL: "http://127.0.0.1:8000"
// });

const LoginSignupForm = ({client}) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [data, setData] = useState({first_name: "", last_name: "", phone: "", email: "", password: ""});

  useEffect(() => {
    console.log('clientt', client)
    client.get("/api/user")
    .then(function(rest){
      setCurrentUser(true);
    })
    .catch(function(error){
      setCurrentUser
    })
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

  function submitForm(e) {
    e.preventDefault();
    if(isRegister){
      console.log('hit register');
      client.post(
        "/api/register",
        {
          email: data.email,
          first_name: data.first_name,
          last_name: data.last_name,
          phone: data.phone,
          password: data.password
        }
      ).then(function(res){
        client.post(
          "/api/login",
          {
            email: data.email,
            password: data.password
          }
        ).then(function(res){
          setCurrentUser(true);
        })
      })
    } else {
      console.log('hit login');
      client.post(
        "/api/login",
        {
          email: data.email,
          password: data.password
        }
      ).then(function(res){
        setCurrentUser(true);
      })
    }
  }
  function submitLogout(e) {
    e.preventDefault();
    client.post(
      "/api/logout",
      {withCredentials: true}
    ).then(function(res){
      setCurrentUser(false);
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
        <div className='w-full p-12'>
          <form
          className='space-y-4' 
          onSubmit={submitForm}>
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
              name="phone" value={data.phone} onChange={handleChange} placeholder='Phone Number'/>
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
          </form>
          <form onSubmit={submitLogout}>
            <button
            className='main-button-hover w-full rounded-lg h-12 bg-colour-4 text-white'
            type="Logout">Logout</button>
          </form>
      </div>
      </div>
    </div>
  );
};

export default LoginSignupForm;
