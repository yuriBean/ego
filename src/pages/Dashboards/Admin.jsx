import React, { useEffect, useState } from 'react';
import './index.css'
import AsideHeader from '../../components/AsideHeader';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { format, subDays } from 'date-fns';
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const generateData = () => {
    const labels = [];
    for (let i = 0; i < 10; i++) {
        const date = subDays(new Date(), 10 * i);
        labels.unshift(format(date, 'dd-MM-yyyy'));
    }
    return { labels };
};

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Subscriptions',
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
                text: 'Subscription Rate',
            },
            beginAtZero: true,
        },
    },
};

const SpreadGraph = ({ data }) => (
    <div className='w-auto md:w-[1000px]' style={{ height: '400px' }}>
        <Line data={data} options={options} />
    </div>
);

const AdminDashboard = () => {
    const [data, setData] = useState({ users: 0, revenue: 0 });
    const [dateRecord, setDateRecord] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_BACKEND_PORT}/auth/dashboard`, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                setData(res.data);
            } catch (error) {
                console.error("Error fetching dashboard data", error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchPaymentHistory = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_BACKEND_PORT}/payment/history`, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                setLoading(false);
                const records = res.data.data.map(data => data.subscriptionCount);
                console.log(records)
                setDateRecord(records);
            } catch (error) {
                console.error("Error fetching payment history", error);
            }
        };
        fetchPaymentHistory();
    }, []);

    const { labels } = generateData();

    return (
        <div className='flex flex-row'>
            <AsideHeader />
            <div className="flex flex-col mb-20">
                <div>
                    <div className="flex flex-col gap-5 px-7 py-6 bg-white shadow-sm max-w-[356px]">
                        <div className="justify-center text-center self-start p-2.5 mt-6 text-lg font-medium tracking-wide leading-6 text-blue-950">
                            Tableau de bord
                        </div>
                        <div className='flex flex-wrap md:flex-nowrap gap-5'>
                            <div className='flex justify-center shadow-[0px_5px_10px_1px_rgba(0,0,0,0.3)] p-3 rounded-md w-[500px]'>
                                <div className="w-[130px] flex flex-col justify-center items-center flex-1">
                                    <div className="justify-center text-xl font-medium leading-6 text-black">
                                        Utilisateurs Actifs
                                    </div>
                                    <div className="flex flex-col mt-7 whitespace-nowrap">
                                        <div className="justify-center text-3xl font-bold tracking-tighter leading-8 text-zinc-900">
                                            {data.users}
                                        </div>
                                    </div>
                                </div>
                                <div className="w-[130px] flex flex-1 gap-2.5 self-end mt-6 ml-5">
                                    <div className="shrink-0 bg-indigo-400 rounded-lg h-[91px] w-[11px]" />
                                    <div className="shrink-0 self-end mt-7 w-3 h-16 bg-blue-300 rounded-lg" />
                                    <div className="shrink-0 self-start mt-4 bg-blue-300 rounded-lg h-[74px] w-[11px]" />
                                    <div className="shrink-0 self-end mt-16 h-7 bg-indigo-400 rounded-lg w-[11px]" />
                                    <div className="shrink-0 self-end mt-11 w-3 bg-indigo-400 rounded-lg h-[49px]" />
                                    <div className="shrink-0 self-start mt-1.5 bg-blue-300 rounded-lg h-[85px] w-[11px]" />
                                </div>
                            </div>
                            <div className='flex justify-center shadow-[0px_5px_10px_1px_rgba(0,0,0,0.3)] p-3 rounded-md'>
                                <div className="w-[130px] flex flex-col justify-center items-center flex-1">
                                    <div className="justify-center text-xl font-medium leading-6 text-black">
                                        Revenus
                                    </div>
                                    <div className="flex flex-col mt-7 whitespace-nowrap">
                                        <div className="justify-center text-3xl font-bold tracking-tighter leading-8 text-zinc-900">
                                            {data.revenue} $
                                        </div>
                                    </div>
                                </div>
                                <div className="w-[130px] flex flex-1 gap-2.5 self-end mt-6 ml-5">
                                    <div className="shrink-0 bg-indigo-400 rounded-lg h-[91px] w-[11px]" />
                                    <div className="shrink-0 self-end mt-7 w-3 h-16 bg-blue-300 rounded-lg" />
                                    <div className="shrink-0 self-start mt-4 bg-blue-300 rounded-lg h-[74px] w-[11px]" />
                                    <div className="shrink-0 self-end mt-16 h-7 bg-indigo-400 rounded-lg w-[11px]" />
                                    <div className="shrink-0 self-end mt-11 w-3 bg-indigo-400 rounded-lg h-[49px]" />
                                    <div className="shrink-0 self-start mt-1.5 bg-blue-300 rounded-lg h-[85px] w-[11px]" />
                                </div>
                            </div>
                            <div className='flex justify-center shadow-[0px_5px_10px_1px_rgba(0,0,0,0.3)] p-3 rounded-md'>
                                <div className="w-[130px] flex flex-col justify-center items-center flex-1">
                                    <div className="justify-center text-xl font-medium leading-6 text-black">
                                    Nombre total de clients
                                    </div>
                                    <div className="flex flex-col mt-7 whitespace-nowrap">
                                        <div className="justify-center text-3xl font-bold tracking-tighter leading-8 text-zinc-900">
                                            {data.users}
                                        </div>
                                    </div>
                                </div>
                                <div className="w-[130px] flex flex-1 gap-2.5 self-end mt-6 ml-5">
                                    <div className="shrink-0 bg-indigo-400 rounded-lg h-[91px] w-[11px]" />
                                    <div className="shrink-0 self-end mt-7 w-3 h-16 bg-blue-300 rounded-lg" />
                                    <div className="shrink-0 self-start mt-4 bg-blue-300 rounded-lg h-[74px] w-[11px]" />
                                    <div className="shrink-0 self-end mt-16 h-7 bg-indigo-400 rounded-lg w-[11px]" />
                                    <div className="shrink-0 self-end mt-11 w-3 bg-indigo-400 rounded-lg h-[49px]" />
                                    <div className="shrink-0 self-start mt-1.5 bg-blue-300 rounded-lg h-[85px] w-[11px]" />
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        !loading &&
                        <SpreadGraph data={{
                            labels,
                            datasets: [
                                {
                                    label: 'Valeur',
                                    data: dateRecord,
                                    fill: false,
                                    backgroundColor: 'rgba(75,192,192,0.2)',
                                    borderColor: 'rgba(75,192,192,1)',
                                    borderWidth: 2,
                                    pointRadius: 5,
                                    pointHoverRadius: 8,
                                },
                            ],
                        }} />
                    }
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
