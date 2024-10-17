import { useEffect, useState } from "react";
import AsideHeader from "../../components/AsideHeader";
import Switch from '@mui/material/Switch';
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

function Index() {
    const Navigate = useNavigate();
    const [data, setData] = useState([]);
    useEffect(() => {
        try {
            axios.get(`${process.env.REACT_APP_BACKEND_PORT}/auth/getall/pages`, {
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then((res) => {
                const updatedData = res.data?.map((Item) => {
                    return { resturantName: Item.resturantName, ownerName: Item.ownerName, visitedMembers: Item.visitedMembers, reviews: Item.reviews, ownerId: Item.ownerId }
                })
                setData(updatedData);
            })
        } catch (error) {
            console.error("error");
        }
    }, [])

    const columns = [
        "Nom du restaurant",
        "Nom du propriétaire",
        "Visites totales",
        "Avis totaux",
    ];

    return (
        <div className="flex mb-20">
            <AsideHeader />
            <div className="w-full mt-6 mx-5">
                <div className="flex items-end justify-between">
                    <div className="justify-center self-start p-2.5 mt-6 text-lg font-medium tracking-wide leading-6 text-blue-950">
                        Analytique
                    </div>
                </div>
                <div className="min-w-0 flex gap-5 mt-10 justify-between items-center p-5 bg-white shadow-[0px_5px_10px_1px_rgba(0,0,0,0.3)] overflow-auto">
                    {columns.map((key, idx) => (
                        <div key={idx} className="font-bold flex-shrink-0 whitespace-nowrap overflow-hidden text-ellipsis">{key}</div>
                    ))}
                    <div className="w-[60px]"></div>
                </div>

                {data.map((row, index) => (
                    <div key={index} className="min-w-0 flex gap-5 mt-10 justify-between items-center p-5 bg-white shadow-[0px_5px_10px_1px_rgba(0,0,0,0.3)] overflow-auto w-full">
                        <div className="w-[130px] flex-shrink-0 whitespace-nowrap overflow-hidden text-ellipsis">{row.resturantName}</div>
                        <div className="w-[110px] flex-shrink-0 whitespace-nowrap overflow-hidden text-ellipsis">{row.ownerName}</div>
                        <div className="w-[40px] flex-shrink-0 whitespace-nowrap overflow-hidden text-ellipsis">{row.visitedMembers || '-'}</div>
                        <div className="w-[10px] flex-shrink-0 whitespace-nowrap overflow-hidden text-ellipsis">{row.reviews || '-'}</div>
                        <button onClick={() => { Navigate(`/dashboard/${row.ownerId}`) }} className="justify-center self-stretch p-2.5 font-semibold text-center text-white whitespace-nowrap bg-indigo-400 rounded-xl border-2 border-indigo-400 border-solid">
                            Voir les détails
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Index;
