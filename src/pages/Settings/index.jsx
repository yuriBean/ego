import React, { useEffect, useState } from 'react'
import AsideHeader from '../../components/AsideHeader'
import axios from 'axios';
import { useSelector } from 'react-redux';

const Index = () => {
    const userId = useSelector(state => state.authentication.userId)
    const [profile, setProfile] = useState({});

    const handleButtonClick = () => {
        document.getElementById('fileInput').click();
    };

    const ImageUpload = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement("canvas");
                    const ctx = canvas.getContext("2d");
                    const maxWidth = 300;
                    const maxHeight = 150;
                    let width = img.width;
                    let height = img.height;
                    if (width > maxWidth || height > maxHeight) {
                        if (width > maxWidth) {
                            height *= maxWidth / width;
                            width = maxWidth;
                        }
                        if (height > maxHeight) {
                            width *= maxHeight / height;
                            height = maxHeight;
                        }
                    }
                    canvas.width = width;
                    canvas.height = height;
                    ctx.drawImage(img, 0, 0, width, height);
                    const compressedBase64 = canvas.toDataURL("image/jpeg", 0.5); // Adjust the quality as needed
                    setProfile({ ...profile, profilePicture: compressedBase64 });
                };
                img.src = reader.result;
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        try {
            axios.get(`${process.env.REACT_APP_BACKEND_PORT}/auth/${userId}`, {
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then((res) => {
                setProfile(res.data);
                console.log(res);
            })
        } catch (error) {
            console.error("error");
        }
    }, [])


    const updateProfile = () => {
        try {
            axios.patch(`${process.env.REACT_APP_BACKEND_PORT}/auth/${userId}`, profile, {
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then((res) => {
                setProfile(res.data);
            })
        } catch (error) {
            console.error("error");
        }
    }
    return (
        <div className="flex mb-20">
            <AsideHeader />
            <div className="flex w-full flex-col items-center mt-4 max-md:mt-10 max-md:max-w-full">
                <div className="justify-center text-center self-start p-2.5 mt-6 text-lg font-medium tracking-wide leading-6 text-blue-950">
                Paramètres
                </div>
                <div className="pr-6 mt-10 bg-white shadow-sm w-full max-md:pr-5 ">
                    <div className="flex flex-col items-start gap-5 max-md:flex-col shadow-[0px_5px_10px_1px_rgba(0,0,0,0.3)] max-md:gap-0">
                        <div className='flex flex-col md:flex-row w-full'>
                            <div className="flex flex-col max-md:ml-0 w-full">
                                <div className="flex flex-col grow p-6 w-full bg-white max-md:px-5 max-md:mt-10 max-md:max-w-full">
                                    <div className="text-2xl font-semibold text-center text-black max-md:max-w-full">
                                        Informations de base
                                    </div>
                                    <div className="flex flex-col mt-5 w-full">
                                        <div className="flex w-full flex-col justify-center max-md:max-w-full">
                                            <div className="flex flex-col max-md:max-w-full">
                                                <div className="text-sm font-medium leading-5 text-slate-700 max-md:max-w-full">
                                                    Nom*
                                                </div>
                                                <div className="flex flex-col justify-center mt-1.5 text-base leading-6 text-gray-500 bg-white rounded-lg border border-gray-300 border-solid shadow-sm max-md:max-w-full">
                                                    <input onChange={(event) => {
                                                        setProfile({ ...profile, name: event.target.value })
                                                    }} placeholder='Entrez votre nom' className="outline-none px-3.5 py-2.5 justify-center max-md:max-w-full" value={profile?.name} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col justify-center mt-4 max-md:max-w-full">
                                            <div className="flex flex-col max-md:max-w-full">
                                                <div className="text-sm font-medium leading-5 text-slate-700 max-md:max-w-full">
                                                    Email*
                                                </div>
                                                <div className="flex flex-col justify-center mt-1.5 text-base leading-6 text-gray-500 bg-white rounded-lg border border-gray-300 border-solid shadow-sm max-md:max-w-full">
                                                    <input onChange={(event) => {
                                                        setProfile({ ...profile, email: event.target.value })
                                                    }} placeholder='Entrez votre email' className="outline-none px-3.5 py-2.5 justify-center max-md:max-w-full" value={profile?.email} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col justify-center mt-4 max-md:max-w-full">
                                            <div className="flex flex-col max-md:max-w-full">
                                                <div className="text-sm font-medium leading-5 text-slate-700 max-md:max-w-full">
                                                    Numéro de téléphone*
                                                </div>
                                                <div className="flex flex-col justify-center mt-1.5 text-base leading-6 text-gray-500 bg-white rounded-lg border border-gray-300 border-solid shadow-sm max-md:max-w-full">
                                                    <input onChange={(event) => {
                                                        setProfile({ ...profile, phoneNumber: event.target.value })
                                                    }} placeholder='Entrez votre numéro de téléphone' className="outline-none px-3.5 py-2.5 justify-center max-md:max-w-full" value={profile?.phoneNumber} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col justify-center mt-4 max-md:max-w-full">
                                            <div className="flex flex-col max-md:max-w-full">
                                                <div className="text-sm font-medium leading-5 text-slate-700 max-md:max-w-full">
                                                    Nom d'utilisateur
                                                </div>
                                                <div className="flex flex-col justify-center mt-1.5 text-base leading-6 text-gray-500 bg-white rounded-lg border border-gray-300 border-solid shadow-sm max-md:max-w-full">
                                                    <input placeholder='Entrez un nom dutilisateur' className="outline-none px-3.5 py-2.5 justify-center max-md:max-w-full" disabled value={`${profile?.name}-${profile?._id}`} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col ml-5 max-w-full md:max-w-[300px] w-full max-md:ml-0 max-md:w-full">
                                <div className="flex flex-col self-stretch my-auto text-center max-md:mt-10">
                                    <div className="text-2xl font-semibold text-black">
                                        Photo de profil
                                    </div>
                                    {
                                        profile?.profilePicture ? <img className="mt-6 rounded-full bg-zinc-300 h-[198px] w-[198px] mx-auto object-cover object-center" src={profile?.profilePicture} alt='' /> : <div className="shrink-0 mt-6 rounded-full bg-zinc-300 h-[198px] w-[198px] mx-auto" />
                                    }
                                    <div className='flex flex-col w-full'>
                                        <input
                                            type="file"
                                            id="fileInput"
                                            accept="image/*"
                                            style={{ display: 'none' }}
                                            onChange={ImageUpload}
                                        />
                                        <div
                                            className="self-center px-6 py-4 mt-6 text-base font-bold leading-4 text-white whitespace-nowrap cursor-pointer mb-2 bg-indigo-400 rounded-xl max-md:px-5 justify-end"
                                            onClick={handleButtonClick}
                                        >
                                            Parcourir
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
    
                    <div className="flex flex-col mt-10 mr-2 bg-white w-full max-md:px-5">
                        <div className='p-6 md:mx-5 w-full md:w-auto shadow-[0px_5px_10px_1px_rgba(0,0,0,0.3)]'>
                            <div className="text-2xl font-semibold text-black max-md:max-w-full">
                                Changer le mot de passe
                            </div>
                            <div className="flex flex-col mt-5 max-md:max-w-full">
                                <div className="flex flex-col justify-center max-md:max-w-full">
                                    <div className="flex flex-col max-md:max-w-full">
    
                                        <div className="text-sm font-medium leading-5 text-slate-700 max-md:max-w-full">
                                            Mot de passe actuel*
                                        </div>
                                        <div className="flex flex-col justify-center mt-1.5 text-base leading-6 text-gray-500 bg-white rounded-lg border border-gray-300 border-solid shadow-sm max-md:max-w-full">
                                            <input type="password" placeholder='Entrez votre mot de passe actuel' className="outline-none px-3.5 py-2.5 justify-center max-md:max-w-full" />
                                        </div>
                                        <div className="flex flex-col mt-1.5 max-md:max-w-full">
                                            <div className="flex flex-col max-md:max-w-full">
                                                <div className="text-sm font-medium leading-5 text-slate-700 max-md:max-w-full">
                                                    Nouveau mot de passe*
                                                </div>
                                                <div className="flex flex-col justify-center mt-1.5 text-base leading-6 text-gray-500 bg-white rounded-lg border border-gray-300 border-solid shadow-sm max-md:max-w-full">
                                                    <input type="password" placeholder='Créer un nouveau mot de passe' className="outline-none px-3.5 py-2.5 justify-center max-md:max-w-full" />
                                                </div>
                                            </div>
                                            <div className="mt-1.5 text-sm leading-5 text-slate-600 max-md:max-w-full">
                                                Doit contenir au moins 8 caractères.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center mt-4 max-md:max-w-full">
                                    <div className="flex flex-col max-md:max-w-full">
                                        <div className="text-sm font-medium leading-5 text-slate-700 max-md:max-w-full">
                                            Confirmer le mot de passe*
                                        </div>
                                        <div className="flex flex-col justify-center mt-1.5 text-base leading-6 text-gray-500 bg-white rounded-lg border border-gray-300 border-solid shadow-sm max-md:max-w-full">
                                            <input type="password" placeholder='Entrez le mot de passe pour confirmer' className="outline-none px-3.5 py-2.5 justify-center max-md:max-w-full" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-end w-full mt-10 md:mt-4 mr-10'>
                        <div onClick={updateProfile}
                            className="ml-7 px-6 py-4 mt-2 mb-6 text-base font-bold leading-4 text-white whitespace-nowrap cursor-pointer bg-indigo-400 rounded-xl max-md:px-5 justify-end"
                        >
                            Mettre à jour le profil
                        </div>
                    </div>
                </div>
    
    
            </div>
        </div>
        )
    
}

export default Index