import * as React from "react";
import home4 from "../assets/home/home4.png"
import home5 from "../assets/home/home5.png"
import home6 from "../assets/home/home6.png"

export default function Services() {
    return (
        <div className="flex flex-col justify-center mt-10">
            <div className="mt-10 font-serif text-3xl text-center font-bold text-black leading-2 max-md:mt-10">
                {/* Nos Services */}
            </div>
            <div className="px-5 mt-10 w-full max-w-[1216px] max-md:mt-10 max-md:max-w-full mx-auto">
                <div className="grid grid-cols-3 gap-5 max-md:flex max-md:flex-col max-md:gap-0">
                    <div style={{ boxShadow: '0px 9px 13px 0px rgba(0, 0, 0, 0.5)', borderRadius: "20px", height: "300px" }} className="flex flex-col gap-5 max-md:ml-0 max-md:w-full pb-0 mb-36 md:mb-0">
                        <div className="flex flex-col justify-center p-5 w-full text-center text-black bg-white rounded-3xl shadow-sm max-md:mt-10">
                            <img
                                loading="lazy"
                                // srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/66377027bf4f38e4508d3d4d913d0bbdfcfe5c25f0ba123c0518731a648cb5ff?apiKey=cf358c329e0d49a792d02d32277323ef&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/66377027bf4f38e4508d3d4d913d0bbdfcfe5c25f0ba123c0518731a648cb5ff?apiKey=cf358c329e0d49a792d02d32277323ef&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/66377027bf4f38e4508d3d4d913d0bbdfcfe5c25f0ba123c0518731a648cb5ff?apiKey=cf358c329e0d49a792d02d32277323ef&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/66377027bf4f38e4508d3d4d913d0bbdfcfe5c25f0ba123c0518731a648cb5ff?apiKey=cf358c329e0d49a792d02d32277323ef&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/66377027bf4f38e4508d3d4d913d0bbdfcfe5c25f0ba123c0518731a648cb5ff?apiKey=cf358c329e0d49a792d02d32277323ef&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/66377027bf4f38e4508d3d4d913d0bbdfcfe5c25f0ba123c0518731a648cb5ff?apiKey=cf358c329e0d49a792d02d32277323ef&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/66377027bf4f38e4508d3d4d913d0bbdfcfe5c25f0ba123c0518731a648cb5ff?apiKey=cf358c329e0d49a792d02d32277323ef&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/66377027bf4f38e4508d3d4d913d0bbdfcfe5c25f0ba123c0518731a648cb5ff?apiKey=cf358c329e0d49a792d02d32277323ef&"
                                src={home4}
                                className="self-center max-w-full aspect-[0.96] w-[211px]"
                            />
                            <div className="flex flex-col">
                                <div className="text-2xl font-bold leading-8">
                                    Collecte d'avis Google
                                </div>
                                <div className="self-center mt-4 text-base font-medium leading-6">
                                    Encouragez vos clients à laisser des avis positifs sur Google en les récompensant avec des cadeaux, améliorant ainsi votre visibilité.

                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ boxShadow: '0px 9px 13px 0px rgba(0, 0, 0, 0.5)', borderRadius: "20px", height: "400px" }} className="flex flex-col ml-5 max-md:ml-0 max-md:w-full pb-30 mb-20 md:mb-0">
                        <div className="flex flex-col grow justify-center p-5 w-full text-center text-black bg-white rounded-3xl shadow-sm max-md:mt-10">
                            <img
                                loading="lazy"
                                src={home5}
                                // srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/beaa0dcd6ac98ab6e8d2d46445624c1788307d389a8a0ee4189d395269fa2be7?apiKey=cf358c329e0d49a792d02d32277323ef&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/beaa0dcd6ac98ab6e8d2d46445624c1788307d389a8a0ee4189d395269fa2be7?apiKey=cf358c329e0d49a792d02d32277323ef&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/beaa0dcd6ac98ab6e8d2d46445624c1788307d389a8a0ee4189d395269fa2be7?apiKey=cf358c329e0d49a792d02d32277323ef&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/beaa0dcd6ac98ab6e8d2d46445624c1788307d389a8a0ee4189d395269fa2be7?apiKey=cf358c329e0d49a792d02d32277323ef&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/beaa0dcd6ac98ab6e8d2d46445624c1788307d389a8a0ee4189d395269fa2be7?apiKey=cf358c329e0d49a792d02d32277323ef&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/beaa0dcd6ac98ab6e8d2d46445624c1788307d389a8a0ee4189d395269fa2be7?apiKey=cf358c329e0d49a792d02d32277323ef&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/beaa0dcd6ac98ab6e8d2d46445624c1788307d389a8a0ee4189d395269fa2be7?apiKey=cf358c329e0d49a792d02d32277323ef&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/beaa0dcd6ac98ab6e8d2d46445624c1788307d389a8a0ee4189d395269fa2be7?apiKey=cf358c329e0d49a792d02d32277323ef&"
                                className="self-center max-w-full aspect-[0.96] w-[211px]"
                            />
                            <div className="flex flex-col">
                                <div className="text-2xl font-bold leading-9">
                                    Augmentation des abonnés sur Instagram et TikTok
                                </div>
                                <div className="self-center mt-4 text-base font-medium leading-6">
                                    Attirez plus d'abonnés sur vos comptes Instagram et TikTok en incitant vos clients à s'abonner en échange de récompenses.  </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ boxShadow: '0px 9px 13px 0px rgba(0, 0, 0, 0.5)', borderRadius: "20px", height: "300px" }} className="flex flex-col max-md:ml-0 max-md:w-full pb-0 mb-36 md:mb-0">
                        <div className="flex flex-col justify-center p-5 w-full text-center text-black bg-white rounded-3xl shadow-sm max-md:mt-10">
                            <img
                                loading="lazy"
                                src={home6}
                                // srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/59cd4d63b412082cd2fbf73185bcaafea0e3784215ba87c4feef3a794313810f?apiKey=cf358c329e0d49a792d02d32277323ef&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/59cd4d63b412082cd2fbf73185bcaafea0e3784215ba87c4feef3a794313810f?apiKey=cf358c329e0d49a792d02d32277323ef&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/59cd4d63b412082cd2fbf73185bcaafea0e3784215ba87c4feef3a794313810f?apiKey=cf358c329e0d49a792d02d32277323ef&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/59cd4d63b412082cd2fbf73185bcaafea0e3784215ba87c4feef3a794313810f?apiKey=cf358c329e0d49a792d02d32277323ef&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/59cd4d63b412082cd2fbf73185bcaafea0e3784215ba87c4feef3a794313810f?apiKey=cf358c329e0d49a792d02d32277323ef&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/59cd4d63b412082cd2fbf73185bcaafea0e3784215ba87c4feef3a794313810f?apiKey=cf358c329e0d49a792d02d32277323ef&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/59cd4d63b412082cd2fbf73185bcaafea0e3784215ba87c4feef3a794313810f?apiKey=cf358c329e0d49a792d02d32277323ef&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/59cd4d63b412082cd2fbf73185bcaafea0e3784215ba87c4feef3a794313810f?apiKey=cf358c329e0d49a792d02d32277323ef&width=1600 1600w"
                                className="self-center max-w-full aspect-[0.96] w-[211px]"
                            />
                            <div className="flex flex-col">
                                <div className="text-2xl font-bold leading-8">
                                    Fidélisation client et augmentation du chiffre d'affaires
                                </div>
                                <div className="self-center mt-4 text-base font-medium leading-6">
                                    Renforcez la fidélité de vos clients en leur offrant une expérience ludique, tout en boostant votre chiffre d'affaires grâce à leur engagement accru.

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
