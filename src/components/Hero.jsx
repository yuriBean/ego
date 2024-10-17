import * as React from "react";

export default function Hero({Image, heading, para1, para2}) {
  return (
    <div className="flex justify-center items-center self-stretch px-16 py-14 mt-5 w-full bg-[linear-gradient(90deg,#F6F7FC_0%,#4F5A96_60%)] max-md:px-5 max-md:max-w-full">
      <div className="w-full max-w-[1060px] max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-[50%] max-md:ml-0 max-md:w-full">
            <img
              alt=""
              loading="lazy"
              src={Image}
              className="max-w-[420px] aspect-square max-md:mt-10 max-md:max-w-full"
            />
          </div>
          <div className="flex flex-col w-[44%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col self-stretch my-auto text-white max-md:mt-10 max-md:max-w-full">
              <div className="text-3xl font-bold leading-2 max-md:max-w-full max-md:text-4xl mb-4">
                {heading}
              </div>
              <div className="mt-3.5 text-xl font-medium leading-2 max-md:max-w-full">
                {para1} <br/> {para2}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

