import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation} from 'react-router-dom'

// Components
import { UserProvider } from './UserContext';
import Navbar from "./Navbar"
import Checkout from "./Checkout"
import Landing from "./Landing"
import ProductListing from "./ProductListing"
import LoginSignupForm from "./LoginSignupForm"
import ProtectedRoute from './ProtectedRoute';

function App() {
    const [user, setUser] = useState(false);
    const location = useLocation();

    return (
        <UserProvider>
            {location.pathname !== ("/login" && "/checkout") &&  <Navbar/>}
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
