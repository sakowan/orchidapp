import React, { useState, useEffect, useContext } from 'react';
import api from './api'
import axios from 'axios'
import { UserContext } from './UserContext';
import MainBody from './MainBody'
import { Rating } from '@smastrom/react-rating'
import { drawerTheme, starStyling } from "./constants";
import { useLocation, useNavigate } from 'react-router-dom';
import { Collapse, Drawer, ThemeProvider} from "@material-tailwind/react";
import { ShoppingCart, CirclePlus, CircleMinus, Plus, Minus } from 'lucide-react';

const ProductView = () => {
  const { user } = useContext(UserContext);
  const [cartProds, setCartProds] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const [product, setProduct] = useState(location.state?.product || {});
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [collapseStates, setCollapseStates] = useState({benefits: false,application: false,ingredients: false});
  const [open, setOpen] = useState(false);
  const [qty, setQty] = useState(1);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
  const toggleCollapse = (section) => {
    setCollapseStates((prevStates) => ({
      ...prevStates,
      [section]: !prevStates[section]
    }));
  };

  const updateQty = (index, qty) => {
    setCartProds(prev => {
      // Create a shallow copy of the array
      const updated = [...prev];
      
      // Update the specific review
      updated[index] = { ...updated[index], quantity: qty };
      return updated;
    });
  }
  const incrementQty = (index, pid, p_qty) => {
    console.log(pid, p_qty, cartProds)
    const newQty = p_qty+1;
    updateQty(index, newQty);
    handleProduct(pid, newQty);
  }
  const decrementQty = (index, pid, p_qty) => {
    if((p_qty-1) >= 1){
      const newQty = p_qty-1;
      updateQty(index, newQty);
      handleProduct(pid, newQty);
    }
  }

  const getProduct = async () => {
    try{
      const response =  await axios.get(import.meta.env.VITE_API_URL + location.pathname.substring(1))
      if (response.data.id != null) {
        setProduct(response.data)
      }
    } catch (e) {
      console.log('Error fetching product view:', e)
      navigate("/products")
    }
  };

  const handleProduct = async (pid, newQty) => {
    const data = {
      cart_id: user.cart_id,
      product_id: pid,
      quantity: newQty
    }
    try{
      const response = await api.post(`/cart_products/`, data);
      console.log('Cart product updated:', response.data);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => { //Reviews & products
    const fetchReviews = async () => {
      try{
        const response = await axios.get(import.meta.env.VITE_API_URL + "reviews", {
          params: {
            product_id: product.id
          }
        })
        setReviews(response.data)
        setAvgRating(response.data.avg_rating)
      } catch (e) {
          console.log('Error fetching reviews:', e)
      }
    };
    fetchReviews();
    getProduct();
  }, [])

  useEffect(() => { //User & cart
    if (user) {
      setCartProds(user.cart_products)
      console.log(user.cart_products)

      //Set intial quantity if current product already exists in the user cart
      for (var i=0; i<user.cart_products.length; i++) {

        // Initialise the quantity for the product of the current page
        if(product.id == user.cart_products[i]['product']){
          setQty(user.cart_products[i]['quantity'])
          return;
        }
      }
    }
  }, [user]);
  
  return (
    <MainBody>
      {/* Drawer */}
      <ThemeProvider value={drawerTheme}>
        <Drawer placement="right" open={open} onClose={closeDrawer} className={open ? '!w-2/5 !max-w-none' : ''}>
          <div className='p-6'>
            <h1 className='pv-h1 text-center pb-6'>ITEMS</h1>
            <hr className='pv-hr'/>
            {cartProds.map((p, index) => (
              <div key={p.id} className="my-2">
                <div className='flex py-2'>
                  <img src={`/src/assets/images/${p.product_info.main_img}`} className="w-[6rem] h-[6rem] mr-4 border border-gray-100 rounded-sm" alt={p.product_info.name}/>
                  <div className="flex flex-col justify-between w-full">
                    <div className="flex justify-between w-full">
                      <h3 className="pv-h3 w-4/5">{p.product_info.name}</h3>
                      <h3 className="pv-h3 text-right w-1/5">¥{(p.product_info.price * p.quantity).toFixed(2)}</h3>
                    </div>

                    <div className="flex justify-between">
                      <div className="flex max-w-[10rem]">
                        <button onClick={() => decrementQty(index, p.product, p.quantity)} type="button" className="rounded-s-lg pv-qty-btn">
                          <Minus className='lucide-icon'/>
                        </button>
                        <input
                          type="text"
                          data-input-counter
                          data-input-counter-min="1"
                          className="bg-gray-50 border-x-0 border-gray-300 h-10 text-center text-gray-900 text-sm block w-full py-2.5"
                          placeholder="1"
                          value={p.quantity}
                          onChange={handleProduct}
                          required
                        />
                        <button onClick={() => incrementQty(index, p.product, p.quantity)}type="button" className="rounded-e-lg pv-qty-btn">
                          <Plus className='lucide-icon'/>
                        </button>
                      </div>
                      <div className="flex text-left">
                        <button className='pv-rm-btn'>Remove</button>
                      </div>
                    </div>
                  </div>
                </div>
                <hr className='pv-hr'/>
              </div>
            ))}
          </div>
        </Drawer>
      </ThemeProvider>


      {/* First Row */}
      <div className="flex w-full p-5">
        {/* Left Side */}
        <div className="w-1/2 mr-5">
          <img 
          className="rounded-lg w-full h-screen border border-gray-100"
          src={`/src/assets/images/${product.main_img}`} alt="product"/>
        </div>

        {/* Right Side */}
        <div className="grid w-1/2 p-12 bg-gray-100 rounded-lg text-gray-500">
          <h1 className="pv-h1">{product.name}</h1>
          
          {/* Review indicator */}
          <div className="flex items-center">
            <span className="w-4/5">{product.desc_brief}</span>
            <Rating className="pv-rating" readOnly value={avgRating} itemStyles={starStyling}/>
            <span className="">{avgRating}</span>
          </div>
          <div className="my-10">{product.desc_long}</div>

          <hr className='pv-hr'/>

          <div className="py-2">
            <button onClick={() => toggleCollapse('benefits')} className="pv-collapse-btn">
              <h2 className="pv-h2">BENEFITS</h2>
              {collapseStates.benefits ? <CircleMinus className='lucide-fat'/> : <CirclePlus className='lucide-fat'/>}
            </button>
            <Collapse open={collapseStates.benefits}>
              <p className="pt-4">
                {product.benefits}
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
                {product.application}
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
                {product.ingredients}
              </p>
            </Collapse>
          </div>

          <button id="atc" className="pv-add-to-cart-btn" 
          onClick={(e) => {
            incrementQty(e)
            openDrawer();
          }}>
            <ShoppingCart className="lucide-icon mr-2"/>
            <span>ADD TO CART</span>
            <span className="ml-2">- ¥{product.price}</span>
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