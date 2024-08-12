// Components can have dedicated stylesheets. Eg. for App.jsx component, it would be App.css
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import ProductListing from "./ProductListing"
import LoginSignupForm from "./LoginSignupForm"
import Navbar from "./Navbar"
import Checkout from "./Checkout"
import Landing from "./Landing"
import client from './axiosInstance';

function App() {
    const [currentUser, setCurrentUser] = useState(false);
    const [csrfToken, setCsrfToken] = useState();
    // console.log('token', client.get("/api/csrf-token"))
    useEffect(() => {
        client.get("/api/user")
        .then(function(res){
            setCurrentUser(true);
        })
        .catch(function(error){
            console.log('client', client)
            setCurrentUser(false);
        })
    }, []);
    
    const loginUser = (u) => {
        setCurrentUser(true);
        console.log("Current user:", currentUser);
    }

    return (
        <Router>
            <Navbar/>
            <Routes>
                <Route path='/login' element={<LoginSignupForm client={client} onLoginUser={loginUser} currentUser={currentUser}/>}></Route>
                <Route path='/' element={<Landing/>}></Route>
                <Route path='/product_listings' element={<ProductListing/>}></Route>
                <Route path='/checkout' element={<Checkout/>}></Route>
            </Routes>
        </Router>
    )
}

export default App
