import React, { useState } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCloud } from '@fortawesome/free-solid-svg-icons';
import { IMatchData } from '@/types/Dashboard.type';

const MatchSummary: React.FC<{ matchData: IMatchData }> = ({
  matchData,
}: {
  matchData: IMatchData;
}) => {
  const [showRecap, setShowRecap] = useState(false);
  const {
    team1Badge,
    team2Badge,
    team1Name,
    team2Name,
    team1Score,
    team2Score,
    date,
    location,
    weather,
    fullRecapVideo,
    videos,
  } = matchData;

  const handleSummaryClick = () => {
    setShowRecap(true);
  };

  return (
    // MATCH basic INFO

    <div className="w-full flex justify-around md:justify-between items-center text-primary font-sourceSansPro mr-4">
      <div className="flex justify-between items-center w-[250px] max-w-[220px] min-w-[172px] mr-2">
        {team1Badge !== null && (
          <Image
            src={team1Badge}
            alt="Crest"
            width={55}
            height={55}
            className="w-auto h-auto"
          />
        )}
        <div className="mx-[4px]">
          <span>{team1Score}</span> - <span>{team2Score}</span>
        </div>
        {team2Badge !== null && (
          <Image
            src={team2Badge}
            alt="Crest"
            width={55}
            height={55}
            className="w-auto h-auto"
          />
        )}
      </div>

      <div className="flex flex-col md:flex-row md:items-center w-auto md:w-full justify-center ">
        <div className="block max-w-full ml-px md:m-auto">
          <span className="text-base font-sourceSansPro">{team1Name} </span>vs
          <span className="text-base font-sourceSansPro"> {team2Name}</span>
          <div className="text-sm text-offwhite pt-[2px]">{date}</div>
        </div>
        <button
          className="w-28 h-[30px] px-2 bg-skyblue text-black text-sm rounded-30 mt-4 md:mt-0 "
          onClick={handleSummaryClick}
        >
          summary
        </button>
      </div>

      {/* SUMMARY CARD */}

      {showRecap && (
        <div className="bg-[#0b2230] shadow-lg fixed inset-0 w-full p-2 md:p-8 z-50 flex flex-col items-center overflow-y-auto">
          <div className="flex justify-center md:justify-start items-center text-primary w-full font-sourceSansPro pb-4 md:max-w-[700px] lg:max-w-[1030px]">
            <div className="flex flex-col md:flex-row  w-full justify-center md:justify-between items-center sm:max-w-[380px] md:max-w-[600px] mt-8 md:mt-2 ">
              <div className="flex min-w-[190px] max-w-[190px] justify-center gap-4 items-center my-4">
                {team1Badge !== null && (
                  <Image
                    src={team1Badge}
                    alt="Crest"
                    width={50}
                    height={50}
                    className="bg-slate-400 rounded-20"
                  />
                )}
                <div className="font-semibold">
                  <span>{team1Score}</span> - <span>{team2Score}</span>
                </div>
                {team2Badge !== null && (
                  <Image
                    src={team2Badge}
                    alt="Crest"
                    width={50}
                    height={50}
                    className="bg-slate-400 rounded-20"
                  />
                )}
              </div>

              <div className=" flex justify-center gap-6 w-full">
                <span className="font-semibold text-right  w-[140px]">
                  {team1Name}
                </span>
                <span className="">vs</span>

                <span className="font-semibold text-left  w-[140px]">
                  {team2Name}
                </span>
              </div>
            </div>
            <button
              onClick={() => setShowRecap(false)}
              className="absolute top-6 right-6"
            >
              <FontAwesomeIcon icon={faTimes} size="xl" />
            </button>
          </div>

          <div className="flex flex-col py-8 max-w-[520px] sm:max-w-[520px] md:max-w-[700px] lg:max-w-[1030px] items-center justify-center px-2 w-full">
            <div className="flex flex-col-reverse sm:flex-col-reverse md:flex-row pb-8 w-full">
              <div className="w-full mt-6 md:mt-0">
                <h2 className="text-[20px] font-semibold mb-2">Full Recap</h2>
                <div className="h-1 mb-4 bg-partnersBorders" />
                <div className="w-full h-full  min-w-[320px] max-h-[320px]">
                  {fullRecapVideo?.thumbnail && (
                    <video
                      // src={fullRecapVideo.url}
                      controls
                      poster={fullRecapVideo.thumbnail}
                      className="w-full h-full bg-slate-500 rounded-md"
                    ></video>
                  )}
                </div>
              </div>

              <div className="px-0 md:px-4 my-4 md:my-0 font-sourceSansPro md:w-4/6 ">
                <h3 className="text-[20px] font-semibold">Summary</h3>
                {/* <div className="h-1 my-2 bg-partnersBorders" /> */}
                <div className="text-sm text-offwhite my-4">
                  <p className="pb-[2px]">{date}</p>
                  <p className="pb-[2px]">{location}</p>
                  <div className="flex">
                    <div className="mr-2">
                      <FontAwesomeIcon icon={faCloud} />
                    </div>
                    <p>{weather}</p>
                  </div>
                </div>

                <div>
                  <div className="h-1 my-2 bg-partnersBorders text-primary" />
                  <h3 className="font-semibold py-2 text-[18px]">Title</h3>
                  {/* define generated text */}
                  <p className="text-sm font-thin">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
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
                {videos.map((video, index) => (
                  <div
                    key={index}
                    className=" w-full sm my-2 md:m-2 md:max-w-[400px] flex flex-row sm:flex-row md:flex-col"
                  >
                    {video?.url && video?.thumbnail && (
                      <video
                        src={video.url}
                        controls
                        poster={video.thumbnail}
                        className="bg-partnersBorders rounded-[4px] w-1/2 sm:w-1/2 md:w-full min-h-[128px] max-w-[320px]"
                      ></video>
                    )}
                    <div className="video-info text-primary ml-2 w-1/2 sm:w-1/2 md:w-full flex flex-col justify-end  max-w-[320px]">
                      <h3 className="text-base pt-2">{video.title}</h3>
                      <p className="text-sm text-offwhite m-px ">
                        {video.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchSummary;
