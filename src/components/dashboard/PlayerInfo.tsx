import React from "react";
import { BlueShodow, UnderLIneText } from "../common/Icon";
import Image from "next/image";

const PlayerInformation = {
    name: "Leo Messi",
    club: "FC Barcelona",
    team: "2009s",
    Number: "10",
};

const PlayerInfo = () => {
    return (
        <div className="container md:max-w-full xl:max-w-[1140px] 2xl:max-w-[1320px] mx-auto px-3">
            <div className="blue_linear_gradient bg-blue_linear_gradient after:absolute relative lg:py-16 py-5 md:py-10 sm:mt-6 z-0  after:contents-[''] after:inset-0 after:p-[1px] after:rounded-[30px] rounded-[30px]">
                <div className="flex flex-col justify-center items-center relative z-20"
                    data-aos="fade-up"
                    data-aos-duration="400"
                    data-aos-easing="ease-in-sine"
                    data-aos-delay="300"
                    data-aos-offset="100"
                >
                    <h2 className="font-HelveticaNeueMedium md:text-5xl text-[26px] sm:text-4xl text-[#FDFEFF] font-medium leading-[60px] relative z-20 text-center md:mb-4">
                        <span className="relative ">
                            Player Info
                            <span className="absolute -bottom-2 left-0 z-0">
                                <UnderLIneText />
                            </span>
                        </span>
                    </h2>
                    <div className="flex flex-col">
                        {Object.entries(PlayerInformation).map(([key, value]) => (
                            <div key={key} className="my-2">
                                <span className="font-bold font-Segoe text-md leading-7 text-center pb-0.5 text-[#FDFEFF] opacity-80 m-0 sm:pt-4 lg:max-w-[769px] mx-auto sm:px-6 px-3 xl:px-0 relative z-20">{key}: </span>
                                <span className="font-Segoe font-normal text-md leading-7 text-center pb-0.5 text-[#FDFEFF] opacity-80 m-0 sm:pt-4 lg:max-w-[769px] mx-auto sm:px-6 px-3 xl:px-0 relative z-20">{value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlayerInfo;
