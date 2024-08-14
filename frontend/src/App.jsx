import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Components
import Navbar from "./Navbar"
import Checkout from "./Checkout"
import Landing from "./Landing"
import ProductListing from "./ProductListing"
import LoginSignupForm from "./LoginSignupForm"
import ProtectedRoute from './ProtectedRoute';

function App() {
    return (
        <Router>
            <Navbar/>
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
