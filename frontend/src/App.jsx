// Components can have dedicated stylesheets. Eg. for App.jsx component, it would be App.css
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductListing from "./ProductListing"
function App() {
    return (
        <Router>
            <Routes>
                <Route path='/product_listings' element={<ProductListing/>}></Route>
            </Routes>
        </Router>
    )
}

export default App
