import { useState, useEffect } from 'react';
import SeasonHighlights from './SeasonHighlights';
import { ActionReelList } from './TopActionReels';
import {
  IActionReel,
  ISeasonHighlights,
  emptyActionReel,
} from '@/types/Dashboard.type';

const dummyData: IActionReel[] = [
  {
    video_url:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    thumbnail: '/poster2.png',
    title: 'Highlight',
    description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
  },
  // {
  //   video_url: '/video2.mp4',
  //   thumbnail: '/poster3.png',
  //   title: 'Highlight',
  //   description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
  // },
  // {
  //   video_url: '/video3.mp4',
  //   thumbnail: '/poster3.png',
  //   title: 'Highlight',
  //   description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
  // },
];

const SeasonSection: React.FC<ISeasonHighlights> = ({
  seasonHighlights,
}: ISeasonHighlights) => {
  const [actionReels, setActionReels] = useState([emptyActionReel]);

  useEffect(() => {
    setTimeout(() => {
      setActionReels(dummyData);
    }, 1500);
  }, []);

  return (
    <>
      <div className="w-full max-w-[1130px] sm:py-8 md:py-20 px-4 flex flex-col sm:flex-col md:flex-row justify-around items-center md:items-start h-full">
        <SeasonHighlights seasonHighlights={seasonHighlights} />
        <ActionReelList actionReels={actionReels} />
      </div>
    </>
  );
};

export default SeasonSection;
