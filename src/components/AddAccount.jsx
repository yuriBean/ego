import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSelector } from 'react-redux';

export default function AddAcccountModel({ open, setOpen, fetchData, row }) {

    const theme = useTheme();
    const userId = useSelector(state => state.authentication.userId);
    const handleClose = () => {
        setFormErrors({})
        setOpen(false);
    };

    const [formErrors, setFormErrors] = useState({});
    const [rowUpdated, setRowUpdated] = useState({ name: '', email: '', password: '', _id: '' });

    useEffect(() => {
        if (row.name && row.email) {
            setRowUpdated({ _id: row._id, name: row.name, email: row.email, password: row.password });
        } else {
            setRowUpdated({ name: '', email: '', password: '' });
        }
    }, [row.name && row.email]);    
   

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRowUpdated(prev => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        const errors = {};
        if (!rowUpdated.name.trim()) {
            errors.name = 'Name is required';
        }
        if (!rowUpdated.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(rowUpdated.email)) {
            errors.email = 'Email is invalid';
        }
        if (!rowUpdated.password.trim()) {
            errors.password = 'Password is required';
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0; // Returns true if no errors
    };


    const registerUser = async () => {
        if (validateForm()) {
            const userData = {
                name: rowUpdated.name,
                email: rowUpdated.email,
                password: rowUpdated.password,
                ownerId: userId,
            };
            if (!row.name && !row.email){
                try {
                    axios.post(`${process.env.REACT_APP_BACKEND_PORT}/sub/auth`, userData, {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    }).then(() => {
                        setOpen(false)
                        setRowUpdated({})
                        fetchData()
                    })
                } catch (error) {
                    console.error("Error registering user:", error);
                }
            } else {
                try {
                    axios.put(`${process.env.REACT_APP_BACKEND_PORT}/sub/auth/update/${rowUpdated._id}`, {userData}, {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    }).then((res) => {
                        setOpen(false)
                        fetchData()
                    })
                } catch (error) {
                    console.error("Error registering user:", error);
                }
            }
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
                        <h1 className='text-md font-semibold mb-2'><label className="cursor-pointer" >{`${row.name ? 'Update existing Account' : 'Add a new Account'}`}</label></h1>
                        <div className="flex w-full self-stretch p-1 mt-2.5 text-base leading-5 text-black">
                            <div className="flex w-full flex-col rounded-xl">
                                <div className="flex flex-col">
                                    <div className="flex flex-col">
                                        <div className="text-sm font-medium leading-5 text-black text-start">
                                            Name
                                        </div>
                                        <input onChange={handleInputChange} className={`flex flex-col justify-center px-3.5 py-2.5 mt-1.5 text-base leading-6 text-gray-500 bg-white rounded-lg border ${formErrors.name ? 'border-red-500' : 'border-gray-300'} border-solid shadow-sm`} type="text" placeholder="Enter your name" name="name" value={rowUpdated.name} />
                                        {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center">
                                    <div className="flex flex-col mt-4">
                                        <div className="text-sm font-medium leading-5 text-black text-start">
                                            Email
                                        </div>
                                        <input onChange={handleInputChange} className={`flex flex-col justify-center px-3.5 py-2.5 mt-1.5 text-base leading-6 text-gray-500 bg-white rounded-lg border ${formErrors.email ? 'border-red-500' : 'border-gray-300'} border-solid shadow-sm`} type="email" placeholder="Enter your email" name="email" value={rowUpdated.email} />
                                        {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center mt-4 whitespace-nowrap">
                                    <div className="flex flex-col">
                                        <div className="text-sm font-medium leading-5 text-black text-start">
                                            Password
                                        </div>
                                        <input onChange={handleInputChange} className={`flex flex-col justify-center px-3.5 py-2.5 mt-1.5 text-base leading-6 text-gray-500 bg-white rounded-lg border ${formErrors.password ? 'border-red-500' : 'border-gray-300'} border-solid shadow-sm`} type="password" name="password" placeholder="••••••••"  value={rowUpdated.password}/>
                                        {formErrors.password && <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col pt-8 w-full text-base font-semibold leading-6 whitespace-nowrap">
                            <div className="flex flex-col px-6 pb-6 w-full bg-white">
                                <div onClick={registerUser} className="cursor-pointer justify-center text-center items-center px-5 py-2.5 text-white bg-indigo-400 rounded-lg shadow-sm">
                                    <label className="cursor-pointer" >{`${row.name ? 'Update Account' : 'Create Account'}`}</label>
                                </div>
                                <div onClick={() => {setOpen(false); setFormErrors({})}} 
                                    className="cursor-pointer justify-center text-center items-center px-5 py-2.5 mt-3 text-black bg-white rounded-lg border border-gray-300 border-solid shadow-sm">
                                    Cancel
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </ThemeProvider >
    );
}