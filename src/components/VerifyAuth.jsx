import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const VerifyAuth = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const Navigate = useNavigate();

    useEffect(() => {
        if (id) {
            axios.patch(`${process.env.REACT_APP_BACKEND_PORT}/auth/verify/${id}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res) => {
                Navigate('/pricing')
            }).catch((err) => {
                Navigate('/login')
            })
        }
    }, [id])
    return (
        <div className="h-60vg flex justify-center items-center">
            <p className='text-semibold text-xl text-blue-500'>Loading...</p>
        </div>
    )
}

export default VerifyAuth