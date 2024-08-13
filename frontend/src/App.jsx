import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Components
import Navbar from "./Navbar"
import Checkout from "./Checkout"
import Landing from "./Landing"
import ProductListing from "./ProductListing"
import LoginSignupForm from "./LoginSignupForm"
import ProtectedRoute from './ProtectedRoute';

// Axios
import axios from 'axios';
axios.defaults.xsrfCookieName= 'csrftoken';
axios.defaults.xsrfHeaderName= 'X-CSRFToken';
axios.defaults.withCredentials= true;
const client = axios.create({
    baseURL: "http://127.0.0.1:8000"
});

function App() {
    return (
        <Router>
            <Navbar/>
            <Routes>
                <Route path='/login' element={<LoginSignupForm client={client}/>}></Route>
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
