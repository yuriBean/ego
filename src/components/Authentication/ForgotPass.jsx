import React, { useState } from 'react';
import axios from 'axios';

export default function ForgotPass() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleForgotPassword = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_PORT}/auth/forgot-password`, { email });
            setMessage(response.data.message);
        } catch (error) {
            setMessage('Error sending password reset email');
        }
    };

    return (
        <div className="h-full flex justify-center items-center mt-10">
            <div className="flex flex-col bg-white rounded-3xl shadow-xl max-w-[400px] w-full">
                <div className="flex flex-col w-full text-center bg-white">
                    <div className="flex flex-col px-6 pt-6 w-full bg-white">
                        <div className="flex flex-col">
                            <div className="text-lg font-semibold leading-7 text-gray-900">
                                Forgot Password
                            </div>
                            <div className="mt-1 text-sm leading-5 text-slate-600">
                                Enter your email to receive a password reset link.
                            </div>
                        </div>
                    </div>
                    <div className="w-full bg-white min-h-[20px]" />
                </div>
                <div className="flex flex-col justify-center px-6 w-full">
                    <div className="flex flex-col rounded-xl">
                        <div className="flex flex-col">
                            <div className="flex flex-col justify-center mt-4">
                                <div className="flex flex-col">
                                    <div className="text-sm font-medium leading-5 text-black">
                                        Email*
                                    </div>
                                    <input
                                        className="flex flex-col justify-center px-3.5 py-2.5 mt-1.5 text-base leading-6 text-gray-500 bg-white rounded-lg border border-gray-300 border-solid shadow-sm"
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col pt-8 w-full text-base font-semibold leading-6 whitespace-nowrap">
                    <div className="flex flex-col px-6 pb-6 w-full bg-white">
                        <button
                            onClick={handleForgotPassword}
                            className="justify-center text-center items-center px-5 py-2.5 text-white bg-indigo-400 rounded-lg shadow-sm cursor-pointer"
                        >
                            Send Reset Link
                        </button>
                    </div>
                    {message && <p className="mb-3 text-center text-gray-600">{message}</p>}
                </div>
            </div>
        </div>
    );
}
