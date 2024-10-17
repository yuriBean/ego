import * as React from "react";

export default function Mission() {
    return (
        <div className="flex flex-col justify-center mt-10">
            <div className="p-5 mt-16 w-full rounded-3xl bg-[linear-gradient(90deg,#F6F7FC_0%,#4F5A96_100%)] max-w-[1200px] max-md:mt-10 max-md:max-w-full m-auto">
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
            </div>
        </div>
    );
}
