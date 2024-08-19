import React from 'react'

export const ProductCard = ({ product }) => {
  return (
    <div className="h-[44rem] mb-4 mx-auto max-w-md cursor-pointer bg-white shadow duration-150 hover:shadow-lg">
      <img className="h-5/6 w-full object-cover object-center" src={`/src/assets/images/${product.img_url}`} alt="product" />
      <div className='p-1'>
        <p className="my-4 pl-4 ibm-plex-mono-medium text-black-800">{product.name}</p>
        <p className="mb-4 ml-4 ibm-plex-mono-light text-black-400">¥{product.price}</p>
      </div>
    </div>
  )
}
export default ProductCard;
