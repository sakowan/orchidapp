import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

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

    useEffect(() => {
        const getUser = async () => {
            try{
                const token = localStorage.getItem(ACCESS_TOKEN);
                const decoded = jwtDecode(token);
                const u = await api.get(`user/${decoded.user_id}`)
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
    console.log('user app', user, 'loadReady', loadReady)

    return (
        {loadReady} &&
        <Router>
            <Navbar user={user}/>
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
        </Router>
    )
}

export default App
