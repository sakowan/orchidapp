import React from 'react'

export const ProductCard = ({ product }) => {
  return (
    <a href={`/product_listings/${product.id}`}>
      <div class="mx-auto px-5">
        <div class="max-w-xs cursor-pointer bg-white shadow duration-150 hover:scale-105 hover:shadow-md">
          <img class="w-full object-cover object-center" src={`/src/assets/images/${product.img_url}`} alt="product" />
          <div className='p-1'>
            <p class="my-4 pl-4 ibm-plex-mono-light text-black-500">{product.name}</p>
            <p class="mb-4 ml-4 text-xl font-semibold text-gray-800">¥{product.price}</p>
          </div>
        </div>
      </div>
    </a>
  )
}
export default ProductCard;
