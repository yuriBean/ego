import * as React from "react";
import { Link } from "react-router-dom";
import { Menu, X } from 'lucide-react';
import ego from '../assets/ego_withoutBG.png'

export default function Header({ open, setOpen }) {

    React.useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 700) {
                setOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);

        handleResize();
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className={`flex gap-5 max-md:flex-wrap px-10 mt-2 w-full ${open ? 'bg-white min-h-[100vh] justify-start items-start' : 'justify-between'}`}>
            <div className="flex gap-5 justify-between md:px-5 my-auto whitespace-nowrap max-md:flex-wrap w-full">
                <div className="flex gap-5 justify-between w-full items-center">
                    <img src={ego}
                        alt=""
                        width={'30%'}
                    />
                    {
                        open ? <X className="block md:hidden" onClick={() => setOpen(!open)} /> : <Menu className="block md:hidden" onClick={() => setOpen(!open)} />
                    }
                </div>
                <div className={`${open ? 'flex flex-col mt-10 pt-6' : 'hidden'} gap-10 justify-between items-center text-xl font-normal leading-8 text-zinc-800 max-md:flex-wrap max-md:max-w-full md:flex`}>
                    <div className="md:ml-4">
                        <Link to='/'>Accueil</Link>
                    </div>
                    <div>
                        <Link to='/pricing'>Tarifs</Link>
                    </div>
                    <div>
                        <Link to='/about'>À propos</Link>
                    </div>
                    {/* <Link to='/faqs'>FAQ</Link> */}
                </div>
            </div>
            <div className={`${open ? 'flex flex-col mt-10' : 'hidden'} md:flex gap-5 justify-between items-center md:px-5 text-xl font-medium leading-8`}>
                <a href="/login" className="my-auto text-zinc-800">Connexion</a>
                <a href="/register" className="my-auto text-zinc-800">Inscription</a>
                <a href="/demo" className="justify-center px-6 py-1 text-center text-white bg-indigo-400 rounded-2xl max-md:px-5 h-auto w-[248px]">
                    Réserver une démo
                </a>
            </div>
        </div>
    );

}
