import React from 'react';
import Image from 'next/image';
import cardImage from '../../../public/assets/img/png/anderson-card-img.png';

const CARD_IMAGE_WIDTH = 500;
const CARD_IMAGE_HEIGHT = 300;

const PlayerCard = () => {
  return (
    <div className="lg:w-full xl:w-1/2 2xl:w-1/2 min-h-full order-1 lg:order-2 h-full flex justify-center items-center lg:my-5 xl:my-0">
      <Image
        className=""
        src={cardImage}
        alt="Player card"
        width={CARD_IMAGE_WIDTH}
        height={CARD_IMAGE_HEIGHT}
      />
    </div>
  );
};

export default PlayerCard;
