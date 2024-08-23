import React, { useState, useEffect } from 'react';
import api from './api'
import axios from 'axios'
import { useUser } from './UserContext';
import MainBody from './MainBody'
import { Rating } from '@smastrom/react-rating'
import { drawerTheme, starStyling } from "./constants";
import { useLocation, useNavigate } from 'react-router-dom';
import { Collapse, Drawer, ThemeProvider} from "@material-tailwind/react";
import { ShoppingCart, CirclePlus, CircleMinus, Plus, Minus } from 'lucide-react';

const ProductView = () => {
  const { user } = useUser();
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

  const incrementQty = () => {
    const newQty = qty+1;
    setQty(newQty)
    handleProduct({ target: { value: newQty } });
  }
  const decrementQty = () => {
    if((qty-1) >= 1){
      const newQty = qty-1;
      setQty(newQty)
      handleProduct({ target: { value: newQty } });
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

  const handleProduct = async (e) => {
    console.log('user pv', user)
    const data = {
      cart_id: 2,
      product_id: product.id,
      qty: qty
    }
    try{
      const response = await api.post(`/cart_products/`, data);
      console.log('Cart product updated:', response.data);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const fetchCartProds = async () => {
      try{
        const response = await api.get(import.meta.env.VITE_API_URL + "cart_products")
        setCartProds(response.data)
      } catch (e) {
        console.log('Error fetching user cart products:', e)
      }
    }
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
    fetchCartProds();
    fetchReviews();
    getProduct();
  }, [])
  
  return (
    <MainBody>
      {/* Drawer */}
      <ThemeProvider value={drawerTheme}>
        <Drawer placement="right" open={open} onClose={closeDrawer} className={open ? '!w-2/5 !max-w-none' : ''}>
          <div className='p-6'>
            <h1 className='pv-h1 text-center pb-6'>ITEMS</h1>
            <hr/>
            <div className='flex py-2'>
              <img src={`/src/assets/images/${product.main_img}`} className="w-[6rem] h-[6rem] mr-4 border border-gray-100 rounded-sm" alt="product"/>
              <div className="flex flex-col justify-between w-full">
                <div className="flex justify-between w-full">
                  <h3 className="pv-h3 w-4/5">{product.name}</h3>
                  <h3 className="pv-h3 text-right w-1/5">¥{(product.price * qty).toFixed(2)}</h3>
                </div>

                <div className="flex max-w-[10rem]">
                  <button onClick={decrementQty} type="button" className="rounded-s-lg pv-qty-btn">
                    <Minus className='lucide-icon'/>
                  </button>
                  <input
                    type="text"
                    data-input-counter
                    data-input-counter-min="1"
                    className="bg-gray-50 border-x-0 border-gray-300 h-10 text-center text-gray-900 text-sm block w-full py-2.5"
                    placeholder="1"
                    value={qty}
                    onChange={handleProduct}
                    required
                  />
                  <button onClick={incrementQty} type="button" className="rounded-e-lg pv-qty-btn">
                    <Plus className='lucide-icon'/>
                  </button>
                </div>
              </div>
            </div>
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

          <hr/>

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

          <hr/>

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

          <hr/>

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

          <button id="atc" className="pv-add-to-cart-btn" onClick={openDrawer}>
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