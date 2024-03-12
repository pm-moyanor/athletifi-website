import { useState, useEffect } from 'react';
import SeasonHighlights from './SeasonHighlights';
import { ActionReelList } from './TopActionReels';
import { IActionReel, emptyActionReel } from '@/types/Dashboard.type';

const dummySeasonHighlights = ['Sample data goes here'];

const dummyData: IActionReel[] = [
  {
    videoSrc:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    // 'https://youtu.be/qv6UVOQ0F44',
    thumbnail: '/poster2.png',
    title: 'Highlight',
    description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
  },
  // {
  //   videoSrc: '/video3.mp4',
  //   thumbnail: '/poster3.png',
  //   title: 'Highlight',
  //   description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
  // },
  // {
  //   videoSrc: '/video3.mp4',
  //   thumbnail: '/poster3.png',
  //   title: 'Highlight',
  //   description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
  // },
];

const SeasonSection: React.FC = () => {
  const [seasonHighlights, setSeasonHighlights] = useState<string[] | null[]>([
    null,
  ]);
  const [actionReels, setActionReels] = useState([emptyActionReel]);

  useEffect(() => {
    setTimeout(() => {
      setActionReels(dummyData);
      setSeasonHighlights(dummySeasonHighlights);
    }, 1500);
  }, []);

  return (
    <>
      <div className="w-full max-w-[1030px] sm:py-6 md:py-16 px-4 flex flex-col sm:flex-col md:flex-row justify-center items-center md:items-start h-full">
        <SeasonHighlights data={seasonHighlights} />
        <span className="md:hidden h-px bg-partnersBorders w-full max-w-[1030px] my-4" />
        <ActionReelList actionReels={actionReels} />
      </div>
    </>
  );
};

export default SeasonSection;
