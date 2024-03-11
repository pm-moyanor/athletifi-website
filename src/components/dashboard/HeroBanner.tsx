import React from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
// import cardImage from '../../../public/assets/img/png/anderson-card-img.png';
import cardImage from '../../../public/assets/img/png/jose-card-img.png';
import { Player } from '@/types/Player.type';
import { VillanovaIcon } from '@/components/common/Icon';

const playerInformation: Player = {
  club: 'Villanova Soccer Academy',
  name: 'Salvador Carrillo',
  team: '2009',
};

const CARD_IMAGE_WIDTH: number = 465;
const CARD_IMAGE_HEIGHT: number = 400;

const HeroBanner: React.FC = () => {
  const isSmallScreen =
    typeof window !== 'undefined' && window.innerWidth < 640;

  return (
    <section className="relative px-4 items-center md:items-end flex flex-col-reverse md:flex-row justify-center md:justify-start h-dvh md:h-[435px] lg:h-[370px] w-full md:max-w-[900px] lg:max-w-[1130px]">
      <div className="md:w-2/3 lg:w-2/3 flex items-center lg:items-start justify-center lg:justify-start mb-[10px] md:mb-[50px] lg:mb-[30px] ml-0 md:ml-10 lg:ml-4 pt-6">
        <VillanovaIcon />
        <div className="w-full flex flex-col justify-center items-start ml-2 md:ml-4 pr-0">
          <h2 className="font-SourceSansPro font-bold text-lg md:text-lgl text-primary relative mb-1">
            {playerInformation.name}
          </h2>
          <p className="font-SourceSansPro-Semibold text-sm md:text-base leading-6 text-start text-primary opacity-80 lg:max-w-769 relative z-20">
            {playerInformation.club}
          </p>
          <p className="font-SourceSansPro-Semibold text-sm md:text-base leading-4 text-start text-primary opacity-80 lg:max-w-769 relative z-20">
            {`team ${playerInformation.team}`}
          </p>
          <p className="font-SourceSansPro-Semibold text-sm md:text-base leading-6 text-start text-primary opacity-80 lg:max-w-769 relative z-20">
            #22
          </p>
          <span className="hidden md:block h-px w-full my-4 bg-partnersBorders" />
        </div>
      </div>
      <div className=" -mb-0 md:-mb-10 lg:-mb-[160px]">
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
      {isSmallScreen && (
        <div className="text-partnersBorders absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-8 z-40">
          <FontAwesomeIcon icon={faChevronDown} size="xl" />
        </div>
      )}
    </section>
  );
};

export default HeroBanner;
