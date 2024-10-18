import { useEffect, useState } from "react";
import AsideHeader from "../../components/AsideHeader";
import { useSelector } from "react-redux";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import SpinDesign from "../../components/SpinDesign.jsx";
import { useDispatch } from 'react-redux';

import MessageModal from "../../components/MessageModal";

export default function GameManagement() {
    const [selectedRow, setSelectedRow] = useState(1);
    const { id } = useParams();

    const temp = {
        value: ''
    };

    const Navigate = useNavigate();
    const userId = useSelector(state => state.authentication.userId);
    const [data, setData] = useState(new Array(5).fill(temp))
    const [uploadLogo, setUploadLogo] = useState(true);
    const [total, setTotal] = useState(100);

    const [openMessage, setOpenMessage] = useState(false);
    const [message, setMessage] = useState("");

    const [link, setLink] = useState("");
    const [buttonText, setbuttonText] = useState("");



    const [gameFormat, setGameFormate] = useState({
        ownerId: userId,
        brandName: '',
        resturantName: '',
        resturantAddress: '',
        logo: '',
        options: {
            option1: '',
            option2: '',
            option3: '',
            option4: '',
            option5: '',
            option6: '',
            option7: '',
            option8: '',
            option1frequency: '',
            option2frequency: '',
            option3frequency: '',
            option4frequency: '',
            option5frequency: '',
            option6frequency: '',
            option7frequency: '',
            option8frequency: ''
        },
        wheelColorPair: {
            color1: '#8497FC',
            color2: '#FDFDAF'
        },
        buttonColor: '#8497FC',
        buttonColorID: '',
        instagram: 'https://www.instagram.com/',
        tiktok: 'https://www.tiktok.com/',
        facebook: 'https://www.facebook.com/',
        googleMaps: 'https://www.google.com/maps/',
        twitter: 'https://www.twitter.com/',
        followOrReview: 'instagram',
        content: '',
    });

    const [selectedPair, setSelectedPair] = useState(1);
    const [selectedButtonColor, setSelectedButtonColor] = useState(1);

    const dispatch = useDispatch();

    const handlePairClick = (pairId, color1, color2) => {
        setSelectedPair(pairId);
        setGameFormate({
            ...gameFormat,
            wheelColorPair: {
                id: pairId,
                color1: color1,
                color2: color2
            }
        });

    };

    const handleButtonColorClick = (pairId, color1) => {
        setSelectedButtonColor(pairId);
        setGameFormate({
            ...gameFormat,
            buttonColor: color1,
            buttonColorID: pairId
        });

    };

    useEffect(() => {
        if (id) {
            try {
                axios.get(`${process.env.REACT_APP_BACKEND_PORT}/game/update?pageId=${id}`, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }).then((res) => {
                    const fetchedData = res.data;
    
                    // Calculate the total based on the fetched option frequencies
                    const fetchedTotal = Object.keys(fetchedData.options).reduce((acc, key) => {
                        if (key.includes('frequency')) {
                            return acc + (Number(fetchedData.options[key]) || 0);
                        }
                        return acc;
                    }, 0);
    
                    // Update the state with fetched data and set the total to 100 - fetchedTotal
                    setGameFormate(fetchedData);
                    setSelectedPair(fetchedData.wheelColorPair.id);
                    setSelectedButtonColor(fetchedData.buttonColorID);
                    setTotal(100 - fetchedTotal); // Ensure the total is 100
                });
            } catch (error) {
                console.error("Error fetching game data");
            }
        }
    }, [id]);
    

    const optionsArray = Array.from({ length: 100 }, (_, i) => i + 1);
    const createLandingPage = () => {
        if (id) {
            try {
                axios.put(`${process.env.REACT_APP_BACKEND_PORT}/game/${id}`, { gameFormat }, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }).then((res) => {
                    Navigate('/landing-pages')
                })
            } catch (error) {
                console.error("Error sending email");
            }
        } else {
            try {
                axios.post(`${process.env.REACT_APP_BACKEND_PORT}/game`, { gameFormat }, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }).then((res) => {
                    Navigate('/landing-pages')
                }).catch((err) => {
                    // Navigate(`/pricing/:${userId}`)
                    // if (err.response.data.message !== "Please wait for admin approval" && err.response.data.message !== "You are restricted from admin to create landing page") {
                    //     setLink("/landing-pages")
                    //     setbuttonText("Okay")
                    // }
                    // else {
                    //     setLink("/game")
                    //     setbuttonText("Okay")
                    // }
                    setLink("/game")
                    setbuttonText("D'accord")


                    setMessage(err.response.data.message)
                    setOpenMessage(true)

                })
            } catch (error) {
                console.error("Error sending email");
            }

        }
    }

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

    return (
        <div className="flex mb-20">
            <AsideHeader />
            <div className="flex w-full flex-col items-center mt-4 max-md:mt-10 max-md:max-w-full">
                <div className="justify-center text-center self-start p-2.5 mt-6 text-lg font-medium tracking-wide leading-6 text-blue-950">
                    Game Management
                </div>
                <div className="mt-2 text-2xl font-bold leading-10 text-black">
                    Set up your landing page
                </div>
                <div className="flex gap-5 justify-between mt-12 text-xl font-semibold tracking-tight text-blue-950 max-md:mt-10">
                    <div onClick={() => { setSelectedRow(1) }} className={`cursor-pointer text-center justify-center px-5 py-2.5  ${selectedRow === 1 ? 'bg-indigo-400 text-white' : 'text-black'} rounded-3xl`}>
                        Page Content
                    </div>
                    <div onClick={() => { setSelectedRow(2) }} className={`cursor-pointer text-center justify-center px-5 py-2.5 whitespace-nowrap ${selectedRow === 2 ? 'bg-indigo-400 text-white' : 'text-black'} rounded-3xl`}>
                        Design
                    </div>
                    <div onClick={() => { setSelectedRow(3) }} className={`cursor-pointer text-center justify-center px-5 py-2.5 ${selectedRow === 3 ? 'bg-indigo-400 text-white' : 'text-black'} rounded-3xl`}>
                        Social Media links
                    </div>
                </div>

                <div className="flex flex-col mt-9 w-full max-w-[1050px] max-md:max-w-full">

                    {
                        selectedRow === 1 && (
                        <>
                            <div className="flex flex-col my-5 w-full max-w-[1050px] max-md:max-w-full">
                                <div className="flex flex-col p-5 font-medium text-black bg-white leading-[140%] max-md:max-w-full mr-2 md:mr-5 shadow-[0px_5px_10px_1px_rgba(0,0,0,0.3)]">
                                    <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                                        <div className="mt-4 text-base font-medium leading-5 text-black w-full">
                                            Nom du Restaurant
                                            <input 
                                                onChange={(e) => setGameFormate({ ...gameFormat, resturantName: e.target.value })} 
                                                className="flex flex-col justify-center px-3.5 py-2.5 mt-3 text-base leading-6 bg-white rounded-lg border border-gray-300 border-solid shadow-sm text-zinc-400 max-md:max-w-full outline-none w-full" 
                                                type="text" 
                                                placeholder="Entrez le nom de votre marque" 
                                                value={gameFormat.resturantName} 
                                                required 
                                            />
                                        </div>
                                    </div>
                                    <div className="flex mt-4 gap-5 max-md:flex-col max-md:gap-0">
                                        <div className="mt-4 text-base font-medium leading-5 text-black w-full">
                                            Adresse du Restaurant
                                            <input 
                                                onChange={(e) => setGameFormate({ ...gameFormat, resturantAddress: e.target.value })} 
                                                className="flex flex-col justify-center px-3.5 py-2.5 mt-3 text-base leading-6 bg-white rounded-lg border border-gray-300 border-solid shadow-sm text-zinc-400 max-md:max-w-full outline-none w-full" 
                                                type="text" 
                                                placeholder="Entrez l'adresse du restaurant" 
                                                value={gameFormat.resturantAddress} 
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col p-5 font-medium text-black bg-white leading-[140%] max-md:max-w-full mr-2 md:mr-5 shadow-[0px_5px_10px_1px_rgba(0,0,0,0.3)]">
                                <div className="text-2xl max-md:max-w-full">Nom de Marque</div>
                                <div className="flex flex-col items-start pr-20 mt-3.5 text-base max-md:pr-5 max-md:max-w-full ">
                                    <div 
                                        onClick={() => { setUploadLogo(true); setGameFormate({ ...gameFormat, logo: '', brandName: '' }) }} 
                                        className="flex gap-3 justify-center"
                                    >
                                        <input type='radio' className="w-[20px] ml-1" id="uploadLogo" name="selection" checked={uploadLogo} />
                                        <label htmlFor="uploadLogo" id="uploadLogo" className="my-auto">Charger le logo</label>
                                    </div>
                                    <div 
                                        onClick={() => { setUploadLogo(false); setGameFormate({ ...gameFormat, logo: '', brandName: '' }) }} 
                                        className="flex gap-3 justify-center mt-1.5"
                                    >
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
                                                    gameFormat.logo ? 
                                                    <img src={gameFormat.logo} alt="logo" className="shrink-0 rounded-full bg-zinc-300 h-[100px] w-[100px] max-md:mt-10" /> : 
                                                    <div className="shrink-0 rounded-full bg-zinc-300 h-[100px] w-[100px] max-md:mt-10" />
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
                                                    Nom de Marque
                                                    <input 
                                                        onChange={(e) => setGameFormate({ ...gameFormat, brandName: e.target.value })} 
                                                        className="flex flex-col justify-center px-3.5 py-2.5 mt-3 text-base leading-6 bg-white rounded-lg border border-gray-300 border-solid shadow-sm text-zinc-400 max-md:max-w-full outline-none w-full" 
                                                        type="text" 
                                                        placeholder="Entrez le nom de votre marque" 
                                                        value={gameFormat.brandName} 
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            <div className="flex flex-col mt-9 w-full max-w-[1050px] max-md:max-w-full">
                                <div className="flex flex-col p-5 font-medium text-black bg-white leading-[140%] max-md:max-w-full mr-2 md:mr-5 shadow-[0px_5px_10px_1px_rgba(0,0,0,0.3)]">
                                    <div className="text-2xl font-medium leading-8 text-black max-md:max-w-full">
                                        Options pour la roue de la fortune
                                    </div>
                                    <div className="flex flex-col mt-3.5 max-md:max-w-full">
                                        {
                                            data.map((Item, index) => (
                                                <div className="mt-4 text-base font-medium leading-5 text-black max-md:max-w-full" key={index}>
                                                    Option {index + 1}
                                                    <div className="flex">
                                                        <input
                                                            onChange={(e) => {
                                                                setGameFormate({
                                                                    ...gameFormat,
                                                                    options: { ...gameFormat.options, [`option${index + 1}`]: e.target.value }
                                                                })
                                                            }}
                                                            className="flex flex-col justify-center px-3.5 py-2.5 mt-3 text-base leading-6 bg-white rounded-lg border border-gray-300 border-solid shadow-sm text-zinc-400 max-md:max-w-full outline-none w-full"
                                                            type="text"
                                                            placeholder={`Entrez votre option ${index + 1}`}
                                                            value={gameFormat.options[`option${index + 1}`]}
                                                        />
                                                            <select
                                                                onChange={(e) => {
                                                                    const selectedValue = Number(e.target.value);
                                                                    const previousValue = gameFormat.options[`option${index + 1}frequency`] || 0;

                                                                    // Calculate new total
                                                                    const newTotal = total + previousValue - selectedValue;

                                                                    setTotal(newTotal);
                                                                    setGameFormate({
                                                                        ...gameFormat,
                                                                        options: { ...gameFormat.options, [`option${index + 1}frequency`]: selectedValue }
                                                                    });
                                                                }}
                                                                className="md:ml-2 flex flex-col justify-center px-3.5 py-2.5 mt-3 text-base leading-6 bg-white rounded-lg border border-gray-300 border-solid shadow-sm text-zinc-400 max-md:max-w-full outline-none w-[100px]"
                                                                value={gameFormat.options[`option${index + 1}frequency`] || ''}
                                                            >
                                                                <option disabled value="">Select</option>
                                                                {
                                                                    new Array(total + (gameFormat.options[`option${index + 1}frequency`] || 0) + 1).fill(0).map((_, optionIndex) => (
                                                                        <option key={optionIndex} value={optionIndex}>
                                                                            {optionIndex}
                                                                        </option>
                                                                    ))
                                                                }
                                                            </select>


                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="flex max-w-[1050px] ml-5 mr-4 mt-5 justify-end max-md:ml-0 max-md:w-full">
                                <div
                                    onClick={() => {
                                        setSelectedRow(2);
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }}
                                    className="justify-center w-[200px] self-stretch px-3 py-2.5 my-auto text-base font-semibold leading-6 text-center text-white whitespace-nowrap bg-indigo-400 rounded-xl hover:bg-indigo-500 max-md:mt-10 cursor-pointer"
                                >
                                    <label className="cursor-pointer">Conception</label>
                                </div>
                            </div>
                        </>
                        )
                    }


                    {
                        selectedRow === 2 && (
                            <>
                                <div className="flex flex-wrap p-5 font-medium text-black bg-white leading-[140%] shadow-[0px_5px_10px_1px_rgba(0,0,0,0.3)]">
                                    <div className="text-2xl max-md:max-w-full w-full mb-4">Couleur de la Roue</div>
                                    <div className="flex gap-[2vw] flex-wrap">
                                        {/* Color pair components */}
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
                                            label2="Crème de café"
                                            isSelected={selectedPair === 3}
                                            onClick={handlePairClick}
                                        />
                                        <ColorPair
                                            id={4}
                                            color1="#386641"
                                            label1="Vert chasseur"
                                            color2="#A7C957"
                                            label2="Vert doux"
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
                                    <div className="text-2xl max-md:max-w-full mb-4">Couleur du Bouton</div>
                                    <div className="flex gap-[2vw] flex-wrap">
                                        {/* ButtonColor components */}
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
                                            color1="#E3F2FD"
                                            label1="Bleu Alice"
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

                                <div className="flex flex-col items-center mt-20 pt-8 pb-4 bg-white leading-[140%] shadow-[0px_5px_10px_1px_rgba(0,0,0,0.3)]">
                                    <SpinDesign gameFormat={gameFormat} />
                                </div>

                                <div className="flex max-w-[1050px] ml-5 mr-4 mt-5 justify-end max-md:ml-0 max-md:w-full">
                                    <div
                                        onClick={() => {
                                            setSelectedRow(3);
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }}
                                        className="justify-center w-[200px] self-stretch px-3 py-2.5 my-auto text-base font-semibold leading-6 text-center text-white whitespace-nowrap bg-indigo-400 rounded-xl hover:bg-indigo-500 max-md:mt-10 cursor-pointer"
                                    >
                                        <label className="cursor-pointer">Liens Médias Sociaux</label>
                                    </div>
                                </div>
                            </>
                        )
                    }


                    {
                        selectedRow === 3 && (
                            <>
                                <div className="flex flex-col mt-9 w-full max-w-[1050px] max-md:max-w-full">
                                    <div className="flex flex-col p-5 font-medium text-black bg-white leading-[140%] max-md:max-w-full mr-2 md:mr-5 shadow-[0px_5px_10px_1px_rgba(0,0,0,0.3)]">
                                        <div className="text-2xl font-medium leading-8 text-black max-md:max-w-full">
                                            Liens des plateformes de médias sociaux
                                        </div>
                                        <div className="flex flex-col mt-3.5 max-md:max-w-full">
                                            <div className="mt-4 text-base font-medium leading-5 text-black max-md:max-w-full">
                                                Instagram
                                                <input onChange={(e) => setGameFormate({ ...gameFormat, instagram: e.target.value })} className="flex flex-col justify-center px-3.5 py-2.5 mt-3 text-base leading-6 bg-white rounded-lg border border-gray-300 border-solid shadow-sm text-zinc-400 max-md:max-w-full outline-none w-full" type="text" placeholder={`Enter link`} value={gameFormat.instagram} />
                                            </div>
                                        </div>
                                        {/* <div className="flex flex-col mt-3.5 max-md:max-w-full">
                                            <div className="mt-4 text-base font-medium leading-5 text-black max-md:max-w-full">
                                                TikTok
                                                <input onChange={(e) => setGameFormate({ ...gameFormat, tiktok: e.target.value })} className="flex flex-col justify-center px-3.5 py-2.5 mt-3 text-base leading-6 bg-white rounded-lg border border-gray-300 border-solid shadow-sm text-zinc-400 max-md:max-w-full outline-none w-full" type="text" placeholder={`Enter link`} value={gameFormat.tiktok} />
                                            </div>
                                        </div> */}
                                        <div className="flex flex-col mt-3.5 max-md:max-w-full">
                                            <div className="mt-4 text-base font-medium leading-5 text-black max-md:max-w-full">
                                                Facebook
                                                <input onChange={(e) => setGameFormate({ ...gameFormat, facebook: e.target.value })} className="flex flex-col justify-center px-3.5 py-2.5 mt-3 text-base leading-6 bg-white rounded-lg border border-gray-300 border-solid shadow-sm text-zinc-400 max-md:max-w-full outline-none w-full" type="text" placeholder={`Enter link`} value={gameFormat.facebook} />
                                            </div>
                                        </div>
                                        <div className="flex flex-col mt-3.5 max-md:max-w-full">
                                            <div className="mt-4 text-base font-medium leading-5 text-black max-md:max-w-full">
                                                Google Maps
                                                <input onChange={(e) => setGameFormate({ ...gameFormat, googleMaps: e.target.value })} className="flex flex-col justify-center px-3.5 py-2.5 mt-3 text-base leading-6 bg-white rounded-lg border border-gray-300 border-solid shadow-sm text-zinc-400 max-md:max-w-full outline-none w-full" type="text" placeholder={`Enter link`} value={gameFormat.googleMaps} />
                                            </div>
                                        </div>
                                        <div className="flex flex-col mt-3.5 max-md:max-w-full">
                                            <div className="mt-4 text-base font-medium leading-5 text-black max-md:max-w-full">
                                                Twitter
                                                <input onChange={(e) => setGameFormate({ ...gameFormat, twitter: e.target.value })} className="flex flex-col justify-center px-3.5 py-2.5 mt-3 text-base leading-6 bg-white rounded-lg border border-gray-300 border-solid shadow-sm text-zinc-400 max-md:max-w-full outline-none w-full" type="text" placeholder={`Enter link`} value={gameFormat.twitter} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col mt-9 w-full max-w-[1050px] max-md:max-w-full">
                                    <div className="flex flex-col p-5 font-medium text-black bg-white leading-[140%] max-md:max-w-full mr-2 md:mr-5 shadow-[0px_5px_10px_1px_rgba(0,0,0,0.3)]">
                                        <div className="text-2xl font-medium leading-8 text-black max-md:max-w-full">
                                            Obtenez un suivi ou un avis
                                        </div>
                                        <div className="flex flex-col mt-3.5 max-md:max-w-full">
                                            <div className="mt-4 text-base font-medium leading-5 text-black max-md:max-w-full">
                                                <label className="flex items-center mt-3">
                                                    <input
                                                        className="mr-2"
                                                        type="radio"
                                                        name="option"
                                                        value="instagram"
                                                        checked={gameFormat.followOrReview === 'instagram'}
                                                        onChange={(e) => setGameFormate({ ...gameFormat, followOrReview: e.target.value })}
                                                    />
                                                    Suivi Instagram
                                                </label>
                                                <label className="flex items-center mt-3">
                                                    <input
                                                        className="mr-2"
                                                        type="radio"
                                                        name="option"
                                                        value="google"
                                                        checked={gameFormat.followOrReview === 'google'}
                                                        onChange={(e) => setGameFormate({ ...gameFormat, followOrReview: e.target.value })}
                                                    />
                                                    Avis Google
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col mt-9 w-full max-w-[1050px] max-md:max-w-full">
                                    <div className="flex flex-col p-5 font-medium text-black bg-white leading-[140%] max-md:max-w-full mr-2 md:mr-5 shadow-[0px_5px_10px_1px_rgba(0,0,0,0.3)]">
                                        <div className="text-2xl font-medium leading-8 text-black max-md:max-w-full">
                                            Contenu de l'email
                                        </div>
                                        <div className="flex flex-col mt-3.5 max-md:max-w-full">
                                            <div className="mt-4 text-base font-medium leading-5 text-black max-md:max-w-full">
                                                Contenu
                                                <p className="justify-center px-3.5 py-2.5 mt-3 text-base bg-white shadow-sm text-zinc-400 max-md:max-w-full outline-none w-full" type="text">
                                                    Bravo, vous avez gagné {gameFormat.resturantName} !
                                                    Pour bénéficier pleinement de votre cadeau, nous vous invitons à vous rendre à l'adresse suivante, à la date de votre choix, et de présenter ce mail :
                                                    <span>
                                                        <br />
                                                        <br />
                                                    </span>
                                                    {gameFormat.resturantName}
                                                    <span>
                                                        <br />
                                                    </span>
                                                    {gameFormat.resturantAddress}
                                                    <span>
                                                        <br />
                                                        <br />
                                                    </span>
                                                    Attention, votre cadeau n'est disponible que pendant une durée limitée de 10 jours à partir de demain ! Ne laissez pas cette occasion exceptionnelle vous échapper, saisissez-la dès maintenant et profitez-en au maximum !
                                                    Un minimum d’achat de 10 € est requis pour récupérer le cadeau.
                                                    <span>
                                                        <br />
                                                        <br />
                                                    </span>
                                                    <span>
                                                        <strong>
                                                            Ceci est un message automatisé, veuillez ne pas répondre.
                                                        </strong>
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex max-w-[1050px] ml-5 mr-4 mt-5 justify-end max-md:ml-0 max-md:w-full">
                                    <div
                                        onClick={createLandingPage}
                                        className="justify-center w-[200px] self-stretch px-3 py-2.5 my-auto text-base font-semibold leading-6 text-center text-white whitespace-nowrap bg-indigo-400 rounded-xl hover:bg-indigo-500 max-md:mt-10 cursor-pointer"
                                    >
                                        <label className="cursor-pointer" >{`${id ? 'Mettre à jour page' : 'Créer page destination'}`}</label>
                                    </div>
                                </div>
                            </>
                        )
                    }



                </div>
            </div>
            {openMessage && <MessageModal open={openMessage} setOpen={setOpenMessage} message={message} ButtonText={buttonText} link={link} />}
        </div>
    );
}

