import React from 'react';
import Image from 'next/image';
import cardImage from '../../../public/assets/img/png/anderson-card-img.png';
// import cardImage from '../../../public/assets/img/png/jose-card-img.png';
import { Player } from '@/types/Player.type';
import { VillanovaIcon } from '@/components/common/Icon';

const playerInformation: Player = {
  club: 'Villanova Soccer Academy',
  name: 'Salvador Carrillo',
  team: '2009',
};

const CARD_IMAGE_WIDTH: number = 390;
const CARD_IMAGE_HEIGHT: number = 400;

const HeroBanner: React.FC = () => {
  return (
    <section className="relative items-center md:items-end flex flex-col-reverse md:flex-row justify-center md:justify-start h-screen md:h-[460px] lg:h-[370px] w-full max-w-[800px] lg:max-w-[980px] px-2">
      <div className=" w-auto lg:w-8/12 flex items-center lg:items-start justify-center lg:justify-start mb-[10px] md:mb-[50px] lg:mb-[30px] ml-0 md:ml-10 lg:ml-0 pt-6">
        <VillanovaIcon />
        <div className="w-full flex flex-col justify-center items-start ml-2">
          <h2 className="font-SourceSansPro font-bold md:text-lgl text-lg   text-primary relative mb-1">
            {playerInformation.name}
          </h2>
          <p className="font-SourceSansPro-Semibold text-sm md:text-base leading-6 text-start text-primary opacity-80 lg:max-w-769 relative z-20">
            {playerInformation.club}
          </p>
          <p className="font-SourceSansPro-Semibold text-sm md:text-base leading-6 text-start text-primary opacity-80 lg:max-w-769 relative z-20">
            {`team ${playerInformation.team}`}
          </p>
          <p className="font-SourceSansPro-Semibold text-sm md:text-base leading-6 text-start text-primary opacity-80 lg:max-w-769 relative z-20">
            #22
          </p>
          <span className="hidden md:block h-px w-11/12 my-4 bg-partnersBorders" />
        </div>
      </div>
      <div className="relative md:absolute md:-right-0 lg:-right-14 md:top-[80px] lg:top-[180px]">
        <Image
          className=""
          src={cardImage}
          alt="Player card"
          width={CARD_IMAGE_WIDTH}
          height={CARD_IMAGE_HEIGHT}
          quality={75}
          loading="lazy"
          // layout="responsive"
        />
      </div>
    </section>
  );
};

export default HeroBanner;
