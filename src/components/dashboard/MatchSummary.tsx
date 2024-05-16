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
  const timelineRef = useRef(window.innerWidth);
  const [timelineWidth, setTimelineWidth] = useState(window.innerWidth);

  useEffect(() => {
    setTimelineWidth(timelineRef.current?.offsetWidth || 0);

    const handleResize = () => {
      setTimelineWidth(timelineRef.current?.offsetWidth || 0);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [timestamps]);

  console.log('width: ', timelineRef);

  const convertToSeconds = (timestamp) => {
    const [hours, minutes, seconds] = timestamp.split(':').map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  };

  const calculateLeftPosition = (time) => {
    const totalVideoDuration = 4600;
    const timelineWidth = timelineRef.current?.offsetWidth || 0;
    console.log(timelineWidth);
    const timeInSec = convertToSeconds(time);
    return (timeInSec / totalVideoDuration) * timelineWidth;
  };

  const handleClick = (index, time) => {
    setCurrentItem(index);
    console.log(convertToSeconds(time));
  };

  return (
    <div className="relative flex flex-row items-center my-12">
      <div
        className="absolute top-0  h-1 bg-skyblue"
        ref={timelineRef}
        style={{ width: '100%' }}
      ></div>
      <div className="w-[7px] h-[7px] bg-skyblue rounded-full absolute -top-[3px] left-0"></div>

      <div className="absolute top-1/2 -left-[50%] transform translate-y-1/2 h-[1px] bg-skyblue"></div>
      {timestamps.map((time, index) => {
        console.log(time);
        const leftPosition = calculateLeftPosition(time);

        return (
          <div
            key={index}
            className="relative flex flex-col items-center -m-[13px]"
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
                left: `${leftPosition - 5.5}px`,
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
              }}
            ></div>
            <div
              className={` mt-2 text-sm text-offwhite`}
              style={{
                left: `${leftPosition - 24}px`,
                position: 'absolute',
                top: '16px',
                transform: 'translateY(-50%)',
              }}
            >
              {time}
            </div>
          </div>
        );
      })}
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
            className="bg-[#0b2230] shadow-lg fixed inset-0 w-full py-6 md:py-10 px-4 z-50 flex flex-col items-center overflow-y-auto "
          >
            <div className="w-full shadow-md mb-4 bg-cardsBackground rounded-[5px] py-2 px-4 flex items-center justify-between lg:max-w-[1030px]">
              {' '}
              <h2 className="text-[20px] w-full lg:max-w-[1030px]">
                Match Summary
              </h2>
              <button onClick={() => setShowRecap(false)} className="">
                <FontAwesomeIcon icon={faTimes} size="xl" />
              </button>
            </div>

            <div className="w-full flex flex-col md:flex-row justify-start items-center gap-4  text-primary mt-2 px-2 lg:max-w-[1030px] ">
              <div className="flex justify-center items-center min-w-[280px] w-[280px] md:mr-2">
                {home_club_logo !== null && (
                  <div className="relative min-w-[75px] h-[75px]">
                    <Image src={home_club_logo} alt="Crest" layout="fill" />
                  </div>
                )}
                <div className="mx-2 min-w-12 flex justify-between md:mx-4">
                  <span>{home_score}</span> - <span>{away_score}</span>
                </div>
                {away_club_logo !== null && (
                  <div className="relative min-w-[75px] h-[75px]">
                    <Image src={away_club_logo} alt="Crest" layout="fill" />
                  </div>
                )}
              </div>

              <div className="text-[20px] flex flex-col md:flex-row  items-center justify-center md:gap-4 mt-4 md:mt-0 ">
                <span className="">{home_club} </span>
                <span className="text-skyblue">VS</span>
                <span className=""> {away_club}</span>
              </div>
            </div>
            <div className=" w-full max-w-[1030px] my-4 md:my-8 border-t border-opacity-50 border-partnersBorders"></div>
            <div className="relative flex flex-col pb-4  lg:max-w-[1030px] items-center justify-center w-full">
              <div className="mb-12 mx-2  flex flex-col md:flex-row gap-4">
                <div className="text-base text-primary min-w-[280px] w-[280px]">
                  <p className="pb-[2px]">{datetime}hs</p>
                  <p className="pb-[2px]">{location}</p>
                  <div className="flex  items-center justify-start">
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

                <div className="w-full mt-6 md:mt-0">
                  <h3 className="font-semibold text-[18px] mb-2">Title</h3>
                  {/* define generated text */}
                  <p className="text-base tracking-wide font-light">
                    In a gripping showdown, the Villanova Soccer Academy 2009s
                    faced off against Stellar FC 2009s, concluding in a 2-0
                    victory for Stellar. he match saw Stellar dominate early,
                    securing a lead with two quick goals in the first half, a
                    margin they maintained throughout the game. While Villanova
                    struggled to find the back of the net, Vidals efforts on the
                    field were a silver lining, as he orchestrated several
                    promising attacks and demonstrated strong defensive prowess.
                  </p>
                </div>
              </div>

              <div className="w-full mt-6 md:mt-0">
                <h2 className="text-[20px] mb-4 bg-cardsBackground rounded-[5px] py-2 px-4 shadow-md">
                  Full Recap
                </h2>
                {/* <div className="h-1 mb-4 bg-partnersBorders" /> */}
                <div className="w-full relative rounded-10">
                  {playback_id ? (
                    <div className="w-full h-full">
                      <MuxPlayer
                        id="mux-player"
                        playbackId={playback_id}
                        ref={muxPlayerRef}
                        accent-color="#00C7FF"
                        className=" w-full h-full"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-full flex justify-center items-center">
                      <p>No video currently available for this match</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col mt-4 w-full">
                <div className="flex justify-between items-center bg-cardsBackground rounded-[5px] py-2 px-4 shadow-md">
                  <h3 className="text-base">Jump to highlights</h3>

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
                            key={`${highlight.clip_description}-${index}`}
                            className="flex flex-row sm:flex-row md:flex-col"
                          >
                            {playback_id && highlight.start_timestamp ? (
                              <>
                                <div
                                  key={`${highlight.clip_description}-info`}
                                />
                                <div
                                  key={`${highlight.clip_description}-highlight`}
                                  style={{
                                    backgroundColor: `${currentItem === index && isHighlightPlaying ? '#092C3E' : ''}`, //scale while the highlight is running
                                    transform: `${currentItem === index && isHighlightPlaying ? 'scale(1.03)' : 'scale(1)'}`,
                                    transition: `${currentItem === index && isHighlightPlaying ? 'border 0.5s, transform 0.5s' : ''}`,
                                  }}
                                  className={`flex justify-between bg-cardsBackground p-4 rounded-[5px] w-full mb-2 items-center `}
                                >
                                  <div className="video-info text-primary flex flex-col">
                                    <div className="flex items-start  tracking-wide ">
                                      <p className="text-sm text-offwhite mr-4 mt-[2px]">
                                        {highlight.start_timestamp}
                                      </p>
                                      <div className="flex flex-col">
                                        <h3 className="text-base mb-2">{`Highlight 0${index + 1}`}</h3>

                                        <p className="text-base font-light text-offwhitem-px">
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
                              <div className="bg-partnersBorders rounded-[4px] w-full min-h-[128px] md:max-w-[450px] flex justify-center items-center text-center">
                                <p className="text-offwhite">
                                  No highlights for this match yet. Stay tuned
                                  for updates!
                                </p>
                              </div>
                            )}
                          </div>
                        ),
                      )}
                    </div>
                  </>
                ) : (
                  <div className="mt-8 shadow-md mx-auto bg-cardsBackground bg-opacity-20 rounded-[4px] w-full min-h-[128px] md:max-w-[450px] flex justify-center items-center text-center">
                    <p className="text-offwhite text-sm">
                      No highlights for this match yet. Stay tuned for updates!
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
