import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from './UserContext';

const DropdownUser = () => {
    const user = useContext(UserContext);
    const navigate = useNavigate();

    function submitLogout(e) {
        console.log('logging out')
        localStorage.clear();
        navigate(0);
      }
    
    function goLogin(e) {
        console.log('Redirecting to login')
        navigate("/login");
    }
    return (
        <div className='absolute mt-8 z-20 w-[14rem] right-[5rem] bg-white border border-gray-200 rounded-sm text-base text-gray-600 ibm-plex-mono-light'>
            <ul>
                {user ? 
                <>
                    <li className="flex items-center px-2 h-8 text-xs ibm-plex-mono-semibold">{user.email}</li>
                    <li className="flex items-center px-2 h-10 hover:bg-gray-100">Account</li>
                    <li className="flex items-center px-2 h-10 hover:bg-gray-100">Orders</li>
                    <hr/>
                    <li className="flex items-center px-2 h-10 hover:bg-gray-100"><button className= "w-full text-left" onClick={submitLogout}>Logout</button></li>
                </>
                :
                    <li className="flex items-center px-2 h-10 hover:bg-gray-100"><button className= "w-full text-left" onClick={goLogin}>Sign in</button></li>}
            </ul>
        </div>
    )
}

export default DropdownUser