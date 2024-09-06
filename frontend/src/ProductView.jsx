import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from './api'
import axios from 'axios'

// COMPONENT IMPORTS
import { UserContext } from './UserContext';
import MainBody from './MainBody'
import { CartContext } from './CartContext';
import CartDrawer from './CartDrawer';

// STYLE IMPORTS
import { Rating } from '@smastrom/react-rating'
import { starStyling } from "./constants";
import { Collapse } from "@material-tailwind/react";
import { ShoppingCart, CirclePlus, CircleMinus } from 'lucide-react';

const ProductView = () => {
  const { setCartProds, numCartProds, setNumCartProds, setOpenDrawer, updateProductBackend } = useContext(CartContext);
  const { user } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [localProduct, setLocalProduct] = useState(location.state?.product || {});
  const [localProductQty, setLocalProductQty] = useState(0);
  
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [pageprodindex, setpageprodindex] = useState();
  const [collapseStates, setCollapseStates] = useState({benefits: false,application: false,ingredients: false});

  const pvOpenDrawer = () => setOpenDrawer(true);

  const toggleCollapse = (section) => {
    setCollapseStates((prevStates) => ({
      ...prevStates,
      [section]: !prevStates[section]
    }));
  };

  const adjustQty = (index, pid, p_qty, increment) => {
    console.log('Function: adjustQty')
    console.log('pid',pid)
    let newQty = p_qty;
    
    if(increment == true){
      newQty+=1;
      setNumCartProds(numCartProds+1)
    } else {
      newQty-=1;
      // Disallow negative inputs when decrementing
      if(newQty < 1){
        return
      }
      setNumCartProds(numCartProds-1)
    }

    // Update quantity of current page product 
    if(pid == localProduct.id){
      setLocalProductQty(newQty)
    }

    // Update qty of card products for Navbar
    updateProductBackend(pid, newQty, index);
  }

  const removeCartProduct = async (cart_product) => {
    try {
      const cart_product_id = cart_product.id;
  
      // Delete CartProduct in backend
      await api.delete(`cart_products/${cart_product_id}`);
  
      // Fetch updated cart products
      const { data } = await api.get('cart_products');
  
      // Update CartProducts state
      setCartProds(data.cart_products);
  
      // Update NumCartProds state for Navbar
      console.log('Update NumCartProds state for Navbar', data.num_items)
      if(data.num_items){
        setNumCartProds(data.num_items);
      } else {
        setNumCartProds(0);
      }
  
      // Reset current product quantity if it was removed
      if (localProduct.id === cart_product.product) {
        setLocalProductQty(0);
      }
    } catch (error) {
      console.log('Error removing cart product', error);
    }
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
    console.log('fdsadsafdfadsf', localProduct)
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

  useEffect(() => { //User & cart
    console.log('Function: useEffect')
    setLocalProductQty(0)
    if (user) {
      if(user.cart_products.length > 0) {
        setCartProds(user.cart_products)
  
        // Set intial quantity if current product already exists in the user cart
        for (var i=0; i<user.cart_products.length; i++) {
  
          // Initialise the quantity for the product of the current page
          if(localProduct.id == user.cart_products[i]['product']){
            setpageprodindex(i)
            setLocalProductQty(user.cart_products[i]['quantity'])
            return;
          }
        }
      } else {
        setNumCartProds(0)
      }
    }
  }, [user]);
  
  return (
    <MainBody>
      {/* Drawer */}
      <CartDrawer adjustQty={adjustQty} removeCartProduct={removeCartProduct}/>

      {/* First Row */}
      <div className="flex w-full p-5 mt-[0.85rem]">
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
            adjustQty(pageprodindex, localProduct.id, localProductQty, true)
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
    </MainBody>
  );
};

export default ProductView;