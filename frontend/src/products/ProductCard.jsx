import axios from 'axios'
import React, { useState, useEffect } from 'react';

import { Rating, ThinStar } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
const starStyling = {
  itemShapes: ThinStar,
  activeFillColor: '#8996e3', //colour-5
  inactiveFillColor: '#D1D5DB' //gray-300
}

export const ProductCard = ({ product }) => {
  const [avgRating, setAvgRating] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      try{
        const response = await axios.get(import.meta.env.VITE_API_URL + "reviews", {
          params: {
            product_id: product.id
          }
        })
        setAvgRating(response.data.avg_rating)
      } catch (e) {
          console.log('Error fetching product listings:', e)
      }
    };
    fetchReviews();
  }, [])

  return (
    <div className="h-[44rem] mb-4 mx-2 cursor-pointer bg-white shadow duration-150 hover:shadow-lg rounded-md">
      <img className="h-5/6 w-full object-cover object-center" src={`/src/assets/images/${product.main_img}`} alt="product" />
      <div className='p-1'>
        <div className='flex justify-between items-center'>
          <p className="my-4 pl-4 ibm-medium text-black-800">{product.name}</p>
          <div className='flex justify-end mr-4'>
            <Rating className="w-[6rem] pr-[0.25rem]" readOnly value={avgRating} itemStyles={starStyling}/>
            <p className='text-sm ibm-light text-black-400'>{avgRating}</p>
          </div>
        </div>
        <p className="mb-4 ml-4 ibm-light text-black-400">¥{product.price}</p>
      </div>
    </div>
  )
}
export default ProductCard;
