'use client';
import React, { useState } from 'react';
import Card from './../../../public/assets/img/png/jose-card-img.png';
import Image from 'next/image';

const CardThumbnail: React.FC = () => {
  const [isToggle, setIsToggle] = useState<boolean>(false);
  const toggleEmailInput = () => {
    setIsToggle(!isToggle);
  };
  return (
    <div className=" container flex flex-col bg-cardsBackground max-w-500 rounded-lg gap-6">
      <div className="flex justify-around gap-0 mx-4 items-stretch">
        <div className="flex flex-col justify-center">
          <h2 className="font-SourceSansPro mb-2 font-bold text-lg md:text-lgl text-primary relative min-w-[256px]">
            Salvador Carillo
          </h2>
          <p className="font-SourceSansPro-Semibold text-sm md:text-base leading-6 text-start text-primary opacity-80 lg:max-w-769 relative min-w-[256px]">
            villanova soccer
          </p>
          <p className="font-SourceSansPro-Semibold text-sm md:text-base leading-6 text-start text-primary opacity-80 lg:max-w-769 relative min-w-[256px]">
            team 2009
          </p>
          <p className="font-SourceSansPro-Semibold text-sm md:text-base leading-6 text-start text-primary opacity-80 lg:max-w-769 relative min-w-[256px]">
            #22
          </p>
        </div>
        <div className="-mt-10">
          <Image src={Card} alt="Card Thumbnail" width={200} height={200} />
        </div>
      </div>
      <div className="flex justify-center w-full border-t border-card_border">
        <button
          className={`text-primary font-SourceSansPro-Semibold text-sm md:text-base leading-6 w-full p-3 ${isToggle ? 'bg-buttonCardBg' : 'border-r border-card_border'}`}
        >
          go to dashboard
        </button>
        <button
          onClick={toggleEmailInput}
          className="text-primary font-SourceSansPro-Semibold text-sm md:text-base leading-6 w-full p-3"
        >
          refer to friend/family
        </button>
      </div>
      {isToggle && (
        <div className="w-full p-3 bd-white">This is the hidden content</div>
      )}
    </div>
  );
};

export default CardThumbnail;
