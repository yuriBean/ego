import React, { useEffect, useState } from 'react'

import QRCode from 'qrcode.react';

import blue_yellow from '../../assets/upper_halfwheel/Fortune wheel.png'
import mango_orange from '../../assets/upper_halfwheel/Fortune wheel (1).png'
import rubby_coffee from '../../assets/upper_halfwheel/Fortune wheel (2).png'
import hunter_sweet from '../../assets/upper_halfwheel/Fortune wheel (3).png'
import alice_mandy from '../../assets/upper_halfwheel/Fortune wheel (4).png'
import purple_canary from '../../assets/upper_halfwheel/Fortune wheel (5).png'
import monza_yellow from '../../assets/upper_halfwheel/Fortune wheel (6).png'

import facebook from '../../assets/socials/facebook.png'
import google from '../../assets/socials/google.png'
import twitter from '../../assets/socials/twitter.png'
import instagram from '../../assets/socials/instagram.png'

import '../index.css'

export default function FlyerDesign2({ gameFormat }) {

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
            <div className="flex justify-center mt-4 mb-4 font-bold text-xl text-center" style={{ color: gameFormat.buttonColor }}>
                {gameFormat.text1 || "“Partagez votre expérience et aidez-nous à grandir”"}
            </div>

            <div class="circle flex items-center justify-center text-white" style={{ background: gameFormat.buttonColor }}>
                <div className="flex flex-col gap-2">
                        <QRCode
                            value={gameFormat.url}
                            bgColor={'transparent'}
                            fgColor='white'
                            size={100}
                        />
                    <h6 className='font-bold text-center text-xs' style={{ width: '100%' }}>EGO/{gameFormat.brandName || 'brand-name'}/</h6>
                </div>
            </div>

            <div className='flex justify-center mt-5'>
                {
                    gameFormat.logo ? <img src={gameFormat.logo} alt="logo" className="shrink-0 rounded-full bg-zinc-300 h-[100px] w-[100px] max-md:mt-10" /> : <h1 className='font-bold font-sans text-2xl italic'>{gameFormat.brandName || 'Nom de marque'}</h1>
                }
            </div>

            <div className="flex justify-center mt-4 mb-4 font-bold text-xl text-center" style={{ color: gameFormat.buttonColor }}>
                {gameFormat.text2 || "Participez, Évaluez et Déverrouillez des Récompenses !"}
            </div>

            <div className="flex flex-cols-2 w-full max-md:mt-8 justify-end">

                <div></div>
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

            </div>

            <div className='flex flex-col mt-2 md:flex-row max-w-[800px] justify-between mx-auto items-center' style={{ marginTop: '-100px' }}>
                <img src={wheelColor}
                    alt="" />
            </div>

        </>
    )
}
