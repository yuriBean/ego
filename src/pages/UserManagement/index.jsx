import { useEffect, useState } from "react";
import AsideHeader from "../../components/AsideHeader";
import Switch from '@mui/material/Switch';
import axios from "axios";
import { useSelector } from "react-redux";

function Index() {
    const userId = useSelector(state => state.authentication.userId);
    const [data, setData] = useState([]);
    const [fetchUser, setFetchUser] = useState(false);
    const [checkedStates, setCheckedStates] = useState([]);

    useEffect(() => {
        try {
            axios.get(`${process.env.REACT_APP_BACKEND_PORT}/auth/getall`, {
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then((res) => {
                const updatedData = res.data?.map((Item) => {
                    return { _id: Item._id, name: Item.name, email: Item.email, phoneNumber: Item.phoneNumber, access: Item.access, pages: Item.pages, blocked: Item.blocked, isToggle: Item.isToggle }
                });
                setData(updatedData);
                setCheckedStates(updatedData.map(item => item.isToggle));
            })
        } catch (error) {
            console.error("Erreur lors de la récupération des données :", error);
        }
    }, [fetchUser]);

    const blockAndUnblockUser = async (id, action) => {
        try {
            const response = await axios.patch(`${process.env.REACT_APP_BACKEND_PORT}/auth/block/${id}/${action}`, {}, {
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            setFetchUser(prev => !prev);
        } catch (error) {
            console.error("Erreur lors de la gestion de l'utilisateur :", error);
        }
    };

    const HandleToggle = async (id, action) => {
        try {
            await axios.patch(`${process.env.REACT_APP_BACKEND_PORT}/auth/toggle/${id}/${action}`, {}, {
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            setFetchUser(prev => !prev);
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

    const columns = [
        "Nom",
        "Adresse e-mail",
        "Numéro de téléphone",
        "Niveau d'accès",
        "Pages du restaurant"
    ];

    return (
        <div className="flex mb-20">
            <AsideHeader />
            <div className="w-full mt-6 mx-5">
                <div className="flex items-end justify-between">
                    <div className="justify-center self-start p-2.5 mt-6 text-lg font-medium tracking-wide leading-6 text-blue-950">
                        Gestion des utilisateurs
                    </div>
                </div>
                <div className="grid grid-cols-6 gap-5 mt-10 p-5 bg-white shadow-[0px_5px_10px_1px_rgba(0,0,0,0.3)]">
                    {columns.map((key, idx) => (
                        <div key={idx} className="font-bold text-center">{key}</div>
                    ))}
                </div>

                {data.map((row, index) => (
                    <div key={index} className="grid grid-cols-6 gap-5 mt-5 p-5 bg-white shadow-[0px_5px_10px_1px_rgba(0,0,0,0.3)] items-center">
                        <div className="text-center">{row.name}</div>
                        <div className="text-center">{row.email}</div>
                        <div className="text-center">{row.phoneNumber || '-'}</div>
                        <div className="text-center">{row.access || '-'}</div>
                        <div className="text-center">{row.pages || '-'}</div>
                        <div className="flex items-center justify-center">
                            <Switch 
                                checked={checkedStates[index]}
                                onChange={() => handleChange(index, row._id)}
                                inputProps={{ 'aria-label': 'contrôlé' }}
                            />
                            {row.blocked ? (
                                <button onClick={() => blockAndUnblockUser(row._id, 'unblock')} className="p-2.5 font-semibold text-white bg-indigo-400 border-2 border-indigo-400 rounded-xl">
                                    Débloquer
                                </button>
                            ) : (
                                <button onClick={() => blockAndUnblockUser(row._id, 'block')} className="p-2.5 font-semibold text-black border-2 border-indigo-400 bg-white rounded-xl">
                                    Bloquer
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Index;
