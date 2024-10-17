import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MessageModal from "../../components/MessageModal";

export default function BookADemo() {
    const [email, setEmail] = useState("");
    const [restaurantName, setRestaurantName] = useState("");
    const [owner, setOwner] = useState("");
    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");
    const [requestDemo, setRequestDemo] = useState(false);

    const [openMessage, setOpenMessage] = useState(false);
    const [messageModal, setMessageModal] = useState("");

    const [link, setLink] = useState("");
    const [buttonText, setbuttonText] = useState("");

    const Navigate = useNavigate();

   const handleFormSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            email: email,
            restaurantName: restaurantName,
            owner: owner,
            subject: subject,
            body: body
        };
        try {
            await axios.post(`${process.env.REACT_APP_BACKEND_PORT}/auth/demo`, formData, {
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then((response)=>{
                console.log("Response from server:", response.data);
                setMessageModal(`Demande envoyée avec succès pour une démo.`)
                setbuttonText(`D'accord`)
                setLink('/')
                setOpenMessage(true)
            })
        } catch (error) {
            console.error("Error while sending:", error);
        }
        console.log("Form submitted:", { email, restaurantName, owner, subject, body }); 

    };

    return (
        <div className="w-full flex justify-center mt-10">
            <div className="flex flex-col font-semibold bg-rose-700 rounded-3xl shadow-xl max-w-[400px] w-full">
                <div className="px-6 pt-6 text-lg leading-7 text-center text-black bg-white">
                    Réservez une démo
                </div>
                <div className="w-full bg-white min-h-[20px]" />
                <form className="flex flex-col px-6 w-full text-sm font-medium leading-5 text-black bg-white" onSubmit={handleFormSubmit}>
                    <div>Email*</div>
                    <input
                        className="justify-center px-3.5 py-2.5 mt-3 text-base leading-6 text-gray-500 bg-white rounded-lg border border-gray-300 border-solid shadow-sm outline-none"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Entrez votre email"
                        required
                    />
    
                    <div className="mt-4">Nom du restaurant*</div>
                    <input
                        className="justify-center px-3.5 py-2.5 mt-3 text-base leading-6 text-gray-500 bg-white rounded-lg border border-gray-300 border-solid shadow-sm outline-none"
                        type="text"
                        value={restaurantName}
                        onChange={(e) => setRestaurantName(e.target.value)}
                        placeholder="Entrez le nom du restaurant"
                        required
                    />
    
                    <div className="mt-4">Propriétaire*</div>
                    <input
                        className="justify-center px-3.5 py-2.5 mt-3 text-base leading-6 text-gray-500 bg-white rounded-lg border border-gray-300 border-solid shadow-sm outline-none"
                        type="text"
                        value={owner}
                        onChange={(e) => setOwner(e.target.value)}
                        placeholder="Entrez le nom du propriétaire"
                        required
                    />
    
                    <div className="mt-5">Sujet*</div>
                    <input
                        className="justify-center px-3.5 py-2.5 mt-3 text-base leading-6 text-gray-500 bg-white rounded-lg border border-gray-300 border-solid shadow-sm outline-none"
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="Sujet"
                        required
                    />
    
                    <div className="mt-5">Message*</div>
                    <textarea
                        className="justify-center px-3.5 py-2.5 mt-3 text-base leading-6 text-gray-500 bg-white rounded-lg border border-gray-300 border-solid shadow-sm outline-none resize-none"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        placeholder="Message"
                        rows={5} // Number of visible rows
                        required
                    />
    
                    <div className="flex gap-4 mt-7">
                        <input
                            type="checkbox"
                            className="my-auto mr-1"
                            checked={requestDemo}
                            required
                            onChange={(e) => setRequestDemo(e.target.checked)}
                        />
                        <div>Demander une démo</div>
                    </div>
    
                    <div className="flex flex-col pt-8 w-full text-base leading-6 whitespace-nowrap bg-white">
                        <div className="flex flex-col px-6 pb-6 w-full">
                            <button
                                type="submit"
                                className="justify-center items-center px-5 py-2.5 text-white bg-indigo-400 rounded-lg shadow-sm cursor-pointer"
                            >
                                Confirmer
                            </button>
    
                            <button
                                 className="justify-center items-center px-5 py-2.5 mt-3 text-black bg-white rounded-lg border border-gray-300 border-solid shadow-sm cursor-pointer"
                                 onClick={() => { Navigate(`/`); }}
                            >
                                Annuler
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            {openMessage && <MessageModal open={openMessage} setOpen={setOpenMessage} message={messageModal} ButtonText={buttonText} link={link} />}
        </div>
    );
    
}
