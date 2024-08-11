import React, { useState, useEffect } from 'react';

const PaymentForm = ({ formData }) => {
    const [response, setResponse] = useState(null);

    const handlePost = async () => {
        console.log('hi')
    };

    return (
        <div className="w-full relative">
            <button 
                onClick={handlePost}
                className='main-button bg-colour-4 main-button-hover'
            >
                Pay now
            </button>
        </div>
    );
};

export default PaymentForm;
