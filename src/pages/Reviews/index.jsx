import React, { useEffect, useState } from 'react'
import AsideHeader from '../../components/AsideHeader'
import axios from 'axios'
import { useSelector } from 'react-redux';
import './index.css'

const StarRating = ({ rating }) => {
    const stars = Array.from({ length: 5 }, (_, index) => (
        <span key={index} className={`star ${index < rating ? 'filled' : ''}`}>★</span>
    ));

    return <div className="star-rating">{stars}</div>;
};

const Index = () => {
    const [data, setData] = useState(null);
    const userId = useSelector(state => state.authentication.userId);
    useEffect(() => {
        try {
            axios.get(`${process.env.REACT_APP_BACKEND_PORT}/review/${userId}`, {
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then((res) => {
                setData(res.data);
                console.log(res.data);
            })
        } catch (error) {
            console.error("error");
        }
    }, [])
    return (
        <div className="flex mb-20">
            <AsideHeader />
            <div className="flex w-full flex-col items-center mt-4 max-md:mt-10 max-md:max-w-full">
                <div className="justify-center text-center self-start p-2.5 mt-6 text-lg font-medium tracking-wide leading-6 text-blue-950">
                    Avis des clients
                </div>
                <div className="flex flex-col w-full max-w-4xl mt-10 text-base font-medium leading-6 text-black">
                    <div className="min-w-0 flex gap-5 mt-10 mb-5 justify-between items-center p-5 bg-white shadow-[0px_5px_10px_1px_rgba(0,0,0,0.3)] overflow-auto">
                        <div className='flex-1 font-bold flex-shrink-0 whitespace-nowrap overflow-hidden text-ellipsis'>Nom</div>
                        <div className='flex-1 font-bold flex-shrink-0 whitespace-nowrap overflow-hidden text-ellipsis'>Notation</div>
                        <div className='flex-1 font-bold flex-shrink-0 whitespace-nowrap overflow-hidden text-ellipsis'>Date soumission</div>
                        <div className='flex-1 font-bold flex-shrink-0 whitespace-nowrap overflow-hidden text-ellipsis'>Soumission heure</div>
                        <div className='flex-1 font-bold flex-shrink-0 whitespace-nowrap overflow-hidden text-ellipsis'>Avis</div>
                    </div>
                    <div className="flex flex-col gap-5 w-full bg-white shadow-sm max-md:flex-wrap">
                        {
                            data?.map((Item) => (
                                <div className="min-w-0 flex gap-5 mt-3  justify-between items-center p-5 bg-white shadow-[0px_5px_10px_1px_rgba(0,0,0,0.3)] overflow-auto w-full">
                                    <div className='font-bold flex-shrink-0 whitespace-nowrap overflow-hidden text-ellipsis flex-1'>{Item.name}</div>
                                    <div className='font-bold flex-shrink-0 whitespace-nowrap overflow-hidden text-ellipsis flex-1'><StarRating rating={Item.rating} /></div>
                                    <div className='font-bold flex-shrink-0 whitespace-nowrap overflow-hidden text-ellipsis flex-1 text-center'>{Item.reviewDate?.slice(0, 10)}</div>
                                    <div className='font-bold flex-shrink-0 whitespace-nowrap overflow-hidden text-ellipsis flex-1 text-center'>{Item.reviewTime}</div>
                                    <div className="font-bold flex-shrink-0 whitespace-nowrap overflow-hidden text-ellipsis leading-6 flex-1 text-start">{Item.text}</div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
    
}

export default Index