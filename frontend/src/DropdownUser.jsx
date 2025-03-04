import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';

const DropdownUser = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    function submitLogout(e) {
        console.log('logging out')
        localStorage.clear();
        navigate('/login');
      }
    
    function goLogin(e) {
        console.log('Redirecting to login')
        navigate("/login");
    }
    return (
        <div className='dropdown-main'>
            <ul>
                {user ? 
                <>
                    <li className="flex items-center px-2 h-10 font-bold hover:cursor-default">{user.email}</li>
                    <li className="dropdown-li">Account</li>
                    <li className="dropdown-li" onClick={() => navigate('/orders')}>Orders</li>
                    <hr/>
                    <li className="dropdown-li"><button className= "w-full text-left" onClick={submitLogout}>Logout</button></li>
                </>
                :
                    <li className="dropdown-li"><button className= "w-full text-left" onClick={goLogin}>Sign in</button></li>}
            </ul>
        </div>
    )
}

export default DropdownUser