import api_any from "./api"
import React from 'react';
import MainBody from './MainBody'

import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Rating, ThinStar } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

const starStyling = {
  itemShapes: ThinStar,
  activeFillColor: '#8996e3', //colour-5
  inactiveFillColor: '#D1D5DB' //gray-300
}

const ProductView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [product, setProduct] = useState(location.state?.product || {});

  const getProduct = async () => {
    try{
      const response =  await api_any.get(location.pathname.substring(1))
      if (response.data.id != null) {
        setProduct(response.data)
      }
    } catch (e) {
      console.log('Error fetching product view:', e)
      navigate("/product_listings")
    }
  };
  
  useEffect(() => {
    getProduct();
  }, [product])

  return (
    <MainBody>
      {/* First Row */}
      <div className="flex w-full h-full p-5">
        {/* Left Side */}
        <div className="w-1/2 mr-5">
          <img 
          className="rounded-lg h-full border border-gray-100"
          src={`/src/assets/images/${product.img_url}`} alt="product"/>

        </div>

        {/* Right Side */}
        <div className="w-1/2 p-6 bg-gray-100 rounded-lg text-gray-500">
          <h1 className="h1-product-view">{product.name}</h1>
          
          {/* Review indicator */}
          <div className="flex">
            <span className="pt-2 w-4/5">{product.desc_brief}</span>
            <Rating className="w-1/5" readOnly value={3.5} itemStyles={starStyling}/>
          </div>
          <div className="my-10">{product.desc_long}</div>
          <hr/>
          <button className="main-button-product-view">ADD TO CART</button>
        </div>
      </div>

      {/* Reviews */}
      <div
      className="w-full bg-gray-100 rounded-lg m-5 p-5">
        <h1 className="h1-product-view">Reviews</h1>
      </div>

    </MainBody>
  );
};

export default ProductView;
