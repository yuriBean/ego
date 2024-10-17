import React from 'react'
import bubbles from '../assets/bubbles.png'

const Testimonials = () => {
    return (
        <div class="max-w-[100%] max-h-[640px] relative">
            <div class="w-[100%] h-[640px] left-0 top-0 absolute bg-[linear-gradient(90deg,#F6F7FC_0%,#4F5A96_100%)]"></div>
            <img class="w-[355px] h-[456px] left-[1254.50px] top-[35px] absolute origin-top-left rotate-[47deg]" src={bubbles} />
            <div class="h-[527px] left-[185px] top-[57px] absolute flex-col justify-start items-center gap-[98px] inline-flex">
                <div class="text-center text-white text-4xl font-bold font-['Lato']">Here is what our Clients are saying About us</div>
                <div class="w-[849px] h-[386px] relative">
                    <div class="w-[466px] h-[58px] left-[191.50px] top-[328px] absolute">
                        <div class="w-[58px] h-[58px] px-[14.50px] left-[58px] top-0 absolute origin-top-left rotate-90 justify-center items-center inline-flex"></div>
                        <div class="w-[58px] h-[58px] px-[14.50px] left-[408px] top-[58px] absolute origin-top-left -rotate-90 justify-center items-center inline-flex"></div>
                    </div>
                    <div class="w-[849px] h-[283px] pl-[37px] pr-9 pt-[43px] pb-[42px] left-0 top-0 absolute bg-white rounded-2xl justify-center items-center inline-flex">
                        <div class="grow shrink basis-0 self-stretch relative">
                            <img class="w-[181px] h-[181px] left-0 top-[17px] absolute rounded-full" src="https://via.placeholder.com/181x181" />
                            <div class="w-[573px] h-[198px] left-[203px] top-0 absolute">
                                <div class="left-0 top-0 absolute text-center text-neutral-700 text-2xl font-bold font-['Lato']">Hannah Schmitt</div>
                                <div class="w-[573px] h-[131px] left-0 top-[38px] absolute text-neutral-700 text-lg font-normal font-['Lato']">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu. Faucibus venenatis felis id augue sit cursus pellentesque enim Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas. Suspendisse </div>
                                <div class="left-0 top-[184px] absolute text-center text-neutral-600 text-xs font-normal font-['Lato']">May 8, 2020</div>
                            </div>
                        </div>
                    </div>
                    <div class="w-[224.50px] h-[15px] left-[312.50px] top-[349px] absolute">
                        <div class="w-[15px] h-[15px] left-[34.50px] top-0 absolute bg-white rounded-full"></div>
                        <div class="w-[15px] h-[15px] left-0 top-0 absolute bg-neutral-400 rounded-full"></div>
                        <div class="w-[15px] h-[15px] left-[139.50px] top-0 absolute bg-white rounded-full"></div>
                        <div class="w-[15px] h-[15px] left-[69.50px] top-0 absolute bg-white rounded-full"></div>
                        <div class="w-[15px] h-[15px] left-[174.50px] top-0 absolute bg-white rounded-full"></div>
                        <div class="w-[15px] h-[15px] left-[104.50px] top-0 absolute bg-white rounded-full"></div>
                        <div class="w-[15px] h-[15px] left-[209.50px] top-0 absolute bg-white rounded-full"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Testimonials
