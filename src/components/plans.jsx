import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from 'axios'
import EditPlan from './EditPlan';



// * Pricing plans :
//  	monthly or yearly: Good
//  	Number of restaurants : 1 restaurant = 49 € , 2 to 4 = 44€ per restaurant (cross out the original price) and 
//      5+ = 39€ per restaurant (cross out the original price)

export default function PricingPlan({ userId }) {

    // const { userId } = useParams();

    const Navigate = useNavigate();
    const isAdmin = useSelector(state => state.authentication.isAdmin);

    const [number, setNumber] = useState(1);
    const [yearNumber, setYearNumber] = useState(1);
    const [priceData, setPriceData] = useState({});

    const [originalPriceData, setOriginalPriceData] = useState({});
    const [originalAmount, setOriginalAmount] = useState();
    const [originalAmountYearly, setOriginalAmountYearly] = useState();
    const [showMonthEditPlan, setShowMonthEditPlan] = useState(false);
    const [showYearEditPlan, setShowYearEditPlan] = useState(false);

    const [discountMonthly, setDiscountMonthly] = useState(0);
    const [discountYearly, setDiscountYearly] = useState(0);



    useEffect(() => {
        fetchPriceData();
    }, []);

    async function fetchPriceData() {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_PORT}/price/`, {
                headers: { 'Content-Type': 'application/json' },
            });
            console.log(res.data[0]);

            setPriceData(res.data[0]);

            setDiscountMonthly(res.data[0].monthlyPlan.discount)
            setDiscountYearly(res.data[0].yearlyPlan.discount)


            setOriginalPriceData(res.data[0]);

            setOriginalAmount(res.data[0].monthlyPlan.price)
            setOriginalAmountYearly(res.data[0].yearlyPlan.price)
        } catch (error) {
            console.error("Error fetching price data");
        }
    }

    function calculateAmount(plan, quantity) {

        if (quantity === 1) {
            return plan.price * quantity;
        } else if (quantity >= 2 && quantity <= 4) {
            return plan.for_2_to_4 * quantity;
        } else if (quantity >= 5) {
            return plan.for_5_Plus * quantity;
        }
    }


    function updateMonthAmount(quantity) {
        setOriginalAmount(originalPriceData.monthlyPlan.price * quantity);
        const newPrice = calculateAmount(originalPriceData.monthlyPlan, quantity);

        setPriceData(prevData => ({
            ...prevData,
            monthlyPlan: {
                ...prevData.monthlyPlan,
                price: newPrice
            }
        }));
    }

    function updateYearAmount(quantity) {
        setOriginalAmountYearly(originalPriceData.yearlyPlan.price * quantity);
        const newPrice = calculateAmount(originalPriceData.yearlyPlan, quantity);

        setPriceData(prevData => ({
            ...prevData,
            yearlyPlan: {
                ...prevData.yearlyPlan,
                price: newPrice
            }
        }));
    }

    const increment = () => {
        setNumber(prevNumber => {
            const newNumber = prevNumber + 1;
            updateMonthAmount(newNumber);
            return newNumber;
        });
    };

    const decrement = () => {
        if (number === 1) return;
        setNumber(prevNumber => {
            const newNumber = prevNumber - 1;
            updateMonthAmount(newNumber);
            return newNumber;
        });
    };

    const incrementYear = () => {
        setYearNumber(prevNumber => {
            const newNumber = prevNumber + 1;
            updateYearAmount(newNumber);
            return newNumber;
        });
    };

    const decrementYear = () => {
        if (yearNumber === 1) return;
        setYearNumber(prevNumber => {
            const newNumber = prevNumber - 1;
            updateYearAmount(newNumber);
            return newNumber;
        });
    };

    const handleEditClick = (Time) => {
        Time === 'Monthly' ? setShowMonthEditPlan(true) : setShowYearEditPlan(true);
    }


    const handleMonthClick = async () => {
        const amount = priceData.monthlyPlan.price * (100 - discountMonthly) / 100;
        const landingPages = number;

        if (userId) {
            console.log(userId);
            try {
                const res = await axios.get(
                    `${process.env.REACT_APP_BACKEND_PORT}/checkout/monthly?userId=${userId}&amount=${amount}&landingPages=${landingPages}`

                );
                window.open(res.data.session.url);
            } catch (error) {
                console.error("Error initiating checkout:", error);
            }
        } else {
            Navigate('/login', {
                state: { paymentType: 'Monthly', amount, landingPages },
            });
        }
    };

    const handleYearClick = async () => {
        const amount = priceData.yearlyPlan.price * (100 - discountYearly) / 100;
        const landingPages = yearNumber;

        if (userId) {
            console.log(userId);
            try {
                const res = await axios.get(
                    `${process.env.REACT_APP_BACKEND_PORT}/checkout/yearly?userId=${userId}&amount=${amount}&landingPages=${landingPages}`

                );
                window.open(res.data.session.url);
            } catch (error) {
                console.error("Error initiating checkout:", error);
            }
        } else {
            Navigate('/login', {
                state: { paymentType: 'Yearly', amount, landingPages },
            });
        }
    };


    return (
        <>
            {!showMonthEditPlan && !showYearEditPlan && Object.keys(priceData).length >= 1 &&
                <div className="max-w-[876px] mt-10 mx-auto">
                    <div className="flex gap-5 max-md:flex-col max-md:gap-0 mx-auto">

                        <div className="flex flex-col w-5/12 max-md:ml-0 max-md:w-full mx-auto" style={{ boxShadow: '0px 4px 13px 0px #00000099', borderRadius: "20px" }}>
                            <div className="flex flex-col grow px-6 pt-12 pb-6 w-full text-3xl font-bold bg-white rounded-3xl shadow-sm text-gray-950 max-md:px-5 max-md:mt-10">
                                <div className="self-center text-center">{priceData.monthlyPlan.planName}</div>

                                <div className="flex flex-col mx-4 mt-9 text-lg text-black max-md:mx-2.5">
                                    <div className="text-2xl text-neutral-400">Ce que vous obtenez :</div>
                                    {priceData.monthlyPlan.features.feature1 &&
                                        <div className="flex gap-2 mt-6">
                                            <img
                                                loading="lazy"
                                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/82b10c657ed950499012f5a3695971d358963b11e5373fb5f9427dd1b936135e?apiKey=cf358c329e0d49a792d02d32277323ef&"
                                                className="shrink-0 w-6 aspect-square"
                                            />
                                            <div>Surveillance et support</div>
                                        </div>
                                    }

                                    {priceData.monthlyPlan.features.feature2 &&
                                        <div className="flex gap-2 mt-6">
                                            <img
                                                loading="lazy"
                                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/f797e714413771ecdc998d3a7a71d9bafb99061f2626ac3cee8a4c7708336bfd?apiKey=cf358c329e0d49a792d02d32277323ef&"
                                                className="shrink-0 w-6 aspect-square"
                                            />
                                            <div>Accès à l'application </div>
                                        </div>
                                    }

                                    {priceData.monthlyPlan.features.feature3 &&
                                        <div className="flex gap-2 mt-6">
                                            <img
                                                loading="lazy"
                                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/f797e714413771ecdc998d3a7a71d9bafb99061f2626ac3cee8a4c7708336bfd?apiKey=cf358c329e0d49a792d02d32277323ef&"
                                                className="shrink-0 w-6 aspect-square"
                                            />
                                            <div>
                                                <span className="">Collecte de données</span>
                                                
                                            </div>
                                        </div>
                                    }
                                    {priceData.monthlyPlan.features.feature4 &&
                                        <div className="flex gap-2 mt-6">
                                            <img
                                                loading="lazy"
                                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/f797e714413771ecdc998d3a7a71d9bafb99061f2626ac3cee8a4c7708336bfd?apiKey=cf358c329e0d49a792d02d32277323ef&"
                                                className="shrink-0 w-6 aspect-square"
                                            />
                                            <div>
                                                <span className="">Tableau de bord</span>{" "}
                                            </div>
                                        </div>
                                    }
                                    <div className="flex gap-2 mt-6">
                                        <img
                                            loading="lazy"
                                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/5b7222b04389a5335095a5d90b72a8c7e06d9a1b0ac97ba52e5a3a0081259055?apiKey=cf358c329e0d49a792d02d32277323ef&"
                                            className="shrink-0 w-6 aspect-square"
                                        />
                                        <div className="flex items-center space-x-2">
                                            <span className='mr-3'>Page destination</span>

                                            <button
                                                onClick={decrement}
                                                className="w-6 h-6 flex items-center justify-center bg-indigo-400 text-white rounded-full text-lg"
                                            >
                                                −
                                            </button>
                                            <input
                                                type="number"
                                                value={number}
                                                readOnly
                                                className="w-10 text-center pl-1.3"
                                            />
                                            <button
                                                onClick={increment}
                                                className="w-6 h-6 flex items-center justify-center bg-indigo-400 text-white rounded-full text-lg"
                                            >
                                                +
                                            </button>

                                        </div>

                                    </div>
                                </div>

                                <div className="shrink-0 mx-4 mt-10 w-80 max-w-full h-px border border-dashed bg-neutral-400 border-neutral-400 max-md:mx-2.5" />
                                <div className="self-center mt-12 leading-10 text-center max-md:mt-10">
                                    {number > 1 && (
                                        <span className='line-through font-light text-2xl text-red-400'>
                                            €{originalAmount}
                                        </span>
                                    )}
                                    <span className=""> €{priceData.monthlyPlan.price * (100 - discountMonthly) / 100}</span>
                                    <span className="text-lg  text-gray-950">/mois</span>

                                </div>

                                {(100 - ((priceData.monthlyPlan.price * (100 - discountMonthly)) / 100 / originalAmount * 100)).toFixed(1) !== '0.0' && (
                                    <span className="text-lg text-center text-green-400">
                                        {(100 - ((priceData.monthlyPlan.price * (100 - discountMonthly)) / 100 / originalAmount * 100)).toFixed(1)}% de réduction
                                    </span>
                                )}

                                {isAdmin ? (
                                    <button onClick={() => { handleEditClick('Monthly') }} className="justify-center cursor-pointer items-center px-16 py-2 mt-10 text-2xl font-semibold leading-10 text-center text-white bg-indigo-400 rounded-xl max-md:px-5 max-md:mt-10">
                                        Modifier
                                    </button>
                                ) : (
                                    // <button onClick={() => Navigate('/login', { state: { paymentType: 'Monthly', amount: priceData.monthlyPlan.price, landingPages: number } })} className="justify-center cursor-pointer items-center px-16 py-2 mt-10 text-2xl font-semibold leading-10 text-center text-white bg-indigo-400 rounded-xl max-md:px-5 max-md:mt-10">
                                    //     S'abonner maintenant
                                    // </button>
                                    <button onClick={handleMonthClick} className="justify-center cursor-pointer items-center px-16 py-2 mt-10 text-2xl font-semibold leading-10 text-center text-white bg-indigo-400 rounded-xl max-md:px-5 max-md:mt-10">
                                        S'abonner
                                    </button>

                                )}


                            </div>
                        </div>

                        <div className="flex flex-col w-5/12 max-md:ml-0 max-md:w-full mx-auto" style={{ boxShadow: '0px 4px 13px 0px #00000099', borderRadius: "20px" }}>
                            <div className="flex flex-col grow px-6 pt-12 pb-6 w-full text-3xl font-bold bg-white rounded-3xl shadow-sm text-gray-950 max-md:px-5 max-md:mt-10">
                                <div className="self-center text-center">{priceData.yearlyPlan.planName}</div>

                                <div className="flex flex-col mx-4 mt-9 text-lg text-black max-md:mx-2.5">
                                    <div className="text-2xl text-neutral-400">Ce que vous obtenez :</div>
                                    {priceData.yearlyPlan.features.feature1 &&
                                        <div className="flex gap-2 mt-6">
                                            <img
                                                loading="lazy"
                                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/82b10c657ed950499012f5a3695971d358963b11e5373fb5f9427dd1b936135e?apiKey=cf358c329e0d49a792d02d32277323ef&"
                                                className="shrink-0 w-6 aspect-square"
                                            />
                                            <div>Surveillance et support</div>
                                        </div>
                                    }

                                    {priceData.yearlyPlan.features.feature2 &&
                                        <div className="flex gap-2 mt-6">
                                            <img
                                                loading="lazy"
                                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/f797e714413771ecdc998d3a7a71d9bafb99061f2626ac3cee8a4c7708336bfd?apiKey=cf358c329e0d49a792d02d32277323ef&"
                                                className="shrink-0 w-6 aspect-square"
                                            />
                                            <div>Accès à l'application </div>
                                        </div>
                                    }

                                    {priceData.yearlyPlan.features.feature3 &&
                                        <div className="flex gap-2 mt-6">
                                            <img
                                                loading="lazy"
                                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/f797e714413771ecdc998d3a7a71d9bafb99061f2626ac3cee8a4c7708336bfd?apiKey=cf358c329e0d49a792d02d32277323ef&"
                                                className="shrink-0 w-6 aspect-square"
                                            />
                                            <div>
                                                <span className="">Collecte de données</span>
                                                
                                            </div>
                                        </div>
                                    }
                                    {priceData.yearlyPlan.features.feature4 &&
                                        <div className="flex gap-2 mt-6">
                                            <img
                                                loading="lazy"
                                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/f797e714413771ecdc998d3a7a71d9bafb99061f2626ac3cee8a4c7708336bfd?apiKey=cf358c329e0d49a792d02d32277323ef&"
                                                className="shrink-0 w-6 aspect-square"
                                            />
                                            <div>
                                                <span className="">Tableau de bord</span>{" "}
                                            </div>
                                        </div>
                                    }
                                    <div className="flex gap-2 mt-6">
                                        <img
                                            loading="lazy"
                                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/5b7222b04389a5335095a5d90b72a8c7e06d9a1b0ac97ba52e5a3a0081259055?apiKey=cf358c329e0d49a792d02d32277323ef&"
                                            className="shrink-0 w-6 aspect-square"
                                        />
                                        <div className="flex items-center space-x-2">
                                            <span className='mr-3'>Page destination</span>

                                            <button
                                                onClick={decrementYear}
                                                className="w-6 h-6 flex items-center justify-center bg-indigo-400 text-white rounded-full text-lg"
                                            >
                                                −
                                            </button>
                                            <input
                                                type="number"
                                                value={yearNumber}
                                                readOnly
                                                className="w-10 text-center pl-1.3"
                                            />
                                            <button
                                                onClick={incrementYear}
                                                className="w-6 h-6 flex items-center justify-center bg-indigo-400 text-white rounded-full text-lg"
                                            >
                                                +
                                            </button>

                                        </div>

                                    </div>
                                </div>

                                <div className="shrink-0 mx-4 mt-10 w-80 max-w-full h-px border border-dashed bg-neutral-400 border-neutral-400 max-md:mx-2.5" />
                                <div className="self-center mt-12 leading-10 text-center max-md:mt-10">
                                    {yearNumber > 1 && (
                                        <span className='line-through font-light text-2xl text-red-400'>
                                            €{originalAmountYearly}
                                        </span>
                                    )}
                                    <span className=""> €{priceData.yearlyPlan.price * (100 - discountYearly) / 100}</span>
                                    <span className="text-lg  text-gray-950">/an</span>
                                </div>

                                {
                                    (100 - ((priceData.yearlyPlan.price * (100 - discountYearly)) / 100 / originalAmountYearly * 100)).toFixed(1) !== '0.0' && (
                                        <span className="text-lg text-center text-green-400">
                                            {(100 - ((priceData.yearlyPlan.price * (100 - discountYearly)) / 100 / originalAmountYearly * 100)).toFixed(1)}% de réduction
                                        </span>)
                                }

                                {isAdmin ? (
                                    <button onClick={() => { handleEditClick('Yearly') }} className="justify-center cursor-pointer items-center px-16 py-2 mt-10 text-2xl font-semibold leading-10 text-center text-white bg-indigo-400 rounded-xl max-md:px-5 max-md:mt-10">
                                        Modifier
                                    </button>
                                ) : (
                                    // <button onClick={() => Navigate('/login', { state: { paymentType: 'Yearly', amount: priceData.yearlyPlan.price, landingPages: yearNumber } })} className="justify-center cursor-pointer items-center px-16 py-2 mt-10 text-2xl font-semibold leading-10 text-center text-white bg-indigo-400 rounded-xl max-md:px-5 max-md:mt-10">
                                    //     S'abonner maintenant
                                    // </button>
                                    <button onClick={handleYearClick} className="justify-center cursor-pointer items-center px-16 py-2 mt-10 text-2xl font-semibold leading-10 text-center text-white bg-indigo-400 rounded-xl max-md:px-5 max-md:mt-10">
                                        S'abonner
                                    </button>

                                )}
                            </div>
                        </div>

                    </div>
                </div>
            }

            {showMonthEditPlan && priceData &&
                <EditPlan
                    setShowMonthEditPlan={setShowMonthEditPlan}
                    setShowYearEditPlan={setShowYearEditPlan}
                    setPriceData={setPriceData}
                    fetchPriceData={fetchPriceData}
                    update='monthly'
                    priceData={originalPriceData.monthlyPlan}
                />
            }

            {showYearEditPlan && priceData &&
                <EditPlan
                    setShowYearEditPlan={setShowYearEditPlan}
                    setShowMonthEditPlan={setShowMonthEditPlan}
                    setPriceData={setPriceData}
                    update='yearly'
                    priceData={originalPriceData.yearlyPlan}
                />
            }

        </>
    );
}

