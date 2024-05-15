import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimes,
  faPlayCircle,
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { IMatchDataExtended } from '@/types/Dashboard.type';
import MuxPlayer from '@mux/mux-player-react';
import { motion, AnimatePresence } from 'framer-motion';

function convertToSeconds(timestamp: string): number {
  const [hours, minutes, seconds] = timestamp.split(':').map(Number);
  return hours * 3600 + minutes * 60 + seconds;
}

const HorizontalTimeline = ({
  setCurrentItem,
  currentItem,
  handlePlayClick,
  timestamps,
}) => {
  const handleClick = (index, time) => {
    setCurrentItem(index);
    console.log(convertToSeconds(time));
  };

  return (
    <div className="relative flex flex-row items-center justify-around my-12">
      <div className="absolute top-0 w-full h-1 bg-skyblue"></div>
      <div className="w-[7px] h-[7px] bg-skyblue rounded-full absolute -top-[3px] left-0"></div>
      {timestamps.map((time, index) => (
        <div
          key={index}
          className="relative flex flex-col items-center -m-[7px]"
        >
          <div
            onClick={() => {
              handlePlayClick(index);
              handleClick(index, time);
            }}
            className={`rounded-full cursor-pointer ${
              currentItem === index ? 'bg-skyblue' : 'bg-gray-300'
            }`}
            style={{
              width: currentItem === index ? '15px' : '11px',
              height: currentItem === index ? '15px' : '11px',
            }}
          ></div>
          <div className="mt-2 text-sm text-gray-500">{time}</div>
        </div>
      ))}
      <div className="w-[7px] h-[7px] bg-skyblue rounded-full absolute -top-[3px] right-0"></div>
    </div>
  );
};

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
    highlights,
  } = matchData;
  const [currentItem, setCurrentItem] = useState(0);
  const [isHighlightPlaying, setIsHighlightPlaying] = useState(false);
  const muxPlayerRef = useRef<MuxPlayer>(null);

  const weatherIcon = weather?.weatherIcon;
  const iconNameWithoutExtension = weatherIcon?.split('.')[0];
  const localWeatherIcon = `/assets/weather-icons-webp/${iconNameWithoutExtension}.webp`;
  console.log(highlights[0]);
  useEffect(() => {
    console.log(`Current Item Updated: ${currentItem}`);
    handlePlayClick(currentItem); //play the highlight when chevorns nav change the index
  }, [currentItem]);

  const handlePlayClick = (index) => {
    if (muxPlayerRef.current) {
      const cuePoints = highlights
        .map((highlight) => {
          const convertedTime = convertToSeconds(highlight.start_timestamp);
          if (isNaN(convertedTime) || !isFinite(convertedTime)) {
            //catch incorrect time format
            console.warn(`Invalid timestamp: ${highlight.start_timestamp}`);
            return null; //null if isn't valid
          }
          return convertedTime;
        })
        .filter(Boolean); // Remove null values from invalid timestamps

      if (cuePoints.length > 0) {
        cuePoints.sort((a, b) => a - b); //correct non ascendant order
        // Add cue points to th video
        const track = muxPlayerRef.current.addTextTrack('captions', '', 'en');

        cuePoints.forEach((cueTime) => {
          const duration = 5; // do we need duration ?
          const cue = new VTTCue(cueTime, cueTime + duration, 'your cue text');
          track.addCue(cue);
        });

        muxPlayerRef.current.currentTime = cuePoints[index] || 0; // Play from the selected highlight, or from the start is outside the timeframe
        muxPlayerRef.current.play(); // play the highlight cue
        setIsHighlightPlaying(true);
        setTimeout(
          () => {
            setIsHighlightPlaying(false);
          },
          convertToSeconds(highlights[index].duration) * 1000,
        );
      }
    } else {
      console.warn("MuxPlayer element not found. Cue points can't be added.");
    }
  };

  const handleSummaryClick = () => {
    setShowRecap(true);
  };

  const handlePrevClick = () => {
    setCurrentItem((prevItem) => Math.max(prevItem - 1, 0));
  };

  const handleNextClick = () => {
    setCurrentItem((prevItem) => Math.min(prevItem + 1, highlights.length - 1));
  };

  return (
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
                        id="mux-player"
                        playbackId={playback_id}
                        ref={muxPlayerRef}
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
                <div className="flex justify-between items-center bg-cardsBackground rounded-[5px] p-2">
                  <h3 className="text-base font-semibold">
                    Jump to highlights
                  </h3>

                  {highlights && highlights.length > 1 && (
                    <div className="flex gap-8 mr-2">
                      <button
                        onClick={handlePrevClick}
                        disabled={currentItem === 0}
                        className="text-skyblue"
                      >
                        <FontAwesomeIcon icon={faChevronLeft} />
                      </button>
                      <button
                        onClick={handleNextClick}
                        disabled={currentItem === highlights.length - 1}
                        className="text-skyblue"
                      >
                        <FontAwesomeIcon icon={faChevronRight} />
                      </button>
                    </div>
                  )}
                </div>
                {highlights?.length > 1 ? (
                  <>
                    <HorizontalTimeline
                      currentItem={currentItem}
                      handlePlayClick={handlePlayClick}
                      setCurrentItem={setCurrentItem}
                      timestamps={highlights.map(
                        ({ start_timestamp }) => start_timestamp,
                      )}
                    />
                    <div>
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
                            className="flex flex-row sm:flex-row md:flex-col"
                          >
                            {playback_id && highlight.start_timestamp ? (
                              <>
                                <div key={index} />
                                <div
                                  key={index}
                                  style={{
                                    backgroundColor: `${currentItem === index && isHighlightPlaying ? '#092C3E' : ''}`, //scale while the highlight is running
                                    transform: `${currentItem === index && isHighlightPlaying ? 'scale(1.03)' : 'scale(1)'}`,
                                    transition: `${currentItem === index && isHighlightPlaying ? 'border 0.5s, transform 0.5s' : ''}`,
                                  }}
                                  className={`flex justify-between bg-cardsBackground p-4 rounded-[5px] w-full mb-2 items-center `}
                                >
                                  <div className="video-info text-primary flex flex-col">
                                    <div className="flex items-start">
                                      <p className="text-sm text-offwhite mr-4 mt-[2px]">
                                        {highlight.start_timestamp}
                                      </p>
                                      <div className="flex flex-col">
                                        <h3 className="text-base mb-2">{`Highlight 0${index + 1}`}</h3>

                                        <p className="text-sm text-offwhite m-px">
                                          {highlight.clip_description}
                                        </p>

                                        <p className="text-sm text-gray-500 m-px">
                                          Duration:{' '}
                                          {convertToSeconds(highlight.duration)}{' '}
                                          seconds
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  <button
                                    className="w-12 relative flex items-center justify-center h-full"
                                    onClick={() => {
                                      handlePlayClick(index);
                                      setCurrentItem(index);
                                    }}
                                  >
                                    <div className="rounded-full bg-primary h-8 w-8 absolute"></div>
                                    <FontAwesomeIcon
                                      icon={faPlayCircle}
                                      className="text-skyblue h-8 w-8 absolute"
                                    />
                                  </button>
                                </div>
                              </>
                            ) : (
                              <div className="bg-partnersBorders rounded-[4px] w-1/2 sm:w-1/2 md:w-full min-h-[128px] max-w-[320px] flex justify-center items-center text-center">
                                <p className="text-gray-500">
                                  No highlights available for this match
                                </p>
                              </div>
                            )}
                          </div>
                        ),
                      )}
                    </div>
                  </>
                ) : (
                  <div className="mt-8 bg-cardsBackground rounded-[4px] w-1/2 sm:w-1/2 md:w-full min-h-[128px] max-w-[320px] flex justify-center items-center text-center">
                    <p className="text-gray-500">
                      No highlight videos available for this match
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MatchSummary;
