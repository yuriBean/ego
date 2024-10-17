import { useEffect, useState } from "react";
import AsideHeader from "../../components/AsideHeader";
import axios from "axios";

function Index() {
    const [data, setData] = useState(null);
    const [fetchUser, setFetchUser] = useState(false);

    const columns = [
        "Nom",
        "Adresse E-mail",
        "Numéro de Téléphone",
        "Date de Demande",
    ];

    useEffect(() => {
        try {
            axios.get(`${process.env.REACT_APP_BACKEND_PORT}/auth/trial`, {
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then((res) => {
                setData(res.data);
            });
        } catch (error) {
            console.error("Erreur lors de la récupération des données");
        }
    }, [fetchUser]);

    const approveUser = async (id) => {
        try {
            await axios.patch(`${process.env.REACT_APP_BACKEND_PORT}/auth/trial?id=${id}`, {}, {
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            setFetchUser(prev => !prev);
        } catch (error) {
            console.error("Erreur lors de l'approbation de l'utilisateur");
        }
    };

    return (
        <div className="flex mb-20">
            <AsideHeader />
            <div className="w-full mt-6 mx-5">
                <div className="flex items-end justify-between">
                    <div className="justify-center self-start p-2.5 mt-6 text-lg font-medium tracking-wide leading-6 text-blue-950">
                        Gestion des Essais
                    </div>
                </div>
                <div className="min-w-0 flex gap-5 mt-10 justify-between items-center p-5 bg-white shadow-[0px_5px_10px_1px_rgba(0,0,0,0.3)] overflow-auto">
                    {columns.map((key, idx) => (
                        <div key={idx} className="font-bold flex-shrink-0 whitespace-nowrap overflow-hidden text-ellipsis">{key}</div>
                    ))}
                    <div className="w-[60px]"></div>
                </div>

                {data?.map((item, index) => (
                    <div key={index} className="min-w-0 flex gap-5 mt-10 justify-between items-center p-5 bg-white shadow-[0px_5px_10px_1px_rgba(0,0,0,0.3)] overflow-auto w-full">
                        <div className="w-[100px] flex-shrink-0 whitespace-nowrap overflow-hidden text-ellipsis">{item.name}</div>
                        <div className="w-[180px] flex-shrink-0 whitespace-nowrap overflow-hidden text-ellipsis">{item.email}</div>
                        <div className="w-[140px] flex-shrink-0 whitespace-nowrap overflow-hidden text-ellipsis">{item.phoneNumber || '-'}</div>
                        <div className="w-[100px] flex-shrink-0 whitespace-nowrap overflow-hidden text-ellipsis">{item.createdAt.slice(0, 10)}</div>
                        {
                            item.isTrialVerified ?
                                <button className="justify-center self-stretch p-2.5 font-semibold text-center text-white whitespace-nowrap bg-indigo-400 rounded-xl border-2 border-indigo-400 border-solid">
                                    Approuvé
                                </button> : <button onClick={() => approveUser(item._id)} className="justify-center self-stretch p-2.5 font-semibold text-center text-black whitespace-nowrap rounded-xl border-2 border-indigo-400 border-solid bg-white">
                                    Approuver
                                </button>
                        }
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Index;
