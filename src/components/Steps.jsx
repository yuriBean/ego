import * as React from "react";
import { useNavigate } from 'react-router-dom'
import step2 from "../assets/home/step2.png"
import step1 from "../assets/home/step1.png"
import step3 from "../assets/home/step3.png"

export default function Steps() {
const Navigate = useNavigate();
    const Data = [
        {
            step: '01',
            title: 'Votre client scanne le QR Code',
            content: `Disposez des stickers ou des flyers avec un QR Code dans votre restaurant ou vos sacs de livraison. Vos clients le scannent pour accéder directement au jeu.`,
            image: step1
            //image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/4360469af25cc1a483389a656ec2a72029f601da26e248ecea170a349f5affd8?apiKey=cf358c329e0d49a792d02d32277323ef&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/4360469af25cc1a483389a656ec2a72029f601da26e248ecea170a349f5affd8?apiKey=cf358c329e0d49a792d02d32277323ef&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/4360469af25cc1a483389a656ec2a72029f601da26e248ecea170a349f5affd8?apiKey=cf358c329e0d49a792d02d32277323ef&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/4360469af25cc1a483389a656ec2a72029f601da26e248ecea170a349f5affd8?apiKey=cf358c329e0d49a792d02d32277323ef&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/4360469af25cc1a483389a656ec2a72029f601da26e248ecea170a349f5affd8?apiKey=cf358c329e0d49a792d02d32277323ef&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/4360469af25cc1a483389a656ec2a72029f601da26e248ecea170a349f5affd8?apiKey=cf358c329e0d49a792d02d32277323ef&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/4360469af25cc1a483389a656ec2a72029f601da26e248ecea170a349f5affd8?apiKey=cf358c329e0d49a792d02d32277323ef&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/4360469af25cc1a483389a656ec2a72029f601da26e248ecea170a349f5affd8?apiKey=cf358c329e0d49a792d02d32277323ef&'
        },
        {
            step: '02',
            title: 'Votre client laisse un avis ou un abonnement à vos réseaux sociaux',
            content: `Pour participer au jeu, vos clients doivent laisser un avis Google ou s&#39;abonner à vos pages sur les réseaux sociaux, comme TikTok ou Instagram.`,
            image: step2
            //image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/81ee92b9440d122e4342ffe135bf1c4118958e990f269250cfee1da30f9a544d?apiKey=cf358c329e0d49a792d02d32277323ef&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/81ee92b9440d122e4342ffe135bf1c4118958e990f269250cfee1da30f9a544d?apiKey=cf358c329e0d49a792d02d32277323ef&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/81ee92b9440d122e4342ffe135bf1c4118958e990f269250cfee1da30f9a544d?apiKey=cf358c329e0d49a792d02d32277323ef&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/81ee92b9440d122e4342ffe135bf1c4118958e990f269250cfee1da30f9a544d?apiKey=cf358c329e0d49a792d02d32277323ef&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/81ee92b9440d122e4342ffe135bf1c4118958e990f269250cfee1da30f9a544d?apiKey=cf358c329e0d49a792d02d32277323ef&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/81ee92b9440d122e4342ffe135bf1c4118958e990f269250cfee1da30f9a544d?apiKey=cf358c329e0d49a792d02d32277323ef&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/81ee92b9440d122e4342ffe135bf1c4118958e990f269250cfee1da30f9a544d?apiKey=cf358c329e0d49a792d02d32277323ef&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/81ee92b9440d122e4342ffe135bf1c4118958e990f269250cfee1da30f9a544d?apiKey=cf358c329e0d49a792d02d32277323ef&'
        },
        {
            step: '03',
            title: 'Votre client tourne la roue',
            content: `Une fois les étapes précédentes complétées, vos clients peuvent faire tourner la roue pour tenter de remporter un cadeau. En cas de victoire, ils recevront une notification par email.`,
            image: step3
            //image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/8b692db1780058471fe896630774d1f043a31b6bf25bc9e9e5ee784af0cc95fe?apiKey=cf358c329e0d49a792d02d32277323ef&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/8b692db1780058471fe896630774d1f043a31b6bf25bc9e9e5ee784af0cc95fe?apiKey=cf358c329e0d49a792d02d32277323ef&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/8b692db1780058471fe896630774d1f043a31b6bf25bc9e9e5ee784af0cc95fe?apiKey=cf358c329e0d49a792d02d32277323ef&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/8b692db1780058471fe896630774d1f043a31b6bf25bc9e9e5ee784af0cc95fe?apiKey=cf358c329e0d49a792d02d32277323ef&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/8b692db1780058471fe896630774d1f043a31b6bf25bc9e9e5ee784af0cc95fe?apiKey=cf358c329e0d49a792d02d32277323ef&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/8b692db1780058471fe896630774d1f043a31b6bf25bc9e9e5ee784af0cc95fe?apiKey=cf358c329e0d49a792d02d32277323ef&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/8b692db1780058471fe896630774d1f043a31b6bf25bc9e9e5ee784af0cc95fe?apiKey=cf358c329e0d49a792d02d32277323ef&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/8b692db1780058471fe896630774d1f043a31b6bf25bc9e9e5ee784af0cc95fe?apiKey=cf358c329e0d49a792d02d32277323ef&'
        },
    ]
    return (
        <div className="">
            <div className="mt-10 font-serif text-3xl text-center font-bold text-black leading-2 max-md:mt-10">
                Comment ça marche ?
            </div>
            <div className="justify-center px-5 mt-14 w-full max-md:max-w-full">
                <div className="flex flex-col gap-10 flex-wrap max-md:flex-col justify-center items-center max-md:gap-0 max-w-[1100px] mx-auto">
                    {
                        Data.map((Item) => (
                            <div className="flex flex-col flex-wrap max-w-[70%] md:mx-7 max-md:ml-0 max-md:w-full">
                                <div className="flex flex-col pb-5 text-2xl text-center text-black max-md:mt-10">
                                    <img
                                        loading="lazy"
                                        src={Item.image}
                                        className="self-center max-w-full aspect-square w-[150px]"
                                    />
                                    <div className="flex flex-col mt-8">
                                        <div className="font-semibold leading-2 mt-1">Etape {Item.step}: {Item.title} </div>
                                        <div className="font-normal leading-9 mt-2 w-[100%]">
                                            {Item.content}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                    <span className="flex flex-row font-normal leading-9 mt-2 w-[100%] text-2xl items-center justify-center">
                        ● Adaptez les conditions de participation selon vos besoins <br />
                        ● Gérez les cadeaux distribués <br />
                        ● Suivez les performances de la campagne facilement <br />
                        ● Limitez les participations pour garantir une sécurité optimale <br />
                    </span>
                    <button onClick={() => { Navigate('/demo') }} className="justify-center px-8 py-4 text-base font-medium leading-5 text-center text-white bg-indigo-400 rounded w-auto text-md mt-10">
                        Réserver une démo
                    </button>
                </div>
            </div>
            {/* <div className="flex justify-center items-center px-16 py-14 bg-[linear-gradient(90deg,#8497FC_0%,#4F5A96_100%)] max-md:px-5 mt-10 overflow-hidden">
                <div className="flex justify-center items-center px-16 w-full max-w-[1069px] max-md:px-5 max-md:max-w-full">
                    <div className="flex relative flex-col items-center max-w-full w-[849px]">
                        <div className="text-4xl font-bold text-center text-white max-md:max-w-full">
                            Voici ce que nos clients disent de nous
                        </div>
                        <img style={{ zIndex: 1 }} className="absolute h-[400px] top-[20%] hidden md:block right-[-30%]" src={Bubble} alt="" />
                        <div style={{ zIndex: 10 }} className="justify-center self-stretch px-10 py-12 mt-24 bg-white rounded-2xl max-md:px-5 max-md:mt-10 max-md:max-w-full">
                            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                                <div className="flex flex-col w-[24%] max-md:ml-0 max-md:w-full">
                                    <img
                                        loading="lazy"
                                        srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/b762813b2e45e39676cc331af813d2b65ecfa12b28720b69721ac4bf9803e11d?apiKey=cf358c329e0d49a792d02d32277323ef&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/b762813b2e45e39676cc331af813d2b65ecfa12b28720b69721ac4bf9803e11d?apiKey=cf358c329e0d49a792d02d32277323ef&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/b762813b2e45e39676cc331af813d2b65ecfa12b28720b69721ac4bf9803e11d?apiKey=cf358c329e0d49a792d02d32277323ef&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/b762813b2e45e39676cc331af813d2b65ecfa12b28720b69721ac4bf9803e11d?apiKey=cf358c329e0d49a792d02d32277323ef&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/b762813b2e45e39676cc331af813d2b65ecfa12b28720b69721ac4bf9803e11d?apiKey=cf358c329e0d49a792d02d32277323ef&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/b762813b2e45e39676cc331af813d2b65ecfa12b28720b69721ac4bf9803e11d?apiKey=cf358c329e0d49a792d02d32277323ef&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/b762813b2e45e39676cc331af813d2b65ecfa12b28720b69721ac4bf9803e11d?apiKey=cf358c329e0d49a792d02d32277323ef&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/b762813b2e45e39676cc331af813d2b65ecfa12b28720b69721ac4bf9803e11d?apiKey=cf358c329e0d49a792d02d32277323ef&"
                                        className="shrink-0 mt-3 mx-auto max-w-full rounded-full aspect-square w-[181px] max-md:mt-10"
                                    />
                                </div>
                                <div className="flex flex-col ml-5 w-[76%] max-md:ml-0 max-md:w-full">
                                    <div className="flex flex-col grow text-neutral-700 max-md:mt-10 max-md:max-w-full">
                                        <div className="text-2xl font-bold text-center max-md:max-w-full">
                                            Hannah Schmitt
                                        </div>
                                        <div className="mt-5 text-lg max-md:max-w-full">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                            Cursus nibh mauris, nec turpis orci lectus maecenas.
                                            Suspendisse sed magna eget nibh in turpis. Consequat duis
                                            diam lacus arcu. Faucibus venenatis felis id augue sit
                                            cursus pellentesque enim Lorem ipsum dolor sit amet,
                                            consectetur adipiscing elit. Cursus nibh mauris, nec turpis
                                            orci lectus maecenas. Suspendisse{" "}
                                        </div>
                                        <div className="mt-5 text-xs text-center text-neutral-600 max-md:max-w-full">
                                            May 8, 2020
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-5 justify-between mt-11 max-w-full w-[466px] max-md:flex-wrap max-md:mt-10 relative">
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/41606841d6bd09a441d9fe08154e70623b248c165f66f36438abab63e6b8a081?apiKey=cf358c329e0d49a792d02d32277323ef&"
                                className="shrink-0 aspect-square w-[58px]"
                            />
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/e65f8414a85d97b55d5c456f8be7d59accfc2cee1ae61cb5755fbb7318500ad0?apiKey=cf358c329e0d49a792d02d32277323ef&"
                                className="my-auto w-56 aspect-[14.29]"
                            />
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/e7420a840b6ac2c00d8ef24bb09c9e81187c97b3e67032e1cc8c7db81c52e82f?apiKey=cf358c329e0d49a792d02d32277323ef&"
                                className="shrink-0 aspect-square w-[58px]"
                            />
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    );
}

