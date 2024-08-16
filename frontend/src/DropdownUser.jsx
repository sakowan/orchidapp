import React from 'react'
import api from "./api"
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';


const DropdownUser = ({user}) => {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState();
    useEffect(() => {
        console.log('DropdownUser', user)
        setCurrentUser(user);
    }, [])

    function submitLogout(e) {
        e.preventDefault();
        localStorage.clear();
        setCurrentUser(false);
        navigate("/product_listings")
      }
    return (
        <div className='absolute mt-8 z-20 w-[14rem] right-[5rem] bg-white border border-gray-200 rounded-sm text-base text-gray-600 ibm-plex-mono-light'>
            <ul>
                {currentUser ? 
                <>
                    <li className="flex items-center px-2 h-10">{currentUser.email}</li>
                    <hr/>
                    <li className="flex items-center px-2 h-10 hover:bg-gray-100">Account</li>
                    <li className="flex items-center px-2 h-10 hover:bg-gray-100">Orders</li>
                    <hr/>
                    <li className="flex items-center px-2 h-10 hover:bg-gray-100"><button onClick={submitLogout}>Logout</button></li>
                </>
                :
                    <li className="flex items-center px-2 h-10 hover:bg-gray-100">Sign in</li>}
            </ul>
        </div>
    )
}

export default DropdownUser