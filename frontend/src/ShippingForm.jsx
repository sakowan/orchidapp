import React, {useState} from 'react'

const ShippingForm = (details) => {
  const [isFreeChecked, setisFreeChecked] = useState(false);
  const [isExpChecked, setisExpChecked] = useState(false);

  const handleChange = (e) => {
    if (e.target.id == 'free_shipping') {
      setisFreeChecked(true)
      setisExpChecked(false)

    } else {
      setisExpChecked(true)
      setisFreeChecked(false)
    }
  }

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
        <label htmlFor="free_shipping" className={`flex w-full p-5 bg-white rounded-lg cursor-pointer ${isFreeChecked ? 'text-colour-4 border border-colour-4': 'border border-gray-200 text-gray-500'}`}>
        
          <div className='w-5/6'>
            <div>Free Shipping</div>
            <div className="text-sm">Arrives within 2-3 business days.</div>
          </div>
          <div className='w-1/6 flex justify-end'>
            <input type="radio" id="free_shipping" name="shipping" value="free_shipping" className="peer" onChange={handleChange} required />
          </div>
        </label>

        <label htmlFor="express_shipping" className={`flex w-full p-5 bg-white rounded-lg cursor-pointer ${isExpChecked ? 'text-colour-4 border border-colour-4': 'border border-gray-200 text-gray-500'}`}>
        
          <div className='w-5/6'>
            <div>Express Shipping</div>
            <div className="text-sm">Arrives within 2-3 business days.</div>
          </div>
          <div className='w-1/6 flex justify-end'>
            <input type="radio" id="express_shipping" name="shipping" value="express_shipping" className="peer" onChange={handleChange} required />
          </div>
        </label>
    </>
  )
}

export default ShippingForm