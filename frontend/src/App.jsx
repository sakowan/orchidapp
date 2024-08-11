// Components can have dedicated stylesheets. Eg. for App.jsx component, it would be App.css
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductListing from "./ProductListing"
import LoginSignupForm from "./LoginSignupForm"
import Navbar from "./Navbar"
import Checkout from "./Checkout"
import client from "./Client"

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'
axios.defaults.withCredentials = true

function App() {
    const [currentUser, setCurrentUser] = useState(false);
    useEffect(() => {
        client.get("/api/user")
        .then(function(res){
            setCurrentUser(true);
        })
        .catch(function(error){
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
                <Route path='/login' element={<LoginSignupForm client={client} onLoginUser={loginUser}/>}></Route>
                <Route path='/checkout' element={<Checkout/>}></Route>
                <Route path='/product_listings' element={<ProductListing/>}></Route>
            </Routes>
        </Router>
    )
}

export default App
