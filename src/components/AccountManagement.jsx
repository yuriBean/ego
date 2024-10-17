import React, { useState, useEffect } from "react";
import AsideHeader from "./AsideHeader";
import AddAcccountModel from "./AddAccount";
import axios from 'axios';
import { useSelector } from 'react-redux';

function AccountManagement() {
    // Sample data object with row names and corresponding values
    const [open, setOpen] = useState(false)
    const userId = useSelector(state => state.authentication.userId);
    const [data, setData] = useState([]);
    const [row, setRow] = useState({});

    const columns = [
        "Nom",
        "Adresse e-mail",
        "Plan d'abonnement",
        "Statut du compte",
        "Dernière connexion"
    ]

    const fetchData = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_PORT}/sub/auth/${userId}`, {
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const updatedData = res.data?.map((Item) => {
                return { _id: Item._id, name: Item.name, email: Item.email, password: Item.password, subScriptionPlan: Item.subScriptionPlan, status: Item.status, lastlogin: Item.lastlogin }
            });
            setData(updatedData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData()
    }, [])



    const deleteClick = async (id) => {
        try {

            await axios.delete(`${process.env.REACT_APP_BACKEND_PORT}/sub/auth/delete/${id}`, {
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            fetchData()
        } catch (error) {
            console.error("Error deleting sub-account:", error);
        }
    };

    const EditClick = async (row) => {
        setRow(row)
        setOpen(true)
    };




    return (
        <div className="flex mb-20">
            <AsideHeader />
            <div className="w-full mt-6 mx-5">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between">
                    <div className="self-start p-2.5 mt-6 text-lg font-medium tracking-wide leading-6 text-blue-950">

                        Gestion des sous-comptes

                    </div>
                    <div
                        onClick={() => {
                            setRow({});
                            setOpen(!open);
                        }}
                        className="cursor-pointer flex gap-px p-2.5 text-base font-bold tracking-tight text-white bg-indigo-400 rounded-md w-[200px] mt-5 md:mt-0 text-center justify-center"
                    >

                        Ajouter un nouveau compte
                    </div>
                </div>
                <div className="grid grid-cols-6 gap-5 mt-10 p-5 bg-white shadow-[0px_5px_10px_1px_rgba(0,0,0,0.3)]">
                    {columns.map((key, idx) => (
                        <div key={idx} className="font-bold whitespace-nowrap overflow-hidden text-ellipsis text-center">
                            {key}
                        </div>
                    ))}
                    <div className="w-[40px]"></div>
                </div>

                {data?.map((row, index) => (
                    <div
                        key={index}
                        className="grid grid-cols-6 gap-5 mt-5 p-5 bg-white shadow-[0px_5px_10px_1px_rgba(0,0,0,0.3)] overflow-x-auto"
                    >
                        <div className=" whitespace-nowrap overflow-hidden text-ellipsis text-center">
                            {row.name}
                        </div>
                        <div className="whitespace-nowrap overflow-hidden text-ellipsis text-center">
                            {row.email}
                        </div>
                        <div className=" whitespace-nowrap overflow-hidden text-ellipsis text-center">
                            {row.subScriptionPlan}
                        </div>
                        <div className=" whitespace-nowrap overflow-hidden text-ellipsis text-center">
                            {row.status}
                        </div>
                        <div className=" whitespace-nowrap overflow-hidden text-ellipsis text-center">
                            {row.lastlogin || '2024-09-97'}
                        </div>
                        <div className="flex justify-center">
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/4a8d85938fe63f5efcc5d81cafc206f082dca5d1a7778857dc6bafcf7f366e76?apiKey=cf358c329e0d49a792d02d32277323ef&"
                                className="shrink-0 aspect-square w-[25px] mr-4 hover:cursor-pointer"
                                alt="Edit icon"
                                onClick={() => EditClick(row)}
                            />
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/49d8fa0ee334eeb1c577a52f2430e7ac742d5fef669e229aacdb4a6b7d9a9437?apiKey=cf358c329e0d49a792d02d32277323ef&"
                                className="shrink-0 aspect-square w-[25px] hover:cursor-pointer"
                                alt="Delete icon"
                                onClick={() => deleteClick(row._id)}
                            />
                        </div>
                    </div>
                ))}
            </div>



            <AddAcccountModel open={open} setOpen={setOpen} fetchData={fetchData} row={row} />
        </div>
    );
}

export default AccountManagement;