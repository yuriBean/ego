import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import MessageModal from "../MessageModal";

export default function ResetPassword() {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [newPasswordError, setNewPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const navigate = useNavigate();
    const { token } = useParams();

    const [openMessage, setOpenMessage] = useState(false);
    const [messageModal, setMessageModal] = useState("");

    const [link, setLink] = useState("");
    const [buttonText, setbuttonText] = useState("");

    const validateNewPassword = (password) => {
        if (password.length < 8) {
            return 'Password must be at least 8 characters long.';
        }
        return '';
    };

    const validateConfirmPassword = (password, confirmPassword) => {
        if (password !== confirmPassword) {
            return 'Passwords do not match.';
        }
        return '';
    };

    const handleResetPassword = async () => {
        const newPasswordError = validateNewPassword(newPassword);
        const confirmPasswordError = validateConfirmPassword(newPassword, confirmPassword);

        if (newPasswordError || confirmPasswordError) {
            setNewPasswordError(newPasswordError);
            setConfirmPasswordError(confirmPasswordError);
            return;
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_PORT}/auth/reset-password`, {
                token,
                newPassword,
            });
            setMessage(response.data.message);

            if (response.data.message === 'Password reset successful') {
                setMessageModal('The password has been successfully reset!')
                setbuttonText('Login')
                setLink('/login')
                setOpenMessage(true)
            }
        } catch (error) {
            setMessage('Error resetting password');
        }
    };

    return (
        <div className="h-full flex justify-center items-center mt-10">
            <div className="flex flex-col bg-white rounded-3xl shadow-xl max-w-[400px] w-full">
                <div className="flex flex-col w-full text-center bg-white">
                    <div className="flex flex-col px-6 pt-6 w-full bg-white">
                        <div className="flex flex-col">
                            <div className="text-lg font-semibold leading-7 text-gray-900">
                                Reset Password
                            </div>
                            <div className="mt-1 text-sm leading-5 text-slate-600">
                                Enter your new password.
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
                                        New Password*
                                    </div>
                                    <input
                                        className="flex flex-col justify-center px-3.5 py-2.5 mt-1.5 text-base leading-6 text-gray-500 bg-white rounded-lg border border-gray-300 border-solid shadow-sm"
                                        type="password"
                                        placeholder="Enter your new password"
                                        value={newPassword}
                                        onChange={(e) => {
                                            setNewPassword(e.target.value);
                                            setNewPasswordError(validateNewPassword(e.target.value));
                                        }}
                                    />
                                    {newPasswordError && <span className="text-red-500 text-sm">{newPasswordError}</span>}
                                </div>
                            </div>
                            <div className="flex flex-col justify-center mt-4">
                                <div className="flex flex-col">
                                    <div className="text-sm font-medium leading-5 text-black">
                                        Confirm Password*
                                    </div>
                                    <input
                                        className="flex flex-col justify-center px-3.5 py-2.5 mt-1.5 text-base leading-6 text-gray-500 bg-white rounded-lg border border-gray-300 border-solid shadow-sm"
                                        type="password"
                                        placeholder="Confirm your new password"
                                        value={confirmPassword}
                                        onChange={(e) => {
                                            setConfirmPassword(e.target.value);
                                            setConfirmPasswordError(validateConfirmPassword(newPassword, e.target.value));
                                        }}
                                    />
                                    {confirmPasswordError && <span className="text-red-500 text-sm">{confirmPasswordError}</span>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col pt-8 w-full text-base font-semibold leading-6 whitespace-nowrap">
                    <div className="flex flex-col px-6 pb-6 w-full bg-white">
                        <button
                            onClick={handleResetPassword}
                            className="justify-center text-center items-center px-5 py-2.5 text-white bg-indigo-400 rounded-lg shadow-sm cursor-pointer"
                        >
                            Reset Password
                        </button>
                    </div>
                    {message && <p className="mt-2 text-center text-gray-600">{message}</p>}
                </div>
            </div>
            {openMessage && <MessageModal open={openMessage} setOpen={setOpenMessage} message={messageModal} ButtonText={buttonText} link={link} />}
        </div>
    );
}
