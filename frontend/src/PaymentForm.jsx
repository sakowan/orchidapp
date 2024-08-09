import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PaymentForm = ({ formData }) => {
    const [response, setResponse] = useState(null);
    const [csrfToken, setCsrfToken] = useState('');

    useEffect(() => {
        const fetchCsrfToken = async () => {
            try {
                const { data } = await fetch('http://127.0.0.1:8000/api/csrf-token/');
                setCsrfToken(data.csrfToken);
            } catch (error) {
                console.error('Failed to fetch CSRF token:', error);
            }
        };

        fetchCsrfToken();
    }, []);

    const handlePost = async () => {
        try {
            console.log(csrfToken)
            const { data } = await axios.post('http://127.0.0.1:8000/api/checkout/', formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                },
            });
            console.log('Response:', data);
            setResponse(data);
        } catch (error) {
            console.error('Error:', error);
        }
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
