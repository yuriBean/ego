import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const sessionID = searchParams.get('sessionId');
    const Navigate = useNavigate();

    useEffect(() => {
        if (sessionID) {
            axios.get(`${process.env.REACT_APP_BACKEND_PORT}/checkout/success?sessionId=${sessionID}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res) => {
                Navigate('/login')
            }).catch((err) => {
                console.log(err)
                Navigate('/login')
            })
        }
    }, [sessionID])
    return (
        <div className="h-60vg flex justify-center items-center">
            <p className='text-semibold text-xl text-blue-500'>Loading...</p>
        </div>
    )
}

export default PaymentSuccess