import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from './api'
import axios from 'axios'

// COMPONENT IMPORTS
import { UserContext } from './UserContext';
import MainBody from './MainBody'
import { CartContext } from './CartContext';

// STYLE IMPORTS
import { Rating } from '@smastrom/react-rating'
import { drawerTheme, starStyling } from "./constants";
import { Collapse, Drawer, ThemeProvider} from "@material-tailwind/react";
import { ShoppingCart, CirclePlus, CircleMinus, Plus, Minus } from 'lucide-react';

const ProductView = () => {
  const { user } = useContext(UserContext);
  const { cartProds, setCartProds, numCartProds, setNumCartProds } = useContext(CartContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [product, setProduct] = useState(location.state?.product || {});
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [collapseStates, setCollapseStates] = useState({benefits: false,application: false,ingredients: false});
  const [open, setOpen] = useState(false);
  const [qty, setQty] = useState(0);
  const [pageprodindex, setpageprodindex] = useState();

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
  const toggleCollapse = (section) => {
    setCollapseStates((prevStates) => ({
      ...prevStates,
      [section]: !prevStates[section]
    }));
  };

  const updateCartProds = (index, newQty) => {
    console.log('Function: updateCartProds')
    // Update array of elements
    setCartProds(prev => {
      console.log('prev:', prev)
      const updated = [...prev];
      
      
      if(index < updated.length){ // Current page product exists in cart already
        // Update the specific product
        updated[index] = { ...updated[index], quantity: newQty };
        return updated;
      } else { // First time adding current page product to cart
        console.log('fdas')

      }
    });
  }
  const adjustQty = (index, pid, p_qty, increment) => {
    console.log('Function: adjustQty')
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
    if(pid == product.id){
      setQty(newQty)
    }

    // Update qty of card products for Navbar
    updateProductBackend(pid, newQty);
    updateCartProds(index, newQty);
  }

  const removeCartProduct = async (index, cart_product) => {
    console.log('Function: removeCartProduct')
    const cart_product_id = cart_product.id
    try {

      // Delete CartProduct in backend
      const deleteCartProduct =  await api.delete(`cart_products/${cart_product_id}`)

      // Update CartProducts for local array
      const fetchCartProducts =  await api.get('cart_products')
      setCartProds(fetchCartProducts.data.cart_products)

      // Update NumCartProds for Navbar
      setNumCartProds(fetchCartProducts.data.num_items)

      // If deleted CartProduct was the current page product
      if(product.id == cart_product.product){
        setQty(0)
      }

      console.log('Successfully deleted cart product:', deleteCartProduct)
    } catch (error) {
      console.log('Error removing cart product', error)
    }
  }

  const getCurrentPageProduct = async () => {
    console.log('Function: getCurrentPageProduct')

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

  const updateProductBackend = async (pid, newQty) => {
    console.log('Function: updateProductBackend')

    const data = {
      cart_id: user.cart_id,
      product_id: pid,
      quantity: newQty
    }
    try{
      const response = await api.post(`/cart_products/`, data).then(async (response) => {
        // Fetch and set updated Cart Products
        const fetchCartProducts = await api.get('cart_products')
        setCartProds(fetchCartProducts.data.cart_products)
        console.log('Cart product updated');
      })
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
      } catch (error) {
          console.log('Error fetching reviews:', error)
      }
    };
    fetchReviews();
    getCurrentPageProduct();
  }, [])

  useEffect(() => { //User & cart
    console.log('Function: useEffect')
    if (user) {
      if(user.cart_products.length > 0) {
        setCartProds(user.cart_products)
  
        // Set intial quantity if current product already exists in the user cart
        for (var i=0; i<user.cart_products.length; i++) {
  
          // Initialise the quantity for the product of the current page
          if(product.id == user.cart_products[i]['product']){
            setpageprodindex(i)
            setQty(user.cart_products[i]['quantity'])
            return;
          }
        }
      }
    }
  }, [user]);
  
  return (
    <MainBody>
      {/* Drawer */}
      {cartProds && 
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
                          <button onClick={() => adjustQty(index, p.product, p.quantity, false)} type="button" className="rounded-s-lg pv-qty-btn">
                            <Minus className='lucide-icon'/>
                          </button>
                          <input
                            type="text"
                            data-input-counter
                            data-input-counter-min="1"
                            className="bg-gray-50 border-x-0 border-gray-300 h-10 text-center text-gray-900 text-sm block w-full py-2.5"
                            placeholder="1"
                            value={p.quantity}
                            onChange={updateProductBackend}
                            required
                          />
                          <button onClick={() => adjustQty(index, p.product, p.quantity, true)}type="button" className="rounded-e-lg pv-qty-btn">
                            <Plus className='lucide-icon'/>
                          </button>
                        </div>
                        <div className="flex text-left">
                          <button
                          onClick={() => removeCartProduct(index, p)}  
                          className='pv-rm-btn'>Remove</button>
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
      }


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
            adjustQty(pageprodindex, product.id, qty, true)
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