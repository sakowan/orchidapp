import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../CartContext'
import api from '../api';
import { ChevronLeft } from 'lucide-react';
import {useElements, useStripe, CardNumberElement, CardExpiryElement, CardCvcElement} from "@stripe/react-stripe-js";

const stripeStyles = {
    style: {
      base: {
        fontSize: '20px', // Equivalent to `text-lg` in Tailwind CSS
        '::placeholder': {
          color: '#9CA3AF', // gray-400
        },
      },
    }
  };

const PaymentForm = ({ formData, setFormData, onEditShippingData}) => {
    const { cartProds, numCartProds, subtotal, shippingFee } = useContext(CartContext);
    const stripe = useStripe();
    const elements = useElements();

    const editShippingData = () => {
        onEditShippingData();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData.email)

        // Check if Stripe.js has loaded yet
        if (!stripe || !elements) {
            console.log('Stripe has not loaded.')
            return;
        }

        // Retrieve card
        const card = elements.getElement(CardNumberElement);
        if (card == null) {
            console.log('Card element does not exist.')
            return;
        }
        
        // Create a payment method, comes with an id.
        // Exp and cvc element info is also passed automatically.
        const {paymentMethod, error} = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        // Update form data with shipping fee and subtotal
        // setFormData(prevData => ({
        //     ...prevData,
        //     'cartProds': cartProds,
        //     'numCartProds': numCartProds,
        //     'subtotal': subtotal,
        //     'shippingFee':  shippingFee,
        // })); 

        const data = {
            payment_method_id: paymentMethod.id,
            ...formData,  // Spread the formData object properties
            cart_prods: cartProds,
            num_cart_prods: numCartProds,
            subtotal: subtotal,
            shipping_fee: shippingFee,
          };
          
        api.post('/save-stripe-info/', data)
          .then(response => {
            console.log(response.data);
          }).catch(error => {
            console.log(error)
        });
    };

    return (
        <div className='py-6'>
            <p className="form-header">Payment</p>
            <p>All transactions are secure and encrypted.</p>
            <div className="flex flex-col justify-between mt-4 p-8 relative border border-gray-400 rounded-md bg-gray-100">
                <form onSubmit={handleSubmit}>
                    <div className="flex justify-between">
                        <label htmlFor='card-num'>Card Number</label>
                        {/* Card Symbols*/}
                        <div className='flex items-center'>
                            <img src='/src/assets/images/banks/ma_1.png' className='h-[1.75rem]'/>
                            <img src='/src/assets/images/banks/visa_blue.png' className='h-[1rem]'/>
                            <img src='/src/assets/images/banks/JCB.svg' className='ml-2 h-[1.5rem]'/>
                            <img src='/src/assets/images/banks/amex.png' className='ml-2 h-[2rem]'/>
                        </div>
                    </div>
                    <CardNumberElement id='card-num'
                    className="stripe-input w-full"
                    placeholder="Card Number"
                    options={stripeStyles}/>
                    
                    <div className="flex mt-4 space-x-8">
                        <div className="flex-col w-1/2">
                            <label htmlFor='card-exp'>Expiry</label>
                            <CardExpiryElement
                            id='card-exp'
                            className="stripe-input"
                            options={stripeStyles}/>
                        </div>

                        <div className="flex-col w-1/2">
                            <label htmlFor='card-cvc'>CVC</label>
                            <CardCvcElement
                            id='card-cvc'
                            className="stripe-input"
                            options={{... stripeStyles, placeholder: '789'}}/>
                        </div>
                    </div>
                </form>
            </div>
            <div className="flex justify-between items-center mt-8">
                <div className='flex cursor-pointer text-colour-6 '>
                    <ChevronLeft strokeWidth={1}/>
                    <a onClick={() => editShippingData()} className="underline">Return to Shipping</a>
                </div>
                <button onClick={(e) => handleSubmit(e)} className='btn-1 btn-1-hover'>Pay now</button>
            </div>
        </div>
    );
};

export default PaymentForm;
