import React, { useState } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { IMatchDataExtended } from '@/types/Dashboard.type';
import MuxPlayer from '@mux/mux-player-react';
import { motion, AnimatePresence } from 'framer-motion';

function convertToSeconds(timestamp: string): number {
  const [hours, minutes, seconds] = timestamp.split(':').map(Number);
  return hours * 3600 + minutes * 60 + seconds;
}

const MatchSummary: React.FC<{ matchData: IMatchDataExtended }> = ({
  matchData,

  isFuture = false,
  isThisWeek = false,
}: {
  matchData: IMatchDataExtended;
  isFuture?: boolean;
  isThisWeek?: boolean;
}) => {
  const [showRecap, setShowRecap] = useState(false);
  const {
    home_club_logo,
    away_club_logo,
    home_club,
    away_club,
    home_score,
    away_score,
    datetime,
    location,
    weather,
    playback_id,
    highlights,
  } = matchData;

  const weatherIcon = weather?.weatherIcon;
  const iconNameWithoutExtension = weatherIcon?.split('.')[0];
  const localWeatherIcon = `/assets/weather-icons-webp/${iconNameWithoutExtension}.webp`;

  const handleSummaryClick = () => {
    setShowRecap(true);
  };
  const dateTime = new Date(datetime);
  const formattedDate = dateTime.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
  const formattedTime = dateTime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="w-full flex-col  justify-between items-center text-primary px-2">
      {isFuture && (
        <div className="flex justify-start gap-3 w-full mb-6">
          <p className="text-sm md:text-base py-[4px]">{formattedDate}</p>
          {isThisWeek && (
            <p className="text-primary text-sm bg-chartRed font-semibold px-2 rounded-[3px] leading-7 shadow-sm">
              This Week
            </p>
          )}
        </div>
      )}

      <div className="flex items-center justify-between my-2 flex-col md:flex-row">
        {' '}
        <div className="flex justify-between items-center w-full max-w-[200px] min-w-[200px] mr-2">
          {home_club_logo !== null && (
            <div className="relative w-[55px] md:w-[65px] h-[55px] md:h-[65px]">
              <Image src={home_club_logo} alt="Crest" layout="fill" />
            </div>
          )}
          <div className="mx-[4px] min-w-12 flex justify-between md:mx-4">
            <span>{home_score}</span> - <span>{away_score}</span>
          </div>
          {away_club_logo !== null && (
            <div className="relative w-[55px] md:w-[65px] h-[55px] md:h-[65px]">
              <Image src={away_club_logo} alt="Crest" layout="fill" />
            </div>
          )}
        </div>
        <div className="flex-col justify-center items-center">
          <div className="relative flex flex-col md:flex-row md:items-center justify-center gap-4 w-full">
            <div className="flex-grow text-center md:text-right pr-2">
              <span className="text-base md:text-base">{home_club}</span>
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2 md:relative md:left-0 md:transform-none">
              <span className="text-skyblue">VS</span>
            </div>
            <div className="flex-grow text-center md:text-left pl-2 ">
              <span className="text-base md:text-base">{away_club}</span>
            </div>
          </div>
        </div>
        {isFuture ? (
          <div className="text-sm text-offwhite text-center md:text-end min-w-[120px] flex flex-col gap-1 md:gap-[4px]">
            <p>{formattedTime}</p>
            <p>{location}</p>
            {isThisWeek && weather && (
              <div className="flex items-center justify-center md:justify-end">
                <div className="relative w-[55px] md:w-[65px] h-[55px] md:h-[65px]">
                  <Image src={localWeatherIcon} alt="Crest" layout="fill" />
                </div>
                <span>{weather.tempCelc}°C</span>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center md:items-end">
            {' '}
            {!isFuture && (
              <div className="flex flex-col items-center md:items-end mb-2">
                {' '}
                <div className="text-sm text-offwhite pt-[4px]">
                  {formattedDate}
                </div>
                <div className="text-sm text-offwhite pt-[4px]">
                  {formattedTime}
                </div>
              </div>
            )}
            <button
              className="-mr-[4px] w-[120px] h-[26px] md:h-[30px] px-2 bg-skyblue text-black text-sm rounded-30 ml-[4px] mt-4"
              onClick={handleSummaryClick}
            >
              summary
            </button>
          </div>
        )}
      </div>

      {/* SUMMARY CARD */}
      <AnimatePresence>
        {showRecap && (
          <motion.div
            key="match-modal"
            initial={{ y: 70, opacity: 0.5 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 70, opacity: 0 }}
            transition={{
              duration: 0.2,
              ease: 'easeOut',
            }}
            className="bg-[#0b2230] shadow-lg fixed inset-0 w-full py-6 md:py-20 px-2 md:px-4 z-50 flex flex-col items-center overflow-y-auto "
          >
            <button
              onClick={() => setShowRecap(false)}
              className="flex justify-end w-full  md:max-w-[700px] lg:max-w-[1030px] mb-6 px-4"
            >
              <FontAwesomeIcon icon={faTimes} size="xl" />
            </button>
            <div className="w-full flex justify-start items-center text-primary mt-2 my-6 px-2 md:px-10 lg:max-w-[1030px] ">
              <div className="flex justify-between items-center w-full max-w-[200px] min-w-[140px] mr-2 ">
                {home_club_logo !== null && (
                  <div className="relative w-[55px] md:w-[65px] h-[55px] md:h-[65px]">
                    <Image src={home_club_logo} alt="Crest" layout="fill" />
                  </div>
                )}
                <div className="mx-2 min-w-12 flex justify-between md:mx-4">
                  <span>{home_score}</span> - <span>{away_score}</span>
                </div>
                {away_club_logo !== null && (
                  <div className="relative w-[55px] md:w-[65px] h-[55px] md:h-[65px]">
                    <Image src={away_club_logo} alt="Crest" layout="fill" />
                  </div>
                )}
              </div>

              <div className=" flex flex-row flex-wrap items-center justify-between md:w-[600px] gap-2">
                <div className="block ml-[6px] md:m-auto">
                  <span className="text-sm md:text-base ">{home_club} </span>vs
                  <span className="text-sm md:text-base "> {away_club}</span>
                  <div className="text-xs md:text-sm text-offwhite pt-[4px]">
                    {datetime}
                  </div>
                </div>
              </div>
            </div>

            <div className="relative flex flex-col py-4 px-4 md:px-10 lg:max-w-[1030px] items-center justify-center w-full">
              <div className="flex flex-col-reverse sm:flex-col-reverse md:flex-row pb-8 w-full">
                <div className="w-full mt-6 md:mt-0">
                  <h2 className="text-[20px] font-semibold mb-2">Full Recap</h2>
                  <div className="h-1 mb-4 bg-partnersBorders" />
                  <div className="w-full h-full  min-w-[320px] max-h-[320px]">
                    {playback_id ? (
                      <MuxPlayer
                        playbackId={playback_id}
                        className="w-full h-full rounded-md"
                      />
                    ) : (
                      <div className="w-full h-fullflex justify-center items-center">
                        <p>No video currently available for this match</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="px-0 md:px-4 my-4 md:my-0  md:w-4/6 ">
                  <h3 className="text-[20px] font-semibold">Summary</h3>
                  {/* <div className="h-1 my-2 bg-partnersBorders" /> */}
                  <div className="text-sm text-offwhite my-4">
                    <p className="pb-[2px]">{datetime}</p>
                    <p className="pb-[2px]">{location}</p>
                    <div className="flex items-center justify-start">
                      <div className="w-6 text-center mr-1">
                        <Image
                          src={localWeatherIcon}
                          alt="Weather Icon"
                          width={100}
                          height={100}
                        />
                      </div>
                      <p>{weather?.tempFahr}</p>
                    </div>
                  </div>

                  <div>
                    <div className="h-1 my-2 bg-partnersBorders text-primary" />
                    <h3 className="font-semibold py-2 text-[18px]">Title</h3>
                    {/* define generated text */}
                    <p className="text-sm font-thin">
                      In a gripping showdown, the Villanova Soccer Academy 2009s
                      faced off against Stellar FC 2009s, concluding in a 2-0
                      victory for Stellar. he match saw Stellar dominate early,
                      securing a lead with two quick goals in the first half, a
                      margin they maintained throughout the game. While
                      Villanova struggled to find the back of the net, Vidals
                      efforts on the field were a silver lining, as he
                      orchestrated several promising attacks and demonstrated
                      strong defensive prowess.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col mt-4 w-full">
                <h3 className="text-[20px] font-semibold mt-12 md:mt-4 mb-2">
                  Highlights
                </h3>
                <div className="h-1 mb-4 bg-partnersBorders w-full"></div>
                <div className="flex flex-col md:flex-row justify-between w-full max-w-none sm:max-w-[600px] md:max-w-none">
                  {highlights?.map(
                    (
                      highlight: {
                        clip_description: string;
                        duration: string;
                        start_timestamp: string;
                      },
                      index: number,
                    ) => (
                      <div
                        key={index}
                        className="w-full sm my-2 md:m-2 md:max-w-[400px] flex flex-row sm:flex-row md:flex-col"
                      >
                        {playback_id && highlight.start_timestamp ? (
                          <>
                            <MuxPlayer
                              playbackId={playback_id}
                              className="bg-partnersBorders rounded-[4px] w-1/2 sm:w-1/2 md:w-full min-h-[128px] max-w-[320px]"
                              startTime={convertToSeconds(
                                highlight.start_timestamp,
                              )}
                            />
                            <div className="video-info text-primary ml-2 w-1/2 sm:w-1/2 md:w-full flex flex-col justify-end max-w-[320px]">
                              <h3 className="text-base pt-2">{`Highlight-${index}`}</h3>
                              <p className="text-sm text-offwhite m-px">
                                {highlight.clip_description}
                              </p>
                              <p className="text-sm text-gray-500 m-px">
                                Duration: {highlight.duration}git
                              </p>
                              <p className="text-sm text-gray-500 m-px">
                                Timestamp: {highlight.start_timestamp}
                              </p>
                            </div>
                          </>
                        ) : (
                          <div className="bg-partnersBorders rounded-[4px] w-1/2 sm:w-1/2 md:w-full min-h-[128px] max-w-[320px] flex justify-center items-center text-center">
                            <p className="text-gray-500">
                              No highlight videos available for this match
                            </p>
                          </div>
                        )}
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MatchSummary;
