import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation} from 'react-router-dom'

import api from "./api"
import { jwtDecode } from "jwt-decode";
import { ACCESS_TOKEN, REFRESH_TOKEN } from './constants';


// Components
import Navbar from "./Navbar"
import Checkout from "./Checkout"
import Landing from "./Landing"
import ProductListing from "./ProductListing"
import LoginSignupForm from "./LoginSignupForm"
import ProtectedRoute from './ProtectedRoute';

function App() {
    const [user, setUser] = useState(false);
    const [loadReady, setLoadReady] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const getUser = async () => {
            try{
                const a_token = localStorage.getItem(ACCESS_TOKEN);
                const a_decoded = jwtDecode(a_token);

                const u = await api.get(`user/${a_decoded.user_id}`)
                setUser(u.data)
            } catch (e) {
                console.log(e)
            } finally {
                setLoadReady(true);
            }
        }

        if (localStorage.getItem(ACCESS_TOKEN)&&localStorage.getItem(REFRESH_TOKEN)){
            getUser();
        }
    }, []);
    console.log('App.jsx', user, 'loadReady', loadReady)

    return (
        {loadReady} &&
        <>
            {location.pathname !== ("/login" && "/checkout") &&  <Navbar user={user}/>}
            <Routes>
                <Route path='/login' element={<LoginSignupForm/>}></Route>
                <Route path='/' element={<Landing/>}></Route>
                <Route path='/product_listings' element={<ProductListing/>}></Route>
                <Route path='/checkout' element={
                    <ProtectedRoute>
                        <Checkout/>
                    </ProtectedRoute>
                    }></Route>
            </Routes>
        </>
    )
}

export default function Root() {
    return (
        <Router>
            <App />
        </Router>
    );
}
