import React, { useState } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCloud } from '@fortawesome/free-solid-svg-icons';
import { IMatchDataExtended } from '@/types/Dashboard.type';
import MuxPlayer from '@mux/mux-player-react';
import { motion, AnimatePresence } from 'framer-motion';

const MatchSummary: React.FC<{ matchData: IMatchDataExtended }> = ({
  matchData,
}: {
  matchData: IMatchDataExtended;
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
    // highlight_urls,
    highlight_descriptions,
  } = matchData;

  const handleSummaryClick = () => {
    setShowRecap(true);
  };

  return (
    // MATCH basic INFO

    <div className="w-full flex justify-around lg:justify-between items-center text-primary ">
      <div className="flex justify-between items-center w-full max-w-[200px] min-w-[140px] mr-2">
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

      <div className="flex flex-col md:flex-row  md:items-center justify-center md:justify-around  gap-4 md:w-[600px] lg:w-full">
        <div className="ml-[6px]">
          <span className="text-sm md:text-base ">{home_club} </span>vs
          <span className="text-sm md:text-base "> {away_club}</span>
          <div className="text-xs md:text-sm text-offwhite pt-[4px]">
            {datetime}
          </div>
        </div>
        <button
          className="w-28 h-[26px] md:h-[30px] px-2 bg-skyblue text-black text-sm rounded-30 ml-[4px]"
          onClick={handleSummaryClick}
        >
          summary
        </button>
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
                    <div className="flex">
                      <div className="mr-2">
                        <FontAwesomeIcon icon={faCloud} />
                      </div>
                      <p>{weather?.tempFahr}</p>
                    </div>
                  </div>

                  <div>
                    <div className="h-1 my-2 bg-partnersBorders text-primary" />
                    <h3 className="font-semibold py-2 text-[18px]">Title</h3>
                    {/* define generated text */}
                    <p className="text-sm font-thin">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur.
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
                  {highlight_descriptions?.map(
                    (description: string, index: number) => (
                      <div
                        key={index}
                        className=" w-full sm my-2 md:m-2 md:max-w-[400px] flex flex-row sm:flex-row md:flex-col"
                      >
                        {playback_id ? (
                          <MuxPlayer
                            playbackId={playback_id}
                            className="bg-partnersBorders rounded-[4px] w-1/2 sm:w-1/2 md:w-full min-h-[128px] max-w-[320px]"
                          />
                        ) : (
                          <div className="bg-partnersBorders rounded-[4px] w-1/2 sm:w-1/2 md:w-full min-h-[128px] max-w-[320px] flex justify-center items-center text-center">
                            <p className="text-gray-500">
                              No video currently available for this match
                            </p>
                          </div>
                        )}
                        <div className="video-info text-primary ml-2 w-1/2 sm:w-1/2 md:w-full flex flex-col justify-end  max-w-[320px]">
                          <h3 className="text-base pt-2">{`Highlight-${index}`}</h3>
                          <p className="text-sm text-offwhite m-px ">
                            {description}
                          </p>
                        </div>
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
