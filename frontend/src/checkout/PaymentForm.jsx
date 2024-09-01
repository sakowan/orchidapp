import React, { useState, useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';
import {useElements, useStripe, CardNumberElement, CardExpiryElement, CardCvcElement} from "@stripe/react-stripe-js";

const stripeStyles = {
    style: {
      base: {
        fontSize: '1.25rem', // Equivalent to `text-lg` in Tailwind CSS
        lineHeight: '2.75rem',
        '::placeholder': {
          color: '#9CA3AF', // gray-400
        },
      },
    }
  };

const PaymentForm = ({ formData }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [response, setResponse] = useState(null);

    const handleChange = (event) => {
        if (event.error) {
          setError(event.error.message);
        } else {
          setError(null);
        }
    }

    const handleSubmit = async () => {
        console.log('hi')
    };

    return (
        <>
            <p className="form-header">Payment</p>
            <p>All transactions are secure and encrypted.</p>
            <div className="flex flex-col justify-between p-8 relative border border-gray-400 w-4/5 rounded-md bg-gray-100">
                <form onSubmit={handleSubmit}>
                    <label htmlFor='card-num'>Card Number</label>
                    <CardNumberElement id='card-num'
                    className="stripe-input w-full"
                    placeholder="Card Number"
                    options={stripeStyles}>
                    </CardNumberElement>
                    
                    <div className="flex mt-4 space-x-8">
                        <div className="flex-col w-1/2">
                            <label htmlFor='card-exp'>Expiry</label>
                            <CardExpiryElement
                            id='card-exp'
                            className="stripe-input"
                            options={stripeStyles}>
                            </CardExpiryElement>
                        </div>

                        <div className="flex-col w-1/2">
                            <label htmlFor='card-cvc'>CVC</label>
                            <CardCvcElement
                            id='card-cvc'
                            className="stripe-input"
                            options={{... stripeStyles, placeholder: '789'}}>
                            </CardCvcElement>
                        </div>
                    </div>
                </form>
                <div className="flex items-center justify-between mt-8">
                    <div className='flex'>
                        <ChevronLeft strokeWidth={1}/>
                        <a>Return to shipping</a>
                    </div>
                    <button onClick={handleSubmit} className='btn-1 btn-1-hover'>Pay now</button>
                </div>
            </div>
        </>
    );
};

export default PaymentForm;
