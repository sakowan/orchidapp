// Components can have dedicated stylesheets. Eg. for App.jsx component, it would be App.css
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProductListing from "./ProductListing"
import LoginSignupForm from "./LoginSignupForm"
import Navbar from "./Navbar"
import MainBody from "./MainBody"

function App() {
    return (
        <Router>
            <Navbar/>
            <MainBody>
                <Routes>
                    <Route path='/login' element={<LoginSignupForm/>}></Route>
                    <Route path='/product_listings' element={<ProductListing/>}></Route>
                </Routes>
            </MainBody>
        </Router>
    )
}

export default App
