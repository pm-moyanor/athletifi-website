import React from "react";
import { BlueShodow, UnderLIneText } from "../common/Icon";
import Image from "next/image";
import cardImage from "../../../public/assets/img/png/anderson-nft-img.png"

const PlayerCard = () => {
    return (
        <div className="lg:w-full xl:w-1/2 2xl:w-1/2 min-h-full order-1 lg:order-2 h-full flex justify-center items-center lg:my-5 xl:my-0">
            <Image className="" src={cardImage} alt="Player Card" width={500} height={300} />
        </div>
    );
};

export default PlayerCard;