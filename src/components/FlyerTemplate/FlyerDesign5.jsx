import React, { useEffect, useState } from 'react'
import qrImage from './Vector.png'
import chef from './chef.png'
import facebook from '../../assets/socials/facebook.png'
import google from '../../assets/socials/google.png'
import twitter from '../../assets/socials/twitter.png'
import instagram from '../../assets/socials/instagram.png'
import QRCode from 'qrcode.react';
import blue_yellow from '../../assets/lower_halfwheel/Fortune wheel.png'
import mango_orange from '../../assets/lower_halfwheel/Fortune wheel (1).png'
import rubby_coffee from '../../assets/lower_halfwheel/Fortune wheel (2).png'
import hunter_sweet from '../../assets/lower_halfwheel/Fortune wheel (3).png'
import alice_mandy from '../../assets/lower_halfwheel/Fortune wheel (4).png'
import purple_canary from '../../assets/lower_halfwheel/Fortune wheel (5).png'
import monza_yellow from '../../assets/lower_halfwheel/Fortune wheel (6).png'
import '../index.css'

export default function SpinDesign({ gameFormat }) {

    const [wheelColor, setWheelColor] = useState(blue_yellow)

    useEffect(() => {
        getWheelImage()

    }, [gameFormat.wheelColorPair])


    const getWheelImage = () => {
        switch (gameFormat.wheelColorPair.color1) {
            case '#FFB703':
                setWheelColor(mango_orange);
                break;
            case '#C1121F':
                setWheelColor(rubby_coffee);
                break;
            case '#386641':
                setWheelColor(hunter_sweet);
                break;
            case '#E3F2FD':
                setWheelColor(alice_mandy);
                break;
            case '#5D2E8C':
                setWheelColor(purple_canary);
                break;
            case '#C80036':
                setWheelColor(monza_yellow);
                break;
            default:
                setWheelColor(blue_yellow);
        }
    };

    return (
        <>


            {/* <div className="container mb-4 md:mb-0">
                    <div className="spinBtn"></div>
                    <div className="wheel">
                        <div className="number" style={{ '--i': 1, '--clr': gameFormat.wheelColorPair.color1 }}>
                            <span>option 1</span>
                        </div>
                        <div className="number" style={{ '--i': 2, '--clr': gameFormat.wheelColorPair.color2 }}>
                            <span>option 2</span>
                        </div>
                        <div className="number" style={{ '--i': 3, '--clr': gameFormat.wheelColorPair.color1 }}>
                            <span>option 3</span>
                        </div>
                        <div className="number" style={{ '--i': 4, '--clr': gameFormat.wheelColorPair.color2 }}>
                            <span>option 4</span>
                        </div>
                        <div className="number" style={{ '--i': 5, '--clr': gameFormat.wheelColorPair.color1 }}>
                            <span>option 5</span>
                        </div>
                        <div className="number" style={{ '--i': 6, '--clr': gameFormat.wheelColorPair.color2 }}>
                            <span>option 6</span>
                        </div>
                        <div className="number" style={{ '--i': 7, '--clr': gameFormat.wheelColorPair.color1 }}>
                            <span>option 7</span>
                        </div>
                        <div className="number" style={{ '--i': 8, '--clr': gameFormat.wheelColorPair.color2 }}>
                            <span>option 8</span>
                        </div>
                    </div>
                </div> */}
            <img src={wheelColor}
                alt="" className='flex flex-col justify-center items-center' />




            <div className='text-center felx flex-col items-center justify-center'>
                {
                    gameFormat.logo ? <img src={gameFormat.logo} alt="logo" className="shrink-0 rounded-full bg-zinc-300 h-[100px] w-[100px] max-md:mt-10" /> : <h1 className='font-bold font-sans text-2xl italic'>{gameFormat.brandName || 'Nom de marque'}</h1>
                }
            </div>

            <div className='flex flex-row gap-7 items-center justify-center ml-8 mt-8'>

                <div className="flex flex-col items-center justify-center gap-2">
                    <QRCode
                        value={gameFormat.url}
                        bgColor={'transparent'}
                        size={100}
                    />
                    <h6 className='flex flex-col font-bold text-xs text-center' style={{ width: '100%' }}>EGO/{gameFormat.brandName || 'brand-name'}/</h6>
                </div>

                <div className='flex flex-col gap-2'>
                    <div className="flex font-bold text-xl" style={{ color: gameFormat.buttonColor, width: '80%' }}>
                        {gameFormat.text1 || "Participez, Évaluez et Déverrouillez des Récompenses !"}
                    </div>

                    <div className="flex justify-center font-bold text-lg" style={{ color: gameFormat.buttonColor, width: '60%' }}>
                        {gameFormat.text2 || "“Partagez votre expérience et aidez-nous à grandir”"}
                    </div>
                </div>
            </div>





            <div className='flex flex-cols-2 mt-8 justify-center items-center'>

                <div className="flex flex-row justify-start items-start gap-2 mr-8">
                    <img
                        loading="lazy"
                        src={facebook}
                        className="shrink-0 w-[20px] aspect-square"
                        alt=""
                    />
                    <img
                        loading="lazy"
                        src={google}
                        className="shrink-0 w-[20px] aspect-square"
                        alt=""
                    />
                    <img
                        loading="lazy"
                        src={twitter}
                        className="shrink-0 aspect-[1.09] w-[20px]"
                        alt=""
                    />
                    <img
                        loading="lazy"
                        src={instagram}
                        className="shrink-0 aspect-[1.09] w-[20px]"
                        alt=""
                    />
                </div>

                <img src={chef} alt="" className='max-w-44' style={{ marginTop: '-60px' }} />

            </div>


        </>
    )
}
