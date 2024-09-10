import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation} from 'react-router-dom'

// Components
import { UserProvider } from './UserContext';
import { CartProvider } from './cart/CartContext';
import Navbar from "./Navbar"
import Checkout from "./checkout/Checkout"
import Home from "./Home"
import Products from "./products/Products"
import ProductView from "./products/ProductView"
import LoginSignupForm from "./LoginSignupForm"
import ProtectedRoute from './ProtectedRoute';
// End Components

// Stripe
import {Elements, PaymentElement} from '@stripe/react-stripe-js';
import {loadStripe} from "@stripe/stripe-js";
const stripe = loadStripe('pk_test_51PjvhiGEkvCddTMkhHMT4uNQPMbbxSSZCX2cog0AgqEFN3V75yGstvBgiO59THwZqifQnZxhhhI4gDqQtHns4n5n00LV8g4A1k');
// End Stripe

function App() {
    const location = useLocation();
    return (
        <UserProvider>
            <CartProvider>
                {(location.pathname != "/login" && location.pathname != "/checkout") && <Navbar/>}
                <Routes>
                    <Route path='/login' element={<LoginSignupForm/>}></Route>
                    <Route path='/' element={<Home/>}></Route>
                    <Route path='/products' element={<Products/>}></Route>
                    <Route path='/products/:url_name' element={<ProductView/>}></Route>
                    <Route path='/checkout' element={
                        <ProtectedRoute>
                            <Elements stripe={stripe}>
                                <Checkout/>
                            </Elements>
                        </ProtectedRoute>
                        }></Route>
                </Routes>
            </CartProvider>
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
