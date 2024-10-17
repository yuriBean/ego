import * as React from "react";

export default function AboutMission({serv2}) {
    return (
        <div className="flex flex-col justify-center mt-10">
            <div className="mt-10 font-serif text-3xl text-center font-bold text-black leading-2 max-md:mt-10">
                Notre Mission
            </div>
            <div className="px-5 mt-10 w-full max-w-[1000px] max-md:mt-10 max-md:max-w-full mx-auto">
                <p className="leading-8 text-center">
                    Notre mission chez EGO est de donner aux propriétaires et administrateurs de restaurants des solutions innovantes qui rationalisent les opérations, améliorent la présence en ligne et favorisent le succès. Nous nous engageons à fournir des outils conviviaux et un soutien exceptionnel, garantissant que nos clients prospèrent dans le paysage concurrentiel actuel. Avec un accent sur l'efficacité, l'excellence et la satisfaction des clients, nous nous efforçons d'être le partenaire de choix pour les restaurants cherchant à élever leur présence numérique et à dépasser leurs objectifs.
                </p>
            </div>
            {/* <div className="p-5 mt-16 w-full rounded-3xl bg-[linear-gradient(90deg,#8497FC_100%,#4F5A96_100%)] max-w-[1200px] max-md:mt-10 max-md:max-w-full m-auto">
                <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                    <div className="flex flex-col w-3/12 max-md:ml-0 max-md:w-full">
                        <div className="flex flex-col grow text-center text-white whitespace-nowrap max-md:mt-10">
                            <div className="text-3xl font-semibold">2024</div>
                            <div className="mt-2.5 text-2xl">Fondé</div>
                        </div>
                    </div>
                    <div className="flex flex-col ml-5 w-3/12 max-md:ml-0 max-md:w-full">
                        <div className="flex flex-col grow text-center text-white whitespace-nowrap max-md:mt-10">
                            <div className="text-3xl font-semibold">2.5K</div>
                            <div className="mt-2.5 text-2xl">Utilisateurs</div>
                        </div>
                    </div>
                    <div className="flex flex-col ml-5 w-3/12 max-md:ml-0 max-md:w-full">
                        <div className="flex flex-col grow text-center text-white max-md:mt-10">
                            <div className="text-3xl font-semibold">96%</div>
                            <div className="mt-2.5 text-2xl">Avis Positifs</div>
                        </div>
                    </div>
                    <div className="flex flex-col ml-5 w-3/12 max-md:ml-0 max-md:w-full">
                        <div className="flex flex-col grow text-center text-white whitespace-nowrap max-md:mt-10">
                            <div className="text-3xl font-semibold">4+</div>
                            <div className="mt-2.5 text-2xl">Pays</div>
                        </div>
                    </div>
                </div>
            </div> */}
            <div className="mt-14 w-full max-w-[1150px] max-md:mt-10 max-md:max-w-full m-auto">
                <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                    <div className="flex flex-col w-[57%] max-md:ml-0 max-md:w-full">
                        <div className="flex flex-col self-stretch px-5 my-auto max-md:mt-10 max-md:max-w-full">
                            <div className="text-4xl leading-10 font-bold text-black max-md:max-w-full max-md:text-4xl">
                                De <span className="text-indigo-400">Inconnu</span><br/> à{" "}
                                <span className="text-indigo-400">Inoubliable</span>
                            </div>
                            <div className="mt-9 text-xl text-black max-md:max-w-full">
                                Notre objectif est de fournir une plateforme qui équipe les individus avec les outils, les ressources et les conseils dont ils ont besoin pour surmonter les défis, élargir leurs horizons et devenir inoubliables dans leurs pursuits. Grâce à une gamme complète de contenu éducatif, d'expériences d'apprentissage interactives et d'une communauté de soutien, nous permettons aux individus de découvrir leurs passions, d'améliorer leurs compétences et de libérer leur véritable potentiel.
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col ml-5 w-[43%] max-md:ml-0 max-md:w-full">
                        <img
                            loading="lazy"
                            src={serv2}
                            //srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/80d6cf52ded428edd549b73c8f244d115a7dfc64cf6806a393b66b7adf98d435?apiKey=cf358c329e0d49a792d02d32277323ef&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/80d6cf52ded428edd549b73c8f244d115a7dfc64cf6806a393b66b7adf98d435?apiKey=cf358c329e0d49a792d02d32277323ef&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/80d6cf52ded428edd549b73c8f244d115a7dfc64cf6806a393b66b7adf98d435?apiKey=cf358c329e0d49a792d02d32277323ef&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/80d6cf52ded428edd549b73c8f244d115a7dfc64cf6806a393b66b7adf98d435?apiKey=cf358c329e0d49a792d02d32277323ef&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/80d6cf52ded428edd549b73c8f244d115a7dfc64cf6806a393b66b7adf98d435?apiKey=cf358c329e0d49a792d02d32277323ef&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/80d6cf52ded428edd549b73c8f244d115a7dfc64cf6806a393b66b7adf98d435?apiKey=cf358c329e0d49a792d02d32277323ef&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/80d6cf52ded428edd549b73c8f244d115a7dfc64cf6806a393b66b7adf98d435?apiKey=cf358c329e0d49a792d02d32277323ef&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/80d6cf52ded428edd549b73c8f244d115a7dfc64cf6806a393b66b7adf98d435?apiKey=cf358c329e0d49a792d02d32277323ef&"
                            className="w-full aspect-square max-md:mt-10 max-md:max-w-full"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
