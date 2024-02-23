import React from 'react';
import SeasonHighlights from './SeasonHighlights';
import { ActionReelList } from './TopActionReels';

const dummyData = [
  {
    videoSrc: '/video2.mp4',
    thumbnail: '/poster2.png',
    title: 'Highlight',
    description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
  },
  {
    videoSrc: '/video3.mp4',
    thumbnail: '/poster3.png',
    title: 'Highlight',
    description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
  },
  {
    videoSrc: '/video3.mp4',
    thumbnail: '/poster3.png',
    title: 'Highlight',
    description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
  },
];




const SeasonSection: React.FC = () => {
  return (
    <div className="bg-gradient-to-l from-cardsBackground via-[#032436]  to-[#032436] bg-opacity-95 flex  justify-center items-center">
      <div className="w-full max-w-[1000px] sm:py-6 md:py-20 px-4 flex flex-col sm:flex-col md:flex-row justify-center ">
        <SeasonHighlights />
        <ActionReelList actionReels={dummyData} />
      </div>
    </div>
  );
};

export default SeasonSection;
