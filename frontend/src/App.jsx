import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation} from 'react-router-dom'

// Components
import { UserProvider } from './UserContext';
import Navbar from "./Navbar"
import Checkout from "./checkout/Checkout"
import Home from "./Home"
import Products from "./Products"
import ProductView from "./ProductView"
import LoginSignupForm from "./LoginSignupForm"
import ProtectedRoute from './ProtectedRoute';

function App() {
    const location = useLocation();
    return (
        <UserProvider>
            {(location.pathname != "/login" && location.pathname != "/checkout") && <Navbar/>}
            <Routes>
                <Route path='/login' element={<LoginSignupForm/>}></Route>
                <Route path='/' element={<Home/>}></Route>
                <Route path='/products' element={<Products/>}></Route>
                <Route path='/products/:url_name' element={<ProductView/>}></Route>
                <Route path='/checkout' element={
                    <ProtectedRoute>
                        <Checkout/>
                    </ProtectedRoute>
                    }></Route>
            </Routes>
        </UserProvider>
    )
}

export default function Root() {
    return (
        <Router>
            <App />
        </Router>
    );
}
