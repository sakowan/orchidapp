import './index.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LoginSignupForm = () => {
    const [data, setData] = useState({first_name: "", last_name: "", phone_number: "", email: "", password: ""});

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
        phone_number: data.phone_number,
        email: data.email,
        password: data.password
      };
      axios
        .post("http://127.0.0.1:8000/api/users/", userData)
        .then((response) => {
          console.log(response);
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
      <div>
        <h1 className='text-3xl font-bold underline'>Login</h1>
        <form onSubmit={handleSubmit}>
          First Name
          <input type="text" name="first_name" value={data.first_name} onChange={handleChange}/>
          
          Last Name
          <input type="text" name="last_name" value={data.last_name} onChange={handleChange}/>
          
          Phone Number
          <input type="tel" name="phone_number" value={data.phone_number} onChange={handleChange}/>
          
          Email
          <input type="email" name="email" value={data.email} onChange={handleChange}/>
          
          Password
          <input type="password" name="password" value={data.password} onChange={handleChange}/>
          <button type="submit">Login</button>
        </form>
      </div>
    );
};

export default LoginSignupForm;
