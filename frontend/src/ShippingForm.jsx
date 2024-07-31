import React from 'react'

const ShippingForm = () => {
  return (
    <>
      <div className="flex p-4 border border-gray-100 h-50">
        <div>
          <p className="text-sm text-gray p-2.5">Contact</p>
          <p className="text-sm text-gray p-2.5">Ship to</p>
        </div>
        <div>
          <p className='text-sm text-gray p-2.5'>Details</p>
        </div>
      </div>
      <div className="p-4 border border-gray-100 h-50 w-full space-y-4">
        <label htmlFor="free_shipping" className="flex w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer 
        peer-checked:border-brand-color-dark peer-checked:text-brand-color-dark hover:text-brand-color-dark hover:border-brand-color-dark">
        
          <div className='w-5/6'>
            <div>Free Shipping</div>
            <div className="text-sm">Arrives within 2-3 business days.</div>
          </div>
          <div className='w-1/6 flex justify-end'>
            <input type="radio" id="free_shipping" name="shipping" value="free_shipping" className="peer" required />
          </div>
        </label>

        <label htmlFor="express_shipping" className="flex w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer 
        peer-checked:border-brand-color-dark peer-checked:text-brand-color-dark hover:text-brand-color-dark hover:border-brand-color-dark">
        
          <div className='w-5/6'>
            <div>Express Shipping</div>
            <div className="text-sm">Arrives within 2-3 business days.</div>
          </div>
          <div className='w-1/6 flex justify-end'>
            <input type="radio" id="express_shipping" name="shipping" value="express_shipping" className="peer" required />
          </div>
        </label>
      </div>
    </>
  )
}

export default ShippingForm