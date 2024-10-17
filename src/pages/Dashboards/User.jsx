import React, { useEffect } from 'react'
import { useState } from 'react';
import './index.css'
import AsideHeader from '../../components/AsideHeader';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { format, subDays } from 'date-fns';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const generateData = () => {
    const labels = [];
    const values = [];
    for (let i = 0; i < 10; i++) {
        const date = subDays(new Date(), 10 * i);
        labels.unshift(format(date, 'dd-MM-yyyy'));
        values.unshift(Math.floor(Math.random() * 100)); // Random value for demonstration
    }
    return { labels, values };
};

const { labels, values } = generateData();

const data = {
    labels,
    datasets: [
        {
            label: 'Value',
            data: values,
            fill: false,
            backgroundColor: 'rgba(75,192,192,0.2)',
            borderColor: 'rgba(75,192,192,1)',
            borderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 8,
        },
    ],
};

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Reviews Analytics',
        },
    },
    scales: {
        x: {
            title: {
                display: true,
                text: 'Date',
            },
        },
        y: {
            title: {
                display: true,
                text: 'Value',
            },
            beginAtZero: true,
        },
    },
};

const SpreadGraph = () => (
    <div style={{ width: '100%', margin: "auto", height: '100%' }}>
        <Line data={data} options={options} />
    </div>
);

const User = () => {
    const [progressValue, setProgressValue] = useState(0);
    const progressEndValue = 100;
    const speed = 50;
    const [completionRate, setCompletitionRate] = useState(0);
    const [data, setData] = useState({});
    const { id } = useParams();
    const userId = useSelector(state => state.authentication.userId);
    useEffect(() => {
        try {
            axios.get(`${process.env.REACT_APP_BACKEND_PORT}/game/pages/${id || userId}`, {
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then((res) => {
                setData(res.data)
            })
        } catch (error) {
            console.error("Error sending email");
        }
    }, [])

    useEffect(() => {
        const completionRate1 = (22 / 100) * 100 || 0;
        setCompletitionRate(completionRate1.toFixed(0))
        const progress = setInterval(() => {
            setProgressValue((prevValue) => {
                if (prevValue < progressEndValue) {
                    return prevValue + 1;
                } else {
                    clearInterval(progress);
                    return prevValue;
                }
            });
        }, speed);

        return () => {
            clearInterval(progress);
        };
    }, [progressValue]); // Run the effect only once when the component mounts


    return (
        <div>
            <div className="flex mb-20">
                <AsideHeader />
                <div>
                    <div className="flex w-full flex-col items-center mt-4 max-md:mt-10">
                        <div className="justify-center text-center self-start p-2.5 mt-6 font-medium tracking-wide leading-6 text-blue-950 text-3xl md:text-lg">
                            Tableau de bord
                        </div>
                        <div className='flex flex-row m-10 gap-10 flex-wrap md:flex-nowrap justify-center '>
                            <div className="flex flex-col items-center justify-center p-4 h-[220px] w-[200px] max-md:flex-col shadow-[0px_5px_10px_1px_rgba(0,0,0,0.3)] max-md:gap-0">
                                <p className='font-semibold pb-3' style={{ margin: "3px 0", fontSize: "18px", color: "#000" }}>Instagram</p>
                                <div className="container-goal">
                                    <div className="circular-progress1" style={{ backgroundColor: "#DAD7FE" }}>
                                        <div className="value-container">{`${((data.instaCount/(data.instaCount + data.facebookCount + data.googleMapsCount + data.twitterCount))*100).toFixed(0) || 0}%`}</div>
                                    </div>
                                    <style >{`
                    .circular-progress1 {
                        background: conic-gradient(
                            #8497FC ${((data.instaCount/(data.instaCount + data.facebookCount + data.googleMapsCount + data.twitterCount))*100).toFixed(0) || 0 * 3.6}deg,
                            #DAD7FE ${((data.instaCount/(data.instaCount + data.facebookCount + data.googleMapsCount + data.twitterCount))*100).toFixed(0) || 0}deg
                            );
                        }
                        `}</style>
                                </div>
                            </div>
                            <div className="flex flex-col items-center justify-center p-4 h-[220px] w-[200px] max-md:flex-col shadow-[0px_5px_10px_1px_rgba(0,0,0,0.3)] max-md:gap-0">
                                <p className='font-semibold pb-3' style={{ margin: "3px 0", fontSize: "18px", color: "#000" }}>Facebook</p>
                                <div className="container-goal">
                                    <div className="circular-progress" style={{ backgroundColor: "#6AD2FF" }}>
                                        <div className="value-container">{`${((data.facebookCount/(data.instaCount + data.facebookCount + data.googleMapsCount + data.twitterCount))*100).toFixed(0) || 0}%`}</div>
                                    </div>
                                    <style >{`
                    .circular-progress {
                        background: conic-gradient(
                            #6AD2FF ${((data.facebookCount/(data.instaCount + data.facebookCount + data.googleMapsCount + data.twitterCount))*100).toFixed(0) || 0 * 3.6}deg,
                            #CCF8FE ${((data.facebookCount/(data.instaCount + data.facebookCount + data.googleMapsCount + data.twitterCount))*100).toFixed(0) || 0}deg
                            );
                        }
                        `}</style>
                                </div>
                            </div>
                            <div className="flex flex-col items-center justify-center p-4 h-[220px] w-[200px] max-md:flex-col shadow-[0px_5px_10px_1px_rgba(0,0,0,0.3)] max-md:gap-0">
                                <p className='font-semibold pb-3' style={{ margin: "3px 0", fontSize: "18px", color: "#000" }}>Twitter</p>
                                <div className="container-goal">
                                    <div className="circular-progress2" style={{ backgroundColor: "#FDFDAF" }}>
                                        <div className="value-container">{`${((data.twitterCount/(data.instaCount + data.facebookCount + data.googleMapsCount + data.twitterCount))*100).toFixed(0) || 0}%`}</div>
                                    </div>
                                    <style >{`
                    .circular-progress2 {
                        background: conic-gradient(
                            #FCFC3A ${((data.twitterCount/(data.instaCount + data.facebookCount + data.googleMapsCount + data.twitterCount))*100).toFixed(0) || 0 * 3.6}deg,
                            #FDFDAF ${((data.twitterCount/(data.instaCount + data.facebookCount + data.googleMapsCount + data.twitterCount))*100).toFixed(0) || 0}deg
                            );
                        }
                        `}</style>
                                </div>
                            </div>
                            <div className="flex flex-col items-center justify-center p-4 h-[220px] w-[200px] max-md:flex-col shadow-[0px_5px_10px_1px_rgba(0,0,0,0.3)] max-md:gap-0">
                                <p className='font-semibold pb-3' style={{ margin: "3px 0", fontSize: "18px", color: "#000" }}>Google Maps</p>
                                <div className="container-goal">
                                    <div className="circular-progress3" style={{ backgroundColor: "#91D7E0" }}>
                                        <div className="value-container">{`${((data.googleMapsCount/(data.instaCount + data.facebookCount + data.googleMapsCount + data.twitterCount))*100).toFixed(0) || 0}%`}</div>
                                    </div>
                                    <style >{`
                    .circular-progress3 {
                        background: conic-gradient(
                            #02A0FC ${((data.googleMapsCount/(data.instaCount + data.facebookCount + data.googleMapsCount + data.twitterCount))*100).toFixed(0) || 0 * 3.6}deg,
                            #91D7E0 ${((data.googleMapsCount/(data.instaCount + data.facebookCount + data.googleMapsCount + data.twitterCount))*100).toFixed(0) || 0}deg
                            );
                        }
                        `}</style>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='mx-auto w-full'>
                        <SpreadGraph />
                    </div>
                </div>
            </div>
        </div>
    )
    
}

export default User
