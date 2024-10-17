import { useEffect, useState } from "react";
import AsideHeader from "./AsideHeader";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";
import MessageModal from "./MessageModal";

function PaymentHistory() {
    const userId = useSelector((state) => state.authentication.userId);
    const [data, setData] = useState([]);
    const [isExpired, setIsExpired] = useState(true);
    const [expiryDateUser, setExpiryDate] = useState(null);
    const [IsTrialVerified, setisTrialVerified] = useState(true);

    const [openMessage, setOpenMessage] = useState(false);
    const [messageModal, setMessageModal] = useState("Trial not verified, Please wait for admin approval.");

    const [link, setLink] = useState("/history");
    const [buttonText, setbuttonText] = useState("Okay");

    const Navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_BACKEND_PORT}/payment/history/${userId}`, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                setisTrialVerified(res.data.registrationData.isTrialVerified)
                console.log(res.data);

                const currentDate = new Date(); // Get the current date

                setExpiryDate(format(res.data.registrationData.expiryDate, "yyyy-MM-dd"))

                const updatedData = res.data.data?.map((item) => {
                    const expiryDate = new Date(item.expiryDate);
                    const isExpiredHistory = expiryDate < currentDate;

                    const expiryDateUser = new Date(item.expiryDateUser);
                    const isExpired = expiryDateUser < currentDate;
                    
                    setIsExpired(isExpired);

                    const landingPagesDisplay =
                        item.landingPagesCount > item.landingPages
                            ? `${item.landingPages}/${item.landingPages}`
                            : `${item.landingPagesCount}/${item.landingPages}`;

                    return {
                        plan: item.plan,
                        amount: `€${item.amount}`,
                        landingPages: landingPagesDisplay,
                        date: format(expiryDate, "yyyy-MM-dd"),
                        method: item.paymentMethod,
                        status: isExpiredHistory ? "Expired" : "Active",
                        isExpired,
                    };
                });

                setData(updatedData);
            } catch (error) {
                console.error("Error fetching payment history:", error);
            }
        };

        fetchData();
    }, [userId]);

    const columns = [
        "Plan d'Abonnement",
        "Montant",
        "Pages de Destination",
        "Date d'Expiration",
        "Méthode de Paiement",
        "Statut",
    ];
    

    const handleRenew = () => {
        // Handle renew logic here, using planId or other identifiers if necessary
        console.log(`Renew button clicked for plan:`);
        if(IsTrialVerified)
            Navigate(`/pricing`);
        else
            setOpenMessage(true)
    };

    return (
        <div className="flex mb-20">
            <AsideHeader />
            <div className="w-full mt-6 mx-5">
                <div className="flex items-end justify-between">
                    <div className="justify-center self-start p-2.5 mt-6 text-lg font-medium tracking-wide leading-6 text-blue-950">
                        Historique des Paiements
                    </div>
                </div>
                <div className="w-[900px] m-auto">
                    {isExpired && (
                        <div className="flex justify-end">
                            <button
                                className="justify-center self-stretch p-2.5 font-semibold text-center text-white whitespace-nowrap bg-indigo-400 mt-7 rounded-xl border-2 border-indigo-400 border-solid hover:opacity-65 transition-all "
                                onClick={() => handleRenew()} // Passez un identifiant unique si nécessaire
                            >
                                Abonner Plan
                            </button>
                        </div>
                    )}
    
                    <div className="min-w-0 flex gap-5 mt-10 justify-between items-center p-5 bg-white shadow-[0px_5px_10px_1px_rgba(0,0,0,0.3)] overflow-auto">
                        {columns.map((column, idx) => (
                            <div
                                key={idx}
                                className="font-bold flex-shrink-0 whitespace-nowrap overflow-hidden text-ellipsis"
                            >
                                {column}
                            </div>
                        ))}
                    </div>
    
                    {data.length === 0 ? (
                        <div className="flex justify-between items-center p-5 mt-5 bg-white max-md:flex-wrap shadow-[0px_5px_10px_1px_rgba(0,0,0,0.3)]">
                            
                            <div className="w-[80px] md:w-[50px] flex-shrink-0 whitespace-nowrap text-ellipsis mr-14">
                                Essai
                            </div>
    
                            <div className="w-[80px] md:w-[40px] flex-shrink-0 whitespace-nowrap text-ellipsis">
                                -
                            </div>
                            <div className="w-[80px] md:w-[70px] flex-shrink-0 whitespace-nowrap text-ellipsis">
                                1
                            </div>
                            <div className="w-[80px] md:w-[40px] flex-shrink-0 whitespace-nowrap text-ellipsis mr-16">
                                {expiryDateUser}
                            </div>
                            <div className="w-[80px] md:w-[70px] flex-shrink-0 whitespace-nowrap text-ellipsis">
                                -
                            </div>
                            <div className="w-[80px] md:w-[70px] flex-shrink-0 whitespace-nowrap text-ellipsis mr-4">
                                {IsTrialVerified ? "Vérifié" : "Non Vérifié"}
                            </div>
                            
                        </div>
                    ) : (
                        data.map((row, index) => (
                            <div
                                key={index}
                                className="flex gap-5 justify-between items-center p-5 mt-5 bg-white max-md:flex-wrap shadow-[0px_5px_10px_1px_rgba(0,0,0,0.3)]"
                            >
                                {Object.values(row)
                                    .slice(0, -1)
                                    .map((value, idx) => (
                                        <div
                                            className={`w-[80px] md:w-[70px] ${
                                                idx === 0 && "md:w-[50px] mr-14"
                                            } ${idx === 1 && "md:w-[40px]"} ${
                                                idx === 3 && "md:w-[40px] mr-16"
                                            } flex-shrink-0 whitespace-nowrap text-ellipsis`}
                                            key={idx}
                                        >
                                            {value}
                                        </div>
                                    ))}
                            </div>
                        ))
                    )}
                </div>
            </div>
            {openMessage && <MessageModal open={openMessage} setOpen={setOpenMessage} message={messageModal} ButtonText={buttonText} link={link} />}
        </div>
    );
    
}

export default PaymentHistory;
