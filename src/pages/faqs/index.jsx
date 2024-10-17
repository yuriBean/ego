import React, { useState } from 'react'
import Hero from '../../components/Hero'

const Index = () => {
    const [open, setOpen] = useState(0);
    const data = [
        {
            question: 'Qu\'est-ce que EGO et comment ça fonctionne ?',
            answers: 'Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat aute irure dolor'
        },
        {
            question: 'Qui peut bénéficier de l\'utilisation d\'EGO ?',
            answers: 'Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat aute irure dolor'
        },
        {
            question: 'Quelles sont les options d\'abonnement disponibles ?',
            answers: 'Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat aute irure dolor'
        },
        {
            question: 'Quel type de support est disponible pour les utilisateurs ?',
            answers: 'Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat aute irure dolor'
        },
        {
            question: 'Puis-je personnaliser la présence en ligne de mon restaurant avec EGO ?',
            answers: 'Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat aute irure dolor'
        },
        {
            question: 'Quelles sont les options de paiement disponibles ?',
            answers: 'Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat aute irure dolor'
        }
    ]

    return (
        <div>
            <Hero 
                Image="https://cdn.builder.io/api/v1/image/assets/TEMP/1a5661b5941c5d5b93c08c93373d187d718bd3e7e37062a3a727b8a30e1bb108?apiKey=cf358c329e0d49a792d02d32277323ef&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/1a5661b5941c5d5b93c08c93373d187d718bd3e7e37062a3a727b8a30e1bb108?apiKey=cf358c329e0d49a792d02d32277323ef&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/1a5661b5941c5d5b93c08c93373d187d718bd3e7e37062a3a727b8a30e1bb108?apiKey=cf358c329e0d49a792d02d32277323ef&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/1a5661b5941c5d5b93c08c93373d187d718bd3e7e37062a3a727b8a30e1bb108?apiKey=cf358c329e0d49a792d02d32277323ef&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/1a5661b5941c5d5b93c08c93373d187d718bd3e7e37062a3a727b8a30e1bb108?apiKey=cf358c329e0d49a792d02d32277323ef&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/1a5661b5941c5d5b93c08c93373d187d718bd3e7e37062a3a727b8a30e1bb108?apiKey=cf358c329e0d49a792d02d32277323ef&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/1a5661b5941c5d5b93c08c93373d187d718bd3e7e37062a3a727b8a30e1bb108?apiKey=cf358c329e0d49a792d02d32277323ef&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/1a5661b5941c5d5b93c08c93373d187d718bd3e7e37062a3a727b8a30e1bb108?apiKey=cf358c329e0d49a792d02d32277323ef&"
                heading="Questions Fréquemment Posées"
                para1="Vos Réponses Vous Attendent : Découvrez Nos"
                para2="FAQ pour Clarté et Confiance"
            />

            <div>
                <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                    <div className="grid grid-cols-2 max-md:ml-0 max-w-[1100px] mx-auto mt-10">
                        {
                            data.map((item, index) => (
                                <div key={index} className="flex flex-col px-8 pt-7 pb-10 bg-white rounded-2xl max-md:px-5 max-md:max-w-full shadow-[0px_5px_10px_1px_rgba(0,0,0,0.3)] m-3">
                                    <div className="flex gap-5 text-2xl font-medium leading-7 text-indigo-950 max-md:flex-wrap max-md:max-w-full ">
                                        <div className="flex-auto my-auto">
                                            {item.question}
                                        </div>
                                        {
                                            index === open ? <img
                                                loading="lazy"
                                                srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/f8bf5c901f60bdd85a14efc2507e7ae9f100db1b45b8624ebbb209fd28082a13?apiKey=cf358c329e0d49a792d02d32277323ef&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/f8bf5c901f60bdd85a14efc2507e7ae9f100db1b45b8624ebbb209fd28082a13?apiKey=cf358c329e0d49a792d02d32277323ef&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/f8bf5c901f60bdd85a14efc2507e7ae9f100db1b45b8624ebbb209fd28082a13?apiKey=cf358c329e0d49a792d02d32277323ef&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/f8bf5c901f60bdd85a14efc2507e7ae9f100db1b45b8624ebbb209fd28082a13?apiKey=cf358c329e0d49a792d02d32277323ef&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/f8bf5c901f60bdd85a14efc2507e7ae9f100db1b45b8624ebbb209fd28082a13?apiKey=cf358c329e0d49a792d02d32277323ef&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/f8bf5c901f60bdd85a14efc2507e7ae9f100db1b45b8624ebbb209fd28082a13?apiKey=cf358c329e0d49a792d02d32277323ef&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/f8bf5c901f60bdd85a14efc2507e7ae9f100db1b45b8624ebbb209fd28082a13?apiKey=cf358c329e0d49a792d02d32277323ef&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/f8bf5c901f60bdd85a14efc2507e7ae9f100db1b45b8624ebbb209fd28082a13?apiKey=cf358c329e0d49a792d02d32277323ef&"
                                                className="shrink-0 rounded-lg aspect-[0.91] w-[42px] cursor-pointer"
                                                onClick={() => { setOpen(index) }}
                                            /> : <img
                                                loading="lazy"
                                                srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/a9c68f78790a475aa43ae8df4da8cbf82a52109d95070ad77097588d81cddf8e?apiKey=cf358c329e0d49a792d02d32277323ef&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9c68f78790a475aa43ae8df4da8cbf82a52109d95070ad77097588d81cddf8e?apiKey=cf358c329e0d49a792d02d32277323ef&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9c68f78790a475aa43ae8df4da8cbf82a52109d95070ad77097588d81cddf8e?apiKey=cf358c329e0d49a792d02d32277323ef&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9c68f78790a475aa43ae8df4da8cbf82a52109d95070ad77097588d81cddf8e?apiKey=cf358c329e0d49a792d02d32277323ef&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9c68f78790a475aa43ae8df4da8cbf82a52109d95070ad77097588d81cddf8e?apiKey=cf358c329e0d49a792d02d32277323ef&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9c68f78790a475aa43ae8df4da8cbf82a52109d95070ad77097588d81cddf8e?apiKey=cf358c329e0d49a792d02d32277323ef&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9c68f78790a475aa43ae8df4da8cbf82a52109d95070ad77097588d81cddf8e?apiKey=cf358c329e0d49a792d02d32277323ef&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9c68f78790a475aa43ae8df4da8cbf82a52109d95070ad77097588d81cddf8e?apiKey=cf358c329e0d49a792d02d32277323ef&width=2000 2000w"
                                                className="shrink-0 rounded-lg aspect-[0.91] w-[42px] cursor-pointer"
                                                onClick={() => { setOpen(index) }}
                                            />
                                        }
                                    </div>
                                    {
                                        index === open && <div className="mt-3.5 text-lg leading-8 text-slate-500 max-md:max-w-full">
                                            {item.answers}
                                        </div>
                                    }
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index
