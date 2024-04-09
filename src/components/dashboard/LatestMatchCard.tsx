import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  // faSun,
  // faCloud,
  faCloudRain,
  // faSnowflake,
} from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { ILatestMatchProps, IRating } from '@/types/Dashboard.type';
import Skeleton from 'react-loading-skeleton';

const LOGO_SIZE = 54;

const RatingBox = ({
  rating,
  isLast,
}: {
  rating: IRating;
  isLast: boolean;
}) => {
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <h4 className="text-center text-md">{rating.rating}</h4>
        <p className="text-xs sm:text-sm font-light">{rating.attribute}</p>
      </div>
      {!isLast && <span className="min-h-6 min-w-[1px] bg-partnersBorders" />}
    </>
  );
};

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
  player_ratings,
}: ILatestMatchProps) => {
  return (
    <>
      {home_score !== null ? (
        <div className="bg-cardsBackground h-full flex flex-col justify-between p-4 relative w-full rounded-10 text-primary ">
          {datetime === undefined ? (
            <div className="bg-cardsBackground h-[310px] sm:h-[310px] md:h-56 flex flex-col relative w-full rounded-10 text-primary ">
              <h1 className="text-[24px] font-semibold">Latest Match</h1>
              <div className="flex h-full text-gray-500 justify-center items-center">
                We are working on getting more match data. Please come back soon
                to view the full experience.
              </div>
            </div>
          ) : (
            <>
              <div className=" flex flex-col md:flex-row justify-between">
                <h1 className="text-[24px] font-semibold">Latest Match</h1>
                <div className="flex flex-col justify-between h-[68px] items-center md:items-end mt-4 md:mt-0 text-sm font-light">
                  <p className="text-center md:text-right">{datetime}</p>
                  <p className="text-center md:text-right">{location}</p>
                  <div className="flex item-center items-center justify-center sm:justify-center md:justify-end">
                    <div className=" w-6 text-center mr-2">
                      <FontAwesomeIcon icon={faCloudRain} size="lg" />
                    </div>
                    <p className="">{weather?.tempFahr}&deg;F</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end items-start w-full max-w-[450px] md:max-w-[500px] my-4 h-full self-center">
                <div className="flex justify-end items-end h-full w-1/2">
                  <div className="flex flex-col-reverse w-full md:flex-row items-center">
                    <p className="text-center md:mr-2 max-h-6 leading-5 text-sm md:text-base">
                      {home_club}
                    </p>
                    {!!home_club_logo && (
                      <Image
                        src={home_club_logo}
                        alt="crest"
                        className="mb-2 md:mb-0"
                        width={LOGO_SIZE}
                        height={LOGO_SIZE}
                        quality={75}
                        loading="lazy"
                      />
                    )}
                  </div>

                  <p className="text-lg h-full flex md:items-center pt-2 md:pt-0 px-2 md:px-4">{`${home_score}`}</p>
                </div>
                <p className="px-2 h-full mt-4 md:mt-0 flex items-start md:items-center">
                  -
                </p>
                <div className="flex items-start h-full w-1/2">
                  <p className="text-lg  h-full flex md:items-center pt-2 md:pt-0 px-2 md:px-4">{`${away_score}`}</p>
                  <div className="flex flex-col w-full md:flex-row items-center">
                    {!!away_club_logo && (
                      <Image
                        src={away_club_logo}
                        alt="crest"
                        className="mb-2 md:mb-0"
                        width={LOGO_SIZE}
                        height={LOGO_SIZE}
                        quality={75}
                        loading="lazy"
                      />
                    )}
                    <p className="text-center md:ml-2 max-h-6 leading-5 text-sm md:text-base">
                      {away_club}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
          {player_ratings === null ? (
            <div className="flex text-gray-500 justify-center items-center">
              We are currently working on getting more data. Please come back
              soon
            </div>
          ) : (
            <div className="flex justify-between items-center mt-10 md:mt-6">
              {player_ratings?.map((rating, idx) => (
                <RatingBox
                  key={idx}
                  isLast={idx === player_ratings.length - 1}
                  rating={rating}
                />
              ))}
            </div>
          )}
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
