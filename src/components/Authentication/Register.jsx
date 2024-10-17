import axios from "axios";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import VerifyEmailPopup from "../VerifyEmailPopup";
import MessageModal from "../MessageModal";

export default function Register() {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const nameRef = useRef(null);
    const Navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [isTrial, setIsTrial] = useState(false);
    const [errors, setErrors] = useState({});
    const [emailExist, setEmailExist] = useState(false)

    const [openMessage, setOpenMessage] = useState(false);


    const validateForm = () => {
        const newErrors = {};
        if (!nameRef.current.value) {
            newErrors.name = "Name is required";
        }
        if (!emailRef.current.value) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(emailRef.current.value)) {
            newErrors.email = "Email is invalid";
        }
        if (!passwordRef.current.value) {
            newErrors.password = "Password is required";
        } else if (passwordRef.current.value.length < 8) {
            newErrors.password = "Password must be at least 8 characters long";
        }
        return newErrors;
    };

    const registerUser = async () => {
        setEmailExist(false)
        setErrors({})

        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        const userData = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            isTrial: isTrial
        };
        try {
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_PORT}/auth`, userData, {
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (userData.isTrial) {
                setOpenMessage(true)
            } else {
                setOpen(true);
            }
        } catch (error) {
            setEmailExist(true)
            console.error("Error registering user:", error);
        }
    };

    return (
        <div className="h-full flex justify-center items-center mt-10">
            <div className="flex flex-col bg-white rounded-3xl shadow-xl max-w-[400px] w-full">
                <div className="flex flex-col w-full text-center bg-white">
                    <div className="flex flex-col px-6 pt-6 w-full bg-white">
                        <div className="flex flex-col">
                            <div className="text-lg font-semibold leading-7 text-gray-900">
                                Inscrivez-vous pour créer un compte
                            </div>
                        </div>
                    </div>
                    <div className="w-full bg-white min-h-[20px]" />
                </div>
                <div className="flex flex-col justify-center px-6 w-full">
                    <div className="flex flex-col rounded-xl">
                        <div className="flex flex-col">
                            <div className="flex flex-col justify-center">
                                <div className="flex flex-col">
                                    <div className="text-sm font-medium leading-5 text-black">
                                        Nom
                                    </div>
                                    <input ref={nameRef} className="flex flex-col justify-center px-3.5 py-2.5 mt-1.5 text-base leading-6 text-gray-500 bg-white rounded-lg border border-gray-300 border-solid shadow-sm" type="text" placeholder="Entrez votre nom" />
                                    {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
                                </div>
                            </div>
                            <div className="flex flex-col justify-center">
                                <div className="flex flex-col mt-4">
                                    <div className="text-sm font-medium leading-5 text-black">
                                        Email
                                    </div>
                                    <input ref={emailRef} className="flex flex-col justify-center px-3.5 py-2.5 mt-1.5 text-base leading-6 text-gray-500 bg-white rounded-lg border border-gray-300 border-solid shadow-sm" type="email" placeholder="Entrez votre email" />
                                    {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
                                    {emailExist && <span className="text-red-500 text-sm">L'email existe déjà !</span>}
                                </div>
                            </div>
                            <div className="flex flex-col justify-center mt-4 whitespace-nowrap">
                                <div className="flex flex-col">
                                    <div className="text-sm font-medium leading-5 text-black">
                                        Mot de passe
                                    </div>
                                    <input ref={passwordRef} className="flex flex-col justify-center px-3.5 py-2.5 mt-1.5 text-base leading-6 text-gray-500 bg-white rounded-lg border border-gray-300 border-solid shadow-sm" type="password" placeholder="••••••••" />
                                    {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
                                    <div className="flex gap-0 pr-2 mt-2 text-sm leading-5 justify-between items-center text-gray-600">
                                        <p>Doit comporter au moins 8 caractères.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <label className="text-sm font-medium leading-5 text-black mt-4">Inscription pour essai ou paiement immédiat</label>
                    <div className="flex mt-2">
                        <div onClick={() => { setIsTrial(false) }} className="mr-7 flex items-center">
                            <input type='radio' id="pay" name="paymentType"/>
                            <label htmlFor="pay" className="text-sm font-medium leading-5 text-black ml-2">Payer maintenant</label>
                        </div>
                        <div onClick={() => { setIsTrial(true) }} className="flex items-center">
                            <input type='radio' id="trial" name="paymentType" />
                            <label htmlFor="trial" className="text-sm font-medium leading-5 text-black ml-2">Essai</label>
                        </div>
                    </div>
                    <div className="flex gap-0 pr-2 mt-6 text-sm leading-5 justify-between items-center text-gray-600">
                        <p>Vous avez déjà un compte ? <span className="text-blue-500 cursor-pointer" onClick={() => { Navigate('/login') }}>Connectez-vous maintenant</span>.</p>
                    </div>
                </div>
                <div className="flex flex-col pt-8 w-full text-base font-semibold leading-6 whitespace-nowrap">
                    <div className="flex flex-col px-6 pb-6 w-full bg-white">
                        <div onClick={registerUser} className="cursor-pointer justify-center text-center items-center px-5 py-2.5 text-white bg-indigo-400 rounded-lg shadow-sm">
                            Confirmer
                        </div>
                        <div onClick={() => Navigate('/login') } className="cursor-pointer justify-center text-center items-center px-5 py-2.5 mt-3 text-black bg-white rounded-lg border border-gray-300 border-solid shadow-sm">
                            Annuler
                        </div>
                    </div>
                </div>
            </div>
            <VerifyEmailPopup open={open} setOpen={setOpen} email={emailRef?.current?.value} />
            {openMessage && <MessageModal open={openMessage} setOpen={setOpenMessage} message={'Demande d’essai envoyée'} ButtonText={"Connexion"} link={"/login"}/>}
        </div>
    );
    
}
