import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCloud } from '@fortawesome/free-solid-svg-icons';

interface MatchSummaryProps {
  matchData: {
    team1Badge: string;
    team2Badge: string;
    team1Name: string;
    team2Name: string;
    team1Score: number;
    team2Score: number;
    date: string;
    location: string;
    weather: string;
    fullRecapVideo: {
      title: string;
      url: string;
      thumbnail: string;
      description: string;
    };
    videos: {
      title: string;
      url: string;
      thumbnail: string;
      description: string;
    }[];
  };
}

const MatchSummary: React.FC<MatchSummaryProps> = ({ matchData }) => {
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

  const [showRecap, setShowRecap] = useState(false);

  const handleSummaryClick = () => {
    setShowRecap(true);
  };

  return (
    // MATCH INFO

    <div className="flex justify-between items-center text-primary w-full font-sourceSansPro">
      <img src={team1Badge} alt="Crest1" />

      <div>
        <span>{team1Score}</span> - <span>{team2Score}</span>
      </div>
      <img src={team2Badge} alt="Crest2" />
      <div>
        <span>{team1Name}</span> vs <span>{team2Name}</span>
        <div className="text-sm text-offwhite">{date}</div>
      </div>

      <button
        className="w-28 h-7 bg-darkerSkyBlue text-black text-sm rounded-30"
        onClick={handleSummaryClick}
      >
        Summary
      </button>

      {/* SUMMARY CARD */}

      {showRecap && (
        <div className=" modal bg-[#032436] absolute z-10 top-10 left-0 w-full p-12 max-w-[1100px]">
          <div className="flex justify-between items-center m-auto text-primary w-full font-sourceSansPro pb-4">
            <div className="flex w-full justify-between items-center max-w-[400px]">
              <div className="flex w-[200px] justify-around">
                <img src={team1Badge} alt="Crest1" />
                <div className="font-semibold">
                  <span>{team1Score}</span> - <span>{team2Score}</span>
                </div>
                <img src={team2Badge} alt="Crest2" />
              </div>

              <div>
                <span className="font-semibold">{team1Name}</span> vs
                <span className="font-semibold">{team2Name}</span>
              </div>
            </div>
            <button onClick={() => setShowRecap(false)} className="-mt-6 ">
              <FontAwesomeIcon icon={faTimes} size="xl" />
            </button>
          </div>
          <div className="modal-content flex flex-col py-10">
            <div className="flex pb-16">
              <div className="w-full pr-2">
                <h2 className="text-[24px] font-semibold mb-2">Full Recap</h2>
                <div className="h-1 mb-4 bg-partnersBorders" />

                <video
                  src={fullRecapVideo.url}
                  controls
                  poster={fullRecapVideo.thumbnail}
                  className="w-full bg-slate-500 rounded-md h-full min-h-80"
                ></video>
              </div>

              <div className="px-6 font-sourceSansPro w-4/6">
                <h3 className="text-[24px] font-semibold">Summary</h3>
                {/* <div className="h-1 my-2 bg-partnersBorders" /> */}
                <div className="text-sm text-offwhite my-4">
                  <p className='pb-px'>{date}</p>
                  <p className='pb-px'>{location}</p>
                  <div className="flex">
                    <div className="mr-2">
                      <FontAwesomeIcon icon={faCloud} />
                    </div>
                    <p>{weather}</p>
                  </div>
                </div>

                <div>
                <div className="h-1 my-6 bg-partnersBorders text-primary" />
                  <h3 className="font-semibold py-2 text-[18px]">Title</h3>
                  {/* define generated text */}
                  <p className="font-thin">
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
            <div className="flex flex-col mt-6">
              <h3 className="text-[24px] font-semibold mt-4 mb-2">Highlights</h3>
              <div className="h-1 mb-4 bg-partnersBorders " />
              <div className="flex w-full">
                {videos.map((video, index) => (
                  <div key={index} className="video-wrapper mr-4">
                    <video
                      src={video.url}
                      controls
                      poster={video.thumbnail}
                      className="bg-slate-500 rounded-md w-full h-40"
                    ></video>
                    <div className="video-info text-primary m-2">
                      <h3 className="text-base">{video.title}</h3>
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
