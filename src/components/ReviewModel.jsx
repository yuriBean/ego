import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSelector } from 'react-redux';

export default function ReviewModel({ open, setOpen, gameFormat, sendEmail }) {
    const theme = useTheme();
    const userId = useSelector(state => state.authentication.userId);
    const handleClose = () => {
        setOpen(false);
        setErrors({})
    };
    const [name, setName] = useState('');
    const [rating, setRating] = useState('');
    const [text, setReview] = useState('');
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        let formErrors = {};
        if (!name) formErrors.name = "Name is required";
        if (!rating) formErrors.rating = "Rating is required";
        if (!text) formErrors.text = "Review text is required";
        return formErrors;
    };

    const registerUser = async () => {
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        const userData = {
            name,
            rating,
            text,
            ownerId: gameFormat.ownerId,
            pageId: gameFormat._id,
        };

        try {
            await axios.post(`${process.env.REACT_APP_BACKEND_PORT}/review`, userData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setOpen(false);
            sendEmail();
        } catch (error) {
            console.error("Error registering user:", error);
        }
    };

    const customTheme = createTheme({
        breakpoints: {
            values: {
                xs: theme.breakpoints.values.xs,
                sm: 600, // Adjust breakpoint for 'sm' size (optional)
                md: theme.breakpoints.values.md,
                lg: theme.breakpoints.values.lg,
                xl: theme.breakpoints.values.xl,
            },
        },
    });

    return (
        <ThemeProvider theme={customTheme}>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                width="sm"
                fullWidth
            >
                <DialogContent>
                    <div className="flex w-full flex-col items-center px-7 pt-1 pb-4 text-center bg-white" style={{ borderRadius: "40px" }}>
                        <h1 className="text-md font-semibold mb-2">Write a Review</h1>
                        <div className="flex w-full self-stretch p-1 mt-2.5 text-base leading-5 text-black">
                            <div className="flex w-full flex-col rounded-xl">
                                <div className="flex flex-col">
                                    <div className="flex flex-col">
                                        <div className="flex flex-col">
                                            <div className="text-sm font-medium leading-5 text-black text-start">
                                                Name
                                            </div>
                                            <input
                                                onChange={(e) => setName(e.target.value)}
                                                value={name}
                                                className="flex flex-col justify-center px-3.5 py-2.5 mt-1.5 text-base leading-6 text-gray-500 bg-white rounded-lg border border-gray-300 border-solid shadow-sm"
                                                type="text"
                                                placeholder="Enter your name"
                                            />
                                            {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <div className="flex flex-col mt-4">
                                            <div className="text-sm font-medium leading-5 text-black text-start">
                                                Rating
                                            </div>
                                            <select
                                                onChange={(e) => setRating(e.target.value)}
                                                value={rating}
                                                className="flex flex-col justify-center px-3.5 py-2.5 mt-1.5 text-base leading-6 text-gray-500 bg-white rounded-lg border border-gray-300 border-solid shadow-sm"
                                            >
                                                <option value='' key=''>Rating</option>
                                                <option value='1' key='1'>1</option>
                                                <option value='2' key='2'>2</option>
                                                <option value='3' key='3'>3</option>
                                                <option value='4' key='4'>4</option>
                                                <option value='5' key='5'>5</option>
                                            </select>
                                            {errors.rating && <span className="text-red-500 text-sm">{errors.rating}</span>}
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-center mt-4 whitespace-nowrap">
                                        <div className="flex flex-col">
                                            <div className="text-sm font-medium leading-5 text-black text-start">
                                                Write a Review
                                            </div>
                                            <textarea
                                                onChange={(e) => setReview(e.target.value)}
                                                value={text}
                                                className="flex flex-col justify-center px-3.5 py-2.5 mt-1.5 text-base leading-6 text-gray-500 bg-white rounded-lg border border-gray-300 border-solid shadow-sm"
                                                cols="30"
                                                rows="4"
                                                placeholder="Review"
                                            ></textarea>
                                            {errors.text && <span className="text-red-500 text-sm">{errors.text}</span>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col pt-8 w-full text-base font-semibold leading-6 whitespace-nowrap">
                            <div className="flex flex-col px-6 pb-6 w-full bg-white">
                                <div
                                    onClick={registerUser}
                                    className="cursor-pointer justify-center text-center items-center px-5 py-2.5 text-white bg-indigo-400 rounded-lg shadow-sm"
                                >
                                    Confirm
                                </div>
                                <div
                                    onClick={() => {setOpen(false); setErrors({})}}
                                    className="cursor-pointer justify-center text-center items-center px-5 py-2.5 mt-3 text-black bg-white rounded-lg border border-gray-300 border-solid shadow-sm"
                                >
                                    Cancel
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </ThemeProvider>
    );
}
