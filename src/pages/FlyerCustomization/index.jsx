import { React, useState } from "react";
import ReactDOM from 'react-dom';
import html2canvas from 'html2canvas';

import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


import AsideHeader from "../../components/AsideHeader";

import FlyerDesign1 from "../../components/FlyerTemplate/FlyerDesign1.jsx";
import FlyerDesign2 from "../../components/FlyerTemplate/FlyerDesign2.jsx";
import FlyerDesign3 from "../../components/FlyerTemplate/FlyerDesign3.jsx";
import FlyerDesign4 from "../../components/FlyerTemplate/FlyerDesign4.jsx";
import FlyerDesign5 from "../../components/FlyerTemplate/FlyerDesign5.jsx";
import FlyerDesign6 from "../../components/FlyerTemplate/FlyerDesign6.jsx";

export default function GameManagement() {
    const [selectedRow, setSelectedRow] = useState(1);
    const { id } = useParams();

    const temp = {
        value: ''
    };

    const Navigate = useNavigate();
    const userId = useSelector(state => state.authentication.userId);
    const [data, setData] = useState(new Array(8).fill(temp))
    const [uploadLogo, setUploadLogo] = useState(true);
    const [total, setTotal] = useState(100);
    const [gameFormat, setGameFormate] = useState({
        ownerId: userId,
        brandName: '',
        resturantName: '',
        resturantAddress: '',
        logo: '',
        text1: '',
        text2: '',
        wheelColorPair: {
            color1: '#8497FC',
            color2: '#FDFDAF'
        },
        buttonColor: '#8497FC',
        instagram: '',
        tiktok: '',
        facebook: '',
        googleMaps: '',
        twitter: '',
        url: '',
        content: '',
    });

    const [selectedPair, setSelectedPair] = useState(1);
    const [selectedButtonColor, setSelectedButtonColor] = useState(1);

    const handlePairClick = (pairId, color1, color2) => {
        setSelectedPair(pairId);
        setGameFormate({
            ...gameFormat,
            wheelColorPair: {
                color1: color1,
                color2: color2
            }
        });

    };

    const handleButtonColorClick = (pairId, color1) => {
        setSelectedButtonColor(pairId);
        setGameFormate({
            ...gameFormat,
            buttonColor: color1
        });

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
                    const maxWidth = 300; // Set your desired maximum width
                    const maxHeight = 150; // Set your desired maximum height
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
                    setGameFormate({ ...gameFormat, logo: compressedBase64 });
                };
                img.src = reader.result;
            };
            reader.readAsDataURL(file);
        }
    };

    function ColorPair({ id, color1, label1, color2, label2, isSelected, onClick }) {
        return (
            <div
                className={`cursor-pointer p-2 rounded-lg inline-block ${isSelected ? 'bg-black bg-opacity-10' : 'hover:bg-black hover:bg-opacity-10'}`}
                onClick={() => onClick(id, color1, color2)}
            >
                <div className="flex gap-2 justify-start">
                    <div className="w-[20px] h-[20px]" style={{ backgroundColor: color1 }}></div>
                    <label className="my-auto">{label1}</label>
                </div>
                <div className="flex gap-2 justify-start mt-1.5">
                    <div className="w-[20px] h-[20px]" style={{ backgroundColor: color2 }}></div>
                    <label className="my-auto">{label2}</label>
                </div>
            </div>
        );
    }

    function ButtonColor({ id, color1, label1, isSelected, onClick }) {
        return (
            <div
                className={`cursor-pointer p-2 rounded-lg inline-block ${isSelected ? 'bg-black bg-opacity-10' : 'hover:bg-black hover:bg-opacity-10'}`}
                onClick={() => onClick(id, color1)}
            >
                <div className="flex gap-2 justify-start">
                    <div className="w-[20px] h-[20px]" style={{ backgroundColor: color1 }}></div>
                    <label className="my-auto">{label1}</label>
                </div>
            </div>
        );
    }

    const [selectedFlyer, setSelectedFlyer] = useState(1);

    const handleFlyerClick = (selected) => {
        setSelectedFlyer(selected);
    };

    const handleDownload = () => {
        if (selectedFlyer !== null) {
            const FlyerComponent = getFlyerComponent(selectedFlyer);
            if (FlyerComponent) {
                const element = document.createElement('div');
                element.style.position = 'absolute';
                element.style.top = '-9999px';
                element.style.margin = '0';
                element.style.backgroundColor = 'white';
                document.body.appendChild(element);
    
                ReactDOM.render(<FlyerComponent gameFormat={gameFormat} />, element);
    
                // Allow some time for the component to render and then measure its dimensions
                setTimeout(() => {
                    const rect = element.getBoundingClientRect();
                    const width = rect.width;
                    const height = rect.height;

                    console.log(width, height);
    
                    html2canvas(element, {
                        width: width,
                        height: height,
                        scale: 2 // Adjust the scale if you need higher resolution
                    }).then((canvas) => {
                        const link = document.createElement('a');
                        link.download = 'flyer.jpeg';
                        link.href = canvas.toDataURL();
                        link.click();
                        document.body.removeChild(element);
                    });
                }, 700);  // Adjust the timeout as needed to ensure rendering is complete
            }
        }
    };
    

    const getFlyerComponent = (flyerId) => {
        switch (flyerId) {
            case 1: return FlyerDesign1;
            case 2: return FlyerDesign2;
            case 3: return FlyerDesign3;
            case 4: return FlyerDesign4;
            case 5: return FlyerDesign5;
            case 6: return FlyerDesign6;
            default: return null;
        }
    };

    return (
        <div className="flex mb-20">
            <AsideHeader />
            <div className="flex w-full flex-col items-center mt-4 max-md:mt-10 max-md:max-w-full">
                <div className="justify-center text-center self-start p-2.5 mt-6 text-lg font-medium tracking-wide leading-6 text-blue-950">
                    Flyer Customization
                </div>
                <div className="mt-2 text-2xl font-bold leading-10 text-black">
                    Customize Your Flyer
                </div>
                <div className="flex gap-5 justify-between mt-12 text-xl font-semibold tracking-tight text-blue-950 max-md:mt-10">
                    <div onClick={() => { setSelectedRow(1) }} className={`cursor-pointer text-center justify-center px-5 py-2.5 whitespace-nowrap ${selectedRow === 1 ? 'bg-indigo-400 text-white' : 'text-black'} rounded-3xl`}>
                        Flyer Content
                    </div>
                    <div onClick={() => { setSelectedRow(2) }} className={`cursor-pointer text-center justify-center px-5 py-2.5  ${selectedRow === 2 ? 'bg-indigo-400 text-white' : 'text-black'} rounded-3xl`}>
                        Social Media links
                    </div>
                    <div onClick={() => { setSelectedRow(3) }} className={`cursor-pointer text-center justify-center px-5 py-2.5 ${selectedRow === 3 ? 'bg-indigo-400 text-white' : 'text-black'} rounded-3xl`}>
                        Templates
                    </div>
                </div>

                <div className="flex flex-col mt-9 w-full max-w-[1050px] max-md:max-w-full">


                    {
                        selectedRow === 1 && (
                            <>
                                <div className="flex flex-col p-5 font-medium text-black bg-white leading-[140%] max-md:max-w-full mr-2 md:mr-5 shadow-[0px_5px_10px_1px_rgba(0,0,0,0.3)]">
                                    <div className="text-2xl max-md:max-w-full">Nom de la Marque</div>
                                    <div className="flex flex-col items-start pr-20 mt-3.5 text-base max-md:pr-5 max-md:max-w-full ">
                                        <div onClick={() => { setUploadLogo(true); setGameFormate({ ...gameFormat, logo: '', brandName: '' }) }} className="flex gap-3 justify-center">
                                            <input type='radio' className="w-[20px] ml-1" id="uploadLogo" name="selection" checked={uploadLogo} />
                                            <label htmlFor="uploadLogo" id="uploadLogo" className="my-auto">Charger le logo</label>
                                        </div>
                                        <div onClick={() => { setUploadLogo(false); setGameFormate({ ...gameFormat, logo: '', brandName: '' }) }} className="flex gap-3 justify-center mt-1.5">
                                            <input type='radio' className="w-[20px] ml-1" id="enterBrandName" name="selection" checked={!uploadLogo} />
                                            <label htmlFor="enterBrandName" id="enterBrandName" className="my-auto">Entrer le nom de la marque</label>
                                        </div>
                                    </div>
                                </div>

                                {
                                    uploadLogo ? (
                                        <div className="flex flex-col mt-9 w-full max-w-[1050px] max-md:max-w-full">
                                            <div className="flex flex-row md:flex-col p-5 font-medium text-black bg-white leading-[140%] max-md:max-w-full mr-2 md:mr-5 shadow-[0px_5px_10px_1px_rgba(0,0,0,0.3)]">
                                                <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                                                    {
                                                        gameFormat.logo ? <img src={gameFormat.logo} alt="logo" className="shrink-0 rounded-full bg-zinc-300 h-[100px] w-[100px] max-md:mt-10" /> : <div className="shrink-0 rounded-full bg-zinc-300 h-[100px] w-[100px] max-md:mt-10" />
                                                    }
                                                    <div className="flex flex-row ml-5 w-[16%] max-md:ml-0 max-md:w-full">
                                                        <div className="justify-center self-stretch px-0.5 py-2.5 my-auto w-full text-base font-semibold leading-6 text-center text-white whitespace-nowrap bg-indigo-400 hover:bg-indigo-500 cursor-pointer rounded-xl max-md:mt-10">
                                                            <input onChange={ImageUpload} type="file" id="uploadFileInput" style={{ display: "none" }} />
                                                            <label htmlFor="uploadFileInput" className="cursor-pointer">Charger</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col mt-9 w-full max-w-[1050px] max-md:max-w-full">
                                            <div className="flex flex-col p-5 font-medium text-black bg-white leading-[140%] max-md:max-w-full mr-2 md:mr-5 shadow-[0px_5px_10px_1px_rgba(0,0,0,0.3)]">
                                                <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                                                    <div className="mt-4 text-base font-medium leading-5 text-black w-full">
                                                        Nom de la Marque
                                                        <input onChange={(e) => { setGameFormate({ ...gameFormat, brandName: e.target.value }) }} className="flex flex-col justify-center px-3.5 py-2.5 mt-3 text-base leading-6 bg-white rounded-lg border border-gray-300 border-solid shadow-sm text-zinc-400 max-md:max-w-full outline-none w-full" type="text" placeholder={`Entrez le nom de votre marque`} value={gameFormat.brandName} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                                <div className="flex flex-col my-5 w-full max-w-[1050px] max-md:max-w-full">
                                    <div className="flex flex-col p-5 font-medium text-black bg-white leading-[140%] max-md:max-w-full mr-2 md:mr-5 shadow-[0px_5px_10px_1px_rgba(0,0,0,0.3)]">
                                        <div className="text-2xl max-md:max-w-full">Contenu du Flyer</div>
                                        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                                            <div className="mt-4 text-base font-medium leading-5 text-black w-full">
                                                Texte 1
                                                <input onChange={(e) => { setGameFormate({ ...gameFormat, text1: e.target.value }) }} className="flex flex-col justify-center px-3.5 py-2.5 mt-3 text-base leading-6 bg-white rounded-lg border border-gray-300 border-solid shadow-sm text-zinc-400 max-md:max-w-full outline-none w-full" type="text" placeholder={`Entrez votre texte`} value={gameFormat.text1} required />
                                            </div>
                                        </div>
                                        <div className="flex mt-4 gap-5 max-md:flex-col max-md:gap-0">
                                            <div className="mt-4 text-base font-medium leading-5 text-black w-full">
                                                Texte 2
                                                <input onChange={(e) => { setGameFormate({ ...gameFormat, text2: e.target.value }) }} className="flex flex-col justify-center px-3.5 py-2.5 mt-3 text-base leading-6 bg-white rounded-lg border border-gray-300 border-solid shadow-sm text-zinc-400 max-md:max-w-full outline-none w-full" type="text" placeholder={`Entrez votre texte`} value={gameFormat.text2} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Text Input */}

                                <div className="flex max-w-[1050px] ml-5 mr-4 mt-5 justify-end max-md:ml-0 max-md:w-full">
                                    <div
                                        onClick={() => {
                                            setSelectedRow(2);
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }}
                                        className="justify-center w-[200px] self-stretch px-3 py-2.5 my-auto text-base font-semibold leading-6 text-center text-white whitespace-nowrap bg-indigo-400 rounded-xl hover:bg-indigo-500 max-md:mt-10 cursor-pointer"
                                    >
                                        <label className="cursor-pointer" >Liens Médias Sociaux</label>
                                    </div>
                                </div>

                            </>
                        )
                    }


                    {
                        selectedRow === 2 && (
                            <>
                                <div className="flex flex-col mt-9 w-full max-w-[1050px] max-md:max-w-full">
                                    <div className="flex flex-col p-5 font-medium text-black bg-white leading-[140%] max-md:max-w-full mr-2 md:mr-5 shadow-[0px_5px_10px_1px_rgba(0,0,0,0.3)]">
                                        <div className="text-2xl font-medium leading-8 text-black max-md:max-w-full">
                                            Liens des Médias Sociaux
                                        </div>
                                        <div className="flex flex-col mt-3.5 max-md:max-w-full">
                                            <div className="mt-4 text-base font-medium leading-5 text-black max-md:max-w-full">
                                                Instagram
                                                <input onChange={(e) => setGameFormate({ ...gameFormat, instagram: e.target.value })} className="flex flex-col justify-center px-3.5 py-2.5 mt-3 text-base leading-6 bg-white rounded-lg border border-gray-300 border-solid shadow-sm text-zinc-400 max-md:max-w-full outline-none w-full" type="text" placeholder={`Entrez le lien`} value={gameFormat.instagram} />
                                            </div>
                                        </div>
                                        {/* <div className="flex flex-col mt-3.5 max-md:max-w-full">
                                            <div className="mt-4 text-base font-medium leading-5 text-black max-md:max-w-full">
                                                TikTok
                                                <input onChange={(e) => setGameFormate({ ...gameFormat, tiktok: e.target.value })} className="flex flex-col justify-center px-3.5 py-2.5 mt-3 text-base leading-6 bg-white rounded-lg border border-gray-300 border-solid shadow-sm text-zinc-400 max-md:max-w-full outline-none w-full" type="text" placeholder={`Entrez le lien`} value={gameFormat.tiktok} />
                                            </div>
                                        </div> */}
                                        <div className="flex flex-col mt-3.5 max-md:max-w-full">
                                            <div className="mt-4 text-base font-medium leading-5 text-black max-md:max-w-full">
                                                Facebook
                                                <input onChange={(e) => setGameFormate({ ...gameFormat, facebook: e.target.value })} className="flex flex-col justify-center px-3.5 py-2.5 mt-3 text-base leading-6 bg-white rounded-lg border border-gray-300 border-solid shadow-sm text-zinc-400 max-md:max-w-full outline-none w-full" type="text" placeholder={`Entrez le lien`} value={gameFormat.facebook} />
                                            </div>
                                        </div>
                                        <div className="flex flex-col mt-3.5 max-md:max-w-full">
                                            <div className="mt-4 text-base font-medium leading-5 text-black max-md:max-w-full">
                                                Google Maps
                                                <input onChange={(e) => setGameFormate({ ...gameFormat, googleMaps: e.target.value })} className="flex flex-col justify-center px-3.5 py-2.5 mt-3 text-base leading-6 bg-white rounded-lg border border-gray-300 border-solid shadow-sm text-zinc-400 max-md:max-w-full outline-none w-full" type="text" placeholder={`Entrez le lien`} value={gameFormat.googleMaps} />
                                            </div>
                                        </div>
                                        <div className="flex flex-col mt-3.5 max-md:max-w-full">
                                            <div className="mt-4 text-base font-medium leading-5 text-black max-md:max-w-full">
                                                Twitter
                                                <input onChange={(e) => setGameFormate({ ...gameFormat, twitter: e.target.value })} className="flex flex-col justify-center px-3.5 py-2.5 mt-3 text-base leading-6 bg-white rounded-lg border border-gray-300 border-solid shadow-sm text-zinc-400 max-md:max-w-full outline-none w-full" type="text" placeholder={`Entrez le lien`} value={gameFormat.twitter} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col mt-9 w-full max-w-[1050px] max-md:max-w-full">
                                    <div className="flex flex-col p-5 font-medium text-black bg-white leading-[140%] max-md:max-w-full mr-2 md:mr-5 shadow-[0px_5px_10px_1px_rgba(0,0,0,0.3)]">
                                        <div className="text-2xl font-medium leading-8 text-black max-md:max-w-full">
                                            URL Unique pour la Page de Destination
                                        </div>
                                        <div className="flex flex-col mt-3.5 max-md:max-w-full">
                                            <div className="mt-4 text-base font-medium leading-5 text-black max-md:max-w-full">
                                                URL de la Page de Destination
                                                <input onChange={(e) => setGameFormate({ ...gameFormat, url: e.target.value })} className="flex flex-col justify-center px-3.5 py-2.5 mt-3 text-base leading-6 bg-white rounded-lg border border-gray-300 border-solid shadow-sm text-zinc-400 max-md:max-w-full outline-none w-full" type="text" placeholder={`Entrez le lien`} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex max-w-[1050px] ml-5 mr-4 mt-5 justify-end max-md:ml-0 max-md:w-full">
                                    <div
                                        onClick={() => {
                                            setSelectedRow(3);
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }}
                                        className="justify-center w-[200px] self-stretch px-3 py-2.5 my-auto text-base font-semibold leading-6 text-center text-white whitespace-nowrap bg-indigo-400 rounded-xl hover:bg-indigo-500 max-md:mt-10 cursor-pointer"
                                    >
                                        <label className="cursor-pointer" >Modèles</label>
                                    </div>
                                </div>
                            </>
                        )
                    }


                    {
                        selectedRow === 3 && (
                            <>
                                <div className="flex flex-wrap p-5 font-medium text-black bg-white leading-[140%] shadow-[0px_5px_10px_1px_rgba(0,0,0,0.3)]">

                                    <div className="text-2xl max-md:max-w-full w-full mb-4">Couleur de la Roue</div>
                                    <div className="flex gap-[2vw] flex-wrap">
                                        {/* Composants de paire de couleurs */}
                                        <ColorPair
                                            id={1}
                                            color1="#8497FC"
                                            label1="Bleu"
                                            color2="#FDFDAF"
                                            label2="Jaune"
                                            isSelected={selectedPair === 1}
                                            onClick={handlePairClick}
                                        />
                                        <ColorPair
                                            id={2}
                                            color1="#FFB703"
                                            label1="Mangue"
                                            color2="#FB8500"
                                            label2="Orange"
                                            isSelected={selectedPair === 2}
                                            onClick={handlePairClick}
                                        />
                                        <ColorPair
                                            id={3}
                                            color1="#C1121F"
                                            label1="Rubis"
                                            color2="#FDF0D5"
                                            label2="Crème au café"
                                            isSelected={selectedPair === 3}
                                            onClick={handlePairClick}
                                        />
                                        <ColorPair
                                            id={4}
                                            color1="#386641"
                                            label1="Vert chasseur"
                                            color2="#A7C957"
                                            label2="Midori sucré"
                                            isSelected={selectedPair === 4}
                                            onClick={handlePairClick}
                                        />
                                        <ColorPair
                                            id={5}
                                            color1="#E3F2FD"
                                            label1="Bleu Alice"
                                            color2="#DB5461"
                                            label2="Mandy"
                                            isSelected={selectedPair === 5}
                                            onClick={handlePairClick}
                                        />
                                        <ColorPair
                                            id={6}
                                            color1="#5D2E8C"
                                            label1="Violet"
                                            color2="#CCFF66"
                                            label2="Canari"
                                            isSelected={selectedPair === 6}
                                            onClick={handlePairClick}
                                        />
                                        <ColorPair
                                            id={7}
                                            color1="#C80036"
                                            label1="Monza"
                                            color2="#FDFDAF"
                                            label2="Jaune"
                                            isSelected={selectedPair === 7}
                                            onClick={handlePairClick}
                                        />
                                    </div>

                                </div>

                                <div className="flex flex-wrap p-5 font-medium text-black bg-white leading-[140%] shadow-[0px_5px_10px_1px_rgba(0,0,0,0.3)] mt-7">

                                    <div className="text-2xl max-md:max-w-full mb-4">Couleur de la Phrase</div>
                                    <div className="flex gap-[2vw] flex-wrap">
                                        {/* Composants ButtonColor */}
                                        <ButtonColor
                                            id={1}
                                            color1="#8497FC"
                                            label1="Bleu"
                                            isSelected={selectedButtonColor === 1}
                                            onClick={handleButtonColorClick}
                                        />
                                        <ButtonColor
                                            id={2}
                                            color1="#FFB703"
                                            label1="Mangue"
                                            isSelected={selectedButtonColor === 2}
                                            onClick={handleButtonColorClick}
                                        />
                                        <ButtonColor
                                            id={3}
                                            color1="#C1121F"
                                            label1="Rubis"
                                            isSelected={selectedButtonColor === 3}
                                            onClick={handleButtonColorClick}
                                        />
                                        <ButtonColor
                                            id={4}
                                            color1="#386641"
                                            label1="Vert chasseur"
                                            isSelected={selectedButtonColor === 4}
                                            onClick={handleButtonColorClick}
                                        />
                                        <ButtonColor
                                            id={5}
                                            color1="#DB5461"
                                            label1="Mandy"
                                            isSelected={selectedButtonColor === 5}
                                            onClick={handleButtonColorClick}
                                        />
                                        <ButtonColor
                                            id={6}
                                            color1="#5D2E8C"
                                            label1="Violet"
                                            isSelected={selectedButtonColor === 6}
                                            onClick={handleButtonColorClick}
                                        />
                                        <ButtonColor
                                            id={7}
                                            color1="#C80036"
                                            label1="Monza"
                                            isSelected={selectedButtonColor === 7}
                                            onClick={handleButtonColorClick}
                                        />
                                    </div>

                                </div>

                                <div className="flex flex-col items-center mt-20 pt-8 pb-4 bg-white leading-[140%]">
                                    <div className="grid grid-cols-auto sm:grid-cols-2 md:grid-cols-2 gap-24">
                                        <div key={1}
                                            onClick={() => handleFlyerClick(1)}
                                            className={`flex flex-col items-center mb-10 shadow-lg cursor-pointer ${selectedFlyer === 1 ? 'bg-black bg-opacity-10' : 'hover:bg-black hover:bg-opacity-10'
                                                }`}>
                                            <FlyerDesign1 gameFormat={gameFormat} />
                                        </div>
                                        <div key={2}
                                            onClick={() => handleFlyerClick(2)}
                                            className={`flex flex-col items-center mb-10 shadow-lg cursor-pointer ${selectedFlyer === 2 ? 'bg-black bg-opacity-10' : 'hover:bg-black hover:bg-opacity-10'
                                                }`}>
                                            <FlyerDesign2 gameFormat={gameFormat} />
                                        </div>
                                        <div key={3}
                                            onClick={() => handleFlyerClick(3)}
                                            className={`flex flex-col items-center mb-10 shadow-lg cursor-pointer ${selectedFlyer === 3 ? 'bg-black bg-opacity-10' : 'hover:bg-black hover:bg-opacity-10'
                                                }`}>
                                            <FlyerDesign3 gameFormat={gameFormat} />
                                        </div>
                                        <div key={5}
                                            onClick={() => handleFlyerClick(5)}
                                            className={`flex flex-col items-center mb-10 shadow-lg cursor-pointer ${selectedFlyer === 5 ? 'bg-black bg-opacity-10' : 'hover:bg-black hover:bg-opacity-10'
                                                }`}>
                                            <FlyerDesign5 gameFormat={gameFormat} />
                                        </div>
                                        <div key={4}
                                            onClick={() => handleFlyerClick(4)}
                                            className={`flex flex-col items-center overflow-hidden mb-10 shadow-lg cursor-pointer ${selectedFlyer === 4 ? 'bg-black bg-opacity-10' : 'hover:bg-black hover:bg-opacity-10'
                                                }`}>
                                            <FlyerDesign4 gameFormat={gameFormat} />
                                        </div>
                                        <div key={6}
                                            onClick={() => handleFlyerClick(6)}
                                            className={`flex flex-col items-center mb-10 shadow-lg cursor-pointer ${selectedFlyer === 6 ? 'bg-black bg-opacity-10' : 'hover:bg-black hover:bg-opacity-10'
                                                }`}>
                                            <FlyerDesign6 gameFormat={gameFormat} />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex max-w-[1050px] ml-5 mr-4 mt-5 justify-end max-md:ml-0 max-md:w-full">
                                    <div
                                        onClick={handleDownload}
                                        className="justify-center w-[200px] self-stretch px-3 py-2.5 my-auto text-base font-semibold leading-6 text-center text-white whitespace-nowrap bg-indigo-400 rounded-xl hover:bg-indigo-500 max-md:mt-10 cursor-pointer"
                                        style={{ background: gameFormat.buttonColor }}
                                    >
                                        <label className="cursor-pointer" >Télécharger Flyer</label>
                                    </div>
                                </div>

                            </>
                        )
                    }



                </div>
            </div>
        </div >
    );
}

