import React from 'react'
import Hero from '../../components/Hero'
import AboutMission from '../../components/AboutMission'
import { useNavigate } from 'react-router-dom';
import serv1 from '../../assets/about/serv1.png'
import serv2 from '../../assets/about/serv2.png'

const Index = () => {
    const Navigate = useNavigate();
    return (
        <div>
            <Hero Image={serv1} heading="À propos de nous" para1="
Restaurant révolutionnaire" para2="
Gestion avec EGO" />
            <AboutMission serv2={serv2} />
            <div className="text-5xl font-bold text-center bg-clip-text text-[#8497FC] max-md:text-3xl max-w-[1100px] mx-auto mb-3 mt-6 leading-20">
                Libérez le potentiel de votre restaurant : planifiez votre démo EGO maintenant !
            </div>
            <div className='flex justify-center items-center'>
                <button onClick={() => { Navigate('/demo') }} className="justify-center px-8 py-4 text-base font-medium leading-5 text-center text-white bg-indigo-400 rounded w-auto text-md mt-10">
                    Réserver une démo
                </button>
            </div>

        </div>
    )
}

export default Index