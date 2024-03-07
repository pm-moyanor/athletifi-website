import React from 'react';
import SeasonHighlights from './SeasonHighlights';
import { ActionReelList } from './TopActionReels';
import { useMediaQuery } from '@/app/utils/useMediaQuery';

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
  const isMobile = useMediaQuery('(max-width: 767px)');

  return (
    <div className="w-11/12 max-w-[1030px] sm:py-6 md:py-16 px-0 md:px-4 flex flex-col sm:flex-col md:flex-row justify-center items-center md:items-start h-full">
      <SeasonHighlights />
      {isMobile && (
        <span className=" h-px bg-partnersBorders w-full max-w-[1030px] my-4" />
      )}
      <ActionReelList actionReels={dummyData} />
    </div>
  );
};

export default SeasonSection;
