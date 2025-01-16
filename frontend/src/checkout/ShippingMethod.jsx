import React, {useState, useContext, useEffect} from 'react'
import { CartContext } from '../cart/CartContext'
import { ChevronLeft } from 'lucide-react'

const ShippingMethod = ({formData, onSendShippingData, onEditAddressData}) => {
  const [isFreeChecked, setIsFreeChecked] = useState(false);
  const [isExpChecked, setIsExpChecked] = useState(false);
  const [shippingType, setShippingType] = useState('');
  const { setShippingFee } = useContext(CartContext);

  
  const handleChange = (e) => {
    if (e.target.id === 'free_shipping') {
      setIsFreeChecked(true);
      setIsExpChecked(false);
      setShippingFee(0)
    } else {
      setIsExpChecked(true);
      setIsFreeChecked(false);
      setShippingFee(300)
    }
    setShippingType(e.target.id);
  };

  const sendShippingData = (edittingForm=false) => {
    if (shippingType) {
      onSendShippingData(shippingType, edittingForm);
    }
  };

  const editAddressData = () => {
    console.log('Function: editAddressData')
    sendShippingData(true)
    onEditAddressData()
  }

  useEffect(() => {
    if(formData.shipping_type=='free_shipping'){
      setIsFreeChecked(true)
      setIsExpChecked(false)
      setShippingType('free_shipping')

    } else if (formData.shipping_type=='express_shipping'){
      setIsExpChecked(true)
      setIsFreeChecked(false)
      setShippingType('express_shipping')
    }
  }, [])
  
  return (
    <>
      <label
        htmlFor="free_shipping"
        className={`flex w-full p-5 bg-white rounded-lg cursor-pointer ${
          isFreeChecked ? 'text-colour-5 border border-colour-5' : 'border border-gray-200 text-gray-500'
        }`}
      >
        <div className="w-5/6">
          <div>Free Shipping</div>
          <div className="text-sm">Arrives within 5-7 business days.</div>
        </div>
        <div className="w-1/6 flex justify-end">
          <input
            type="radio"
            id="free_shipping"
            name="shipping"
            value="free_shipping"
            className="peer"
            checked={isFreeChecked}
            onChange={handleChange}
            required
          />
        </div>
      </label>

      <label
        htmlFor="express_shipping"
        className={`flex w-full p-5 bg-white rounded-lg cursor-pointer ${
          isExpChecked ? 'text-colour-5 border border-colour-5' : 'border border-gray-200 text-gray-500'
        }`}
      >
        <div className="w-5/6">
          <div>Express Shipping - ¥300</div>
          <div className="text-sm">Arrives within 2-3 business days.</div>
        </div>
        <div className="w-1/6 flex justify-end">
          <input
            type="radio"
            id="express_shipping"
            name="shipping"
            value="express_shipping"
            className="peer"
            checked={isExpChecked}
            onChange={handleChange}
            required
          />
        </div>
      </label>
      <div className="w-full relative flex justify-between items-center pt-4">
        <div className='flex cursor-pointer text-colour-6 '>
          <ChevronLeft strokeWidth={1}/>
          <a onClick={() => editAddressData()} className="underline">Return to address details</a>
        </div>
        <button
          onClick={sendShippingData}
          className={`btn-1 absolute right-0 ${
            shippingType ? 'bg-colour-4 btn-1-hover' : 'cursor-default bg-gray-300'
          }`}
        >
          Proceed to Payment
        </button>
      </div>
    </>
  )
}

export default ShippingMethod