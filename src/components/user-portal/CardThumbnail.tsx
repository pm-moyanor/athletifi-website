import React from 'react';
import Card from './../../../public/assets/img/png/jose-card-img.png';
import Image from 'next/image';

const CardThumbnail: React.FC = () => {
  return (
    <div className=" container flex flex-col bg-cardsBackground max-w-400 rounded-lg">
      <div className="flex justify-around gap-0 mx-4">
        <div className="flex flex-col justify-start h-full mt-1">
          <h2 className="font-SourceSansPro font-bold text-lg md:text-lgl text-primary relative mb-1 min-w-[256px]">
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
        <div className="-mt-5">
          <Image src={Card} alt="Card Thumbnail" width={180} height={180} />
        </div>
      </div>
      <div className="flex justify-center">
        <button>go to dashboard</button>
        <button>refer to friend/family</button>
      </div>
    </div>
  );
};

export default CardThumbnail;
