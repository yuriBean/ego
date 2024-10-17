import * as React from "react";
import Logo from "../assets/logo.png"
import Shape from "../assets/Shape.png"
import ego from '../assets/ego_withoutBG.png'

export default function Footer() {
  return (
    <div className="flex flex-col self-stretch px-20 bg-[#F6F7FC] pt-16 pb-8 w-full max-md:px-5 max-md:max-w-full mt-10">
      <div className="max-md:mr-1 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-[32%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col justify-start max-md:mt-10">
              <div className="text-3xl font-semibold text-black">
                <img src={ego} alt="" width={'35%'} />
              </div>
              <div className="mt-5 text-sm text-neutral-600">
                {/* Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat rem optio recusandae reprehenderit ea, saepe incidunt, veritatis qui voluptatibus esse asperiores est consectetur. Illo doloribus ex odio distinctio voluptas accusamus! */}
              </div>
              <div className="flex gap-3.5 justify-center pr-20 mt-5 max-md:pr-5">

                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/09923380b2cf92c7af98f537f3b12d5be8700c253ddfb790781d9d8ae18e083a?apiKey=cf358c329e0d49a792d02d32277323ef&"
                  className="shrink-0 aspect-square w-[25px]"
                />
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/5f03689dd694571b2ab72fa555b6452258c8c545c9423f29744481b208431a64?apiKey=cf358c329e0d49a792d02d32277323ef&"
                  className="shrink-0 aspect-square w-[25px]"
                  alt=""
                />
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/d1197ebe75a39d3255ddb89ec9c333c50ee053aad5aad94a85e44cfa92f92ee8?apiKey=cf358c329e0d49a792d02d32277323ef&"
                  className="shrink-0 aspect-square w-[25px]"
                  alt=""
                />
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/8a60c44158bfb1f23e8e72c732fc861feb2cf3250b04e7eae73cd5e4c87d38b5?apiKey=cf358c329e0d49a792d02d32277323ef&"
                  className="shrink-0 aspect-square w-[25px]"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[68%] max-md:ml-0 max-md:w-full">
            <div className="grow mt-2.5 max-md:mt-10 max-md:max-w-full">
              <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                <div className="flex flex-col w-3/12 max-md:ml-0 max-md:w-full">
                  <div className="flex flex-col grow text-base font-medium leading-5 text-neutral-600 max-md:mt-10">
                    <div className="text-xl font-semibold text-stone-900">
                      Liens du site web
                    </div>
                    <div className="mt-1">Accueil</div>
                    <div className="mt-1">Tarifs</div>
                    <div className="mt-1">À propos</div>
                    <div className="mt-1">FAQ</div>
                  </div>
                </div>
                <div className="flex flex-col ml-5 w-[37%] max-md:ml-0 max-md:w-full">
                  <div className="flex flex-col grow text-base font-medium leading-5 text-neutral-600 max-md:mt-10">
                    <div className="text-xl font-semibold text-stone-900">
                      Plateformes sociales
                    </div>
                    <div className="mt-1">Instagram</div>
                    <div className="mt-1">Facebook</div>
                    <div className="mt-1">TikTok</div>
                    <div className="mt-1">Twitter</div>
                  </div>
                </div>
                <div className="flex flex-col ml-5 w-[37%] max-md:ml-0 max-md:w-full">
                  <div className="flex flex-col text-sm whitespace-nowrap max-md:mt-10">
                    <div className="text-xl font-semibold text-stone-900">
                      Langues
                    </div>
                    <div className="justify-center px-4 py-3.5 mt-4 text-white bg-indigo-400">
                      Français
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="shrink-0 mt-14 max-w-full h-px border border-solid bg-neutral-200 border-neutral-200 w-[1272px] max-md:mt-10 max-md:mr-1" />
      <div className="self-center mt-7 text-xs leading-5 text-slate-800">
        © 2024 Ego. Tous droits réservés.
      </div>
    </div>
  );

}

