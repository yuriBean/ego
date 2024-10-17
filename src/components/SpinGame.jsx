import React, { useEffect, useState } from 'react';
import './index.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ReviewModel from './ReviewModel';
import ReviewModel2 from './ReviewModel2';

import MessageModal from "./MessageModal";
import ego from '../assets/ego_withoutBG.png'

const Picker = require('random-picker').Picker;

const SpinGame = () => {
    const { id } = useParams();


    const [gameFormat, setGameFormate] = useState([]);
    const [isSpined, setIsSpined] = useState(false);
    const [email, setEmail] = useState('');
    const Navigate = useNavigate();
    const [reviewModel, setReviewModel] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);

    const [reviewModel2, setReviewModel2] = useState(true);
    const [url, setUrl] = useState('');

    const [textColor, setTextColor] = useState('text-white')
    const [render, setRender] = useState(false)

    const [openMessage, setOpenMessage] = useState(false);
    const [messageModal, setMessageModal] = useState("");

    const [link, setLink] = useState("");
    const [buttonText, setbuttonText] = useState(`D'accord`);

    useEffect(() => {
        if (id) {
            try {
                axios.get(`${process.env.REACT_APP_BACKEND_PORT}/game/play?pageId=${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }).then((res) => {
                    setGameFormate(res.data);
                    if (res.data.followOrReview === 'instagram') {
                        setUrl(res.data.instagram)
                    } else if (res.data.followOrReview === 'google') {
                        setUrl(res.data.googleMaps)
                    }

                    const currentDate = new Date();
                    const expiryDate = new Date(res.data.expiryDate);

                    if (!res.data.toggle) {
                        setMessageModal('La page est désactivée !')
                        setLink('/')
                        setbuttonText("Page d'accueil")
                        setOpenMessage(true)
                    } else if (expiryDate < currentDate) {
                        setMessageModal("La page est expirée !")
                        setbuttonText("Page d'accueil")
                        setLink("/")
                        setOpenMessage(true)
                    } else {
                        setRender(true)
                    }
                    
                });
            } catch (error) {
                console.log(error);
                console.error("Error fetching game format");
            }
        }
    }, [id]);


    useEffect(() => {
        if (gameFormat.buttonColor === '#E3F2FD')
            setTextColor('text-black')
        else
            setTextColor('text-white')
    }, [gameFormat.buttonColor])

    const spinedClick = (gameFormat) => {
        if (email) {
            axios.post(`${process.env.REACT_APP_BACKEND_PORT}/review/check`, { email })
                .then((res) => {
                    setIsSpined(true);
                    const wheel = document.querySelector('.wheel');
                    const picker = new Picker();
                    picker.option(0, gameFormat.options.option6frequency); //try again 6

                    picker.option(45, gameFormat.options.option5frequency); //option 5
                    picker.option(90, gameFormat.options.option4frequency); //option 4

                    picker.option(135, gameFormat.options.option7frequency); //try again 7

                    picker.option(180, gameFormat.options.option3frequency); //option 3
                    picker.option(225, gameFormat.options.option2frequency); //option 2

                    picker.option(270, gameFormat.options.option8frequency); //try again 8

                    picker.option(315, gameFormat.options.option1frequency); //option 1


                    const selectedOption = picker.pick();
                    const selected = selectedOption === 0 ? 'try again' : selectedOption === 45 ? 5 : selectedOption === 90 ? 4 : selectedOption === 135 ? 'try again' : selectedOption === 180 ? 3 : selectedOption === 225 ? 2 : selectedOption === 270 ? 'try again' : selectedOption === 315 ? 1 : 'try again'
                    console.log("selectedOption: ", selectedOption);
                    console.log('selected: ', selected);



                    console.log("Frequecy 6, 0: ", gameFormat.options.option6frequency);
                    console.log("Frequecy 5, 45: ", gameFormat.options.option5frequency);
                    console.log("Frequecy 4, 90: ", gameFormat.options.option4frequency);
                    console.log("Frequecy 7, 135: ", gameFormat.options.option7frequency);
                    console.log("Frequecy 3, 180: ", gameFormat.options.option3frequency);
                    console.log("Frequecy 2, 225: ", gameFormat.options.option2frequency);
                    console.log("Frequecy 8, 270: ", gameFormat.options.option8frequency);
                    console.log("Frequecy 1, 315: ", gameFormat.options.option1frequency);





                    setSelectedIndex(selected);



                    wheel.style.transition = 'transform 5s ease-in-out';
                    wheel.style.transform = `rotate(${360 * 3 + selectedOption}deg)`;
                })
                .catch((err) => {
                    setMessageModal(err.response.data.message)
                    setOpenMessage(true)

                });
        } else {
            setMessageModal("Entrez d'abord votre e-mail pour faire tourner")
            setOpenMessage(true)

        }
    };



    const sendEmail = () => {

        if (selectedIndex !== -1 && selectedIndex !== 'try again' && email) {
            try {
                axios.post(`${process.env.REACT_APP_BACKEND_PORT}/result`, {
                    email: email,
                    selectedGift: gameFormat.options[`option${selectedIndex}`],
                    message: gameFormat.content,
                    resturantName: gameFormat.resturantName,
                    resturantAddress: gameFormat.resturantAddress
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }).then((res) => {
                    setMessageModal(res.data.message)
                    setOpenMessage(true)
                });
            } catch (error) {
                console.error("Error sending email")
            }
        }
    };

    const updateGame = (gameFormat1) => {
        const id = gameFormat1._id;
        axios.put(`${process.env.REACT_APP_BACKEND_PORT}/game/${id}`, { gameFormat: gameFormat1 }, {
            headers: {
                'Content-Type': 'application/json'
            },
        })
    }

    return (
        <>
            {

                !render ? (
                    <div>Chargement...</div>
                ) : (

                    <div>
                        <div className='flex justify-center mt-3'>
                            {
                                gameFormat.logo ? <img src={gameFormat.logo} alt="logo" className="shrink-0 rounded-full bg-zinc-300 h-[100px] w-[100px] max-md:mt-10" /> : <h1 className='font-bold font-sans text-2xl italic'>{gameFormat?.brandName}</h1>
                            }
                        </div>
                        <div className='flex flex-col md:flex-row gap-11 max-w-[900px] justify-between mx-auto items-center mt-10'>
                            <div className="container mt-10 mb-0 md:mb-0">

                                <div className="spinBtn" onClick={() => spinedClick(gameFormat)}></div>
                                <div className="wheel">
                                    <div className="number" style={{ '--i': 1, '--clr': gameFormat?.wheelColorPair?.color1 ? gameFormat?.wheelColorPair?.color1 : '#8497FC' }}>
                                        <span className=' text-white'>Perdu</span>
                                    </div>
                                    <div className="number" style={{ '--i': 2, '--clr': gameFormat?.wheelColorPair?.color2 ? gameFormat?.wheelColorPair?.color2 : '#FDFDAF' }}>
                                        <span>{gameFormat?.options?.option1 || 'option 1'}</span>
                                    </div>
                                    <div className="number" style={{ '--i': 3, '--clr': gameFormat?.wheelColorPair?.color1 ? gameFormat?.wheelColorPair?.color1 : '#8497FC' }}>
                                        <span className=' text-white'>Perdu</span>
                                    </div>
                                    <div className="number" style={{ '--i': 4, '--clr': gameFormat?.wheelColorPair?.color2 ? gameFormat?.wheelColorPair?.color2 : '#FDFDAF' }}>
                                        <span>{gameFormat?.options?.option2 || 'option 2'}</span>
                                    </div>
                                    <div className="number" style={{ '--i': 5, '--clr': gameFormat?.wheelColorPair?.color1 ? gameFormat?.wheelColorPair?.color1 : '#8497FC' }}>
                                        <span>{gameFormat?.options?.option3 || 'option 3'}</span>
                                    </div>
                                    <div className="number" style={{ '--i': 6, '--clr': gameFormat?.wheelColorPair?.color2 ? gameFormat?.wheelColorPair?.color2 : '#FDFDAF' }}>
                                        <span className=' text-white'>Perdu</span>
                                    </div>
                                    <div className="number" style={{ '--i': 7, '--clr': gameFormat?.wheelColorPair?.color1 ? gameFormat?.wheelColorPair?.color1 : '#8497FC' }}>
                                        <span>{gameFormat?.options?.option4 || 'option 4'}</span>
                                    </div>
                                    <div className="number" style={{ '--i': 8, '--clr': gameFormat?.wheelColorPair?.color2 ? gameFormat?.wheelColorPair?.color2 : '#FDFDAF' }}>
                                        <span>{gameFormat?.options?.option5 || 'option 5'}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col font-medium text-black leading-[140%] max-w-[454px]">
                                <div className="w-full text-3xl font-bold text-center">
                                    Tentez votre chance pour une récompense!
                                </div>
                                <div className="mt-8 w-full text-xl text-center">
                                    Tournez la roue: Entrez votre email!
                                </div>
                                <div className="mt-8 w-full text-sm leading-5">Email</div>
                                <input type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder='Entrez votre email' className="justify-center px-3.5 py-2.5 mt-1.5 text-base leading-6 bg-white rounded-lg border border-gray-300 border-solid shadow-sm text-zinc-400" value={email} />
                                <div onClick={() => {
                                    if (email && isSpined) {
                                        console.log("mail");
                                        sendEmail();
                                    } else {
                                        if (isSpined) {
                                            setReviewModel(true)
                                        } else {
                                            setMessageModal('Tournez la roue dabord.')
                                            setOpenMessage(true)
                                        }
                                    }
                                }} className={`justify-center cursor-pointer items-center px-3 py-2.5 mt-8 w-full text-base font-semibold leading-6 ${textColor} whitespace-nowrap text-center rounded-lg shadow-sm`}
                                    style={{ backgroundColor: gameFormat?.buttonColor ? gameFormat?.buttonColor : '#4F46E5' }}>
                                    Confirmer
                                </div>
                                <div className="mt-8 w-full text-xl text-center">
                                    Remarque : Un seul essai par participant
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-4 justify-center">
                            <a onClick={() => {
                                const data = { ...gameFormat, instagramClicks: gameFormat.instagramClicks + 1 };

                                updateGame(data)
                            }} href={gameFormat?.instagram}  ><img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/357f101341ddf98f66af8d3f23083bbaca5abcfd9acc131ab16b4f86548f66e9?apiKey=cf358c329e0d49a792d02d32277323ef&"
                                    className="shrink-0 aspect-square w-[25px]"
                                /></a>
                            <a onClick={() => {
                                const data = { ...gameFormat, facebookClicks: gameFormat.facebookClicks + 1 };

                                updateGame(data)
                            }} href={gameFormat?.facebook}  ><img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/3bf7478fb7f2a263892712e4aa14999672df84ec24dda36a9b73c6b87ab35cfa?apiKey=cf358c329e0d49a792d02d32277323ef&"
                                    className="shrink-0 aspect-square w-[25px]"
                                /></a>
                            <a onClick={() => {
                                const data = { ...gameFormat, twitterClicks: gameFormat.twitterClicks + 1 };

                                updateGame(data)
                            }} href={gameFormat?.twitter}  ><img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/981bbe54100ad5fb3359a76a6d80f34022804d47da69407e294c32b6b305e5f3?apiKey=cf358c329e0d49a792d02d32277323ef&"
                                    className="shrink-0 aspect-square w-[25px]"
                                /></a>
                            <a onClick={() => {
                                const data = { ...gameFormat, googleMapsClicks: gameFormat.googleMapsClicks + 1 };

                                updateGame(data)
                            }} href={gameFormat?.googleMaps}  ><img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/ad647feebebd6e3ac712531bcfe244603e99a1e02f585c4702345d935b2f1dd6?apiKey=cf358c329e0d49a792d02d32277323ef&"
                                    className="shrink-0 aspect-square w-[25px]"
                                /></a>
                        </div>
                        <div className='flex flex-col justify-center items-center mt-28'>
                            <img src={ego}
                                alt="logo"
                                width={'8%'}
                                height={'8%'}
                                onClick={() => { Navigate('/') }}
                                className='cursor-pointer'
                            />
                            <div className="flex justify-center text-sm text-slate-800 mb-5">
                                © 2024 Ego. Tous droits réservés.
                            </div>
                        </div>


                        <ReviewModel open={reviewModel} setOpen={setReviewModel} gameFormat={gameFormat} sendEmail={sendEmail} />
                        <ReviewModel2 reviewModel2={reviewModel2} setReviewModel2={setReviewModel2} url={url} followOrReview={gameFormat.followOrReview} />

                    </div>
                )
            }
            {openMessage && <MessageModal open={openMessage} setOpen={setOpenMessage} message={messageModal} ButtonText={buttonText} link={link} />}
        </>
    );

};

export default SpinGame;
