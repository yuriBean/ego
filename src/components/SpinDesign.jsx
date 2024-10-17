import React, { useEffect, useState } from 'react'

export default function SpinDesign({ gameFormat }) {

    const [textColor, setTextColor] = useState('text-white')

    useEffect(() => {
        if (gameFormat.buttonColor === '#E3F2FD')
            setTextColor('text-black')
        else
            setTextColor('text-white')
    }, [gameFormat.buttonColor])

    return (
        <>
            <div className='flex justify-center mt-3'>
                {
                    gameFormat.logo ?
                        <img
                            src={gameFormat.logo}
                            alt="logo"
                            className="shrink-0 rounded-full bg-zinc-300 h-[100px] w-[100px] max-md:mt-10"
                        />
                        :
                        <h1 className='font-bold font-sans text-2xl italic'>{gameFormat.brandName}</h1>
                }
            </div>
            <div className=''>
                <div className='flex flex-col md:flex-row max-w-[800px] justify-between mx-auto items-center mt-9'>
                    <div className="container mt-10 mr-10 mb-10 md:mb-0">
                        <div className="spinBtn"></div>
                        <div className="wheel">
                            <div className="number" style={{ '--i': 1, '--clr': gameFormat.wheelColorPair.color1 }}>
                                <span className=' text-white'>Perdu</span>
                            </div>
                            <div className="number" style={{ '--i': 2, '--clr': gameFormat.wheelColorPair.color2 }}>
                                <span>{gameFormat.options.option1 || 'option 2'}</span>
                            </div>
                            <div className="number" style={{ '--i': 3, '--clr': gameFormat.wheelColorPair.color1 }}>
                                <span className=' text-white'>Perdu</span>
                            </div>
                            <div className="number" style={{ '--i': 4, '--clr': gameFormat.wheelColorPair.color2 }}>
                                <span>{gameFormat.options.option2 || 'option 4'}</span>
                            </div>
                            <div className="number" style={{ '--i': 5, '--clr': gameFormat.wheelColorPair.color1 }}>
                                <span>{gameFormat.options.option3 || 'option 5'}</span>
                            </div>
                            <div className="number" style={{ '--i': 6, '--clr': gameFormat.wheelColorPair.color2 }}>
                                <span className=' text-white'>Perdu</span>
                            </div>
                            <div className="number" style={{ '--i': 7, '--clr': gameFormat.wheelColorPair.color1 }}>
                                <span>{gameFormat.options.option4 || 'option 7'}</span>
                            </div>
                            <div className="number" style={{ '--i': 8, '--clr': gameFormat.wheelColorPair.color2 }}>
                                <span>{gameFormat.options.option5 || 'option 8'}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col font-medium text-black max-w-min leading-[140%] ml-11">
                        <div className="w-full text-lg font-bold text-center">
                            Essayez votre chance pour une récompense !
                        </div>
                        <div className="mt-8 w-full text-lg text-center">
                            Laissez-nous votre email !
                        </div>
                        <div className="mt-8 w-full text-sm leading-5">Email</div>
                        <input
                            type="email"
                            disabled
                            placeholder='Entrez votre email'
                            className="justify-center px-3.5 py-2.5 mt-1.5 text-base leading-6 bg-white rounded-lg border border-gray-300 border-solid shadow-sm text-zinc-400"
                        />
                        <div
                            className={`justify-center cursor-pointer items-center px-3 py-2.5 mt-8 w-full text-base font-semibold leading-6 ${textColor} whitespace-nowrap text-center rounded-lg shadow-sm`}
                            style={{ backgroundColor: gameFormat.buttonColor ? gameFormat.buttonColor : '#4F46E5' }}>
                            Confirmer
                        </div>
                        <div className="mt-8 w-full text-sm text-center">
                            Remarque : Un tirage au sort par participant uniquement
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex gap-2 justify-between pr-3 mt-20 ml-16 max-md:mt-10">
                <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/09923380b2cf92c7af98f537f3b12d5be8700c253ddfb790781d9d8ae18e083a?apiKey=cf358c329e0d49a792d02d32277323ef&"
                    className="shrink-0 w-3 aspect-square"
                    alt=""
                />
                <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/5f03689dd694571b2ab72fa555b6452258c8c545c9423f29744481b208431a64?apiKey=cf358c329e0d49a792d02d32277323ef&"
                    className="shrink-0 w-3 aspect-square"
                    alt=""
                />
                <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/d1197ebe75a39d3255ddb89ec9c333c50ee053aad5aad94a85e44cfa92f92ee8?apiKey=cf358c329e0d49a792d02d32277323ef&"
                    className="shrink-0 aspect-[1.09] w-[13px]"
                    alt=""
                />
                <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/8a60c44158bfb1f23e8e72c732fc861feb2cf3250b04e7eae73cd5e4c87d38b5?apiKey=cf358c329e0d49a792d02d32277323ef&"
                    className="shrink-0 aspect-[1.09] w-[13px]"
                    alt=""
                />
            </div>
            <div className="mt-3.5 ml-12 text-xs leading-3 text-slate-800">
                © 2024 Ego. Tous droits réservés.
            </div>
        </>
    )


}
