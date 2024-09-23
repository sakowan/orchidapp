import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../api'
import axios from 'axios'

// COMPONENT IMPORTS
import { UserContext } from '../UserContext';
import { CartContext } from '../cart/CartContext';
import CartDrawer from '../cart/CartDrawer';
import Footer from '../Footer'

// STYLE IMPORTS
import { Rating } from '@smastrom/react-rating'
import { starStyling } from "../constants";
import { Collapse } from "@material-tailwind/react";
import { ShoppingCart, CirclePlus, CircleMinus } from 'lucide-react';

const ProductView = () => {
  const { setCartProds, setOpenDrawer, adjustQty } = useContext(CartContext);
  const { user } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [localProduct, setLocalProduct] = useState(location.state?.product || {});
  
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [collapseStates, setCollapseStates] = useState({benefits: false,application: false,ingredients: false});

  const pvOpenDrawer = () => setOpenDrawer(true);

  const toggleCollapse = (section) => {
    setCollapseStates((prevStates) => ({
      ...prevStates,
      [section]: !prevStates[section]
    }));
  };

  const getCurrentPageProduct = async () => {
    console.log('Function: getCurrentPageProduct')

    try{
      const response =  await axios.get(import.meta.env.VITE_API_URL + location.pathname.substring(1))
      if (response.data.id != null) {
        setLocalProduct(response.data)
      }
    } catch (e) {
      console.log('Error fetching product view:', e)
      navigate("/products")
    }
  };

  useEffect(() => { //Reviews & products
    const fetchReviews = async () => {
      try{
        const response = await axios.get(import.meta.env.VITE_API_URL + "reviews", {
          params: {
            product_id: localProduct.id
          }
        })
        setReviews(response.data)
        setAvgRating(response.data.avg_rating)
      } catch (error) {
          console.log('Error fetching reviews:', error)
      }
    };
    fetchReviews();
    getCurrentPageProduct();
  }, [])

  useEffect(() => {
    console.log('Function: useEffect. On load, set user CartProducts')
    if (user) {
      api.get(`cart_products/`).then((res) => {
        setCartProds(res.data.cart_products);
      });
    }
  }, [user]);
  
  return (
    <div>
      <CartDrawer/>

      {/* First Row */}
      <div className="flex w-full p-5">
        {/* Left Side */}
        <div className="w-1/2 mr-5">
          <img 
          className="rounded-lg w-full h-screen border border-gray-100"
          src={`/src/assets/images/${localProduct.main_img}`} alt="product"/>
        </div>

        {/* Right Side */}
        <div className="grid w-1/2 p-12 bg-gray-100 rounded-lg text-gray-500">
          <h1 className="pv-h1">{localProduct.name}</h1>
          
          {/* Review indicator */}
          <div className="flex items-center">
            <span className="w-4/5">{localProduct.desc_brief}</span>
            <Rating className="pv-rating" readOnly value={avgRating} itemStyles={starStyling}/>
            <span className="">{avgRating}</span>
          </div>
          <div className="my-10">{localProduct.desc_long}</div>

          <hr className='pv-hr'/>

          <div className="py-2">
            <button onClick={() => toggleCollapse('benefits')} className="pv-collapse-btn">
              <h2 className="pv-h2">BENEFITS</h2>
              {collapseStates.benefits ? <CircleMinus className='lucide-fat'/> : <CirclePlus className='lucide-fat'/>}
            </button>
            <Collapse open={collapseStates.benefits}>
              <p className="pt-4">
                {localProduct.benefits}
              </p>
            </Collapse>
          </div>

          <hr className='pv-hr'/>

          <div className="py-2">
            <button onClick={() => toggleCollapse('application')} className="pv-collapse-btn">
              <h2 className="pv-h2">APPLICATION</h2>
              {collapseStates.application ? <CircleMinus className='lucide-fat'/> : <CirclePlus className='lucide-fat'/>}
            </button>
            <Collapse open={collapseStates.application}>
              <p className="pt-4">
                {localProduct.application}
              </p>
            </Collapse>
          </div>

          <hr className='pv-hr'/>

          <div className="py-2">
            <button onClick={() => toggleCollapse('ingredients')} className="pv-collapse-btn">
              <h2 className="pv-h2">INGREDIENTS</h2>
              {collapseStates.ingredients ? <CircleMinus className='lucide-fat'/> : <CirclePlus className='lucide-fat'/>}
            </button>
            <Collapse open={collapseStates.ingredients}>
              <p className="pt-4">
                {localProduct.ingredients}
              </p>
            </Collapse>
          </div>

          <button id="atc" className="pv-btn-1 hover:btn-1-hover" 
          onClick={(e) => {
            adjustQty(localProduct.id, true)
            pvOpenDrawer();
          }}>
            <ShoppingCart className="lucide-icon mr-2"/>
            <span>ADD TO CART</span>
            <span className="ml-2">- ¥{localProduct.price}</span>
          </button>
        </div>
      </div>

      {/* Second Row */}
      <div
      className="w-full bg-gray-100 rounded-lg m-5 p-5">
        <h1 className="pv-h1">Reviews</h1>
      </div>
      <Footer/>
    </div>
  );
};

export default ProductView;