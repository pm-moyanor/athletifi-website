import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  // faSun,
  // faCloud,
  faCloudRain,
  // faSnowflake,
} from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { ILatestMatchProps } from '@/types/Dashboard.type';
import Skeleton from 'react-loading-skeleton';

const LOGO_SIZE = 50;

const LatestMatch: React.FC<ILatestMatchProps> = ({
  datetime,
  location,
  weather,
  home_club,
  home_club_logo,
  home_score,
  away_club,
  away_club_logo,
  away_score,
}: ILatestMatchProps) => {
  return (
    <>
      {datetime !== null ? (
        <div className="bg-cardsBackground h-[310px] sm:h-[310px] md:h-56 flex flex-col justify-between p-4 relative w-full rounded-10 text-primary font-sourceSansPro">
          <h1 className="text-[24px] font-semibold">Latest Match</h1>
          <div className="flex justify-center items-center">
            <div className="flex flex-col md:flex-row items-center">
              <p className="px-4">{home_club}</p>
              {!!home_club_logo && (
                <Image
                  src={home_club_logo}
                  alt="crest"
                  className=""
                  width={LOGO_SIZE}
                  height={LOGO_SIZE}
                  quality={75}
                  loading="lazy"
                />
              )}
            </div>
            <p className="px-4">{`${home_score} - ${away_score}`}</p>
            <div className="flex flex-col md:flex-row-reverse items-center">
              <p className="px-4">{away_club}</p>
              {!!away_club_logo && (
                <Image
                  src={away_club_logo}
                  alt="crest"
                  className=""
                  width={LOGO_SIZE}
                  height={LOGO_SIZE}
                  quality={75}
                  loading="lazy"
                />
              )}
            </div>
          </div>
          <div className="flex flex-col justify-between h-[70px] text-center sm:relative sm:text-center md:absolute top-4 right-4 text-sm font-light">
            <p className="text-center md:text-right">{datetime}</p>
            <p className="text-center md:text-right">{location}</p>
            <div className="flex item-center items-center justify-center sm:justify-center md:justify-end">
              <div className=" w-6 text-center mr-2">
                <FontAwesomeIcon icon={faCloudRain} size="lg" />
              </div>
              <p className="">{weather}&deg;F</p>
            </div>
          </div>

          <div className="flex justify-between items-center mb-2 sm:mb-4 md:mb-0 mx-1 sm:mx-6">
            <div className="flex flex-col justify-center">
              <h4 className="text-center text-md">56</h4>
              <p className="text-xs sm:text-sm font-light">attacking</p>
            </div>

            <span className="h-6 w-1 bg-partnersBorders" />
            <div className="flex flex-col justify-center">
              <h4 className=" text-center text-md">40</h4>
              <p className="text-xs sm:text-sm font-light">mentality</p>
            </div>
            <span className="h-6 w-1 bg-partnersBorders" />
            <div className="flex flex-col justify-center">
              <h4 className=" text-center text-md">87</h4>
              <p className="text-xs sm:text-sm font-light">physical</p>
            </div>
            <span className="h-6 w-1 bg-partnersBorders" />
            <div className="flex flex-col justify-center">
              <h4 className=" text-center text-md">12</h4>
              <p className="text-xs sm:text-sm font-light">skill</p>
            </div>
            <span className="h-6 w-1 bg-partnersBorders" />
            <div className="flex flex-col justify-center">
              <h4 className=" text-center text-md">78</h4>
              <p className="text-xs sm:text-sm font-light">defense</p>
            </div>
          </div>
        </div>
      ) : (
        <Skeleton
          className="min-w-[351px] min-h-[310px] md:min-h-[224px]"
          borderRadius={10}
        />
      )}
    </>
  );
};

export default LatestMatch;
