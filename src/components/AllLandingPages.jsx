import { useEffect, useState } from "react";
import AsideHeader from "./AsideHeader";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MessageModal from "./MessageModal";
import Switch from '@mui/material/Switch';

function AllLandingPages() {
    // Sample data object with row names and corresponding values
    const userId = useSelector(state => state.authentication.userId);
    const ownerId = useSelector(state => state.authentication.ownerId);
    const [data, setData] = useState();
    const [userData, setUserData] = useState(); // State for user data
    const Navigate = useNavigate();

    const [openMessage, setOpenMessage] = useState(false);
    const [messageModal, setMessageModal] = useState("");

    const [link, setLink] = useState("");
    const [buttonText, setbuttonText] = useState("");

    const [checkedStates, setCheckedStates] = useState([]);
    const [fetchUser, setFetchUser] = useState(false);

    const HandleToggle = async (id, action) => {
        try {
            await axios.patch(`${process.env.REACT_APP_BACKEND_PORT}/game/toggle/${id}/${action}`, {}, {
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            setFetchUser(prev => !prev);
            action === false ? setMessageModal('Page désactivée') : setMessageModal('Page activée')
            setLink('/landing-pages')
            setbuttonText('D\'accord')
            setOpenMessage(true)            
        } catch (error) {
            console.error("Erreur lors de la gestion de l'utilisateur :", error);
        }
    };

    const handleChange = (index, id) => {
        const newCheckedStates = [...checkedStates];
        newCheckedStates[index] = !newCheckedStates[index];
        setCheckedStates(newCheckedStates);
        HandleToggle(id, newCheckedStates[index]);
    };

    useEffect(() => {
        try {
            axios.get(`${process.env.REACT_APP_BACKEND_PORT}/game?owner=${ownerId ?? userId}`, {
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then((res) => {
                const FData = res.data?.map((Item, index) => {
                    return { pageNo: index + 1, resturantName: Item.resturantName, createdDate: Item.createdAt?.slice(0, 10), toggle: Item.toggle, id: Item._id }
                })

                setData(FData);
                setCheckedStates(FData.map(item => item.toggle));

            })
        } catch (error) {
            console.error("error");
        }
    }, [fetchUser])

    // Fetch user data
    useEffect(() => {
        if (userId) {
            axios
                .get(`${process.env.REACT_APP_BACKEND_PORT}/auth/${userId}`)
                .then((res) => {
                    setUserData(res.data);
                })
                .catch((error) => {
                    console.error("Error fetching user data:", error);
                });
        }
    }, []);

    const handleCopyLink = (index, itemId) => {
        const currentDate = new Date();
        const expiryDate = new Date(userData.expiryDate); // Assuming expiryDate is a property of userData

        const isExpired = expiryDate < currentDate ? "Yes" : "No";
        if (!checkedStates[index]) {
            setMessageModal(`Veuillez d'abord activer la page`)
            setLink('/landing-pages')
            setbuttonText('D\'accord')
            setOpenMessage(true)
        }
        if (isExpired === "Yes") {
            setMessageModal('Abonnement expiré, veuillez le renouveler !')
            setLink('/pricing')
            setbuttonText('Renouveler')
            setOpenMessage(true)
        } else {
            navigator.clipboard.writeText(`${window.location.origin}/spin/game/${itemId}`);
        }
        
    };


    const columns = [
        "Numéro de page",
        "Nom du restaurant",
        "Date de création",
        "Activer/Désactiver"
    ]

    return (
        <div className="flex mb-20">
            <AsideHeader />
            <div className="w-full mt-6 mx-5">
                <div className="flex items-end justify-between">
                    <div className="p-2.5 mt-6 text-lg font-medium tracking-wide leading-6 text-blue-950">
                        Pages d'atterrissage
                    </div>
                </div>
                <div className="w-[1000px] m-auto">
                    <div className="grid grid-cols-6 gap-9 mt-10 p-5 bg-white shadow-[0px_5px_10px_1px_rgba(0,0,0,0.3)] overflow-auto">
                        {columns.map((key, idx) => (
                            <div
                                key={idx}
                                className="font-bold text-ellipsis"
                                style={{ minWidth: '200px', maxWidth: '250px' }}
                            >
                                {key}
                            </div>
                        ))}
                        <div className="w-[250px]"></div>
                    </div>

                    {data?.map((item, index) => (
                        <div
                            key={index}
                            className="grid grid-cols-6 gap-5 mt-10 p-5 bg-white shadow-[0px_5px_10px_1px_rgba(0,0,0,0.3)] w-full items-center "
                        >
                            <div className="whitespace-nowrap">{item.pageNo}</div>
                            <div className="whitespace-nowrap">{item.resturantName}</div>
                            <div className="whitespace-nowrap">{item.createdDate}</div>
                            <Switch
                                checked={checkedStates[index]}
                                onChange={() => handleChange(index, item.id)}
                                inputProps={{ 'aria-label': 'contrôlé' }}

                            />
                            <button
                                onClick={() => {
                                    Navigate(`/game/${item.id}`);
                                }}
                                className="justify-center p-2.5 font-semibold text-center text-black whitespace-nowrap rounded-xl border-2 border-indigo-400 bg-white"
                            >
                                Modifier
                            </button>
                            <button
                                onClick={() => handleCopyLink(index, item.id)}
                                className="justify-center p-2.5 font-semibold text-center text-white whitespace-nowrap bg-indigo-400 rounded-xl border-2 border-indigo-400 hover:opacity-65 transition-all"
                            >
                                Copier le lien
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            {openMessage && (
                <MessageModal
                    open={openMessage}
                    setOpen={setOpenMessage}
                    message={messageModal}
                    ButtonText={buttonText}
                    link={link}
                />
            )}
        </div>
    );



}

export default AllLandingPages;