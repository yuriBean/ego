import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import VerifyEmailPopup from "../VerifyEmailPopup";
import BlockedPopup from "../BlockedPopup";
import { useDispatch } from "react-redux";
import { registerUser } from "../../store/features/AuthenticationSlice";

export default function Login() {
    const emailRef = React.useRef(null);
    const passwordRef = React.useRef(null);
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [openBlocked, setOpenBlocked] = React.useState(false);

    const [emailError, setEmailError] = React.useState('');
    const [passwordError, setPasswordError] = React.useState('');
    const [rememberMe, setRememberMe] = React.useState(false); // State for Remember Me checkbox

    const location = useLocation();
    const { paymentType, amount, landingPages } = location.state || {};

    React.useEffect(() => {
        // Load saved credentials if they exist
        const savedEmail = localStorage.getItem("email");
        const savedPassword = localStorage.getItem("password");

        if (savedEmail && savedPassword) {
            emailRef.current.value = savedEmail;
            passwordRef.current.value = savedPassword;
            setRememberMe(true); // Check the box if we loaded saved credentials
        }
    }, []);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateForm = () => {
        let isValid = true;

        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        // Validate email
        if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address.');
            isValid = false;
        } else {
            setEmailError('');
        }

        // Validate password
        if (password.length < 8) {
            setPasswordError('Password must be at least 8 characters long.');
            isValid = false;
        } else {
            setPasswordError('');
        }

        return isValid;
    };

    const handleSubmit = async () => {
        setPasswordError('')
        setEmailError('')
        if (!validateForm()) {
            return;
        }

        const userData = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        };

        try {
            axios.get(`${process.env.REACT_APP_BACKEND_PORT}/auth?email=${userData.email}&password=${userData.password}`, {
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then(async (res) => {
                if (res.data.blocked) {
                    console.log('blocked');
                    setOpenBlocked(true)
                    return
                }

                console.log(res.data);

                if (!res.data.payment && !res.data.isTrial) {
                    if (!res.data.isVerified) {
                        console.log('not verified');
                        setOpen(true);
                        return
                    }
                    if (!paymentType) {
                        Navigate('/pricing')
                    } else {
                        if (paymentType.toLowerCase() === 'monthly') {
                            await axios.get(`${process.env.REACT_APP_BACKEND_PORT}/checkout/monthly?userId=${res.data.userId}&amount=${amount}&landingPages=${landingPages}`).then((res) => {
                                window.open(res.data.session.url)
                            })
                        } else {
                            await axios.get(`${process.env.REACT_APP_BACKEND_PORT}/checkout/yearly?userId=${res.data.userId}&amount=${amount}&landingPages=${landingPages}`).then((res) => {
                                window.open(res.data.session.url)
                            })
                        }
                    }
                } else {
                    // Save credentials if Remember Me is checked
                    if (rememberMe) {
                        localStorage.setItem("email", userData.email);
                        localStorage.setItem("password", userData.password);
                    } else {
                        localStorage.removeItem("email");
                        localStorage.removeItem("password");
                    }

                    dispatch(registerUser({
                        userId: res.data.userId,
                        name: res.data.name,
                        jwtToken: res.data.token,
                        ownerId: res.data.ownerId,
                        accountType: res.data.accountType,
                        isAdmin: res.data.isAdmin
                    }))
                    if (res.data.isAdmin) {
                        console.log(res.data.isAdmin);
                        Navigate('/admin/dashboard')
                    } else {
                        Navigate('/dashboard')
                    }
                }
                setPasswordError('')
                setEmailError('')


            }).catch((err) => {
                if (err.response.data.message === 'Invalid password'){
                    setPasswordError('Incorrect Password')
                }
                    
                else if (err.response.data.message === 'Invalid email'){
                    setEmailError('Invalid email')
                }
                    
                console.error(err.response.data.message)

               
            })
        } catch (error) {
            console.error("Error signing in user:", error);
        }
    };


    return (
        <div className="h-full flex justify-center items-center mt-10">
            <div className="flex flex-col bg-white rounded-3xl shadow-xl max-w-[400px] w-full">
                <div className="flex flex-col w-full text-center bg-white">
                    <div className="flex flex-col px-6 pt-6 w-full bg-white">
                        <div className="flex flex-col">
                            <div className="text-lg font-semibold leading-7 text-gray-900">
                                Connectez-vous à votre compte
                            </div>
                            <div className="mt-1 text-sm leading-5 text-slate-600">
                                Bon retour ! Veuillez entrer vos coordonnées.
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
                                    <input className="flex flex-col justify-center px-3.5 py-2.5 mt-1.5 text-base leading-6 text-gray-500 bg-white rounded-lg border border-gray-300 border-solid shadow-sm" type="email" placeholder="Entrez votre email" ref={emailRef} />
                                    {emailError && <span className="text-red-500 text-sm">{emailError}</span>}
                                </div>
                            </div>
                            <div className="flex flex-col justify-center mt-4 whitespace-nowrap">
                                <div className="flex flex-col">
                                    <div className="text-sm font-medium leading-5 text-black">
                                        Mot de passe
                                    </div>
                                    <input className="flex flex-col justify-center px-3.5 py-2.5 mt-1.5 text-base leading-6 text-gray-500 bg-white rounded-lg border border-gray-300 border-solid shadow-sm" type="password" placeholder="••••••••" ref={passwordRef} />
                                    {passwordError && <span className="text-red-500 text-sm">{passwordError}</span>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-0 pr-2 mt-5 text-sm leading-5 justify-between items-center">
                        <div className="flex gap-1 py-0.5 font-medium text-black">
                            <input 
                                type="checkbox" 
                                className="flex-auto my-auto mr-1 cursor-pointer"
                                checked={rememberMe}
                                onChange={() => setRememberMe(!rememberMe)} // Update state on change
                            />
                            <div className="flex-auto my-auto">Se souvenir de moi</div>
                        </div>
                        <div onClick={() => { Navigate('/forgot') }} className="cursor-pointer justify-end font-semibold text-indigo-400">
                            Mot de passe oublié ?
                        </div>
                    </div>
                    <div className="flex gap-0 pr-2 mt-6 text-sm leading-5 justify-between items-center text-gray-600">
                        <p>Pas encore de compte ? <span className="text-blue-500 cursor-pointer" onClick={() => { Navigate('/register') }}>Inscrivez-vous maintenant</span>.</p>
                    </div>
                </div>
                <div className="flex flex-col pt-8 w-full text-base font-semibold leading-6 whitespace-nowrap">
                    <div className="flex flex-col px-6 pb-6 w-full bg-white">
                        <button onClick={handleSubmit} className="justify-center text-center items-center px-5 py-2.5 text-white bg-indigo-400 rounded-lg shadow-sm cursor-pointer">
                            Confirmer
                        </button>
                        <div onClick={() => { Navigate('/') }} className="justify-center text-center items-center px-5 py-2.5 mt-3 text-black bg-white rounded-lg cursor-pointer border border-gray-300 border-solid shadow-sm">
                            Annuler
                        </div>
                    </div>
                </div>
            </div>
            <VerifyEmailPopup open={open} setOpen={setOpen} email={emailRef?.current?.value} />
            <BlockedPopup open={openBlocked} setOpen={setOpenBlocked} email={emailRef?.current?.value} />
        </div>
    );
    
}
