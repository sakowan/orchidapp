import './index.css';
import api from "./api"
import { useNavigate } from 'react-router-dom';
import { REFRESH_TOKEN, ACCESS_TOKEN } from "./constants";
import { useState, useEffect, useContext } from 'react';
import { UserContext } from './UserContext';
import { jwtDecode } from 'jwt-decode';

const LoginSignupForm = ({client}) => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [data, setData] = useState({first_name: "", last_name: "", phone: "", username: "", email: "", password: ""});

  useEffect(() => {
    const now = Math.floor(Date.now() / 1000);
    const a_token = localStorage.getItem(ACCESS_TOKEN);
    const r_token = localStorage.getItem(REFRESH_TOKEN);
    
    if(a_token){ // If access token is sitll valid
      a_token.exp > now && navigate("/product_listings")
    }
  }, []);

  const handleRegisterToggle = () => { //Changes which form is displayed
    setIsRegister(!isRegister);
  }

  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
      ...(e.target.name === "email" && { username: value })
    });
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      api.post("/token/", {
        "email": data.email,
        "password": data.password
      }).then((tokenResponse) => {
        if (tokenResponse.status === 200){
          localStorage.setItem(ACCESS_TOKEN, tokenResponse.data.access)
          localStorage.setItem(REFRESH_TOKEN, tokenResponse.data.refresh)
          const a_decoded = jwtDecode(tokenResponse.data.access)
          return api.get(`user/${a_decoded.user_id}`)
        } else {
          return navigate(0);
        }
      }).then((userResponse) => {
        setUser(userResponse.data)
        navigate("/product_listings")
      })
      } catch {
        console.log("Error logging in user:", e)
      }
  }
  const submitForm = async(e) => {
    e.preventDefault();
    if(isRegister){
      try{
        const resRegister = await api.post("/user/register/", data);
        login(e);
      } catch (error) {
        console.log(error)
      }
    }
    else {
      login(e);
    }
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
      </div>
      </div>
    </div>
  );
};

export default LoginSignupForm;
