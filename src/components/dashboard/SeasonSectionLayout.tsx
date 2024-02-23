import React from 'react';
import SeasonHighlights from './SeasonHighlights';
import { ActionReelList } from './TopActionReels';

const dummyData = [
  {
    videoSrc: 'video1.mp4',
    title: 'Highlight',
    description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
  },
  {
    videoSrc: 'video2.mp4',
    title: 'Highlight',
    description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
  },
  {
    videoSrc: 'video3.mp4',
    title: 'Highlight',
    description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
  },
];

const SeasonSection: React.FC = () => {
  return (
    <div className="bg-cardsBackground flex  justify-center items-center">
      <div className="w-full border max-w-[1000px] sm:py-6 md:py-12 px-4 flex flex-col sm:flex-col md:flex-row justify-center ">
        <SeasonHighlights />
        <ActionReelList actionReels={dummyData} />
      </div>
    </div>
  );
};

export default SeasonSection;
