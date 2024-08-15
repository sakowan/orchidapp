import React from 'react'
import api from "./api"
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const DropdownUser = ({user}) => {
    return (
        <div className='absolute mt-8 z-20 w-[14rem] right-[5rem] bg-white border border-gray-200 rounded-sm text-base text-gray-600 ibm-plex-mono-light'>
            <ul>
                {user && <li className="flex items-center px-2 h-10">{user.email}</li>}
                <hr/>
                <li className="flex items-center px-2 h-10 hover:bg-gray-100">Account</li>
                <li className="flex items-center px-2 h-10 hover:bg-gray-100">Orders</li>
                <hr/>
                {user && <li className="flex items-center px-2 h-10 hover:bg-gray-100">Logout</li>}
            </ul>
        </div>
    )
}

export default DropdownUser